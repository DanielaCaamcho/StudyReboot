import { useState, useEffect, Suspense, lazy } from 'react';
import { BottomNav } from './components/Navigation/BottomNav';
import { TopNav } from './components/Navigation/TopNav';
// Activando Firebase real
import { AuthProvider } from './contexts/AuthContext';
// Para volver a demo si hay problemas: import { AuthProvider } from './contexts/AuthContextDemo';
import { Home } from './pages/Home/Home';
import type { Page } from './types';
import './styles/globals.css';

// Lazy loading de componentes para mejorar rendimiento
const Questions = lazy(() => import('./pages/Questions/Questions').then(module => ({ default: module.Questions })));
const Notes = lazy(() => import('./pages/Notes/Notes').then(module => ({ default: module.Notes })));
const TodoList = lazy(() => import('./pages/TodoList/TodoList').then(module => ({ default: module.TodoList })));
const Calendar = lazy(() => import('./pages/Calendar/Calendar').then(module => ({ default: module.Calendar })));
const Mood = lazy(() => import('./pages/Mood/Mood').then(module => ({ default: module.Mood })));
const Stats = lazy(() => import('./pages/Stats/Stats').then(module => ({ default: module.Stats })));
const Login = lazy(() => import('./pages/Login/Login').then(module => ({ default: module.Login })));

// Componente de loading
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '50vh',
    color: 'var(--primary-blue)'
  }}>
    <div>Cargando...</div>
  </div>
);

function AppContent() {
  // Inicializar con la página guardada o 'home' por defecto
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    const saved = localStorage.getItem('currentPage');
    return (saved as Page) || 'home';
  });

  // Guardar la página actual en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onPageChange={setCurrentPage} />;
      case 'questions':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Questions />
          </Suspense>
        );
      case 'notes':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Notes />
          </Suspense>
        );
      case 'todolist':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <TodoList />
          </Suspense>
        );
      case 'calendar':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Calendar />
          </Suspense>
        );
      case 'mood':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Mood />
          </Suspense>
        );
      case 'login':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Login />
          </Suspense>
        );
      case 'stats':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Stats />
          </Suspense>
        );
      default:
        return <Home onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopNav currentPage={currentPage} onPageChange={setCurrentPage} />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {renderPage()}
      </main>
      <BottomNav currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
