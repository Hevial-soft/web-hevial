
const router = require('express').Router();
const controller = require('./auth.controller');

router.post('/telegram', controller.telegramAuth);
router.post('/order', controller.orderAuth);

module.exports = router;
