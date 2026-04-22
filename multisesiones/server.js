/**
 * server.js
 *
 * Punto de entrada de la aplicación.
 * Carga variables de entorno, configura Express y monta las rutas.
 */

require('dotenv').config();

const express = require('express');
const session = require('express-session');

const sessionConfig = require('./config/session');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middlewares globales ─────────────────────────────────────────────────────

app.use(express.json());                   // Parsear body JSON
app.use(session(sessionConfig));           // Gestión de sesiones

// ─── Rutas ───────────────────────────────────────────────────────────────────

app.use('/', authRoutes);

// Ruta raíz: descripción de los endpoints disponibles
app.get('/', (req, res) => {
  res.json({
    proyecto: 'Taller - Gestión de Multisesiones',
    endpoints: {
      'POST /login':   'Iniciar sesión (body: { "usuario": "nombre" })',
      'POST /logout':  'Cerrar sesión activa',
      'GET  /home':    'Ruta protegida (requiere sesión)',
      'GET  /perfil':  'Verificar recuperación de sesión (Fase 4)',
      'GET  /status':  'Usuarios con sesión activa en este momento',
    },
  });
});

// ─── Inicio del servidor ──────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`   Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`\n   Endpoints:`);
  console.log(`   POST http://localhost:${PORT}/login`);
  console.log(`   POST http://localhost:${PORT}/logout`);
  console.log(`   GET  http://localhost:${PORT}/home`);
  console.log(`   GET  http://localhost:${PORT}/perfil`);
  console.log(`   GET  http://localhost:${PORT}/status\n`);
});
