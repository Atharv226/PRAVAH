import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Ship, 
  AlertTriangle, 
  DollarSign, 
  ArrowRight, 
  Calendar, 
  SlidersHorizontal,
  Compass,
  Anchor,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  RefreshCw,
  Info
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import StatCard from '../components/StatCard';
import { 
  GENERATE_FORECAST_DATA, 
  ROUTE_COMPARISONS, 
  REAL_TIME_ALERTS, 
  MODEL_ACCURACY_STATS 
} from '../data/mockData';
import { formatCurrency, formatRatePerTonne } from '../utils/formatters';

export default function DashboardView({ currency, onNavigate, onSelectRoute }) {
  const [selectedRouteKey, setSelectedRouteKey] = useState('aus-paradip');
  const [timeframe, setTimeframe] = useState('90d'); // '30d', '60d', '90d'
  const [showArima, setShowArima] = useState(true);
  const [showConfidence, setShowConfidence] = useState(true);

  // Route map options
  const routeOptions = [
    { key: 'aus-paradip', label: 'Australia → Paradip', origin: 'australia', dest: 'paradip', cargo: 'coking_coal', vessel: 'panamax' },
    { key: 'aus-vizag', label: 'Australia → Vizag', origin: 'australia', dest: 'vizag', cargo: 'coking_coal', vessel: 'capesize' },
    { key: 'usa-gangavaram', label: 'USA → Gangavaram', origin: 'usa', dest: 'gangavaram', cargo: 'coking_coal', vessel: 'panamax' },
    { key: 'indo-haldia', label: 'Indonesia → Haldia', origin: 'indonesia', dest: 'haldia', cargo: 'thermal_coal', vessel: 'handysize' },
    { key: 'moz-dhamra', label: 'Mozambique → Dhamra', origin: 'mozambique', dest: 'dhamra', cargo: 'coking_coal', vessel: 'supramax' },
  ];

  const currentRoute = routeOptions.find(r => r.key === selectedRouteKey) || routeOptions[0];

  // Generate chart data based on active route
  const rawChartData = useMemo(() => {
    return GENERATE_FORECAST_DATA(currentRoute.origin, currentRoute.dest, currentRoute.cargo, currentRoute.vessel);
  }, [currentRoute]);

  // Filter based on selected timeframe
  const chartData = useMemo(() => {
    if (timeframe === '30d') {
      return rawChartData.slice(15, 60);
    } else if (timeframe === '60d') {
      return rawChartData.slice(10, 75);
    }
    return rawChartData;
  }, [rawChartData, timeframe]);

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1.5 min-w-[200px]">
          <div className="flex items-center justify-between border-b border-slate-700 pb-1.5">
            <span className="font-bold text-cyan-300">{label}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
              dataPoint.isFuture ? 'bg-blue-900 text-blue-200' : 'bg-slate-700 text-slate-300'
            }`}>
              {dataPoint.isFuture ? 'AI 90-Day Forecast' : 'Historical Actual'}
            </span>
          </div>

          {dataPoint.actualRate !== null && (
            <div className="flex justify-between items-center text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Actual Spot Rate:
              </span>
              <span className="font-mono font-bold text-white">
                {formatRatePerTonne(dataPoint.actualRate, currency)}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00BCD4]" />
              PRAVAH AI Prediction:
            </span>
            <span className="font-mono font-bold text-[#00BCD4]">
              {formatRatePerTonne(dataPoint.predictedRate, currency)}
            </span>
          </div>

          {showArima && (
            <div className="flex justify-between items-center text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Old ARIMA Baseline:
              </span>
              <span className="font-mono text-amber-300">
                {formatRatePerTonne(dataPoint.arimaRate, currency)}
              </span>
            </div>
          )}

          {showConfidence && (
            <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800 flex justify-between">
              <span>95% Confidence Band:</span>
              <span className="font-mono">
                {formatRatePerTonne(dataPoint.confidenceLower, currency)} – {formatRatePerTonne(dataPoint.confidenceUpper, currency)}
              </span>
            </div>
          )}

          <div className="text-[10px] text-slate-400 flex justify-between">
            <span>BDI Index:</span>
            <span className="font-mono text-cyan-300">{dataPoint.bdi} pts</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Top Banner / Welcome context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-[#0A2342] tracking-tight">
              SAIL Bulk Freight Intelligence Command Center
            </h1>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
              Live Feed
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Predictive voyage modeling, vessel allocation, and charter timing for East Coast India discharge terminals
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => onNavigate('forecasting')}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#1565C0] to-[#0A2342] text-white text-xs font-bold hover:shadow-md transition flex items-center space-x-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00BCD4]" />
            <span>Launch Deep Route Predictor</span>
          </button>
          <button
            onClick={() => onNavigate('calculator')}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#1565C0] hover:border-[#1565C0] text-xs font-semibold shadow-xs transition flex items-center space-x-1.5 cursor-pointer"
          >
            <Ship className="w-3.5 h-3.5" />
            <span>Charter Calculator</span>
          </button>
        </div>
      </div>

      {/* 4 Top KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: BDI Index */}
        <StatCard
          title="Baltic Dry Index (BDI)"
          value="1,842 pts"
          subvalue="Baltic Exchange"
          trend="up"
          trendValue="+4.8%"
          trendLabel="vs 7d ago"
          accentColor="blue"
          icon={TrendingUp}
          badgeText="Capesize BCI: 2,610"
        />

        {/* Card 2: Average Freight Rate */}
        <StatCard
          title="Avg. Freight Rate (This Month)"
          value={currency === 'INR' ? '₹1,284 / MT' : '$14.85 / MT'}
          subvalue="Panamax ECI avg"
          trend="down"
          trendValue="-$1.60"
          trendLabel="vs budget baseline"
          accentColor="green"
          icon={Ship}
          badgeText="Softening cycle"
        />

        {/* Card 3: Active Alerts */}
        <StatCard
          title="Active Port & Market Alerts"
          value={`${REAL_TIME_ALERTS.length} Alerts`}
          subvalue="2 High Severity"
          trend="up"
          trendValue="Paradip Delay"
          trendLabel="4.2d berth wait"
          accentColor="orange"
          icon={AlertTriangle}
          badgeText="Action Recommended"
        />

        {/* Card 4: Potential Quarterly Savings */}
        <StatCard
          title="Potential Q3 Procurement Savings"
          value={currency === 'INR' ? '₹42.85 Crores' : '$4.95M USD'}
          subvalue="PRAVAH timing engine"
          trend="up"
          trendValue="11.4%"
          trendLabel="lower vs spot"
          accentColor="teal"
          icon={DollarSign}
          badgeText="Verified Model"
        />

      </div>

      {/* Main Grid: Forecast Chart (8 cols) + Real-Time Alerts Panel (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: 90-Day Freight Rate Forecast vs Actual Chart */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-4">
          
          {/* Chart Header & Route Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-[#0A2342] text-base tracking-tight">
                  90-Day Freight Rate Forecast vs Actuals
                </h3>
                <span className="text-[10px] bg-[#00BCD4]/10 text-cyan-800 font-bold px-2 py-0.5 rounded-full border border-[#00BCD4]/30">
                  LSTM + Transformer Engine
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Multi-variate projection against historical Baltic indices and old ARIMA benchmark
              </p>
            </div>

            {/* Timeframe selector */}
            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              {['30d', '60d', '90d'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2.5 py-1 rounded-lg transition uppercase cursor-pointer ${
                    timeframe === tf
                      ? 'bg-white text-[#1565C0] shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Route selector buttons */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
            {routeOptions.map((rt) => (
              <button
                key={rt.key}
                onClick={() => setSelectedRouteKey(rt.key)}
                className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-all cursor-pointer border ${
                  selectedRouteKey === rt.key
                    ? 'bg-[#0A2342] text-white border-[#0A2342] shadow-sm font-semibold'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {rt.label}
              </button>
            ))}
          </div>

          {/* Chart Layer Controls */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showArima}
                  onChange={(e) => setShowArima(e.target.checked)}
                  className="rounded border-slate-300 text-[#1565C0] focus:ring-[#1565C0]"
                />
                <span>Show Old ARIMA Baseline (62.4% Acc)</span>
              </label>
              <label className="flex items-center space-x-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showConfidence}
                  onChange={(e) => setShowConfidence(e.target.checked)}
                  className="rounded border-slate-300 text-[#00BCD4] focus:ring-[#00BCD4]"
                />
                <span>95% Confidence Interval</span>
              </label>
            </div>

            <span className="text-[11px] text-slate-400">
              Unit: {currency === 'USD' ? 'USD ($/MT)' : 'INR (₹/MT)'}
            </span>
          </div>

          {/* Recharts Canvas */}
          <div className="w-full h-80 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis 
                  dataKey="date" 
                  stroke="#94A3B8" 
                  fontSize={10} 
                  tickMargin={8} 
                  interval={Math.floor(chartData.length / 8)}
                />
                <YAxis 
                  stroke="#94A3B8" 
                  fontSize={10} 
                  domain={['auto', 'auto']}
                  tickFormatter={(val) => currency === 'USD' ? `$${val}` : `₹${Math.round(val * 86.5)}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                  iconSize={10}
                />

                {/* Confidence Interval Upper/Lower */}
                {showConfidence && (
                  <Line 
                    type="monotone" 
                    dataKey="confidenceUpper" 
                    stroke="#00BCD4" 
                    strokeDasharray="2 2" 
                    strokeOpacity={0.4} 
                    dot={false} 
                    name="95% Upper Bound"
                  />
                )}
                {showConfidence && (
                  <Line 
                    type="monotone" 
                    dataKey="confidenceLower" 
                    stroke="#00BCD4" 
                    strokeDasharray="2 2" 
                    strokeOpacity={0.4} 
                    dot={false} 
                    name="95% Lower Bound"
                  />
                )}

                {/* Actual Historical Spot */}
                <Line 
                  type="monotone" 
                  dataKey="actualRate" 
                  stroke="#1E8449" 
                  strokeWidth={2.8} 
                  dot={{ r: 2.5, fill: '#1E8449' }} 
                  activeDot={{ r: 5 }} 
                  name="Historical Actual Spot ($/t)"
                  connectNulls={false}
                />

                {/* PRAVAH AI Ensemble Forecast */}
                <Line 
                  type="monotone" 
                  dataKey="predictedRate" 
                  stroke="#00BCD4" 
                  strokeWidth={3} 
                  dot={false}
                  activeDot={{ r: 6, fill: '#00BCD4' }} 
                  name="PRAVAH AI Forecast (96.1% Acc)"
                />

                {/* Old Baseline ARIMA */}
                {showArima && (
                  <Line 
                    type="monotone" 
                    dataKey="arimaRate" 
                    stroke="#F57F17" 
                    strokeWidth={1.8} 
                    strokeDasharray="4 4" 
                    dot={false} 
                    name="Old Baseline ARIMA (62% Acc)"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Model Accuracy Footer Note */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-500 gap-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-[#00BCD4]" />
              <span>
                <strong>PRAVAH Outperformance:</strong> 96.1% directional accuracy with 0.62 RMSE vs ARIMA 2.85 RMSE
              </span>
            </div>
            <button
              onClick={() => onNavigate('forecasting')}
              className="text-[#1565C0] font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Explore Route Simulation</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

        </div>

        {/* Right: Live Real-Time Alerts Panel */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200 card-shadow flex flex-col justify-between space-y-4">
          
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="p-1 rounded-md bg-rose-50 text-rose-600">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-[#0A2342] text-sm tracking-tight">
                  Real-Time Market & Port Alerts
                </h3>
              </div>
              <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-bold">
                {REAL_TIME_ALERTS.length} Active
              </span>
            </div>

            {/* List of Alerts */}
            <div className="mt-3 space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {REAL_TIME_ALERTS.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3.5 rounded-xl border text-xs transition-all ${
                    alert.severity === 'High'
                      ? 'bg-rose-50/60 border-rose-200 hover:border-rose-300'
                      : alert.severity === 'Medium'
                        ? 'bg-amber-50/60 border-amber-200 hover:border-amber-300'
                        : 'bg-emerald-50/60 border-emerald-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded ${
                      alert.severity === 'High' ? 'bg-rose-200 text-rose-900' :
                      alert.severity === 'Medium' ? 'bg-amber-200 text-amber-900' :
                      'bg-emerald-200 text-emerald-900'
                    }`}>
                      {alert.severity} Risk
                    </span>
                    <span className="text-[10px] text-slate-400">{alert.timestamp}</span>
                  </div>

                  <h5 className="font-bold text-[#0A2342] text-xs mt-1">
                    {alert.title}
                  </h5>
                  <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                    {alert.description}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-[10.5px] font-bold text-[#1565C0]">
                      Action: {alert.actionType.toUpperCase()}
                    </span>
                    <button
                      onClick={() => onNavigate('alerts')}
                      className="text-[10.5px] font-semibold text-slate-700 hover:text-[#0A2342] hover:underline"
                    >
                      Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Demurrage Status Widget */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 mb-1">
              <span>Port Congestion Watch:</span>
              <span className="text-amber-600">Paradip 4.2d Wait</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Dhamra & Gangavaram remain clear with turnaround &lt;1.5 days. Recommend re-routing incoming Panamax vessels.
            </p>
          </div>

        </div>

      </div>

      {/* Bottom Section: Route Comparison & Procurement Recommendation Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <h3 className="font-extrabold text-[#0A2342] text-base tracking-tight flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#1565C0]" />
              Major SAIL Bulk Corridors & Immediate Charter Recommendations
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live directional signals generated by PRAVAH forecasting engine for the next 7-14 day chartering window
            </p>
          </div>

          <span className="text-xs text-slate-500">
            Click any row to test in <strong className="text-[#1565C0]">Route Predictor</strong>
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10.5px] border-b border-slate-200">
                <th className="py-3 px-3">Origin Port</th>
                <th className="py-3 px-3">Destination (ECI)</th>
                <th className="py-3 px-3">Cargo Class</th>
                <th className="py-3 px-3">Standard Vessel</th>
                <th className="py-3 px-3">Spot Rate</th>
                <th className="py-3 px-3">7-Day Predicted</th>
                <th className="py-3 px-3">Trend</th>
                <th className="py-3 px-3">Recommended Action</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ROUTE_COMPARISONS.map((route) => {
                const isDown = route.trend === 'down';
                const isUp = route.trend === 'up';

                return (
                  <tr 
                    key={route.id}
                    className="hover:bg-blue-50/50 transition-colors group cursor-pointer"
                    onClick={() => {
                      if (onSelectRoute) onSelectRoute(route);
                      onNavigate('forecasting');
                    }}
                  >
                    <td className="py-3.5 px-3 font-semibold text-[#0A2342]">
                      {route.origin}
                    </td>
                    <td className="py-3.5 px-3 font-bold text-[#1565C0]">
                      {route.dest}
                    </td>
                    <td className="py-3.5 px-3 text-slate-600">
                      {route.cargo}
                    </td>
                    <td className="py-3.5 px-3 text-slate-700">
                      {route.vessel}
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-900">
                      {formatRatePerTonne(route.currentRate, currency)}
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-[#00BCD4]">
                      {formatRatePerTonne(route.predicted7d, currency)}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded font-bold text-[11px] ${
                        isDown ? 'bg-emerald-100 text-emerald-800' :
                        isUp ? 'bg-rose-100 text-rose-800' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {isDown && <TrendingDown className="w-3 h-3 mr-0.5" />}
                        {isUp && <TrendingUp className="w-3 h-3 mr-0.5" />}
                        <span>{route.changePercent > 0 ? `+${route.changePercent}%` : `${route.changePercent}%`}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${
                        route.recommendation.includes('BOOK NOW')
                          ? 'bg-emerald-500 text-white shadow-xs'
                          : route.recommendation.includes('WAIT')
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-blue-100 text-blue-900 border border-blue-300'
                      }`}>
                        {route.recommendation}
                      </span>
                      <p className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[220px]">
                        {route.recommendationNote}
                      </p>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button 
                        className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-[#1565C0] group-hover:text-white text-slate-600 transition"
                        title="Simulate Route"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
