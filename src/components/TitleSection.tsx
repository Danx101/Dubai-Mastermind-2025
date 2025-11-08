import { motion } from 'framer-motion';

export default function TitleSection() {
  return (
    <section className="relative bg-gradient-to-b from-navy-950 via-navy-900 to-parchment-50 py-20 px-4 overflow-hidden">
      {/* Dubai Cityline SVG Background */}
      <div className="absolute inset-0 opacity-5">
        <img
          src="/media/dubai cityline.svg"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-navy-900/20 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center"
        >
          {/* Title Image */}
          <motion.img
            src="/media/title.jpg"
            alt="Mastermind Dubai"
            className="w-full max-w-3xl rounded-2xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          />

          {/* Optional Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center text-xl text-white/80 md:text-2xl max-w-2xl"
          >
            Eine transformative Reise für ambitionierte Franchise-Partner
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
