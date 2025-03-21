
import { useEffect, useState } from "react";
import { fetchTopCryptos } from "@/lib/api";
import { CryptoCurrency } from "@/types/crypto";
import { ArrowUpCircle, ArrowDownCircle, RefreshCw, TrendingUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const LiveMarket = () => {
  const [cryptos, setCryptos] = useState<CryptoCurrency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchTopCryptos();
      setCryptos(data);
      setError(null);
    } catch (err) {
      setError("Failed to load market data. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    
    // Refresh data every 60 seconds
    const interval = setInterval(() => {
      loadData();
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Format currency with localization
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: value < 1 ? 4 : 2,
      maximumFractionDigits: value < 1 ? 4 : 2,
    }).format(value);
  };

  // Format large numbers (for market cap, etc.)
  const formatLargeNumber = (value: number) => {
    if (value >= 1e12) return (value / 1e12).toFixed(2) + 'T';
    if (value >= 1e9) return (value / 1e9).toFixed(2) + 'B';
    if (value >= 1e6) return (value / 1e6).toFixed(2) + 'M';
    return value.toLocaleString();
  };

  if (loading && cryptos.length === 0) {
    return (
      <div className="w-full py-12">
        <div className="flex flex-col items-center justify-center">
          <RefreshCw size={32} className="animate-spin text-blue-500 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading market data...</p>
        </div>
      </div>
    );
  }

  if (error && cryptos.length === 0) {
    return (
      <div className="w-full py-12">
        <div className="flex flex-col items-center justify-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={loadData}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <TrendingUp size={20} className="text-blue-600 mr-2" />
          <h2 className="text-2xl font-bold">Live Market</h2>
        </div>
        <button 
          onClick={loadData} 
          className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <RefreshCw size={14} className={loading ? "animate-spin mr-1" : "mr-1"} />
          Refresh
        </button>
      </div>
      
      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Asset
                </th>
                {!isMobile && (
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                )}
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  24h %
                </th>
                {!isMobile && (
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Market Cap
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {cryptos.map((crypto) => (
                <tr 
                  key={crypto.id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150"
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img 
                        src={crypto.image} 
                        alt={crypto.name} 
                        className="w-8 h-8 mr-3 rounded-full"
                      />
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {crypto.symbol.toUpperCase()}
                      </div>
                    </div>
                  </td>
                  {!isMobile && (
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {crypto.name}
                    </td>
                  )}
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-gray-100">
                    {formatCurrency(crypto.current_price)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <div className={`inline-flex items-center ${
                      crypto.price_change_percentage_24h >= 0 
                        ? "text-green-600 dark:text-green-500" 
                        : "text-red-600 dark:text-red-500"
                    }`}>
                      {crypto.price_change_percentage_24h >= 0 ? (
                        <ArrowUpCircle size={16} className="mr-1" />
                      ) : (
                        <ArrowDownCircle size={16} className="mr-1" />
                      )}
                      <span className="font-medium">
                        {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                      </span>
                    </div>
                  </td>
                  {!isMobile && (
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-right text-gray-700 dark:text-gray-300">
                      {formatLargeNumber(crypto.market_cap)}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LiveMarket;
