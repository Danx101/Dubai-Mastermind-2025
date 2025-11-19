import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="bg-green-100 p-6 rounded-full">
              <CheckCircle className="h-16 w-16 text-green-600" strokeWidth={2} />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Zahlung erfolgreich!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Vielen Dank für deine Bewerbung und Zahlung. Du hast erfolgreich einen Platz für die
              exklusive Mastermind in Dubai gesichert!
            </p>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-purple-50 rounded-2xl p-6 mb-8 text-left"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Was passiert als Nächstes?</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <span>Du erhältst eine Bestätigungs-E-Mail mit deiner Buchungsbestätigung</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <span>Wir werden uns in Kürze mit weiteren Details zum Event melden</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <span>Bei Fragen erreichst du uns jederzeit unter info@chrissteiner.at</span>
              </li>
            </ul>
          </motion.div>

          {/* Session Info (for debugging in test mode) */}
          {sessionId && (
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 font-mono break-all">
                Session ID: {sessionId}
              </p>
            </div>
          )}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all"
            >
              Zurück zur Startseite
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>

          {/* Thank You Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-sm text-gray-500"
          >
            Wir freuen uns darauf, dich bei der Mastermind in Dubai zu sehen! 🚀
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
