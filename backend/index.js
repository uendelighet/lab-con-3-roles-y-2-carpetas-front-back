/**
 * index.js: Puesto de Mando Central del Backend.
 * Sirve para inicializar el servidor, configurar la seguridad (CORS),
 * permitir la lectura de datos (JSON) y conectar los routers de los 3 roles
 * para que cada petición llegue al escuadrón correcto.
 */


// 1. Cargamos las variables de entorno desde el archivo .env (nuestras coordenadas secretas)
require('dotenv').config();

// 2. Importamos Express, que es el motor que nos permite crear el servidor web
const express = require('express');

// 3. Importamos CORS para que el Frontend (en otro puerto) pueda hablar con nosotros sin bloqueos
const cors = require('cors');

// 4. Inicializamos la aplicación de Express
const app = express();

// 5. Configuramos los "Middlewares" (Soldados que procesan la información antes de que llegue a las rutas)
app.use(cors());          // Permite peticiones de otros dominios
app.use(express.json());  // Permite que el servidor entienda cuando le enviamos datos en formato JSON

// 6. Definimos una ruta de prueba para saber si el cuartel está operativo
// Esto es útil para verificar que el servidor corre antes de meterle lógica compleja
app.get('/', (req, res) => {
    res.send('Cuartel General de Rappi-Ecosystem: Operativo 🎖️');
});

// --- ZONA DE RUTA DE COMUNICACIONES (ACTIVADA) ---
// Aquí es donde conectaremos los 3 routers de los roles (Consumer, Store, Delivery)
// según lo pide el laboratorio para mantener todo ordenado.

// 1. Importamos los escuadrones (Routers) que creamos en la carpeta /routes
// Esto le dice al Comandante dónde encontrar la lógica de cada rol.
const consumerRoutes = require('./routes/consumerRoutes');
const storeRoutes = require('./routes/storeRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');

// 2. Asignamos los frentes de batalla (Prefijos de URL)
// Cada vez que alguien pida algo a "/api/consumer", el servidor lo enviará al archivo consumerRoutes.js
app.use('/api/consumer', consumerRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/delivery', deliveryRoutes);

// ------------------------------------------------
// 7. Definimos el puerto de escucha. Usamos el del .env o el 3000 por defecto
const PORT = process.env.PORT || 3000;

// 8. ¡Damos la orden de encendido! El servidor se queda escuchando peticiones
app.listen(PORT, () => {
    console.log(`>>> El servidor está patrullando en el puerto ${PORT}`);
    console.log(`>>> Accede en: http://localhost:${PORT}`);
});