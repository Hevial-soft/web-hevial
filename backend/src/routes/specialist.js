const express = require("express");
const router = express.Router();
const { pool } = require("../db");
const specialist = require("../middleware/specialist");

router.get("/orders", specialist, async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM orders WHERE status!='CLOSED'"
  );
  res.json(result.rows);
});

router.patch("/orders/:number/status", specialist, async (req, res) => {
  const { status } = req.body;

  await pool.query(
    "UPDATE orders SET status=$1 WHERE order_number=$2",
    [status, req.params.number]
  );

  res.json({ ok: true });
});

module.exports = router;