import { useSearchParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApplicationForm from '../components/ApplicationForm';
import CartSummary from '../components/CartSummary';
import Footer from '../components/Footer';
import type { PackageType } from '../data/packages';

export default function ApplicationPage() {
  const [searchParams] = useSearchParams();
  const packageParam = searchParams.get('package');

  // Validate package parameter
  if (!packageParam || (packageParam !== 'A' && packageParam !== 'B')) {
    // Redirect to home if invalid package
    return <Navigate to="/" replace />;
  }

  const packageType = packageParam as PackageType;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header Section */}
      <section className="py-20 px-4 md:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
              Jetzt{' '}
              <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                Bewerben
              </span>
            </h1>
            <div className="mx-auto h-1 w-24 bg-gradient-to-r from-purple-600 to-purple-400" />
            <p className="mt-6 text-lg text-gray-600">
              Sichere dir einen der limitierten Plätze für die exklusive Mastermind in XYZ.
            </p>
          </motion.div>

          {/* Main Content: Cart + Form */}
          <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
            {/* Cart Summary - Sticky on desktop */}
            <div>
              <CartSummary packageType={packageType} />
            </div>

            {/* Application Form */}
            <div>
              <ApplicationForm packageType={packageType} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
