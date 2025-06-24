// Static market data to avoid API calls that cause fetch errors

export const STATIC_CRYPTO_PRICES = [
  { pair: "BTC/ETH", price: 15.2341, change: 2.34 },
  { pair: "ETH/USDT", price: 3842.5, change: -1.23 },
  { pair: "SOL/USDT", price: 187.65, change: 4.56 },
  { pair: "XRP/BTC", price: 0.000024, change: -0.89 },
  { pair: "ADA/ETH", price: 0.00019, change: 1.78 },
  { pair: "LINK/USDT", price: 28.45, change: 3.21 },
  { pair: "DOGE/USDT", price: 0.34, change: -2.11 },
  { pair: "MATIC/BTC", price: 0.000013, change: 0.67 },
  { pair: "BNB/USDT", price: 695.8, change: 1.45 },
];

export const STATIC_BTC_DATA = {
  price: 98750.25,
  change: 2.15,
};

export const STATIC_GOLD_DATA = {
  price: 2675.4,
  change: 0.85,
};

export const STATIC_LIVE_MARKET_DATA = [
  { label: "BTC", price: 98750.25, change: 543.12, changePercent: 2.15 },
  { label: "ETH", price: 3842.5, change: -47.35, changePercent: -1.23 },
  { label: "SOL", price: 187.65, change: 8.56, changePercent: 4.56 },
  { label: "XRP", price: 2.45, change: -0.02, changePercent: -0.89 },
  { label: "ADA", price: 0.89, change: 0.016, changePercent: 1.78 },
  { label: "GOLD", price: 2675.4, change: 22.5, changePercent: 0.85 },
  { label: "USD/EUR", price: 0.92, change: -0.005, changePercent: -0.54 },
  { label: "GBP/USD", price: 1.25, change: 0.008, changePercent: 0.64 },
];
