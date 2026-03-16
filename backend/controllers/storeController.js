// ==========================================================
// CONTROLADOR DE TIENDAS: El Oficial a cargo del Arsenal
// ==========================================================

// 1. LLAMADA POR RADIO: Traemos la conexión a la base de datos.
// 'require' es como pedir suministros. Traemos el archivo donde vive la llave de Supabase.
const supabase = require('../config/supabase');

/**
 * MISIÓN: addProduct (Añadir un nuevo producto)
 * Imagine que un camión llega a la tienda con mercancía y hay que anotarla en el libro.
 */
const addProduct = async (req, res) => {
    
    // 2. RECONOCIMIENTO DE DATOS: 
    // Extraemos lo que el usuario escribió del "cuerpo" de la petición (req.body).
    // name: nombre del producto (ej: 'Hamburguesa')
    // price: cuánto cuesta (ej: 15000)
    // store_id: a qué tienda pertenece (ej: 1)
    const { name, price, store_id } = req.body;

    try {
        // 3. INICIO DE LA MANIOBRA:
        // 'await' es "Esperen mi señal". El servidor se detiene aquí hasta que la DB responda.
        // '.from('products')' -> Le decimos a la base de datos: "Busca la tabla de productos".
        // '.insert([...])' -> "Mete estos datos nuevos en una fila".
        // Usamos [ ] porque podemos insertar varios, pero aquí solo enviamos uno.
        const { data, error } = await supabase
            .from('products')
            .insert([
                { 
                    name: name,     // Guardamos el nombre en la columna 'name'
                    price: price,   // Guardamos el precio en la columna 'price'
                    store_id: store_id // Guardamos el dueño en la columna 'store_id'
                }
            ])
            .select(); // Esta orden le dice a la DB: "Devuélveme lo que acabas de guardar para confirmar".

        // 4. VERIFICACIÓN DE EMBOSCADA:
        // Si la base de datos encontró un problema (ej: se cayó el internet o falta un dato),
        // la variable 'error' se llenará. Si eso pasa, lanzamos el error al 'catch'.
        if (error) throw error;

        // 5. REPORTE DE VICTORIA:
        // 'res.status(201)' -> Código militar para "Creado con éxito".
        // '.json({...})' -> Enviamos la respuesta en un formato que el celular/computador entienda.
        res.status(201).json({ 
            message: '¡Producto registrado en el arsenal con éxito! 🎖️', 
            data: data[0] // Mandamos el producto recién creado (está en la posición 0 de la lista)
        });

    } catch (error) {
        // 6. PLAN DE CONTINGENCIA (Si algo salió mal arriba):
        // 'res.status(400)' -> Código para "Hubo un error en la solicitud".
        // Le mostramos al usuario el mensaje exacto de por qué falló la misión.
        res.status(400).json({ 
            error: 'Falla en el registro táctico: ' + error.message 
        });
    }
};

// 7. DESPLIEGUE:
// Exportamos la función para que el archivo de 'routes' (el mesero) pueda usarla.
module.exports = { addProduct };