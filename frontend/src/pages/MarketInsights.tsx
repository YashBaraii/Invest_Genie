
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { getCryptoMarketSentiment } from "@/utils/geminiApi";
import { MarketSentiment } from "@/types/crypto";
import { TrendingUp, TrendingDown, BarChart4, PieChart, LineChart, Activity } from "lucide-react";

const MarketInsights = () => {
  const [sentiment, setSentiment] = useState<MarketSentiment | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSentiment = async () => {
      setIsLoading(true);
      try {
        const sentimentData = await getCryptoMarketSentiment();
        setSentiment(sentimentData);
      } catch (error) {
        console.error("Error fetching sentiment:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSentiment();
  }, []);

  // Dummy data for charts
  const marketCapData = [
    { date: "Jan", BTC: 800, ETH: 300, Other: 400 },
    { date: "Feb", BTC: 900, ETH: 400, Other: 500 },
    { date: "Mar", BTC: 850, ETH: 350, Other: 550 },
    { date: "Apr", BTC: 1000, ETH: 500, Other: 600 },
    { date: "May", BTC: 1100, ETH: 550, Other: 650 },
    { date: "Jun", BTC: 1200, ETH: 600, Other: 700 },
    { date: "Jul", BTC: 1300, ETH: 650, Other: 750 },
    { date: "Aug", BTC: 1400, ETH: 700, Other: 800 },
  ];

  const volumeData = [
    { date: "Jan", BTC: 300, ETH: 200, Other: 100 },
    { date: "Feb", BTC: 400, ETH: 300, Other: 200 },
    { date: "Mar", BTC: 350, ETH: 250, Other: 150 },
    { date: "Apr", BTC: 500, ETH: 400, Other: 300 },
    { date: "May", BTC: 600, ETH: 450, Other: 350 },
    { date: "Jun", BTC: 550, ETH: 400, Other: 300 },
    { date: "Jul", BTC: 700, ETH: 500, Other: 400 },
    { date: "Aug", BTC: 800, ETH: 600, Other: 500 },
  ];

  const sentimentData = [
    { date: "Jan", sentiment: 40 },
    { date: "Feb", sentiment: 60 },
    { date: "Mar", sentiment: 30 },
    { date: "Apr", sentiment: -10 },
    { date: "May", sentiment: -20 },
    { date: "Jun", sentiment: 10 },
    { date: "Jul", sentiment: 30 },
    { date: "Aug", sentiment: 50 },
  ];

  const getSentimentIcon = (overall: string) => {
    switch (overall.toLowerCase()) {
      case 'positive':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'negative':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      default:
        return <Activity className="w-5 h-5 text-blue-500" />;
    }
  };

  const getSentimentColor = (score: number) => {
    if (score > 30) return 'bg-green-500';
    if (score > 0) return 'bg-green-300';
    if (score > -30) return 'bg-red-300';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Market Insights
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              AI-powered analytics and market sentiment analysis
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card className="glass-panel">
              <CardHeader className="pb-2">
                <CardDescription>Market Sentiment</CardDescription>
                <div className="flex items-center gap-2">
                  {isLoading ? (
                    <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  ) : (
                    <>
                      {sentiment && getSentimentIcon(sentiment.overall)}
                      <CardTitle className="text-2xl capitalize">
                        {sentiment?.overall || "Neutral"}
                      </CardTitle>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mt-2 animate-pulse"></div>
                ) : (
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
                    <div 
                      className={`h-2.5 rounded-full ${getSentimentColor(sentiment?.score || 0)}`} 
                      style={{ width: `${Math.abs((sentiment?.score || 0) / 2) + 50}%`, marginLeft: `${(sentiment?.score || 0) < 0 ? 0 : (50 - (Math.abs((sentiment?.score || 0) / 2)))}%` }}
                    ></div>
                  </div>
                )}
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>Bearish</span>
                  <span>Neutral</span>
                  <span>Bullish</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-panel">
              <CardHeader className="pb-2">
                <CardDescription>Total Market Cap</CardDescription>
                <CardTitle className="text-2xl">$1.53T</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="font-medium">+3.2%</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2 text-sm">24h change</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-panel">
              <CardHeader className="pb-2">
                <CardDescription>24h Trading Volume</CardDescription>
                <CardTitle className="text-2xl">$48.7B</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-red-600 dark:text-red-400">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  <span className="font-medium">-1.8%</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2 text-sm">vs. yesterday</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="overview" className="w-full mb-10">
            <TabsList className="mb-6 flex justify-center">
              <TabsTrigger value="overview" className="px-6">Market Overview</TabsTrigger>
              <TabsTrigger value="sentiment" className="px-6">Sentiment Analysis</TabsTrigger>
              <TabsTrigger value="correlations" className="px-6">Asset Correlations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <BarChart4 className="w-5 h-5 text-blue-500" />
                      <CardTitle>Market Capitalization</CardTitle>
                    </div>
                    <CardDescription>Historical market cap by coin (in billions USD)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={marketCapData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorBTC" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#F7931A" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#F7931A" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorETH" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#627EEA" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#627EEA" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorOther" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="date" />
                          <YAxis tickFormatter={(value) => `$${value}B`} />
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <Tooltip />
                          <Area 
                            type="monotone" 
                            dataKey="BTC" 
                            stackId="1"
                            stroke="#F7931A" 
                            fillOpacity={1} 
                            fill="url(#colorBTC)" 
                          />
                          <Area 
                            type="monotone" 
                            dataKey="ETH" 
                            stackId="1"
                            stroke="#627EEA" 
                            fillOpacity={1} 
                            fill="url(#colorETH)" 
                          />
                          <Area 
                            type="monotone" 
                            dataKey="Other" 
                            stackId="1"
                            stroke="#8B5CF6" 
                            fillOpacity={1} 
                            fill="url(#colorOther)" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <LineChart className="w-5 h-5 text-blue-500" />
                      <CardTitle>Trading Volume</CardTitle>
                    </div>
                    <CardDescription>Daily trading volume by coin (in billions USD)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={volumeData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <XAxis dataKey="date" />
                          <YAxis tickFormatter={(value) => `$${value}B`} />
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <Tooltip />
                          <Bar dataKey="BTC" stackId="a" fill="#F7931A" />
                          <Bar dataKey="ETH" stackId="a" fill="#627EEA" />
                          <Bar dataKey="Other" stackId="a" fill="#8B5CF6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="sentiment">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-500" />
                    <CardTitle>Market Sentiment Trends</CardTitle>
                  </div>
                  <CardDescription>Historical sentiment analysis from -100 (extremely bearish) to +100 (extremely bullish)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={sentimentData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorSentiment" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" />
                        <YAxis domain={[-100, 100]} />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="sentiment" 
                          stroke="#3B82F6" 
                          fillOpacity={1} 
                          fill="url(#colorSentiment)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4">Sentiment Sources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {sentiment?.sources?.map((source, index) => (
                    <Card key={index} className="glass-panel">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{source.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center mt-1">
                          {source.sentiment === 'positive' ? (
                            <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                          ) : source.sentiment === 'negative' ? (
                            <TrendingDown className="w-4 h-4 mr-2 text-red-500" />
                          ) : (
                            <Activity className="w-4 h-4 mr-2 text-blue-500" />
                          )}
                          <span className="capitalize">{source.sentiment}</span>
                          <span className="ml-auto font-medium">
                            {source.score > 0 ? '+' : ''}{source.score}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {/* If no sentiment data yet, show placeholders */}
                  {(!sentiment?.sources || sentiment.sources.length === 0) && !isLoading && (
                    <>
                      <Card className="glass-panel">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Social Media</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center mt-1">
                            <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                            <span>Positive</span>
                            <span className="ml-auto font-medium">+65</span>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="glass-panel">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">News Headlines</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center mt-1">
                            <Activity className="w-4 h-4 mr-2 text-blue-500" />
                            <span>Neutral</span>
                            <span className="ml-auto font-medium">+5</span>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="glass-panel">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Technical Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center mt-1">
                            <TrendingDown className="w-4 h-4 mr-2 text-red-500" />
                            <span>Negative</span>
                            <span className="ml-auto font-medium">-30</span>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="glass-panel">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">On-Chain Data</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center mt-1">
                            <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                            <span>Positive</span>
                            <span className="ml-auto font-medium">+40</span>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="correlations">
              <Card className="text-center p-10">
                <CardTitle className="mb-4">Coming Soon</CardTitle>
                <CardDescription>
                  Advanced correlation analysis between different crypto assets and traditional markets.
                </CardDescription>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Card>
            <CardHeader>
              <CardTitle>AI Market Prediction</CardTitle>
              <CardDescription>
                Generated using historical data, market sentiment, and trend analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                <p className="text-gray-800 dark:text-gray-200">
                  {isLoading ? (
                    <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  ) : (
                    sentiment?.overall === 'positive' ?
                    "Based on current market sentiment and technical indicators, the crypto market appears to be in a bullish phase. Bitcoin is showing strong support levels and Ethereum is gaining momentum after recent upgrades. Consider maintaining or gradually increasing exposure to major cryptocurrencies while keeping a diversified portfolio." :
                    sentiment?.overall === 'negative' ?
                    "Market indicators suggest a cautious approach is warranted. Recent volatility and negative sentiment could signal a short-term downtrend. Consider protecting your portfolio with stop-loss orders and potentially increasing stablecoin positions. Monitor key support levels for potential buying opportunities if the market continues to decline." :
                    "The crypto market is currently showing mixed signals. While institutional adoption continues to grow, regulatory uncertainty remains a concern. Consider maintaining your current asset allocation without significant changes, focusing on blue-chip cryptocurrencies, and keeping sufficient liquidity to capitalize on potential opportunities."
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MarketInsights;
