/**
 * config/session.js
 *
 * Configuración centralizada del middleware express-session.
 *
 * Opciones clave:
 *  - secret      : Firma la cookie. NUNCA hardcodear en producción.
 *  - resave      : false → no re-guarda la sesión si no hubo cambios.
 *  - saveUninitialized: false → no crea sesión hasta que se modifique
 *                  (ahorra memoria y evita cookies vacías).
 *  - cookie.httpOnly : Impide que JS del cliente lea la cookie (mitiga XSS).
 *  - cookie.secure   : Solo envía la cookie por HTTPS (activar en producción).
 *  - cookie.maxAge   : Duración de la cookie en ms.
 *                      Si se omite, la cookie es de sesión (muere al cerrar tab).
 *                      Con maxAge, la cookie persiste (Fase 4 - Recuperación).
 */

const SESSION_DURATION_MS = 1000 * 60 * 60 * 24; // 24 horas

const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'dev_secret_cambiar_en_produccion',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,                          // Protección XSS
    secure: process.env.NODE_ENV === 'production', // Solo HTTPS en prod
    maxAge: SESSION_DURATION_MS,             // Fase 4: cookie persistente
  },
};

module.exports = sessionConfig;
