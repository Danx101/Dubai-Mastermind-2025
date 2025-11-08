import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [staticOpacity, setStaticOpacity] = useState(0);
  const [hideGif, setHideGif] = useState(false);
  const [gifKey, setGifKey] = useState(0);

  useEffect(() => {
    // Force GIF reload on mount
    setGifKey(Date.now());

    // Start fading in static PNG at 2 seconds (before GIF ends)
    const fadeTimer = setTimeout(() => {
      setStaticOpacity(1);
    }, 2000);

    // Hide GIF completely after transition completes
    const hideTimer = setTimeout(() => {
      setHideGif(true);
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        >
          <source src="/media/Loop Mastermind.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Dubai Cityline Animation/Image */}
      <div className="absolute bottom-0 landscape:bottom-4 left-1/2 -translate-x-1/2 z-5 w-full h-64 md:h-80 lg:h-96 portrait:h-72 portrait:bottom-4">
        {!hideGif && (
          <img
            key={gifKey}
            src={`/media/dubai cityline.gif?t=${gifKey}`}
            alt=""
            className="absolute inset-0 h-full w-full object-contain object-bottom"
          />
        )}
        <img
          src="/media/cityline dubai.png"
          alt=""
          className="absolute inset-0 h-full w-full object-contain object-bottom"
          style={{ opacity: staticOpacity, transition: 'opacity 0.8s ease-in-out' }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl"
        >
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-6 text-5xl font-bold text-white md:text-6xl lg:text-7xl"
          >
            Exklusives Mastermind
            <span className="block bg-gradient-to-r from-navy-400 via-gold-400 to-gold-500 bg-clip-text text-transparent">
              in Dubai
            </span>
          </motion.h1>

          {/* Date */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-1 text-2xl text-white font-semibold md:text-3xl"
          >
            Dezember 2025
          </motion.p>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-1 text-xl text-gold-400 md:text-2xl lg:text-3xl"
          >
            mit Chris Steiner
          </motion.p>

          {/* Location */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-10 text-lg text-parchment-200 md:text-xl"
          >
            Rixos Premium Hotel, Dubai
          </motion.p>

          {/* CTA Button - No flicker */}
          <motion.a
            href="#application"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block rounded-full bg-gradient-to-r from-navy-600 to-navy-700 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl hover:shadow-navy-500/50 hover:from-navy-700 hover:to-navy-800 md:px-12 md:py-5 md:text-xl"
          >
            Jetzt Bewerben
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5, repeat: Infinity, repeatType: 'reverse', repeatDelay: 0.3 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="h-8 w-8 text-gold-400" />
        </motion.div>
      </div>
    </section>
  );
}
