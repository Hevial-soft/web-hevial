
const express = require('express');
const cors = require('cors');

const authRoutes = require('./modules/auth/auth.routes');
const ordersRoutes = require('./modules/orders/orders.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/orders', ordersRoutes);

module.exports = app;
