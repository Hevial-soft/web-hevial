
const service = require('./auth.service');

async function telegramAuth(req, res) {
  const result = await service.telegramAuth(req.body);
  res.json(result);
}

async function orderAuth(req, res) {
  const result = await service.orderAuth(req.body);
  res.json(result);
}

module.exports = { telegramAuth, orderAuth };
