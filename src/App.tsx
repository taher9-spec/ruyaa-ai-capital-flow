import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ChatProvider } from '@/context/ChatContext';
import { WalletProvider } from '@/context/WalletProvider';
import { useTheme } from '@/context/ThemeContext';
import { Toaster } from '@/components/ui/sonner';
import LiveMarketTicker from '@/components/LiveMarketTicker';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/chat/ChatWidget';
import ThemeToggle from '@/components/ThemeToggle';
// Pages
import WelcomePage from './pages/Welcome';
import Index from './pages/Index';
import AgentsPage from './pages/AgentsPage';
import MT4Page from './pages/MT4Page';
import CryptoPage from './pages/CryptoPage';
import ArbitragePage from './pages/ArbitragePage';
import AcademyPage from './pages/AcademyPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import DepositPage from './pages/DepositPage';
import WithdrawPage from './pages/WithdrawPage';
import HowItWorksPage from './pages/HowItWorksPage';
import MarketPage from './pages/MarketPage';
import BrokerRegistrationPage from './pages/BrokerRegistrationPage';
import WhoWeArePage from './pages/WhoWeArePage';
import AuthCard from './components/AuthCard';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Theme wrapper to apply theme classes to the app
const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  
  useEffect(() => {
    // Apply theme class to body for global styles
    document.body.className = theme === 'dark' ? 'bg-background-dark' : 'bg-background-light';
  }, [theme]);
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-background-dark text-text-primary-dark' 
        : 'bg-background-light text-text-primary-light'
    }`}>
      {children}
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <ChatProvider>
          <TooltipProvider>
            <BrowserRouter>
              <ThemeWrapper>
                {/* Theme Toggle Button */}
                <div className="fixed bottom-6 right-6 z-50">
                  <ThemeToggle />
                </div>
                
                {/* Live Market Ticker */}
                <LiveMarketTicker />
                
                {/* Main Navigation */}
                <Navbar />
                
                {/* Main Content */}
                <main className="relative z-10">
                  
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/welcome" element={<WelcomePage />} />
                    <Route path="/agents" element={<AgentsPage />} />
                    <Route path="/agents/mt4mt5" element={<MT4Page />} />
                    <Route path="/agents/crypto" element={<CryptoPage />} />
                    <Route path="/agents/arbitrage" element={<ArbitragePage />} />
                    <Route path="/academy" element={<AcademyPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/deposit" element={<DepositPage />} />
                    <Route path="/withdraw" element={<WithdrawPage />} />
                    <Route path="/how-it-works" element={<HowItWorksPage />} />
                    <Route path="/who-we-are" element={<WhoWeArePage />} />
                    <Route path="/market" element={<MarketPage />} />
                    <Route path="/register/broker" element={<BrokerRegistrationPage />} />
                    <Route path="/auth" element={<AuthCard />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                
                {/* Global Toast Notifications */}
                <Toaster position="top-center" richColors />
                
                {/* Chat Widget */}
                <ChatWidget />
              </ThemeWrapper>
            </BrowserRouter>
          </TooltipProvider>
        </ChatProvider>
      </WalletProvider>
    </QueryClientProvider>
  );
};

export default App;
