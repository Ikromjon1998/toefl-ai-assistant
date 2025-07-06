import React, { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Writing from './pages/Writing';
import Reading from './pages/Reading';
import Vocabulary from './pages/Vocabulary';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onPageChange={setCurrentPage} />;
      case 'writing':
        return <Writing />;
      case 'reading':
        return <Reading />;
      case 'vocabulary':
        return <Vocabulary />;
      default:
        return <Home onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
