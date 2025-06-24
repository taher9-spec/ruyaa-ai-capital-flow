import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

interface TickerItem {
  pair: string;
  price: number;
  change: number;
}

// Static crypto data to avoid API calls
const STATIC_CRYPTO_DATA: TickerItem[] = [
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

const TickerItemComponent: React.FC<{ item: TickerItem }> = ({ item }) => {
  const isPositive = item.change >= 0;
  return (
    <div className="flex items-center gap-4 px-6 shrink-0">
      <span className="text-sm font-medium text-gray-300">{item.pair}</span>
      <span className="text-sm font-bold text-white">
        {item.price.toFixed(
          item.pair.includes("BTC") || item.pair.includes("ETH") ? 5 : 2,
        )}
      </span>
      <div
        className={`flex items-center gap-1 text-xs font-semibold ${isPositive ? "text-green" : "text-red-400"}`}
      >
        {isPositive ? (
          <ArrowUp size={14} strokeWidth={2.5} />
        ) : (
          <ArrowDown size={14} strokeWidth={2.5} />
        )}
        <span>
          {isPositive ? "+" : ""}
          {item.change.toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

const ArbitrageTicker: React.FC = () => {
  const [data, setData] = React.useState<TickerItem[]>(STATIC_CRYPTO_DATA);

  // Add slight variation to prices every 30 seconds for realism
  React.useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) =>
        prevData.map((item) => ({
          ...item,
          change: item.change + (Math.random() - 0.5) * 0.5, // Small random variation
        })),
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const duplicatedData = [...data, ...data, ...data, ...data]; // Duplicate for seamless animation

  return (
    <div className="relative w-full max-w-full mx-auto h-14 bg-black/30 border-y border-green/20 overflow-hidden backdrop-blur-sm group mb-12">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-bg to-transparent z-10" />
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-bg to-transparent z-10" />

      <div className="flex items-center h-full animate-marquee [animation-play-state:running] group-hover:[animation-play-state:paused]">
        {duplicatedData.map((item, index) => (
          <TickerItemComponent key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ArbitrageTicker;
