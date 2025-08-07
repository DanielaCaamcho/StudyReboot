# StudyReboot 📚🚀


**🎉 Firebase configurado y activo:**
- ✅ Autenticación en la nube con Firebase Authentication
- ✅ Sincronización de datos en Firestore
- ✅ Login/registro completamente funcional
- ✅ Datos persistentes entre dispositivos y sesiones

## ✨ Características Principales

### 🔐 **Sistema de Login y Sincronización** ⭐ 
- 👤 **Autenticación Completa**: Login y registro con email y contraseña
- 🔄 **Sincronización Local**: Todos los datos se mantienen entre sesiones
- 👥 **Perfiles de Usuario**: Cada usuario tiene su progreso personal
- 🔒 **Datos Privados**: Solo tú puedes acceder a tu información
- ⚡ **Funciona Offline**: No requiere internet para usar

### 📈 **Sistema de Estadísticas Completo** ⭐ 
- 📅 **Métricas por Período**: Hoy, esta semana, este mes
- 🔥 **Racha de Dº1ías Consecutivos**: Motiva la constancia diaria
- 🏆 **Mejor Día Personal**: Celebra tus logros máximos
- 📊 **Promedio por Sesión**: Analiza tu rendimiento
- 📝 **Historial Detallado**: Últimas 10 sesiones con fecha y hora
- 💾 **Guardado Automático**: Cada sesión se registra al finalizarla


### 💭 **Mensajes Motivacionales Mejorados**
- 🔄 **Frases Rotativas**: Colección ampliada de mensajes inspiradores
- 🎲 **Botón de Actualización**: Nueva frase al hacer clic

### ❓ **Gestión de Preguntas Mejorada**
- ➕ **Agregar Rápido**: Interfaz simplificada para nuevas preguntas
- 🔍 **Búsqueda Avanzada**: Campo de búsqueda con ícono separado
- ✅ **Marcar Resueltas**: Botón circular clickeable mejorado
- 📝 **Sistema de Notas Inline**: Editor integrado con guardar/cancelar
- ⌨️ **Soporte Enter**: Agregar preguntas con la tecla Enter

### 📝 Sistema de Notas
- Crear, editar y organizar notas por categoría
- Soporte de texto enriquecido con funcionalidad de búsqueda
- Diseño en cuadrícula para navegación fácil
- Marcas de tiempo y categorías de guardado automático
- Vista previa rápida con contenido expandible

### 📅 Calendario y Eventos
- Vista de calendario mensual con navegación
- Agregar sesiones de estudio, exámenes, tareas y fechas límite

### 🌡️ Seguimiento del Estado de Ánimo
- Registro diario del estado de ánimo con selección de emojis (Excelente, Bueno, Regular, Estresado, Triste)
- Notas opcionales para cada entrada de estado de ánimo
- Correlación con horas de estudio
- Estadísticas semanales/mensuales del estado de ánimo
- Visualización del historial de estado de ánimo

### 📊 Análisis de Estudio
- Seguimiento de tiempo en todas las sesiones de estudio
- Estadísticas diarias, semanales y mensuales
- Visualización del progreso
- Análisis de patrones de estudio y días productivos

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 con TypeScript
- **Herramienta de Construcción**: Vite
- **Estilos**: CSS Modules (diseño responsivo)
- **Íconos**: Lucide React
- **Autenticación**: Sistema demo local completo
- **Almacenamiento**: LocalStorage para persistencia total
- **Navegación**: Sistema de enrutamiento personalizado


- Node.js (v18 o superior)
- npm o yarn


1. Clona el repositorio:
```bash
git clone <repository-url>
cd study-reboot
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador y navega a `http://localhost:5173`

### Construcción para Producción

```bash
npm run build
```



- `npm run dev` - Iniciar servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run preview` - Vista previa de construcción de producción
- `npm run lint` - Ejecutar ESLint

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes UI reutilizables
│   ├── Navigation/      # Componentes de navegación
│   ├── Timer/          # Componente del temporizador
│   └── MotivationalMessage/
├── hooks/              # Hooks personalizados de React
├── pages/              # Páginas principales de la aplicación
│   ├── Home/
│   ├── Questions/
│   ├── Notes/
│   ├── Calendar/
│   └── Mood/
├── styles/             # Estilos globales y módulos CSS
├── types/              # Definiciones de tipos TypeScript
└── App.tsx            # Componente principal de la aplicación
```
