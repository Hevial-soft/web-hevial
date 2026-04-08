module.exports = (req, res, next) => {
  if (req.headers["x-specialist-key"] !== process.env.SPECIALIST_API_KEY) {
    return res.status(403).json({ error: "Нет доступа" });
  }
  next();
};