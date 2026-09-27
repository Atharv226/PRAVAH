import React from 'react';
import { Ship, Anchor, CheckCircle2, AlertTriangle, XCircle, ArrowRight } from 'lucide-react';

export default function ShipVisual({ vesselClass, isSelected, onClick, isCompatible, constraintMessage }) {
  // Visual config based on vessel class
  const configs = {
    handysize: {
      lengthPct: '55%',
      hatches: 5,
      cranes: 4,
      dwt: '35,000 MT',
      color: 'from-sky-500 to-blue-600',
      badge: 'Geared (4 Cranes)',
      iconScale: 'scale-75'
    },
    supramax: {
      lengthPct: '70%',
      hatches: 5,
      cranes: 4,
      dwt: '58,000 MT',
      color: 'from-blue-600 to-indigo-700',
      badge: 'Geared + Grabs',
      iconScale: 'scale-90'
    },
    panamax: {
      lengthPct: '85%',
      hatches: 7,
      cranes: 0,
      dwt: '75,000 MT',
      color: 'from-indigo-700 to-navy-900',
      badge: 'Gearless Panamax',
      iconScale: 'scale-100'
    },
    capesize: {
      lengthPct: '100%',
      hatches: 9,
      cranes: 0,
      dwt: '160,000 MT',
      color: 'from-slate-800 to-slate-950',
      badge: 'Gearless Super-Cape',
      iconScale: 'scale-110'
    }
  };

  const cfg = configs[vesselClass.id] || configs.panamax;

  return (
    <div 
      onClick={onClick}
      className={`rounded-2xl p-4.5 border transition-all cursor-pointer relative overflow-hidden ${
        isSelected 
          ? 'bg-white border-[#1565C0] shadow-xl ring-2 ring-[#00BCD4]/50 translate-y-[-2px]' 
          : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 card-shadow'
      }`}
    >
      {/* Top Header */}
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[10.5px] uppercase font-bold text-slate-400 tracking-wider">
            {cfg.badge}
          </span>
          <h4 className="text-base font-extrabold text-[#0A2342] flex items-center gap-1.5 mt-0.5">
            {vesselClass.name}
            {isSelected && (
              <span className="text-[10px] bg-[#1565C0] text-white px-2 py-0.5 rounded-full font-bold">
                Selected
              </span>
            )}
          </h4>
        </div>

        {/* Port Feasibility Pill */}
        {isCompatible !== undefined && (
          <span className={`text-[11px] font-bold px-2 py-0.8 rounded-md flex items-center gap-1 ${
            isCompatible 
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
              : 'bg-rose-100 text-rose-800 border border-rose-300'
          }`}>
            {isCompatible ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
            <span>{isCompatible ? 'Port Feasible' : 'Exceeds Draft'}</span>
          </span>
        )}
      </div>

      {/* Silhouette & Visual Ship Profile */}
      <div className="my-4 bg-slate-900 rounded-xl p-3 relative overflow-hidden border border-slate-800 flex items-center justify-center min-h-[90px]">
        {/* Subtle Waterline */}
        <div className="absolute bottom-3 left-0 right-0 h-1 bg-cyan-500/30" />
        
        {/* Simplified Vector Ship Profile */}
        <div 
          className="relative transition-all duration-300 flex items-center justify-center"
          style={{ width: cfg.lengthPct }}
        >
          {/* Ship Body */}
          <div className="w-full h-8 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 rounded-b-md relative shadow-md flex items-center justify-around px-2">
            
            {/* Hatches */}
            {Array.from({ length: cfg.hatches }).map((_, idx) => (
              <div key={idx} className="w-2.5 h-4 bg-slate-800 rounded-xs border border-slate-600" />
            ))}

            {/* Cranes (if geared) */}
            {cfg.cranes > 0 && (
              <div className="absolute -top-3 inset-x-0 flex justify-around">
                {Array.from({ length: cfg.cranes }).map((_, idx) => (
                  <div key={idx} className="w-1 h-3 bg-amber-400 rounded-xs shadow" />
                ))}
              </div>
            )}

            {/* Bridge / Superstructure */}
            <div className="absolute -top-4 right-1 w-4 h-5 bg-slate-300 rounded-t-xs border border-slate-400">
              <div className="w-2 h-1 bg-cyan-400 mx-auto mt-0.5 rounded-xs" />
              <div className="w-1 h-2 bg-red-600 absolute -top-1.5 right-1" />
            </div>

            {/* Bulbous Bow (Left front) */}
            <div className="absolute -left-1 bottom-0 w-2 h-3 bg-slate-400 rounded-l-full" />
          </div>
        </div>

        {/* DWT & Length tag */}
        <div className="absolute bottom-1 right-2 text-[9.5px] font-mono text-cyan-300/80">
          LOA: {vesselClass.loaReq}m • Draft: {vesselClass.draftReq}m
        </div>
      </div>

      {/* Key Metric Specs */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Deadweight (DWT)</span>
          <span className="font-extrabold text-[#0A2342]">{vesselClass.dwtRange}</span>
        </div>
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Draft Required</span>
          <span className="font-extrabold text-[#1565C0] font-mono">{vesselClass.draftReq} meters</span>
        </div>
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Daily Bunker Burn</span>
          <span className="font-bold text-slate-700">{vesselClass.fuelConsumptionSea} MT/day</span>
        </div>
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Benchmark Hire</span>
          <span className="font-bold text-emerald-700">${vesselClass.dailyHireRate.toLocaleString()}/day</span>
        </div>
      </div>

      {/* Advisory / Constraint Alert */}
      {constraintMessage && (
        <div className={`mt-3 p-2.5 rounded-lg text-xs flex items-start gap-1.5 ${
          isCompatible 
            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
            : 'bg-rose-50 text-rose-800 border border-rose-200'
        }`}>
          {isCompatible ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" /> : <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />}
          <span className="leading-snug">{constraintMessage}</span>
        </div>
      )}

      {/* Best For Tag */}
      <p className="text-[11px] text-slate-500 mt-2.5 italic">
        Best for: {vesselClass.bestFor}
      </p>
    </div>
  );
}
