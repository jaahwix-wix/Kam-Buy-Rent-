'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Currency } from '@/types/property';
import { HAMILTON_MAPS_LINK } from '@/data/properties';
import { 
  Building2, 
  MapPin, 
  Heart, 
  PlusCircle, 
  Calendar, 
  Phone, 
  MessageSquare, 
  Menu, 
  X, 
  Sparkles, 
  ExternalLink 
} from 'lucide-react';

interface NavbarProps {
  currency: Currency;
  onCurrencyToggle: () => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenListProperty: () => void;
  onOpenScheduleGeneral: () => void;
  onOpenAiAdvisor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  onCurrencyToggle,
  favoritesCount,
  onOpenFavorites,
  onOpenListProperty,
  onOpenScheduleGeneral,
  onOpenAiAdvisor,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/properties', label: 'All Properties' },
    { href: '/map', label: 'Peninsula 3D Map' },
    { href: '/neighborhoods', label: 'Neighborhoods' },
    { href: '/diaspora-guide', label: 'Diaspora Guide' },
    { href: '/contact', label: 'Hamilton HQ' },
  ];

  const isActive = (href: string) => {
    if (href === '/properties' && pathname.startsWith('/properties')) return true;
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      {/* Top micro announcement bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-400">
              <MapPin className="w-3 h-3" />
              Hamilton Peninsula
            </span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-slate-400">
              Western Area Rural, Freetown, Sierra Leone
            </span>
            <span className="hidden md:inline text-slate-500">•</span>
            <a
              href={HAMILTON_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 underline font-medium"
            >
              <span>Google Maps Pin</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          <div className="flex items-center gap-4 text-[11px] shrink-0 font-medium">
            <a
              href="https://wa.me/23278889450?text=Hello%20Kam%20Buy%20%26%20Rent%20Property,%20I%20am%20inquiring%20about%20peninsula%20real%20estate"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WhatsApp: +232 78 889 450</span>
            </a>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-400">
              Exchange Rate: $1 USD ≈ 22.5 NLe
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Identity */}
          <Link href="/" className="cursor-pointer flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900">Kam</span>
                <span className="text-xl font-extrabold tracking-tight text-emerald-600">Buy & Rent</span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                Property Sierra Leone • Hamilton
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
                    active
                      ? 'text-emerald-700 bg-emerald-50 font-bold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Tools */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Currency Toggle */}
            <button
              onClick={onCurrencyToggle}
              className="px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 bg-slate-50 text-slate-800 hover:bg-slate-100 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
              title="Toggle Currency between USD and Sierra Leonean Leones (NLe)"
            >
              <span className={currency === 'USD' ? 'text-emerald-600 font-extrabold' : 'text-slate-400'}>USD $</span>
              <span className="text-slate-300">|</span>
              <span className={currency === 'NLE' ? 'text-emerald-600 font-extrabold' : 'text-slate-400'}>NLe</span>
            </button>

            {/* AI Advisor Button */}
            <button
              onClick={onOpenAiAdvisor}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>AI Advisor</span>
            </button>

            {/* Favorites Button */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="View Saved Favorites"
            >
              <Heart className="w-5 h-5 text-slate-700" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* List Property CTA */}
            <button
              onClick={onOpenListProperty}
              className="px-3 py-2 text-xs font-bold rounded-lg border border-slate-300 text-slate-800 hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-emerald-600" />
              <span>List Property</span>
            </button>

            {/* Book Inspection CTA */}
            <button
              onClick={onOpenScheduleGeneral}
              className="px-3.5 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Tour</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onCurrencyToggle}
              className="px-2 py-1 text-xs font-bold rounded border border-slate-200 bg-slate-50 text-slate-800"
            >
              {currency}
            </button>
            <button
              onClick={onOpenFavorites}
              className="relative p-2 text-slate-700"
            >
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 text-sm font-semibold rounded-lg text-left ${
                pathname === '/' ? 'text-emerald-700 bg-emerald-50' : 'text-slate-800'
              }`}
            >
              Home Portal
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-sm font-semibold rounded-lg text-left ${
                  isActive(link.href) ? 'text-emerald-700 bg-emerald-50' : 'text-slate-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiAdvisor();
              }}
              className="py-2.5 px-3 text-xs font-bold rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>AI Advisor</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenListProperty();
              }}
              className="py-2.5 px-3 text-xs font-bold rounded-lg border border-slate-300 text-slate-800 flex items-center justify-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>List Property</span>
            </button>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenScheduleGeneral();
            }}
            className="w-full py-2.5 px-3 text-xs font-bold rounded-lg bg-emerald-600 text-white flex items-center justify-center gap-1.5"
          >
            <Calendar className="w-4 h-4" />
            <span>Book In-Person / Video Tour</span>
          </button>
        </div>
      )}
    </header>
  );
};
