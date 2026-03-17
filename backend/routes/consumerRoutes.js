router.post('/create-order', async (req, res) => {

  const { product_id } = req.body;

  const { data, error } = await supabase
    .from('orders')
    .insert([{ product_id }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});