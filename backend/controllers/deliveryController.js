const supabase = require('../config/supabase');

/**
 * MISIÓN: Listar pedidos que nadie ha recogido aún.
 */
const getPendingOrders = async (req, res) => {
    try {
        // FILTRADO TÁCTICO:
        // .eq('status', 'pending') es un "Filtro de Igualdad".
        // Solo queremos órdenes donde la columna 'status' sea exactamente 'pending'.
        // No queremos que el repartidor vea pedidos que ya se entregaron.
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('status', 'pending');

        if (error) throw error;

        // El repartidor recibe su lista de objetivos.
        res.status(200).json(data);

    } catch (error) {
        res.status(400).json({ error: 'Error al obtener misiones pendientes: ' + error.message });
    }
};

module.exports = { getPendingOrders };