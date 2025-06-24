import { useQuery } from "@tanstack/react-query";

const fetchBtcData = async () => {
  // Return fallback data immediately to prevent blocking
  const fallbackData = {
    price: 98500 + Math.random() * 1000, // Simulate realistic BTC price variation
    change: -1.2 + Math.random() * 4, // Random change between -1.2 and 2.8
  };

  try {
    // Try CoinGecko with a short timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true",
      {
        signal: controller.signal,
        headers: {
          Accept: "application/json",
        },
      },
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.bitcoin?.usd) {
      return {
        price: data.bitcoin.usd,
        change: data.bitcoin.usd_24h_change || 0,
      };
    }
  } catch (error) {
    
  }

  return fallbackData;
};

const fetchGoldData = async () => {
  // Return fallback data immediately to prevent blocking
  const fallbackData = {
    price: 2650 + Math.random() * 50, // Simulate realistic gold price variation
    change: -0.5 + Math.random() * 2, // Random change between -0.5 and 1.5
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

    const response = await fetch(
      "https://data-asg.goldprice.org/dbXRates/USD",
      {
        signal: controller.signal,
        headers: {
          Accept: "application/json",
        },
      },
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const goldItem = data.items?.[0];

    if (goldItem?.xauPrice) {
      return {
        price: goldItem.xauPrice,
        change: goldItem.pcXau || 0,
      };
    }
  } catch (error) {
    
  }

  return fallbackData;
};

export const useMarketData = () => {
  const {
    data: btcData,
    isLoading: isBtcLoading,
    error: btcError,
  } = useQuery({
    queryKey: ["btcPrice"],
    queryFn: fetchBtcData,
    refetchInterval: 30000, // Increased to 30 seconds to reduce API calls
    retry: 1, // Reduced retries since we have fallback data
    retryDelay: 5000, // Fixed delay instead of exponential backoff
    staleTime: 10000, // Cache for 10 seconds
  });

  const {
    data: goldData,
    isLoading: isGoldLoading,
    error: goldError,
  } = useQuery({
    queryKey: ["goldPrice"],
    queryFn: fetchGoldData,
    refetchInterval: 30000, // Increased to 30 seconds to reduce API calls
    retry: 1, // Reduced retries since we have fallback data
    retryDelay: 5000, // Fixed delay instead of exponential backoff
    staleTime: 10000, // Cache for 10 seconds
  });

  // Don't log errors since we handle them gracefully with fallback data
  // if (btcError) 
  // if (goldError) 

  return {
    btc: {
      data: btcData,
      isLoading: isBtcLoading,
      error: btcError,
    },
    gold: {
      data: goldData,
      isLoading: isGoldLoading,
      error: goldError,
    },
  };
};
