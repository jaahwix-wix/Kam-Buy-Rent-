'use client';

import React from 'react';
import { FilterState, PropertyType } from '@/types/property';
import { HAMILTON_MAPS_LINK } from '@/data/properties';
import { 
  Search, 
  MapPin, 
  Home, 
  BedDouble, 
  ShieldCheck, 
  Sun, 
  Video, 
  ExternalLink,
  ChevronRight,
  Waves
} from 'lucide-react';

interface HeroProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalMatching: number;
  onSearchClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalMatching,
  onSearchClick,
}) => {
  return (
    <section id="hero" className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Decorative Pattern & Gradient Glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            Hamilton Peninsula, Freetown, Sierra Leone
          </span>
          <a
            href={HAMILTON_MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
          >
            <span>Direct Google Maps Location</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>

        {/* Hero Headlines */}
        <div className="max-w-3xl mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Find Your Dream Home or Land on the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">
              Hamilton Peninsula
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Welcome to <strong className="text-white">Kam Buy & Rent Property</strong>. We connect local buyers, 
            renters, and diaspora families worldwide to legally verified villas, executive serviced apartments, 
            and titled beachfront town lots along Freetown’s Western Area Peninsula.
          </p>
        </div>

        {/* Floating Search Console */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 text-slate-900 shadow-2xl border border-slate-100 max-w-5xl">
          {/* Purpose Tabs: All, Sale, Rent, Land */}
          <div className="flex flex-wrap items-center gap-2 pb-4 mb-4 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
              Purpose:
            </span>
            <button
              onClick={() => onFilterChange({ purpose: 'all' })}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                filters.purpose === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Listings
            </button>
            <button
              onClick={() => onFilterChange({ purpose: 'sale' })}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                filters.purpose === 'sale'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              For Sale
            </button>
            <button
              onClick={() => onFilterChange({ purpose: 'rent' })}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                filters.purpose === 'rent'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              For Rent
            </button>
            <button
              onClick={() => onFilterChange({ purpose: 'land' })}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                filters.purpose === 'land'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Land & Town Lots
            </button>
          </div>

          {/* Filter Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            {/* Location Selector */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Area / Neighborhood
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <select
                  value={filters.locationArea}
                  onChange={(e) => onFilterChange({ locationArea: e.target.value })}
                  className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">All Peninsula Areas</option>
                  <option value="Hamilton Peninsula">Hamilton Peninsula</option>
                  <option value="Sussex & River No. 2">Sussex & River No. 2</option>
                  <option value="Lakka & Ogoo Farm">Lakka & Ogoo Farm</option>
                  <option value="Regent & Hill Station">Regent & Hill Station</option>
                  <option value="Tokeh Beach">Tokeh Beach</option>
                  <option value="Lumley & Aberdeen">Lumley & Aberdeen</option>
                </select>
              </div>
            </div>

            {/* Property Type Selector */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Property Type
              </label>
              <div className="relative">
                <Home className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <select
                  value={filters.propertyType}
                  onChange={(e) => onFilterChange({ propertyType: e.target.value as PropertyType | 'all' })}
                  className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All Types</option>
                  <option value="villa">Luxury Villa</option>
                  <option value="house">House / Residence</option>
                  <option value="duplex">Modern Duplex</option>
                  <option value="apartment">Serviced Apartment</option>
                  <option value="land">Land / Town Lots</option>
                  <option value="commercial">Commercial Site</option>
                </select>
              </div>
            </div>

            {/* Bedrooms Selector */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Bedrooms (Min)
              </label>
              <div className="relative">
                <BedDouble className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <select
                  value={filters.minBedrooms}
                  onChange={(e) => onFilterChange({ minBedrooms: Number(e.target.value) })}
                  className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="0">Any Bedrooms</option>
                  <option value="2">2+ Bedrooms</option>
                  <option value="3">3+ Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                  <option value="5">5+ Bedrooms</option>
                </select>
              </div>
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Search Keyword
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. pool, beach, solar..."
                  value={filters.searchQuery}
                  onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Bottom Bar with Quick Toggles and Submit */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
            {/* Quick check toggles */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => onFilterChange({ verifiedOnly: !filters.verifiedOnly })}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${
                  filters.verifiedOnly
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Conveyance</span>
              </button>

              <button
                type="button"
                onClick={() => onFilterChange({ seaViewOnly: !filters.seaViewOnly })}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${
                  filters.seaViewOnly
                    ? 'bg-cyan-50 text-cyan-800 border-cyan-300'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Waves className="w-3.5 h-3.5 text-cyan-600" />
                <span>Beach & Sea View</span>
              </button>
            </div>

            {/* Action Count and Search Trigger */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <span className="text-xs font-semibold text-slate-500">
                <strong className="text-slate-900">{totalMatching}</strong> properties found
              </span>
              <button
                onClick={onSearchClick}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-900/10 flex items-center gap-2 transition-all hover:gap-2.5"
              >
                <span>View Results</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Trust Highlight Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 pt-4 border-t border-slate-800/80">
          <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-800/40 border border-slate-800">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xs font-bold text-white">Title Verified</h2>
              <p className="text-[11px] text-slate-400">Registered at OARG & Ministry of Lands</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-800/40 border border-slate-800">
            <Video className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xs font-bold text-white">Diaspora Video Tours</h2>
              <p className="text-[11px] text-slate-400">Live WhatsApp walk-throughs across time zones</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-800/40 border border-slate-800">
            <Sun className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xs font-bold text-white">Solar & Water Audited</h2>
              <p className="text-[11px] text-slate-400">EDSA grid + Solar hybrid & Guma tanks</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-800/40 border border-slate-800">
            <MapPin className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xs font-bold text-white">Hamilton Office</h2>
              <p className="text-[11px] text-slate-400">Local presence along Peninsula Highway</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
