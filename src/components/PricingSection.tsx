import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles, Star } from 'lucide-react';

export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="pricing" ref={ref} className="relative bg-gradient-to-b from-purple-50 to-white py-20 px-4 md:pt-32 md:pb-16 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
            Investition in{' '}
            <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              deine Zukunft
            </span>
          </h2>
          <div className="mx-auto h-1 w-24 bg-gradient-to-r from-purple-600 to-purple-400" />
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Package A - Inverted Colors */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <div className="relative rounded-3xl bg-white p-8 md:p-10 shadow-xl border-2 border-purple-200">
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-2 rounded-full bg-purple-600 px-6 py-2 shadow-lg">
                  <Sparkles className="h-4 w-4 text-white" />
                  <span className="text-sm font-semibold text-white">Paket A</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-8 mt-4 text-center">
                <div className="mb-2 text-purple-600 text-lg font-semibold">Basispaket</div>
                <div className="text-6xl font-bold text-gray-900 md:text-7xl">
                  €<span className="text-purple-600">XYZ</span>
                </div>
                <div className="mt-2 text-gray-600">pro Person</div>
              </div>

              {/* Divider */}
              <div className="my-8 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent" />

              {/* Included Items */}
              <div>
                <h3 className="mb-6 text-center text-2xl font-bold text-gray-900">
                  Inklusive
                </h3>

                <div className="space-y-4">
                  {[
                    '3 Tage Intensiv-Kurs',
                    'Individuelles Coaching und Feedback',
                    'Verpflegung',
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
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500">
                          <Check className="h-4 w-4 text-white" strokeWidth={3} />
                        </div>
                      </div>
                      <div className="text-lg text-gray-700 md:text-xl">{item}</div>
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
                <Link
                  to="/bewerbung?package=A"
                  className="block w-full rounded-full bg-gradient-to-r from-purple-600 to-purple-700 py-4 text-center text-lg font-semibold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 md:text-xl"
                >
                  Jetzt buchen
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Package B - Premium with accommodation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <div className="relative rounded-3xl bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 p-8 md:p-10 shadow-2xl border border-purple-300/50 ring-2 ring-purple-300/30">
              {/* Premium Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-400 to-purple-500 px-6 py-2 shadow-lg">
                  <Star className="h-4 w-4 text-white" fill="currentColor" />
                  <span className="text-sm font-semibold text-white">Paket B</span>
                </div>
              </div>

              {/* Very Limited Badge */}
              <div className="absolute -top-2 -right-2">
                <div className="bg-purple-300 text-purple-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  Sehr limitiert
                </div>
              </div>

              {/* Price */}
              <div className="mb-8 mt-4 text-center">
                <div className="mb-2 text-purple-100 text-lg font-semibold">Premium-Paket</div>
                <div className="text-6xl font-bold text-white md:text-7xl">
                  €<span className="text-white">XYZ</span>
                </div>
                <div className="mt-2 text-purple-100">pro Person</div>
              </div>

              {/* Divider */}
              <div className="my-8 h-px bg-gradient-to-r from-transparent via-purple-300/30 to-transparent" />

              {/* Included Items */}
              <div>
                <h3 className="mb-6 text-center text-2xl font-bold text-white">
                  Alles aus Paket A +
                </h3>

                <div className="space-y-4">
                  {[
                    'Unterkunft in der Event-Location',
                    'Exklusiver Zugang zu Premium-Bereichen',
                    'Private Networking-Sessions',
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.5 + index * 0.1,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="flex items-start gap-4"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-300">
                          <Check className="h-4 w-4 text-purple-900" strokeWidth={3} />
                        </div>
                      </div>
                      <div className="text-lg text-white md:text-xl">{item}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                className="mt-10"
              >
                <Link
                  to="/bewerbung?package=B"
                  className="block w-full rounded-full bg-white py-4 text-center text-lg font-semibold text-purple-700 shadow-xl transition-all hover:scale-105 hover:shadow-2xl md:text-xl"
                >
                  Jetzt buchen
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Fine Print */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Limitierte Plätze verfügbar • Bewerbungsprozess erforderlich
        </p>
      </div>
    </section>
  );
}
