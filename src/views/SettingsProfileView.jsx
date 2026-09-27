import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Bell, 
  Database, 
  CheckCircle2, 
  Lock, 
  Server, 
  Globe, 
  Layers, 
  Smartphone, 
  Mail, 
  MessageSquare,
  Sparkles,
  Save
} from 'lucide-react';

export default function SettingsProfileView({ user }) {
  // Notification states
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsDemurrage, setSmsDemurrage] = useState(true);
  const [whatsAppDigest, setWhatsAppDigest] = useState(false);
  const [dailyBriefing, setDailyBriefing] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  // Connected enterprise feeds
  const dataFeeds = [
    { name: 'Baltic Dry Exchange (London) API', type: 'Daily BDI, BCI, BPI Indices', status: 'Connected', latency: '42ms', lastSync: '3 mins ago' },
    { name: 'S&P Global Platts Coking Coal Index', type: 'FOB Australia / CFR India Spot Benchmark', status: 'Connected', latency: '58ms', lastSync: '12 mins ago' },
    { name: 'MarineTraffic / Spire Satellite AIS', type: 'Real-time vessel positions & port queues', status: 'Connected', latency: '110ms', lastSync: 'Just now' },
    { name: 'India Meteorological Dept (IMD) / NOAA', type: 'Bay of Bengal cyclone & monsoon alerts', status: 'Connected', latency: '85ms', lastSync: '25 mins ago' },
    { name: 'SAIL SAP S/4HANA Materials Management', type: 'Blast furnace coal inventory & rake supply', status: 'Connected', latency: '18ms', lastSync: 'Real-time' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-2 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-[#0A2342] tracking-tight">
              Enterprise Settings & MeghRaj Cloud Profile
            </h1>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
              MeitY Verified
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage procurement officer credentials, multi-channel notification parameters, and live data telemetry
          </p>
        </div>

        {/* Indian Flag Tricolor Cloud Compliance Stamp */}
        <div className="flex items-center space-x-2.5 bg-slate-900 text-white px-4 py-2 rounded-xl border border-slate-700 shadow-sm text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>MeghRaj Cloud: <strong className="text-cyan-300">NIC-DELHI-ZONE1</strong></span>
          <div className="flex space-x-0.5 pl-1">
            <span className="w-1.5 h-3.5 bg-[#FF9933] rounded-xs" />
            <span className="w-1.5 h-3.5 bg-white rounded-xs" />
            <span className="w-1.5 h-3.5 bg-[#138808] rounded-xs" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: User Profile & Security Details (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* User Profile Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0A2342] to-[#1565C0] flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-900/20">
                {user?.name ? user.name.charAt(0) : 'A'}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1565C0] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Chartering Signatory
                </span>
                <h3 className="text-lg font-extrabold text-[#0A2342] mt-0.5">
                  {user?.name || 'Dr. A. K. Sharma'}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {user?.role || 'Chief General Manager (Chartering & Materials)'}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2.5 text-xs">
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500">SAIL Employee ID:</span>
                <span className="font-mono font-bold text-slate-800">{user?.empId || 'SAIL-PROC-8842'}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500">Allocated Division:</span>
                <span className="font-medium text-slate-800">Central Materials Management, New Delhi</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500">Steel Plants Linked:</span>
                <span className="font-medium text-slate-800">Bhilai, Bokaro, Rourkela, Durgapur, IISCO</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500">Charter Party Authority:</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Full Tender Authority (Tier-1)
                </span>
              </div>
            </div>
          </div>

          {/* MeghRaj Government Cloud Security Badge */}
          <div className="bg-gradient-to-br from-[#061528] to-[#0A2342] rounded-2xl p-6 border border-cyan-900/60 text-white space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h4 className="font-extrabold text-sm text-white">
                  MeghRaj Govt Cloud Security Compliance
                </h4>
              </div>
              {/* Indian flag icon accent */}
              <div className="flex space-x-1">
                <span className="w-2 h-4 rounded-xs bg-[#FF9933]" />
                <span className="w-2 h-4 rounded-xs bg-white" />
                <span className="w-2 h-4 rounded-xs bg-[#138808]" />
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              PRAVAH is deployed in strict compliance with the Ministry of Electronics & IT (MeitY) Government Cloud Policy guidelines.
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10">
                <span className="text-slate-300">Data Encryption:</span>
                <span className="font-mono text-cyan-300 font-semibold">AES-256 (At Rest) / TLS 1.3</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10">
                <span className="text-slate-300">CERT-In Security Audit:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Passed Clean (v2.6)
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10">
                <span className="text-slate-300">Sovereignty Compliance:</span>
                <span className="font-semibold text-white">100% Data Resident in India</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10">
                <span className="text-slate-300">Hackathon Reference:</span>
                <span className="font-mono text-cyan-200">SIH-2026 • PS-26006</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Notification Preferences & Live Data Sources (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Notification Preferences */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-[#1565C0]" />
                <h3 className="font-extrabold text-[#0A2342] text-base tracking-tight">
                  Automated Procurement & Demurrage Notification Matrix
                </h3>
              </div>
              {isSaved && (
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Preferences Saved!
                </span>
              )}
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-100 text-[#1565C0]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block text-xs">
                      Daily Morning Freight & BDI Intelligence Digest
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Dispatched at 07:30 IST containing Baltic shifts & charter window recommendations
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={dailyBriefing}
                  onChange={(e) => setDailyBriefing(e.target.checked)}
                  className="w-4 h-4 text-[#1565C0] rounded border-slate-300 focus:ring-[#1565C0] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-rose-100 text-rose-700">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block text-xs">
                      Instant SMS / Alert for Demurrage Exposure &gt; 3 Days
                    </span>
                    <span className="text-[11px] text-slate-500">
                      High-priority SMS when Paradip or Haldia berth waiting times escalate
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={smsDemurrage}
                  onChange={(e) => setSmsDemurrage(e.target.checked)}
                  className="w-4 h-4 text-[#1565C0] rounded border-slate-300 focus:ring-[#1565C0] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block text-xs">
                      Rate Drop Alert & Instant Booking Signal
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Notify immediately when spot freight rates reach the predicted monthly bottom
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-4 h-4 text-[#1565C0] rounded border-slate-300 focus:ring-[#1565C0] cursor-pointer"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1565C0] hover:bg-blue-600 text-white font-bold text-xs shadow-md transition flex items-center space-x-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Notification Preferences</span>
                </button>
              </div>
            </form>
          </div>

          {/* Live Data Sources & Integrations */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Server className="w-5 h-5 text-[#00BCD4]" />
                <h3 className="font-extrabold text-[#0A2342] text-base tracking-tight">
                  External Data Ingestion Feeds & API Gateways
                </h3>
              </div>
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                5 / 5 Systems Online
              </span>
            </div>

            <div className="space-y-2.5">
              {dataFeeds.map((feed, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-bold text-[#0A2342]">{feed.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 pl-4.5">{feed.type}</p>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center space-x-2 justify-end">
                      <span className="text-[10.5px] font-mono text-slate-500">Latency: {feed.latency}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                        {feed.status}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Sync: {feed.lastSync}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
