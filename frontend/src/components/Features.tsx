
import { 
  BrainCircuit, 
  LineChart, 
  Shield, 
  TrendingUp, 
  MessageSquare, 
  RefreshCcw
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <BrainCircuit className="h-8 w-8 text-blue-600" />,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze market trends, news, and on-chain data to provide accurate investment insights.",
    },
    {
      icon: <LineChart className="h-8 w-8 text-purple-600" />,
      title: "Market Intelligence",
      description: "Real-time cryptocurrency market data with price tracking, trend analysis, and market sentiment indicators.",
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Risk Management",
      description: "Personalized risk assessment and portfolio diversification recommendations tailored to your risk tolerance.",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: "Smart Predictions",
      description: "AI-generated forecasts and predictions based on historical data, market patterns, and sentiment analysis.",
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-purple-600" />,
      title: "24/7 AI Chatbot",
      description: "Ask questions, get investment advice, and stay informed with our intelligent crypto assistant.",
    },
    {
      icon: <RefreshCcw className="h-8 w-8 text-green-600" />,
      title: "Portfolio Rebalancing",
      description: "Smart recommendations on when to rebalance your portfolio for optimal performance and risk management.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50/50 dark:bg-gray-900/50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 inset-0 opacity-25 pointer-events-none">
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full filter blur-3xl opacity-30" />
        <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full filter blur-3xl opacity-30" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Intelligent Features for Smarter Investments
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Our platform combines AI technology with financial expertise to help you make informed crypto investment decisions.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass-card rounded-2xl p-8 card-hover"
            >
              <div className="mb-5 bg-gray-100 dark:bg-gray-800 rounded-xl p-3 inline-flex">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
