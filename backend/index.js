require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// ruta de prueba
app.get('/', (req, res) => {
  res.send('Rappi API running 🚀');
});

// importar rutas
const consumerRoutes = require('./routes/consumerRoutes');
const storeRoutes = require('./routes/storeRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');

// usar rutas
app.use('/api/consumer', consumerRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/delivery', deliveryRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Rappi API running 🚀 on port ${PORT}`);
});