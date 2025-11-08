import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black py-16 px-4 text-gray-300">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-4 text-2xl font-bold bg-gradient-to-r from-navy-400 to-gold-400 bg-clip-text text-transparent">
              Mastermind Dubai
            </h3>
            <p className="mb-4 text-gray-400 leading-relaxed">
              Ein exklusives Event für ambitionierte Unternehmer, die bereit sind, ihr Business und sich
              selbst auf das nächste Level zu bringen.
            </p>
            <a
              href="https://www.chrissteiner.at"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-navy-400 transition-colors hover:text-navy-300"
            >
              Mehr über Chris Steiner
              <ExternalLink className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="mb-4 text-xl font-bold text-white">Kontakt</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-navy-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">E-Mail</p>
                  <a
                    href="mailto:info@chrissteiner.at"
                    className="text-gray-300 transition-colors hover:text-navy-400"
                  >
                    info@chrissteiner.at
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-navy-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Telefon</p>
                  <a
                    href="tel:+43123456789"
                    className="text-gray-300 transition-colors hover:text-navy-400"
                  >
                    +43 123 456 789
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 flex-shrink-0 text-navy-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-300">Rixos Premium Hotel</p>
                  <p className="text-gray-300">Dubai, VAE</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="mb-4 text-xl font-bold text-white">Quick Links</h3>
            <nav className="space-y-2">
              <a
                href="#application"
                className="block text-gray-400 transition-colors hover:text-navy-400"
              >
                Jetzt Bewerben
              </a>
              <a
                href="https://www.chrissteiner.at"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 transition-colors hover:text-navy-400"
              >
                Chris Steiner Website
              </a>
              <a
                href="#"
                className="block text-gray-400 transition-colors hover:text-navy-400"
              >
                Datenschutz
              </a>
              <a
                href="#"
                className="block text-gray-400 transition-colors hover:text-navy-400"
              >
                Impressum
              </a>
            </nav>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center justify-between gap-4 text-center md:flex-row"
        >
          <p className="text-sm text-gray-500">
            © {currentYear} Chris Steiner. Alle Rechte vorbehalten.
          </p>
          <p className="text-sm text-gray-500">
            Exklusives Mastermind in Dubai | Rixos Premium Hotel
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
