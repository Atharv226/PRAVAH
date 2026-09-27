import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Ship, 
  Anchor, 
  CheckCircle2, 
  AlertCircle, 
  DollarSign, 
  Layers, 
  Cpu, 
  BarChart2, 
  Calendar,
  Zap,
  Info
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  ORIGIN_COUNTRIES, 
  PORTS_ECI, 
  CARGO_TYPES, 
  VESSEL_CLASSES, 
  GENERATE_FORECAST_DATA, 
  MODEL_ACCURACY_STATS 
} from '../data/mockData';
import { formatCurrency, formatRatePerTonne } from '../utils/formatters';

export default function RouteForecastingView({ currency, initialRoute, onNavigate }) {
  // Selection states
  const [originId, setOriginId] = useState(initialRoute?.origin || 'australia');
  const [destId, setDestId] = useState(initialRoute?.dest || 'paradip');
  const [cargoId, setCargoId] = useState(initialRoute?.cargo || 'coking_coal');
  const [vesselId, setVesselId] = useState(initialRoute?.vessel || 'panamax');
  const [horizon, setHorizon] = useState('90'); // 30, 60, 90 days

  // Computing state
  const [isPredicting, setIsPredicting] = useState(false);
  const [hasRunPrediction, setHasRunPrediction] = useState(true);

  // Selected entities
  const selectedOrigin = ORIGIN_COUNTRIES.find(o => o.id === originId) || ORIGIN_COUNTRIES[0];
  const selectedDest = PORTS_ECI.find(p => p.id === destId) || PORTS_ECI[0];
  const selectedCargo = CARGO_TYPES.find(c => c.id === cargoId) || CARGO_TYPES[0];
  const selectedVessel = VESSEL_CLASSES.find(v => v.id === vesselId) || VESSEL_CLASSES[2];

  // Calculate dynamic forecast metrics based on selection
  const forecastMetrics = useMemo(() => {
    let base = selectedOrigin.baseRate;
    
    // Scale by vessel size
    if (selectedVessel.id === 'capesize') base *= 0.88;
    if (selectedVessel.id === 'supramax') base *= 1.08;
    if (selectedVessel.id === 'handysize') base *= 1.24;

    // Scale slightly by cargo density/stowage
    if (selectedCargo.id === 'iron_ore') base *= 0.92;
    if (selectedCargo.id === 'pci_coal') base *= 1.03;

    const spotRate = +base.toFixed(2);
    const predicted30d = +(base * 0.94).toFixed(2); // predicted dip
    const predicted60d = +(base * 0.96).toFixed(2);
    const predicted90d = +(base * 1.02).toFixed(2);
    const tceDaily = Math.round(spotRate * 1260);
    const confidenceScore = 96.1;

    // Check port draft compatibility
    const draftViolated = selectedDest.draft < selectedVessel.draftReq;
    const isUnsuitable = selectedDest.unsuitableClasses.includes(selectedVessel.name.split(' ')[0]);

    return {
      spotRate,
      predictedRate: horizon === '30' ? predicted30d : horizon === '60' ? predicted60d : predicted90d,
      tceDaily,
      confidenceScore,
      accuracyPct: 96.1,
      draftViolated: draftViolated || isUnsuitable,
      transitDays: selectedOrigin.transitDays,
      distanceNm: selectedOrigin.avgDistanceNm
    };
  }, [selectedOrigin, selectedDest, selectedCargo, selectedVessel, horizon]);

  // Generate chart data
  const rawChartData = useMemo(() => {
    return GENERATE_FORECAST_DATA(originId, destId, cargoId, vesselId);
  }, [originId, destId, cargoId, vesselId]);

  const chartData = useMemo(() => {
    const days = parseInt(horizon, 10);
    if (days === 30) return rawChartData.slice(20, 52);
    if (days === 60) return rawChartData.slice(10, 72);
    return rawChartData;
  }, [rawChartData, horizon]);

  // Trigger prediction simulation
  const handlePredict = () => {
    setIsPredicting(true);
    setTimeout(() => {
      setIsPredicting(false);
      setHasRunPrediction(true);
    }, 700);
  };

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1">
          <div className="font-bold text-cyan-300 border-b border-slate-700 pb-1">{label}</div>
          <div className="text-[#00BCD4] font-semibold">
            PRAVAH Ensemble: {formatRatePerTonne(dataPoint.predictedRate, currency)}
          </div>
          <div className="text-amber-400">
            Old ARIMA: {formatRatePerTonne(dataPoint.arimaRate, currency)}
          </div>
          <div className="text-slate-400 text-[10px]">
            BDI: {dataPoint.bdi} pts • Daily TCE: ${dataPoint.tceDaily.toLocaleString()}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-2 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-[#0A2342] tracking-tight">
              AI Freight Rate Forecasting Engine
            </h1>
            <span className="text-xs bg-cyan-100 text-cyan-900 font-bold px-2.5 py-0.5 rounded-full border border-cyan-300">
              Deep Learning Ensemble
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Simulate freight rates ($/MT) and TCE ($/day) by corridor, cargo specification, and vessel tonnage for SAIL bulk procurement
          </p>
        </div>

        {/* Model Accuracy Quick Badge */}
        <div className="flex items-center space-x-2 bg-[#0A2342] text-white px-3.5 py-1.5 rounded-xl border border-cyan-800 shadow-sm text-xs">
          <Sparkles className="w-4 h-4 text-[#00BCD4] animate-pulse" />
          <span>Model Accuracy: <strong className="text-cyan-300 font-mono">96.1%</strong></span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-300">RMSE: <strong className="text-white font-mono">0.62</strong></span>
        </div>
      </div>

      {/* Main Parameters Input Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="font-extrabold text-[#0A2342] text-sm flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#1565C0]" />
            Configurable Voyage Parameters
          </span>
          <span className="text-xs text-slate-400">
            Selected Lane: {selectedOrigin.name} ➔ {selectedDest.name}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Origin Country */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              1. Origin Country / Loading Hub
            </label>
            <select
              value={originId}
              onChange={(e) => setOriginId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1565C0] cursor-pointer"
            >
              {ORIGIN_COUNTRIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.flag} {c.name} ({c.ports[0]})
                </option>
              ))}
            </select>
            <span className="text-[10.5px] text-slate-500 block truncate">
              Ports: {selectedOrigin.ports.slice(0, 2).join(', ')}
            </span>
          </div>

          {/* Destination Port (7 ECI Ports) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              2. Destination Port (ECI)
            </label>
            <select
              value={destId}
              onChange={(e) => setDestId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1565C0] cursor-pointer"
            >
              {PORTS_ECI.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.draft}m draft)
                </option>
              ))}
            </select>
            <span className="text-[10.5px] text-slate-500 block">
              Max Draft: <strong className="text-[#1565C0] font-mono">{selectedDest.draft}m</strong> • {selectedDest.state}
            </span>
          </div>

          {/* Cargo Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              3. Cargo Specification
            </label>
            <select
              value={cargoId}
              onChange={(e) => setCargoId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1565C0] cursor-pointer"
            >
              {CARGO_TYPES.map((cg) => (
                <option key={cg.id} value={cg.id}>
                  {cg.name}
                </option>
              ))}
            </select>
            <span className="text-[10.5px] text-slate-500 block truncate">
              Priority: {selectedCargo.sailPriority}
            </span>
          </div>

          {/* Vessel Class */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              4. Vessel Class / Deadweight
            </label>
            <select
              value={vesselId}
              onChange={(e) => setVesselId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1565C0] cursor-pointer"
            >
              {VESSEL_CLASSES.map((vc) => (
                <option key={vc.id} value={vc.id}>
                  {vc.name} ({vc.dwtRange})
                </option>
              ))}
            </select>
            <span className="text-[10.5px] text-slate-500 block">
              Requires <strong className="font-mono text-slate-700">{selectedVessel.draftReq}m</strong> draft
            </span>
          </div>

        </div>

        {/* Action Button & Forecast Horizon Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-slate-100 gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-600">Forecast Horizon:</span>
            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              {['30', '60', '90'].map((hz) => (
                <button
                  key={hz}
                  onClick={() => setHorizon(hz)}
                  className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                    horizon === hz
                      ? 'bg-white text-[#1565C0] shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {hz} Days
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePredict}
              disabled={isPredicting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0A2342] to-[#1565C0] hover:from-[#0D2F5A] hover:to-blue-600 text-white font-bold text-xs shadow-md shadow-blue-900/30 transition-all flex items-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              <Cpu className="w-4 h-4 text-[#00BCD4]" />
              <span>{isPredicting ? 'Executing LSTM-Transformer Inference...' : 'Predict Freight Rate'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Port Draft Constraint Warning (if selected vessel doesn't fit selected port) */}
      {forecastMetrics.draftViolated && (
        <div className="bg-rose-50 border-l-4 border-rose-600 p-4 rounded-xl flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-xs text-rose-900 space-y-1">
            <p className="font-bold">
              Port Constraint Warning: {selectedVessel.name} Exceeds Draft at {selectedDest.name}
            </p>
            <p>
              {selectedDest.name} permissible draft is <strong>{selectedDest.draft}m</strong>, but {selectedVessel.name} requires <strong>{selectedVessel.draftReq}m</strong>.
              Berthing directly laden will cause severe grounding risk. <em>Solution: Lighter at Sagar-Sandheads anchorage or switch vessel to Panamax/Supramax.</em>
            </p>
          </div>
        </div>
      )}

      {/* Results Section (Active when prediction triggered or loaded) */}
      {isPredicting ? (
        /* Loading Skeleton */
        <div className="bg-white rounded-2xl p-8 border border-slate-200 card-shadow text-center space-y-4 animate-pulse">
          <div className="w-12 h-12 rounded-full bg-cyan-100 mx-auto flex items-center justify-center text-[#00BCD4]">
            <RotateCcw className="w-6 h-6 animate-spin" />
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <div className="h-4 bg-slate-200 rounded w-3/4 mx-auto" />
            <div className="h-3 bg-slate-100 rounded w-1/2 mx-auto" />
          </div>
          <p className="text-xs text-slate-400">
            Running 11-year Baltic Historical Sequence • Evaluating Bunker VLSFO Curves • Port Congestion Weights...
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Key Output Metric Cards (3 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Card 1: Predicted Freight Rate */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 card-shadow relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#1565C0]" />
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Predicted Spot Freight Rate ({horizon}-Day Window)
              </span>
              <div className="flex items-baseline space-x-2 mt-2">
                <span className="text-3xl font-black text-[#0A2342] font-mono tracking-tight">
                  {formatRatePerTonne(forecastMetrics.predictedRate, currency)}
                </span>
                <span className="text-xs font-semibold text-emerald-600">
                  (-5.2% vs budget)
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Current Spot: <strong className="text-slate-800">{formatRatePerTonne(forecastMetrics.spotRate, currency)}</strong>. Rate projected to soften in next 12 days.
              </p>
            </div>

            {/* Card 2: Daily TCE */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 card-shadow relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#00BCD4]" />
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Estimated Time Charter Equivalent (TCE)
              </span>
              <div className="flex items-baseline space-x-2 mt-2">
                <span className="text-3xl font-black text-[#1565C0] font-mono tracking-tight">
                  ${forecastMetrics.tceDaily.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500">/ day</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Based on current fuel burn ({selectedVessel.fuelConsumptionSea}t/day) and ${582}/t VLSFO Singapore bunker price.
              </p>
            </div>

            {/* Card 3: Confidence & Recommendation */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 card-shadow relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#1E8449]" />
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                AI Confidence & Booking Signal
              </span>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-3xl font-black text-[#1E8449] font-mono">
                  {forecastMetrics.confidenceScore}%
                </span>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  High Confidence
                </span>
              </div>
              <div className="mt-2 text-xs font-bold text-[#0A2342] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Optimal Charter Window: 4-6 Days</span>
              </div>
            </div>

          </div>

          {/* Interactive Forecast Line Chart */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div>
                <h3 className="font-extrabold text-[#0A2342] text-base tracking-tight">
                  {horizon}-Day Dynamic Projection Curve: {selectedOrigin.name} ➔ {selectedDest.name}
                </h3>
                <p className="text-xs text-slate-500">
                  Ensemble Forecast with 95% Confidence Bounds vs Historical Pattern
                </p>
              </div>
              <div className="flex items-center space-x-3 text-xs">
                <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00BCD4]" /> PRAVAH Deep Learning
                </span>
                <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F57F17]" /> Old ARIMA Model
                </span>
              </div>
            </div>

            <div className="w-full h-80 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#94A3B8" 
                    fontSize={10} 
                    tickMargin={8} 
                    interval={Math.floor(chartData.length / 7)}
                  />
                  <YAxis 
                    stroke="#94A3B8" 
                    fontSize={10} 
                    domain={['auto', 'auto']}
                    tickFormatter={(v) => currency === 'USD' ? `$${v}` : `₹${Math.round(v * 86.5)}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />

                  {/* Confidence Interval Lines */}
                  <Line 
                    type="monotone" 
                    dataKey="confidenceUpper" 
                    stroke="#00BCD4" 
                    strokeDasharray="2 2" 
                    strokeOpacity={0.3} 
                    dot={false} 
                    name="95% Upper Bound"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="confidenceLower" 
                    stroke="#00BCD4" 
                    strokeDasharray="2 2" 
                    strokeOpacity={0.3} 
                    dot={false} 
                    name="95% Lower Bound"
                  />

                  {/* AI Predicted Line */}
                  <Line 
                    type="monotone" 
                    dataKey="predictedRate" 
                    stroke="#00BCD4" 
                    strokeWidth={3} 
                    dot={false} 
                    activeDot={{ r: 6 }} 
                    name="PRAVAH Forecast ($/t)"
                  />

                  {/* ARIMA Line */}
                  <Line 
                    type="monotone" 
                    dataKey="arimaRate" 
                    stroke="#F57F17" 
                    strokeWidth={1.8} 
                    strokeDasharray="4 4" 
                    dot={false} 
                    name="Old Baseline ARIMA"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Model Comparison Card: PRAVAH vs Old ARIMA */}
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-white space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
              <div>
                <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
                  Model Benchmark & Validation Audit
                </span>
                <h4 className="text-lg font-extrabold text-white mt-0.5">
                  PRAVAH Hybrid Ensemble vs Traditional Statistical ARIMA
                </h4>
              </div>
              <span className="text-xs bg-emerald-950 text-emerald-300 px-3 py-1 rounded-full border border-emerald-800 font-semibold">
                +33.7% Accuracy Superiority
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* PRAVAH Card */}
              <div className="bg-slate-800/80 rounded-xl p-4.5 border border-cyan-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-cyan-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                    PRAVAH Model (Proposed for SAIL)
                  </span>
                  <span className="text-xs font-mono font-bold bg-cyan-900/60 text-cyan-200 px-2 py-0.5 rounded">
                    LSTM + Transformer
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-700/60 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase">Accuracy</span>
                    <p className="text-lg font-black text-emerald-400 font-mono">96.1%</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase">RMSE</span>
                    <p className="text-lg font-black text-white font-mono">0.62</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase">MAPE</span>
                    <p className="text-lg font-black text-cyan-300 font-mono">4.1%</p>
                  </div>
                </div>

                <div className="text-xs text-slate-300 space-y-1">
                  <span className="font-bold text-white text-[11px] block">Key Multi-Variate Features:</span>
                  <ul className="space-y-1 text-[11px] text-slate-300">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Baltic Dry Index (BDI) and sub-indices momentum</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Singapore VLSFO bunker fuel prices and crude differentials</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Real-time East Coast port congestion AIS waiting days</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* ARIMA Card */}
              <div className="bg-slate-800/40 rounded-xl p-4.5 border border-slate-700/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-slate-300">
                    Old Baseline (ARIMA / SARIMA)
                  </span>
                  <span className="text-xs font-mono font-bold bg-slate-700 text-slate-300 px-2 py-0.5 rounded">
                    Legacy Static
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-700/60 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase">Accuracy</span>
                    <p className="text-lg font-black text-rose-400 font-mono">62.4%</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase">RMSE</span>
                    <p className="text-lg font-black text-slate-300 font-mono">2.85</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase">MAPE</span>
                    <p className="text-lg font-black text-amber-400 font-mono">18.7%</p>
                  </div>
                </div>

                <div className="text-xs text-slate-300 space-y-1">
                  <span className="font-bold text-slate-300 text-[11px] block">Baseline Shortcomings:</span>
                  <ul className="space-y-1 text-[11px] text-slate-400">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                      <span>Lagged response during market turnaround cycles</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                      <span>Cannot incorporate fuel price or port delay shocks</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                      <span>Causes significant charter overpayment during rate drops</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}
