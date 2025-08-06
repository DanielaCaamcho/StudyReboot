# 🚀 Guía Rápida: Configurar Login en StudyReboot

## Opción 1: Usar Versión Demo (ACTUAL) ✅
**¡Ya funciona!** La aplicación está configurada con una versión demo que simula Firebase.

### Cómo probar:
1. Ve a la sección "Cuenta" en la navegación
2. Crea una cuenta con cualquier email y contraseña
3. Los datos se guardan localmente en tu navegador
4. Puedes cerrar sesión e iniciar sesión nuevamente

### Usuarios de prueba:
- **Email**: `demo@studyreboot.com`
- **Contraseña**: `123456`
- **Nombre**: `Usuario Demo`

---

## Opción 2: Configurar Firebase Real (Recomendado para producción)

### Paso 1: Crear proyecto Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Clic en "Crear un proyecto"
3. Nombre: `study-reboot`
4. Habilitar Google Analytics (opcional)

### Paso 2: Configurar Authentication
1. En el menú lateral: **Authentication** > **Get started**
2. Pestaña **Sign-in method**
3. Habilitar **Email/Password**

### Paso 3: Configurar Firestore Database
1. En el menú lateral: **Firestore Database** > **Create database**
2. Seleccionar **Start in test mode**
3. Elegir ubicación (ej: us-central1)

### Paso 4: Obtener configuración
1. Ve a **Project Settings** (⚙️ ícono)
2. Sección **Your apps** > Agregar app web (</> ícono)
3. Nombre de la app: `StudyReboot`
4. Copiar el objeto `firebaseConfig`

### Paso 5: Actualizar variables de entorno
Edita el archivo `.env` con tus valores reales:

```env
VITE_FIREBASE_API_KEY=tu-api-key-aqui
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu-messaging-sender-id
VITE_FIREBASE_APP_ID=tu-app-id
```

### Paso 6: Cambiar a Firebase real
En `src/App.tsx`, cambiar la importación:

```tsx
// Cambiar de:
import { AuthProvider } from './contexts/AuthContextDemo';

// A:
import { AuthProvider } from './contexts/AuthContext';
```

### Paso 7: Reiniciar aplicación
```bash
npm run dev
```

---

## 🔒 Reglas de Seguridad de Firestore

Cuando configures Firebase, usa estas reglas de seguridad:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## ✅ Verificar que funciona

1. Crear cuenta nueva
2. Iniciar sesión
3. Agregar datos (notas, preguntas, etc.)
4. Cerrar sesión
5. Iniciar sesión desde otro navegador/dispositivo
6. Verificar que los datos están sincronizados

---

## 🆘 Solución de Problemas

### Error: "Firebase not configured"
- Verificar que las variables de entorno estén correctas
- Reiniciar el servidor de desarrollo

### Error: "Auth domain not configured"
- Verificar `VITE_FIREBASE_AUTH_DOMAIN` en `.env`
- Debe terminar en `.firebaseapp.com`

### Error: "Permission denied"
- Verificar las reglas de seguridad de Firestore
- Asegurar que Authentication esté habilitado

### Los datos no se sincronizan
- Verificar la conexión a internet
- Abrir la consola del navegador para ver errores
- Verificar que el usuario esté autenticado
