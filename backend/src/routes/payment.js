const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const { pool } = require("../db");
const auth = require("../middleware/auth");

router.post("/create", auth, async (req, res) => {
  try {
    const { orderNumber, amount } = req.body;

    const order = await pool.query(
      "SELECT * FROM orders WHERE order_number=$1 AND client_id=$2",
      [orderNumber, req.session.userId]
    );

    if (!order.rows[0])
      return res.status(404).json({ error: "Не найден" });

    const response = await fetch("https://api.yookassa.ru/v3/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotence-Key": crypto.randomUUID(),
        Authorization: `Basic ${Buffer.from(
          `${process.env.YOOKASSA_SHOP_ID}:${process.env.YOOKASSA_SECRET}`
        ).toString("base64")}`,
      },
      body: JSON.stringify({
        amount: { value: amount.toFixed(2), currency: "RUB" },
        capture: false,
        confirmation: {
          type: "redirect",
          return_url: process.env.FRONTEND_URL,
        },
      }),
    });

    const payment = await response.json();

    await pool.query(
      "UPDATE orders SET payment_id=$1 WHERE order_number=$2",
      [payment.id, orderNumber]
    );

    res.json(payment);
  } catch (e) {
    res.status(500).json({ error: "Ошибка платежа" });
  }
});

module.exports = router;