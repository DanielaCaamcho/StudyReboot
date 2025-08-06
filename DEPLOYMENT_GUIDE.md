# 🚀 Guía de Despliegue - StudyReboot

## 🔥 **OPCIÓN 1: Firebase Hosting (RECOMENDADO)**

Firebase Hosting es perfecto para tu app porque ya usas Firebase:

### 1. Instalar Firebase CLI:
```bash
npm install -g firebase-tools
```

### 2. Login a Firebase:
```bash
firebase login
```

### 3. Inicializar Firebase Hosting:
```bash
cd /Users/dcamacho/Documents/study-reboot
firebase init hosting
```

**Configuración recomendada:**
- ✅ Use an existing project: `study-reboot` (tu proyecto)
- ✅ Public directory: `dist`  
- ✅ Configure as single-page app: `y`
- ✅ Set up automatic builds: `n` (por ahora)
- ✅ Overwrite index.html: `n`

### 4. Construir la app:
```bash
npm run build
```

### 5. Desplegar:
```bash
firebase deploy
```

**Ventajas:**
- ✅ Misma plataforma que tu base de datos
- ✅ SSL automático
- ✅ CDN global
- ✅ Sin configuración extra de variables
- ✅ Dominio gratuito: `study-reboot.web.app`

---

## 🌐 **OPCIÓN 2: Netlify**

Si prefieres usar Netlify:

### 1. Ve a [netlify.com](https://netlify.com) y conecta tu repositorio de GitHub

### 2. Configurar build:
- **Build command**: `npm run build`
- **Publish directory**: `dist`

### 3. ⚠️ **IMPORTANTE**: Agregar variables de entorno en Netlify:
```
VITE_FIREBASE_API_KEY=AIzaSyB1vxh7shJcrNiDHqZy07qN3IqQps5PpuA
VITE_FIREBASE_AUTH_DOMAIN=study-reboot.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=study-reboot
VITE_FIREBASE_STORAGE_BUCKET=study-reboot.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1017200029815
VITE_FIREBASE_APP_ID=1:1017200029815:web:a4983fbb768cdb8bdf9672
```

### 4. Configurar redirects para SPA:
Crear archivo `public/_redirects`:
```
/*    /index.html   200
```

**Ventajas:**
- ✅ Deploy automático desde GitHub
- ✅ Preview branches
- ✅ Edge functions disponibles

---

## 🎯 **Recomendación:**

**Usa Firebase Hosting** porque:
1. Tu app ya usa Firebase para autenticación y base de datos
2. Todo en una plataforma = menos complejidad
3. No necesitas configurar variables de entorno adicionales
4. Mejor rendimiento al estar todo integrado

**Dominio final**: `https://study-reboot.web.app`

---

## 📱 **Después del despliegue:**

1. ✅ Probar login/registro en producción
2. ✅ Verificar que los datos se sincronicen
3. ✅ Probar en diferentes dispositivos
4. ✅ Compartir la URL con otros para que prueben

¿Cuál prefieres usar? 🤔
