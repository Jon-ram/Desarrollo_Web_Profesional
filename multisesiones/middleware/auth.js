/**
 * middleware/auth.js
 *
 * Middleware de autenticación: verifica que el request tenga una sesión
 * activa antes de permitir el acceso a rutas protegidas.
 *
 * Uso:
 *   router.get('/ruta-protegida', requireAuth, (req, res) => { ... });
 */

function requireAuth(req, res, next) {
  if (req.session && req.session.usuario) {
    return next(); // Sesión válida → continuar
  }
  return res.status(401).json({
    ok: false,
    mensaje: 'Acceso denegado. Inicia sesión primero.',
  });
}

module.exports = { requireAuth };
