const express = require("express");
const router = express.Router();
const { pool } = require("../db");
const auth = require("../middleware/auth");
const formatOrder = require("../utils/formatOrder");

router.get("/", auth, async (req, res) => {
  const { userId, orderOnly, orderNumber } = req.session;

  let result;

  if (orderOnly) {
    result = await pool.query(
      "SELECT * FROM orders WHERE client_id=$1 AND order_number=$2",
      [userId, orderNumber]
    );
  } else {
    result = await pool.query(
      "SELECT * FROM orders WHERE client_id=$1",
      [userId]
    );
  }

  res.json(result.rows.map(formatOrder));
});

router.get("/:number", auth, async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM orders WHERE order_number=$1 AND client_id=$2",
    [req.params.number.toUpperCase(), req.session.userId]
  );

  if (!result.rows[0])
    return res.status(404).json({ error: "Не найден" });

  res.json(formatOrder(result.rows[0]));
});

module.exports = router;