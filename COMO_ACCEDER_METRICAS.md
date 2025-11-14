# 📊 Cómo Acceder a Métricas y Estadísticas

## 🎯 Acceso Rápido

### Para HOST (Anfitrión):

1. **Inicia sesión** como HOST
2. **Ve a "Mis Listados"**: `/host/listings` o haz clic en "My Listings" en el menú
3. **En cada alojamiento**, verás un botón **"Metrics"** (con icono de gráfico 📊)
4. **Haz clic en "Metrics"** para ver las estadísticas de ese alojamiento

---

## 📋 Qué Muestran las Métricas

Cuando hagas clic en "Metrics", verás un popup con:

- **Total de Reservas**: Número total de reservas que ha recibido el alojamiento
- **Calificación Promedio**: Promedio de todas las calificaciones (1-5 estrellas)
- **Rango de Fechas**: Si aplicaste filtros de fechas (opcional)

---

## 🔍 Método Alternativo: Desde la Consola del Navegador

Si prefieres ver los datos directamente o probar con filtros de fechas:

1. **Abre la consola del navegador** (F12)
2. **Copia y pega este código** (reemplaza los valores):

```javascript
// Reemplaza estos valores:
const housingId = 1; // ID de tu alojamiento
const token = 'TU_TOKEN_JWT'; // Tu token JWT
const dateFrom = '2024-01-01'; // Opcional: fecha desde (YYYY-MM-DD)
const dateTo = '2024-12-31'; // Opcional: fecha hasta (YYYY-MM-DD)

// Construir URL
let url = `https://homy-backend-production.up.railway.app/housings/${housingId}/metrics`;
if (dateFrom || dateTo) {
  const params = new URLSearchParams();
  if (dateFrom) params.append('dateFrom', dateFrom);
  if (dateTo) params.append('dateTo', dateTo);
  url += '?' + params.toString();
}

// Hacer petición
fetch(url, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
.then(r => r.json())
.then(data => {
  console.log('📊 Métricas:', data);
  console.log('Total reservas:', data.totalBookings);
  console.log('Calificación promedio:', data.averageRating);
})
.catch(error => console.error('Error:', error));
```

### Cómo obtener tu Token JWT:

**Opción 1 - Desde la consola:**
```javascript
// Después de iniciar sesión
localStorage.getItem('token')
// O
sessionStorage.getItem('token')
```

**Opción 2 - Desde Network:**
1. Abre F12 → Network
2. Inicia sesión
3. Busca la petición `POST /auth/login`
4. En la respuesta, copia el `accessToken`

---

## 📅 Calendario de Disponibilidad

Para ver el calendario de disponibilidad (fechas ocupadas/disponibles):

### Desde la Consola:

```javascript
const housingId = 1; // ID de tu alojamiento
const token = 'TU_TOKEN_JWT'; // Tu token JWT
const startDate = '2024-01-01'; // Opcional
const endDate = '2024-12-31'; // Opcional

let url = `https://homy-backend-production.up.railway.app/housings/${housingId}/availability`;
if (startDate || endDate) {
  const params = new URLSearchParams();
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  url += '?' + params.toString();
}

fetch(url, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
.then(r => r.json())
.then(data => {
  console.log('📅 Calendario:', data);
  console.log('Fechas ocupadas:', data.bookedDates);
  console.log('Fechas disponibles:', data.availableDates);
})
.catch(error => console.error('Error:', error));
```

---

## 🎨 Interfaz Visual (Próximamente)

Actualmente las métricas se muestran en un popup. En el futuro se podría agregar:

- Una página dedicada `/host/metrics` o `/host/analytics`
- Gráficos visuales (barras, líneas)
- Comparación entre alojamientos
- Filtros avanzados por fecha
- Exportar datos a CSV/PDF

---

## ✅ Resumen

**Forma más fácil:**
1. Login como HOST
2. `/host/listings`
3. Clic en "Metrics" en cualquier alojamiento
4. Ver popup con estadísticas

**Forma avanzada:**
- Usar la consola del navegador con `fetch()`
- Permite filtros personalizados por fechas

---

¿Necesitas ayuda con algo más?

