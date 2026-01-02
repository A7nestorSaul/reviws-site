// index.js - Servidor Express básico para Render
require('dotenv').config(); // Carga variables de entorno (ej: PORT)

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000; // Render fuerza PORT, fallback a 3000 local

// Middleware
app.use(cors());              // Permite peticiones desde cualquier origen (útil para pruebas)
app.use(express.json());      // Para poder recibir JSON en POST

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));       // Página principal
app.use('/admin', express.static(path.join(__dirname, 'admin'))); // Panel admin

// Rutas principales
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'login.html'));
});

// Ruta de prueba para verificar que el backend está vivo
app.get('/api/test', (req, res) => {
  res.json({
    mensaje: '¡Backend funcionando correctamente!',
    puerto: PORT,
    fecha: new Date().toLocaleString(),
    entorno: process.env.NODE_ENV || 'development'
  });
});

// Si agregas más rutas/API en el futuro, ponlas aquí
// Protección simple para todo lo que esté en /admin
const basicAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.set('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).send('Acceso denegado - Usuario/Contraseña requeridos');
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  // Cambia estos valores por los tuyos (¡usa algo seguro!)
  if (username === 'admin' && password === 'tu-contrasena-segura-2025') {
    return next(); // OK
  }

  res.set('WWW-Authenticate', 'Basic realm="Admin Area"');
  res.status(401).send('Credenciales incorrectas');
};

// Aplica la protección a todas las rutas /admin
app.use('/admin', basicAuth);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`URL pública esperada: http://localhost:${PORT}/`);
  console.log(`Admin: http://localhost:${PORT}/admin`);
  console.log(`Prueba API: http://localhost:${PORT}/api/test`);
});



