import { CryptoCurrency, MarketSentiment, RiskProfile, InvestmentTimeframe, PortfolioRecommendation } from "@/types/crypto";

// Mock investment history data
interface InvestmentHistory {
  id: string;
  userId: string;
  cryptoId: string;
  amount: number;
  purchasePrice: number;
  currentPrice: number;
  purchaseDate: string;
  status: 'active' | 'sold';
  performance: number;
  success: boolean;
}

// Mock user profile data
interface UserProfile {
  id: string;
  riskProfile: RiskProfile;
  investmentGoals: string[];
  budget: number;
  timeframe: InvestmentTimeframe;
}

// Simulate getting current user profile
export const getUserProfile = async (): Promise<UserProfile> => {
  // In a real app, this would fetch from your backend
  return {
    id: 'user-123',
    riskProfile: 'medium',
    investmentGoals: ['Growth', 'Retirement', 'Passive Income'],
    budget: 10000,
    timeframe: 'medium'
  };
};

// Simulate investment history
export const getUserInvestmentHistory = async (userId: string): Promise<InvestmentHistory[]> => {
  // In a real app, this would fetch from MongoDB
  return [
    {
      id: 'inv-1',
      userId,
      cryptoId: 'bitcoin',
      amount: 0.05,
      purchasePrice: 55000,
      currentPrice: 60000,
      purchaseDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      performance: 9.09, // (60000-55000)/55000 * 100
      success: true
    },
    {
      id: 'inv-2',
      userId,
      cryptoId: 'ethereum',
      amount: 1.2,
      purchasePrice: 3000,
      currentPrice: 3200,
      purchaseDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      performance: 6.67, // (3200-3000)/3000 * 100
      success: true
    },
    {
      id: 'inv-3',
      userId,
      cryptoId: 'solana',
      amount: 15,
      purchasePrice: 150,
      currentPrice: 140,
      purchaseDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      performance: -6.67, // (140-150)/150 * 100
      success: false
    }
  ];
};

// AI-powered investment recommendation system
export const getAIRecommendations = async (
  riskProfile: RiskProfile, 
  timeframe: InvestmentTimeframe,
  marketSentiment: MarketSentiment,
  assets: CryptoCurrency[]
): Promise<PortfolioRecommendation> => {
  // In a real app, this would call your AI model API
  // Here we're simulating an AI response based on risk profile and market conditions
  
  // Get allocations based on risk profile
  let allocations = [];
  
  // Base allocation strategy on risk profile
  switch(riskProfile) {
    case 'high':
      allocations = assets.slice(0, 5).map(asset => ({
        coinId: asset.id,
        percentage: asset.id === 'bitcoin' ? 25 : asset.id === 'ethereum' ? 20 : 
                    asset.id === 'solana' ? 30 : 15,
        reasoning: getReasoningBasedOnRisk('high', asset.id, marketSentiment, timeframe)
      }));
      break;
    case 'medium':
      allocations = assets.slice(0, 5).map(asset => ({
        coinId: asset.id,
        percentage: asset.id === 'bitcoin' ? 35 : asset.id === 'ethereum' ? 30 : 
                    asset.id === 'solana' ? 15 : 10,
        reasoning: getReasoningBasedOnRisk('medium', asset.id, marketSentiment, timeframe)
      }));
      break;
    case 'low':
      allocations = assets.slice(0, 5).map(asset => ({
        coinId: asset.id,
        percentage: asset.id === 'bitcoin' ? 50 : asset.id === 'ethereum' ? 40 : 5,
        reasoning: getReasoningBasedOnRisk('low', asset.id, marketSentiment, timeframe)
      }));
      break;
  }
  
  // Adjust based on market sentiment
  if (marketSentiment.overall === 'positive') {
    // In positive market, adjust for more growth-oriented assets
    allocations = allocations.map(alloc => ({
      ...alloc,
      percentage: alloc.coinId === 'bitcoin' ? 
        Math.max(alloc.percentage - 5, 0) : 
        alloc.coinId === 'solana' ? 
          Math.min(alloc.percentage + 5, 100) : 
          alloc.percentage
    }));
  } else if (marketSentiment.overall === 'negative') {
    // In negative market, be more conservative
    allocations = allocations.map(alloc => ({
      ...alloc,
      percentage: alloc.coinId === 'bitcoin' ? 
        Math.min(alloc.percentage + 10, 100) : 
        Math.max(alloc.percentage - 5, 0)
    }));
  }
  
  // Adjust percentages to ensure they add up to 100%
  const total = allocations.reduce((sum, item) => sum + item.percentage, 0);
  allocations = allocations.map(item => ({
    ...item,
    percentage: Math.round((item.percentage / total) * 100)
  }));
  
  return {
    riskProfile,
    timeframe,
    allocations
  };
};

// Helper to generate reasoning based on risk profile, coin, market sentiment and timeframe
function getReasoningBasedOnRisk(
  risk: RiskProfile, 
  coinId: string, 
  sentiment: MarketSentiment,
  timeframe: InvestmentTimeframe
): string {
  const timeframeText = timeframe === 'short' ? 'short-term' : 
                        timeframe === 'medium' ? 'medium-term' : 
                        timeframe === 'long' ? 'long-term' : 'HODL (very long-term)';
  
  const sentimentText = sentiment.overall === 'positive' ? 'positive' : 
                         sentiment.overall === 'negative' ? 'negative' : 'neutral';
  
  // Bitcoin reasoning
  if (coinId === 'bitcoin') {
    if (risk === 'low') {
      return `Bitcoin provides stability for ${timeframeText} investors. With ${sentimentText} market sentiment, it serves as a strong hedge against volatility.`;
    } else if (risk === 'medium') {
      return `Bitcoin offers a balance of growth and stability for ${timeframeText} investors in the current ${sentimentText} market.`;
    } else {
      return `Bitcoin provides foundation for a high-risk portfolio with ${timeframeText} outlook in the current ${sentimentText} market.`;
    }
  }
  
  // Ethereum reasoning
  if (coinId === 'ethereum') {
    if (risk === 'low') {
      return `Ethereum offers established smart contract capabilities with lower volatility than smaller altcoins. Good for ${timeframeText} investors in ${sentimentText} markets.`;
    } else if (risk === 'medium') {
      return `Ethereum balances innovation and established market position for ${timeframeText} investors in ${sentimentText} conditions.`;
    } else {
      return `Ethereum's ongoing development provides growth potential for ${timeframeText} high-risk investors in ${sentimentText} markets.`;
    }
  }
  
  // Solana reasoning
  if (coinId === 'solana') {
    if (risk === 'low') {
      return `Limited allocation to Solana provides some exposure to high-performance blockchains while maintaining ${timeframeText} safety in ${sentimentText} markets.`;
    } else if (risk === 'medium') {
      return `Solana offers higher growth potential for ${timeframeText} investors willing to accept moderate risk in ${sentimentText} market conditions.`;
    } else {
      return `Solana's high performance and ecosystem growth make it attractive for ${timeframeText} high-risk investors in ${sentimentText} markets.`;
    }
  }
  
  // Default reasoning for other coins
  return `This allocation is optimized for a ${risk}-risk ${timeframeText} strategy in ${sentimentText} market conditions.`;
}

// Simulate executing an investment
export const executeInvestment = async (
  userId: string,
  coinId: string, 
  amount: number, 
  currentPrice: number
): Promise<{ success: boolean; message: string }> => {
  // In a real app, this would create a record in your MongoDB database
  // and potentially trigger an actual purchase through an exchange API
  
  console.log(`Investment executed: ${amount} of ${coinId} at $${currentPrice}`);
  
  // Simulate API response
  return {
    success: true,
    message: `Successfully invested in ${amount} ${coinId} at $${currentPrice}`
  };
};

// Simulate feedback loop - in a real app this would update your AI model
export const submitInvestmentFeedback = async (
  investmentId: string,
  feedback: {
    performance: number;
    success: boolean;
    userRating?: number;
    comments?: string;
  }
): Promise<{ success: boolean }> => {
  // In a real app, this would submit feedback to your AI system
  console.log(`Feedback submitted for investment ${investmentId}:`, feedback);
  
  return { success: true };
};
