import React, { useState, useMemo } from 'react';
import { 
  Ship, 
  Anchor, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Layers, 
  ArrowRight, 
  Info, 
  DollarSign, 
  Scale, 
  Sliders, 
  Sparkles,
  Waves
} from 'lucide-react';
import PortMapDiagram from '../components/PortMapDiagram';
import ShipVisual from '../components/ShipVisual';
import { PORTS_ECI, VESSEL_CLASSES } from '../data/mockData';
import { formatCurrency, formatRatePerTonne } from '../utils/formatters';

export default function VesselOptimizerView({ currency, onNavigate, onSelectCharterSetup }) {
  const [cargoVolume, setCargoVolume] = useState(75000); // MT
  const [selectedPortId, setSelectedPortId] = useState('paradip');
  const [selectedVesselId, setSelectedVesselId] = useState('panamax');

  const selectedPort = PORTS_ECI.find(p => p.id === selectedPortId) || PORTS_ECI[0];
  const selectedVessel = VESSEL_CLASSES.find(v => v.id === selectedVesselId) || VESSEL_CLASSES[2];

  // Evaluate each vessel class against the selected port and cargo quantity
  const vesselEvaluations = useMemo(() => {
    return VESSEL_CLASSES.map((vessel) => {
      const isUnsuitable = selectedPort.unsuitableClasses.includes(vessel.name.split(' ')[0]);
      const draftExceeded = selectedPort.draft < vessel.draftReq;
      const isCompliant = !isUnsuitable && !draftExceeded;

      // Calculate number of voyages needed for this cargo volume
      const voyagesNeeded = Math.ceil(cargoVolume / vessel.capacityMt);
      
      // Estimated base freight rate per MT
      let estimatedRateUsd = 14.80;
      if (vessel.id === 'capesize') estimatedRateUsd = 12.10;
      if (vessel.id === 'panamax') estimatedRateUsd = 14.80;
      if (vessel.id === 'supramax') estimatedRateUsd = 16.20;
      if (vessel.id === 'handysize') estimatedRateUsd = 18.50;

      // Total freight cost
      const totalFreightUsd = cargoVolume * estimatedRateUsd;

      let constraintNote = '';
      if (!isCompliant) {
        if (draftExceeded) {
          constraintNote = `Violates Port Draft: Requires ${vessel.draftReq}m vs ${selectedPort.draft}m available. Severe grounding risk.`;
        } else {
          constraintNote = `Port infrastructure does not support ${vessel.name} class berthing.`;
        }
      } else {
        constraintNote = `Fully Permitted: Complies with ${selectedPort.name} draft (${selectedPort.draft}m) & LOA (${selectedPort.maxLoa}m).`;
      }

      return {
        vessel,
        isCompliant,
        voyagesNeeded,
        estimatedRateUsd,
        totalFreightUsd,
        constraintNote
      };
    });
  }, [selectedPort, cargoVolume]);

  // Find the optimal compliant vessel recommendation
  const recommendedOption = useMemo(() => {
    const compliant = vesselEvaluations.filter(e => e.isCompliant);
    if (compliant.length === 0) {
      // Haldia special case: requires lighterage at Sagar
      return {
        vessel: VESSEL_CLASSES.find(v => v.id === 'handysize'),
        note: 'Direct berthing restricted to Handysize. Larger Panamax parcels must be lightened at Sagar-Sandheads Anchorage.',
        isLighterageNeeded: true
      };
    }
    // Sort by lowest total freight cost
    compliant.sort((a, b) => a.totalFreightUsd - b.totalFreightUsd);
    return {
      vessel: compliant[0].vessel,
      note: `Optimal economies of scale for ${cargoVolume.toLocaleString()} MT at ${selectedPort.name}.`,
      isLighterageNeeded: false,
      evaluation: compliant[0]
    };
  }, [vesselEvaluations, cargoVolume, selectedPort]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-2 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-[#0A2342] tracking-tight">
              Vessel Fleet & Port Constraint Optimizer
            </h1>
            <span className="text-xs bg-[#1565C0] text-white font-bold px-2 py-0.5 rounded-full">
              Automated Draft & LOA Verification
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Match bulk cargo parcel sizes with optimal vessel deadweight while strictly enforcing East Coast India port physical constraints
          </p>
        </div>

        <button
          onClick={() => onNavigate('calculator')}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#1565C0] to-[#0A2342] text-white text-xs font-bold hover:shadow-md transition flex items-center space-x-1.5 self-start cursor-pointer"
        >
          <span>Calculate Voyage vs Time Charter</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Input Controls Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="font-extrabold text-[#0A2342] text-sm flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#1565C0]" />
            Cargo Allocation & Port Intake Parameters
          </span>
          <span className="text-xs text-slate-400">
            Current Target Port: <strong className="text-[#1565C0]">{selectedPort.name}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          {/* Cargo Quantity Slider */}
          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Bulk Cargo Parcel Quantity
              </label>
              <span className="text-base font-extrabold text-[#1565C0] font-mono">
                {cargoVolume.toLocaleString()} MT
              </span>
            </div>

            <input
              type="range"
              min="20000"
              max="180000"
              step="5000"
              value={cargoVolume}
              onChange={(e) => setCargoVolume(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1565C0]"
            />

            {/* Quick volume preset chips */}
            <div className="flex items-center space-x-2 pt-1 text-xs">
              <span className="text-[10.5px] text-slate-400">Presets:</span>
              {[35000, 60000, 75000, 150000].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setCargoVolume(preset)}
                  className={`px-2 py-0.5 rounded-md font-semibold text-[11px] transition cursor-pointer ${
                    cargoVolume === preset
                      ? 'bg-[#1565C0] text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {(preset / 1000)}k MT
                </button>
              ))}
            </div>
          </div>

          {/* Destination Port Selector */}
          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Discharge Port (7 East Coast India Terminals)
            </label>
            
            <select
              value={selectedPortId}
              onChange={(e) => setSelectedPortId(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1565C0] cursor-pointer"
            >
              {PORTS_ECI.map((port) => (
                <option key={port.id} value={port.id}>
                  {port.name} — Draft: {port.draft}m (Max DWT: {(port.maxDwt/1000)}k MT)
                </option>
              ))}
            </select>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
              <span>State: <strong>{selectedPort.state}</strong></span>
              <span>Max Berth LOA: <strong>{selectedPort.maxLoa}m</strong></span>
              <span>Avg Delay: <strong>{selectedPort.avgWaitDays} days</strong></span>
            </div>
          </div>

        </div>

        {/* AI Recommendation Banner */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  PRAVAH Recommendation
                </span>
                <span className="font-extrabold text-[#0A2342] text-sm">
                  {recommendedOption.vessel.name} ({recommendedOption.vessel.dwtRange})
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {recommendedOption.note}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:self-center">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Est. Rate per MT</span>
              <span className="text-base font-black text-emerald-800 font-mono">
                {formatRatePerTonne(recommendedOption.evaluation?.estimatedRateUsd || 14.80, currency)}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Visual Port Map Diagram Component */}
      <PortMapDiagram 
        selectedPortId={selectedPortId} 
        onSelectPort={setSelectedPortId}
        selectedVesselClass={selectedVessel}
      />

      {/* Visual Ship Size Comparison Grid (4 Vessel Classes) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-[#0A2342] text-base tracking-tight flex items-center gap-2">
            <Ship className="w-5 h-5 text-[#1565C0]" />
            Vessel Class Feasibility Matrix for {selectedPort.name}
          </h3>
          <span className="text-xs text-slate-400">
            Click any vessel to inspect draft compatibility
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {vesselEvaluations.map(({ vessel, isCompliant, voyagesNeeded, estimatedRateUsd, totalFreightUsd, constraintNote }) => {
            const isSelected = vessel.id === selectedVesselId;

            return (
              <ShipVisual
                key={vessel.id}
                vesselClass={vessel}
                isSelected={isSelected}
                isCompatible={isCompliant}
                constraintMessage={constraintNote}
                onClick={() => setSelectedVesselId(vessel.id)}
              />
            );
          })}
        </div>
      </div>

    </div>
  );
}
