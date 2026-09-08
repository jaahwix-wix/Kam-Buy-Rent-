'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { DiasporaGuideSection } from '@/components/DiasporaGuideSection';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Video, 
  FileText, 
  Globe, 
  Phone, 
  MessageSquare,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export default function DiasporaGuidePage() {
  const { openInspection } = useApp();

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Top Breadcrumb & Banner */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <Link href="/" className="hover:text-emerald-600 font-medium">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Diaspora Investor Guide</span>
          </div>

          <button
            onClick={() => openInspection()}
            className="flex items-center gap-1.5 text-emerald-700 font-bold hover:underline cursor-pointer"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Book Live Video Inspection</span>
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero-Risk Overseas Land & Property Buying</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Sierra Leone Diaspora Property Guide
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Step-by-step statutory conveyance protocols, town lot metric calculators, cadastral beacon verification, and live WhatsApp/Zoom remote video tours for Sierra Leoneans abroad.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => openInspection()}
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Live Video Tour</span>
            </button>
            <Link
              href="/properties"
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 border border-slate-700 transition-colors shadow-sm"
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Browse Catalog</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Guide Section Component */}
      <DiasporaGuideSection
        onScheduleDiasporaTour={() => openInspection()}
      />

      {/* Overseas Remittance & Escrow Safety */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <Globe className="w-4 h-4" />
            <span>Remittance & Legal Conveyance Safeguards</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            How Kam Buy & Rent Protects Overseas Buyers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">OARG Statutory Search</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Before collecting any deposit, our in-house legal counsel executes a volume/page archive search at the Office of Administrator and Registrar-General in Freetown to confirm root of title.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">Licensed Cadastral Survey</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Licensed surveyors plant concrete boundary beacons and generate a certified survey plan lodged with the Ministry of Lands, Housing, and Country Planning.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">Bank Wire & Escrow Accounts</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Wire funds securely via commercial bank accounts in Sierra Leone, the UK, or the US. Funds are held securely until final deed execution and signing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
