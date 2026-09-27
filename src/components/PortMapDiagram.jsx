import React from 'react';
import { Anchor, CheckCircle2, AlertTriangle, XCircle, Info, Navigation } from 'lucide-react';
import { PORTS_ECI } from '../data/mockData';

export default function PortMapDiagram({ selectedPortId, onSelectPort, selectedVesselClass }) {
  // Find currently selected port
  const selectedPort = PORTS_ECI.find(p => p.id === selectedPortId) || PORTS_ECI[0];

  // Helper to determine draft compatibility
  const getCompatibility = (port) => {
    if (!selectedVesselClass) return { status: 'ok', label: 'Compatible' };
    
    // Check if vessel class fits
    const isUnsuitable = port.unsuitableClasses.includes(selectedVesselClass.name.split(' ')[0]);
    if (isUnsuitable || port.draft < selectedVesselClass.draftReq) {
      return { 
        status: 'danger', 
        label: `Violates Draft (${selectedVesselClass.draftReq}m vs ${port.draft}m)`,
        icon: XCircle,
        color: 'text-rose-600 bg-rose-50 border-rose-200'
      };
    }
    if (port.draft - selectedVesselClass.draftReq < 1.0) {
      return { 
        status: 'warning', 
        label: `Tight Draft Margin (${(port.draft - selectedVesselClass.draftReq).toFixed(1)}m underkeel)`,
        icon: AlertTriangle,
        color: 'text-amber-700 bg-amber-50 border-amber-200'
      };
    }
    return { 
      status: 'success', 
      label: `Fully Compliant (${port.draft}m draft)`,
      icon: CheckCircle2,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    };
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 card-shadow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-[#0A2342] text-[#00BCD4]">
              <Anchor className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-[#0A2342] text-lg tracking-tight">
              East Coast India (ECI) 7-Port Maritime Corridor
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time navigational draft depth, LOA clearance, and berthing feasibility for SAIL raw material intake
          </p>
        </div>

        {selectedVesselClass && (
          <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
            <span className="text-slate-500">Checking Draft Against:</span>
            <span className="font-bold text-[#0A2342]">{selectedVesselClass.name}</span>
            <span className="text-cyan-700 font-mono bg-cyan-100 px-2 py-0.5 rounded font-semibold">
              Req: {selectedVesselClass.draftReq}m
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        
        {/* Left: Interactive Visual Port Alignment (North to South along Bay of Bengal) */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-5 border border-slate-800 text-white relative overflow-hidden">
          
          {/* Subtle water wave background texture */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00BCD4_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center space-x-2 text-xs font-bold text-cyan-300 tracking-wider uppercase">
              <Navigation className="w-3.5 h-3.5 text-[#00BCD4]" />
              <span>Bay of Bengal Coastal Route (North → South)</span>
            </div>
            <span className="text-[11px] text-slate-400 bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700">
              Click any port to inspect
            </span>
          </div>

          {/* List of 7 ports ordered North to South */}
          {/* Haldia (22.0°N), Sagar (21.6°N), Dhamra (20.8°N), Paradip (20.2°N), Gopalpur (19.3°N), Vizag (17.6°N), Gangavaram (17.6°N) */}
          <div className="space-y-3 relative z-10">
            {PORTS_ECI.map((port) => {
              const isSelected = port.id === selectedPort.id;
              const comp = getCompatibility(port);
              const CompIcon = comp.icon || CheckCircle2;

              return (
                <div
                  key={port.id}
                  onClick={() => onSelectPort(port.id)}
                  className={`p-3.5 rounded-xl transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#1565C0]/40 to-[#0A2342] border-[#00BCD4] shadow-lg shadow-cyan-900/30 ring-1 ring-[#00BCD4]'
                      : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/70 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {/* Port Pin / Number Indicator */}
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                        isSelected 
                          ? 'bg-[#00BCD4] text-slate-950 font-extrabold shadow' 
                          : 'bg-slate-700 text-slate-300'
                      }`}>
                        {port.draft >= 18 ? 'D+' : port.draft >= 14 ? 'M' : 'S'}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-sm text-white">{port.name}</span>
                          <span className="text-[10px] text-slate-400">({port.state})</span>
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center space-x-2 mt-0.5">
                          <span>Max LOA: {port.maxLoa}m</span>
                          <span>•</span>
                          <span>Max DWT: {(port.maxDwt / 1000).toFixed(0)}k MT</span>
                          <span>•</span>
                          <span className={`${port.congestionStatus === 'High' ? 'text-rose-400' : port.congestionStatus === 'Moderate' ? 'text-amber-400' : 'text-emerald-400'}`}>
                            {port.avgWaitDays}d wait
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Depth Gauge & Status */}
                    <div className="text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <span className="text-xs text-slate-400">Permissible Draft:</span>
                        <span className={`font-mono text-sm font-extrabold ${
                          port.draft >= 18 ? 'text-emerald-400' :
                          port.draft >= 14 ? 'text-cyan-300' :
                          'text-rose-400'
                        }`}>
                          {port.draft}m
                        </span>
                      </div>

                      {/* Visual Draft Bar */}
                      <div className="w-28 h-2 bg-slate-700 rounded-full mt-1.5 overflow-hidden ml-auto">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            port.draft >= 18 ? 'bg-gradient-to-r from-teal-400 to-emerald-400' :
                            port.draft >= 14 ? 'bg-gradient-to-r from-blue-400 to-cyan-400' :
                            'bg-gradient-to-r from-amber-400 to-rose-500'
                          }`}
                          style={{ width: `${(port.draft / 22) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Compatibility status pill for active vessel */}
                  {selectedVesselClass && (
                    <div className="mt-2 pt-2 border-t border-slate-700/50 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Vessel Feasibility:</span>
                      <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded font-medium ${
                        comp.status === 'danger' ? 'bg-rose-950/80 text-rose-300 border border-rose-800' :
                        comp.status === 'warning' ? 'bg-amber-950/80 text-amber-300 border border-amber-800' :
                        'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                      }`}>
                        <CompIcon className="w-3 h-3" />
                        <span>{comp.label}</span>
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Deep Water (18m+) Capesize OK
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" /> Panamax Depth (14.5m)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400" /> Riverine Draft (&lt;10m) Lighterage Needed
            </span>
          </div>

        </div>

        {/* Right: Selected Port Deep Dive Profile */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#1565C0] uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {selectedPort.state} • ECI Port
                </span>
                <h4 className="text-xl font-extrabold text-[#0A2342] mt-1">
                  {selectedPort.name}
                </h4>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 block">Permissible Draft</span>
                <span className="text-2xl font-black text-[#1565C0] font-mono">
                  {selectedPort.draft}m
                </span>
              </div>
            </div>

            {/* Spec Matrix */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Maximum LOA</span>
                <p className="text-sm font-extrabold text-[#0A2342]">{selectedPort.maxLoa} meters</p>
                <span className="text-[10.5px] text-slate-500">Length Overall</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Max Deadweight</span>
                <p className="text-sm font-extrabold text-[#0A2342]">{(selectedPort.maxDwt).toLocaleString()} DWT</p>
                <span className="text-[10.5px] text-slate-500">Laden Capacity</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Active Bulk Berths</span>
                <p className="text-sm font-extrabold text-[#0A2342]">{selectedPort.berths} Berths</p>
                <span className="text-[10.5px] text-slate-500">Mechanized Coal/Ore</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Average Turnaround</span>
                <p className="text-sm font-extrabold text-amber-700">{selectedPort.avgWaitDays} Days</p>
                <span className="text-[10.5px] text-slate-500">Pre-berthing Wait</span>
              </div>
            </div>

            {/* Navigational & Restriction Advisory */}
            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs">
              <div className="flex items-center space-x-1.5 font-bold text-[#0A2342] mb-1">
                <Info className="w-4 h-4 text-[#1565C0]" />
                <span>Navigational & Handling Advisory:</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {selectedPort.restrictionNote}
              </p>
            </div>

            {/* SAIL Supply Chain Logistics Note */}
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs">
              <span className="font-bold text-emerald-900 block mb-0.5">
                SAIL Steel Plant Rail Evacuation:
              </span>
              <p className="text-emerald-800 leading-relaxed">
                {selectedPort.cokingCoalCapacity}
              </p>
            </div>

            {/* Suitable Vessel Classes list */}
            <div>
              <span className="text-xs font-bold text-slate-600 block mb-1.5">Permitted Vessel Classes:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedPort.suitableClasses.map(cls => (
                  <span key={cls} className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {cls}
                  </span>
                ))}
                {selectedPort.unsuitableClasses.map(cls => (
                  <span key={cls} className="text-xs bg-rose-100 text-rose-800 font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                    <XCircle className="w-3 h-3 text-rose-600" />
                    {cls} (Exceeds Draft)
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
