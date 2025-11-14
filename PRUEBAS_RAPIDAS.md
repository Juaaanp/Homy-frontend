# 🧪 Pruebas Rápidas - Funcionalidades Implementadas

## ⚡ Inicio Rápido

1. **Abre tu aplicación desplegada:** https://homy-frontend.vercel.app
2. **Abre la consola del navegador:** Presiona `F12`
3. **Ve a la pestaña "Network" (Red)** para ver todas las peticiones HTTP

---

## 1️⃣ VALIDACIÓN DE COMENTARIOS

### ✅ Cómo probar:

**Paso 1:** Inicia sesión como GUEST (huésped)

**Paso 2:** Ve a `/bookings` (Mis Reservas)

**Paso 3:** Busca una reserva que:
- ✅ Ya pasó su fecha de check-out
- ✅ Está con estado "COMPLETED"
- ✅ No tiene comentario previo

**Paso 4:** En los detalles de la reserva, intenta agregar un comentario

**Resultado esperado:**
- ✅ Si cumple todas las condiciones → Comentario creado exitosamente
- ❌ Si el check-out no ha pasado → Error: "Solo puedes comentar después de completar tu estadía"
- ❌ Si ya existe comentario → Error: "Ya has comentado esta reserva"

**Verificación en consola:**
```
POST /housings/{id}/comments/create
Status: 200 OK (éxito) o 400 Bad Request (error)
```

---

## 2️⃣ CAMBIO DE CONTRASEÑA

### ✅ Cómo probar:

**Paso 1:** Inicia sesión

**Paso 2:** Ve a `/profile` (Perfil)

**Paso 3:** Haz clic en la pestaña **"Security"** (Seguridad)

**Paso 4:** Completa el formulario:
- Contraseña actual: `tu_contraseña_actual`
- Nueva contraseña: `nueva_contraseña_123` (mínimo 8 caracteres)
- Confirmar nueva contraseña: `nueva_contraseña_123`

**Paso 5:** Haz clic en **"Update Password"**

**Casos de prueba:**
- ✅ Contraseña correcta → Mensaje: "Password changed successfully!"
- ❌ Contraseña actual incorrecta → Error: "La contraseña actual es incorrecta"
- ❌ Nueva contraseña < 8 caracteres → Error: "La contraseña debe tener al menos 8 caracteres"
- ❌ Nueva = Actual → Error: "La nueva contraseña debe ser diferente a la actual"

**Verificación:**
- Cierra sesión e inicia sesión con la nueva contraseña
- Debe funcionar correctamente

**Endpoint:** `PUT /users/{id}/password`

---

## 3️⃣ VALIDACIÓN DE IMÁGENES

### ✅ Cómo probar:

**Como HOST (Anfitrión):**

**Paso 1:** Inicia sesión como HOST

**Paso 2:** Ve a `/host/list` (Listar Espacio)

**Paso 3:** Completa el formulario y en la sección de imágenes:

**Prueba 1 - Sin imágenes:**
- No subas ninguna imagen
- Intenta guardar
- ❌ **Error esperado:** "Debe proporcionar al menos 1 imagen"

**Prueba 2 - 1-10 imágenes:**
- Sube entre 1 y 10 imágenes
- ✅ **Debe funcionar correctamente**

**Prueba 3 - Más de 10 imágenes:**
- Intenta subir 11 o más imágenes
- ❌ **Error esperado:** "No se pueden subir más de 10 imágenes"

**Para editar:**
- Ve a `/host/listings` (Mis Listados)
- Selecciona un alojamiento y edita
- Mismas validaciones aplican

**Endpoint:** `POST /housings/create` o `POST /housings/edit/{id}`

---

## 4️⃣ MÉTRICAS PARA ANFITRIÓN

### ✅ Cómo probar:

**Paso 1:** Inicia sesión como HOST

**Paso 2:** Ve a `/host/listings` (Mis Listados)

**Paso 3:** Selecciona uno de tus alojamientos

**Paso 4:** Busca la sección "Métricas" o "Estadísticas"

**Si no hay interfaz visual, prueba desde la consola:**

```javascript
// En la consola del navegador (F12)
// Reemplaza TU_TOKEN_JWT con tu token real
// Reemplaza 1 con el ID de tu alojamiento

fetch('https://homy-backend-production.up.railway.app/housings/1/metrics', {
  headers: {
    'Authorization': 'Bearer TU_TOKEN_JWT',
    'Content-Type': 'application/json'
  }
})
.then(r => r.json())
.then(data => {
  console.log('Métricas:', data);
  console.log('Total reservas:', data.totalBookings);
  console.log('Calificación promedio:', data.averageRating);
})
```

**Resultado esperado:**
```json
{
  "housingId": 1,
  "housingTitle": "Casa en el centro",
  "totalBookings": 5,
  "averageRating": 4.5,
  "dateFrom": null,
  "dateTo": null
}
```

**Endpoint:** `GET /housings/{housingId}/metrics?dateFrom=YYYY-MM-DD&dateTo=YYYY-MM-DD`

---

## 5️⃣ CALENDARIO DE DISPONIBILIDAD

### ✅ Cómo probar:

**Paso 1:** Ve a los detalles de cualquier alojamiento: `/property/{id}`

**Paso 2:** Busca la sección "Disponibilidad" o "Calendario"

**Si no hay interfaz visual, prueba desde la consola:**

```javascript
// En la consola del navegador (F12)
fetch('https://homy-backend-production.up.railway.app/housings/1/availability', {
  headers: {
    'Authorization': 'Bearer TU_TOKEN_JWT',
    'Content-Type': 'application/json'
  }
})
.then(r => r.json())
.then(data => {
  console.log('Fechas ocupadas:', data.bookedDates);
  console.log('Fechas disponibles:', data.availableDates);
})
```

**Resultado esperado:**
```json
{
  "housingId": 1,
  "housingTitle": "Casa en el centro",
  "bookedDates": ["2024-01-15", "2024-01-16", "2024-01-17"],
  "availableDates": ["2024-01-18", "2024-01-19", ...]
}
```

**Endpoint:** `GET /housings/{housingId}/availability?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`

---

## 6️⃣ MAPA INTERACTIVO

### ✅ Cómo probar:

**Paso 1:** Ve a los detalles de cualquier alojamiento: `/property/{id}`

**Paso 2:** Desplázate hasta la sección **"Location"** (Ubicación)

**Paso 3:** Deberías ver un mapa interactivo mostrando:
- ✅ La ubicación del alojamiento
- ✅ Un marcador con el título
- ✅ Posibilidad de hacer zoom y mover

**Si el mapa no carga:**
1. Verifica la consola del navegador (F12) para errores
2. El token de Mapbox puede ser inválido
3. Revisa `src/app/components/map/map.component.ts` línea 62

**Para obtener un token de Mapbox:**
- Ve a https://account.mapbox.com/
- Crea cuenta o inicia sesión
- Ve a "Access tokens"
- Copia tu token público
- Reemplázalo en el código

---

## 7️⃣ FAVORITOS

### ✅ Agregar a Favoritos:

**Paso 1:** Inicia sesión como GUEST

**Paso 2:** Ve a los detalles de un alojamiento: `/property/{id}`

**Paso 3:** Haz clic en el botón **"Save"** o **"❤️"** en la parte superior derecha

**Paso 4:** El botón debe cambiar a **"Saved"** y el corazón debe llenarse

**Verificación en consola:**
```
POST /favorites/{housingId}
Status: 200 OK
```

---

### ✅ Ver Mis Favoritos:

**Paso 1:** Ve a `/favorites` desde el menú o navegación

**Paso 2:** Deberías ver una lista de todos tus alojamientos guardados

**Cada tarjeta muestra:**
- Imagen del alojamiento
- Título
- Ubicación
- Precio por noche
- Botón para eliminar (corazón rojo)
- Botón "Ver Detalles"

**Verificación en consola:**
```
GET /favorites
Status: 200 OK
Response: {"housingIds": [1, 2, 3]}
```

---

### ✅ Eliminar de Favoritos:

**Opción 1 - Desde la página de Favoritos:**
- Haz clic en el corazón rojo de cualquier alojamiento
- El alojamiento desaparece de la lista

**Opción 2 - Desde los detalles:**
- Haz clic en "Saved" nuevamente
- El botón vuelve a "Save"

**Verificación en consola:**
```
DELETE /favorites/{housingId}
Status: 200 OK
```

---

### ✅ Ver Contador de Favoritos:

**Paso 1:** En los detalles de cualquier alojamiento

**Paso 2:** Deberías ver cuántas personas lo han guardado

**Prueba desde la consola:**
```javascript
fetch('https://homy-backend-production.up.railway.app/favorites/1/count')
.then(r => r.json())
.then(data => console.log('Total favoritos:', data.count))
```

**Endpoint:** `GET /favorites/{housingId}/count` (público, no requiere autenticación)

---

## 🔧 Cómo Obtener tu Token JWT

Para probar desde la consola, necesitas tu token JWT:

**Método 1 - Desde la consola:**
```javascript
// En la consola del navegador, después de iniciar sesión:
localStorage.getItem('token')
// O
sessionStorage.getItem('token')
```

**Método 2 - Desde Network:**
1. Abre F12 → Network
2. Inicia sesión
3. Busca la petición `POST /auth/login`
4. En la respuesta, copia el `token`

**Método 3 - Desde Application/Storage:**
1. Abre F12 → Application (o Storage)
2. Ve a Local Storage o Session Storage
3. Busca la clave `token` o `authToken`

---

## 📋 Checklist de Pruebas

Marca cada funcionalidad cuando la pruebes:

### Comentarios
- [ ] Comentario después de estadía completada (éxito)
- [ ] Comentario antes de check-out (error)
- [ ] Segundo comentario en misma reserva (error)

### Contraseña
- [ ] Cambio exitoso
- [ ] Contraseña actual incorrecta (error)
- [ ] Nueva contraseña < 8 caracteres (error)
- [ ] Nueva = Actual (error)

### Imágenes
- [ ] Crear sin imágenes (error)
- [ ] Crear con 1-10 imágenes (éxito)
- [ ] Crear con >10 imágenes (error)
- [ ] Editar con validaciones

### Métricas
- [ ] Ver total de reservas
- [ ] Ver promedio de calificaciones
- [ ] Filtrar por fechas

### Calendario
- [ ] Ver fechas ocupadas
- [ ] Ver fechas disponibles
- [ ] Filtrar por rango

### Mapa
- [ ] Mapa carga correctamente
- [ ] Marcador en ubicación correcta
- [ ] Popup con título

### Favoritos
- [ ] Agregar a favoritos
- [ ] Ver lista de favoritos
- [ ] Eliminar de favoritos
- [ ] Ver contador público

---

## 🐛 Errores Comunes y Soluciones

| Error | Causa | Solución |
|-------|-------|----------|
| `CORS policy` | Backend no permite origen | Verifica `SecurityConfig.java` |
| `401 Unauthorized` | Token inválido/expirado | Cierra sesión e inicia de nuevo |
| `404 Not Found` | Endpoint no existe | Verifica URL del backend |
| Mapa no carga | Token Mapbox inválido | Reemplaza token en `map.component.ts` |
| Favoritos no guardan | Tabla no existe | Ejecuta migración SQL |

---

## 💡 Tips

1. **Siempre abre la consola (F12)** para ver errores y peticiones
2. **Revisa la pestaña Network** para ver todas las peticiones HTTP
3. **Usa el filtro XHR/Fetch** para ver solo peticiones AJAX
4. **Revisa Status Code:**
   - `200` = Éxito
   - `400` = Error del cliente (validación)
   - `401` = No autenticado
   - `403` = No autorizado
   - `404` = No encontrado
   - `500` = Error del servidor

5. **Para probar endpoints directamente:**
   - Usa la consola del navegador con `fetch()`
   - O usa herramientas como Postman/Insomnia

---

¡Listo para probar! 🚀

Si encuentras algún problema, revisa la consola del navegador y comparte el error específico.

