import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, Sparkles } from 'lucide-react';

export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="relative bg-gradient-to-b from-parchment-50 to-white py-20 px-4 md:py-32 overflow-hidden">
      {/* Dubai Cityline SVG Background - Light */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <img
          src="/media/dubai cityline.svg"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
            Investition in{' '}
            <span className="bg-gradient-to-r from-navy-600 to-gold-500 bg-clip-text text-transparent">
              Ihre Zukunft
            </span>
          </h2>
          <div className="mx-auto h-1 w-24 bg-gradient-to-r from-navy-600 to-gold-500" />
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative"
        >
          {/* Palm Background in Card */}
          <div className="absolute bottom-0 right-0 w-64 h-64 opacity-10 pointer-events-none">
            <img
              src="/media/palm.png"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>

          <div className="relative rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 p-8 md:p-12 shadow-2xl border border-gold-500/20">
            {/* Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-2 shadow-lg">
                <Sparkles className="h-4 w-4 text-white" />
                <span className="text-sm font-semibold text-white">Exklusives Angebot</span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-8 mt-4 text-center">
              <div className="mb-2 text-gold-400 text-lg font-semibold">Paketpreis</div>
              <div className="text-6xl font-bold text-white md:text-7xl">
                € <span className="text-gold-400">XYZ</span>
              </div>
              <div className="mt-2 text-parchment-200">pro Person</div>
            </div>

            {/* Divider */}
            <div className="my-8 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

            {/* Included Items */}
            <div>
              <h3 className="mb-6 text-center text-2xl font-bold text-white">
                Alles Inklusive
              </h3>

              <div className="space-y-4">
                {[
                  '3 Tage Intensiv-Kurs',
                  'Individuelles Coaching und Feedback',
                  'Verpflegung',
                  'Yacht-Ausfahrt (3 Stunden)',
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.4 + index * 0.1,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500">
                        <Check className="h-4 w-4 text-navy-900" strokeWidth={3} />
                      </div>
                    </div>
                    <div className="text-lg text-parchment-100 md:text-xl">{item}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-10"
            >
              <a
                href="#application"
                className="block w-full rounded-full bg-gradient-to-r from-gold-500 to-gold-600 py-4 text-center text-lg font-semibold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl hover:shadow-gold-500/50 md:text-xl"
              >
                Jetzt Platz sichern
              </a>
            </motion.div>

            {/* Fine Print */}
            <p className="mt-6 text-center text-sm text-parchment-300">
              Limitierte Plätze verfügbar • Bewerbungsprozess erforderlich
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
