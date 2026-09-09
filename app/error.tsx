'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw, Home, MessageSquare, Phone, Building2 } from 'lucide-react';
import { HAMILTON_MAPS_LINK } from '@/data/properties';

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console or monitoring service
    console.error('Next.js Page Error:', error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-50">
      <div className="max-w-lg w-full bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm text-center">
        {/* Error Icon badge */}
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-5 shadow-2xs">
          <AlertCircle className="w-8 h-8" />
        </div>

        <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold uppercase tracking-wider mb-3">
          Error Handled
        </span>

        <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
          Something went wrong
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
          We experienced an unexpected issue loading this section of the Kam Buy &amp; Rent platform. Our team at Hamilton Peninsula has been notified.
        </p>

        {error?.message && (
          <div className="mb-6 p-3 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs font-mono text-slate-700 overflow-x-auto max-h-32">
            <span className="text-slate-400 select-none">Error details: </span>
            {error.message}
            {error.digest && (
              <div className="text-[10px] text-slate-400 mt-1">
                Digest: {error.digest}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <button
            onClick={() => reset()}
            id="error-try-again-btn"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            id="error-return-home-btn"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>

        {/* Support Helpdesk footer */}
        <div className="pt-6 border-t border-slate-100 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span>Hamilton Peninsula Office</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/23278889450?text=Hello%20Kam%20Buy%20%26%20Rent,%20I%20encountered%20an%20error%20on%20the%20site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <span>•</span>
            <a
              href="tel:+23279334890"
              className="text-slate-700 hover:text-slate-900 font-semibold flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+232 79 334 890</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
