
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCryptoNewsWithSentiment } from "@/utils/geminiApi";
import { CryptoNews } from "@/types/crypto";
import { Clock, TrendingUp, TrendingDown, Newspaper } from "lucide-react";

const News = () => {
  const [news, setNews] = useState<CryptoNews[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const newsData = await getCryptoNewsWithSentiment();
        setNews(newsData);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'negative':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Generate placeholder news if none is available
  const placeholderNews: CryptoNews[] = isLoading ? [] : news.length ? news : [
    {
      id: '1',
      title: 'Bitcoin reaches new all-time high amid institutional adoption',
      source: 'CryptoNews',
      url: '#',
      published_at: new Date().toISOString(),
      sentiment: 'positive'
    },
    {
      id: '2',
      title: 'Ethereum upgrade postponed after security vulnerability found',
      source: 'BlockchainReport',
      url: '#',
      published_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      sentiment: 'negative'
    },
    {
      id: '3',
      title: 'Crypto regulation framework proposed by central banks',
      source: 'FinanceToday',
      url: '#',
      published_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      sentiment: 'neutral'
    }
  ];

  const displayedNews = news.length ? news : placeholderNews;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-12 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Crypto News & Market Insights
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Stay informed with AI-curated news and sentiment analysis
              </p>
            </div>
            
            <Tabs defaultValue="latest" className="w-full">
              <TabsList className="mb-8 flex justify-center">
                <TabsTrigger value="latest" className="px-6">Latest News</TabsTrigger>
                <TabsTrigger value="trending" className="px-6">Trending</TabsTrigger>
                <TabsTrigger value="bullish" className="px-6">Bullish</TabsTrigger>
                <TabsTrigger value="bearish" className="px-6">Bearish</TabsTrigger>
              </TabsList>
              
              <TabsContent value="latest" className="space-y-6">
                {isLoading ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                      <Card key={i} className="animate-pulse">
                        <CardHeader className="pb-4">
                          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                        </CardHeader>
                        <CardContent>
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {displayedNews.map((item) => (
                      <Card key={item.id} className="hover:shadow-md transition-shadow overflow-hidden">
                        <CardHeader className="pb-4">
                          <div className="flex justify-between items-start mb-2">
                            <Badge className={getSentimentColor(item.sentiment)}>
                              {item.sentiment === 'positive' ? <TrendingUp className="w-3 h-3 mr-1" /> :
                               item.sentiment === 'negative' ? <TrendingDown className="w-3 h-3 mr-1" /> :
                               <Newspaper className="w-3 h-3 mr-1" />}
                              {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
                            </Badge>
                            <span className="text-xs text-gray-500 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {formatDate(item.published_at)}
                            </span>
                          </div>
                          <CardTitle className="text-xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            <a href={item.url} target="_blank" rel="noopener noreferrer">
                              {item.title}
                            </a>
                          </CardTitle>
                          <CardDescription className="text-sm">
                            Source: {item.source}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {item.summary || "Latest developments in the crypto space with implications for investors and the broader market."}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="trending" className="space-y-6">
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Coming soon: Trending stories based on social media engagement.
                </p>
              </TabsContent>
              
              <TabsContent value="bullish" className="space-y-6">
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Coming soon: News with positive market sentiment.
                </p>
              </TabsContent>
              
              <TabsContent value="bearish" className="space-y-6">
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Coming soon: News with negative market sentiment.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default News;
