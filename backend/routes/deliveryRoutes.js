const express = require('express');
const router = express.Router();
// El enlace de radio para hablar con la base de datos
const supabase = require('../config/supabase');

// --- MISIÓN: VER PEDIDOS PENDIENTES ---
// El repartidor entra a la app y quiere ver qué hay para entregar.
// Buscamos órdenes que tengan el estado 'pending' (pendientes).
router.get('/pending-orders', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('orders') // Entramos a la tabla de órdenes
            .select('*')    // Traemos toda la info del pedido
            .eq('status', 'pending'); // Filtro: solo las que nadie ha recogido

        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// --- MISIÓN: ACEPTAR PEDIDO ---
// El repartidor decide tomar una orden. Actualizamos el estado a 'shipping'.
router.put('/accept-order/:orderId', async (req, res) => {
    const { orderId } = req.params;
    try {
        const { data, error } = await supabase
            .from('orders')
            .update({ status: 'shipping' }) // Cambiamos el estado
            .eq('id', orderId);             // Solo para esa orden específica

        if (error) throw error;
        res.status(200).json({ message: 'Pedido aceptado, ¡en camino! 🛵', data });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;