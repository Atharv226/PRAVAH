import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Ship, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  HelpCircle,
  BarChart3,
  Sliders,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { ORIGIN_COUNTRIES, PORTS_ECI, VESSEL_CLASSES } from '../data/mockData';
import { formatCurrency, formatRatePerTonne } from '../utils/formatters';

export default function CharterCalculatorView({ currency }) {
  // Configurable inputs
  const [numVoyages, setNumVoyages] = useState(8);
  const [cargoPerVoyage, setCargoPerVoyage] = useState(75000); // MT (Panamax)
  const [contractDurationMonths, setContractDurationMonths] = useState(6);
  const [routeId, setRouteId] = useState('aus-paradip');
  const [vesselClassId, setVesselClassId] = useState('panamax');
  const [marketVolatility, setMarketVolatility] = useState('rising'); // 'rising', 'stable', 'falling'

  const selectedVessel = VESSEL_CLASSES.find(v => v.id === vesselClassId) || VESSEL_CLASSES[2];

  // Calculations for Voyage Charter (Spot fixtures) vs Time Charter (Period fixtures)
  const calculations = useMemo(() => {
    const totalCargo = numVoyages * cargoPerVoyage;
    
    // Baseline Spot Freight Rate ($/MT)
    let spotRate = 14.80;
    if (vesselClassId === 'capesize') spotRate = 12.10;
    if (vesselClassId === 'supramax') spotRate = 16.20;
    if (vesselClassId === 'handysize') spotRate = 18.50;

    // In a rising market cycle, spot rates average higher over 6-12 months
    const volatilityFactor = marketVolatility === 'rising' ? 1.09 : marketVolatility === 'falling' ? 0.92 : 1.0;
    const effectiveSpotRate = +(spotRate * volatilityFactor).toFixed(2);

    // 1. Voyage Charter Costs:
    // Base freight covers vessel hire, bunker, port dues directly quoted by shipowner
    const voyageBaseFreight = totalCargo * effectiveSpotRate;
    // Voyage charter demurrage risk (waiting at Paradip/Haldia ports, ~$25k/day x 2 days avg)
    const voyageDemurrageRisk = numVoyages * (2.4 * 26000);
    // Bunker Adjustment Factor (BAF buffer)
    const voyageBafBuffer = totalCargo * 0.45;
    const totalVoyageCharterCost = voyageBaseFreight + voyageDemurrageRisk + voyageBafBuffer;

    // 2. Time Charter Costs:
    // Charterer pays daily hire rate + bunker fuel + port charges
    const dailyHire = selectedVessel.dailyHireRate; // e.g. $17,200/day
    const voyageDaysPerRoundTrip = 28; // roundtrip transit + loading/discharge
    const totalCharterDays = Math.max(numVoyages * voyageDaysPerRoundTrip, contractDurationMonths * 30.5);
    const tcHireCost = totalCharterDays * dailyHire;
    
    // Bunker fuel consumption (steaming at sea + idle in port)
    const seaDays = numVoyages * 20;
    const portDays = numVoyages * 8;
    const bunkerBurnTons = (seaDays * selectedVessel.fuelConsumptionSea) + (portDays * 3.5);
    const vlsfoPricePerTon = 582; // Singapore price
    const tcBunkerCost = bunkerBurnTons * vlsfoPricePerTon;

    // Port dues & canal tolls paid directly by charterer
    const tcPortDues = numVoyages * 75000;
    // Demurrage risk in Time charter is absorbed via ongoing daily hire
    const totalTimeCharterCost = tcHireCost + tcBunkerCost + tcPortDues;

    // Cost Difference and Recommended Option
    const savingsUsd = totalVoyageCharterCost - totalTimeCharterCost;
    const isTimeCharterBetter = savingsUsd > 0;
    const recommended = isTimeCharterBetter ? 'Time Charter (Period Contract)' : 'Voyage Charter (Spot Market)';
    const absoluteSavingsUsd = Math.abs(savingsUsd);
    const savingsPercentage = Math.abs((absoluteSavingsUsd / (isTimeCharterBetter ? totalVoyageCharterCost : totalTimeCharterCost)) * 100).toFixed(1);

    return {
      totalCargo,
      totalVoyageCharterCost,
      voyageBaseFreight,
      voyageDemurrageRisk,
      voyageBafBuffer,
      effectiveSpotRate,
      totalTimeCharterCost,
      tcHireCost,
      tcBunkerCost,
      tcPortDues,
      savingsUsd,
      isTimeCharterBetter,
      recommended,
      absoluteSavingsUsd,
      savingsPercentage,
      totalCharterDays
    };
  }, [numVoyages, cargoPerVoyage, contractDurationMonths, vesselClassId, marketVolatility, selectedVessel]);

  // Bar Chart Data for Comparison
  const chartData = [
    {
      category: 'Base Hire / Freight',
      'Voyage Charter (Spot)': Math.round(calculations.voyageBaseFreight),
      'Time Charter (Period)': Math.round(calculations.tcHireCost),
    },
    {
      category: 'Bunker Fuel (VLSFO)',
      'Voyage Charter (Spot)': Math.round(calculations.voyageBafBuffer),
      'Time Charter (Period)': Math.round(calculations.tcBunkerCost),
    },
    {
      category: 'Port Dues & Demurrage',
      'Voyage Charter (Spot)': Math.round(calculations.voyageDemurrageRisk),
      'Time Charter (Period)': Math.round(calculations.tcPortDues),
    },
    {
      category: 'Total Outlay',
      'Voyage Charter (Spot)': Math.round(calculations.totalVoyageCharterCost),
      'Time Charter (Period)': Math.round(calculations.totalTimeCharterCost),
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-2 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-[#0A2342] tracking-tight">
              Charter Calculator: Voyage Charter vs Time Charter
            </h1>
            <span className="text-xs bg-[#1E8449] text-white font-bold px-2 py-0.5 rounded-full">
              Period Procurement Optimizer
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Evaluate one-time voyage spot fixtures against multi-month bulk period contracts with automated fuel and demurrage modeling
          </p>
        </div>

        {/* Highlighted Recommendation Badge */}
        <div className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-4 py-2 rounded-xl shadow-md text-xs">
          <Sparkles className="w-4 h-4 text-cyan-200" />
          <div>
            <span className="text-[10px] text-emerald-100 uppercase tracking-wider block font-bold">
              AI Recommendation
            </span>
            <span className="font-extrabold text-sm">
              {calculations.recommended}
            </span>
          </div>
          <span className="ml-2 font-mono font-bold bg-white text-emerald-800 px-2 py-0.5 rounded text-xs">
            Save {formatCurrency(calculations.absoluteSavingsUsd, currency)}
          </span>
        </div>
      </div>

      {/* Input Parameters Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="font-extrabold text-[#0A2342] text-sm flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#1565C0]" />
            Chartering Contract Inputs
          </span>
          <span className="text-xs text-slate-500">
            Total Cargo Needed: <strong className="text-[#0A2342] font-mono">{calculations.totalCargo.toLocaleString()} MT</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Number of Voyages */}
          <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Consecutive Voyages
              </label>
              <span className="font-mono font-extrabold text-base text-[#1565C0]">
                {numVoyages} Voyages
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="18"
              value={numVoyages}
              onChange={(e) => setNumVoyages(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1565C0]"
            />
            <span className="text-[10.5px] text-slate-400 block">
              1 to 18 bulk shipments
            </span>
          </div>

          {/* Cargo Parcel Size */}
          <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Parcel Size / Voyage
              </label>
              <span className="font-mono font-extrabold text-base text-[#1565C0]">
                {(cargoPerVoyage / 1000)}k MT
              </span>
            </div>
            <input
              type="range"
              min="35000"
              max="160000"
              step="5000"
              value={cargoPerVoyage}
              onChange={(e) => setCargoPerVoyage(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1565C0]"
            />
            <span className="text-[10.5px] text-slate-400 block">
              35k MT (Handy) to 160k MT (Cape)
            </span>
          </div>

          {/* Time Charter Duration */}
          <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Contract Period Duration
            </label>
            <select
              value={contractDurationMonths}
              onChange={(e) => setContractDurationMonths(Number(e.target.value))}
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1565C0]"
            >
              <option value="3">3 Months (Short Period)</option>
              <option value="6">6 Months (Standard SAIL Window)</option>
              <option value="9">9 Months (3 Quarters)</option>
              <option value="12">12 Months (Annual Contract of Affreightment)</option>
            </select>
            <span className="text-[10.5px] text-slate-400 block">
              Approx. {calculations.totalCharterDays} operational days
            </span>
          </div>

          {/* Market Cycle Expectation */}
          <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Market Rate Cycle Outlook
            </label>
            <select
              value={marketVolatility}
              onChange={(e) => setMarketVolatility(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1565C0]"
            >
              <option value="rising">Rising Freight Trend (+9% surge)</option>
              <option value="stable">Stable / Sideways Market</option>
              <option value="falling">Softening / Falling Freight (-8%)</option>
            </select>
            <span className="text-[10.5px] text-slate-400 block">
              PRAVAH forecast: <strong className="text-emerald-700">Rates bottoming</strong>
            </span>
          </div>

        </div>
      </div>

      {/* Two-Column Side-by-Side Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Column 1: Voyage Charter (Spot Market) */}
        <div className={`bg-white rounded-2xl p-6 border card-shadow relative overflow-hidden transition-all ${
          !calculations.isTimeCharterBetter
            ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-lg'
            : 'border-slate-200'
        }`}>
          {/* Top header badge */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10.5px] uppercase font-bold text-slate-400 tracking-wider">
                Option A: Single Voyage Fixtures
              </span>
              <h3 className="text-xl font-extrabold text-[#0A2342] mt-0.5">
                Spot Voyage Charter
              </h3>
            </div>
            {!calculations.isTimeCharterBetter && (
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Recommended
              </span>
            )}
          </div>

          {/* Pricing Highlight */}
          <div className="my-5 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 block">Total Estimated Expenditure</span>
            <div className="text-3xl font-black text-[#0A2342] font-mono mt-1">
              {formatCurrency(calculations.totalVoyageCharterCost, currency)}
            </div>
            <span className="text-xs text-slate-500 mt-1 block">
              Average Freight: <strong className="text-slate-800 font-mono">{formatRatePerTonne(calculations.effectiveSpotRate, currency)}</strong>
            </span>
          </div>

          {/* Component Breakdown List */}
          <div className="space-y-3 text-xs">
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
              Cost Item Breakdown:
            </span>

            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-600">Base Freight ({calculations.totalCargo.toLocaleString()} MT @ {formatRatePerTonne(calculations.effectiveSpotRate, currency)})</span>
              <span className="font-mono font-bold text-slate-900">
                {formatCurrency(calculations.voyageBaseFreight, currency)}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-600">Demurrage Risk Exposure (Avg 2.4d port wait)</span>
              <span className="font-mono font-bold text-amber-700">
                {formatCurrency(calculations.voyageDemurrageRisk, currency)}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-600">Bunker Adjustment Factor (BAF) Risk Reserve</span>
              <span className="font-mono font-bold text-slate-700">
                {formatCurrency(calculations.voyageBafBuffer, currency)}
              </span>
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="mt-5 pt-4 border-t border-slate-100 text-xs space-y-1.5 text-slate-600">
            <div className="flex items-center gap-1.5 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>High flexibility; no idle hire commitment if steel production drops</span>
            </div>
            <div className="flex items-center gap-1.5 text-rose-700">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Exposed to acute freight price surges during sudden vessel crunches</span>
            </div>
          </div>

        </div>

        {/* Column 2: Time Charter (Period Contract) */}
        <div className={`bg-white rounded-2xl p-6 border card-shadow relative overflow-hidden transition-all ${
          calculations.isTimeCharterBetter
            ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-lg'
            : 'border-slate-200'
        }`}>
          {/* Top header badge */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10.5px] uppercase font-bold text-slate-400 tracking-wider">
                Option B: Multi-Month Contract of Affreightment
              </span>
              <h3 className="text-xl font-extrabold text-[#0A2342] mt-0.5">
                Time Charter (Period Contract)
              </h3>
            </div>
            {calculations.isTimeCharterBetter && (
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Recommended
              </span>
            )}
          </div>

          {/* Pricing Highlight */}
          <div className="my-5 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 block">Total Estimated Expenditure</span>
            <div className="text-3xl font-black text-emerald-700 font-mono mt-1">
              {formatCurrency(calculations.totalTimeCharterCost, currency)}
            </div>
            <span className="text-xs text-slate-500 mt-1 block">
              Equivalent Rate: <strong className="text-emerald-700 font-mono">{formatRatePerTonne(+(calculations.totalTimeCharterCost / calculations.totalCargo).toFixed(2), currency)}</strong>
            </span>
          </div>

          {/* Component Breakdown List */}
          <div className="space-y-3 text-xs">
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
              Cost Item Breakdown:
            </span>

            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-600">Vessel Hire ({calculations.totalCharterDays} days @ ${selectedVessel.dailyHireRate.toLocaleString()}/d)</span>
              <span className="font-mono font-bold text-slate-900">
                {formatCurrency(calculations.tcHireCost, currency)}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-600">Bunker Fuel Expense (Direct VLSFO Purchase)</span>
              <span className="font-mono font-bold text-slate-800">
                {formatCurrency(calculations.tcBunkerCost, currency)}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-600">Port Dues, Tugs & Pilotage (Direct Payment)</span>
              <span className="font-mono font-bold text-slate-800">
                {formatCurrency(calculations.tcPortDues, currency)}
              </span>
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="mt-5 pt-4 border-t border-slate-100 text-xs space-y-1.5 text-slate-600">
            <div className="flex items-center gap-1.5 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Full rate lock-in protects SAIL budget against projected Pacific freight spike</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-700">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Charterer carries bunker fuel and port idle time operational risk</span>
            </div>
          </div>

        </div>

      </div>

      {/* Strategic Decision & Savings Highlight Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0A2342] via-[#0D2F5A] to-[#1565C0] text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl border border-cyan-800">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-[#00BCD4] text-slate-950 font-extrabold px-2.5 py-0.5 rounded-full uppercase">
              Procurement Strategy Decision
            </span>
            <span className="text-cyan-300 text-xs font-semibold">
              PRAVAH Optimization Result
            </span>
          </div>

          <h3 className="text-2xl font-black tracking-tight">
            {calculations.isTimeCharterBetter 
              ? `Opt for ${contractDurationMonths}-Month Time Charter to save ${formatCurrency(calculations.absoluteSavingsUsd, currency)}`
              : `Opt for Spot Voyage Fixtures to save ${formatCurrency(calculations.absoluteSavingsUsd, currency)}`}
          </h3>

          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Due to forecasted vessel tightening across the Australia and Indonesia corridors over the next 90 days, 
            locking in a fixed daily hire delivers an estimated <strong>{calculations.savingsPercentage}% overall freight cost reduction</strong> for SAIL’s steel plant blast furnaces.
          </p>
        </div>

        <div className="shrink-0 text-right bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15">
          <span className="text-[11px] text-cyan-200 uppercase font-semibold block">Total Estimated Savings</span>
          <span className="text-3xl font-black text-white font-mono">
            {formatCurrency(calculations.absoluteSavingsUsd, currency)}
          </span>
          <span className="text-xs text-emerald-300 block mt-0.5 font-bold">
            {calculations.savingsPercentage}% Cost Reduction
          </span>
        </div>
      </div>

      {/* Comparative Bar Chart Breakdown */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-[#0A2342] text-base tracking-tight flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#1565C0]" />
              Comparative Cost Breakdown: Voyage vs Time Charter
            </h3>
            <p className="text-xs text-slate-500">
              Visualizes total base freight, bunker expenditure, port dues, and overall outlay in {currency}
            </p>
          </div>
          <span className="text-xs text-slate-400">Values in {currency === 'USD' ? 'USD ($)' : 'INR (₹)'}</span>
        </div>

        <div className="w-full h-72 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="category" stroke="#94A3B8" fontSize={11} />
              <YAxis 
                stroke="#94A3B8" 
                fontSize={10} 
                tickFormatter={(v) => formatCurrency(v, currency, 1)}
              />
              <Tooltip 
                formatter={(val) => [formatCurrency(val, currency), 'Cost']}
                contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '12px', border: '1px solid #334155', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Bar dataKey="Voyage Charter (Spot)" fill="#F57F17" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Time Charter (Period)" fill="#1565C0" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
