const express = require('express');
const router = express.Router();

const { addProduct } = require('../controllers/storeController');
const { validateProduct } = require('../middlewares/productValidator');

// crear producto
router.post('/add-product', validateProduct, addProduct);

module.exports = router;