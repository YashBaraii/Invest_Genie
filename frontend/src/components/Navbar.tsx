import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Toggle } from "@/components/ui/toggle";
import { useTheme } from "@/hooks/use-theme.tsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Chat", path: "/chat" },
  ];

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        scrolled
          ? "py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold transition-opacity duration-200 hover:opacity-80"
          >
            <span className="crypto-gradient-text">InvestGenius</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "font-medium text-gray-700 dark:text-gray-200 transition-all duration-200 hover:text-accent",
                  location.pathname === item.path && "text-accent font-semibold"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Authentication Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Toggle
              pressed={theme === 'dark'}
              onPressedChange={toggleTheme}
              className="mr-2"
              size="sm"
            >
              {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Toggle>
            {isAuthenticated ? (
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl font-medium"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            ) : (
              <>
                <Link to="/auth?mode=login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl font-medium"
                  >
                    Log In
                  </Button>
                </Link>

                <Link to="/auth?mode=signup">
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-medium"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <Toggle
              pressed={theme === 'dark'}
              onPressedChange={toggleTheme}
              size="sm"
            >
              {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Toggle>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 dark:text-gray-200 rounded-md"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg rounded-b-2xl animate-fade-in-down">
          <div className="flex flex-col px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "py-2 font-medium text-gray-700 dark:text-gray-200 transition-all duration-200 hover:text-accent",
                  location.pathname === item.path && "text-accent font-semibold"
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 flex flex-col space-y-3">
              {isAuthenticated ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl font-medium w-full"
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              ) : (
                <>
                  <Link to="/auth?mode=login">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl font-medium w-full"
                    >
                      Log In
                    </Button>
                  </Link>
                  <Link to="/auth?mode=signup">
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-medium w-full"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
