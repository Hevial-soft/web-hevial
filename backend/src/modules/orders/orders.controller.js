
const service = require('./orders.service');

async function getOrders(req, res) {
  const data = await service.getOrders(req.session);
  res.json(data);
}

module.exports = { getOrders };
