/**
 * routes/auth.js
 *
 * Define los endpoints de autenticación y las rutas protegidas del taller.
 *
 * Endpoints disponibles:
 *
 *  POST  /login    → Iniciar sesión (Fase 2 & 3)
 *  POST  /logout   → Cerrar sesión
 *  GET   /home     → Ruta protegida básica (Fase 2)
 *  GET   /perfil   → Recuperación de sesión (Fase 4)
 *  GET   /status   → Diagnóstico: usuarios activos (Fase 3)
 */

const { Router } = require('express');
const { requireAuth } = require('../middleware/auth');
const ctrl = require('../controllers/authController');

const router = Router();

// Rutas públicas
router.post('/login', ctrl.login);
router.post('/logout', ctrl.logout);

// Rutas protegidas (requieren sesión activa)
router.get('/home', requireAuth, ctrl.home);
router.get('/perfil', ctrl.perfil);       // Sin requireAuth: responde aunque no haya sesión
router.get('/status', ctrl.status);       // Diagnóstico: no requiere auth para el taller

module.exports = router;
