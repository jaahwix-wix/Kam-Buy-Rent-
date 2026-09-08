'use client';

import React, { useSyncExternalStore } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { TrendingUp, Info, Calendar } from 'lucide-react';
import { Currency } from '@/types/property';
import { EXCHANGE_RATE_USD_TO_NLE } from '@/data/properties';

interface HistoricalPropertyChartProps {
  currency: Currency;
  propertyArea?: string;
}

interface HistoricalDataPoint {
  year: string;
  peninsulaAvg: number; // USD per Town Lot
  urbanAvg: number; // USD per Town Lot
  growthRate: string;
}

const HISTORICAL_DATA: HistoricalDataPoint[] = [
  { year: '2020', peninsulaAvg: 23000, urbanAvg: 42000, growthRate: '+11.5%' },
  { year: '2021', peninsulaAvg: 28500, urbanAvg: 48000, growthRate: '+13.8%' },
  { year: '2022', peninsulaAvg: 35000, urbanAvg: 55000, growthRate: '+14.9%' },
  { year: '2023', peninsulaAvg: 43000, urbanAvg: 63000, growthRate: '+15.2%' },
  { year: '2024', peninsulaAvg: 51500, urbanAvg: 71000, growthRate: '+14.5%' },
  { year: '2025', peninsulaAvg: 59000, urbanAvg: 78500, growthRate: '+13.6%' },
  { year: '2026', peninsulaAvg: 65000, urbanAvg: 84000, growthRate: '+12.8%' },
];

const emptySubscribe = () => () => {};

export const HistoricalPropertyChart: React.FC<HistoricalPropertyChartProps> = ({
  currency,
  propertyArea = 'Hamilton Peninsula',
}) => {
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const formatCurrencyVal = (usdVal: number) => {
    if (currency === 'NLE') {
      const nle = usdVal * EXCHANGE_RATE_USD_TO_NLE;
      return `NLe ${(nle / 1000).toFixed(0)}k`;
    }
    return `$${(usdVal / 1000).toFixed(0)}k`;
  };

  const chartData = HISTORICAL_DATA.map((item) => ({
    year: item.year,
    'Peninsula Corridor (Hamilton)': currency === 'NLE' ? item.peninsulaAvg * EXCHANGE_RATE_USD_TO_NLE : item.peninsulaAvg,
    'Freetown Urban Average': currency === 'NLE' ? item.urbanAvg * EXCHANGE_RATE_USD_TO_NLE : item.urbanAvg,
    rawPeninsulaUsd: item.peninsulaAvg,
    growthRate: item.growthRate,
  }));

  if (!isClient) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 h-56 flex items-center justify-center">
        <span className="text-xs text-slate-400">Loading Freetown regional valuation trends...</span>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5">
      {/* Header with KPI metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Freetown & Peninsula Historical Value Trends</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Average benchmark price per 1 Town Lot (~405 m²) in USD / NLe from 2020 to 2026
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-100/80 text-emerald-800 text-[11px] font-extrabold flex items-center gap-1">
            <span>+14.2% Avg / Year</span>
          </span>
          <span className="text-[10px] text-slate-500 font-medium hidden sm:inline-block">
            Hamilton Corridor Index
          </span>
        </div>
      </div>

      {/* Mini Bar Chart */}
      <div className="w-full h-48 sm:h-52 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              tick={{ fontSize: 11, fill: '#64748b' }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              tick={{ fontSize: 10, fill: '#64748b' }}
              tickFormatter={(val) => formatCurrencyVal(currency === 'NLE' ? val / EXCHANGE_RATE_USD_TO_NLE : val)}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload || !payload.length) return null;
                const dataPoint = chartData.find((d) => d.year === label);
                return (
                  <div className="bg-slate-900 text-white p-2.5 rounded-xl text-xs shadow-xl border border-slate-700 min-w-44">
                    <div className="flex items-center justify-between font-bold border-b border-slate-700 pb-1 mb-1.5">
                      <span>Year {label}</span>
                      <span className="text-emerald-400 text-[11px]">{dataPoint?.growthRate} YoY</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                          Peninsula (Hamilton):
                        </span>
                        <span className="font-bold text-white">
                          {currency === 'NLE'
                            ? `NLe ${Number(payload[0]?.value).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                            : `$${Number(payload[0]?.value).toLocaleString()}`}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-slate-400 inline-block" />
                          Central Urban:
                        </span>
                        <span className="font-semibold text-slate-200">
                          {currency === 'NLE'
                            ? `NLe ${Number(payload[1]?.value).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                            : `$${Number(payload[1]?.value).toLocaleString()}`}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }}
              iconType="circle"
              iconSize={8}
            />
            <Bar
              dataKey="Peninsula Corridor (Hamilton)"
              fill="#059669"
              radius={[4, 4, 0, 0]}
              maxBarSize={22}
            />
            <Bar
              dataKey="Freetown Urban Average"
              fill="#94a3b8"
              radius={[4, 4, 0, 0]}
              maxBarSize={22}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Insight Footer */}
      <div className="mt-2.5 pt-2.5 border-t border-slate-200/80 flex items-start gap-2 text-[11px] text-slate-600">
        <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
        <p>
          <strong className="font-semibold text-slate-800">Peninsula Highway Impact:</strong> Properties along Hamilton and Sussex have appreciated by over 180% since 2020 due to tarmac road infrastructure, stable Atlantic beachfront land conveyances, and steady diaspora investment.
        </p>
      </div>
    </div>
  );
};
