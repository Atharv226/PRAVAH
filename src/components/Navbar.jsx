import React, { useState } from 'react';
import { 
  Bell, 
  ShieldCheck, 
  Sparkles, 
  LogOut, 
  ExternalLink,
  ChevronDown,
  Anchor,
  Activity,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { REAL_TIME_ALERTS } from '../data/mockData';

export default function Navbar({ 
  currency, 
  onToggleCurrency, 
  user, 
  onLogout,
  onNavigate 
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0A2342] text-white border-b border-[#1565C0]/40 shadow-lg">
      {/* Top subtle tricolor stripe signaling Government of India / MeghRaj cloud compliance */}
      <div className="w-full h-[3px] bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Brand & Context */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => onNavigate('dashboard')} 
              className="flex items-center space-x-2.5 group focus:outline-none text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00BCD4] to-[#1565C0] flex items-center justify-center shadow-md shadow-[#00BCD4]/20 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12c2.5-2.5 5.5-2.5 8 0s5.5 2.5 8 0 5.5-2.5 8 0" />
                  <path d="M2 17c2.5-2.5 5.5-2.5 8 0s5.5 2.5 8 0 5.5-2.5 8 0" />
                  <path d="M12 3v9" />
                  <circle cx="12" cy="5" r="2" />
                </svg>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-xl tracking-wider bg-gradient-to-r from-white via-cyan-100 to-[#00BCD4] bg-clip-text text-transparent">
                    PRAVAH
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#1565C0] text-cyan-200 border border-[#00BCD4]/30">
                    SAIL
                  </span>
                </div>
                <div className="text-[10.5px] text-slate-300 font-medium tracking-tight flex items-center gap-1.5">
                  <span>Intelligent Freight Forecasting</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-[#00BCD4]">SIH 2026 PS-26006</span>
                </div>
              </div>
            </button>
          </div>

          {/* Center Trust Badges */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Accuracy Badge */}
            <div className="flex items-center space-x-1.5 bg-[#0D2F5A] px-3 py-1 rounded-full border border-[#00BCD4]/30 text-xs text-cyan-200 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#00BCD4] animate-pulse" />
              <span className="font-semibold text-white">96.1%</span>
              <span className="text-slate-300">Model Accuracy</span>
              <span className="text-[10px] bg-[#1E8449] text-white px-1.5 py-0.2 rounded font-medium">LSTM+Transformer</span>
            </div>

            {/* MeghRaj Govt Cloud Badge */}
            <div className="flex items-center space-x-1.5 bg-[#081C34] px-3 py-1 rounded-full border border-slate-700/80 text-xs text-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Secured by</span>
              <span className="font-semibold text-white">MeghRaj Govt Cloud</span>
              <div className="flex space-x-0.5 ml-1">
                <span className="w-1.5 h-3 rounded-xs bg-[#FF9933]" />
                <span className="w-1.5 h-3 rounded-xs bg-white" />
                <span className="w-1.5 h-3 rounded-xs bg-[#138808]" />
              </div>
            </div>
          </div>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center space-x-3">
            {/* Currency Switcher */}
            <button
              onClick={onToggleCurrency}
              title={`Switch currency to ${currency === 'USD' ? 'INR (₹)' : 'USD ($)'}`}
              className="flex items-center space-x-1 bg-[#0D2F5A] hover:bg-[#1565C0] text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-700 hover:border-[#00BCD4] transition-all cursor-pointer text-slate-200"
            >
              <DollarSign className="w-3.5 h-3.5 text-[#00BCD4]" />
              <span>{currency}</span>
              <span className="text-[10px] text-slate-400">({currency === 'USD' ? '$' : '₹'})</span>
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg bg-[#0D2F5A] hover:bg-[#1565C0] text-slate-300 hover:text-white transition-colors"
                title="Active Alerts"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C0392B] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {REAL_TIME_ALERTS.length}
                </span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-84 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-sm text-[#0A2342] flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-[#1565C0]" />
                      Real-Time Freight Alerts
                    </span>
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">
                      {REAL_TIME_ALERTS.length} New
                    </span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {REAL_TIME_ALERTS.map((alert) => (
                      <div 
                        key={alert.id} 
                        onClick={() => {
                          setShowNotifications(false);
                          onNavigate('alerts');
                        }}
                        className="p-3 hover:bg-slate-50 transition cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                            alert.severity === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {alert.severity}
                          </span>
                          <span className="text-[10px] text-slate-400">{alert.timestamp}</span>
                        </div>
                        <p className="font-semibold text-xs text-[#0A2342] mt-1">{alert.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5 truncate">{alert.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t border-slate-100 text-center">
                    <button 
                      onClick={() => {
                        setShowNotifications(false);
                        onNavigate('alerts');
                      }}
                      className="text-xs font-semibold text-[#1565C0] hover:text-[#0A2342] transition"
                    >
                      View All Alerts & Risk Matrix →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 bg-[#0D2F5A] hover:bg-[#1565C0] p-1.5 pl-2.5 rounded-lg border border-slate-700 transition"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-xs text-white">
                  {user?.name ? user.name.charAt(0) : 'S'}
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-xs font-semibold leading-tight text-white">{user?.name || 'A. K. Sharma'}</div>
                  <div className="text-[10px] text-cyan-300 leading-tight">CGM (Chartering)</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-[#0A2342]">{user?.name || 'Dr. A. K. Sharma'}</p>
                    <p className="text-[11px] text-slate-500">Chief General Manager, Raw Materials</p>
                    <p className="text-[10px] text-[#1565C0] font-mono mt-0.5">SAIL Emp ID: {user?.empId || 'SAIL-PROC-8842'}</p>
                    <div className="mt-1 flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                      <CheckCircle2 className="w-3 h-3" /> MeghRaj Verified Profile
                    </div>
                  </div>
                  
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onNavigate('settings');
                      }}
                      className="w-full text-left px-4 py-1.5 text-xs text-slate-700 hover:bg-slate-100 flex items-center space-x-2"
                    >
                      <span>Security & Profile Settings</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onNavigate('reports');
                      }}
                      className="w-full text-left px-4 py-1.5 text-xs text-slate-700 hover:bg-slate-100 flex items-center space-x-2"
                    >
                      <span>Audit Trail & Reports</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onLogout();
                      }}
                      className="w-full text-left px-4 py-1.5 text-xs text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
