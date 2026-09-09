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
  ExternalLink,
  Compass,
  Home,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Coins
} from 'lucide-react';

interface LeftSidebarNavProps {
  currency: Currency;
  onCurrencyToggle: () => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenListProperty: () => void;
  onOpenScheduleGeneral: () => void;
  onOpenAiAdvisor: () => void;
}

export const LeftSidebarNav: React.FC<LeftSidebarNavProps> = ({
  currency,
  onCurrencyToggle,
  favoritesCount,
  onOpenFavorites,
  onOpenListProperty,
  onOpenScheduleGeneral,
  onOpenAiAdvisor,
}) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { 
      href: '/', 
      label: 'Home Overview', 
      icon: Home,
      badge: null 
    },
    { 
      href: '/properties', 
      label: 'Properties Catalog', 
      icon: Building2,
      badge: '12 Active' 
    },
    { 
      href: '/map', 
      label: 'Peninsula 3D Map', 
      icon: Compass,
      badge: '3D' 
    },
    { 
      href: '/neighborhoods', 
      label: 'Neighborhoods', 
      icon: MapPin,
      badge: '6 Areas' 
    },
    { 
      href: '/diaspora-guide', 
      label: 'Diaspora Guide', 
      icon: ShieldCheck,
      badge: 'OARG' 
    },
    { 
      href: '/contact', 
      label: 'Hamilton HQ Office', 
      icon: Phone,
      badge: 'Open' 
    },
  ];

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href === '/properties' && pathname.startsWith('/properties')) return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  const closeMobile = () => setMobileDrawerOpen(false);

  // Sidebar Inner Content reusable for both desktop sidebar and mobile left drawer
  const sidebarContent = (
    <div className="flex flex-col h-full bg-white text-slate-900">
      {/* Top Brand Block */}
      <div className="p-5 border-b border-slate-200/80">
        <Link 
          href="/" 
          onClick={closeMobile}
          className="flex items-center gap-3 group"
          id="left-menu-brand-link"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 text-white flex items-center justify-center shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-slate-900">Kam</span>
              <span className="text-lg font-black tracking-tight text-emerald-600">Buy & Rent</span>
            </div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">
              Property Sierra Leone
            </p>
          </div>
        </Link>

        {/* Location & Sierra Leone Badge */}
        <div className="mt-3.5 flex items-center justify-between text-[11px] bg-slate-50 border border-slate-200/80 rounded-xl px-2.5 py-1.5">
          <div className="flex items-center gap-1.5 text-slate-700 font-semibold truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="truncate">Hamilton Peninsula HQ</span>
          </div>
          <a
            href={HAMILTON_MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 hover:text-emerald-800 font-bold shrink-0 flex items-center gap-0.5"
            title="Open Hamilton Peninsula on Google Maps"
          >
            <span>Pin</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>

        {/* Currency Switcher Box - Defaults to Sierra Leonean Leones (NLe) */}
        <div className="mt-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-2.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-extrabold text-emerald-900 flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-emerald-700" />
              <span>Currency:</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
              {currency === 'NLE' ? 'Sierra Leonean Leones (NLe)' : 'US Dollars ($)'}
            </span>
          </div>
          
          <button
            onClick={onCurrencyToggle}
            id="left-menu-currency-toggle-btn"
            className="w-full flex items-center justify-between px-2.5 py-1.5 bg-white hover:bg-emerald-100/50 rounded-lg border border-emerald-300 text-xs font-bold text-slate-800 transition-colors cursor-pointer shadow-2xs"
            title="Switch between Sierra Leonean Leones (NLe) and USD"
          >
            <span className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${currency === 'NLE' ? 'bg-emerald-600' : 'bg-slate-300'}`} />
              <span className={currency === 'NLE' ? 'text-emerald-800 font-black' : 'text-slate-500'}>
                NLe (Leones)
              </span>
            </span>
            <span className="text-slate-300 text-xs">|</span>
            <span className="flex items-center gap-1.5">
              <span className={currency === 'USD' ? 'text-emerald-800 font-black' : 'text-slate-500'}>
                USD ($)
              </span>
              <span className={`w-2 h-2 rounded-full ${currency === 'USD' ? 'bg-emerald-600' : 'bg-slate-300'}`} />
            </span>
          </button>
          <div className="mt-1 text-[10px] text-emerald-700/80 text-center font-medium">
            Bank FX Rate: $1 USD ≈ 22.5 NLe
          </div>
        </div>
      </div>

      {/* Scrollable Navigation Section */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6">
        {/* Main Navigation Menu */}
        <div>
          <div className="px-2 pb-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            Main Menu
          </div>
          <nav className="space-y-1" id="left-sidebar-main-menu">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  id={`left-nav-link-${link.href.replace('/', '') || 'home'}`}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-700/20'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-slate-500'}`} />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span
                      className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md ${
                        active
                          ? 'bg-emerald-700 text-emerald-100'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Quick Tools & Services */}
        <div>
          <div className="px-2 pb-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            Quick Actions
          </div>
          <div className="space-y-1">
            {/* Saved Favorites */}
            <button
              onClick={() => {
                onOpenFavorites();
                closeMobile();
              }}
              id="left-menu-favorites-btn"
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Saved Favorites</span>
              </div>
              <span className="bg-rose-100 text-rose-700 font-bold text-[10px] px-2 py-0.5 rounded-full">
                {favoritesCount}
              </span>
            </button>

            {/* AI Advisor */}
            <button
              onClick={() => {
                onOpenAiAdvisor();
                closeMobile();
              }}
              id="left-menu-ai-advisor-btn"
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-teal-800 bg-teal-50/60 hover:bg-teal-100/80 border border-teal-200 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
                <span>AI Property Advisor</span>
              </div>
              <span className="text-[10px] font-extrabold text-teal-700 bg-white px-1.5 py-0.2 rounded border border-teal-200">
                Ask
              </span>
            </button>

            {/* List Property */}
            <button
              onClick={() => {
                onOpenListProperty();
                closeMobile();
              }}
              id="left-menu-list-property-btn"
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <PlusCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>List Your Property</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Schedule Tour */}
            <button
              onClick={() => {
                onOpenScheduleGeneral();
                closeMobile();
              }}
              id="left-menu-book-tour-btn"
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-emerald-800 hover:bg-emerald-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Book Video / Tour</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Hamilton Local Helpdesk Box */}
      <div className="p-4 border-t border-slate-200 bg-slate-50/80 space-y-2.5">
        <div className="text-[11px] font-bold text-slate-900 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Hamilton Office Desk</span>
          </span>
          <span className="text-[10px] font-semibold text-slate-500">Sierra Leone</span>
        </div>

        <p className="text-[10px] text-slate-500 leading-tight">
          Peninsular Highway, Hamilton Beach Road, Western Area Rural, Freetown.
        </p>

        {/* WhatsApp Direct Action Button */}
        <a
          href="https://wa.me/23278889450?text=Hello%20Kam%20Buy%20%26%20Rent%20Property,%20I%20am%20inquiring%20about%20peninsula%20real%20estate"
          target="_blank"
          rel="noopener noreferrer"
          id="left-menu-whatsapp-btn"
          className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-2xs transition-colors cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp (+232 78 889 450)</span>
        </a>

        <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 font-semibold">
          <a href="tel:+23279334890" className="hover:text-emerald-700 flex items-center gap-1">
            <Phone className="w-3 h-3 text-slate-400" />
            <span>+232 79 334 890</span>
          </a>
          <a 
            href={HAMILTON_MAPS_LINK} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-emerald-700 hover:underline flex items-center gap-0.5"
          >
            <span>Directions</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ========================================================= */}
      {/* DESKTOP LEFT-HAND SIDEBAR (Fixed / Sticky on the Left)    */}
      {/* ========================================================= */}
      <aside 
        id="left-hand-system-menu"
        className="hidden lg:flex w-72 xl:w-80 h-screen sticky top-0 shrink-0 border-r border-slate-200/90 bg-white z-30 flex-col shadow-xs"
        aria-label="Main system menu on the left hand side"
      >
        {sidebarContent}
      </aside>

      {/* ========================================================= */}
      {/* MOBILE / TABLET TOP BAR WITH LEFT-HAND DRAWER TRIGGER    */}
      {/* ========================================================= */}
      <header className="lg:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Menu Button */}
          <button
            onClick={() => setMobileDrawerOpen(true)}
            id="mobile-left-menu-trigger-btn"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold border border-slate-200/80 transition-colors cursor-pointer"
            aria-label="Open Left Hand Menu"
          >
            <Menu className="w-4 h-4 text-emerald-600" />
            <span>Menu</span>
          </button>

          {/* Brand Center */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-600 to-slate-900 text-white flex items-center justify-center shadow-xs">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1 font-black text-sm tracking-tight text-slate-900">
              <span>Kam</span>
              <span className="text-emerald-600">Buy & Rent</span>
            </div>
          </Link>

          {/* Currency Pill & Favorites Trigger */}
          <div className="flex items-center gap-2">
            <button
              onClick={onCurrencyToggle}
              id="mobile-currency-toggle-btn"
              className="px-2 py-1 text-[11px] font-black rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-800"
              title="Toggle Currency"
            >
              {currency === 'NLE' ? 'NLe' : 'USD $'}
            </button>
            <button
              onClick={onOpenFavorites}
              id="mobile-favorites-btn"
              className="relative p-1.5 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Saved favorites"
            >
              <Heart className="w-5 h-5 text-slate-700" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* MOBILE LEFT-HAND SLIDE-OVER DRAWER                       */}
      {/* ========================================================= */}
      {mobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={closeMobile}
            aria-hidden="true"
          />

          {/* Left Drawer Sheet */}
          <div 
            className="relative w-80 max-w-[85vw] h-full bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-left duration-300"
            id="mobile-left-hand-drawer"
          >
            {/* Drawer Close Button */}
            <div className="absolute top-4 right-3 z-20">
              <button
                onClick={closeMobile}
                id="close-mobile-left-menu-btn"
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
