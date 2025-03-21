import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <SidebarProvider>
      <div className="flex flex-1 w-full mt-16">
          <DashboardSidebar />
          <div className="flex-1 flex flex-col">
            <div className="pt-6 px-4 md:px-6 flex items-center">
              <SidebarTrigger className="mr-4" />
              {/* Page title will be added in each page */}
            </div>
            
            <main className="flex-grow pt-6 pb-12 bg-gray-50 dark:bg-gray-950">
              {children}
            </main>
            
            <Footer />
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
