# 🧪 Guía de Pruebas - Interfaz Gráfica

## 🌐 Acceso a la Aplicación

**URL Principal**: [https://homy-frontend.vercel.app](https://homy-frontend.vercel.app)

---

## 📋 Funcionalidades Disponibles

### 🔓 **Sin Autenticación (Público)**

#### 1. **Página Principal (Home)**
- **URL**: `https://homy-frontend.vercel.app/`
- **Qué puedes hacer**:
  - Ver propiedades destacadas
  - Buscar propiedades por ubicación, fechas y huéspedes
  - Navegar por categorías
  - Acceder al registro o login

#### 2. **Explorar Propiedades**
- **URL**: `https://homy-frontend.vercel.app/explore`
- **Qué puedes hacer**:
  - Ver todas las propiedades disponibles
  - Filtrar por ubicación, precio, tipo, calificación
  - Cambiar entre vista de cuadrícula y lista
  - Hacer clic en una propiedad para ver detalles

#### 3. **Detalles de Propiedad**
- **URL**: `https://homy-frontend.vercel.app/property/{id}`
- **Ejemplo**: `https://homy-frontend.vercel.app/property/1`
- **Qué puedes hacer**:
  - Ver información completa de la propiedad
  - Ver imágenes, descripción, servicios
  - Ver comentarios (si hay)
  - Hacer clic en "Reservar ahora"

#### 4. **Registro de Usuario**
- **URL**: `https://homy-frontend.vercel.app/register`
- **Qué puedes hacer**:
  - Crear una nueva cuenta
  - Campos: nombre, email, contraseña, teléfono, fecha de nacimiento
  - Después del registro, serás redirigido al login

#### 5. **Inicio de Sesión**
- **URL**: `https://homy-frontend.vercel.app/login`
- **Qué puedes hacer**:
  - Iniciar sesión con email y contraseña
  - Acceder a funcionalidades de usuario autenticado

#### 6. **Recuperación de Contraseña**
- **URL**: `https://homy-frontend.vercel.app/forgot-password`
- **Qué puedes hacer**:
  - Solicitar código de recuperación por email
  - Verificar código: `https://homy-frontend.vercel.app/verify-code`
  - Restablecer contraseña: `https://homy-frontend.vercel.app/reset-password`

---

### 🔐 **Con Autenticación (Requiere Login)**

#### 7. **Crear Reserva**
- **URL**: `https://homy-frontend.vercel.app/booking`
- **Requisito**: Debes estar logueado como GUEST
- **Qué puedes hacer**:
  - Paso 1: Seleccionar fechas y número de huéspedes
  - Paso 2: Ingresar detalles del huésped
  - Paso 3: Confirmar y pagar
  - Crear una nueva reserva

#### 8. **Mis Reservas**
- **URL**: `https://homy-frontend.vercel.app/bookings`
- **Requisito**: Debes estar logueado como GUEST
- **Qué puedes hacer**:
  - Ver todas tus reservas
  - Ver estado de cada reserva (Pendiente, Confirmada, Completada, Cancelada)
  - Cancelar reservas

#### 9. **Publicar Alojamiento (Host)**
- **URL**: `https://homy-frontend.vercel.app/host/list`
- **Requisito**: Debes estar logueado como HOST
- **Qué puedes hacer**:
  - Paso 1: Información básica (título, descripción, tipo)
  - Paso 2: Ubicación (ciudad, dirección, coordenadas)
  - Paso 3: Precios y capacidad
  - Paso 4: Servicios/amenidades
  - Paso 5: Revisar y publicar

#### 10. **Mis Alojamientos (Host)**
- **URL**: `https://homy-frontend.vercel.app/host/listings`
- **Requisito**: Debes estar logueado como HOST
- **Qué puedes hacer**:
  - Ver todos tus alojamientos publicados
  - Editar alojamientos existentes
  - Eliminar alojamientos
  - Ver detalles de cada alojamiento

#### 11. **Perfil de Usuario**
- **URL**: `https://homy-frontend.vercel.app/profile`
- **Requisito**: Debes estar logueado
- **Qué puedes hacer**:
  - Ver tu información personal
  - Editar perfil (nombre, teléfono, foto)
  - Ver estadísticas (reservas, reseñas)
  - Configurar preferencias

---

## 🧪 Flujo de Pruebas Recomendado

### **Prueba 1: Usuario Nuevo (GUEST)**

1. **Registro**
   - Ve a: `https://homy-frontend.vercel.app/register`
   - Completa el formulario y regístrate
   - Verifica que te redirija al login

2. **Login**
   - Ve a: `https://homy-frontend.vercel.app/login`
   - Inicia sesión con tus credenciales

3. **Explorar Propiedades**
   - Ve a: `https://homy-frontend.vercel.app/explore`
   - Navega por las propiedades disponibles
   - Haz clic en una propiedad para ver detalles

4. **Ver Detalles**
   - En la página de detalles, revisa toda la información
   - Verifica que se muestren imágenes, descripción, servicios

5. **Crear Reserva**
   - Haz clic en "Reservar ahora"
   - Completa los 3 pasos del proceso de reserva
   - Confirma la reserva

6. **Ver Mis Reservas**
   - Ve a: `https://homy-frontend.vercel.app/bookings`
   - Verifica que aparezca tu reserva recién creada
   - Prueba cancelar una reserva

7. **Perfil**
   - Ve a: `https://homy-frontend.vercel.app/profile`
   - Edita tu información personal
   - Verifica que se guarde correctamente

---

### **Prueba 2: Usuario Host**

1. **Registro como Host**
   - Regístrate normalmente (el rol se asigna automáticamente o manualmente en el backend)
   - O usa una cuenta existente con rol HOST

2. **Publicar Alojamiento**
   - Ve a: `https://homy-frontend.vercel.app/host/list`
   - Completa los 5 pasos del formulario
   - Publica tu alojamiento

3. **Ver Mis Alojamientos**
   - Ve a: `https://homy-frontend.vercel.app/host/listings`
   - Verifica que aparezca tu alojamiento
   - Prueba editar un alojamiento
   - Prueba eliminar un alojamiento

4. **Ver Reservas de Mis Alojamientos**
   - Como host, deberías poder ver las reservas de tus propiedades
   - (Esto puede estar en la página de detalles del alojamiento)

---

### **Prueba 3: Funcionalidades Públicas**

1. **Página Principal**
   - Ve a: `https://homy-frontend.vercel.app/`
   - Prueba la búsqueda con diferentes parámetros
   - Navega por las categorías
   - Verifica que las propiedades destacadas se muestren

2. **Explorar Sin Login**
   - Ve a: `https://homy-frontend.vercel.app/explore`
   - Prueba los filtros
   - Cambia entre vista de cuadrícula y lista
   - Haz clic en una propiedad

3. **Recuperación de Contraseña**
   - Ve a: `https://homy-frontend.vercel.app/forgot-password`
   - Ingresa un email válido
   - Verifica que recibas el código
   - Completa el proceso de recuperación

---

## 🔍 Verificación de Conexión Backend

### **Cómo Verificar que Funciona**

1. **Abre la Consola del Navegador** (F12)
2. **Ve a la pestaña "Network" (Red)**
3. **Realiza cualquier acción** (login, buscar propiedades, etc.)
4. **Verifica las peticiones HTTP**:
   - Deben ir a: `https://homy-backend-production.up.railway.app`
   - Deben tener código de estado 200 (éxito) o 201 (creado)
   - Si hay errores 401/403, verifica que estés logueado
   - Si hay errores 404, verifica la URL del endpoint

### **Errores Comunes**

- **CORS Error**: El backend no está permitiendo peticiones desde Vercel
  - Solución: Verifica que el backend esté desplegado y CORS configurado

- **401 Unauthorized**: No estás autenticado
  - Solución: Inicia sesión primero

- **403 Forbidden**: No tienes permisos
  - Solución: Verifica que tengas el rol correcto (GUEST o HOST)

- **404 Not Found**: Endpoint no existe
  - Solución: Verifica que la URL del endpoint sea correcta

---

## 📝 Notas Importantes

1. **Primera vez**: Si es la primera vez que usas la aplicación, es posible que no haya propiedades en la base de datos. Necesitarás crear algunas como HOST primero.

2. **Roles**: 
   - Los usuarios nuevos generalmente son GUEST por defecto
   - Para ser HOST, puede que necesites cambiar el rol manualmente en el backend o hay un proceso específico

3. **Datos de Prueba**: Si no hay datos, crea algunos alojamientos como HOST para poder probar las funcionalidades de búsqueda y reserva.

---

## ✅ Checklist de Pruebas

- [ ] Página principal carga correctamente
- [ ] Búsqueda de propiedades funciona
- [ ] Registro de usuario funciona
- [ ] Login funciona
- [ ] Explorar propiedades muestra resultados
- [ ] Detalles de propiedad se muestran correctamente
- [ ] Crear reserva funciona (como GUEST)
- [ ] Ver mis reservas funciona
- [ ] Publicar alojamiento funciona (como HOST)
- [ ] Ver mis alojamientos funciona
- [ ] Editar perfil funciona
- [ ] Recuperación de contraseña funciona
- [ ] Comentarios se muestran en propiedades
- [ ] Filtros de búsqueda funcionan

---

¡Listo para probar! 🚀

