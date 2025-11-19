import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import type { PackageType } from '../data/packages';

const formSchema = z.object({
  firstName: z.string().min(2, 'Vorname muss mindestens 2 Zeichen lang sein'),
  lastName: z.string().min(2, 'Nachname muss mindestens 2 Zeichen lang sein'),
  email: z.string().email('Bitte gib eine gültige E-Mail-Adresse ein'),
  phone: z.string().min(8, 'Bitte gib eine gültige Telefonnummer ein'),
  studio: z.string().optional(),
  motivation: z.string().min(50, 'Bitte beschreibe deine Motivation ausführlicher (mind. 50 Zeichen)'),
});

type FormData = z.infer<typeof formSchema>;

interface ApplicationFormProps {
  packageType: PackageType;
  quantity: number;
}

export default function ApplicationForm({ packageType, quantity }: ApplicationFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setError(null);

    try {
      const submissionData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        packageType: packageType,
        quantity: quantity,
        message: `${data.motivation}${data.studio ? `\n\nStudio: ${data.studio}` : ''}`,
      };

      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Submission failed');
      }

      const result = await response.json();
      console.log('Application submitted:', result);

      setIsSubmitted(true);
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);

      // TODO: Redirect to Stripe checkout
      // Will be implemented in the Stripe integration step
    } catch (err) {
      console.error('Submission error:', err);
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
    }
  };

  return (
    <div>
      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-xl bg-red-50 border-2 border-red-500 p-6 flex items-center gap-4"
        >
          <AlertCircle className="h-8 w-8 text-red-500 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-900 text-lg">Fehler</h3>
            <p className="text-red-700">{error}</p>
          </div>
        </motion.div>
      )}

      {/* Success Message */}
      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-xl bg-green-50 border-2 border-green-500 p-6 flex items-center gap-4"
        >
          <CheckCircle className="h-8 w-8 text-green-500 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-green-900 text-lg">Bewerbung erfolgreich eingereicht!</h3>
            <p className="text-green-700">
              Vielen Dank für deine Bewerbung. Wir werden uns in Kürze bei dir melden.
            </p>
          </div>
        </motion.div>
      )}

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
          <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl bg-white p-8 shadow-xl md:p-12">
            <div className="grid gap-6 md:grid-cols-2">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="mb-2 block text-sm font-semibold text-gray-700">
                  Vorname *
                </label>
                <input
                  {...register('firstName')}
                  type="text"
                  id="firstName"
                  className={`w-full rounded-lg border-2 px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Max"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="mb-2 block text-sm font-semibold text-gray-700">
                  Nachname *
                </label>
                <input
                  {...register('lastName')}
                  type="text"
                  id="lastName"
                  className={`w-full rounded-lg border-2 px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Mustermann"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
                  E-Mail *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className={`w-full rounded-lg border-2 px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="max@beispiel.de"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-gray-700">
                  Telefon *
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  id="phone"
                  className={`w-full rounded-lg border-2 px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+43 123 456789"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
              </div>

              {/* Studio (Optional) */}
              <div className="md:col-span-2">
                <label htmlFor="studio" className="mb-2 block text-sm font-semibold text-gray-700">
                  Ihr Studio <span className="text-gray-500 font-normal">(optional)</span>
                </label>
                <input
                  {...register('studio')}
                  type="text"
                  id="studio"
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="z.B. Studio München"
                />
                {errors.studio && (
                  <p className="mt-1 text-sm text-red-600">{errors.studio.message}</p>
                )}
              </div>
            </div>

            {/* Motivation */}
            <div className="mt-6">
              <label htmlFor="motivation" className="mb-2 block text-sm font-semibold text-gray-700">
                Warum möchtest du an der Mastermind teilnehmen? *
              </label>
              <textarea
                {...register('motivation')}
                id="motivation"
                rows={6}
                className={`w-full rounded-lg border-2 px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.motivation ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Beschreibe deine Motivation, Ziele und was du von dieser exklusiven Mastermind erwartest..."
              />
              {errors.motivation && (
                <p className="mt-1 text-sm text-red-600">{errors.motivation.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Wird weitergeleitet...
                  </>
                ) : (
                  <>
                    Weiter zum Checkout
                    <Send className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>

            <p className="mt-4 text-center text-sm text-gray-500">
              * Pflichtfelder | Deine Daten werden vertraulich behandelt
            </p>

            <p className="mt-6 text-center text-sm text-gray-500 italic max-w-2xl mx-auto">
              <strong>Hinweis:</strong> Die Bewerbung ist nur gültig mit Abschluss eines Pakets und einer zusätzlichen Bestätigung. Sollte eine Teilnahme seitens AIL nicht genehmigt werden, wird ein bereits bezahltes Paket retourniert.
            </p>
          </form>
      </motion.div>
    </div>
  );
}
