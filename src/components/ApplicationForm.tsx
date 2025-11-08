import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send, CheckCircle } from 'lucide-react';

const formSchema = z.object({
  firstName: z.string().min(2, 'Vorname muss mindestens 2 Zeichen lang sein'),
  lastName: z.string().min(2, 'Nachname muss mindestens 2 Zeichen lang sein'),
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
  phone: z.string().min(8, 'Bitte geben Sie eine gültige Telefonnummer ein'),
  studio: z.string().optional(),
  motivation: z.string().min(50, 'Bitte beschreiben Sie Ihre Motivation ausführlicher (mind. 50 Zeichen)'),
});

type FormData = z.infer<typeof formSchema>;

export default function ApplicationForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    console.log('Form Data:', data);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // TODO: Replace with actual API endpoint
    // await fetch('/api/application', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });

    setIsSubmitted(true);
    reset();

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="application" ref={ref} className="bg-gradient-to-b from-parchment-50 to-white py-20 px-4 md:py-32">
      <div className="mx-auto max-w-4xl">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
            Jetzt{' '}
            <span className="bg-gradient-to-r from-navy-600 to-gold-500 bg-clip-text text-transparent">
              Bewerben
            </span>
          </h2>
          <div className="mx-auto h-1 w-24 bg-gradient-to-r from-navy-500 to-gold-500" />
          <p className="mt-6 text-lg text-gray-600">
            Sichern Sie sich einen der limitierten Plätze für das exklusive Mastermind in Dubai.
          </p>
        </motion.div>

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
                Vielen Dank für Ihre Bewerbung. Wir werden uns in Kürze bei Ihnen melden.
              </p>
            </div>
          </motion.div>
        )}

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
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
                  className={`w-full rounded-lg border-2 px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-navy-500 ${
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
                  className={`w-full rounded-lg border-2 px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-navy-500 ${
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
                  className={`w-full rounded-lg border-2 px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-navy-500 ${
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
                  className={`w-full rounded-lg border-2 px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-navy-500 ${
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
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-navy-500"
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
                Warum möchten Sie am Mastermind teilnehmen? *
              </label>
              <textarea
                {...register('motivation')}
                id="motivation"
                rows={6}
                className={`w-full rounded-lg border-2 px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-navy-500 ${
                  errors.motivation ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Beschreiben Sie Ihre Motivation, Ziele und was Sie von diesem exklusiven Mastermind erwarten..."
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
                className="w-full rounded-lg bg-gradient-to-r from-navy-500 to-navy-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-navy-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Wird gesendet...
                  </>
                ) : (
                  <>
                    Bewerbung absenden
                    <Send className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>

            <p className="mt-4 text-center text-sm text-gray-500">
              * Pflichtfelder | Ihre Daten werden vertraulich behandelt
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
