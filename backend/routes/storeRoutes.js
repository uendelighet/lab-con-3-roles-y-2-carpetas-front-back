// =========================================================
// ARCHIVO: storeRoutes.js (La Oficina de los Dueños de Tienda)
// =========================================================

const express = require('express');
const router = express.Router();

// 1. EL TELÉFONO: Traemos la conexión a la base de datos (Supabase)
// Lo necesitamos porque si el dueño crea un producto, hay que guardarlo en la nube.
const supabase = require('../config/supabase');

// --- ACCIÓN: REGISTRAR UN PRODUCTO NUEVO ---
// El dueño de la tienda llena un formulario y le da a "Guardar".
// Eso envía una señal "POST" a esta dirección: /api/store/add-product
router.post('/add-product', async (req, res) => {
    
    // A. RECIBIR EL PAQUETE:
    // El "req.body" es como una caja que llega por correo. 
    // Adentro vienen: el nombre del producto, el precio y el ID de la tienda.
    const { name, price, store_id } = req.body;

    try {
        // B. GUARDAR EN EL BÚNKER (Base de Datos):
        // Usamos el teléfono (supabase) para decir: 
        // "Oye, en la tabla de 'products', inserta estos datos que me acaban de llegar".
        const { data, error } = await supabase
            .from('products')
            .insert([
                { name: name, price: price, store_id: store_id }
            ]);

        // C. REVISIÓN DE SEGURIDAD:
        // Si la base de datos dice que algo está mal (ej: el precio no es un número),
        // lanzamos una alerta inmediata.
        if (error) throw error;

        // D. REPORTE DE VICTORIA:
        // Si todo salió bien, le respondemos al dueño: "¡Misión cumplida, producto guardado!".
        res.status(201).json({ message: 'Producto guardado con éxito 🎖️', data });

    } catch (error) {
        // Si hubo una emboscada (error de red, falla de Supabase), avisamos qué pasó.
        res.status(400).json({ error: 'Falla en el registro: ' + error.message });
    }
});

// 2. SALIDA DE EMERGENCIA:
// Exportamos este archivo para que el Comandante Central (index.js) sepa que existe.
module.exports = router;