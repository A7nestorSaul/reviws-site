// index.js - Servidor Express básico para Render (versión actualizada)
require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Servir admin y forzar login.html como index por defecto
app.use('/admin', express.static(path.join(__dirname, 'admin'), { index: 'login.html' }));

// Rutas principales
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Catch-all para /admin/* (útil para SPA o rutas internas)
app.get('/admin*', (req, res) => {
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

// Endpoint de diagnóstico opcional (temporal) para listar archivos en admin
app.get('/_debug/list-admin', (req, res) => {
  const adminPath = path.join(__dirname, 'admin');
  fs.readdir(adminPath, (err, files) => {
    if (err) return res.status(500).json({ error: 'No se puede leer admin', detalles: err.message });
    res.json({ files });
  });
});
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'login.html')); // o el nombre de tu archivo real
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`URL pública esperada: http://localhost:${PORT}/`);
  console.log(`Admin: http://localhost:${PORT}/admin`);
  console.log(`Prueba API: http://localhost:${PORT}/api/test`);
});

