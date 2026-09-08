'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Property, Currency } from '@/types/property';
import { EXCHANGE_RATE_USD_TO_NLE, HAMILTON_MAPS_LINK } from '@/data/properties';
import { generatePropertyPdf } from '@/lib/pdfGenerator';
import { HistoricalPropertyChart } from '@/components/HistoricalPropertyChart';
import { PriceAlertModal, PriceAlertData } from '@/components/PriceAlertModal';
import { 
  X, 
  MapPin, 
  BedDouble, 
  Bath, 
  Layers, 
  ShieldCheck, 
  Sun, 
  Droplets, 
  Car, 
  Calendar, 
  MessageSquare, 
  Calculator, 
  ExternalLink, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  Phone,
  Mail,
  Heart,
  Share2,
  FileDown,
  Bell,
  BellRing,
  Check,
  Loader2
} from 'lucide-react';

interface PropertyModalProps {
  property: Property | null;
  currency: Currency;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClose: () => void;
  onBookInspection: (property: Property) => void;
  onOpenCalculator: (property: Property) => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  currency,
  isFavorite,
  onToggleFavorite,
  onClose,
  onBookInspection,
  onOpenCalculator,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isPriceAlertOpen, setIsPriceAlertOpen] = useState(false);
  const [hasPriceAlert, setHasPriceAlert] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !property?.id) return;
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem('kam_price_alerts');
        if (stored) {
          const parsed = JSON.parse(stored);
          setHasPriceAlert(Boolean(parsed[property.id]));
        } else {
          setHasPriceAlert(false);
        }
      } catch (e) {
        console.error('Error reading price alert from localStorage:', e);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [property?.id]);

  if (!property) return null;

  const formatPrice = (usd: number) => {
    if (currency === 'NLE') {
      const nle = usd * EXCHANGE_RATE_USD_TO_NLE;
      return `NLe ${nle.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
    }
    return `$${usd.toLocaleString()}`;
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadPdf = () => {
    if (!property || isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    try {
      generatePropertyPdf(property, currency);
      setPdfSuccess(true);
      setTimeout(() => setPdfSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to generate PDF summary:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Kam Buy & Rent Property Sierra Leone, I am interested in acquiring/renting: "${property.title}" (${property.id}) located at ${property.location.address}. Please provide further details, survey copies, and schedule a walk-through.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-md text-xs font-black uppercase tracking-wider text-white ${
              property.status === 'sale' ? 'bg-emerald-600' : 'bg-blue-600'
            }`}>
              {property.status === 'sale' ? 'For Sale' : 'For Rent'}
            </span>
            <span className="text-xs font-bold text-slate-400">ID: {property.id}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Set Price Alert Button in Header */}
            <button
              onClick={() => setIsPriceAlertOpen(true)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                hasPriceAlert
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200'
              }`}
              title="Subscribe to email notifications on price drop"
            >
              {hasPriceAlert ? (
                <BellRing className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Bell className="w-3.5 h-3.5 text-slate-600" />
              )}
              <span className="hidden sm:inline">{hasPriceAlert ? 'Alert Active' : 'Set Price Alert'}</span>
            </button>

            {/* Download PDF Info Button in Header */}
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 text-xs font-bold border border-slate-200 transition-colors"
              title="Download clean, printable summary sheet (PDF) for offline use"
            >
              {isGeneratingPdf ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
              ) : pdfSuccess ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <FileDown className="w-3.5 h-3.5 text-emerald-600" />
              )}
              <span className="hidden sm:inline">{pdfSuccess ? 'PDF Downloaded!' : 'Download PDF Info'}</span>
            </button>

            <button
              onClick={() => onToggleFavorite(property.id)}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
              title="Save to favorites"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors relative"
              title="Share link"
            >
              <Share2 className="w-5 h-5" />
              {copied && (
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-0.5 px-2 rounded whitespace-nowrap">
                  Link copied!
                </span>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Image Showcase Gallery */}
          <div className="space-y-3">
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-900 group">
              <Image
                src={property.images[activeImageIndex] || property.images[0]}
                alt={property.title}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
                priority
              />

              {/* Prev / Next controls */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition-colors shadow-md"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition-colors shadow-md"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                {activeImageIndex + 1} / {property.images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {property.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? 'border-emerald-600 scale-102' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pricing & Primary Title Section */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>{property.location.address}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {property.title}
              </h2>
              <p className="text-sm text-slate-600 mt-1">{property.tagline}</p>
            </div>

            <div className="sm:text-right shrink-0">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {formatPrice(property.priceUSD)}
              </div>
              {property.status === 'rent' && (
                <div className="text-xs font-semibold text-slate-500">
                  per {property.rentPeriod || 'year'}
                </div>
              )}
              {currency === 'USD' ? (
                <div className="text-xs text-slate-500 font-medium mt-0.5">
                  Approx. NLe {(property.priceUSD * EXCHANGE_RATE_USD_TO_NLE).toLocaleString()}
                </div>
              ) : (
                <div className="text-xs text-slate-500 font-medium mt-0.5">
                  Approx. ${property.priceUSD.toLocaleString()} USD
                </div>
              )}
            </div>
          </div>

          {/* Quick Action Toolbar: Download PDF, Price Alert, Calculator */}
          <div className="flex flex-wrap items-center gap-2.5 p-3 rounded-2xl bg-slate-50/90 border border-slate-200/80">
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 text-xs font-bold border border-slate-200 shadow-xs transition-all"
              title="Generate and download a clean, printable summary sheet for offline use"
            >
              {isGeneratingPdf ? (
                <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
              ) : pdfSuccess ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <FileDown className="w-4 h-4 text-emerald-600" />
              )}
              <span>{pdfSuccess ? 'PDF Downloaded!' : 'Download PDF Info'}</span>
              <span className="hidden md:inline-block text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-medium">
                Offline Sheet
              </span>
            </button>

            <button
              onClick={() => setIsPriceAlertOpen(true)}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border shadow-xs transition-all ${
                hasPriceAlert
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
              }`}
              title="Subscribe to email notifications when price drops"
            >
              {hasPriceAlert ? (
                <BellRing className="w-4 h-4 text-emerald-600" />
              ) : (
                <Bell className="w-4 h-4 text-slate-600" />
              )}
              <span>{hasPriceAlert ? 'Price Alert Active' : 'Set Price Alert'}</span>
              <span className="hidden md:inline-block text-[10px] bg-emerald-100/60 text-emerald-800 px-1.5 py-0.5 rounded font-medium">
                Email Drop
              </span>
            </button>

            <button
              onClick={() => onOpenCalculator(property)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200 shadow-xs transition-all"
              title="Mortgage & developer installment calculator"
            >
              <Calculator className="w-4 h-4 text-slate-600" />
              <span>Financing Calc</span>
            </button>
          </div>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {property.specs.bedrooms !== undefined && (
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <BedDouble className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <div className="text-lg font-bold text-slate-900">{property.specs.bedrooms}</div>
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Bedrooms</div>
              </div>
            )}

            {property.specs.bathrooms !== undefined && (
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <Bath className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <div className="text-lg font-bold text-slate-900">{property.specs.bathrooms}</div>
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Bathrooms</div>
              </div>
            )}

            {property.specs.townLots !== undefined && (
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <Layers className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <div className="text-lg font-bold text-slate-900">{property.specs.townLots} Lots</div>
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  {property.specs.sqm ? `${property.specs.sqm} m²` : 'Land Size'}
                </div>
              </div>
            )}

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <Car className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-slate-900">
                {property.specs.parkingSpaces ? `${property.specs.parkingSpaces} Bays` : property.specs.furnishing}
              </div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                {property.specs.parkingSpaces ? 'Parking' : 'Furnishing'}
              </div>
            </div>
          </div>

          {/* Utilities & Reliability Audit Section (Crucial for Sierra Leone) */}
          <div className="bg-emerald-950/5 border border-emerald-900/10 rounded-2xl p-4 sm:p-5">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Utilities & Infrastructure Reliability Audit
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80">
                <Sun className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Electricity & Power</div>
                  <div className="text-slate-600">{property.utilities.power}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80">
                <Droplets className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Water Supply & Storage</div>
                  <div className="text-slate-600">{property.utilities.water}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Security & Perimeter</div>
                  <div className="text-slate-600">{property.utilities.security}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Road & Highway Access</div>
                  <div className="text-slate-600">{property.utilities.roadAccess}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Title & Conveyance Verification */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Legal Title & Verification Status
              </div>
              <h4 className="text-sm font-bold text-white">{property.titleDeed.status}</h4>
              <p className="text-xs text-slate-300 mt-1">
                Cadastral survey verified with Sierra Leone Ministry of Lands, Housing & Country Planning. Clean conveyance title.
              </p>
            </div>

            <a
              href={HAMILTON_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <span>View On Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            </a>
          </div>

          {/* Historical Property Value Trends (Mini Bar Chart) */}
          <HistoricalPropertyChart 
            currency={currency} 
            propertyArea={property.location.area} 
          />

          {/* Description */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">About this Property</h3>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Key Features List */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3">Key Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {property.featuresList.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities Grid */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3">Property Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {property.amenities.map((amenity, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200/80"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Dedicated Agent & Office Card */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-bold text-lg flex items-center justify-center shadow-xs shrink-0">
                {property.agent.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{property.agent.name}</h4>
                <p className="text-xs text-slate-500">{property.agent.role} • Kam Buy & Rent Property</p>
                <p className="text-xs font-medium text-emerald-700 flex items-center gap-1 mt-0.5">
                  <Phone className="w-3 h-3" />
                  {property.agent.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={`https://wa.me/${property.agent.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Agent
              </a>
              <button
                onClick={() => onOpenCalculator(property)}
                className="px-3 py-2 text-xs font-bold rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
                title="Financing & Lease Calculator"
              >
                <Calculator className="w-4 h-4 text-slate-600" />
                <span>Calculator</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="sticky bottom-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="hidden sm:block">
            <span className="text-xs text-slate-500 font-medium">Ready to inspect?</span>
            <div className="text-sm font-bold text-slate-900">In-Person or Live Diaspora Video Tour</div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => onBookInspection(property)}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-900/10 flex items-center justify-center gap-2 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Viewing</span>
            </button>

            <a
              href={`https://wa.me/${property.agent.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Direct WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Price Drop Email Notification Alert Modal */}
      <PriceAlertModal
        property={property}
        currency={currency}
        isOpen={isPriceAlertOpen}
        onClose={() => setIsPriceAlertOpen(false)}
        onAlertSaved={() => setHasPriceAlert(true)}
      />
    </div>
  );
};
