'use client';

import React from 'react';
import Image from 'next/image';
import { Property, Currency } from '@/types/property';
import { EXCHANGE_RATE_USD_TO_NLE } from '@/data/properties';
import { 
  MapPin, 
  BedDouble, 
  Bath, 
  Layers, 
  ShieldCheck, 
  Sun, 
  Heart, 
  ExternalLink,
  MessageSquare,
  Sparkles
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  currency: Currency;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onBookInspection: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  currency,
  isFavorite,
  onToggleFavorite,
  onSelectProperty,
  onBookInspection,
}) => {
  // Price formatting
  const formatPrice = (usd: number) => {
    if (currency === 'NLE') {
      const nle = usd * EXCHANGE_RATE_USD_TO_NLE;
      return `NLe ${nle.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
    }
    return `$${usd.toLocaleString()}`;
  };

  const primaryImage = property.images[0] || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80';

  const whatsappMessage = encodeURIComponent(
    `Hello Kam Buy & Rent Property Sierra Leone, I am interested in: "${property.title}" (${property.id}) in ${property.location.area}. Please share further details and viewing availability.`
  );

  return (
    <div 
      className="group bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative h-60 w-full bg-slate-100 overflow-hidden cursor-pointer" onClick={() => onSelectProperty(property)}>
        <Image
          src={primaryImage}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap gap-1.5">
            <span className={`px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wide text-white shadow-xs ${
              property.status === 'sale' ? 'bg-emerald-600' : 'bg-blue-600'
            }`}>
              {property.status === 'sale' ? 'For Sale' : 'For Rent'}
            </span>
            {property.featured && (
              <span className="px-2 py-1 rounded-md text-[11px] font-bold bg-amber-500 text-white flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3 h-3" />
                Featured
              </span>
            )}
            {property.seaView && (
              <span className="px-2 py-1 rounded-md text-[11px] font-bold bg-cyan-600/90 text-white shadow-xs">
                Sea View
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(property.id);
            }}
            className="pointer-events-auto w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs hover:bg-white text-slate-700 flex items-center justify-center shadow-md transition-transform active:scale-90"
            aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
          >
            <Heart 
              className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`} 
            />
          </button>
        </div>

        {/* Bottom Image Gradient & Location pill */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent p-3 pt-6 flex items-center justify-between text-white">
          <div className="flex items-center gap-1 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{property.location.area}</span>
          </div>
          {property.titleDeed.cadastralSurvey && (
            <span className="text-[10px] font-bold bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Verified Deed
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price Header */}
          <div className="flex items-baseline justify-between gap-2 mb-2">
            <div>
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {formatPrice(property.priceUSD)}
              </span>
              {property.status === 'rent' && (
                <span className="text-xs font-bold text-slate-500 ml-1">
                  /{property.rentPeriod || 'year'}
                </span>
              )}
            </div>
            {property.negotiable && (
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Negotiable
              </span>
            )}
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelectProperty(property)}
            className="text-base font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-700 cursor-pointer transition-colors"
            title={property.title}
          >
            {property.title}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1 mb-3">
            {property.tagline}
          </p>

          {/* Key Specs Row */}
          <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 mb-3">
            {property.specs.bedrooms !== undefined ? (
              <div className="flex items-center gap-1.5 font-semibold">
                <BedDouble className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{property.specs.bedrooms} Beds</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 font-semibold">
                <Layers className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{property.type.toUpperCase()}</span>
              </div>
            )}

            {property.specs.bathrooms !== undefined ? (
              <div className="flex items-center gap-1.5 font-semibold">
                <Bath className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{property.specs.bathrooms} Baths</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Clean Title</span>
              </div>
            )}

            {property.specs.townLots !== undefined ? (
              <div className="flex items-center gap-1.5 font-semibold" title="1 Town Lot = ~4,356 sq ft (~405 sq m)">
                <Layers className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{property.specs.townLots} Lots</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 font-semibold">
                <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Solar Ready</span>
              </div>
            )}
          </div>

          {/* Power & Water feature pill */}
          <div className="text-[11px] text-slate-600 bg-slate-50/50 p-2 rounded-lg border border-slate-100/80 mb-3 flex items-start gap-1.5">
            <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
            <span className="line-clamp-1">{property.utilities.power}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => onSelectProperty(property)}
            className="flex-1 py-2 px-3 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-colors text-center"
          >
            View Details
          </button>

          <button
            type="button"
            onClick={() => onBookInspection(property)}
            className="py-2 px-2.5 text-xs font-bold rounded-xl border border-emerald-600 text-emerald-700 hover:bg-emerald-50 transition-colors"
            title="Book In-Person or Diaspora Video Inspection"
          >
            Inspect
          </button>

          <a
            href={`https://wa.me/${property.agent.whatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center justify-center shadow-2xs"
            title="Chat directly on WhatsApp about this property"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
