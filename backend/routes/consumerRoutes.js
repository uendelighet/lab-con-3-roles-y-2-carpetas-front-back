// ==========================================
// RUTA: backend/routes/consumerRoutes.js
// FUNCIÓN: Oficina de Operaciones para el Cliente Final
// ==========================================

const express = require('express');
const router = express.Router();

// 1. IMPORTACIÓN DEL ENLACE:
// Traemos el "teléfono" de la base de datos desde la carpeta config.
// ¿Por qué aquí? Porque este archivo necesita pedir suministros (datos) 
// y no sabe el número de la base de datos por sí solo. Usa el central.
const supabase = require('../config/supabase');

// --- MISIÓN 1: RECONOCIMIENTO DE TIENDAS ---
// Este bloque solo existe para que el usuario sepa dónde puede comprar.
// No ponemos lógica de repartidores aquí porque al cliente no le importa eso todavía.
router.get('/stores', async (req, res) => {
    try {
        // ORDEN DE EXTRACCIÓN:
        // Le decimos a Supabase: "Entra a la tabla 'stores' y tráeme TODO (*)".
        // Es una consulta SQL pura envuelta en una función amable.
        const { data, error } = await supabase
            .from('stores')
            .select('*');

        // CONTROL DE DAÑOS:
        // Si la base de datos no responde o la tabla no existe, lanzamos alerta.
        if (error) throw error;

        // ÉXITO DE LA MANIOBRA:
        // Enviamos los datos al Front-end con un código 200 (OK).
        res.status(200).json(data);
    } catch (error) {
        // Si algo falla, el servidor no explota, solo informa del error.
        res.status(400).json({ error: 'Falla en el reconocimiento: ' + error.message });
    }
});

// --- MISIÓN 2: LISTADO DE SUMINISTROS (PRODUCTOS) ---
// El cliente ya eligió una tienda (:storeId). Ahora necesita ver qué venden.
// ¿Por qué va un ID en la ruta? Para que el Back sepa qué búnker específico revisar.
router.get('/products/:storeId', async (req, res) => {
    const { storeId } = req.params; // Capturamos el ID que viene de la URL
    
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('store_id', storeId); // FILTRO TÁCTICO: "Tráeme solo lo que pertenezca a ESTA tienda"

        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: 'Error al cargar productos: ' + error.message });
    }
});

// 2. EXPORTACIÓN DEL MÓDULO:
// Sin esto, el index.js (El Comandante) no podría "ver" estas rutas.
// Es lo que permite que el pasillo de 'Consumer' sea accesible desde afuera.
module.exports = router;