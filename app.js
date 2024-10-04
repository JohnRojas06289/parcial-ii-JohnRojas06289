const express = require('express');
const authRoutes = require('./routes/authRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const tokenModel = require('./models/tokenModel');

const app = express();
app.use(express.json());


setInterval(() => {
  tokenModel.removeExpiredTokens();
}, 60000); 

app.use(authRoutes);
app.use(weatherRoutes);

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de clima');
});

// Manejar rutas no definidas
app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});