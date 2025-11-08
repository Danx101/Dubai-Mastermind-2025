import { useEffect } from 'react';
import Hero from './components/Hero';
import EventDetails from './components/EventDetails';
import PricingSection from './components/PricingSection';
import Aftermovie from './components/Aftermovie';
import MemoriesGallery from './components/MemoriesGallery';
import ApplicationForm from './components/ApplicationForm';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <EventDetails />
      <Aftermovie />
      <PricingSection />
      <ApplicationForm />
      <MemoriesGallery />
      <Footer />
    </div>
  );
}

export default App;
