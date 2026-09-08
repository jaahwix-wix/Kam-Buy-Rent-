'use client';

import React, { useState, useEffect } from 'react';
import { Property, Currency } from '@/types/property';
import { EXCHANGE_RATE_USD_TO_NLE } from '@/data/properties';
import { Bell, BellRing, CheckCircle2, X, Mail, Phone, DollarSign, ShieldCheck } from 'lucide-react';

interface PriceAlertModalProps {
  property: Property;
  currency: Currency;
  isOpen: boolean;
  onClose: () => void;
  onAlertSaved?: (propertyId: string, alertData: PriceAlertData) => void;
}

export interface PriceAlertData {
  propertyId: string;
  propertyTitle: string;
  originalPriceUSD: number;
  targetPriceUSD: number;
  dropPercentage: number;
  email: string;
  phone?: string;
  subscribedAt: string;
}

export const PriceAlertModal: React.FC<PriceAlertModalProps> = ({
  property,
  currency,
  isOpen,
  onClose,
  onAlertSaved,
}) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dropType, setDropType] = useState<'any' | '5' | '10' | 'custom'>('5');
  const [customPrice, setCustomPrice] = useState(
    Math.round(property.priceUSD * 0.95).toString()
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const [existingAlert, setExistingAlert] = useState<PriceAlertData | null>(null);

  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;
    const timer = setTimeout(() => {
      try {
        const storedAlerts = localStorage.getItem('kam_price_alerts');
        if (storedAlerts) {
          const parsed = JSON.parse(storedAlerts) as Record<string, PriceAlertData>;
          if (parsed[property.id]) {
            setExistingAlert(parsed[property.id]);
            setEmail(parsed[property.id].email);
            if (parsed[property.id].phone) setPhone(parsed[property.id].phone || '');
          } else {
            setExistingAlert(null);
          }
        }
        const rememberedEmail = localStorage.getItem('kam_user_email');
        if (rememberedEmail) {
          setEmail((prev) => prev || rememberedEmail);
        }
      } catch (err) {
        console.error('Error loading stored price alerts:', err);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [isOpen, property.id]);

  if (!isOpen) return null;

  const currentPriceUSD = property.priceUSD;
  const currentPriceNLe = currentPriceUSD * EXCHANGE_RATE_USD_TO_NLE;

  const calculateTargetPrice = (): number => {
    if (dropType === 'any') return currentPriceUSD - 1000;
    if (dropType === '5') return Math.round(currentPriceUSD * 0.95);
    if (dropType === '10') return Math.round(currentPriceUSD * 0.9);
    const parsed = parseFloat(customPrice);
    return isNaN(parsed) || parsed <= 0 ? Math.round(currentPriceUSD * 0.95) : parsed;
  };

  const targetUSD = calculateTargetPrice();
  const savingsUSD = Math.max(0, currentPriceUSD - targetUSD);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    const alertData: PriceAlertData = {
      propertyId: property.id,
      propertyTitle: property.title,
      originalPriceUSD: currentPriceUSD,
      targetPriceUSD: targetUSD,
      dropPercentage: dropType === '5' ? 5 : dropType === '10' ? 10 : dropType === 'any' ? 1 : Math.round((savingsUSD / currentPriceUSD) * 100),
      email: email.trim(),
      phone: phone.trim() || undefined,
      subscribedAt: new Date().toISOString(),
    };

    if (typeof window !== 'undefined') {
      try {
        const storedAlerts = localStorage.getItem('kam_price_alerts');
        const parsed = storedAlerts ? JSON.parse(storedAlerts) : {};
        parsed[property.id] = alertData;
        localStorage.setItem('kam_price_alerts', JSON.stringify(parsed));
        localStorage.setItem('kam_user_email', email.trim());
      } catch (err) {
        console.error('Error saving price alert:', err);
      }
    }

    setExistingAlert(alertData);
    setIsSuccess(true);
    if (onAlertSaved) {
      onAlertSaved(property.id, alertData);
    }
  };

  const handleCancelAlert = () => {
    if (typeof window !== 'undefined') {
      try {
        const storedAlerts = localStorage.getItem('kam_price_alerts');
        if (storedAlerts) {
          const parsed = JSON.parse(storedAlerts);
          delete parsed[property.id];
          localStorage.setItem('kam_price_alerts', JSON.stringify(parsed));
        }
      } catch (err) {
        console.error('Error removing alert:', err);
      }
    }
    setExistingAlert(null);
    setIsSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <BellRing className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Direct Price Drop Notification
              </div>
              <h3 className="text-lg font-bold text-white leading-tight">
                Set Price Drop Alert
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Price Alert Activated!</h4>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                  We will monitor <strong className="text-slate-900">{property.title}</strong> and instantly send an email notification to <strong className="text-slate-900">{email}</strong> if the price drops below <strong className="text-emerald-700">${targetUSD.toLocaleString()} USD</strong>.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500 flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero spam guarantee. You can unsubscribe at any time.</span>
              </div>

              <div className="flex gap-2 justify-center pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Property & Price Card */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 block truncate max-w-xs">{property.title}</span>
                  <span className="text-xs font-bold text-slate-800">Current Listed Price</span>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-slate-900">
                    ${currentPriceUSD.toLocaleString()} USD
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    ≈ NLe {currentPriceNLe.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>

              {existingAlert && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center justify-between">
                  <span>An active alert is already set for <strong>{existingAlert.email}</strong> at ${existingAlert.targetPriceUSD.toLocaleString()}</span>
                  <button
                    type="button"
                    onClick={handleCancelAlert}
                    className="text-[11px] text-rose-600 font-bold underline hover:text-rose-800 ml-2 shrink-0"
                  >
                    Cancel Alert
                  </button>
                </div>
              )}

              {/* Trigger Threshold */}
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-2">
                  When would you like to be notified?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDropType('5')}
                    className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                      dropType === '5'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-600/20'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="font-bold">5% Price Drop</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Notify at ${Math.round(currentPriceUSD * 0.95).toLocaleString()}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDropType('10')}
                    className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                      dropType === '10'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-600/20'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="font-bold">10% Price Drop</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Notify at ${Math.round(currentPriceUSD * 0.9).toLocaleString()}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDropType('any')}
                    className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                      dropType === 'any'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-600/20'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="font-bold">Any Price Drop</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Notify on any reduction
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDropType('custom')}
                    className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                      dropType === 'custom'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-600/20'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="font-bold">Custom Target Price</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Set specific amount ($)
                    </div>
                  </button>
                </div>

                {dropType === 'custom' && (
                  <div className="mt-2 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">$</span>
                    <input
                      type="number"
                      value={customPrice}
                      onChange={(e) => setCustomPrice(e.target.value)}
                      placeholder="Enter target price in USD"
                      className="w-full pl-7 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-emerald-600"
                    />
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="space-y-2.5">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. diaspora.investor@gmail.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-emerald-600 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 flex items-center justify-between mb-1">
                    <span>WhatsApp Number (Optional)</span>
                    <span className="text-[10px] text-slate-400 font-normal">For instant mobile ping</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +44 7911 123456 or +232 78 889 450"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-emerald-600 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-900/10 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Bell className="w-4 h-4" />
                  <span>Subscribe to Price Alert</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
