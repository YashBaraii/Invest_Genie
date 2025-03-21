
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RefreshCw, SendIcon, User, Bot, Star, ArrowUpRight, Brain, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { getUserInvestmentHistory, getUserProfile } from "@/services/investmentService.ts";
import { CryptoCurrency, PortfolioRecommendation } from "@/types/crypto";
import { fetchTopCryptos } from "@/lib/api";
import { DashboardLayout } from "@/components/DashboardLayout.tsx";

// Message types for chat
interface Message {
  id: string;
  type: "user" | "bot";
  text: string;
  timestamp: Date;
  data?: any; // For additional structured data
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      text: "Hello! I'm your AI investment assistant. I can help you analyze your portfolio, provide market insights, and answer your investment questions. What would you like to know today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cryptoData, setCryptoData] = useState<CryptoCurrency[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadCryptoData = async () => {
      try {
        const data = await fetchTopCryptos();
        setCryptoData(data);
      } catch (error) {
        console.error("Error loading crypto data:", error);
      }
    };

    loadCryptoData();
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI processing delay
    setTimeout(() => {
      processUserMessage(userMessage);
    }, 1000);
  };

  const processUserMessage = async (userMessage: Message) => {
    // This would typically call an AI backend API
    // Here we'll use some pattern matching to simulate AI responses

    const text = userMessage.text.toLowerCase();
    let response: Message;

    try {
      // Handle portfolio-related questions
      if (text.includes("portfolio") || text.includes("investments")) {
        const history = await getUserInvestmentHistory('user-123');
        const totalValue = history.reduce((sum, inv) => sum + (inv.amount * inv.currentPrice), 0);
        const performance = history.reduce((sum, inv) => sum + (inv.performance * (inv.amount * inv.currentPrice) / totalValue), 0);

        response = {
          id: Date.now().toString(),
          type: "bot",
          text: `Your portfolio is currently valued at $${totalValue.toFixed(2)}. Overall performance is ${performance.toFixed(2)}%. Your best performing asset is Bitcoin (+${history[0].performance.toFixed(2)}%).`,
          timestamp: new Date(),
          data: {
            type: "portfolio",
            totalValue,
            performance,
            assets: history.map(inv => ({
              name: inv.cryptoId,
              performance: inv.performance,
              value: inv.amount * inv.currentPrice
            }))
          }
        };
      }
      // Handle market-related questions
      else if (text.includes("market") || text.includes("prices")) {
        response = {
          id: Date.now().toString(),
          type: "bot",
          text: `Here's the current market overview: Bitcoin is at $${cryptoData[0]?.current_price.toFixed(2)}, Ethereum is at $${cryptoData[1]?.current_price.toFixed(2)}. The overall market sentiment is cautiously optimistic with institutional investors continuing to accumulate.`,
          timestamp: new Date(),
          data: {
            type: "market",
            cryptos: cryptoData.slice(0, 3)
          }
        };
      }
      // Handle recommendation requests
      else if (text.includes("recommend") || text.includes("suggest") || text.includes("advice")) {
        const profile = await getUserProfile();

        response = {
          id: Date.now().toString(),
          type: "bot",
          text: `Based on your ${profile.riskProfile} risk profile and ${profile.timeframe} investment timeframe, I recommend allocating 50% to Bitcoin, 30% to Ethereum, and 20% to Solana. This balances potential growth with stability. Would you like more specific details?`,
          timestamp: new Date(),
          data: {
            type: "recommendation",
            profile,
            recommendation: {
              assets: [
                { name: "Bitcoin", percentage: 50 },
                { name: "Ethereum", percentage: 30 },
                { name: "Solana", percentage: 20 }
              ]
            }
          }
        };
      }
      // Handle risk assessment question
      else if (text.includes("risk") && (text.includes("assessment") || text.includes("profile"))) {
        const profile = await getUserProfile();

        response = {
          id: Date.now().toString(),
          type: "bot",
          text: `Based on your investment history and preferences, your risk profile is ${profile.riskProfile.toUpperCase()}. This means you're comfortable with ${profile.riskProfile === 'high' ? 'significant market volatility for potentially higher returns' : profile.riskProfile === 'medium' ? 'moderate market fluctuations for balanced growth' : 'minimal volatility with steady but conservative returns'}.`,
          timestamp: new Date(),
          data: {
            type: "risk",
            profile
          }
        };
      }
      // Handle AI explanation requests
      else if (text.includes("how") && (text.includes("work") || text.includes("learn"))) {
        response = {
          id: Date.now().toString(),
          type: "bot",
          text: "I analyze your investment history, risk profile, and current market conditions. I learn from successful and unsuccessful investments to improve my recommendations over time. Your feedback on investment performance helps train the model to better understand your preferences and market patterns.",
          timestamp: new Date(),
        };
      }
      // Default response
      else {
        response = {
          id: Date.now().toString(),
          type: "bot",
          text: "I'm here to help with your investment questions. You can ask about your portfolio, market conditions, or request personalized recommendations. If you'd like to know how I work, just ask!",
          timestamp: new Date(),
        };
      }

      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error("Error processing message:", error);

      // Error response
      response = {
        id: Date.now().toString(),
        type: "bot",
        text: "I'm sorry, I encountered an error while processing your request. Please try again.",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, response]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessageContent = (message: Message) => {
    if (message.type === "user") {
      return <p className="text-sm md:text-base whitespace-pre-wrap break-words">{message.text}</p>;
    }

    // Render bot messages with any special data
    if (!message.data) {
      return <p className="text-sm md:text-base whitespace-pre-wrap break-words">{message.text}</p>;
    }

    // Additional visualizations could be added based on message.data.type
    return (
      <div className="w-full">
        <p className="text-sm md:text-base whitespace-pre-wrap break-words">{message.text}</p>

        {message.data.type === "portfolio" && (
          <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex justify-between mb-2">
              <span>Total Value:</span>
              <span className="font-medium">${message.data.totalValue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Performance:</span>
              <span className={`font-medium ${message.data.performance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {message.data.performance >= 0 ? '+' : ''}{message.data.performance.toFixed(2)}%
              </span>
            </div>
          </div>
        )}

        {message.data.type === "recommendation" && (
          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm font-medium mb-2">Recommended Allocation:</p>
            <div className="space-y-2">
              {message.data.recommendation.assets.map((asset: any, idx: number) => (
                <div key={idx} className="flex justify-between">
                  <span>{asset.name}</span>
                  <span className="font-medium">{asset.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {message.data.type === "market" && message.data.cryptos && (
          <div className="mt-3 space-y-2">
            {message.data.cryptos.map((crypto: CryptoCurrency) => (
              <div key={crypto.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center">
                  <img src={crypto.image} alt={crypto.name} className="w-6 h-6 mr-2 rounded-full" />
                  <span>{crypto.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-2">${crypto.current_price.toFixed(2)}</span>
                  <span className={crypto.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {crypto.price_change_percentage_24h >= 0 ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 transform rotate-180" />
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <DashboardLayout>

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow bg-white dark:bg-gray-950 pt-16">
          <div className="container mx-auto px-4 py-6 flex h-[calc(100vh-180px)]">
            <div className={`flex flex-col ${sidebarOpen ? 'lg:w-3/4' : 'w-full'} transition-all duration-300`}>
              <div className="bg-gray-100/50 dark:bg-gray-900/50 p-4 rounded-t-xl flex items-center justify-between">
                <div className="flex items-center">
                  <Brain className="mr-2 h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">AI Investment Assistant</h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden"
                >
                  {sidebarOpen ? (
                    <PanelLeftClose className="h-5 w-5" />
                  ) : (
                    <PanelLeftOpen className="h-5 w-5" />
                  )}
                </Button>
              </div>

              <Card className="flex-1 rounded-t-none">
                <CardContent className="p-0 h-full flex flex-col">
                  <ScrollArea className="flex-1 p-4 h-[calc(100vh-300px)]">
                    <div className="space-y-4 pb-2 pr-2">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.type === "user" ? "justify-end" : "justify-start"
                            }`}
                        >
                          <div
                            className={`flex items-start max-w-[85%] ${message.type === "user"
                                ? "bg-primary text-white"
                                : "bg-gray-100 dark:bg-gray-800"
                              } rounded-2xl p-3 ${message.type === "user" ? "rounded-tr-none" : "rounded-tl-none"
                              }`}
                          >
                            {message.type === "bot" && (
                              <Bot className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                            )}

                            <div className="flex-1 overflow-hidden">
                              {renderMessageContent(message)}
                              <div
                                className={`text-xs mt-1 ${message.type === "user"
                                    ? "text-white/70"
                                    : "text-gray-500"
                                  } text-right`}
                              >
                                {formatTimestamp(message.timestamp)}
                              </div>
                            </div>

                            {message.type === "user" && (
                              <User className="w-5 h-5 ml-2 mt-0.5 flex-shrink-0" />
                            )}
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-none p-3">
                            <div className="flex items-center">
                              <Bot className="w-5 h-5 mr-2" />
                              <RefreshCw className="w-4 h-4 animate-spin" />
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  <div className="p-4 border-t dark:border-gray-800">
                    <form onSubmit={handleSubmit} className="flex space-x-2">
                      <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about your portfolio, market insights, or investment advice..."
                        className="resize-none min-h-[3rem] max-h-[6rem]"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            if (input.trim()) {
                              handleSubmit(e);
                            }
                          }
                        }}
                      />
                      <Button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="flex-shrink-0"
                      >
                        <SendIcon className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </div>

            {sidebarOpen && (
              <div className="hidden lg:block lg:w-1/4 ml-4">
                <div className="bg-gray-100/50 dark:bg-gray-900/50 p-4 rounded-t-xl">
                  <h3 className="font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    Suggested Questions
                  </h3>
                </div>

                <Card className="rounded-t-none">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left font-normal h-auto py-2"
                        onClick={() => {
                          setInput("How is my portfolio performing?");
                          setTimeout(() => {
                            const mockEvent = { preventDefault: () => { } } as React.FormEvent;
                            handleSubmit(mockEvent);
                          }, 100);
                        }}
                      >
                        How is my portfolio performing?
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left font-normal h-auto py-2"
                        onClick={() => {
                          setInput("What are the current market conditions?");
                          setTimeout(() => {
                            const mockEvent = { preventDefault: () => { } } as React.FormEvent;
                            handleSubmit(mockEvent);
                          }, 100);
                        }}
                      >
                        What are the current market conditions?
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left font-normal h-auto py-2"
                        onClick={() => {
                          setInput("Can you recommend investments for me?");
                          setTimeout(() => {
                            const mockEvent = { preventDefault: () => { } } as React.FormEvent;
                            handleSubmit(mockEvent);
                          }, 100);
                        }}
                      >
                        Can you recommend investments for me?
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left font-normal h-auto py-2"
                        onClick={() => {
                          setInput("How does your AI learning system work?");
                          setTimeout(() => {
                            const mockEvent = { preventDefault: () => { } } as React.FormEvent;
                            handleSubmit(mockEvent);
                          }, 100);
                        }}
                      >
                        How does your AI learning system work?
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left font-normal h-auto py-2"
                        onClick={() => {
                          setInput("What's my risk assessment?");
                          setTimeout(() => {
                            const mockEvent = { preventDefault: () => { } } as React.FormEvent;
                            handleSubmit(mockEvent);
                          }, 100);
                        }}
                      >
                        What's my risk assessment?
                      </Button>
                    </div>

                    <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        Your AI assistant learns from your feedback. The more you interact, the more personalized your recommendations become.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </DashboardLayout>
  );
};

export default Chat;