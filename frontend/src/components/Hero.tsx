
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, BrainCircuit } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100");
          entry.target.classList.remove("opacity-0", "translate-y-8");
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden pt-24 md:pt-32 pb-16 md:pb-24">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-gray-50 dark:from-gray-900 dark:to-gray-950 -z-10" />
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full filter blur-3xl opacity-70" />
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-blue-300 dark:bg-blue-900 rounded-full filter blur-3xl opacity-70" />
      </div>

      <div 
        ref={heroRef}
        className="container mx-auto px-4 md:px-6 transition-all duration-1000 ease-out opacity-0 translate-y-8"
      >
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 animate-fade-in-down">
            <BrainCircuit size={16} className="mr-2" />
            AI-Powered Investment Intelligence
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            <span className="crypto-gradient-text">AI-Powered</span> Crypto Investment Advisor
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl">
            Make smarter crypto investments with AI-driven insights, market analysis, and personalized recommendations.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <Link to="/dashboard">
              <Button className="crypto-button text-base h-12 px-8">
                Get Started <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
            <Link to="/advisor">
              <Button variant="outline" className="crypto-button-outline text-base h-12 px-8">
                Try Demo
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
            <div className="glass-card rounded-2xl p-6 text-center card-hover">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full inline-flex items-center justify-center mb-4">
                <BrainCircuit size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Advanced AI algorithms analyze market trends and patterns
              </p>
            </div>
            
            <div className="glass-card rounded-2xl p-6 text-center card-hover">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full inline-flex items-center justify-center mb-4">
                <TrendingUp size={24} className="text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Insights</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get personalized portfolio recommendations based on your goals
              </p>
            </div>
            
            <div className="glass-card rounded-2xl p-6 text-center card-hover">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full inline-flex items-center justify-center mb-4">
                <Shield size={24} className="text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Risk Management</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Balance your portfolio with intelligent risk assessment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
