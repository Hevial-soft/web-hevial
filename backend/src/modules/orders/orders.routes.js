
const router = require('express').Router();
const controller = require('./orders.controller');
const auth = require('../../middleware/auth.middleware');

router.get('/', auth, controller.getOrders);

module.exports = router;
