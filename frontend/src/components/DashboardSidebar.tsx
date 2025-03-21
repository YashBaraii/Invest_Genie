import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  LineChart,
  LogOut,
  Newspaper,
  BrainCircuit,
  MessageSquare,
  User,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

export function DashboardSidebar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    { 
      title: "Dashboard", 
      icon: LayoutDashboard, 
      path: "/dashboard",
    },
    { 
      title: "Portfolio", 
      icon: Wallet, 
      path: "/portfolio",
    },
    { 
      title: "Market Insights", 
      icon: LineChart, 
      path: "/insights",
    },
    { 
      title: "News", 
      icon: Newspaper, 
      path: "/news",
    },
    { 
      title: "AI Advisor", 
      icon: BrainCircuit, 
      path: "/advisor",
    },
    { 
      title: "Chat", 
      icon: MessageSquare, 
      path: "/chat",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-6">
        <div>
          <br />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <Link to={item.path} className="w-full">
                <SidebarMenuButton
                  isActive={isActive(item.path)}
                  tooltip={item.title}
                >
                  <item.icon className="size-4" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-gray-800">
        {/* Profile Section */}
        <div className="p-4">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold mr-3">
              JD
            </div>
            <div>
              <p className="font-medium text-sm">John Doe</p>
              <p className="text-xs text-gray-400">Premium Account</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Link to="/profile">
              <Button variant="ghost" size="sm" className="w-full justify-start text-gray-400 hover:text-white">
                <User className="mr-2 size-4" />
                <span>Profile</span>
              </Button>
            </Link>
            
            <Link to="/settings">
              <Button variant="ghost" size="sm" className="w-full justify-start text-gray-400 hover:text-white">
                <Settings className="mr-2 size-4" />
                <span>Settings</span>
              </Button>
            </Link>
          </div>
          
          <SidebarSeparator className="my-3" />
          
          <Button variant="ghost" className="w-full justify-start p-2 text-gray-400 hover:text-white">
            <LogOut className="mr-2 size-4" />
            <span>Logout</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}