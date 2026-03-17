const express = require('express');
const router = express.Router();

const supabase = require('../config/supabase');
const { getStores } = require('../controllers/consumerController');

// ver tiendas
router.get('/stores', getStores);

// crear orden
router.post('/create-order', async (req, res) => {
  const { product_id } = req.body;

  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([{ product_id, status: 'pending' }])
      .select();

    if (error) throw error;

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;