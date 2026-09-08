'use client';

import React, { useState } from 'react';
import { Property, Currency } from '@/types/property';
import { EXCHANGE_RATE_USD_TO_NLE } from '@/data/properties';
import { 
  X, 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Percent, 
  Calendar, 
  MessageSquare,
  Building2 
} from 'lucide-react';

interface MortgageCalculatorModalProps {
  property: Property | null;
  currency: Currency;
  onClose: () => void;
}

export const MortgageCalculatorModal: React.FC<MortgageCalculatorModalProps> = ({
  property,
  currency,
  onClose,
}) => {
  const initialPrice = property ? property.priceUSD : 150000;
  const [calcMode, setCalcMode] = useState<'mortgage' | 'yield'>('mortgage');

  // Mortgage Inputs
  const [propertyPrice, setPropertyPrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(25);
  const [loanTermYears, setLoanTermYears] = useState<number>(15);
  const [interestRate, setInterestRate] = useState<number>(8.5);

  // Rental Yield Inputs
  const [monthlyRent, setMonthlyRent] = useState<number>(
    property?.status === 'rent' ? Math.round(property.priceUSD / 12) : Math.round(initialPrice * 0.007)
  );
  const [annualExpenses, setAnnualExpenses] = useState<number>(1200);

  // Mortgage calculations
  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanPrincipal = propertyPrice - downPaymentAmount;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;

  let monthlyPayment = 0;
  if (monthlyRate > 0) {
    monthlyPayment =
      (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
  } else {
    monthlyPayment = loanPrincipal / totalMonths;
  }

  const totalPayment = monthlyPayment * totalMonths;
  const totalInterest = totalPayment - loanPrincipal;

  // Rental Yield Calculations
  const annualGrossRent = monthlyRent * 12;
  const annualNetRent = Math.max(0, annualGrossRent - annualExpenses);
  const grossYield = propertyPrice > 0 ? (annualGrossRent / propertyPrice) * 100 : 0;
  const netYield = propertyPrice > 0 ? (annualNetRent / propertyPrice) * 100 : 0;

  const formatCurrency = (usd: number) => {
    if (currency === 'NLE') {
      const nle = usd * EXCHANGE_RATE_USD_TO_NLE;
      return `NLe ${nle.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
    }
    return `$${Math.round(usd).toLocaleString()}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Financial & Investment Calculator</h3>
              <p className="text-[11px] text-slate-300">Kam Buy & Rent Property Sierra Leone</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="px-6 pt-4 flex gap-2 border-b border-slate-100">
          <button
            onClick={() => setCalcMode('mortgage')}
            className={`pb-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              calcMode === 'mortgage'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Mortgage & Developer Milestone Plan</span>
          </button>

          <button
            onClick={() => setCalcMode('yield')}
            className={`pb-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              calcMode === 'yield'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Diaspora Rental ROI & Yield</span>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-4">
          {property && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Target Property
              </span>
              <div className="font-bold text-slate-900 line-clamp-1">{property.title}</div>
              <div className="text-slate-500 text-[11px]">{property.location.area}</div>
            </div>
          )}

          {calcMode === 'mortgage' ? (
            <>
              {/* Inputs */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Property Value (USD $)
                </label>
                <input
                  type="number"
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Down Payment ({downPaymentPercent}%)
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                  <div className="text-[11px] font-semibold text-slate-500 mt-1">
                    {formatCurrency(downPaymentAmount)}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Loan Term ({loanTermYears} Years)
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    step="1"
                    value={loanTermYears}
                    onChange={(e) => setLoanTermYears(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                  <div className="text-[11px] font-semibold text-slate-500 mt-1">
                    {totalMonths} Monthly Installments
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Annual Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Summary Card */}
              <div className="p-4 bg-emerald-950/5 border border-emerald-900/10 rounded-2xl space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-bold text-slate-700">Estimated Monthly Payment:</span>
                  <span className="text-2xl font-black text-emerald-700 tracking-tight">
                    {formatCurrency(monthlyPayment)}/mo
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-emerald-900/10">
                  <div>
                    <span className="text-slate-500">Principal Amount:</span>
                    <div className="font-bold text-slate-900">{formatCurrency(loanPrincipal)}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Total Interest:</span>
                    <div className="font-bold text-slate-900">{formatCurrency(totalInterest)}</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Rental Yield Inputs */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Property Acquisition Cost (USD $)
                </label>
                <input
                  type="number"
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Monthly Rental Income ($)
                  </label>
                  <input
                    type="number"
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Annual Maintenance ($)
                  </label>
                  <input
                    type="number"
                    value={annualExpenses}
                    onChange={(e) => setAnnualExpenses(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Yield Summary */}
              <div className="p-4 bg-emerald-950/5 border border-emerald-900/10 rounded-2xl space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-bold text-slate-700">Gross Rental Yield:</span>
                  <span className="text-2xl font-black text-emerald-700 tracking-tight">
                    {grossYield.toFixed(1)}% p.a.
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-emerald-900/10">
                  <div>
                    <span className="text-slate-500">Gross Annual Rent:</span>
                    <div className="font-bold text-slate-900">{formatCurrency(annualGrossRent)}/yr</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Net Annual Yield:</span>
                    <div className="font-bold text-slate-900">{netYield.toFixed(1)}% p.a.</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* WhatsApp consultation CTA */}
          <div className="pt-2">
            <a
              href={`https://wa.me/23278889450?text=${encodeURIComponent(
                `Hello Kam Buy & Rent Property Sierra Leone, I would like to discuss payment structures and financing plans for properties around ${formatCurrency(propertyPrice)}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Discuss Milestone Financing with Kam Agent</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
