const { getSession } = require("../sessions");

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const session = getSession(token);

  if (!session) {
    return res.status(401).json({ error: "Не авторизован" });
  }

  req.session = session;
  next();
};