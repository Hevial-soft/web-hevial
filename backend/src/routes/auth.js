const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const { pool } = require("../db");
const { createToken, deleteSession } = require("../sessions");
const auth = require("../middleware/auth");

router.post("/telegram", async (req, res) => {
  try {
    const data = req.body;
    const { hash, ...fields } = data;

    const secretKey = crypto
      .createHash("sha256")
      .update(process.env.BOT_TOKEN)
      .digest();

    const checkString = Object.keys(fields)
      .sort()
      .map((k) => `${k}=${fields[k]}`)
      .join("\n");

    const hmac = crypto
      .createHmac("sha256", secretKey)
      .update(checkString)
      .digest("hex");

    if (hmac !== hash)
      return res.status(403).json({ error: "Неверная подпись" });

    if (Date.now() / 1000 - fields.auth_date > 86400)
      return res.status(403).json({ error: "Данные устарели" });

    let client = await pool.query(
      "SELECT * FROM clients WHERE telegram_user_id=$1",
      [fields.id]
    );

    if (!client.rows.length) {
      client = await pool.query(
        `INSERT INTO clients (telegram_user_id, username, first_name, last_name)
         VALUES ($1,$2,$3,$4) RETURNING *`,
        [
          fields.id,
          fields.username || null,
          fields.first_name,
          fields.last_name || null,
        ]
      );
    } else {
      await pool.query(
        "UPDATE clients SET last_seen=NOW() WHERE telegram_user_id=$1",
        [fields.id]
      );
    }

    const user = client.rows[0];
    const token = createToken({
      userId: user.id,
      telegramId: fields.id,
    });

    res.json({ token });
  } catch (e) {
    res.status(500).json({ error: "Ошибка авторизации" });
  }
});

router.post("/order", async (req, res) => {
  const { orderNumber } = req.body;

  const result = await pool.query(
    `SELECT * FROM orders WHERE order_number=$1`,
    [orderNumber.toUpperCase()]
  );

  if (!result.rows[0])
    return res.status(404).json({ error: "Не найден" });

  const order = result.rows[0];

  const token = createToken({
    userId: order.client_id,
    orderOnly: true,
    orderNumber,
  });

  res.json({ token });
});

router.get("/me", auth, async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM clients WHERE id=$1",
    [req.session.userId]
  );

  res.json(result.rows[0]);
});

router.post("/logout", auth, (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  deleteSession(token);
  res.json({ ok: true });
});

module.exports = router;