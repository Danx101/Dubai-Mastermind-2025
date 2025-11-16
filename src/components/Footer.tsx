import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black py-16 px-4 text-gray-300">
      <div className="mx-auto max-w-6xl">

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center gap-6 text-center"
        >
          <p className="text-sm text-gray-500">
            © {currentYear} Chris Steiner. Alle Rechte vorbehalten.
          </p>

          {/* Legal Links */}
          <nav className="flex flex-wrap gap-6 justify-center">
            <a
              href="/agb"
              className="text-sm text-gray-400 transition-colors hover:text-purple-400"
            >
              AGB
            </a>
            <a
              href="/impressum"
              className="text-sm text-gray-400 transition-colors hover:text-purple-400"
            >
              Impressum
            </a>
            <a
              href="/datenschutz"
              className="text-sm text-gray-400 transition-colors hover:text-purple-400"
            >
              Datenschutz
            </a>
          </nav>

          <p className="text-sm text-gray-500">
            Exklusives Mastermind | Jänner 2026
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
