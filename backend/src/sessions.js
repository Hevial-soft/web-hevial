const crypto = require("crypto");

const sessions = new Map();

function createToken(data) {
  const token = crypto.randomBytes(32).toString("hex");
  sessions.set(token, {
    ...data,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });
  return token;
}

function getSession(token) {
  if (!token) return null;

  const s = sessions.get(token);
  if (!s || s.exp < Date.now()) {
    sessions.delete(token);
    return null;
  }

  return s;
}

function deleteSession(token) {
  sessions.delete(token);
}

module.exports = { createToken, getSession, deleteSession };