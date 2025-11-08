import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Calendar, Users, Star } from 'lucide-react';

export default function EventDetails() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="bg-gradient-to-b from-parchment-50 to-white py-20 px-4 md:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
            Über das{' '}
            <span className="bg-gradient-to-r from-navy-600 to-gold-500 bg-clip-text text-transparent">
              Mastermind
            </span>
          </h2>
          <div className="mx-auto h-1 w-24 bg-gradient-to-r from-navy-600 to-gold-500" />
        </motion.div>

        {/* Chris Steiner Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 text-center"
        >
          <div className="mx-auto mb-8 max-w-3xl rounded-2xl bg-white shadow-xl overflow-hidden">
            {/* Chris Steiner Image with Gradient */}
            <div className="w-full h-64 md:h-80 relative overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200">
              <img
                src="/media/cs.png"
                alt="Chris Steiner"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Content Below Image */}
            <div className="p-8">
              <div className="mb-6 flex items-center justify-center gap-3">
                <Star className="h-8 w-8 fill-gold-500 text-gold-500" />
                <h3 className="text-2xl font-bold text-gray-900 md:text-3xl">Chris Steiner</h3>
                <Star className="h-8 w-8 fill-gold-500 text-gold-500" />
              </div>
              <p className="mb-4 text-lg leading-relaxed text-gray-700">
                Chris Steiner ist einer der führenden Business-Mentoren im deutschsprachigen Raum. Mit seiner
                einzigartigen Expertise in persönlicher Entwicklung und Unternehmertum hat er bereits Hunderten
                von <span className="font-semibold text-navy-700">Partnern</span> geholfen, ihre Ziele zu erreichen.
              </p>
              <a
                href="https://www.chrissteiner.at"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-navy-600 transition-colors hover:text-navy-700 font-semibold"
              >
                Mehr über Chris Steiner
                <span className="text-xl">→</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Event Details Grid - Card Style with Masked Images */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="group relative overflow-hidden rounded-3xl bg-parchment-50 shadow-lg transition-all hover:shadow-2xl"
          >
            {/* Content Section */}
            <div className="relative z-10 p-8">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-navy-600 to-navy-700 text-white shadow-lg">
                <MapPin className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-900">Location</h3>
              <p className="text-lg text-gold-500 font-bold">Rixos Premium Hotel</p>
              <p className="text-gray-600 mb-1">Dubai, VAE</p>
              <p className="text-sm text-gray-500">
                Luxus und Exklusivität im Herzen von Dubai
              </p>
            </div>

            {/* Masked Image on Right - Organic Shape */}
            <div className="absolute top-0 right-0 w-3/5 h-full">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-60"
                style={{
                  backgroundImage: "url('/media/card 1.jpg')",
                  clipPath: 'ellipse(70% 100% at 100% 50%)'
                }}
              />
            </div>
          </motion.div>

          {/* Date Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="group relative overflow-hidden rounded-3xl bg-parchment-50 shadow-lg transition-all hover:shadow-2xl"
          >
            {/* Content Section */}
            <div className="relative z-10 p-8">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-navy-600 to-navy-700 text-white shadow-lg">
                <Calendar className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-900">Termin</h3>
              <p className="text-lg text-gold-500 font-bold">Dezember 2025</p>
              <p className="text-gray-600 mb-1">3-tägiges Intensiv-Event</p>
              <p className="text-sm text-gray-500">
                Exklusive Termine für ausgewählte Teilnehmer
              </p>
            </div>

            {/* Masked Image on Right - Organic Shape */}
            <div className="absolute top-0 right-0 w-3/5 h-full">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-60"
                style={{
                  backgroundImage: "url('/media/card 2.png')",
                  clipPath: 'ellipse(70% 100% at 100% 50%)'
                }}
              />
            </div>
          </motion.div>

          {/* Participants Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="group relative overflow-hidden rounded-3xl bg-parchment-50 shadow-lg transition-all hover:shadow-2xl md:col-span-2 lg:col-span-1"
          >
            {/* Content Section */}
            <div className="relative z-10 p-8">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-navy-600 to-navy-700 text-white shadow-lg">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-900">Teilnehmer</h3>
              <p className="text-lg text-gold-500 font-bold">Begrenzte Plätze</p>
              <p className="text-gray-600 mb-1">Nur 10-15 Teilnehmer</p>
              <p className="text-sm text-gray-500">
                Intensive Betreuung in kleiner Gruppe
              </p>
            </div>

            {/* Masked Image on Right - Organic Shape */}
            <div className="absolute top-0 right-0 w-3/5 h-full">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-60"
                style={{
                  backgroundImage: "url('/media/card 3.jpg')",
                  clipPath: 'ellipse(70% 100% at 100% 50%)'
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
