
const crypto = require('crypto');

const sessions = new Map();

function createToken(data) {
  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, {
    ...data,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });
  return token;
}

function getSession(token) {
  const s = sessions.get(token);
  if (!s || s.exp < Date.now()) return null;
  return s;
}

module.exports = { createToken, getSession };
