
const { createToken } = require('../../utils/token');

async function telegramAuth(data) {
  return { token: createToken({ userId: 1 }) };
}

async function orderAuth(data) {
  return { token: createToken({ userId: 1, orderOnly: true }) };
}

module.exports = { telegramAuth, orderAuth };
