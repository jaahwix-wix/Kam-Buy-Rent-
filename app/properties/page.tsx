'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { FilterState, PropertyType, ListingStatus } from '@/types/property';
import { NEIGHBORHOODS, HAMILTON_MAPS_LINK } from '@/data/properties';
import { PropertyCard } from '@/components/PropertyCard';
import { 
  Building2, 
  MapPin, 
  Filter, 
  SlidersHorizontal, 
  CheckCircle2, 
  ArrowUpDown, 
  Sparkles, 
  Phone, 
  MessageSquare, 
  Calendar, 
  PlusCircle, 
  Waves, 
  ShieldCheck, 
  ChevronRight, 
  ExternalLink,
  Layers,
  RotateCcw
} from 'lucide-react';

export default function PropertiesCatalogPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  const initialPurpose = (searchParams.get('purpose') as ListingStatus | 'all') || 'all';
  const initialType = (searchParams.get('type') as PropertyType | 'all') || 'all';
  const initialArea = searchParams.get('area') || '';

  const { 
    properties, 
    currency, 
    favorites, 
    toggleFavorite, 
    openPropertyModal, 
    openInspection, 
    openCalculator 
  } = useApp();

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: initialQuery,
    purpose: initialPurpose,
    propertyType: initialType,
    locationArea: initialArea,
    minPrice: 0,
    maxPrice: 1000000,
    minBedrooms: 0,
    verifiedOnly: false,
    seaViewOnly: false,
  });

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'lots-desc'>('featured');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  // Filtered and sorted properties
  const filteredProperties = useMemo(() => {
    return properties
      .filter((property) => {
        if (filters.searchQuery) {
          const q = filters.searchQuery.toLowerCase();
          const matchTitle = property.title.toLowerCase().includes(q);
          const matchArea = property.location.area.toLowerCase().includes(q);
          const matchDesc = property.description.toLowerCase().includes(q);
          const matchType = property.type.toLowerCase().includes(q);
          if (!matchTitle && !matchArea && !matchDesc && !matchType) return false;
        }

        if (filters.purpose !== 'all' && property.status !== filters.purpose) {
          return false;
        }

        if (filters.propertyType !== 'all' && property.type !== filters.propertyType) {
          return false;
        }

        if (filters.locationArea && !property.location.area.toLowerCase().includes(filters.locationArea.toLowerCase())) {
          return false;
        }

        if (property.priceUSD < filters.minPrice || property.priceUSD > filters.maxPrice) {
          return false;
        }

        if (filters.minBedrooms > 0) {
          if (!property.specs.bedrooms || property.specs.bedrooms < filters.minBedrooms) {
            return false;
          }
        }

        if (filters.verifiedOnly && !property.titleDeed.cadastralSurvey) {
          return false;
        }

        if (filters.seaViewOnly && !property.seaView) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceUSD - b.priceUSD;
        if (sortBy === 'price-desc') return b.priceUSD - a.priceUSD;
        if (sortBy === 'lots-desc') return (b.specs.townLots || 0) - (a.specs.townLots || 0);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [properties, filters, sortBy]);

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      purpose: 'all',
      propertyType: 'all',
      locationArea: '',
      minPrice: 0,
      maxPrice: 1000000,
      minBedrooms: 0,
      verifiedOnly: false,
      seaViewOnly: false,
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Page Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Building2 className="w-4 h-4" />
                <span>Hamilton Peninsula & Western Area Catalog</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Properties, Villas & Verified Land
              </h1>
              <p className="text-slate-300 text-sm mt-2 max-w-2xl">
                Browse our complete collection of freehold beachfront compounds, executive long-term rentals, and verified Sierra Leone Town Lots.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/map"
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 border border-slate-700 transition-colors shadow-xs"
              >
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>View on 3D Map</span>
              </Link>
              <Link
                href="/diaspora-guide"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-xs"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Diaspora Guide</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Top Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
                placeholder="Search by title, neighborhood (Hamilton, Sussex, Lakka), or keywords..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Quick Segment Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold">
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, purpose: 'all' }))}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    filters.purpose === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All ({properties.length})
                </button>
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, purpose: 'sale' }))}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    filters.purpose === 'sale' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  For Sale
                </button>
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, purpose: 'rent' }))}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    filters.purpose === 'rent' ? 'bg-teal-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  For Rent
                </button>
              </div>

              {/* Type Select */}
              <select
                value={filters.propertyType}
                onChange={(e) => setFilters((prev) => ({ ...prev, propertyType: e.target.value as PropertyType | 'all' }))}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Types</option>
                <option value="villa">Villas</option>
                <option value="house">Detached Houses</option>
                <option value="apartment">Apartments</option>
                <option value="land">Town Lots / Land</option>
              </select>

              {/* Area Select */}
              <select
                value={filters.locationArea}
                onChange={(e) => setFilters((prev) => ({ ...prev, locationArea: e.target.value }))}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">All Neighborhoods</option>
                {NEIGHBORHOODS.map((n) => (
                  <option key={n.name} value={n.name}>{n.name}</option>
                ))}
              </select>

              {/* Sorting Select */}
              <div className="flex items-center gap-1.5 ml-auto">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="lots-desc">Town Lots: Largest</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <label className="inline-flex items-center gap-1.5 cursor-pointer select-none text-slate-700 font-semibold">
                <input
                  type="checkbox"
                  checked={filters.verifiedOnly}
                  onChange={(e) => setFilters((prev) => ({ ...prev, verifiedOnly: e.target.checked }))}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                />
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>OARG Verified Title Only</span>
              </label>

              <label className="inline-flex items-center gap-1.5 cursor-pointer select-none text-slate-700 font-semibold">
                <input
                  type="checkbox"
                  checked={filters.seaViewOnly}
                  onChange={(e) => setFilters((prev) => ({ ...prev, seaViewOnly: e.target.checked }))}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                />
                <Waves className="w-3.5 h-3.5 text-cyan-600" />
                <span>Atlantic Sea View Only</span>
              </label>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-slate-500 font-medium">
                Showing <strong className="text-slate-900">{filteredProperties.length}</strong> of {properties.length} properties
              </span>

              {(filters.searchQuery || filters.purpose !== 'all' || filters.propertyType !== 'all' || filters.locationArea || filters.verifiedOnly || filters.seaViewOnly) && (
                <button
                  onClick={handleResetFilters}
                  className="text-emerald-700 hover:text-emerald-800 font-bold inline-flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {filteredProperties.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">
              No matching properties found
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try broadening your filters, searching for a different neighborhood like Hamilton or Sussex, or resetting all criteria.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
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
        )}

        {/* Bottom Town Lot Explainer Box */}
        <div className="mt-12 bg-emerald-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1">
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider">
              Land Sizing Standard in Sierra Leone
            </span>
            <h3 className="text-xl font-extrabold">
              Understanding Town Lots before you purchase
            </h3>
            <p className="text-emerald-200 text-xs sm:text-sm max-w-2xl">
              1 Town Lot = 50 ft × 100 ft = 5,000 sq ft (~464.5 m²). An acre is approximately 8.7 Town Lots. Need help with beacons and survey coordinates?
            </p>
          </div>

          <Link
            href="/diaspora-guide"
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shrink-0 transition-colors shadow-sm"
          >
            Calculate Town Lots
          </Link>
        </div>
      </div>
    </div>
  );
}
