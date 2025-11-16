import Hero from '../components/Hero';
import EventDetails from '../components/EventDetails';
import Aftermovie from '../components/Aftermovie';
import PricingSection from '../components/PricingSection';
import MemoriesGallery from '../components/MemoriesGallery';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <Hero />
      <EventDetails />
      <Aftermovie />
      <PricingSection />
      <MemoriesGallery />
      <Footer />
    </>
  );
}
