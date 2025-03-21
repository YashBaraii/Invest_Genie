
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { Plus, Wallet, ArrowUpRight, ArrowDownRight, Percent } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout.tsx";

const dummyPortfolioData = [
  { name: "Bitcoin", symbol: "BTC", amount: 0.5, value: 30000, allocation: 60, color: "#F7931A" },
  { name: "Ethereum", symbol: "ETH", amount: 5, value: 15000, allocation: 30, color: "#627EEA" },
  { name: "Solana", symbol: "SOL", amount: 20, value: 3000, allocation: 6, color: "#00FFA3" },
  { name: "Cardano", symbol: "ADA", amount: 500, value: 2000, allocation: 4, color: "#0033AD" },
];

const performanceData = [
  { date: "Jan", value: 10000 },
  { date: "Feb", value: 12000 },
  { date: "Mar", value: 9000 },
  { date: "Apr", value: 15000 },
  { date: "May", value: 20000 },
  { date: "Jun", value: 18000 },
  { date: "Jul", value: 22000 },
  { date: "Aug", value: 25000 },
  { date: "Sep", value: 30000 },
  { date: "Oct", value: 40000 },
  { date: "Nov", value: 38000 },
  { date: "Dec", value: 50000 },
];

const Portfolio = () => {
  const [timeRange, setTimeRange] = useState("1Y");

  const totalValue = dummyPortfolioData.reduce((acc, curr) => acc + curr.value, 0);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  return (
    <DashboardLayout>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
        <div className="min-h-screen flex flex-col">
          <Navbar />

          <main className="flex-grow bg-white dark:bg-gray-950">
            <div className="container mx-auto px-4 md:px-6 py-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold">Your Portfolio</h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Track your crypto investments in one place</p>
                </div>
                <div className="flex space-x-4 mt-4 md:mt-0">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Wallet className="w-4 h-4" />
                    Connect Wallet
                  </Button>
                  <Button className="crypto-button flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Assets
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Portfolio Value</CardDescription>
                    <CardTitle className="text-3xl">{formatCurrency(totalValue)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-emerald-600 dark:text-emerald-400">
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                      <span className="font-medium">+15.3%</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-2 text-sm">all time</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>24h Change</CardDescription>
                    <CardTitle className="text-3xl text-emerald-600 dark:text-emerald-400">+2.4%</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">
                      {formatCurrency(1200)} increase since yesterday
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Risk Assessment</CardDescription>
                    <CardTitle className="text-3xl">Medium</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Percent className="w-4 h-4 mr-1 text-yellow-500" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Suggested: Diversify into stablecoins
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Performance History</CardTitle>
                      <div className="flex space-x-2">
                        {["1M", "3M", "6M", "1Y", "All"].map((range) => (
                          <Button
                            key={range}
                            variant={timeRange === range ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTimeRange(range)}
                            className="text-xs"
                          >
                            {range}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={performanceData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="date" />
                          <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#3B82F6"
                            fillOpacity={1}
                            fill="url(#colorValue)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Allocation</CardTitle>
                    <CardDescription>Asset distribution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[240px] flex justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={dummyPortfolioData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="allocation"
                          >
                            {dummyPortfolioData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Legend
                            layout="vertical"
                            verticalAlign="middle"
                            align="right"
                            formatter={(value) => {
                              const asset = dummyPortfolioData.find(item => item.name === value);
                              return <span>{value} ({asset?.allocation}%)</span>;
                            }}
                          />
                          <Tooltip
                            formatter={(value) => `${value}%`}
                            labelFormatter={(_, payload) => {
                              const asset = payload?.[0]?.payload;
                              return asset ? `${asset.name} (${asset.symbol})` : '';
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Your Assets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-4">Asset</th>
                          <th className="text-right py-3 px-4">Price</th>
                          <th className="text-right py-3 px-4">Holdings</th>
                          <th className="text-right py-3 px-4">Value</th>
                          <th className="text-right py-3 px-4">Allocation</th>
                          <th className="text-right py-3 px-4">24h Change</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dummyPortfolioData.map((asset) => (
                          <tr key={asset.symbol} className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900">
                            <td className="py-4 px-4">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full mr-3" style={{ backgroundColor: asset.color }}></div>
                                <div>
                                  <div className="font-medium">{asset.name}</div>
                                  <div className="text-gray-500 dark:text-gray-400 text-sm">{asset.symbol}</div>
                                </div>
                              </div>
                            </td>
                            <td className="text-right py-4 px-4">{formatCurrency(asset.value / asset.amount)}</td>
                            <td className="text-right py-4 px-4">{asset.amount} {asset.symbol}</td>
                            <td className="text-right py-4 px-4 font-medium">{formatCurrency(asset.value)}</td>
                            <td className="text-right py-4 px-4">{asset.allocation}%</td>
                            <td className="text-right py-4 px-4">
                              <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400">
                                <ArrowUpRight className="w-4 h-4 mr-1" />
                                2.3%
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>

          <Footer />
        </div>
        <div className="glass-panel rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Your Portfolio</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Portfolio content coming soon...
          </p>
        </div>
      {/* </div> */}
    {/* </div> */}
    </DashboardLayout >
  );
};

export default Portfolio;
