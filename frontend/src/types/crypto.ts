
export interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
}

export type RiskProfile = 'low' | 'medium' | 'high';

export type InvestmentTimeframe = 'short' | 'medium' | 'long' | 'hodl';

export interface PortfolioRecommendation {
  riskProfile: RiskProfile;
  timeframe: InvestmentTimeframe;
  allocations: {
    coinId: string;
    percentage: number;
    reasoning: string;
  }[];
}

export interface MarketSentiment {
  overall: 'positive' | 'neutral' | 'negative';
  score: number; // -100 to 100
  sources: {
    name: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    score: number;
  }[];
}

export interface CryptoNews {
  id: string;
  title: string;
  url: string;
  source: string;
  published_at: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  summary?: string; // Added summary property as optional
}
