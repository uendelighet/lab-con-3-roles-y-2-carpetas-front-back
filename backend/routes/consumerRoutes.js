/**
 * consumerRoutes.js
 * Router encargado de manejar las peticiones del rol CONSUMER.
 * Aquí definimos las rutas que un usuario puede usar para ver tiendas
 * o interactuar con el sistema desde el lado del cliente.
 */
console.log("consumerRoutes cargado");
// 1️⃣ Importamos Express para poder crear un router
const express = require('express');

// 2️⃣ Creamos el router de Express
// Este router agrupa todas las rutas del consumidor
const router = express.Router();


// 3️⃣ Importamos el controller correspondiente
// El controller contiene la lógica que realmente consulta la base de datos
const { getStores } = require('../controllers/consumerController');


// 4️⃣ Definimos la ruta GET para obtener las tiendas
// Cuando alguien haga una petición a:
// http://localhost:3000/api/consumer/stores
// Express ejecutará la función getStores del controller
router.get('/stores', getStores);

router.get('/test', (req,res)=>{
  res.send("consumer router funciona");
});

// 5️⃣ Exportamos el router
// Esto es FUNDAMENTAL porque permite que index.js pueda usar estas rutas
module.exports = router;