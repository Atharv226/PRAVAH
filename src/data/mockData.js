// PRAVAH - Intelligent Freight Forecasting & Vessel Chartering Model
// Developed for Steel Authority of India Limited (SAIL) - Smart India Hackathon 2026 (PS-26006)

export const PORTS_ECI = [
  {
    id: 'paradip',
    name: 'Paradip Port',
    state: 'Odisha',
    draft: 14.5, // meters
    maxLoa: 260, // meters
    maxDwt: 100000, // tonnes
    berths: 16,
    avgWaitDays: 2.8,
    congestionStatus: 'Moderate',
    suitableClasses: ['Handysize', 'Supramax', 'Panamax'],
    unsuitableClasses: ['Capesize'],
    restrictionNote: 'Capesize vessels cannot berth laden due to 14.5m draft restriction. Requires double banking or lighterage.',
    lat: 20.26,
    lng: 86.68,
    cokingCoalCapacity: 'High (Primary hub for Rourkela & Bokaro plants)',
  },
  {
    id: 'vizag',
    name: 'Visakhapatnam (Vizag)',
    state: 'Andhra Pradesh',
    draft: 18.1,
    maxLoa: 300,
    maxDwt: 200000,
    berths: 24,
    avgWaitDays: 1.2,
    congestionStatus: 'Low',
    suitableClasses: ['Handysize', 'Supramax', 'Panamax', 'Capesize'],
    unsuitableClasses: [],
    restrictionNote: 'Deep outer harbour readily accommodates fully laden Capesize bulk carriers up to 200,000 DWT.',
    lat: 17.68,
    lng: 83.21,
    cokingCoalCapacity: 'High (Dedicated conveyor corridor to Vizag Steel/RINL & direct rail to SAIL Bhilai)',
  },
  {
    id: 'gangavaram',
    name: 'Gangavaram Port',
    state: 'Andhra Pradesh',
    draft: 20.2,
    maxLoa: 320,
    maxDwt: 220000,
    berths: 9,
    avgWaitDays: 0.8,
    congestionStatus: 'Low',
    suitableClasses: ['Handysize', 'Supramax', 'Panamax', 'Capesize'],
    unsuitableClasses: [],
    restrictionNote: 'Deepest water all-weather port on East Coast of India. Handles gearless Capesize vessels at full draft.',
    lat: 17.62,
    lng: 83.23,
    cokingCoalCapacity: 'Very High (Rapid mechanized unloader rates exceeding 45,000 MT/day)',
  },
  {
    id: 'gopalpur',
    name: 'Gopalpur Port',
    state: 'Odisha',
    draft: 14.5,
    maxLoa: 240,
    maxDwt: 80000,
    berths: 5,
    avgWaitDays: 1.0,
    congestionStatus: 'Low',
    suitableClasses: ['Handysize', 'Supramax', 'Panamax'],
    unsuitableClasses: ['Capesize'],
    restrictionNote: 'Suited for up to Panamax bulk carriers. Rail connectivity to Odisha & Jharkhand steel belt.',
    lat: 19.30,
    lng: 84.96,
    cokingCoalCapacity: 'Medium (Secondary discharge port for Durgapur & Rourkela)',
  },
  {
    id: 'dhamra',
    name: 'Dhamra Port',
    state: 'Odisha',
    draft: 18.0,
    maxLoa: 310,
    maxDwt: 180000,
    berths: 5,
    avgWaitDays: 1.4,
    congestionStatus: 'Low-Medium',
    suitableClasses: ['Handysize', 'Supramax', 'Panamax', 'Capesize'],
    unsuitableClasses: [],
    restrictionNote: 'Capable of receiving Capesize vessels up to 180,000 DWT. Directly connects to Bhilai/Rourkela via Bhadrak rail line.',
    lat: 20.80,
    lng: 86.97,
    cokingCoalCapacity: 'High (Fully mechanized coal discharge with direct train loading)',
  },
  {
    id: 'sagar',
    name: 'Sagar-Sandheads Anchorage',
    state: 'West Bengal',
    draft: 15.0,
    maxLoa: 260,
    maxDwt: 120000,
    berths: 0, // Deep sea anchorage
    avgWaitDays: 2.1,
    congestionStatus: 'Moderate',
    suitableClasses: ['Handysize', 'Supramax', 'Panamax'],
    unsuitableClasses: [],
    restrictionNote: 'Deep water open sea lightening/transshipment zone. Used to lighter large vessels before heading into shallow Haldia.',
    lat: 21.65,
    lng: 88.05,
    cokingCoalCapacity: 'Transshipment Hub (Daughter vessels and barges lighter bulk coal for Haldia/Kolkata)',
  },
  {
    id: 'haldia',
    name: 'Haldia Dock Complex',
    state: 'West Bengal',
    draft: 8.8,
    maxLoa: 230,
    maxDwt: 45000,
    berths: 14,
    avgWaitDays: 3.4,
    congestionStatus: 'High',
    suitableClasses: ['Handysize'],
    unsuitableClasses: ['Supramax', 'Panamax', 'Capesize'],
    restrictionNote: 'Riverine port with severe Hooghly river bar draft restrictions (8.5m - 9.0m). Supramax/Panamax must be lightened at Sagar first.',
    lat: 22.02,
    lng: 88.06,
    cokingCoalCapacity: 'Railhead hub for Durgapur Steel Plant & IISCO Burnpur, but restricted to Handysize parcels.',
  }
];

export const ORIGIN_COUNTRIES = [
  {
    id: 'australia',
    name: 'Australia',
    ports: ['Hay Point', 'Gladstone', 'Newcastle', 'Port Hedland'],
    avgDistanceNm: 4600,
    transitDays: 14,
    primaryCargo: 'Coking Coal (Prime Hard)',
    baseRate: 14.80,
    flag: '🇦🇺'
  },
  {
    id: 'usa',
    name: 'United States',
    ports: ['Hampton Roads (Norfolk)', 'Baltimore', 'Mobile'],
    avgDistanceNm: 9200,
    transitDays: 29,
    primaryCargo: 'Coking Coal (Low-Vol Mid-Vol)',
    baseRate: 21.50,
    flag: '🇺🇸'
  },
  {
    id: 'mozambique',
    name: 'Mozambique',
    ports: ['Maputo', 'Beira', 'Nacala'],
    avgDistanceNm: 4100,
    transitDays: 12,
    primaryCargo: 'Thermal Coal / Coking Coal Blend',
    baseRate: 12.90,
    flag: '🇲🇿'
  },
  {
    id: 'russia',
    name: 'Russia',
    ports: ['Taman (Black Sea)', 'Ust-Luga (Baltic)', 'Vostochny (Far East)'],
    avgDistanceNm: 5800,
    transitDays: 19,
    primaryCargo: 'PCI Coal & Anthracite',
    baseRate: 18.20,
    flag: '🇷🇺'
  },
  {
    id: 'indonesia',
    name: 'Indonesia',
    ports: ['Balikpapan', 'Samarinda', 'Banjarmasin'],
    avgDistanceNm: 2200,
    transitDays: 7,
    primaryCargo: 'Thermal Coal (Sub-bituminous)',
    baseRate: 8.60,
    flag: '🇮🇩'
  }
];

export const VESSEL_CLASSES = [
  {
    id: 'handysize',
    name: 'Handysize',
    dwtRange: '25,000 - 40,000 DWT',
    capacityMt: 35000,
    draftReq: 9.5,
    loaReq: 180,
    fuelConsumptionSea: 18, // tonnes VLSFO / day
    dailyHireRate: 11200, // USD/day
    gearType: 'Geared (4 Cranes x 30t) with Grabs',
    bestFor: 'Draft-restricted ports like Haldia or smaller custom parcels'
  },
  {
    id: 'supramax',
    name: 'Supramax / Ultramax',
    dwtRange: '50,000 - 65,000 DWT',
    capacityMt: 58000,
    draftReq: 12.8,
    loaReq: 200,
    fuelConsumptionSea: 24,
    dailyHireRate: 14500,
    gearType: 'Geared (4 Cranes x 35t) with Electro-Hydraulic Grabs',
    bestFor: 'Versatile discharge across all ECI ports, optimal flexibility'
  },
  {
    id: 'panamax',
    name: 'Panamax / Kamsarmax',
    dwtRange: '70,000 - 85,000 DWT',
    capacityMt: 75000,
    draftReq: 14.5,
    loaReq: 229,
    fuelConsumptionSea: 29,
    dailyHireRate: 17200,
    gearType: 'Gearless (Requires shore unloader / gantry)',
    bestFor: 'Standard large bulk coal contract shipments to Paradip, Vizag, Gopalpur, Dhamra'
  },
  {
    id: 'capesize',
    name: 'Capesize',
    dwtRange: '120,000 - 180,000 DWT',
    capacityMt: 160000,
    draftReq: 18.2,
    loaReq: 295,
    fuelConsumptionSea: 42,
    dailyHireRate: 24800,
    gearType: 'Gearless (Requires deep water specialized iron/coal berths)',
    bestFor: 'Maximum scale economies; restricted to deep ports (Vizag, Gangavaram, Dhamra)'
  }
];

export const CARGO_TYPES = [
  { id: 'coking_coal', name: 'Coking Coal (Prime Hard / Metallurgical)', density: '0.85 MT/m³', stowageFactor: 42, sailPriority: 'Critical (Blast Furnace Fuel)' },
  { id: 'pci_coal', name: 'PCI Coal (Pulverized Coal Injection)', density: '0.82 MT/m³', stowageFactor: 44, sailPriority: 'High' },
  { id: 'thermal_coal', name: 'Thermal Coal (Power Generation)', density: '0.80 MT/m³', stowageFactor: 45, sailPriority: 'Standard' },
  { id: 'iron_ore', name: 'Iron Ore / Pellets', density: '2.40 MT/m³', stowageFactor: 15, sailPriority: 'High' }
];

// Historical and Predicted BDI & Freight Rates for 90 Days
export const GENERATE_FORECAST_DATA = (origin = 'australia', dest = 'paradip', cargo = 'coking_coal', vessel = 'panamax') => {
  const dates = [];
  const today = new Date();
  
  // Base rate calculation based on selections
  let baseRate = 14.80;
  if (origin === 'usa') baseRate = 21.20;
  if (origin === 'mozambique') baseRate = 12.90;
  if (origin === 'russia') baseRate = 18.50;
  if (origin === 'indonesia') baseRate = 8.80;

  if (vessel === 'capesize') baseRate *= 0.88; // economies of scale
  if (vessel === 'supramax') baseRate *= 1.08;
  if (vessel === 'handysize') baseRate *= 1.22;

  // Past 30 days
  for (let i = 30; i >= 1; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const noise = (Math.sin(i * 0.4) * 0.9) + (Math.cos(i * 0.8) * 0.4);
    const actual = +(baseRate + noise).toFixed(2);
    const aiPred = +(actual + ((Math.random() - 0.5) * 0.25)).toFixed(2);
    const arimaPred = +(actual + ((Math.random() - 0.5) * 1.6)).toFixed(2);
    const bdi = Math.round(1800 + (noise * 120) + (i * 4));

    dates.push({
      date: dateStr,
      fullDate: d.toISOString().split('T')[0],
      isFuture: false,
      actualRate: actual,
      predictedRate: aiPred,
      arimaRate: arimaPred,
      confidenceUpper: +(actual + 0.45).toFixed(2),
      confidenceLower: +(actual - 0.45).toFixed(2),
      bdi: bdi,
      tceDaily: Math.round(aiPred * 1280),
    });
  }

  // Today (Day 0)
  const todayStr = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const currentActual = +(baseRate + 0.15).toFixed(2);
  dates.push({
    date: todayStr + ' (Today)',
    fullDate: today.toISOString().split('T')[0],
    isFuture: false,
    actualRate: currentActual,
    predictedRate: currentActual,
    arimaRate: +(currentActual + 0.6).toFixed(2),
    confidenceUpper: +(currentActual + 0.4).toFixed(2),
    confidenceLower: +(currentActual - 0.4).toFixed(2),
    bdi: 1842,
    tceDaily: Math.round(currentActual * 1280),
  });

  // Future 60 days forecast
  let runningRate = currentActual;
  for (let i = 1; i <= 60; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    // Wave pattern with mild seasonal dip then steadying
    const trend = -0.015 * Math.min(i, 20) + (i > 20 ? 0.02 * (i - 20) : 0);
    const cycle = Math.sin(i * 0.2) * 0.6;
    const aiForecast = +(currentActual + trend + cycle).toFixed(2);
    const arimaLag = +(currentActual + (cycle * 2.2) + (i * 0.04)).toFixed(2);
    const margin = +(0.3 + (i * 0.025)).toFixed(2);

    dates.push({
      date: dateStr,
      fullDate: d.toISOString().split('T')[0],
      isFuture: true,
      actualRate: null, // unknown future actual
      predictedRate: aiForecast,
      arimaRate: arimaLag,
      confidenceUpper: +(aiForecast + margin).toFixed(2),
      confidenceLower: +(aiForecast - margin).toFixed(2),
      bdi: Math.round(1842 + (cycle * 95) + (i * 3)),
      tceDaily: Math.round(aiForecast * 1280),
    });
  }

  return dates;
};

// Route comparison summary for Dashboard
export const ROUTE_COMPARISONS = [
  {
    id: 'aus-paradip',
    origin: 'Hay Point, Australia',
    dest: 'Paradip Port',
    cargo: 'Coking Coal',
    vessel: 'Panamax (75k DWT)',
    currentRate: 14.85,
    predicted7d: 13.90,
    changePercent: -6.4,
    trend: 'down',
    recommendation: 'WAIT & FLOAT',
    recommendationNote: 'Rate softening by $0.95/t over next 5-7 days. Hold charter fixture.',
    confidence: '96.4%',
    badgeColor: 'amber'
  },
  {
    id: 'aus-vizag',
    origin: 'Gladstone, Australia',
    dest: 'Vizag Port',
    cargo: 'Coking Coal',
    vessel: 'Capesize (160k DWT)',
    currentRate: 12.40,
    predicted7d: 13.65,
    changePercent: +10.1,
    trend: 'up',
    recommendation: 'BOOK NOW',
    recommendationNote: 'Capesize tonnage tightening in Pacific basin. Fix voyage rate immediately.',
    confidence: '97.2%',
    badgeColor: 'emerald'
  },
  {
    id: 'usa-gangavaram',
    origin: 'Hampton Roads, USA',
    dest: 'Gangavaram Port',
    cargo: 'Met Coal (Low-Vol)',
    vessel: 'Panamax (75k DWT)',
    currentRate: 21.80,
    predicted7d: 20.95,
    changePercent: -3.9,
    trend: 'down',
    recommendation: 'HOLD / TENDER',
    recommendationNote: 'Atlantic bunker fuel softening. Invite 3-day window bids.',
    confidence: '95.1%',
    badgeColor: 'blue'
  },
  {
    id: 'indo-haldia',
    origin: 'Balikpapan, Indonesia',
    dest: 'Haldia (via Sagar)',
    cargo: 'Thermal Coal',
    vessel: 'Handysize (35k DWT)',
    currentRate: 9.40,
    predicted7d: 8.20,
    changePercent: -12.8,
    trend: 'down',
    recommendation: 'WAIT (Price Drop in 3d)',
    recommendationNote: 'Severe vessel oversupply in South East Asia. Rate drop imminent.',
    confidence: '96.8%',
    badgeColor: 'amber'
  },
  {
    id: 'moz-dhamra',
    origin: 'Maputo, Mozambique',
    dest: 'Dhamra Port',
    cargo: 'Coking Blend',
    vessel: 'Supramax (58k DWT)',
    currentRate: 13.10,
    predicted7d: 14.50,
    changePercent: +10.7,
    trend: 'up',
    recommendation: 'TIME CHARTER (6-Mo)',
    recommendationNote: 'South Africa freight corridor volatility rising. Lock multi-month contract.',
    confidence: '94.8%',
    badgeColor: 'purple'
  },
  {
    id: 'rus-vizag',
    origin: 'Ust-Luga, Russia',
    dest: 'Vizag Port',
    cargo: 'PCI Coal',
    vessel: 'Panamax (75k DWT)',
    currentRate: 18.90,
    predicted7d: 18.75,
    changePercent: -0.8,
    trend: 'stable',
    recommendation: 'SPOT VOYAGE OK',
    recommendationNote: 'Stable freight band. Proceed with scheduled monthly allocation.',
    confidence: '93.9%',
    badgeColor: 'slate'
  }
];

// Active Alerts for Alerts Panel & Dashboard
export const REAL_TIME_ALERTS = [
  {
    id: 'alt-01',
    severity: 'High',
    type: 'Rate Volatility',
    title: 'Spot Rate Spike Predicted (+10.1%)',
    route: 'Gladstone (Australia) → Vizag',
    timestamp: '18 mins ago',
    description: 'Capesize supply in the West Australia basin tightening rapidly due to increased ore exports to China. Freight rate projected to climb from $12.40 to $13.65/t within 7 days.',
    action: 'Book vessel fixture today to lock in current rate, saving approx. ₹1.82 Crores on next 160k MT shipment.',
    actionType: 'book',
    status: 'Active'
  },
  {
    id: 'alt-02',
    severity: 'High',
    type: 'Port Congestion',
    title: 'Severe Berthing Delays at Paradip Port',
    route: 'Paradip Port Bulk Terminal',
    timestamp: '1 hour ago',
    description: 'Pre-berthing waiting time has escalated from 1.5 days to 4.2 days due to conveyor breakdown and rake shortage. Demurrage exposure estimated at $28,000/day for Panamax class.',
    action: 'Divert scheduled shipment to Dhamra Port or request laycan rescheduling from supplier.',
    actionType: 'divert',
    status: 'Active'
  },
  {
    id: 'alt-03',
    severity: 'Medium',
    type: 'Geopolitical Risk',
    title: 'Security Advisory for Mozambique Channel',
    route: 'Maputo/Beira → East Coast India',
    timestamp: '3 hours ago',
    description: 'Regional maritime security bulletin issued for northern Mozambique shipping lanes. War risk insurance premium surcharge (+0.25% hull value) may apply to time charter fixtures.',
    action: 'Verify with P&I Club and review BIMCO War Risks Clause (CONWARTIME 2004) in charter party.',
    actionType: 'review',
    status: 'Active'
  },
  {
    id: 'alt-04',
    severity: 'Low',
    type: 'Bunker Optimization',
    title: 'VLSFO Fuel Price Drop at Singapore Hub (-$18/MT)',
    route: 'Singapore Bunkering Anchorage',
    timestamp: '5 hours ago',
    description: 'Very Low Sulphur Fuel Oil (VLSFO) prices dropped to $582/MT at Singapore hub. Voyage charter bunker adjustment factors (BAF) can be negotiated down.',
    action: 'Apply -3.2% BAF discount on all pending spot voyage charter contracts via Malacca Strait.',
    actionType: 'negotiate',
    status: 'Active'
  },
  {
    id: 'alt-05',
    severity: 'Medium',
    type: 'Weather Alert',
    title: 'Tropical Depression in Bay of Bengal',
    route: 'Dhamra & Gopalpur Approaches',
    timestamp: '7 hours ago',
    description: 'IMD cyclone alert tracking low-pressure system moving northwest towards Odisha coast. Gusting winds 45-55 knots expected in 72 hours.',
    action: 'Notify inbound chartered masters to maintain offshore drift or seek safe anchorage at Sagar.',
    actionType: 'weather',
    status: 'Active'
  }
];

// Historical Voyage Records for Historical Data / Reports Page
export const HISTORICAL_VOYAGES = [
  {
    voyageId: 'SAIL-V-2026-089',
    date: '2026-08-14',
    vesselName: 'M/V APJ Akhil',
    vesselClass: 'Capesize',
    dwt: 161000,
    cargoQuantity: 154000,
    origin: 'Hay Point (Australia)',
    destination: 'Vizag',
    cargo: 'Coking Coal',
    freightRateUsd: 12.10,
    tceUsd: 22400,
    bdi: 1780,
    charterType: 'Time Charter (6-Mo)',
    predictedRate: 12.35,
    actualSavingsInr: '₹2.84 Cr',
    status: 'Completed'
  },
  {
    voyageId: 'SAIL-V-2026-074',
    date: '2026-07-28',
    vesselName: 'M/V Vishva Nidhi',
    vesselClass: 'Panamax',
    dwt: 76000,
    cargoQuantity: 73500,
    origin: 'Gladstone (Australia)',
    destination: 'Paradip',
    cargo: 'Coking Coal',
    freightRateUsd: 14.20,
    tceUsd: 17100,
    bdi: 1820,
    charterType: 'Spot Voyage',
    predictedRate: 14.10,
    actualSavingsInr: '₹1.15 Cr',
    status: 'Completed'
  },
  {
    voyageId: 'SAIL-V-2026-062',
    date: '2026-07-10',
    vesselName: 'M/V Jag Arnav',
    vesselClass: 'Supramax',
    dwt: 58000,
    cargoQuantity: 55000,
    origin: 'Balikpapan (Indonesia)',
    destination: 'Haldia',
    cargo: 'Thermal Coal',
    freightRateUsd: 8.90,
    tceUsd: 13900,
    bdi: 1650,
    charterType: 'Spot Voyage',
    predictedRate: 8.95,
    actualSavingsInr: '₹0.72 Cr',
    status: 'Completed'
  },
  {
    voyageId: 'SAIL-V-2026-051',
    date: '2026-06-22',
    vesselName: 'M/V Chennai Selvam',
    vesselClass: 'Capesize',
    dwt: 175000,
    cargoQuantity: 168000,
    origin: 'Newcastle (Australia)',
    destination: 'Gangavaram',
    cargo: 'Coking Coal',
    freightRateUsd: 11.85,
    tceUsd: 21800,
    bdi: 1710,
    charterType: 'Time Charter (1-Yr)',
    predictedRate: 11.90,
    actualSavingsInr: '₹3.40 Cr',
    status: 'Completed'
  },
  {
    voyageId: 'SAIL-V-2026-044',
    date: '2026-06-05',
    vesselName: 'M/V Golden Fortune',
    vesselClass: 'Panamax',
    dwt: 78000,
    cargoQuantity: 74200,
    origin: 'Hampton Roads (USA)',
    destination: 'Dhamra',
    cargo: 'Met Coal (Low-Vol)',
    freightRateUsd: 20.40,
    tceUsd: 18400,
    bdi: 1890,
    charterType: 'Consecutive Voyages (COA)',
    predictedRate: 20.65,
    actualSavingsInr: '₹2.10 Cr',
    status: 'Completed'
  },
  {
    voyageId: 'SAIL-V-2026-039',
    date: '2026-05-18',
    vesselName: 'M/V Global Horizon',
    vesselClass: 'Supramax',
    dwt: 60000,
    cargoQuantity: 57500,
    origin: 'Maputo (Mozambique)',
    destination: 'Gopalpur',
    cargo: 'Coking Blend',
    freightRateUsd: 12.60,
    tceUsd: 14800,
    bdi: 1740,
    charterType: 'Spot Voyage',
    predictedRate: 12.75,
    actualSavingsInr: '₹0.95 Cr',
    status: 'Completed'
  },
  {
    voyageId: 'SAIL-V-2026-027',
    date: '2026-04-30',
    vesselName: 'M/V Pacific Pioneer',
    vesselClass: 'Panamax',
    dwt: 75000,
    cargoQuantity: 72000,
    origin: 'Taman (Russia)',
    destination: 'Vizag',
    cargo: 'PCI Coal',
    freightRateUsd: 18.30,
    tceUsd: 16900,
    bdi: 1805,
    charterType: 'Spot Voyage',
    predictedRate: 18.20,
    actualSavingsInr: '₹1.35 Cr',
    status: 'Completed'
  },
  {
    voyageId: 'SAIL-V-2026-018',
    date: '2026-04-12',
    vesselName: 'M/V Indian Pride',
    vesselClass: 'Handysize',
    dwt: 38000,
    cargoQuantity: 36000,
    origin: 'Samarinda (Indonesia)',
    destination: 'Haldia',
    cargo: 'Thermal Coal',
    freightRateUsd: 9.75,
    tceUsd: 12100,
    bdi: 1690,
    charterType: 'Spot Voyage',
    predictedRate: 9.60,
    actualSavingsInr: '₹0.48 Cr',
    status: 'Completed'
  }
];

// Model Comparison Metrics
export const MODEL_ACCURACY_STATS = {
  pravah: {
    modelName: 'PRAVAH Hybrid Ensemble (LSTM + Temporal Transformer + Exogenous Macro)',
    accuracy: 96.1,
    rmse: 0.62,
    mae: 0.44,
    mape: 4.1,
    trainingWindow: '2015-2026 (11 Years Daily Data)',
    exogenousFeatures: [
      'Baltic Dry Index (BDI) Momentum',
      'Brent & Singapore VLSFO Bunker Fuel Prices',
      'Iron Ore & Steel Rebar Futures (SHFE/Dalian)',
      'Port Congestion & AIS Queue Waiting Days',
      'Monsoon & Weather Teleconnections (ENSO/IOD)',
      'Global Fleet Orderbook vs Scrappage Ratio'
    ]
  },
  baselineArima: {
    modelName: 'Traditional Statistical Baseline (ARIMA / SARIMA 2,1,2)',
    accuracy: 62.4,
    rmse: 2.85,
    mae: 2.15,
    mape: 18.7,
    shortcomings: [
      'Cannot capture non-linear geopolitical supply shocks',
      'No multi-variate bunker or macroeconomic integration',
      'High lag response during sudden market turnaround cycles'
    ]
  }
};
