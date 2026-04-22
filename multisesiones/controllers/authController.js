/**
 * controllers/authController.js
 *
 * Lógica de negocio para autenticación:
 *  - login    : autentica al usuario, aplica sesión única
 *  - logout   : destruye la sesión activa
 *  - perfil   : ruta de recuperación (Fase 4)
 *  - home     : ruta protegida básica (Fase 2)
 *  - status   : lista usuarios activos (diagnóstico)
 *
 * NOTA: En un sistema real, aquí se validaría la contraseña contra
 * una base de datos (con hash bcrypt, etc.). Para el taller se omite
 * esa parte y se enfoca en el ciclo de vida de la sesión.
 */

const store = require('../store/sessionStore');

// ─── Fase 2 & 3: Login ───────────────────────────────────────────────────────

/**
 * POST /login
 * Body: { "usuario": "ana" }
 *
 * Flujo:
 *  1. Valida que se envíe un nombre de usuario.
 *  2. Regenera el ID de sesión para prevenir Session Fixation.
 *  3. Registra la nueva sesión en el store (invalida la anterior si existe).
 *  4. Responde con confirmación.
 */
function login(req, res) {
  const { usuario } = req.body;

  if (!usuario || typeof usuario !== 'string' || usuario.trim() === '') {
    return res.status(400).json({ ok: false, mensaje: 'El campo "usuario" es requerido.' });
  }

  const nombreUsuario = usuario.trim();

  // Fase de seguridad: regenerar el ID de sesión tras autenticarse
  // Previene Session Fixation (el atacante no puede reutilizar un ID conocido)
  req.session.regenerate((err) => {
    if (err) {
      return res.status(500).json({ ok: false, mensaje: 'Error al crear la sesión.' });
    }

    // Fase 3: Sesión única → destruye la sesión anterior del mismo usuario
    store.registrarSesion(nombreUsuario, req.session);

    // Guardar datos en la sesión
    req.session.usuario = nombreUsuario;
    req.session.creadaEn = new Date().toISOString();

    return res.status(200).json({
      ok: true,
      mensaje: `Sesión única activa para "${nombreUsuario}".`,
      sessionId: req.sessionID,
    });
  });
}

// ─── Logout ──────────────────────────────────────────────────────────────────

/**
 * POST /logout
 *
 * Destruye la sesión actual y elimina la cookie del navegador.
 */
function logout(req, res) {
  const usuario = req.session.usuario;

  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ ok: false, mensaje: 'Error al cerrar la sesión.' });
    }

    // Limpiar la referencia en el store
    if (usuario) store.eliminarSesion(usuario);

    // Eliminar la cookie del cliente
    res.clearCookie('connect.sid');

    return res.status(200).json({ ok: true, mensaje: 'Sesión cerrada correctamente.' });
  });
}

// ─── Fase 2: Ruta protegida básica ───────────────────────────────────────────

/**
 * GET /home
 *
 * Ruta protegida. Solo accesible si hay sesión activa.
 * El middleware requireAuth se encarga de bloquear el acceso antes
 * de llegar aquí si no hay sesión.
 */
function home(req, res) {
  return res.status(200).json({
    ok: true,
    mensaje: `Bienvenido, ${req.session.usuario}.`,
    sesionCreadaEn: req.session.creadaEn,
  });
}

// ─── Fase 4: Recuperación de sesión ──────────────────────────────────────────

/**
 * GET /perfil
 *
 * Verifica si la sesión persiste tras cerrar y reabrir el navegador.
 * Si la cookie tiene maxAge configurado, el navegador la conserva y el
 * servidor puede reconocer al usuario sin que vuelva a hacer login.
 */
function perfil(req, res) {
  if (req.session && req.session.usuario) {
    return res.status(200).json({
      ok: true,
      mensaje: `Sesión recuperada correctamente para "${req.session.usuario}".`,
      sesionCreadaEn: req.session.creadaEn,
      sessionId: req.sessionID,
    });
  }

  return res.status(200).json({
    ok: false,
    mensaje: 'No hay sesión activa. Es necesario iniciar sesión.',
  });
}

// ─── Diagnóstico ─────────────────────────────────────────────────────────────

/**
 * GET /status
 *
 * Muestra qué usuarios tienen sesiones activas en este momento.
 * Útil para verificar el comportamiento de sesión única en el taller.
 */
function status(req, res) {
  const activos = store.listarUsuariosActivos();
  return res.status(200).json({
    ok: true,
    usuariosActivos: activos,
    total: activos.length,
  });
}

module.exports = { login, logout, home, perfil, status };
