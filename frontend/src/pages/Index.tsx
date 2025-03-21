import { useEffect } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import LiveMarket from "@/components/LiveMarket";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AdvisorBot from "@/components/AdvisorBot";

const Index = () => {
  useEffect(() => {
    // Reset scroll position and prevent auto-scrolling
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    
    // Add scroll behavior smooth for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
          <Hero />
        </section>

        {/* Live Market Section */}
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 md:px-6">
            <LiveMarket />
          </div>
        </section>

        {/* Features Section */}
        <Features />

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50/50 dark:bg-gray-900/50 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute right-0 top-0 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full filter blur-3xl opacity-30" />
            <div className="absolute left-0 bottom-0 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full filter blur-3xl opacity-30" />
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Trusted by Crypto Investors
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                See what our users are saying about their investment journey with InvestGenius.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  name: "Alex Thompson",
                  title: "Crypto Trader",
                  quote: "The AI recommendations have completely transformed my investment strategy. I've seen a 30% increase in my portfolio value since using InvestGenius."
                },
                {
                  name: "Sarah Johnson",
                  title: "Long-term Investor",
                  quote: "I love how the platform balances risk and provides smart diversification advice. The chatbot is incredibly helpful for answering my questions 24/7."
                },
                {
                  name: "Michael Chen",
                  title: "DeFi Enthusiast",
                  quote: "InvestGenius helped me navigate the complex world of DeFi projects with confidence. The sentiment analysis feature is a game changer."
                }
              ].map((testimonial, index) => (
                <div key={index} className="glass-card rounded-2xl p-8 card-hover">
                  <div className="flex flex-col h-full">
                    <div className="flex-grow">
                      <svg className="h-8 w-8 text-blue-500 mb-4" fill="currentColor" viewBox="0 0 32 32">
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                      <p className="text-gray-700 dark:text-gray-300 mb-6">
                        {testimonial.quote}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Assistant Section */}
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                24/7 AI Crypto Assistant
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Get instant answers to your crypto questions and personalized investment advice.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <AdvisorBot />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white dark:bg-gray-950 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Make Smarter Crypto Investments?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Join thousands of investors who are using AI to inform their crypto investment decisions and maximize returns.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/dashboard" className="crypto-button text-base h-12 px-8">
                  Get Started Now
                </Link>
                <Link to="/advisor" className="crypto-button-outline text-base h-12 px-8">
                  Explore Features
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
