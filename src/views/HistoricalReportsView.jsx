import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  Filter, 
  Search, 
  TrendingUp, 
  Ship, 
  Anchor, 
  Calendar, 
  CheckCircle2, 
  DollarSign, 
  ArrowUpDown,
  Sparkles
} from 'lucide-react';
import StatCard from '../components/StatCard';
import ExecutiveReportModal from '../components/ExecutiveReportModal';
import { HISTORICAL_VOYAGES, VESSEL_CLASSES, PORTS_ECI } from '../data/mockData';
import { formatCurrency, formatRatePerTonne } from '../utils/formatters';

export default function HistoricalReportsView({ currency }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [vesselFilter, setVesselFilter] = useState('all');
  const [destinationFilter, setDestinationFilter] = useState('all');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Filtered dataset
  const filteredVoyages = useMemo(() => {
    return HISTORICAL_VOYAGES.filter((v) => {
      const matchesSearch = 
        v.voyageId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.vesselName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.cargo.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesVessel = vesselFilter === 'all' || v.vesselClass.toLowerCase() === vesselFilter.toLowerCase();
      const matchesDest = destinationFilter === 'all' || v.destination.toLowerCase().includes(destinationFilter.toLowerCase());

      return matchesSearch && matchesVessel && matchesDest;
    });
  }, [searchTerm, vesselFilter, destinationFilter]);

  // Working CSV download generator
  const handleExportCSV = () => {
    const headers = ['Voyage ID', 'Date', 'Vessel Name', 'Class', 'Origin', 'Destination', 'Cargo', 'Quantity (MT)', 'Freight Rate ($/t)', 'TCE ($/day)', 'BDI', 'Charter Mode', 'Savings (INR)'];
    const rows = filteredVoyages.map(v => [
      v.voyageId,
      v.date,
      `"${v.vesselName}"`,
      v.vesselClass,
      `"${v.origin}"`,
      `"${v.destination}"`,
      `"${v.cargo}"`,
      v.cargoQuantity,
      v.freightRateUsd,
      v.tceUsd,
      v.bdi,
      `"${v.charterType}"`,
      `"${v.actualSavingsInr}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PRAVAH_SAIL_Voyage_Audit_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-2 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-[#0A2342] tracking-tight">
              Historical Voyages & Procurement Audit Reports
            </h1>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
              Audited Records
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Complete fixture registry of bulk raw material imports for SAIL plants with verified model performance and savings
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:border-[#1565C0] text-slate-700 hover:text-[#1565C0] text-xs font-bold transition flex items-center space-x-1.5 shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#1565C0]" />
            <span>Export to CSV</span>
          </button>

          <button
            onClick={() => setIsReportModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0A2342] to-[#1565C0] text-white text-xs font-bold hover:shadow-md transition flex items-center space-x-1.5 shadow-xs cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#00BCD4]" />
            <span>Executive Briefing (PDF)</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Voyages Tracked"
          value="384 Fixtures"
          subvalue="2024-2026"
          trend="up"
          trendValue="14.2M MT"
          trendLabel="Total bulk cargo"
          accentColor="blue"
          icon={Ship}
          badgeText="100% In-spec"
        />

        <StatCard
          title="Cumulative Procurement Savings"
          value={currency === 'INR' ? '₹186.4 Crores' : '$21.5M USD'}
          subvalue="vs spot benchmark"
          trend="up"
          trendValue="+11.4%"
          trendLabel="cost margin"
          accentColor="green"
          icon={DollarSign}
          badgeText="Verified Audit"
        />

        <StatCard
          title="Most Utilized Corridor"
          value="Australia ➔ Paradip"
          subvalue="38% of total volume"
          trend="neutral"
          trendValue="Panamax Class"
          trendLabel="Primary workhorse"
          accentColor="teal"
          icon={Anchor}
          badgeText="Hay Point"
        />

        <StatCard
          title="Historical Accuracy"
          value="96.1% Rate"
          subvalue="LSTM-Transformer"
          trend="up"
          trendValue="0.62 RMSE"
          trendLabel="vs ARIMA 2.85"
          accentColor="orange"
          icon={Sparkles}
          badgeText="MeghRaj Verified"
        />
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 card-shadow space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search voyage ID, vessel, cargo..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1565C0]"
            />
          </div>

          {/* Vessel Class Filter */}
          <select
            value={vesselFilter}
            onChange={(e) => setVesselFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1565C0] cursor-pointer"
          >
            <option value="all">All Vessel Classes</option>
            <option value="handysize">Handysize</option>
            <option value="supramax">Supramax</option>
            <option value="panamax">Panamax</option>
            <option value="capesize">Capesize</option>
          </select>

          {/* Destination Port Filter */}
          <select
            value={destinationFilter}
            onChange={(e) => setDestinationFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1565C0] cursor-pointer"
          >
            <option value="all">All Destination Ports</option>
            {PORTS_ECI.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setSearchTerm('');
              setVesselFilter('all');
              setDestinationFilter('all');
            }}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            Reset Filters
          </button>

        </div>
      </div>

      {/* Main Historical Records Table */}
      <div className="bg-white rounded-2xl border border-slate-200 card-shadow overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <span className="font-extrabold text-[#0A2342] text-sm">
            Audited Voyage Log ({filteredVoyages.length} Records)
          </span>
          <span className="text-xs text-slate-400">
            Source: SAIL Materials ERP + Baltic Fixtures
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0A2342] text-white text-[10.5px]">
              <tr>
                <th className="py-3 px-3.5">Voyage ID</th>
                <th className="py-3 px-3.5">Date</th>
                <th className="py-3 px-3.5">Vessel Name</th>
                <th className="py-3 px-3.5">Class</th>
                <th className="py-3 px-3.5">Origin Port</th>
                <th className="py-3 px-3.5">Destination Port</th>
                <th className="py-3 px-3.5">Cargo & MT</th>
                <th className="py-3 px-3.5">Freight Rate</th>
                <th className="py-3 px-3.5">Daily TCE</th>
                <th className="py-3 px-3.5">BDI</th>
                <th className="py-3 px-3.5">Charter Mode</th>
                <th className="py-3 px-3.5 text-right">Realized Savings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVoyages.map((voyage) => (
                <tr key={voyage.voyageId} className="hover:bg-blue-50/40 transition-colors">
                  <td className="py-3 px-3.5 font-mono font-bold text-[#1565C0]">
                    {voyage.voyageId}
                  </td>
                  <td className="py-3 px-3.5 text-slate-500 font-medium">
                    {voyage.date}
                  </td>
                  <td className="py-3 px-3.5 font-bold text-slate-800">
                    {voyage.vesselName}
                  </td>
                  <td className="py-3 px-3.5">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold text-[10.5px]">
                      {voyage.vesselClass}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 text-slate-600">
                    {voyage.origin}
                  </td>
                  <td className="py-3 px-3.5 font-semibold text-[#0A2342]">
                    {voyage.destination}
                  </td>
                  <td className="py-3 px-3.5">
                    <span className="font-semibold text-slate-800 block">{voyage.cargo}</span>
                    <span className="text-[10.5px] text-slate-400 font-mono">{(voyage.cargoQuantity / 1000)}k MT</span>
                  </td>
                  <td className="py-3 px-3.5 font-mono font-bold text-slate-900">
                    {formatRatePerTonne(voyage.freightRateUsd, currency)}
                  </td>
                  <td className="py-3 px-3.5 font-mono text-emerald-700 font-bold">
                    ${voyage.tceUsd.toLocaleString()}
                  </td>
                  <td className="py-3 px-3.5 font-mono text-slate-600">
                    {voyage.bdi}
                  </td>
                  <td className="py-3 px-3.5 text-slate-600">
                    {voyage.charterType}
                  </td>
                  <td className="py-3 px-3.5 text-right font-mono font-black text-emerald-700">
                    {voyage.actualSavingsInr}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Executive Report Printable Modal */}
      <ExecutiveReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        currency={currency}
        historicalVoyages={HISTORICAL_VOYAGES}
      />

    </div>
  );
}
