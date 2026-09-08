'use client';

import React from 'react';
import Image from 'next/image';
import { Property, Currency } from '@/types/property';
import { EXCHANGE_RATE_USD_TO_NLE } from '@/data/properties';
import { 
  X, 
  Trash2, 
  MessageSquare, 
  MapPin, 
  ArrowRight, 
  Heart,
  Layers,
  BedDouble,
  Bath
} from 'lucide-react';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Property[];
  currency: Currency;
  onRemoveFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  currency,
  onRemoveFavorite,
  onSelectProperty,
}) => {
  if (!isOpen) return null;

  const totalUSD = favorites.reduce((sum, p) => sum + p.priceUSD, 0);

  const formatPrice = (usd: number) => {
    if (currency === 'NLE') {
      const nle = usd * EXCHANGE_RATE_USD_TO_NLE;
      return `NLe ${nle.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
    }
    return `$${usd.toLocaleString()}`;
  };

  const whatsappFavoritesSummary = encodeURIComponent(
    `Hello Kam Buy & Rent Property Sierra Leone, I have saved ${favorites.length} properties for review:\n` +
      favorites.map((f, i) => `${i + 1}. ${f.title} (${f.location.area}) - $${f.priceUSD.toLocaleString()}`).join('\n') +
      `\n\nPlease let me know when we can arrange inspection appointments.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Saved Properties ({favorites.length})</h3>
              <p className="text-[11px] text-slate-300">Kam Buy & Rent Property Sierra Leone</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List Content */}
        {favorites.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-slate-500">
            <Heart className="w-12 h-12 text-slate-300 mb-3 stroke-1" />
            <h4 className="text-sm font-bold text-slate-700">No Saved Properties Yet</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              Click the heart icon on any villa, apartment, or town lot in Hamilton to save it here for comparison.
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {favorites.map((property) => (
                <div
                  key={property.id}
                  className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow flex gap-3 group relative"
                >
                  <div 
                    className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 cursor-pointer"
                    onClick={() => {
                      onSelectProperty(property);
                      onClose();
                    }}
                  >
                    <Image
                      src={property.images[0]}
                      alt={property.title}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                          {property.status === 'sale' ? 'For Sale' : 'For Rent'}
                        </span>
                        <button
                          onClick={() => onRemoveFavorite(property.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4
                        onClick={() => {
                          onSelectProperty(property);
                          onClose();
                        }}
                        className="text-xs font-bold text-slate-900 line-clamp-1 hover:text-emerald-700 cursor-pointer"
                      >
                        {property.title}
                      </h4>

                      <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate">{property.location.area}</span>
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between mt-2 pt-1 border-t border-slate-100">
                      <span className="text-xs font-black text-slate-900">
                        {formatPrice(property.priceUSD)}
                      </span>
                      <button
                        onClick={() => {
                          onSelectProperty(property);
                          onClose();
                        }}
                        className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
              <div className="flex items-baseline justify-between text-xs">
                <span className="font-semibold text-slate-600">Total Portfolio Value:</span>
                <span className="text-base font-black text-slate-900">{formatPrice(totalUSD)}</span>
              </div>

              <a
                href={`https://wa.me/23278889450?text=${whatsappFavoritesSummary}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Share Saved List on WhatsApp (+232 78 889 450)</span>
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
