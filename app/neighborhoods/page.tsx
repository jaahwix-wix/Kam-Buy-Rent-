'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NEIGHBORHOODS, HAMILTON_MAPS_LINK } from '@/data/properties';
import { 
  Building2, 
  MapPin, 
  Waves, 
  Clock, 
  Compass, 
  ExternalLink, 
  ArrowRight, 
  ShieldCheck, 
  Sun,
  Coins
} from 'lucide-react';

export default function NeighborhoodsPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Top Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
                <MapPin className="w-3.5 h-3.5" />
                <span>Western Area Peninsula Regional Profiles</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                Peninsula Neighborhood Directory
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                Compare Freetown’s prime coastal and hillside investment corridors. Evaluate typical Town Lot prices, commute times, and lifestyle amenities.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/map"
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 border border-slate-700 transition-colors shadow-sm"
              >
                <Compass className="w-4 h-4 text-emerald-400" />
                <span>Interactive 3D Map</span>
              </Link>
              <Link
                href="/properties"
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-sm"
              >
                <Building2 className="w-4 h-4" />
                <span>View All Properties</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhood Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {NEIGHBORHOODS.map((hood) => (
            <div
              key={hood.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all flex flex-col group"
            >
              {/* Photo */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-900">
                <Image
                  src={hood.image}
                  alt={hood.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-xs text-slate-900 shadow-sm">
                  {hood.highlight}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-xl font-extrabold tracking-tight drop-shadow-xs">
                    {hood.name}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {hood.description}
                </p>

                {/* Key Metrics */}
                <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                      <Coins className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Avg Town Lot Price:</span>
                    </span>
                    <span className="font-extrabold text-slate-900">
                      {hood.avgPricePlot}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                      <Waves className="w-3.5 h-3.5 text-cyan-600" />
                      <span>Beach Distance:</span>
                    </span>
                    <span className="font-semibold text-slate-800">
                      {hood.beachDistance}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Drive to Central Freetown:</span>
                    </span>
                    <span className="font-semibold text-slate-800">
                      {hood.freetownCBD}
                    </span>
                  </div>
                </div>

                {/* Direct CTA button to filter properties */}
                <div className="pt-3">
                  <Link
                    href={`/properties?area=${encodeURIComponent(hood.name)}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>View Properties in {hood.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Peninsula Investment Corridor FAQ / Strategic Insight */}
        <div className="mt-16 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Strategic Corridor Insights
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 mb-4">
              Why Invest in the Hamilton Peninsula Corridor?
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                <strong>Tarmac Connectivity:</strong> The paved Peninsular Highway guarantees seamless transit from central Freetown and Goderich down the Atlantic coast, avoiding heavy downtown congestion.
              </p>
              <p>
                <strong>Freehold Land Zone:</strong> The Western Area Rural district allows registered freehold conveyance under the OARG statutory framework, unlike provincial customary land tenure.
              </p>
              <p>
                <strong>Capital Growth:</strong> Waterfront and ocean-view parcels in Hamilton and Sussex have historically delivered 14% to 19% compound annual appreciation driven by diaspora investment and high-end tourism expansion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
