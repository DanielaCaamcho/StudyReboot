# Configuración de Firebase para StudyReboot

## 1. Crear un proyecto de Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto llamado "StudyReboot"
3. Habilita Google Analytics (opcional)

## 2. Configurar Authentication

1. En la consola de Firebase, ve a **Authentication** > **Sign-in method**
2. Habilita **Email/Password** como proveedor de autenticación
3. Opcionalmente, habilita otros proveedores como Google

## 3. Configurar Firestore Database

1. Ve a **Firestore Database** > **Create database**
2. Selecciona **Start in test mode** (cambiaremos las reglas después)
3. Elige una ubicación cercana a tus usuarios

## 4. Configurar reglas de seguridad de Firestore

Reemplaza las reglas por defecto con estas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permite a los usuarios autenticados leer/escribir solo sus propios datos
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 5. Obtener la configuración del proyecto

1. Ve a **Project Settings** (ícono de engranaje)
2. En la sección **Your apps**, selecciona **Web app** (</> icon)
3. Registra tu app con el nombre "StudyReboot"
4. Copia la configuración que aparece

## 6. Configurar variables de entorno

1. Crea un archivo `.env` en la raíz del proyecto
2. Copia el contenido de `.env.example` y reemplaza con tus valores reales:

```env
VITE_FIREBASE_API_KEY=tu-api-key-real
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu-sender-id
VITE_FIREBASE_APP_ID=tu-app-id
```

## 7. Estructura de datos en Firestore

Cada usuario tendrá un documento en la colección `users` con la siguiente estructura:

```javascript
{
  email: "usuario@email.com",
  displayName: "Nombre del Usuario",
  createdAt: timestamp,
  studySessions: [...],
  questions: [...],
  notes: [...],
  tasks: [...],
  calendarEvents: [...],
  moodEntries: [...],
  settings: {...}
}
```

## 8. Testing

Una vez configurado, los usuarios podrán:
- Registrarse con email y contraseña
- Iniciar sesión desde cualquier dispositivo
- Sincronizar automáticamente todos sus datos
- Mantener su progreso en la nube

## Notas importantes

- Mantén tu archivo `.env` privado (ya está en .gitignore)
- Para producción, configura las reglas de Firestore apropiadamente
- Considera habilitar más métodos de autenticación según tus necesidades
