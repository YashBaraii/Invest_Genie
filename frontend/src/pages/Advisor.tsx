
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import AdvisorBot from "@/components/AdvisorBot";
import Footer from "@/components/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { InvestmentTimeframe, RiskProfile } from "@/types/crypto";
import { Textarea } from "@/components/ui/textarea"
import { DashboardLayout } from "@/components/DashboardLayout.tsx";



type FormData = {
  riskProfile: RiskProfile;
  timeframe: InvestmentTimeframe;
  goals: string;
};

const Advisor = () => {
  // Smooth scroll effect
  useEffect(() => {
    document.documentElement.classList.add('scroll-smooth');
    return () => {
      document.documentElement.classList.remove('scroll-smooth');
    };
  }, []);

  const form = useForm<FormData>({
    defaultValues: {
      riskProfile: 'medium',
      timeframe: 'medium',
      goals: '',
    },
  });

  return (
    <DashboardLayout>

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow">
          <section className="py-16 bg-white dark:bg-gray-950">
            <div className="container mx-auto px-4 md:px-6">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  AI Crypto Advisor
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Get instant answers to your crypto questions and personalized investment advice.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                {/* Left side: Input form */}
                <div className="glass-panel p-6 rounded-2xl">
                  <h2 className="text-2xl font-semibold mb-6">Your Investment Profile</h2>

                  <Form {...form}>
                    <form className="space-y-6">
                      <FormField
                        control={form.control}
                        name="riskProfile"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Risk Tolerance</FormLabel>
                            <div className="flex space-x-4">
                              {(['low', 'medium', 'high'] as const).map((risk) => (
                                <div key={risk} className="flex items-center">
                                  <FormControl>
                                    <input
                                      type="radio"
                                      {...field}
                                      value={risk}
                                      checked={field.value === risk}
                                      className="mr-2"
                                    />
                                  </FormControl>
                                  <label className="text-sm capitalize">{risk}</label>
                                </div>
                              ))}
                            </div>
                            <FormDescription>
                              Select your comfort level with investment risk
                            </FormDescription>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="timeframe"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Investment Timeframe</FormLabel>
                            <div className="flex flex-wrap gap-4">
                              {(['short', 'medium', 'long', 'hodl'] as const).map((timeframe) => (
                                <div key={timeframe} className="flex items-center">
                                  <FormControl>
                                    <input
                                      type="radio"
                                      {...field}
                                      value={timeframe}
                                      checked={field.value === timeframe}
                                      className="mr-2"
                                    />
                                  </FormControl>
                                  <label className="text-sm capitalize">{timeframe}</label>
                                </div>
                              ))}
                            </div>
                            <FormDescription>
                              How long do you plan to hold your investments?
                            </FormDescription>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="goals"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Investment Goals</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe your investment goals..."
                                {...field}
                                className="resize-none"
                              />
                            </FormControl>
                            <FormDescription>
                              Share what you're hoping to achieve with crypto investing
                            </FormDescription>
                          </FormItem>
                        )}
                      />

                      <button
                        type="submit"
                        className="crypto-button w-full"
                      >
                        Generate Recommendations
                      </button>
                    </form>
                  </Form>
                </div>

                {/* Right side: Chatbot - fixed position */}
                <div className="relative h-full">
                  <div className="sticky top-4">
                    <AdvisorBot />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </DashboardLayout>
  );
};

export default Advisor;
