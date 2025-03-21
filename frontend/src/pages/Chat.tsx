import Navbar from "@/components/Navbar";
import AdvisorBot from "@/components/AdvisorBot";
import Footer from "@/components/Footer";

const Chat = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow mt-[72px] py-8">
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Chat; 