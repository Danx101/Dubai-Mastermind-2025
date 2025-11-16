import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { X } from 'lucide-react';

const galleryImages = [
  { src: '/media/2025_01_10_Dubai Yacht-001.jpg', alt: 'Dubai Mastermind Yacht Event' },
  { src: '/media/2025_01_10_Dubai Yacht-004.jpg', alt: 'Dubai Mastermind Networking' },
  { src: '/media/2025_01_10_Dubai Yacht-005.jpg', alt: 'Dubai Mastermind Experience' },
  { src: '/media/2025_01_10_Dubai Yacht-015.jpg', alt: 'Dubai Mastermind Group' },
  { src: '/media/2025_01_10_Dubai Yacht-022.jpg', alt: 'Dubai Mastermind Insights' },
  { src: '/media/2025_01_10_Dubai Yacht-033.jpg', alt: 'Dubai Mastermind Session' },
  { src: '/media/2025_01_10_Dubai Yacht-035.jpg', alt: 'Dubai Mastermind Atmosphere' },
  { src: '/media/2025_01_10_Dubai Yacht-036.jpg', alt: 'Dubai Mastermind Connection' },
  { src: '/media/2025_01_10_Dubai Yacht-039.jpg', alt: 'Dubai Mastermind Community' },
  { src: '/media/2025_01_10_Dubai Yacht-043.jpg', alt: 'Dubai Mastermind Moments' },
  { src: '/media/2025_01_10_Dubai Yacht-046.jpg', alt: 'Dubai Mastermind Transformation' },
  { src: '/media/2025_01_10_Dubai Yacht-053.jpg', alt: 'Dubai Mastermind Excellence' },
];

export default function MemoriesGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section ref={ref} className="bg-gradient-to-b from-white to-purple-50 py-20 px-4 md:pt-16 md:pb-32">
      <div className="mx-auto max-w-7xl">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
            Erinnerungen an{' '}
            <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              die letzte Mastermind
            </span>
          </h2>
          <div className="mx-auto h-1 w-24 bg-gradient-to-r from-purple-600 to-purple-400" />
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Erlebe unvergessliche Momente, tiefgehende Gespräche und transformative Erkenntnisse aus
            unserem letzten exklusiven Mastermind in Dubai.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.4,
                delay: 0.1 + index * 0.05,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="group relative aspect-video overflow-hidden rounded-xl shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(image.src)}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              {/* Hover Effect */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="rounded-full bg-white/20 backdrop-blur-sm p-4">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-6 w-6" />
          </button>
          <motion.img
            src={selectedImage}
            alt="Enlarged view"
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </section>
  );
}
