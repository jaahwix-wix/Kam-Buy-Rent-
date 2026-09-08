'use client';

import React from 'react';
import Link from 'next/link';
import { HAMILTON_MAPS_LINK } from '@/data/properties';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  ExternalLink, 
  ShieldCheck, 
  Globe 
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Top Banner */}
      <div className="bg-slate-900 border-b border-slate-800/80 px-4 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center shadow-lg">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-base font-extrabold text-white">
                <span>Kam</span>
                <span className="text-emerald-400">Buy & Rent</span>
                <span className="text-slate-400 font-normal">Property Sierra Leone</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Hamilton Peninsula • Western Area Rural • Freetown
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={HAMILTON_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-2 border border-slate-700 transition-colors"
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Google Maps Location</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <a
              href="https://wa.me/23278889450?text=Hello%20Kam%20Buy%20%26%20Rent%20Property,%20I%20would%20like%20to%20inquire%20about%20peninsula%20real%20estate"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-2 shadow-sm transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us (+232 78 889 450)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              About Kam Buy & Rent
            </h4>
            <p className="text-slate-400 leading-relaxed text-xs">
              Established on the Hamilton Peninsula, Kam Buy & Rent Property delivers verified real estate services 
              across Sierra Leone. We provide vetted property sales, long & short-term executive leases, and legally registered 
              town lots with verified conveyance deeds.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px]">
              <ShieldCheck className="w-4 h-4" />
              <span>OARG & Ministry of Lands Compliant</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Corridor Areas
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/properties?area=Hamilton+Peninsula"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Hamilton Peninsula Beach & Heights
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?area=Sussex"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Sussex & River Number 2 Estuary
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?area=Lakka+Beach"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Lakka Beach & Ogoo Farm
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?area=Tokeh+Beach"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Tokeh Beach Tourism Strip
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?area=Regent"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Regent & Hill Station Diplomatic Ridge
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Diaspora & Pages
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/properties"
                  className="hover:text-emerald-400 transition-colors"
                >
                  All Property & Land Catalog
                </Link>
              </li>
              <li>
                <Link
                  href="/map"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Interactive 3D Peninsula Map
                </Link>
              </li>
              <li>
                <Link
                  href="/neighborhoods"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Neighborhood Investment Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/diaspora-guide"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Diaspora Legal & Town Lot Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Physical Hamilton Office & GPS
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Contact & Hamilton HQ
            </h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Kam Buy & Rent Property, Peninsular Highway, Hamilton Peninsula, Western Area Rural, Freetown.</span>
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+232 78 889 450</span>
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>info@kambuyrent-sl.com</span>
              </p>
              <p className="flex items-center gap-2 text-emerald-400 font-medium">
                <Globe className="w-4 h-4 shrink-0" />
                <span>Mon - Sat: 8:30 AM - 6:00 PM (GMT)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>
            © {new Date().getFullYear()} Kam Buy & Rent Property Sierra Leone. All Rights Reserved. Fully compliant with OARG statutory registration laws.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/diaspora-guide" className="hover:text-emerald-400 transition-colors">
              Title Due Diligence
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-emerald-400 transition-colors">
              Office Hours & Location
            </Link>
            <span>•</span>
            <a href={HAMILTON_MAPS_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
              Google Maps Pin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
