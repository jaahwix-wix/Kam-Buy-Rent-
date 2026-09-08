'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { NEIGHBORHOODS, HAMILTON_MAPS_LINK } from '@/data/properties';
import { PropertyCard } from '@/components/PropertyCard';
import { 
  Building2, 
  MapPin, 
  Search, 
  ShieldCheck, 
  Compass, 
  ArrowRight, 
  Waves, 
  Calendar, 
  Phone, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { 
    properties, 
    currency, 
    favorites, 
    toggleFavorite, 
    openPropertyModal, 
    openInspection, 
    openAiAdvisor 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState<'all' | 'sale' | 'rent'>('all');
  const [selectedArea, setSelectedArea] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('query', searchQuery);
    if (selectedPurpose !== 'all') params.set('purpose', selectedPurpose);
    if (selectedArea) params.set('area', selectedArea);
    router.push(`/properties?${params.toString()}`);
  };

  // 6 premier featured properties
  const featuredProperties = properties.slice(0, 6);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center bg-slate-900 text-white overflow-hidden">
        {/* Background Image with Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80"
            alt="Hamilton Peninsula Sierra Leone Oceanfront"
            fill
            priority
            className="object-cover object-center brightness-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-950/80" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-xs">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Hamilton Peninsula • Freetown, Sierra Leone</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-md">
            Find Your Sanctuary on the <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Hamilton Peninsula
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-xs">
            Kam Buy & Rent Property connects you to verified freehold coastal compounds, executive beachfront rentals, and registered Town Lots with complete legal conveyance.
          </p>

          {/* Unified Search Control Box */}
          <div className="mt-8 max-w-3xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-4 text-slate-900 shadow-2xl border border-white/20">
            {/* Tabs: All / Buy / Rent */}
            <div className="flex items-center gap-2 mb-3 border-b border-slate-100 pb-2 text-xs font-bold">
              <button
                type="button"
                onClick={() => setSelectedPurpose('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  selectedPurpose === 'all'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Opportunities
              </button>
              <button
                type="button"
                onClick={() => setSelectedPurpose('sale')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  selectedPurpose === 'sale'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                For Sale
              </button>
              <button
                type="button"
                onClick={() => setSelectedPurpose('rent')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  selectedPurpose === 'rent'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                For Rent
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleHeroSearch} className="flex flex-col sm:flex-row items-center gap-2">
              <div className="flex-1 w-full relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by villa, town lot, or keyword..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              <div className="w-full sm:w-56">
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  <option value="">Any Neighborhood</option>
                  {NEIGHBORHOODS.map((n) => (
                    <option key={n.name} value={n.name}>{n.name}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer shrink-0"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Value Pillars */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% OARG Registry Verified Titles</span>
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-teal-400" />
              <span>Certified Cadastral Beacons</span>
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="flex items-center gap-1.5">
              <Waves className="w-4 h-4 text-cyan-400" />
              <span>Atlantic Ocean Beachfront Corridor</span>
            </span>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Curated Selection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Featured Properties & Oceanfront Land
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl">
              Hand-vetted residential compounds, luxury beachfront villas, and verified town lot parcels across Hamilton, Sussex, and Lakka.
            </p>
          </div>

          <Link
            href="/properties"
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-2 shadow-xs shrink-0 self-start md:self-auto"
          >
            <span>Explore All {properties.length} Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property) => (
            <div key={property.id} className="flex flex-col h-full">
              <PropertyCard
                property={property}
                currency={currency}
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={toggleFavorite}
                onSelectProperty={openPropertyModal}
                onBookInspection={openInspection}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Peninsula 3D Map Teaser Banner */}
      <section className="bg-slate-900 text-white py-14 border-t border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
                <span>Interactive Geographic Explorer</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                Visualize the Hamilton Peninsula in 3D
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                Experience the unique geography where the lush mountains of the Western Area Peninsula National Park meet the golden sands of the Atlantic ocean. Inspect terrain elevations, coastal proximity, and highway connectivity.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/map"
                  className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-2 transition-colors shadow-sm"
                >
                  <Compass className="w-4 h-4" />
                  <span>Launch 3D Peninsula Map</span>
                </Link>
                <a
                  href={HAMILTON_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 border border-slate-700 transition-colors shadow-sm"
                >
                  <ExternalLink className="w-4 h-4 text-emerald-400" />
                  <span>Google Maps Coordinates</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Link href="/map" className="group block relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 shadow-xl">
                <div className="relative aspect-16/10 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                    alt="Peninsula Corridor Map preview"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-950/50 group-hover:bg-slate-950/30 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg group-hover:scale-105 transition-transform">
                      <span>Explore 3D Terrain View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhood Spotlight Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
              <MapPin className="w-4 h-4" />
              <span>Peninsula Corridors</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Explore Neighborhoods
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl">
              Compare average plot prices, coastal distances, and lifestyle benefits across prime Western Area enclaves.
            </p>
          </div>

          <Link
            href="/neighborhoods"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
          >
            <span>View All Neighborhoods</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {NEIGHBORHOODS.slice(0, 4).map((hood) => (
            <Link
              key={hood.id}
              href={`/properties?area=${encodeURIComponent(hood.name)}`}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all group flex flex-col"
            >
              <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-900">
                <Image
                  src={hood.image}
                  alt={hood.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <h3 className="font-extrabold text-sm tracking-tight">{hood.name}</h3>
                  <span className="text-[10px] text-emerald-300 font-semibold">{hood.avgPricePlot}</span>
                </div>
              </div>
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-600 line-clamp-2">{hood.description}</p>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-emerald-700 font-bold">
                  <span>Browse Listings</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Diaspora Assurance & Legal Verification Box */}
      <section className="bg-emerald-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Diaspora Investment Desk</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mb-4">
              Zero-Risk Overseas Real Estate Buying
            </h2>
            <p className="text-emerald-200 text-xs sm:text-sm leading-relaxed mb-6">
              Living in the UK, USA, Canada, or mainland Europe? We provide independent title searches at the Registrar-General Office, licensed cadastral surveys, escrow milestone accounts, and scheduled live WhatsApp/Zoom video inspections.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/diaspora-guide"
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition-colors shadow-sm"
              >
                Read 5-Step Diaspora Guide
              </Link>
              <button
                onClick={() => openInspection()}
                className="px-5 py-2.5 rounded-xl bg-emerald-900/80 hover:bg-emerald-900 text-white border border-emerald-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Book Live Video Inspection
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Hamilton Headquarters & Office Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Physical Location & Showroom
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Kam Buy & Rent Property Headquarters
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Conveniently situated along the Peninsular Highway on the Hamilton beachfront. Drop in for in-person consultation, survey verification, or book a physical tour.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Hamilton Peninsula, Western Area Rural, Freetown, Sierra Leone</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-2 transition-colors shadow-sm"
            >
              <Building2 className="w-4 h-4" />
              <span>Visit Hamilton Office</span>
            </Link>
            <a
              href="https://wa.me/23278889450?text=Hello%20Kam%20Buy%20%26%20Rent%20Property,%20I%20would%20like%20to%20visit%20your%20Hamilton%20office"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-2 transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp HQ (+232 78 889 450)</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
