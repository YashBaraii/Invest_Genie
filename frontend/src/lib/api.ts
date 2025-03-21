
import { CryptoCurrency, CryptoNews, MarketSentiment } from "@/types/crypto";

// Top cryptocurrencies data - using mock data for now
// In production, this would fetch from CoinGecko/Binance API
export const fetchTopCryptos = async (): Promise<CryptoCurrency[]> => {
  try {
    // For demo purposes using a public API with no key required
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en"
    );

    if (!response.ok) {
      // If API fails, return mock data
      return mockCryptoData;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    // Return mock data if API fails
    return mockCryptoData;
  }
};

// Mock market sentiment data
export const fetchMarketSentiment = async (): Promise<MarketSentiment> => {
  // This would be connected to a real sentiment analysis API
  return {
    overall: "positive",
    score: 65,
    sources: [
      { name: "Twitter", sentiment: "positive", score: 72 },
      { name: "Reddit", sentiment: "positive", score: 68 },
      { name: "News Articles", sentiment: "neutral", score: 55 }
    ]
  };
};

// Mock crypto news
export const fetchCryptoNews = async (): Promise<CryptoNews[]> => {
  // This would be connected to a news API
  return [
    {
      id: "1",
      title: "Bitcoin Surges Past $60K as Institutional Adoption Grows",
      url: "#",
      source: "CryptoNews",
      published_at: new Date(Date.now() - 3600000).toISOString(),
      sentiment: "positive",
      summary: "Bitcoin has surged past $60,000 as institutional investors continue to show interest in the leading cryptocurrency."
    },
    {
      id: "2",
      title: "Ethereum 2.0 Upgrade Expected to Improve Network Efficiency",
      url: "#",
      source: "CoinDesk",
      published_at: new Date(Date.now() - 7200000).toISOString(),
      sentiment: "positive",
      summary: "The Ethereum 2.0 upgrade is on track and expected to significantly improve the network's efficiency and scalability."
    },
    {
      id: "3",
      title: "Regulators Debate New Crypto Taxation Framework",
      url: "#",
      source: "Bloomberg",
      published_at: new Date(Date.now() - 10800000).toISOString(),
      sentiment: "neutral",
      summary: "Regulators across several countries are discussing potential frameworks for cryptocurrency taxation and reporting."
    },
    {
      id: "4",
      title: "Solana Network Experiences Brief Outage, Quickly Recovered",
      url: "#",
      source: "CryptoReport",
      published_at: new Date(Date.now() - 14400000).toISOString(),
      sentiment: "negative",
      summary: "The Solana blockchain experienced a brief outage due to high transaction volumes but quickly recovered within hours."
    }
  ];
};

// Mock crypto data in case API fails
const mockCryptoData: CryptoCurrency[] = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 59830.42,
    market_cap: 1184877141069,
    market_cap_rank: 1,
    fully_diluted_valuation: 1254561458609,
    total_volume: 31607862472,
    high_24h: 60312.12,
    low_24h: 58921.21,
    price_change_24h: 421.74,
    price_change_percentage_24h: 0.7092,
    market_cap_change_24h: 8295314253,
    market_cap_change_percentage_24h: 0.7049,
    circulating_supply: 19796268,
    total_supply: 21000000,
    max_supply: 21000000,
    ath: 69045,
    ath_change_percentage: -13.38928,
    ath_date: "2021-11-10T14:24:11.849Z",
    atl: 67.81,
    atl_change_percentage: 88045.87067,
    atl_date: "2013-07-06T00:00:00.000Z",
    last_updated: "2023-06-08T14:15:11.186Z"
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 3245.37,
    market_cap: 389682538025,
    market_cap_rank: 2,
    fully_diluted_valuation: null,
    total_volume: 11889246742,
    high_24h: 3287.24,
    low_24h: 3201.89,
    price_change_24h: 24.21,
    price_change_percentage_24h: 0.7506,
    market_cap_change_24h: 2890126587,
    market_cap_change_percentage_24h: 0.74758,
    circulating_supply: 120094612.241859,
    total_supply: 120094612.241859,
    max_supply: null,
    ath: 4878.26,
    ath_change_percentage: -33.49643,
    ath_date: "2021-11-10T14:24:19.604Z",
    atl: 0.432979,
    atl_change_percentage: 748583.33038,
    atl_date: "2015-10-20T00:00:00.000Z",
    last_updated: "2023-06-08T14:15:10.142Z"
  },
  {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    current_price: 142.78,
    market_cap: 61872281555,
    market_cap_rank: 5,
    fully_diluted_valuation: null,
    total_volume: 2417153231,
    high_24h: 143.59,
    low_24h: 137.46,
    price_change_24h: 2.27,
    price_change_percentage_24h: 1.61465,
    market_cap_change_24h: 1041243401,
    market_cap_change_percentage_24h: 1.71092,
    circulating_supply: 432719337.539166,
    total_supply: 553699385.66326,
    max_supply: null,
    ath: 259.96,
    ath_change_percentage: -45.09,
    ath_date: "2021-11-06T21:54:35.825Z",
    atl: 0.500801,
    atl_change_percentage: 28338.21583,
    atl_date: "2020-05-11T19:35:23.449Z",
    last_updated: "2023-06-08T14:15:15.353Z"
  },
  {
    id: "cardano",
    symbol: "ada",
    name: "Cardano",
    image: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
    current_price: 0.487659,
    market_cap: 17082969602,
    market_cap_rank: 9,
    fully_diluted_valuation: 21912089671,
    total_volume: 365816682,
    high_24h: 0.494401,
    low_24h: 0.474646,
    price_change_24h: 0.01049863,
    price_change_percentage_24h: 2.2023,
    market_cap_change_24h: 377045124,
    market_cap_change_percentage_24h: 2.25786,
    circulating_supply: 35045020830.3234,
    total_supply: 45000000000,
    max_supply: 45000000000,
    ath: 3.09,
    ath_change_percentage: -84.18661,
    ath_date: "2021-09-02T06:00:10.474Z",
    atl: 0.01925275,
    atl_change_percentage: 2433.43802,
    atl_date: "2020-03-13T02:22:55.044Z",
    last_updated: "2023-06-08T14:15:13.831Z"
  },
  {
    id: "polkadot",
    symbol: "dot",
    name: "Polkadot",
    image: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
    current_price: 6.91,
    market_cap: 8961689275,
    market_cap_rank: 13,
    fully_diluted_valuation: 9126124334,
    total_volume: 235146823,
    high_24h: 7.07,
    low_24h: 6.7,
    price_change_24h: 0.155539,
    price_change_percentage_24h: 2.30375,
    market_cap_change_24h: 205946075,
    market_cap_change_percentage_24h: 2.35273,
    circulating_supply: 1298378732.50847,
    total_supply: 1322322975.80137,
    max_supply: null,
    ath: 54.98,
    ath_change_percentage: -87.44115,
    ath_date: "2021-11-04T14:10:09.301Z",
    atl: 2.7,
    atl_change_percentage: 155.97902,
    atl_date: "2020-08-20T05:48:11.359Z",
    last_updated: "2023-06-08T14:15:10.071Z"
  }
];
