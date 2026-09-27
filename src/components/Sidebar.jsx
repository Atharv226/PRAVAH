import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Ship, 
  Calculator, 
  AlertTriangle, 
  FileText, 
  Settings,
  Anchor,
  Compass,
  Layers,
  Flame,
  Info
} from 'lucide-react';
import { REAL_TIME_ALERTS } from '../data/mockData';

export default function Sidebar({ activeTab, onSelectTab }) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Executive Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'forecasting',
      label: 'Route Forecasting',
      icon: TrendingUp,
      badge: '96.1% AI'
    },
    {
      id: 'optimizer',
      label: 'Vessel Optimizer',
      icon: Ship,
      badge: '7 Ports'
    },
    {
      id: 'calculator',
      label: 'Charter Calculator',
      icon: Calculator,
      badge: 'Savings'
    },
    {
      id: 'alerts',
      label: 'Alerts & Risk',
      icon: AlertTriangle,
      badge: REAL_TIME_ALERTS.length.toString(),
      badgeVariant: 'danger'
    },
    {
      id: 'reports',
      label: 'Historical & Reports',
      icon: FileText,
      badge: 'CSV/PDF'
    },
    {
      id: 'settings',
      label: 'Settings & Cloud Feed',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <aside className="w-64 bg-[#0A2342] text-slate-300 flex flex-col border-r border-[#1565C0]/30 min-h-[calc(100vh-67px)] select-none">
      {/* Platform Subheader */}
      <div className="p-4 border-b border-slate-800/80">
        <div className="flex items-center space-x-2 text-xs font-semibold text-cyan-300">
          <Anchor className="w-4 h-4 text-[#00BCD4]" />
          <span>MARITIME INTELLIGENCE CELL</span>
        </div>
        <div className="text-[11px] text-slate-400 mt-1">
          SAIL Central Raw Materials Procurement
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#1565C0] to-[#0D2F5A] text-white shadow-md shadow-[#1565C0]/30 font-semibold border-l-4 border-[#00BCD4]'
                  : 'hover:bg-white/5 text-slate-300 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 transition-colors ${
                  isActive ? 'text-[#00BCD4]' : 'text-slate-400 group-hover:text-cyan-300'
                }`} />
                <span>{item.label}</span>
              </div>
              
              {item.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  item.badgeVariant === 'danger'
                    ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                    : isActive 
                      ? 'bg-[#00BCD4]/20 text-cyan-200 border border-[#00BCD4]/40'
                      : 'bg-slate-800 text-slate-400 group-hover:text-cyan-300'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Real-time Market Live Ticker Widget */}
      <div className="p-3.5 m-3 rounded-xl bg-[#07192F] border border-cyan-900/40">
        <div className="flex items-center justify-between text-[11px] font-semibold text-cyan-300 mb-2">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            LIVE MARKET FEEDS
          </span>
          <span className="text-[10px] text-slate-400">Baltic/Platts</span>
        </div>
        
        <div className="space-y-1.5 text-[11px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Baltic Dry (BDI):</span>
            <span className="font-mono font-semibold text-emerald-400">1,842 (+4.8%) ↑</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Capesize (BCI):</span>
            <span className="font-mono font-semibold text-cyan-300">2,610 (+6.2%) ↑</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Panamax (BPI):</span>
            <span className="font-mono font-semibold text-amber-300">1,620 (-1.1%) ↓</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">VLSFO Bunker:</span>
            <span className="font-mono font-semibold text-emerald-400">$582/t (-$18) ↓</span>
          </div>
        </div>
      </div>

      {/* SIH Hackathon & PSU Footer Stamp */}
      <div className="p-3 bg-[#061528] border-t border-slate-800 text-center">
        <div className="text-[10px] text-slate-400 font-medium">
          Smart India Hackathon 2026
        </div>
        <div className="text-[10.5px] font-bold text-white tracking-wide mt-0.5">
          Problem Statement: PS-26006
        </div>
        <div className="text-[9.5px] text-cyan-400/90 mt-0.5">
          Steel Authority of India Limited (SAIL)
        </div>
      </div>
    </aside>
  );
}
