// index.js - Servidor Express para Render (2026 compatible)
require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));      // Página principal
app.use('/admin', express.static(path.join(__dirname, 'admin')));  // Panel admin

// Rutas principales
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'login.html'));  // o 'index.html' si usas ese nombre
});

// Ruta de prueba para confirmar que el backend responde
app.get('/api/test', (req, res) => {
  res.json({
    mensaje: '¡Backend funcionando correctamente!',
    puerto: PORT,
    fecha: new Date().toLocaleString(),
    entorno: process.env.NODE_ENV || 'development'
  });
});

// Protección básica opcional para admin (descomenta si la quieres activar)
// const basicAuth = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     res.set('WWW-Authenticate', 'Basic realm="Admin Area"');
//     return res.status(401).send('Acceso denegado');
//   }
//   const base64Credentials = authHeader.split(' ')[1];
//   const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
//   const [username, password] = credentials.split(':');
//   if (username === 'admin' && password === 'tu-contrasena-segura') {
//     return next();
//   }
//   res.set('WWW-Authenticate', 'Basic realm="Admin Area"');
//   res.status(401).send('Credenciales incorrectas');
// };
// app.use('/admin', basicAuth);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`URL pública: http://localhost:${PORT}/`);
  console.log(`Admin: http://localhost:${PORT}/admin`);
  console.log(`Prueba API: http://localhost:${PORT}/api/test`);
});
