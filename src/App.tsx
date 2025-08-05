import { useState } from 'react';
import { BottomNav } from './components/Navigation/BottomNav';
import { TopNav } from './components/Navigation/TopNav';
import { Home } from './pages/Home/Home';
import { Questions } from './pages/Questions/Questions';
import { Notes } from './pages/Notes/Notes';
import { Calendar } from './pages/Calendar/Calendar';
import { Mood } from './pages/Mood/Mood';
import { Stats } from './pages/Stats/Stats';
import type { Page } from './types';
import './styles/globals.css';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onPageChange={setCurrentPage} />;
      case 'questions':
        return <Questions />;
      case 'notes':
        return <Notes />;
      case 'calendar':
        return <Calendar />;
      case 'mood':
        return <Mood />;
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

export default App;
