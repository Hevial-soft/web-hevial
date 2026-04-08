const express = require("express");
const router = express.Router();
const { pool } = require("../db");
const auth = require("../middleware/auth");

router.get("/:orderNumber", auth, async (req, res) => {
  const result = await pool.query(
    "SELECT file_url, file_name FROM orders WHERE order_number=$1 AND client_id=$2",
    [req.params.orderNumber, req.session.userId]
  );

  const order = result.rows[0];
  if (!order) return res.status(404).json({ error: "Нет файла" });

  res.json({ url: order.file_url, name: order.file_name });
});

module.exports = router;