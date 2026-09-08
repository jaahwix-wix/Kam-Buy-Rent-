'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { INITIAL_PROPERTIES, EXCHANGE_RATE_USD_TO_NLE, HAMILTON_MAPS_LINK } from '@/data/properties';
import { HistoricalPropertyChart } from '@/components/HistoricalPropertyChart';
import { PriceAlertModal } from '@/components/PriceAlertModal';
import { generatePropertyPdf } from '@/lib/pdfGenerator';
import { 
  Building2, 
  MapPin, 
  BedDouble, 
  Bath, 
  Maximize2, 
  ShieldCheck, 
  Heart, 
  Share2, 
  Calendar, 
  Calculator, 
  Phone, 
  MessageSquare, 
  Download, 
  Bell, 
  ChevronLeft, 
  ChevronRight, 
  Sun, 
  Waves, 
  Zap, 
  Droplet, 
  Car, 
  Wifi, 
  FileText, 
  CheckCircle2, 
  ExternalLink,
  ArrowLeft
} from 'lucide-react';

export default function PropertyDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const { 
    properties, 
    currency, 
    favorites, 
    toggleFavorite, 
    openInspection, 
    openCalculator 
  } = useApp();

  // Find target property from context or fallback to INITIAL_PROPERTIES
  const property = properties.find((p) => p.id === id) || INITIAL_PROPERTIES.find((p) => p.id === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [hasPriceAlert, setHasPriceAlert] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

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

  if (!property) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center max-w-md shadow-xs">
          <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Property Not Found</h2>
          <p className="text-sm text-slate-600 mb-6">
            The property reference <span className="font-mono font-bold text-emerald-600">{id}</span> could not be found or has been leased/sold.
          </p>
          <Link
            href="/properties"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Properties</span>
          </Link>
        </div>
      </div>
    );
  }

  const isFav = favorites.includes(property.id);

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

  const handleDownloadPdf = () => {
    if (!property || isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    try {
      generatePropertyPdf(property, currency);
      setPdfSuccess(true);
      setTimeout(() => setPdfSuccess(false), 3000);
    } catch (err) {
      console.error('Error generating PDF:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }
  };

  // Similar properties nearby
  const similarProperties = properties
    .filter((p) => p.id !== property.id && (p.location.area === property.location.area || p.type === property.type))
    .slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-500 truncate">
            <Link href="/" className="hover:text-emerald-600 font-medium">Home</Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-emerald-600 font-medium">Properties</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate">{property.title}</span>
          </div>

          <Link
            href="/properties"
            className="flex items-center gap-1 text-emerald-700 font-bold hover:text-emerald-800 shrink-0 ml-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Catalog</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Main Grid: Left Gallery & Content, Right Sticky Booking & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Key Meta */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                    property.status === 'sale' 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-teal-600 text-white'
                  }`}>
                    For {property.status === 'sale' ? 'Sale' : 'Rent'}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 uppercase">
                    {property.type}
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    REF: {property.id}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors relative"
                    title="Copy Property Link"
                  >
                    <Share2 className="w-4 h-4" />
                    {copySuccess && (
                      <span className="absolute -bottom-7 right-0 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap">
                        Link Copied!
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => toggleFavorite(property.id)}
                    className={`p-2 rounded-xl border transition-colors ${
                      isFav 
                        ? 'border-rose-300 bg-rose-50 text-rose-600' 
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                    title={isFav ? 'Remove from favorites' : 'Save to favorites'}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-600 text-rose-600' : ''}`} />
                  </button>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                {property.title}
              </h1>

              <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{property.location.address}</span>
                <span className="text-slate-300">•</span>
                <a 
                  href={property.location.googleMapsUrl || HAMILTON_MAPS_LINK} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:underline inline-flex items-center gap-0.5 font-semibold"
                >
                  <span>Google Maps Pin</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Photo Gallery Box */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs">
              <div className="relative aspect-16/10 sm:aspect-16/9 w-full bg-slate-900 group">
                <Image
                  src={property.images[activeImageIndex] || property.images[0]}
                  alt={`${property.title} - photo ${activeImageIndex + 1}`}
                  fill
                  className="object-cover"
                  priority
                  referrerPolicy="no-referrer"
                />

                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-xs"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-xs"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Overlays */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {property.titleDeed.cadastralSurvey && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600/90 backdrop-blur-md text-white flex items-center gap-1.5 shadow-md">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>OARG Verified Title</span>
                    </span>
                  )}
                  {property.seaView && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-600/90 backdrop-blur-md text-white flex items-center gap-1.5 shadow-md">
                      <Waves className="w-3.5 h-3.5" />
                      <span>Atlantic Sea View</span>
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-lg bg-black/70 text-white text-xs font-bold backdrop-blur-xs">
                  {activeImageIndex + 1} / {property.images.length}
                </div>
              </div>

              {/* Thumbnails */}
              {property.images.length > 1 && (
                <div className="p-3 bg-slate-100 flex items-center gap-2 overflow-x-auto">
                  {property.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        activeImageIndex === idx ? 'border-emerald-600 scale-102' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={img}
                        alt="thumbnail"
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions Toolbar */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-md">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                  Buyer & Diaspora Investor Utilities
                </span>
                <span className="text-sm font-extrabold text-emerald-400">
                  Offline Due Diligence Spec Sheet & Price Alerts
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors border border-slate-700 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  title="Generate printable property specification sheet"
                >
                  <Download className={`w-3.5 h-3.5 ${isGeneratingPdf ? 'animate-bounce' : ''}`} />
                  <span>{isGeneratingPdf ? 'Generating PDF...' : pdfSuccess ? 'PDF Downloaded!' : 'Download PDF Info'}</span>
                </button>

                <button
                  onClick={() => setIsAlertModalOpen(true)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors border flex items-center gap-1.5 cursor-pointer ${
                    hasPriceAlert
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                  }`}
                  title="Subscribe to price drop email alerts"
                >
                  <Bell className="w-3.5 h-3.5 text-amber-400" />
                  <span>{hasPriceAlert ? 'Alert Active' : 'Set Price Alert'}</span>
                </button>
              </div>
            </div>

            {/* Key Specifications Grid */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
              <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider mb-4">
                Property & Land Metrics
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Town Lots
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Maximize2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-base font-extrabold text-slate-900">
                      {property.specs.townLots !== undefined ? `${property.specs.townLots} Lots` : 'N/A'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    {property.specs.sqm ? `~${property.specs.sqm.toLocaleString()} m²` : 'Exact boundary surveyed'}
                  </span>
                </div>

                {property.type !== 'land' && (
                  <>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        Bedrooms
                      </span>
                      <div className="flex items-center gap-1.5">
                        <BedDouble className="w-4 h-4 text-emerald-600" />
                        <span className="text-base font-extrabold text-slate-900">
                          {property.specs.bedrooms !== undefined ? `${property.specs.bedrooms} Beds` : '—'}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1 block">All Ensuite Master</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        Bathrooms
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Bath className="w-4 h-4 text-emerald-600" />
                        <span className="text-base font-extrabold text-slate-900">
                          {property.specs.bathrooms !== undefined ? `${property.specs.bathrooms} Baths` : '—'}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1 block">Modern fittings</span>
                    </div>
                  </>
                )}

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Land Tenure
                  </span>
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span className="text-base font-extrabold text-slate-900">
                      Freehold
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold mt-1 block">
                    Conveyance Ready
                  </span>
                </div>
              </div>

              {/* Town Lot Explainer banner */}
              <div className="mt-4 p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 flex items-center justify-between text-xs text-emerald-900">
                <span>
                  <strong>Sierra Leone Town Lot Standard:</strong> 1 Town Lot = 50 ft × 100 ft = 5,000 sq ft (464.5 m²).
                </span>
                <Link href="/diaspora-guide" className="text-emerald-700 font-bold hover:underline shrink-0 ml-2">
                  Learn More
                </Link>
              </div>
            </div>

            {/* Full Description & Highlights */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider">
                About this Property
              </h2>
              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                {property.description}
              </p>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Key Features & Amenities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((feat) => (
                    <span
                      key={feat}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Utilities & Infrastructure Reliability Audit */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
                <Zap className="w-4 h-4" />
                <span>Essential Infrastructure Audit</span>
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 mb-4">
                Utilities, Power & Water Reliability
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase">Electricity & Grid</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{property.utilities.power}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                    <Droplet className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase">Water Source</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{property.utilities.water}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase">Road Access</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{property.utilities.roadAccess}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase">Security & Perimeter</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{property.utilities.security}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* OARG Legal Verification Card */}
            <div className="bg-emerald-950 text-white rounded-2xl p-6 border border-emerald-800 shadow-md">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Legal Conveyance & Title Deed Security</span>
              </div>
              <h2 className="text-xl font-extrabold text-white mb-2">
                OARG Registry Verified Due Diligence
              </h2>
              <p className="text-emerald-200 text-xs sm:text-sm leading-relaxed mb-4">
                This parcel and title deed have been physically audited at the Administrator and Registrar-General (OARG) 
                in Freetown and validated by certified Sierra Leone licensed surveyors.
              </p>

              <div className="p-3.5 rounded-xl bg-emerald-900/60 border border-emerald-800/80 text-xs text-emerald-100">
                <span className="text-emerald-300 font-bold block mb-1">Title Deed Status:</span>
                <span className="font-semibold">{property.titleDeed.status}</span>
              </div>
            </div>

            {/* Historical Property Trends Bar Chart */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
              <HistoricalPropertyChart
                currency={currency}
                propertyArea={property.location.area}
              />
            </div>
          </div>

          {/* Right Sticky Sidebar: Pricing, Agent Contact & Booking CTA */}
          <div className="space-y-6">
            <div className="sticky top-24 space-y-6">
              {/* Pricing Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  {property.status === 'sale' ? 'Purchase Price' : 'Rental Rate'}
                </span>
                
                <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {formatPrice(property.priceUSD)}
                </div>

                {/* Sub price opposite currency */}
                <div className="text-xs font-semibold text-slate-500 mt-1">
                  {currency === 'USD' 
                    ? `Approx. NLe ${(property.priceUSD * EXCHANGE_RATE_USD_TO_NLE).toLocaleString(undefined, { maximumFractionDigits: 0 })}` 
                    : `Approx. $${property.priceUSD.toLocaleString()} USD`}
                  {property.status === 'rent' && <span className="text-slate-400"> / {property.rentPeriod || 'year'}</span>}
                </div>

                {/* Primary Action Buttons */}
                <div className="mt-6 space-y-2.5">
                  <button
                    onClick={() => openInspection(property)}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Physical or Live Video Tour</span>
                  </button>

                  <button
                    onClick={() => openCalculator(property)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calculator className="w-4 h-4 text-emerald-700" />
                    <span>Calculate Installment Plan</span>
                  </button>
                </div>
              </div>

              {/* Agent Desk Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center text-sm shrink-0 border-2 border-emerald-200">
                    KB
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">
                      {property.agent.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {property.agent.role}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <a
                    href={`https://wa.me/${property.agent.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Kam%20Buy%20%26%20Rent,%20I%20am%20inquiring%20about%20${encodeURIComponent(property.title)}%20(Ref:%20${property.id})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Direct WhatsApp Inquiry</span>
                  </a>

                  <a
                    href={`tel:${property.agent.phone}`}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>Call Office ({property.agent.phone})</span>
                  </a>
                </div>

                <p className="text-[11px] text-slate-500 text-center">
                  Physical Office: Peninsular Highway, Hamilton Peninsula
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties Nearby */}
        {similarProperties.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Explore More
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  Similar Properties in {property.location.area}
                </h3>
              </div>
              <Link
                href="/properties"
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                View all properties →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((p) => (
                <div key={p.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                  <div className="relative aspect-16/10 w-full bg-slate-900">
                    <Image
                      src={p.images[0]}
                      alt={p.title}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-bold">
                      {formatPrice(p.priceUSD)}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-sm text-slate-900 truncate mb-1">
                      {p.title}
                    </h4>
                    <p className="text-xs text-slate-500 mb-3 truncate">
                      {p.location.area} • {p.specs.townLots !== undefined ? `${p.specs.townLots} Lots` : p.type}
                    </p>
                    <Link
                      href={`/properties/${p.id}`}
                      className="w-full block text-center py-2 px-3 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 text-xs font-bold transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Price Alert Modal */}
      <PriceAlertModal
        property={property}
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        onAlertSaved={() => setHasPriceAlert(true)}
      />
    </div>
  );
}
