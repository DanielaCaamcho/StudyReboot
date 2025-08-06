import { useState, useEffect } from 'react';
import { BottomNav } from './components/Navigation/BottomNav';
import { TopNav } from './components/Navigation/TopNav';
// Activando Firebase real
import { AuthProvider } from './contexts/AuthContext';
// Para volver a demo si hay problemas: import { AuthProvider } from './contexts/AuthContextDemo';
import { Home } from './pages/Home/Home';
import { Questions } from './pages/Questions/Questions';
import { Notes } from './pages/Notes/Notes';
import { TodoList } from './pages/TodoList/TodoList';
import { Calendar } from './pages/Calendar/Calendar';
import { Mood } from './pages/Mood/Mood';
import { Stats } from './pages/Stats/Stats';
import { Login } from './pages/Login/Login';
import type { Page } from './types';
import './styles/globals.css';

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
        return <Questions />;
      case 'notes':
        return <Notes />;
      case 'todolist':
        return <TodoList />;
      case 'calendar':
        return <Calendar />;
      case 'mood':
        return <Mood />;
      case 'login':
        return <Login />;
      case 'stats':
        return <Stats />;
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
