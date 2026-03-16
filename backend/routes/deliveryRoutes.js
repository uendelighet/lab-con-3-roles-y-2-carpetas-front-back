const express = require('express');
const router = express.Router();

const { getPendingOrders } = require('../controllers/deliveryController');

// ver pedidos pendientes
router.get('/pending-orders', getPendingOrders);

module.exports = router;