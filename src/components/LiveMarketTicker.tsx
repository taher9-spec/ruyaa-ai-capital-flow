"use client";

import React, { useEffect, useState } from "react";

interface TickerData {
  label: string;
  price: number;
}

const cryptoSymbols = [
  { id: "bitcoin", label: "BTC/USD" },
  { id: "ethereum", label: "ETH/USD" },
];

const marketSymbols = [
  { symbol: "XAU/USD", label: "GOLD" },
  { symbol: "EUR/USD", label: "EURUSD" },
  { symbol: "NDX", label: "NASDAQ" },
  { symbol: "DXY", label: "DXY" },
  { symbol: "DJI", label: "DOW" },
];

const fallbackPrices: Record<string, number> = {
  bitcoin: 68000,
  ethereum: 3500,
  gold: 2300,
  eurusd: 1.07,
  nasdaq: 17000,
  dxy: 103,
  dow: 39000,
};

interface ExtendedTickerData extends TickerData {
  change?: number;
  changePercent?: number;
  signal?: "bullish" | "bearish" | "neutral";
}

const LiveMarketTicker: React.FC = () => {
  const [data, setData] = useState<ExtendedTickerData[]>([]);
  const [prevPrices, setPrevPrices] = useState<Record<string, number>>({});
  const [priceHistory, setPriceHistory] = useState<Record<string, number[]>>({});

  const fetchPrices = async () => {
    try {
      const cryptoIds = cryptoSymbols.map((s) => s.id).join(",");
      // API disabled - static data used
        // const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds}&vs_currencies=usd`,
      );
      const json = await res.json();
      const cryptoData = cryptoSymbols.map((s) => {
        const currentPrice = json[s.id]?.usd ?? fallbackPrices[s.id];
        const prevPrice = prevPrices[s.label] || currentPrice;
        const change = currentPrice - prevPrice;
        const changePercent = prevPrice ? (change / prevPrice) * 100 : 0;
        return {
          label: s.label,
          price: currentPrice,
          change,
          changePercent,
        };
      });

      const twelveKey = import.meta.env.VITE_TWELVEDATA_API_KEY;
      if (!twelveKey) {
        throw new Error("Missing TwelveData API key");
      }
      const otherData = await Promise.all(
        marketSymbols.map(async (s) => {
          try {
            const r = await fetch(
              `https://api.twelvedata.com/price?symbol=${s.symbol}&apikey=${twelveKey}`,
            );
            const j = await r.json();
            const currentPrice = parseFloat(j.price);
            if (isNaN(currentPrice)) throw new Error("price");
            const prevPrice = prevPrices[s.label] || currentPrice;
            const change = currentPrice - prevPrice;
            const changePercent = prevPrice ? (change / prevPrice) * 100 : 0;
            return {
              label: s.label,
              price: currentPrice,
              change,
              changePercent,
            };
          } catch {
            const key = s.label.toLowerCase();
            return { label: s.label, price: fallbackPrices[key] };
          }
        }),
      );

      const newData = [...cryptoData, ...otherData];

      const newPrevPrices: Record<string, number> = {};
      const newHistory: Record<string, number[]> = { ...priceHistory };

      const enriched = newData.map((item) => {
        newPrevPrices[item.label] = item.price;
        const history = newHistory[item.label] || [];
        const updatedHistory = [...history.slice(-4), item.price];
        newHistory[item.label] = updatedHistory;
        let signal: "bullish" | "bearish" | "neutral" | undefined;
        if (updatedHistory.length >= 3) {
          const trend = updatedHistory
            .slice(1)
            .map((p, idx) => p - updatedHistory[idx])
            .reduce((a, b) => a + b, 0);
          if (trend > 0) signal = "bullish";
          else if (trend < 0) signal = "bearish";
          else signal = "neutral";
        }
        return { ...item, signal } as ExtendedTickerData;
      });

      setPrevPrices(newPrevPrices);
      setPriceHistory(newHistory);
      setData(enriched);
      } catch (e) {
        const fallbackData = [
          ...cryptoSymbols.map((s) => ({
            label: s.label,
            price: fallbackPrices[s.id],
          })),
          ...marketSymbols.map((s) => ({
            label: s.label,
            price: fallbackPrices[s.label.toLowerCase()],
          })),
        ];

        const newPrevPrices: Record<string, number> = {};
        const newHistory: Record<string, number[]> = { ...priceHistory };
        const enriched = fallbackData.map((item) => {
          newPrevPrices[item.label] = item.price;
          const history = newHistory[item.label] || [];
          const updatedHistory = [...history.slice(-4), item.price];
          newHistory[item.label] = updatedHistory;
          return { ...item, signal: undefined } as ExtendedTickerData;
        });
        setPrevPrices(newPrevPrices);
        setPriceHistory(newHistory);
        setData(enriched);
      }
  };

  useEffect(() => {
    fetchPrices();
    const id = setInterval(fetchPrices, 30000);
    return () => clearInterval(id);
  }, []);

  if (data.length === 0) return null;

  const getPriceColor = (changePercent?: number) => {
    if (!changePercent) return "text-gray-400";
    if (changePercent > 0) return "text-yellow-500";
    if (changePercent < 0) return "text-red-400";
    return "text-gray-400";
  };

  const getChangeIcon = (changePercent?: number) => {
    if (!changePercent) return "";
    if (changePercent > 0) return "▲";
    if (changePercent < 0) return "▼";
    return "";
  };

  return (
    <div className="fixed top-0 left-0 z-20 w-full overflow-hidden border-b border-gray-700 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 backdrop-blur-xl">
      {/* Modern dark banner */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-800/90 to-gray-900/90 animate-pulse-slow" />
      
      <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent z-10" />
      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-gray-900 via-gray-900/90 to-transparent z-10" />
      
      
      <div className="flex animate-marquee whitespace-nowrap py-4 opacity-80">
        {data.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-4 px-10 border-r border-gray-700 last:border-r-0"
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full animate-pulse ${
                  item.changePercent && item.changePercent > 0
                    ? "bg-yellow-500 shadow-glow"
                    : item.changePercent && item.changePercent < 0
                      ? "bg-red-400 shadow-red-400/50"
                      : "bg-gray-400"
                }`}
              />
              <span className="font-bold text-white text-sm font-spacegrotesk tracking-wide">
                {item.label}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-sm font-mono font-semibold ${getPriceColor(item.changePercent)}`}
              >
                ${item.price.toLocaleString()}
              </span>
              {item.signal && (
                <span
                  className={`text-xs font-medium ${
                    item.signal === "bullish"
                      ? "text-yellow-500"
                      : item.signal === "bearish"
                        ? "text-red-400"
                        : "text-gray-400"
                  }`}
                >
                  {item.signal === "bullish" && "▲"}
                  {item.signal === "bearish" && "▼"}
                </span>
              )}
              {item.changePercent !== undefined && (
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    item.changePercent > 0
                      ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                      : item.changePercent < 0
                        ? "bg-red-400/10 text-red-400 border border-red-400/20"
                        : "bg-gray-400/10 text-gray-400 border border-gray-400/20"
                  }`}
                >
                  <span className="text-[10px]">
                    {getChangeIcon(item.changePercent)}
                  </span>
                  {Math.abs(item.changePercent).toFixed(2)}%
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveMarketTicker;