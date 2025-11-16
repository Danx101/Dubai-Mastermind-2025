import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover opacity-70"
        >
          <source src="/media/Loop Mastermind.mp4" type="video/mp4" />
        </video>
        {/* Purple/Blue overlay for brand colors */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-blue-900/20 to-purple-800/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl"
        >
          {/* Main Heading with Video Mask Effect */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative mb-6"
          >
            <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl leading-tight">
              <span
                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-white to-purple-300 animate-gradient sm:whitespace-nowrap"
                style={{
                  backgroundSize: '200% auto',
                  textShadow: '0 0 40px rgba(232, 218, 255, 0.5)',
                }}
              >
                Exklusive Mastermind
              </span>
            </h1>

            {/* Gradient animation */}
            <style>{`
              @keyframes gradient {
                0% {
                  background-position: 0% 50%;
                }
                50% {
                  background-position: 100% 50%;
                }
                100% {
                  background-position: 0% 50%;
                }
              }

              .animate-gradient {
                animation: gradient 8s ease infinite;
              }
            `}</style>
          </motion.div>

          {/* Date */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-1 text-2xl font-semibold md:text-3xl"
          >
            <span
              className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-white to-purple-300 animate-gradient"
              style={{
                backgroundSize: '200% auto',
                textShadow: '0 0 40px rgba(232, 218, 255, 0.5)',
              }}
            >
              Jänner 2026
            </span>
          </motion.p>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-10 text-xl text-purple-300 md:text-2xl lg:text-3xl"
          >
            mit Chris Steiner
          </motion.p>

          {/* CTA Button */}
          <motion.a
            href="#pricing"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block rounded-full bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 hover:from-purple-700 hover:to-purple-800 md:px-12 md:py-5 md:text-xl"
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
          <ChevronDown className="h-8 w-8 text-purple-300" />
        </motion.div>
      </div>
    </section>
  );
}
