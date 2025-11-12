# 🚀 Instrucciones de Despliegue en Firebase

## ✅ Pasos completados:
- ✅ Rama `firebase` creada
- ✅ `environment.prod.ts` actualizado con URL de Railway
- ✅ Firebase CLI instalado
- ✅ Login en Firebase completado

## 📋 Próximos pasos:

### 1. Crear proyecto en Firebase Console (HAZLO AHORA)
1. Ve a: https://console.firebase.google.com/
2. Click en "Agregar proyecto" o "Add project"
3. Nombre: `homy-app` (o el que prefieras)
4. Deshabilita "Google Analytics" 
5. Click en "Crear proyecto"
6. Espera a que se cree (puede tardar 1-2 minutos)

### 2. Inicializar Firebase en el proyecto
```bash
cd /home/juan/Universidad/PAvanzada/Proyecto_FInal/Homy-frontend
firebase init
```

Responde así:
- **Which Firebase features?** → Selecciona `Hosting` (usa espacio para marcar, Enter para confirmar)
- **Project Setup** → `Use an existing project` → Selecciona `homy-app` (o el nombre que elegiste)
- **What do you want to use as your public directory?** → Presiona Enter (deja `public`)
- **Configure as a single-page app?** → `Y` (Yes)
- **Set up automatic builds and deploys with GitHub?** → `n` (No)
- **File public/index.html already exists. Overwrite?** → `N` (No)

### 3. Configurar firebase.json
Después de `firebase init`, edita el archivo `firebase.json`:

```json
{
  "hosting": {
    "public": "dist/homy/browser",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### 4. Compilar el proyecto para producción
```bash
ng build --configuration=production
```

Este comando puede tardar 1-3 minutos. Creará la carpeta `dist/homy/browser/`.

### 5. Verificar que se creó la carpeta dist
```bash
ls -la dist/homy/browser/
```

Deberías ver archivos como `index.html`, `main-*.js`, `styles-*.css`, etc.

### 6. Desplegar en Firebase
```bash
firebase deploy
```

Este comando:
- Sube los archivos a Firebase Hosting
- Te dará una URL como: `https://homy-app.web.app` o `https://homy-app.firebaseapp.com`

### 7. ¡Listo! 🎉
Copia la URL que te da Firebase y pruébala en el navegador.

## 🔧 Actualizar CORS en el Backend

Una vez tengas la URL de Firebase, debes actualizar el backend para permitir solicitudes desde esa URL:

1. Cambia a la rama `railway` del backend:
```bash
cd /home/juan/Universidad/PAvanzada/Proyecto_FInal/Homy-Backend
git checkout railway
```

2. Edita `src/main/java/co/edu/uniquindio/application/Config/SecurityConfig.java`

3. Busca la línea:
```java
configuration.setAllowedOrigins(List.of("http://localhost:3000", "http://localhost:4200"));
```

4. Agrégale tu URL de Firebase:
```java
configuration.setAllowedOrigins(List.of(
    "http://localhost:3000", 
    "http://localhost:4200",
    "https://homy-app.web.app",
    "https://homy-app.firebaseapp.com"
));
```

5. Commit y push:
```bash
git add src/main/java/co/edu/uniquindio/application/Config/SecurityConfig.java
git commit -m "Add Firebase URLs to CORS configuration"
git push origin railway
```

6. Railway detectará el cambio y redesplegará automáticamente (tarda 2-5 minutos)

## 📝 Notas Importantes

- **Cada vez que hagas cambios en el frontend**, debes:
  1. `ng build --configuration=production`
  2. `firebase deploy`

- **Para ver logs de Firebase**:
  ```bash
  firebase hosting:channel:list
  ```

- **Para volver a desarrollo local**:
  ```bash
  git checkout main
  ```

## 🐛 Troubleshooting

### Error: "Cannot find module 'firebase-tools'"
```bash
sudo npm install -g firebase-tools
```

### Error: "You are not currently logged in"
```bash
firebase login
```

### Error: "Project not found"
Ve a Firebase Console y asegúrate de que el proyecto existe.

### Error de compilación en ng build
- Revisa los errores en la consola
- Si es por tamaño de bundle, aumenta los valores en `angular.json` → `budgets`

### El frontend no se conecta al backend
- Verifica que `environment.prod.ts` tenga la URL correcta de Railway
- Verifica que las URLs de Firebase estén en CORS del backend
- Abre DevTools → Network y revisa las peticiones
