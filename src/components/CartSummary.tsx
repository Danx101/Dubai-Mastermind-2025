import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Minus, Plus, Sparkles, Star } from 'lucide-react';
import { packages } from '../data/packages';
import type { PackageType } from '../data/packages';

interface CartSummaryProps {
  packageType: PackageType;
}

export default function CartSummary({ packageType }: CartSummaryProps) {
  const [quantity, setQuantity] = useState(1);
  const selectedPackage = packages[packageType];

  const handleIncrement = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // Calculate total (using placeholder 'XYZ' for now)
  const pricePerPerson = selectedPackage.price;
  const totalDisplay = pricePerPerson === 'XYZ' ? 'XYZ' : `${parseInt(pricePerPerson) * quantity}`;

  // Get all items to display
  const allItems = selectedPackage.includesPackageA
    ? [...packages.A.items, ...selectedPackage.items]
    : selectedPackage.items;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="lg:sticky lg:top-8"
    >
      <div className="rounded-3xl bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 p-8 shadow-2xl border border-purple-400/30">
        {/* Package Badge */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="flex items-center gap-2 rounded-full bg-purple-500 px-4 py-2">
            {packageType === 'B' ? (
              <Star className="h-4 w-4 text-white" fill="currentColor" />
            ) : (
              <Sparkles className="h-4 w-4 text-white" />
            )}
            <span className="text-sm font-semibold text-white">{selectedPackage.name}</span>
          </div>
        </div>

        {/* Package Title */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">{selectedPackage.subtitle}</h3>
          {packageType === 'B' && (
            <span className="inline-block bg-purple-300 text-purple-900 text-xs font-bold px-3 py-1 rounded-full">
              Sehr limitiert
            </span>
          )}
        </div>

        {/* Price */}
        <div className="text-center mb-6 pb-6 border-b border-purple-400/30">
          <div className="text-5xl font-bold text-white mb-2">
            €{pricePerPerson}
          </div>
          <div className="text-purple-200">pro Person</div>
        </div>

        {/* Quantity Selector */}
        <div className="mb-6">
          <label className="block text-purple-200 text-sm font-semibold mb-3">
            Anzahl der Plätze
          </label>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 text-white transition-all hover:bg-purple-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="h-5 w-5" />
            </button>
            <div className="w-16 text-center">
              <input
                type="number"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (val >= 1 && val <= 10) setQuantity(val);
                }}
                min="1"
                max="10"
                className="w-full text-center text-2xl font-bold bg-transparent text-white border-none focus:outline-none"
              />
            </div>
            <button
              onClick={handleIncrement}
              disabled={quantity >= 10}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 text-white transition-all hover:bg-purple-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="mb-6 pb-6 border-b border-purple-400/30">
          <div className="flex justify-between items-center">
            <span className="text-purple-200 font-semibold">Gesamt:</span>
            <span className="text-3xl font-bold text-white">€{totalDisplay}</span>
          </div>
        </div>

        {/* Included Items */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-center">
            {selectedPackage.includesPackageA ? 'Alles Inklusive' : 'Inklusive'}
          </h4>
          <div className="space-y-3">
            {allItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-400">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </div>
                </div>
                <div className="text-sm text-white">{item}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Package B Note */}
        {selectedPackage.includesPackageA && (
          <div className="mt-6 pt-6 border-t border-purple-400/30">
            <p className="text-xs text-purple-200 text-center italic">
              + Alle Leistungen aus Paket A
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
