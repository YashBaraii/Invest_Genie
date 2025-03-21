
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { generateGeminiResponse } from "@/utils/geminiApi";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

type Message = {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
};

// Initial welcome message
const WELCOME_MESSAGE = {
  id: '1',
  type: 'bot' as const,
  text: "Hello! I'm your AI Crypto Advisor powered by Gemini AI. How can I help with your investment decisions today?",
  timestamp: new Date()
};

const AdvisorBot = () => {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessageId = Date.now().toString();
    const userMessage: Message = {
      id: userMessageId,
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    try {
      // Call Gemini API
      const response = await generateGeminiResponse(inputValue);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error("Error generating response:", error);
      
      // Fallback response in case of error
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: "I'm sorry, I encountered an error processing your request. Please try again later.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  // Controlled smooth scrolling when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      // Use requestAnimationFrame to ensure DOM has updated
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end"
        });
      });
    }
  }, [messages]);

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden flex flex-col h-[500px] sticky top-4">
      {/* Chat Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
            <Bot size={20} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold">AI Crypto Advisor</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Powered by Gemini AI
            </p>
          </div>
        </div>
      </div>
      
      {/* Messages Container with ScrollArea */}
      <ScrollArea 
        ref={scrollAreaRef} 
        className="flex-grow p-4 bg-gray-50 dark:bg-gray-900/20"
      >
        <div className="space-y-4 pb-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.type === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-3 flex flex-col",
                  message.type === "user"
                    ? "bg-blue-600 text-white rounded-tr-none"
                    : "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-tl-none"
                )}
              >
                <div className="flex items-center mb-1">
                  {message.type === "bot" ? (
                    <Bot size={14} className="mr-1 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <User size={14} className="mr-1" />
                  )}
                  <span className="text-xs font-medium">
                    {message.type === "user" ? "You" : "AI Advisor"}
                  </span>
                  <span className="text-xs ml-auto opacity-70">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                <p className={message.type === "user" ? "text-white" : "text-gray-800 dark:text-gray-200"}>
                  {message.text}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-tl-none px-4 py-3 flex items-center">
                <RefreshCw size={16} className="text-blue-600 dark:text-blue-400 animate-spin mr-2" />
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  Analyzing crypto data...
                </span>
              </div>
            </div>
          )}
          
          {/* Invisible element to scroll to */}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {/* Input Area */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <form onSubmit={handleSubmit} className="flex items-center">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about crypto investments..."
            className="flex-grow min-h-[40px] max-h-[120px] px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-l-xl bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 resize-none"
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (inputValue.trim()) {
                  handleSubmit(e);
                }
              }
            }}
          />
          <Button
            type="submit"
            className="crypto-button rounded-l-none h-full"
            disabled={isLoading || !inputValue.trim()}
          >
            <Send size={16} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdvisorBot;
