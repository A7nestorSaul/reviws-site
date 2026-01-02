// server/index.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Sirve la página principal (public)
app.use(express.static(path.join(__dirname, '../public')));

// Sirve la parte admin
app.use('/admin', express.static(path.join(__dirname, '../admin')));

// Ruta raíz → home
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Ruta admin login
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin', 'login.html'));
});

// Ruta de prueba para confirmar que el backend responde
app.get('/api/test', (req, res) => {
    res.json({ mensaje: '¡Backend activo! Versión Node: ' + process.version });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log('Home pública: http://localhost:3000/');
    console.log('Admin:        http://localhost:3000/admin');
    console.log('Prueba:       http://localhost:3000/api/test');
});
