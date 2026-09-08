'use client';

import React from 'react';
import { HAMILTON_MAPS_LINK } from '@/data/properties';
import { 
  MapPin, 
  Phone, 
  MessageSquare, 
  Clock, 
  ExternalLink, 
  Navigation, 
  Building2, 
  ShieldCheck, 
  Users, 
  Car 
} from 'lucide-react';

export const KamBuyRentLocationSection: React.FC = () => {
  return (
    <section id="office-location" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Information Column */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 mb-3">
                <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                Physical Office & Showroom
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Visit Kam Buy & Rent Property Sierra Leone
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                We are permanently established along the scenic Hamilton Peninsula on Freetown&apos;s Western Area coast. 
                Whether you are visiting our office in person or connecting through our diaspora desk, our team welcomes you.
              </p>
            </div>

            {/* Address & Direct Google Maps link */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Headquarters Address</h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Kam Buy & Rent Property Sierra Leone, Hamilton Peninsula, Off New Peninsular Highway, Freetown, Sierra Leone.
                  </p>
                  <a
                    href={HAMILTON_MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-2 transition-colors"
                  >
                    <span>View Exact Location on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 font-semibold mb-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Telephone Desk</span>
                </div>
                <div className="text-sm font-bold text-slate-900">+232 78 889 450</div>
                <div className="text-[11px] text-slate-500">Also: +232 76 542 119</div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 font-semibold mb-1">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Line</span>
                </div>
                <div className="text-sm font-bold text-slate-900">+232 78 889 450</div>
                <div className="text-[11px] text-emerald-700 font-medium">Available 24/7 for Diaspora</div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 font-semibold mb-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Office Hours</span>
                </div>
                <div className="font-bold text-slate-900">Mon - Sat: 8:30 AM - 6:00 PM</div>
                <div className="text-[11px] text-slate-500">Sundays: Video appointments only</div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 font-semibold mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Accreditation</span>
                </div>
                <div className="font-bold text-slate-900">Registered Real Estate</div>
                <div className="text-[11px] text-slate-500">Ministry of Lands & OARG compliance</div>
              </div>
            </div>

            {/* Driving Directions */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200/70 rounded-2xl text-xs text-emerald-950 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                <Car className="w-4 h-4 text-emerald-700" />
                Driving Directions from Freetown / Lumley:
              </div>
              <p className="text-emerald-900/80 leading-relaxed text-[11px]">
                Follow the Lumley Beach corridor south along the paved Peninsular Highway past Goderich and Lakka. 
                Continue 5 minutes straight toward Hamilton village. Look for the Kam Buy & Rent Property signage 
                and beachfront estate access directly off the main highway before the Sussex junction.
              </p>
            </div>
          </div>

          {/* Map Preview Card & Interactive Links */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900">
              {/* Visual Map Header */}
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold">Hamilton Peninsula, Freetown SL</span>
                </div>
                <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded font-extrabold uppercase">
                  Verified Pin
                </span>
              </div>

              {/* Map Illustration / Visual Frame */}
              <div className="relative aspect-[16/10] bg-slate-950 flex items-center justify-center p-6 text-center overflow-hidden">
                {/* Background Map Graphic Pattern */}
                <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />

                <div className="relative z-10 space-y-3 max-w-sm">
                  <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg ring-4 ring-emerald-500/30 animate-pulse">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-black text-white">
                    Kam Buy & Rent Property
                  </h3>
                  <p className="text-xs text-slate-300">
                    Hamilton peninsula, Freetown, Sierra Leone
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Coordinates: 8.3694° N, 13.2562° W
                  </p>

                  <div className="pt-2">
                    <a
                      href={HAMILTON_MAPS_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg transition-transform hover:scale-105"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Open in Google Maps App</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Footer strip */}
              <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 px-4">
                <span>Google Maps Place: 3Cr142AXBBbFowA6A</span>
                <span className="text-emerald-400 font-semibold">Free On-site Parking</span>
              </div>
            </div>

            {/* Team Snapshot */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Peninsula Team On-Ground</h4>
                  <p className="text-[11px] text-slate-500">Oladipo Lake, Jen Genet & Licensed Surveyors</p>
                </div>
              </div>

              <a
                href="https://wa.me/23278889450?text=Hello%20Kam%20Buy%20%26%20Rent%20Property,%20I%20would%20like%20to%20visit%20your%20Hamilton%20Peninsula%20office"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Message Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
