import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function StatCard({
  title,
  value,
  subvalue,
  trend, // 'up', 'down', 'neutral'
  trendValue,
  trendLabel,
  icon: Icon,
  badgeText,
  accentColor = 'blue' // 'blue', 'green', 'teal', 'orange', 'red'
}) {
  const colorMap = {
    blue: {
      border: 'hover:border-[#1565C0]',
      iconBg: 'bg-[#1565C0]/10 text-[#1565C0]',
      indicator: 'text-[#1565C0]'
    },
    teal: {
      border: 'hover:border-[#00BCD4]',
      iconBg: 'bg-[#00BCD4]/10 text-[#00BCD4]',
      indicator: 'text-[#00BCD4]'
    },
    green: {
      border: 'hover:border-[#1E8449]',
      iconBg: 'bg-[#1E8449]/10 text-[#1E8449]',
      indicator: 'text-[#1E8449]'
    },
    orange: {
      border: 'hover:border-[#F57F17]',
      iconBg: 'bg-[#F57F17]/10 text-[#F57F17]',
      indicator: 'text-[#F57F17]'
    },
    red: {
      border: 'hover:border-[#C0392B]',
      iconBg: 'bg-[#C0392B]/10 text-[#C0392B]',
      indicator: 'text-[#C0392B]'
    }
  };

  const currentTheme = colorMap[accentColor] || colorMap.blue;

  return (
    <div className={`bg-white rounded-2xl p-5 border border-slate-200 card-shadow transition-all duration-200 hover:shadow-lg ${currentTheme.border} relative overflow-hidden group`}>
      {/* Top Accent Strip */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
        accentColor === 'green' ? 'from-emerald-500 to-teal-400' :
        accentColor === 'teal' ? 'from-cyan-400 to-blue-500' :
        accentColor === 'orange' ? 'from-amber-400 to-orange-500' :
        accentColor === 'red' ? 'from-rose-500 to-red-600' :
        'from-[#1565C0] to-[#00BCD4]'
      }`} />

      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {title}
          </p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl font-extrabold text-[#0A2342] tracking-tight">
              {value}
            </h3>
            {subvalue && (
              <span className="text-xs font-medium text-slate-500">
                {subvalue}
              </span>
            )}
          </div>
        </div>

        {Icon && (
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${currentTheme.iconBg} transition-transform group-hover:scale-110`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        {trendValue && (
          <div className="flex items-center space-x-1.5">
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md font-bold text-[11px] ${
              trend === 'up' 
                ? (accentColor === 'red' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800')
                : trend === 'down'
                  ? (accentColor === 'green' ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-50 text-emerald-700')
                  : 'bg-slate-100 text-slate-700'
            }`}>
              {trend === 'up' && <TrendingUp className="w-3 h-3 mr-0.5 inline" />}
              {trend === 'down' && <TrendingDown className="w-3 h-3 mr-0.5 inline" />}
              {trend === 'neutral' && <Minus className="w-3 h-3 mr-0.5 inline" />}
              {trendValue}
            </span>
            {trendLabel && (
              <span className="text-slate-500 text-[11px] font-medium">{trendLabel}</span>
            )}
          </div>
        )}

        {badgeText && (
          <span className="ml-auto text-[10.5px] font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
}
