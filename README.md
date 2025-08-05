# StudyReboot 📚🚀

[![Deploy Status](https://github.com/DanielaCaamcho/study-reboot/workflows/Deploy%20StudyReboot/badge.svg)](https://github.com/DanielaCaamcho/study-reboot/actions)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://danielacaamcho.github.io/study-reboot/)
[![React](https://img.shields.io/badge/React-18.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0-purple)](https://vitejs.dev/)

Una aplicación web moderna y completa para gestionar tu tiempo de estudio, mantener la motivación y hacer seguimiento de tu progreso académico. Construida con React, TypeScript y Vite.

## ✨ Características Principales

### � **Timer de Estudio Inteligente**
- ⏱️ **Timer Circular**: Progreso visual con barra circular animada
- ✅ **Finalizar Sesión**: Botón dedicado para registrar automáticamente el tiempo estudiado
- 🎉 **Modal Celebratorio**: Confirmación visual al completar sesiones
- 📊 **Estadísticas en Tiempo Real**: Conteo automático del tiempo estudiado hoy

### 📈 **Sistema de Estadísticas Completo** ⭐ NUEVO
- 📅 **Métricas por Período**: Hoy, esta semana, este mes
- 🔥 **Racha de Días Consecutivos**: Motiva la constancia diaria
- 🏆 **Mejor Día Personal**: Celebra tus logros máximos
- 📊 **Promedio por Sesión**: Analiza tu rendimiento
- 📝 **Historial Detallado**: Últimas 10 sesiones con fecha y hora
- 💾 **Guardado Automático**: Cada sesión se registra al finalizarla

### 💭 **Mensajes Motivacionales Mejorados**

### 💭 **Mensajes Motivacionales Mejorados**
- 🔄 **Frases Rotativas**: Colección ampliada de mensajes inspiradores
- 🎲 **Botón de Actualización**: Nueva frase al hacer clic
- ✍️ **Autores Incluidos**: Atribución a grandes pensadores
- 🎨 **Diseño Atractivo**: Visual destacado y professional

### ❓ **Gestión de Preguntas Mejorada**
### ❓ **Gestión de Preguntas Mejorada**
- ➕ **Agregar Rápido**: Interfaz simplificada para nuevas preguntas
- 🔍 **Búsqueda Avanzada**: Campo de búsqueda con ícono separado
- ✅ **Marcar Resueltas**: Botón circular clickeable mejorado
- 📝 **Sistema de Notas Inline**: Editor integrado con guardar/cancelar
- ⌨️ **Soporte Enter**: Agregar preguntas con la tecla Enter
- 🎯 **Traducción Completa**: Interfaz 100% en español

### 📝 Sistema de Notas
- Crear, editar y organizar notas por categoría
- Soporte de texto enriquecido con funcionalidad de búsqueda
- Diseño en cuadrícula para navegación fácil
- Marcas de tiempo y categorías de guardado automático
- Vista previa rápida con contenido expandible

### 📅 Calendario y Eventos
- Vista de calendario mensual con navegación
- Agregar sesiones de estudio, exámenes, tareas y fechas límite
- Tipos de eventos codificados por colores (examen, tarea, estudio, otro)
- Resumen de próximos eventos
- Detalles de eventos con descripciones y horarios opcionales

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
- **Almacenamiento**: LocalStorage para persistencia de datos
- **Navegación**: Sistema de enrutamiento personalizado

## 🚀 Comenzando

### Prerrequisitos
- Node.js (v18 o superior)
- npm o yarn

### Instalación

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

## 📱 Diseño Responsivo

StudyReboot está diseñado mobile-first y funciona perfectamente en todos los dispositivos:

- **Móvil**: Navegación optimizada con barra de pestañas inferior
- **Tablet**: Diseños adaptativos con espaciado mejorado
- **Escritorio**: UI mejorada con navegación lateral y elementos interactivos más grandes

## 🎨 Filosofía de Diseño

- **Limpio y Moderno**: Paleta de colores suaves (azules, verdes, blancos) para un ambiente de estudio tranquilo
- **Accesible**: Altas relaciones de contraste y jerarquía visual clara
- **Intuitivo**: Patrones familiares e iconografía clara
- **Motivacional**: Mensajes alentadores y refuerzo positivo

## 🔧 Scripts Disponibles

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

## 🎯 Detalles de Características Principales

### Sistema de Temporizador
- **Modo Libre**: Iniciar/detener cuando sea necesario
- **Seguimiento de Sesiones**: Registro automático de sesiones de estudio
- **Progreso Visual**: Indicador de progreso circular
- **Estadísticas**: Resúmenes de tiempo diarios, semanales y mensuales

### Persistencia de Datos
Todos los datos se almacenan localmente en el navegador usando LocalStorage:
- Sesiones de estudio y seguimiento de tiempo
- Preguntas y su estado de resolución
- Notas con categorías y marcas de tiempo
- Eventos de calendario y recordatorios
- Entradas de estado de ánimo con correlaciones

### Sistema Motivacional
- Colección rotativa de frases inspiradoras
- Actualización automática cada 10 minutos
- Aliento contextual basado en el progreso de estudio
- Refuerzo positivo para la finalización de tareas

## 🌟 Mejoras Futuras

- **Sincronización**: Sincronización en la nube entre dispositivos
- **Widgets**: Widgets de escritorio y móvil
- **Notificaciones**: Recordatorios de estudio y alertas motivacionales
- **Análisis**: Seguimiento de progreso avanzado e insights
- **Temas**: Modo oscuro y esquemas de colores personalizados
- **Exportación**: Funcionalidad de exportación de datos
- **Colaboración**: Funciones de grupos de estudio


**StudyReboot** - ¡Tu viaje hacia el éxito académico comienza aquí! 🚀📚
