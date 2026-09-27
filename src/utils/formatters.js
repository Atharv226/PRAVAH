// Formatting utilities for PRAVAH (SAIL Freight Platform)

export const USD_TO_INR_RATE = 86.50; // Current approximate exchange rate

export const formatCurrency = (amountUsd, currency = 'USD', decimals = 2) => {
  if (amountUsd === null || amountUsd === undefined || isNaN(amountUsd)) return '-';
  
  if (currency === 'INR') {
    const inrValue = amountUsd * USD_TO_INR_RATE;
    if (Math.abs(inrValue) >= 10000000) {
      return `₹${(inrValue / 10000000).toFixed(decimals)} Cr`;
    } else if (Math.abs(inrValue) >= 100000) {
      return `₹${(inrValue / 100000).toFixed(decimals)} Lakh`;
    }
    return `₹${inrValue.toLocaleString('en-IN', { maximumFractionDigits: decimals })}`;
  }

  // USD
  if (Math.abs(amountUsd) >= 1000000) {
    return `$${(amountUsd / 1000000).toFixed(decimals)}M`;
  }
  return `$${amountUsd.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
};

export const formatRatePerTonne = (usdPerTonne, currency = 'USD') => {
  if (currency === 'INR') {
    return `₹${(usdPerTonne * USD_TO_INR_RATE).toFixed(1)}/t`;
  }
  return `$${usdPerTonne.toFixed(2)}/t`;
};

export const formatNumber = (num) => {
  if (num === null || num === undefined) return '-';
  return num.toLocaleString('en-US');
};
