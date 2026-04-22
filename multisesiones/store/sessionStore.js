/**
 * store/sessionStore.js
 *
 * Almacén en memoria de sesiones activas por usuario.
 * En producción esto se reemplazaría por Redis u otra BD externa
 * para soportar múltiples instancias del servidor.
 *
 * Estructura interna:
 *   {
 *     "ana": <objeto session de express-session>,
 *     "bob": <objeto session de express-session>,
 *     ...
 *   }
 */

const sesionesActivas = {};

/**
 * Registra la sesión de un usuario.
 * Si ya existía una sesión anterior para ese usuario, la destruye primero
 * (comportamiento de sesión única).
 *
 * @param {string} usuario - Identificador del usuario.
 * @param {object} session - Objeto req.session de Express.
 */
function registrarSesion(usuario, session) {
  if (sesionesActivas[usuario]) {
    sesionesActivas[usuario].destroy((err) => {
      if (err) console.error(`Error al destruir sesión previa de "${usuario}":`, err);
    });
  }
  sesionesActivas[usuario] = session;
}

/**
 * Elimina la referencia a la sesión de un usuario en el almacén.
 * No destruye la sesión en sí (eso lo hace Express); solo limpia el registro.
 *
 * @param {string} usuario - Identificador del usuario.
 */
function eliminarSesion(usuario) {
  delete sesionesActivas[usuario];
}

/**
 * Devuelve la sesión activa de un usuario, o undefined si no existe.
 *
 * @param {string} usuario
 * @returns {object|undefined}
 */
function obtenerSesion(usuario) {
  return sesionesActivas[usuario];
}

/**
 * Lista todos los usuarios con sesión activa actualmente.
 *
 * @returns {string[]}
 */
function listarUsuariosActivos() {
  return Object.keys(sesionesActivas);
}

module.exports = {
  registrarSesion,
  eliminarSesion,
  obtenerSesion,
  listarUsuariosActivos,
};
