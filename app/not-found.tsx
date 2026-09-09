import React from 'react';
import Link from 'next/link';
import { Building2, Compass, ArrowLeft, Search, MessageSquare } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-50">
      <div className="max-w-lg w-full bg-white rounded-3xl border border-slate-200/90 p-8 shadow-xs text-center">
        {/* 404 Badge */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto mb-5 shadow-2xs">
          <Compass className="w-8 h-8" />
        </div>

        <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-extrabold uppercase tracking-wider mb-3">
          404 • Page Not Found
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
          Listing or Route Not Found
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
          The property listing, neighborhood guide, or address you are looking for does not exist, may have been relocated, or is already marked sold.
        </p>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <Link
            href="/properties"
            className="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-2xl text-left transition-colors group"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 group-hover:text-emerald-800">
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span>Browse Catalog</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Explore all 12 verified peninsula listings</p>
          </Link>

          <Link
            href="/map"
            className="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-2xl text-left transition-colors group"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 group-hover:text-emerald-800">
              <Compass className="w-4 h-4 text-teal-600" />
              <span>3D Peninsula Map</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">View locations across Hamilton corridor</p>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <a
            href="https://wa.me/23278889450?text=Hello%20Kam%20Buy%20%26%20Rent,%20I%20am%20looking%20for%20a%20specific%20property"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Ask Hamilton Desk</span>
          </a>
        </div>
      </div>
    </div>
  );
}
