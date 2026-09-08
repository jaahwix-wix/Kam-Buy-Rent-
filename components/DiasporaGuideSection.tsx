'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  HelpCircle, 
  Layers, 
  Video, 
  FileText, 
  Sun, 
  ArrowRight, 
  CheckCircle2, 
  Globe 
} from 'lucide-react';

interface DiasporaGuideSectionProps {
  onScheduleDiasporaTour: () => void;
}

export const DiasporaGuideSection: React.FC<DiasporaGuideSectionProps> = ({
  onScheduleDiasporaTour,
}) => {
  const [townLotsInput, setTownLotsInput] = useState<number>(3);

  const sqFt = Math.round(townLotsInput * 4356);
  const sqM = Math.round(townLotsInput * 404.686);
  const acres = (townLotsInput * 0.1).toFixed(2);

  const getBuildingRecommendation = (lots: number) => {
    if (lots <= 1) return 'Compact 2-3 bedroom residential flat, terrace duplex, or commercial retail outlet.';
    if (lots <= 2) return 'Standard 3-4 bedroom detached house with parking for 2-3 cars and small garden.';
    if (lots <= 3.5) return 'Executive luxury 5-6 bedroom villa with private pool, boys quarters, and parking for 5+ cars.';
    return 'Expansive private beach estate, boutique eco-hotel, apartment complex, or subdivision development.';
  };

  return (
    <section id="diaspora-guide" className="py-16 bg-slate-50 border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 mb-3">
            <Globe className="w-3.5 h-3.5 text-emerald-700" />
            Diaspora & Returnee Investor Advisory
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Demystifying Real Estate in Sierra Leone
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Whether you are residing in London, Atlanta, Toronto, or Freetown, Kam Buy & Rent Property provides 
            transparent guidelines on land sizing, legal conveyance deeds, and autonomous utilities.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Pillar 1 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                1. What is a &ldquo;Town Lot&rdquo;?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                In Sierra Leone, land is measured in <strong>Town Lots</strong>. One town lot equals approximately 
                <strong> 4,356 sq ft (~405 m²)</strong> or 1/10th of an acre. For a spacious 4-bedroom villa with compound parking, 
                2 to 3 town lots is typical.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-emerald-700">
              1 Lot ≈ 4,356 sq ft (0.1 Acre)
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                2. Conveyance & OARG Deeds
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Property in the Western Area is held under Freehold Conveyance. Every deal is verified at the 
                <strong> Office of Administrator & Registrar General (OARG)</strong> and certified with a signed cadastral survey 
                from the Ministry of Lands.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-blue-700">
              Zero Dual-Sale Guarantee
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
                <Sun className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                3. Solar & Guma Water Audit
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We inspect every home’s electrical and water setup. We ensure EDSA grid meters are active, 
                hybrid solar inverter banks function autonomously, and Guma water storage tanks and pumps are tested.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-amber-700">
              24/7 Energy & Water Readiness
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                4. Live Video Inspection
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cannot travel to Freetown immediately? Schedule an interactive WhatsApp video tour. Our agent walks 
                the property line, measures boundary beacons with GPS, and inspects construction live with you.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-teal-700">
              Covers UK, US & Europe time zones
            </div>
          </div>
        </div>

        {/* Interactive Town Lot Converter Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                Interactive Land Sizing Tool
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Sierra Leone Town Lot Calculator
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Adjust the number of town lots to calculate exact dimensions in square feet, square meters, and acres, 
                along with architectural construction recommendations.
              </p>

              {/* Slider Input */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-700">Number of Town Lots:</span>
                  <span className="text-emerald-700 text-base">{townLotsInput} Lots</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="8"
                  step="0.5"
                  value={townLotsInput}
                  onChange={(e) => setTownLotsInput(Number(e.target.value))}
                  className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>0.5 Lot</span>
                  <span>2 Lots</span>
                  <span>4 Lots</span>
                  <span>8 Lots</span>
                </div>
              </div>
            </div>

            {/* Output Visual Metric Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Square Feet</span>
                <span className="text-xl font-black text-slate-900 mt-1 block">
                  {sqFt.toLocaleString()} sq ft
                </span>
                <span className="text-[11px] text-slate-500">Total Land Area</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Square Meters</span>
                <span className="text-xl font-black text-slate-900 mt-1 block">
                  {sqM.toLocaleString()} m²
                </span>
                <span className="text-[11px] text-slate-500">Metric Equivalent</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Acres</span>
                <span className="text-xl font-black text-emerald-700 mt-1 block">
                  {acres} Acre
                </span>
                <span className="text-[11px] text-slate-500">Acreage Ratio</span>
              </div>

              {/* Recommendation Card */}
              <div className="sm:col-span-3 p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200/80">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-emerald-900">Recommended Project for {townLotsInput} Town Lots: </span>
                    <span className="text-emerald-800">{getBuildingRecommendation(townLotsInput)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Diaspora CTA Banner */}
        <div className="mt-8 p-6 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-lg font-bold">Ready to View a Property Remotely?</h4>
            <p className="text-xs text-slate-300 mt-1">
              Book a live WhatsApp video walk-through with our Hamilton Peninsula agents.
            </p>
          </div>
          <button
            onClick={onScheduleDiasporaTour}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors whitespace-nowrap"
          >
            Schedule Diaspora Inspection
          </button>
        </div>
      </div>
    </section>
  );
};
