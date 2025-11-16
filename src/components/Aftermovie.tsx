import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Play } from 'lucide-react';

export default function Aftermovie() {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section ref={ref} className="bg-gradient-to-b from-purple-700 via-purple-600 to-purple-500 py-20 px-4 md:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Erlebe die{' '}
            <span className="bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent">
              Atmosphäre
            </span>
          </h2>
          <div className="mx-auto h-1 w-24 bg-gradient-to-r from-purple-400 to-purple-500" />
          <p className="mt-6 text-xl font-semibold text-white">
            Tauche ein in die einzigartige Energie unseres letzten Masterminds
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl"
        >
          {/* Video Element */}
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            controls
          >
            <source src="https://pub-22ab982ea82442468580abd2f856f17a.r2.dev/Mastermind 2022.mp4" type="video/mp4" />
            Ihr Browser unterstützt das Video-Tag nicht.
          </video>

          {/* Custom Play Button Overlay (shown when video is not playing) */}
          {!isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm cursor-pointer"
              onClick={togglePlay}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-2xl transition-all hover:shadow-purple-500/50 md:h-24 md:w-24"
              >
                <Play className="h-10 w-10 md:h-12 md:w-12" fill="currentColor" />
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* What to Expect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <div
            className="rounded-2xl backdrop-blur-md border border-white/20 p-8 md:p-12 relative overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              boxShadow: '0 8px 32px 0 rgba(147, 51, 234, 0.2)',
            }}
          >
            {/* Glassmorphism effect layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tl from-purple-500/10 to-transparent pointer-events-none" />

            <h3 className="mb-6 text-3xl font-bold text-white text-center relative z-10">
              Was dich erwartet
            </h3>
            <div className="grid gap-6 md:grid-cols-2 relative z-10">
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-2">
                  <div className="h-3 w-3 rounded-full bg-purple-400" />
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-white text-xl">Intensive Workshops</h4>
                  <p className="text-purple-100">
                    Praxisnahe Sessions zu Business-Strategien und persönlicher Entwicklung
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-2">
                  <div className="h-3 w-3 rounded-full bg-purple-400" />
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-white text-xl">Networking</h4>
                  <p className="text-purple-100">
                    Austausch mit gleichgesinnten Partnern auf höchstem Niveau
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-2">
                  <div className="h-3 w-3 rounded-full bg-purple-400" />
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-white text-xl">Persönliche Betreuung</h4>
                  <p className="text-purple-100">
                    Individuelles Coaching und Feedback von Chris Steiner
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-2">
                  <div className="h-3 w-3 rounded-full bg-purple-400" />
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-white text-xl">Exklusive Location</h4>
                  <p className="text-purple-100">
                    Einzigartige Räumlichkeiten an besonderem Ort
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
