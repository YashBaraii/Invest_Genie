import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import LiveMarket from "@/components/LiveMarket";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { fetchCryptoNews, fetchMarketSentiment } from "@/lib/api";
import { CryptoNews, MarketSentiment } from "@/types/crypto";
import {
  TrendingUp,
  RefreshCw,
  ArrowUpCircle,
  ArrowDownCircle,
  AreaChart,
  LineChart,
  PieChart,
  Bell,
  Clock,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardLayout } from "@/components/DashboardLayout.tsx";

// Line chart data for portfolio performance
const portfolioChartData = [
  { date: "Jan", value: 1000 },
  { date: "Feb", value: 1200 },
  { date: "Mar", value: 1100 },
  { date: "Apr", value: 1400 },
  { date: "May", value: 1300 },
  { date: "Jun", value: 1500 },
  { date: "Jul", value: 1700 },
  { date: "Aug", value: 2000 },
  { date: "Sep", value: 30000 },
  { date: "Oct", value: 40000 },
  { date: "Nov", value: 38000 },
  { date: "Dec", value: 50000 },
];

// Mock portfolio allocation data
const portfolioAllocation = [
  { asset: "Bitcoin", symbol: "BTC", percentage: 50, color: "#F7931A" },
  { asset: "Ethereum", symbol: "ETH", percentage: 30, color: "#627EEA" },
  { asset: "Solana", symbol: "SOL", percentage: 10, color: "#00FFA3" },
  { asset: "Cardano", symbol: "ADA", percentage: 5, color: "#0033AD" },
  { asset: "Polkadot", symbol: "DOT", percentage: 5, color: "#E6007A" },
];

const Dashboard = () => {
  const [news, setNews] = useState<CryptoNews[]>([]);
  const [sentiment, setSentiment] = useState<MarketSentiment | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Add scroll management
  useEffect(() => {
    // Reset scroll position when component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [newsData, sentimentData] = await Promise.all([
          fetchCryptoNews(),
          fetchMarketSentiment()
        ]);

        setNews(newsData);
        setSentiment(sentimentData);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const formatNewsDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSentimentColor = (sentiment: 'positive' | 'neutral' | 'negative') => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600 dark:text-green-500';
      case 'negative':
        return 'text-red-600 dark:text-red-500';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getSentimentIcon = (sentiment: 'positive' | 'neutral' | 'negative') => {
    switch (sentiment) {
      case 'positive':
        return <ArrowUpCircle size={16} className="mr-1" />;
      case 'negative':
        return <ArrowDownCircle size={16} className="mr-1" />;
      default:
        return <TrendingUp size={16} className="mr-1" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 md:px-6">
        {/* Dashboard Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-gray-600 dark:text-gray-400">
              Your AI-powered crypto insights and portfolio tracking
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Last updated: {new Date().toLocaleString()}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center"
              onClick={() => window.location.reload()}
            >
              <RefreshCw size={14} className="mr-1" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Portfolio Overview */}
            <div className="glass-panel rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Portfolio Overview</h2>
                <Button variant="outline" size="sm" className="text-xs">
                  View Details
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Value</div>
                  <div className="text-2xl font-bold">$12,450.78</div>
                  <div className="flex items-center text-green-600 dark:text-green-500 text-sm mt-1">
                    <ArrowUpCircle size={14} className="mr-1" />
                    +15.4% (30d)
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Risk Level</div>
                  <div className="text-2xl font-bold">Moderate</div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mt-1">
                    <Progress value={65} className="h-1.5 mt-1" />
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">AI Recommendation</div>
                  <div className="text-lg font-semibold">Buy: ETH, SOL</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    Hold: BTC, ADA
                  </div>
                </div>
              </div>

              {/* Chart placeholder */}
              <div className="w-full h-64 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <LineChart size={40} className="text-blue-500 mb-2 opacity-70" />
                  <span className="text-gray-500 dark:text-gray-400">Portfolio Performance</span>
                </div>
              </div>
            </div>

            {/* Market Data */}
            <div>
              <LiveMarket />
            </div>

            {/* News Section */}
            <div className="glass-panel rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4">Trending Crypto News</h2>

              {isLoading ? (
                <div className="flex justify-center py-8">
                  <RefreshCw size={24} className="animate-spin text-blue-500" />
                </div>
              ) : (
                <div className="space-y-4">
                  {news.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-colors"
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <Clock size={14} className="mr-1" />
                          {formatNewsDate(item.published_at)}
                        </span>
                        <span className={`text-sm flex items-center ${getSentimentColor(item.sentiment)}`}>
                          {getSentimentIcon(item.sentiment)}
                          {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
                        </span>
                      </div>
                      <h3 className="font-medium mb-2">{item.title}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Source: {item.source}
                        </span>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 text-sm inline-flex items-center hover:underline"
                        >
                          Read more
                          <ExternalLink size={12} className="ml-1" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Market Sentiment */}
            <div className="glass-panel rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4">Market Sentiment</h2>

              {isLoading || !sentiment ? (
                <div className="flex justify-center py-8">
                  <RefreshCw size={24} className="animate-spin text-blue-500" />
                </div>
              ) : (
                <>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 mb-4">
                    <div className="text-center mb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Overall Market Sentiment
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className={`text-2xl font-bold flex items-center ${getSentimentColor(sentiment.overall)}`}>
                        {getSentimentIcon(sentiment.overall)}
                        {sentiment.overall.charAt(0).toUpperCase() + sentiment.overall.slice(1)}
                      </div>
                    </div>
                    <div className="mt-2">
                      <Progress value={sentiment.score} className="h-2 mb-1" />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>Bearish</span>
                        <span>Neutral</span>
                        <span>Bullish</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {sentiment.sources.map((source, index) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{source.name}</span>
                          <span className={`text-sm flex items-center ${getSentimentColor(source.sentiment)}`}>
                            {getSentimentIcon(source.sentiment)}
                            {source.sentiment.charAt(0).toUpperCase() + source.sentiment.slice(1)}
                          </span>
                        </div>
                        <Progress value={source.score} className="h-1.5 mt-2" />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Portfolio Allocation */}
            <div className="glass-panel rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4">Portfolio Allocation</h2>

              <div className="w-full h-48 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 flex items-center justify-center mb-4">
                <div className="flex flex-col items-center">
                  <PieChart size={40} className="text-blue-500 mb-2 opacity-70" />
                  <span className="text-gray-500 dark:text-gray-400">Asset Allocation</span>
                </div>
              </div>

              <div className="space-y-3">
                {portfolioAllocation.map((asset, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: asset.color }}
                        />
                        <span className="font-medium">{asset.asset}</span>
                      </div>
                      <span className="text-sm font-semibold">{asset.percentage}%</span>
                    </div>
                    <Progress
                      value={asset.percentage}
                      className="h-1.5"
                      style={{
                        backgroundColor: `${asset.color}30`,
                        "--tw-progress-fill": asset.color
                      } as React.CSSProperties}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Alerts & Notifications */}
            <div className="glass-panel rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Alerts</h2>
                <Button variant="outline" size="sm" className="text-xs">
                  Manage Alerts
                </Button>
              </div>

              <div className="space-y-3">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-green-100 dark:border-green-900/30 flex items-center">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                    <Bell size={16} className="text-green-600 dark:text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">BTC crossed $60,000</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-blue-100 dark:border-blue-900/30 flex items-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                    <TrendingUp size={16} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">ETH up 5% in last 24h</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">5 hours ago</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-purple-100 dark:border-purple-900/30 flex items-center">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full mr-3">
                    <AreaChart size={16} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Portfolio hit 15% gain</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Yesterday</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
