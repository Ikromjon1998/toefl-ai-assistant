import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Writing from './pages/Writing';
import Reading from './pages/Reading';
import Vocabulary from './pages/Vocabulary';

// Constants
const PAGES = {
  HOME: 'home',
  WRITING: 'writing',
  READING: 'reading',
  VOCABULARY: 'vocabulary'
};

const PAGE_COMPONENTS = {
  [PAGES.HOME]: Home,
  [PAGES.WRITING]: Writing,
  [PAGES.READING]: Reading,
  [PAGES.VOCABULARY]: Vocabulary
};

function App() {
  const [currentPage, setCurrentPage] = useState(PAGES.HOME);

  const renderCurrentPage = () => {
    const PageComponent = PAGE_COMPONENTS[currentPage];
    return <PageComponent onPageChange={setCurrentPage} />;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
