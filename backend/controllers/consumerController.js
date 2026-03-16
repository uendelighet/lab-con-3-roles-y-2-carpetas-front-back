// Importamos el "teléfono" (cliente de Supabase) para hablar con la base de datos.
// Sin esto, el oficial no tiene comunicación con el búnker de datos.
const supabase = require('../config/supabase');

/**
 * MISIÓN: Obtener el listado de todas las tiendas disponibles.
 * @param {Object} req - La petición (Request): Aquí vendría si el usuario filtra algo.
 * @param {Object} res - La respuesta (Response): El camión que lleva los datos al civil.
 */
const getStores = async (req, res) => {
    try {
        // OPERACIÓN DE EXTRACCIÓN: 
        // "await" detiene la ejecución un segundo hasta que la base de datos responda.
        // .from('stores') indica en qué cajón buscar.
        // .select('*') ordena traer todas las columnas (Nombre, ID, Dirección).
        const { data, error } = await supabase
            .from('stores')
            .select('*');

        // CONTROL DE EMBOSCADA: 
        // Si Supabase responde con un error (ej: la tabla no existe), lanzamos una excepción.
        if (error) throw error;

        // VEREDICTO POSITIVO: 
        // Enviamos un código 200 (Éxito) y el paquete de datos en formato JSON.
        res.status(200).json(data);

    } catch (error) {
        // REPORTE DE FALLA: 
        // Si algo salió mal en el camino, enviamos un código 400 y el motivo del desastre.
        res.status(400).json({ error: 'Error en reconocimiento de tiendas: ' + error.message });
    }
};

// Exportamos la función para que el "Mesero" (la Ruta) pueda llamarla.
module.exports = { getStores };