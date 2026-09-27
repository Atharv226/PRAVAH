import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LandingLoginView from './views/LandingLoginView';
import DashboardView from './views/DashboardView';
import RouteForecastingView from './views/RouteForecastingView';
import VesselOptimizerView from './views/VesselOptimizerView';
import CharterCalculatorView from './views/CharterCalculatorView';
import AlertsRiskView from './views/AlertsRiskView';
import HistoricalReportsView from './views/HistoricalReportsView';
import SettingsProfileView from './views/SettingsProfileView';

export default function App() {
  // Authentication & session state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: 'Dr. A. K. Sharma',
    empId: 'SAIL-PROC-8842',
    role: 'Chief General Manager (Chartering & Materials)',
    plant: 'Central Materials Management Division, New Delhi',
    accessLevel: 'Enterprise Tier-1 (Charter Party Authorized)'
  });

  // Navigation tab state
  const [activeTab, setActiveTab] = useState('dashboard');

  // Global currency state: 'INR' (₹) or 'USD' ($)
  const [currency, setCurrency] = useState('INR');

  // Pre-selected route data passed when navigating from Dashboard to Route Forecasting
  const [selectedRouteForForecasting, setSelectedRouteForForecasting] = useState(null);

  // Currency toggle handler
  const handleToggleCurrency = () => {
    setCurrency(prev => prev === 'USD' ? 'INR' : 'USD');
  };

  // Login handler
  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // If not logged in, render the Landing / Login Page
  if (!isLoggedIn) {
    return (
      <LandingLoginView onLoginSuccess={handleLoginSuccess} />
    );
  }

  // Render main application workspace
  return (
    <div className="min-h-screen bg-[#F5F7FA] text-slate-800 flex flex-col font-sans selection:bg-[#00BCD4] selection:text-white">
      {/* Top Enterprise Navigation Bar */}
      <Navbar
        currency={currency}
        onToggleCurrency={handleToggleCurrency}
        user={currentUser}
        onLogout={handleLogout}
        onNavigate={(tab) => {
          if (tab === 'landing') {
            setIsLoggedIn(false);
          } else {
            setActiveTab(tab);
          }
        }}
      />

      {/* Main Workspace with Persistent Left Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Persistent Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
        />

        {/* Dynamic View Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#F5F7FA] pb-12">
          {activeTab === 'dashboard' && (
            <DashboardView
              currency={currency}
              onNavigate={setActiveTab}
              onSelectRoute={(route) => {
                setSelectedRouteForForecasting(route);
                setActiveTab('forecasting');
              }}
            />
          )}

          {activeTab === 'forecasting' && (
            <RouteForecastingView
              currency={currency}
              initialRoute={selectedRouteForForecasting}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'optimizer' && (
            <VesselOptimizerView
              currency={currency}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'calculator' && (
            <CharterCalculatorView
              currency={currency}
            />
          )}

          {activeTab === 'alerts' && (
            <AlertsRiskView
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'reports' && (
            <HistoricalReportsView
              currency={currency}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsProfileView
              user={currentUser}
            />
          )}
        </main>
      </div>

      {/* Bottom Floating Bar to return to Landing Page for presentation demoing */}
      <div className="fixed bottom-3 right-4 z-40">
        <button
          onClick={() => setIsLoggedIn(false)}
          className="bg-[#0A2342]/90 hover:bg-[#0A2342] text-white text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-lg border border-cyan-800/80 backdrop-blur-md transition flex items-center space-x-1.5 cursor-pointer hover:border-cyan-400"
          title="Return to Landing & Login Page"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Demo: View Landing Page</span>
        </button>
      </div>
    </div>
  );
}
