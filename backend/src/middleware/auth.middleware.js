
const { getSession } = require('../utils/token');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const session = getSession(token);

  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  req.session = session;
  next();
};
