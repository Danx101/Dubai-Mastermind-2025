import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ApplicationPage from './pages/ApplicationPage';

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Prevent auto-scroll to hash on initial load
    if (window.location.hash) {
      // Clear hash without scrolling
      history.replaceState(null, '', window.location.pathname + window.location.search);
      // Scroll to top
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bewerbung" element={<ApplicationPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
