'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { InteractivePeninsulaMap } from '@/components/InteractivePeninsulaMap';
import { HAMILTON_MAPS_LINK, NEIGHBORHOODS } from '@/data/properties';
import { 
  Building2, 
  MapPin, 
  Compass, 
  Waves, 
  Mountain, 
  CheckCircle2, 
  ExternalLink, 
  ArrowRight,
  ShieldCheck,
  Globe,
  Navigation
} from 'lucide-react';

export default function PeninsulaMapPage() {
  const router = useRouter();
  const [selectedArea, setSelectedArea] = useState('Hamilton Peninsula');

  const handleSelectArea = (areaName: string) => {
    setSelectedArea(areaName);
    // User can click to view properties in this area
    router.push(`/properties?area=${encodeURIComponent(areaName)}`);
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white pb-24">
      {/* Top Breadcrumb & Page Banner */}
      <div className="border-b border-slate-800 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <Link href="/" className="hover:text-emerald-400 font-medium">Home</Link>
            <span>/</span>
            <span className="text-white font-semibold">Peninsula 3D Map</span>
          </div>

          <a
            href={HAMILTON_MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold"
          >
            <span>Official Google Maps Pin</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Hero Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Western Area Peninsula Road Corridor</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Interactive 3D Peninsula Map
            </h1>
            <p className="text-slate-300 text-sm mt-3 max-w-2xl leading-relaxed">
              Explore the Atlantic coastline from Lumley to Hamilton, Sussex, and Tokeh. Toggle between the highway track and 3D satellite elevation view to inspect mountain gradients, oceanfront proximity, and development nodes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/properties"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-sm"
            >
              <Building2 className="w-4 h-4" />
              <span>Browse All Properties</span>
            </Link>
            <Link
              href="/neighborhoods"
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 border border-slate-700 transition-colors shadow-sm"
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Neighborhood Guide</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Interactive Map Component */}
      <InteractivePeninsulaMap
        selectedArea={selectedArea}
        onSelectArea={handleSelectArea}
      />

      {/* Corridor Distance & Commute Matrix */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Navigation className="w-4 h-4" />
            <span>Peninsular Highway Connectivity</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-6">
            Driving Distance & Infrastructure from Hamilton HQ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-700/80">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-extrabold text-white text-base">To Lumley & Goderich</h3>
                <span className="text-emerald-400 font-bold text-xs">15 - 20 mins</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Paved two-lane asphalt Peninsular Highway connecting Hamilton directly to Lumley Beach, supermarkets, international schools, and downtown Freetown.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>Distance: ~12 km</span>
                <span className="text-emerald-400 font-semibold">Tarmac Paved</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-700/80">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-extrabold text-white text-base">To Sussex & River No. 2</h3>
                <span className="text-emerald-400 font-bold text-xs">8 - 12 mins</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Southward coastal drive to the famous River Number 2 white sand estuary and beachfront seafood restaurants. Rapidly growing residential luxury enclaves.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>Distance: ~6 km</span>
                <span className="text-emerald-400 font-semibold">Tarmac Paved</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-700/80">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-extrabold text-white text-base">To Tokeh Beach Strip</h3>
                <span className="text-emerald-400 font-bold text-xs">18 - 25 mins</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                World-renowned wide sandy coastline with luxury beach resorts, private landing strips, and premier vacation rental land plots.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>Distance: ~18 km</span>
                <span className="text-emerald-400 font-semibold">Scenic Coastal Road</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
