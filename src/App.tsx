import React, { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Library from './pages/Library';
import Tests from './pages/Tests';
import Cabinet from './pages/Cabinet';
import Auth from './pages/Auth';
import About from './pages/About';
import Contacts from './pages/Contacts';

export type PageId = 'home' | 'courses' | 'library' | 'tests' | 'cabinet' | 'auth' | 'about' | 'contacts';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageId>('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <Home onNavigate={setActivePage} />;
      case 'courses': return <Courses />;
      case 'library': return <Library />;
      case 'tests': return <Tests />;
      case 'cabinet': return <Cabinet />;
      case 'auth': return <Auth onLogin={() => setActivePage('cabinet')} />;
      case 'about': return <About />;
      case 'contacts': return <Contacts />;
      default: return <Home onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="app-container">
      <Header activePage={activePage} onNavigate={setActivePage} />
      <main className="container">
        {renderPage()}
      </main>
      <footer>
        <div className="container">
          <p>© 2026 404 School. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
