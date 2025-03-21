import { CryptoNews, MarketSentiment } from "@/types/crypto";

const GEMINI_API_KEY ="AIzaSyCE0cUlGzUmAgFubB722E96zjZM0EUcvGc";  // Replace with your actual API key

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

export async function generateGeminiResponse(prompt: string): Promise<string> {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an AI Crypto Investment Advisor helping users make informed decisions. 
                  Answer the following query about cryptocurrency investing in a helpful, informative way.
                  Keep responses concise (under 150 words) and focus on balanced investment advice.
                  
                  User query: ${prompt}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: GeminiResponse = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
  }
}

export async function getCryptoMarketSentiment(): Promise<MarketSentiment> {
  const sentimentPrompt = "Analyze the current crypto market sentiment. Is it overall positive, neutral, or negative? Provide a short analysis with a sentiment score from -100 to 100.";
  
  try {
    const response = await generateGeminiResponse(sentimentPrompt);
    
    // Parse the response to extract sentiment information
    // This is a simplified version - in a real app, you'd want more robust parsing
    const isPositive = response.toLowerCase().includes("positive");
    const isNegative = response.toLowerCase().includes("negative");
    
    const sentiment: MarketSentiment = {
      overall: isPositive ? "positive" : (isNegative ? "negative" : "neutral"),
      score: isPositive ? 50 : (isNegative ? -50 : 0),
      sources: [
        {
          name: "Gemini AI Analysis",
          sentiment: isPositive ? "positive" : (isNegative ? "negative" : "neutral"),
          score: isPositive ? 50 : (isNegative ? -50 : 0),
        }
      ]
    };
    
    return sentiment;
  } catch (error) {
    console.error("Error getting market sentiment:", error);
    return {
      overall: "neutral",
      score: 0,
      sources: [{
        name: "Error",
        sentiment: "neutral",
        score: 0
      }]
    };
  }
}

export async function getCryptoNewsWithSentiment(): Promise<CryptoNews[]> {
  const newsPrompt = "What are the 3 most important recent crypto news stories? For each, provide a title, source, and whether the sentiment is positive, neutral, or negative.";
  
  try {
    const response = await generateGeminiResponse(newsPrompt);
    
    // This is a simplified implementation
    // A real implementation would parse the structured data from the response
    const news: CryptoNews[] = [
      {
        id: "1",
        title: "Gemini AI Generated News",
        url: "#",
        source: "AI Analysis",
        published_at: new Date().toISOString(),
        sentiment: "neutral",
        summary: "Latest developments in the crypto space with implications for investors and the broader market."
      }
    ];
    
    return news;
  } catch (error) {
    console.error("Error getting crypto news:", error);
    return [];
  }
}
