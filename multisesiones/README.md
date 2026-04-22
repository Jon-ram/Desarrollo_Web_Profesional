# Gestión de Multisesiones — Node.js + Express

Proyecto del taller práctico. Implementa las 4 fases de gestión de sesiones con Node.js y Express.

---

## Estructura del proyecto

```
multisesiones/
│
├── server.js                  # Punto de entrada — arranca Express
│
├── config/
│   └── session.js             # Configuración de express-session
│
├── middleware/
│   └── auth.js                # Protección de rutas (requireAuth)
│
├── controllers/
│   └── authController.js      # Lógica de login, logout, home, perfil, status
│
├── routes/
│   └── auth.js                # Definición de endpoints
│
├── store/
│   └── sessionStore.js        # Registro en memoria de sesiones activas
│
├── .env.example               # Variables de entorno (plantilla)
├── .gitignore
└── package.json
```

---

## Instalación y arranque

```bash
# 1. Instalar dependencias
npm install

# 2. Crear archivo de entorno
cp .env.example .env

# 3. Arrancar el servidor
npm start

# Modo watch (reinicia al guardar cambios) — Node 18+
npm run dev
```

El servidor queda en: `http://localhost:3000`

---

## Endpoints

| Método | Ruta       | Auth requerida | Descripción                                |
|--------|------------|----------------|--------------------------------------------|
| POST   | `/login`   | No             | Inicia sesión. Body: `{ "usuario": "ana" }`|
| POST   | `/logout`  | No             | Destruye la sesión activa                  |
| GET    | `/home`    | **Sí**         | Ruta protegida básica (Fase 2)             |
| GET    | `/perfil`  | No             | Verifica recuperación de sesión (Fase 4)   |
| GET    | `/status`  | No             | Lista usuarios con sesión activa           |

---

## Pruebas con Postman (o curl)

### Fase 2 — Sesión básica

**1. Intentar acceder a /home sin sesión → debe dar 401**
```
GET http://localhost:3000/home
```

**2. Iniciar sesión**
```
POST http://localhost:3000/login
Content-Type: application/json

{ "usuario": "ana" }
```

**3. Acceder a /home con sesión activa → debe dar 200**
```
GET http://localhost:3000/home
```
> En Postman, asegúrate de que "Cookies" estén habilitadas para que la cookie de sesión se envíe automáticamente.

---

### Fase 3 — Sesión única

**Objetivo:** Verificar que al iniciar sesión desde un segundo cliente, el primero queda inválido.

1. Abre **Postman** y haz login con `{ "usuario": "ana" }` → guarda la cookie.
2. Abre un **segundo agente** (navegador, otro Postman, curl) y haz login con el mismo usuario.
3. Vuelve al primer agente e intenta acceder a `/home` → debe devolver **401**.
4. Consulta `/status` → solo debe aparecer una sesión activa.

**Con curl (dos terminales):**
```bash
# Terminal 1 — guardar cookie en archivo
curl -c cookies1.txt -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"usuario":"ana"}'

# Terminal 2 — nuevo login con el mismo usuario
curl -c cookies2.txt -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"usuario":"ana"}'

# Terminal 1 — intento de acceso con la sesión ya invalidada
curl -b cookies1.txt http://localhost:3000/home
# Resultado esperado: 401 Acceso denegado

# Diagnóstico
curl http://localhost:3000/status
```

---

### Fase 4 — Recuperación de sesión

**Objetivo:** Verificar que la sesión persiste tras cerrar el navegador.

1. Haz login con cualquier usuario.
2. Cierra el navegador o la pestaña (sin hacer logout).
3. Abre de nuevo y accede a `/perfil`.
4. Si la cookie tiene `maxAge`, el servidor reconocerá la sesión automáticamente.

> **Nota importante:** En memoria (sin Redis), si el servidor se reinicia la sesión se pierde aunque la cookie siga en el navegador. Esto es esperado en el entorno del taller.

```bash
# Comprobar perfil sin reiniciar el servidor
curl -b cookies1.txt http://localhost:3000/perfil
```

---

## Conceptos implementados

### Seguridad aplicada

| Medida                        | Dónde                              | Por qué                                     |
|-------------------------------|------------------------------------|---------------------------------------------|
| `req.session.regenerate()`    | `authController.js → login()`      | Previene Session Fixation                   |
| `httpOnly: true`              | `config/session.js`                | Impide que JS del cliente lea la cookie     |
| `secure: true` (en prod)      | `config/session.js`                | Solo transmite la cookie por HTTPS          |
| `maxAge`                      | `config/session.js`                | Cookie persistente para recuperación        |
| `saveUninitialized: false`    | `config/session.js`                | No crea sesiones vacías innecesarias        |
| `SESSION_SECRET` en `.env`    | `server.js`                        | El secreto no queda expuesto en el código   |

### Flujo de sesión única

```
Usuario "ana" login (cliente A)
  → store.registrarSesion("ana", sessionA)
  → sessionA almacenada

Usuario "ana" login (cliente B)
  → store.registrarSesion("ana", sessionB)
  → sessionA.destroy()  ← cliente A queda inválido
  → sessionB almacenada

Cliente A → GET /home → 401 Acceso denegado ✓
Cliente B → GET /home → 200 Bienvenido ✓
```

---

## Próximos pasos (para producción)

- **Almacén externo:** Reemplazar la memoria por `connect-redis` para que las sesiones sobrevivan reinicios del servidor y soporten múltiples instancias.
- **HTTPS:** Activar `secure: true` y servir la app tras un proxy (nginx, Caddy).
- **Validación real:** Verificar usuario y contraseña contra una base de datos con contraseñas hasheadas (bcrypt).
- **Rate limiting:** Limitar intentos de login para prevenir fuerza bruta (`express-rate-limit`).
