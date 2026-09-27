import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  X, 
  Compass, 
  Ship, 
  Clock, 
  ExternalLink, 
  Filter, 
  Anchor, 
  ArrowRight,
  Flame,
  Wind,
  Globe,
  DollarSign
} from 'lucide-react';
import { REAL_TIME_ALERTS, PORTS_ECI } from '../data/mockData';

export default function AlertsRiskView({ onNavigate }) {
  const [alerts, setAlerts] = useState(REAL_TIME_ALERTS);
  const [filterSeverity, setFilterSeverity] = useState('all'); // 'all', 'High', 'Medium', 'Low'
  const [filterType, setFilterType] = useState('all');

  // Dismiss an alert
  const handleDismiss = (id) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  // Filtered alerts
  const filteredAlerts = alerts.filter(a => {
    if (filterSeverity !== 'all' && a.severity !== filterSeverity) return false;
    if (filterType !== 'all' && a.type !== filterType) return false;
    return true;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-2 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-[#0A2342] tracking-tight">
              Alerts & Maritime Risk Intelligence Center
            </h1>
            <span className="text-xs bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full border border-rose-200">
              {alerts.length} Active Feeds
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time multi-agent risk surveillance across global bulk freight corridors, port congestions, and weather disruptions
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setAlerts(REAL_TIME_ALERTS)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
          >
            Reset Dismissed Alerts
          </button>
        </div>
      </div>

      {/* Risk Metrics Quick Bar (3 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4.5 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider block">
              High Severity Risks
            </span>
            <span className="text-2xl font-black text-rose-950 font-mono">
              {alerts.filter(a => a.severity === 'High').length} Threats
            </span>
            <span className="text-[11px] text-rose-600 block">Rate spike & Paradip congestion</span>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4.5 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Wind className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
              Weather & Geopolitical
            </span>
            <span className="text-2xl font-black text-amber-950 font-mono">
              2 Active Bulletins
            </span>
            <span className="text-[11px] text-amber-700 block">Bay of Bengal Depression & Mozambique</span>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4.5 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
              Bunker Cost Opportunity
            </span>
            <span className="text-2xl font-black text-emerald-950 font-mono">
              -$18/MT VLSFO
            </span>
            <span className="text-[11px] text-emerald-700 block">Singapore bunkering discount available</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 card-shadow flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="font-bold text-slate-700">Filter Severity:</span>
          {['all', 'High', 'Medium', 'Low'].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer capitalize ${
                filterSeverity === sev
                  ? 'bg-[#0A2342] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-400">
          Showing {filteredAlerts.length} of {alerts.length} alerts
        </div>
      </div>

      {/* Alerts Feed List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-400 space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <h4 className="font-bold text-slate-700 text-base">No Active Alerts in this Category</h4>
            <p className="text-xs text-slate-500">All risk parameters currently within safe operating thresholds.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isHigh = alert.severity === 'High';
            const isMed = alert.severity === 'Medium';

            return (
              <div
                key={alert.id}
                className={`bg-white rounded-2xl p-6 border transition-all card-shadow ${
                  isHigh ? 'border-rose-300 ring-1 ring-rose-200' :
                  isMed ? 'border-amber-300' :
                  'border-emerald-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  
                  {/* Left Content */}
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        isHigh ? 'bg-rose-100 text-rose-800' :
                        isMed ? 'bg-amber-100 text-amber-800' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {alert.severity} Risk
                      </span>

                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {alert.type}
                      </span>

                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {alert.timestamp}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-[#0A2342]">
                      {alert.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {alert.description}
                    </p>

                    <div className="text-xs text-slate-500">
                      <strong>Affected Corridor / Hub:</strong> <span className="text-[#1565C0] font-semibold">{alert.route}</span>
                    </div>

                    {/* Prescribed Action Box */}
                    <div className="mt-3 p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 text-xs">
                      <span className="font-bold text-[#0A2342] block mb-1">
                        Recommended Procurement Protocol:
                      </span>
                      <p className="text-slate-700">
                        {alert.action}
                      </p>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0">
                    <button
                      onClick={() => handleDismiss(alert.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                      title="Dismiss alert"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => onNavigate('forecasting')}
                      className="px-3.5 py-2 rounded-xl bg-[#0A2342] hover:bg-[#1565C0] text-white text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer"
                    >
                      <span>Simulate Impact</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>

      {/* East Coast India Demurrage & Congestion Live Monitor Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-[#0A2342] text-base tracking-tight flex items-center gap-2">
              <Anchor className="w-5 h-5 text-[#1565C0]" />
              East Coast India Port Congestion & Demurrage Risk Index
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Current pre-berthing wait times and daily demurrage liability based on standard Panamax charterparty terms ($28,000/day)
            </p>
          </div>
          <span className="text-xs text-slate-400">Live Port AIS Feed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10.5px] border-b border-slate-200">
                <th className="py-2.5 px-3">Port Name</th>
                <th className="py-2.5 px-3">State</th>
                <th className="py-2.5 px-3">Active Berths</th>
                <th className="py-2.5 px-3">Average Wait Days</th>
                <th className="py-2.5 px-3">Congestion Level</th>
                <th className="py-2.5 px-3">Demurrage Exposure (Panamax)</th>
                <th className="py-2.5 px-3">Operational Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PORTS_ECI.map((port) => (
                <tr key={port.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-bold text-[#0A2342]">{port.name}</td>
                  <td className="py-3 px-3 text-slate-500">{port.state}</td>
                  <td className="py-3 px-3">{port.berths} Berths</td>
                  <td className="py-3 px-3 font-mono font-bold">{port.avgWaitDays} Days</td>
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded font-bold text-[10.5px] ${
                      port.congestionStatus === 'High' ? 'bg-rose-100 text-rose-800' :
                      port.congestionStatus === 'Moderate' ? 'bg-amber-100 text-amber-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {port.congestionStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-700">
                    ${Math.round(port.avgWaitDays * 28000).toLocaleString()} USD
                  </td>
                  <td className="py-3 px-3">
                    {port.congestionStatus === 'High' ? (
                      <span className="text-rose-600 font-semibold">Berth Congestion (Action Req)</span>
                    ) : (
                      <span className="text-emerald-600 font-semibold">Normal Dispatch</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
