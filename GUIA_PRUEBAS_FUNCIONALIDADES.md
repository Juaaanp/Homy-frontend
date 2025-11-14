# Guía de Pruebas - Funcionalidades Implementadas

## 🚀 Cómo Probar las Funcionalidades desde el Frontend

### Requisitos Previos
1. Asegúrate de que el backend esté corriendo y desplegado en Railway
2. El frontend debe estar desplegado en Vercel o corriendo localmente
3. Abre la consola del navegador (F12) para ver errores y peticiones HTTP

---

## 1. ✅ Validación de Comentarios

### Prueba: Solo después de estadía completada y máximo 1 por reserva

**Pasos:**
1. Inicia sesión como **GUEST** (huésped)
2. Ve a **Mis Reservas** (`/bookings`)
3. Busca una reserva que:
   - Ya haya pasado su fecha de check-out
   - Esté con estado **COMPLETED**
   - No tenga comentario previo
4. Haz clic en "Ver Detalles" de esa reserva
5. Intenta agregar un comentario:
   - ✅ **Debería funcionar** si cumple todas las condiciones
   - ❌ **Debería fallar** si:
     - El check-out aún no ha pasado
     - La reserva no está COMPLETED
     - Ya existe un comentario para esa reserva

**Verificación en consola:**
- Abre F12 → Network
- Busca la petición `POST /housings/{id}/comments/create`
- Revisa la respuesta (debe ser 200 OK o 400 Bad Request con mensaje de error)

---

## 2. 🔐 Cambio de Contraseña

### Prueba: Cambiar contraseña por decisión propia

**Pasos:**
1. Inicia sesión con tu cuenta
2. Ve a **Perfil** (`/profile`)
3. Busca la sección "Cambiar Contraseña" o "Seguridad"
4. Ingresa:
   - Contraseña actual (correcta)
   - Nueva contraseña (mínimo 8 caracteres, diferente a la actual)
5. Haz clic en "Actualizar Contraseña"

**Casos de prueba:**
- ✅ **Contraseña correcta y nueva diferente** → Debe funcionar
- ❌ **Contraseña actual incorrecta** → Error: "La contraseña actual es incorrecta"
- ❌ **Nueva contraseña igual a la actual** → Error: "La nueva contraseña debe ser diferente"
- ❌ **Nueva contraseña < 8 caracteres** → Error: "La contraseña debe tener al menos 8 caracteres"

**Verificación:**
- Cierra sesión e intenta iniciar sesión con la nueva contraseña
- Debe funcionar correctamente

**Endpoint probado:** `PUT /users/{id}/password`

---

## 3. 🖼️ Validación de Imágenes (Mínimo 1, Máximo 10)

### Prueba: Crear/Editar alojamiento con validación de imágenes

**Como HOST (Anfitrión):**

#### Crear Alojamiento:
1. Ve a **Listar Espacio** (`/host/list`)
2. Completa el formulario
3. En la sección de imágenes:
   - ❌ **0 imágenes** → Error: "Debe proporcionar al menos 1 imagen"
   - ✅ **1-10 imágenes** → Debe funcionar
   - ❌ **Más de 10 imágenes** → Error: "No se pueden subir más de 10 imágenes"

#### Editar Alojamiento:
1. Ve a **Mis Listados** (`/host/listings`)
2. Selecciona un alojamiento existente
3. Intenta editar las imágenes:
   - Mismas validaciones que al crear

**Verificación en consola:**
- Busca `POST /housings/create` o `POST /housings/edit/{id}`
- Revisa la respuesta del servidor

---

## 4. 📊 Métricas para Anfitrión

### Prueba: Ver métricas de reservas y calificaciones

**Como HOST:**
1. Inicia sesión como anfitrión
2. Ve a **Mis Listados** (`/host/listings`)
3. Selecciona uno de tus alojamientos
4. Busca la sección "Métricas" o "Estadísticas"
5. Deberías ver:
   - **Número total de reservas** (en un rango de fechas opcional)
   - **Promedio de calificaciones** (en un rango de fechas opcional)

**Opcional - Filtrar por fechas:**
- Selecciona fecha desde y fecha hasta
- Las métricas se actualizarán para ese período

**Verificación en consola:**
- Busca `GET /housings/{housingId}/metrics?dateFrom=...&dateTo=...`
- Revisa la respuesta JSON con `totalBookings` y `averageRating`

**Nota:** Si no hay una interfaz visual aún, puedes probar directamente desde la consola:
```javascript
// En la consola del navegador (F12)
fetch('https://homy-backend-production.up.railway.app/housings/1/metrics', {
  headers: {
    'Authorization': 'Bearer TU_TOKEN_JWT'
  }
})
.then(r => r.json())
.then(console.log)
```

---

## 5. 📅 Calendario de Disponibilidad

### Prueba: Ver fechas ocupadas y disponibles

**Como HOST o GUEST:**
1. Ve a los detalles de un alojamiento (`/property/{id}`)
2. Busca la sección "Disponibilidad" o "Calendario"
3. Deberías ver:
   - Fechas **ocupadas** (marcadas en rojo o bloqueadas)
   - Fechas **disponibles** (marcadas en verde o disponibles)

**Opcional - Filtrar por rango:**
- Selecciona fecha inicio y fecha fin
- El calendario mostrará disponibilidad para ese período

**Verificación en consola:**
- Busca `GET /housings/{housingId}/availability?startDate=...&endDate=...`
- Revisa la respuesta con arrays `bookedDates` y `availableDates`

**Nota:** Si no hay una interfaz visual aún, prueba desde la consola:
```javascript
fetch('https://homy-backend-production.up.railway.app/housings/1/availability', {
  headers: {
    'Authorization': 'Bearer TU_TOKEN_JWT'
  }
})
.then(r => r.json())
.then(console.log)
```

---

## 6. 🗺️ Mapa Interactivo con Mapbox

### Prueba: Ver ubicación en mapa

**Pasos:**
1. Ve a los detalles de cualquier alojamiento (`/property/{id}`)
2. Desplázate hasta la sección "Location" o "Ubicación"
3. Deberías ver un **mapa interactivo** mostrando:
   - La ubicación del alojamiento
   - Un marcador con el título del alojamiento
   - Posibilidad de hacer zoom y mover el mapa

**Verificación:**
- El mapa debe cargar correctamente
- El marcador debe estar en las coordenadas correctas (latitud/longitud)
- Al hacer clic en el marcador, debe mostrar un popup con el título

**Nota importante:**
- Si el mapa no carga, verifica que tengas un token válido de Mapbox
- El token actual es de ejemplo, necesitas reemplazarlo en `src/app/components/map/map.component.ts`

**Para obtener un token de Mapbox:**
1. Ve a https://account.mapbox.com/
2. Crea una cuenta o inicia sesión
3. Ve a "Access tokens"
4. Copia tu token público
5. Reemplázalo en el código

---

## 7. ❤️ Funcionalidad de Favoritos

### Prueba: Agregar, ver y eliminar favoritos

#### Agregar a Favoritos:
1. Inicia sesión como **GUEST**
2. Ve a los detalles de un alojamiento (`/property/{id}`)
3. Haz clic en el botón **"Save"** o **"❤️"** en la parte superior
4. El botón debe cambiar a **"Saved"** y el corazón debe llenarse
5. El contador de favoritos debe aumentar

**Verificación en consola:**
- Busca `POST /favorites/{housingId}` → Debe ser 200 OK
- Busca `GET /favorites/{housingId}/check` → Debe retornar `{"isFavorite": true}`

#### Ver Mis Favoritos:
1. Ve a **Favoritos** (`/favorites`) desde el menú o navegación
2. Deberías ver una lista de todos los alojamientos que has guardado
3. Cada tarjeta muestra:
   - Imagen del alojamiento
   - Título
   - Ubicación
   - Precio por noche
   - Botón para eliminar (corazón rojo)
   - Botón "Ver Detalles"

**Verificación en consola:**
- Busca `GET /favorites` → Debe retornar `{"housingIds": [1, 2, 3, ...]}`

#### Eliminar de Favoritos:
1. En la página de Favoritos, haz clic en el corazón rojo de cualquier alojamiento
2. O en los detalles del alojamiento, haz clic en "Saved" nuevamente
3. El alojamiento debe desaparecer de la lista
4. El contador debe disminuir

**Verificación en consola:**
- Busca `DELETE /favorites/{housingId}` → Debe ser 200 OK

#### Verificar Contador de Favoritos:
1. En los detalles de cualquier alojamiento, deberías ver cuántas personas lo han guardado
2. Este contador es público (no requiere autenticación)

**Verificación en consola:**
- Busca `GET /favorites/{housingId}/count` → Debe retornar `{"count": 5}`

---

## 🔍 Cómo Verificar las Peticiones HTTP

### Usando la Consola del Navegador:

1. **Abre las Herramientas de Desarrollador:**
   - Presiona `F12` o `Ctrl+Shift+I` (Windows/Linux)
   - O `Cmd+Option+I` (Mac)

2. **Ve a la pestaña "Network" (Red):**
   - Aquí verás todas las peticiones HTTP

3. **Filtra por tipo:**
   - Busca peticiones `XHR` o `Fetch`
   - O busca por el nombre del endpoint (ej: `/favorites`, `/comments`)

4. **Revisa cada petición:**
   - **Headers**: Verifica que el `Authorization: Bearer TOKEN` esté presente
   - **Payload**: Revisa los datos enviados
   - **Response**: Revisa la respuesta del servidor
   - **Status**: Debe ser `200 OK` para éxito, `400/401/403` para errores

### Ejemplo de Petición Exitosa:
```
POST /housings/1/comments/create
Status: 200 OK
Response: {
  "message": "Comentario creado exitosamente",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Ejemplo de Error:
```
POST /housings/1/comments/create
Status: 400 Bad Request
Response: {
  "error": "Solo puedes comentar después de completar tu estadía (después del check-out)"
}
```

---

## 🐛 Solución de Problemas Comunes

### Error: "CORS policy"
- **Causa**: El backend no permite el origen del frontend
- **Solución**: Verifica que `SecurityConfig.java` incluya tu URL de Vercel

### Error: "401 Unauthorized"
- **Causa**: Token JWT inválido o expirado
- **Solución**: Cierra sesión e inicia sesión nuevamente

### Error: "404 Not Found"
- **Causa**: El endpoint no existe o la URL está mal
- **Solución**: Verifica que el backend esté desplegado y la URL sea correcta

### El mapa no carga
- **Causa**: Token de Mapbox inválido o no configurado
- **Solución**: Reemplaza el token en `map.component.ts`

### Los favoritos no se guardan
- **Causa**: La tabla `favorites` no existe en la base de datos
- **Solución**: Ejecuta la migración SQL para crear la tabla

---

## 📝 Checklist de Pruebas

Marca cada funcionalidad cuando la hayas probado:

- [ ] Validación de comentarios (solo después de estadía completada)
- [ ] Validación de comentarios (máximo 1 por reserva)
- [ ] Cambio de contraseña (caso exitoso)
- [ ] Cambio de contraseña (casos de error)
- [ ] Validación de imágenes al crear (mínimo 1)
- [ ] Validación de imágenes al crear (máximo 10)
- [ ] Validación de imágenes al editar
- [ ] Ver métricas de alojamiento (reservas)
- [ ] Ver métricas de alojamiento (calificaciones)
- [ ] Ver calendario de disponibilidad
- [ ] Mapa interactivo muestra ubicación
- [ ] Agregar alojamiento a favoritos
- [ ] Ver lista de favoritos
- [ ] Eliminar de favoritos
- [ ] Ver contador de favoritos

---

## 🎯 Próximos Pasos

Si alguna funcionalidad no tiene interfaz visual aún, puedes:
1. Probar directamente desde la consola del navegador usando `fetch()`
2. Usar herramientas como Postman o Insomnia
3. Solicitar que se cree la interfaz visual para esa funcionalidad

¡Buena suerte con las pruebas! 🚀

