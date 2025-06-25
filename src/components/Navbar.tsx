"use client";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import LangToggle from "./LangToggle";
import { useProfile } from "@/hooks/useProfile";
import UserMenu from "./UserMenu";
import {
  Bell,
  Users,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import AuthCard from "./AuthCard";
import logo from "../../ruyaa agents/ruyaaaaaaaaaaaaaalogo.png";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [depositMenu, setDepositMenu] = React.useState(false);
  const [notificationOpen, setNotificationOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [authModalOpen, setAuthModalOpen] = React.useState(false);
  const [whoWeAreOpen, setWhoWeAreOpen] = React.useState(false);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [session, setSession] = React.useState<Session | null>(null);
  const { data: profile } = useProfile(session);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMobileOpen(false);
  };

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setAuthModalOpen(false); // Close auth modal when user signs in
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed z-30 top-0 md:top-12 left-0 w-full transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-black/80 border-b border-primary/20 shadow-ai-glow"
          : "bg-transparent"
      }`}
    >
      <nav
        className={`flex items-center justify-between max-w-7xl mx-auto px-6 py-4 ${
          isArabic ? "flex-row-reverse" : ""
        }`}
      >
        {/* Logo + Who We Are Section (side-by-side, professional alignment) */}
        <div className="flex flex-row items-center min-w-[220px] gap-2 relative">
          <button
            className="flex items-center gap-1 px-2 py-1 bg-white/5 border border-white/10 rounded-md text-white text-[11px] font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm shadow-sm"
            style={{ minHeight: 22, height: 22, fontSize: 11, marginRight: isArabic ? 0 : 8, marginLeft: isArabic ? 8 : 0, alignSelf: 'center' }}
            onClick={() => setWhoWeAreOpen(true)}
          >
            <Users className="w-3 h-3" />
            <span className="whitespace-nowrap">Who We Are</span>
          </button>
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Ruyaa Capital Logo"
              className="h-16 w-auto object-contain drop-shadow-lg"
              style={{ maxWidth: 200, minWidth: 120 }}
            />
          </Link>
        </div>

        {/* Main Navigation Links */}
        <div className={`hidden md:flex items-center gap-2 ${isArabic ? "mr-4" : "ml-4"}`}>
          <Link to="/" className="px-3 py-2 rounded-lg text-white text-sm font-medium hover:bg-yellow-400/10 hover:text-yellow-400 transition-colors">Home</Link>
          <Link to="/how-it-works" className="px-3 py-2 rounded-lg text-white text-sm font-medium hover:bg-yellow-400/10 hover:text-yellow-400 transition-colors">How it works</Link>
          <Link to="/agents" className="px-3 py-2 rounded-lg text-white text-sm font-medium hover:bg-yellow-400/10 hover:text-yellow-400 transition-colors">AI Agents</Link>
          <Link to="/academy" className="px-3 py-2 rounded-lg text-white text-sm font-medium hover:bg-yellow-400/10 hover:text-yellow-400 transition-colors">Academy</Link>
          <Link to="/deposit" className="px-3 py-2 rounded-lg text-white text-sm font-medium hover:bg-yellow-400/10 hover:text-yellow-400 transition-colors">Deposit</Link>
          <Link to="/withdraw" className="px-3 py-2 rounded-lg text-white text-sm font-medium hover:bg-yellow-400/10 hover:text-yellow-400 transition-colors">Withdraw</Link>
        </div>

        {/* Right Section - User Menu and Notifications */}
        <div className="flex items-center gap-4 min-w-[180px] justify-end">
          {/* Navigation Arrows (moved to right for better organization) */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => window.history.back()}
              className="p-2 hover:bg-white/5 rounded-lg transition-all duration-300 group"
              aria-label="Go back"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </button>
            <button
              onClick={() => window.history.forward()}
              className="p-2 hover:bg-white/5 rounded-lg transition-all duration-300 group"
              aria-label="Go forward"
            >
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </button>
          </div>
          {/* Language Toggle */}
          <LangToggle />
          {/* Notification Button */}
          <div className="relative">
            <button
              onClick={() => setNotificationOpen((prev) => !prev)}
              className="p-2 hover:bg-white/5 rounded-lg transition-all duration-300 group"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </button>
            {/* Notification Dropdown */}
            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-black/95 border border-yellow-400 rounded-lg shadow-lg overflow-hidden z-50">
                <div className="p-4 text-yellow-400 font-semibold border-b border-yellow-400/20">
                  Notifications
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {/* Notification items */}
                  <div className="p-4 hover:bg-white/5 transition-colors cursor-pointer">
                    <p className="text-sm text-gray-300">
                      New message from <span className="text-yellow-400">John Doe</span>
                    </p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                  <div className="p-4 hover:bg-white/5 transition-colors cursor-pointer">
                    <p className="text-sm text-gray-300">
                      Your order has been shipped!
                    </p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                  <div className="p-4 hover:bg-white/5 transition-colors cursor-pointer">
                    <p className="text-sm text-gray-300">
                      New comment on your post
                    </p>
                    <p className="text-xs text-gray-500">3 hours ago</p>
                  </div>
                </div>
                <div className="p-2 border-t border-yellow-400/20">
                  <Link
                    to="/notifications"
                    className="block text-center text-sm text-yellow-400 hover:underline"
                    onClick={() => setNotificationOpen(false)}
                  >
                    View All Notifications
                  </Link>
                </div>
              </div>
            )}
          </div>
          {/* User Menu */}
          <UserMenu
            fullName={profile?.full_name}
            avatarUrl={profile?.avatar_url}
          />
        </div>
      </nav>
      {/* Full Page Who We Are Modal */}
      {whoWeAreOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl animate-fade-in" style={{ minHeight: '100vh' }}>
          <div className="absolute top-6 right-8 z-60">
            <button
              className="text-yellow-400 bg-black/60 border border-yellow-400 rounded-full p-2 hover:bg-yellow-400 hover:text-black transition-all shadow-lg"
              onClick={() => setWhoWeAreOpen(false)}
              aria-label="Close Who We Are"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="w-full max-w-5xl mx-auto bg-black/90 border border-yellow-400 text-white rounded-2xl p-8 shadow-2xl overflow-y-auto max-h-[90vh] animate-fade-in">
            <h2 className="text-3xl font-bold mb-8 text-yellow-400 text-center">Who We Are</h2>
            <div className="flex flex-col md:flex-row gap-10 items-start">
              {/* Arabic First */}
              <div className="flex-1 text-lg md:text-xl leading-relaxed text-right" dir="rtl">
                رؤيا كابيتال | ريادة عربية برؤية تكنولوجية

رؤيا كابيتال ليست مجرد شركة استثمار، بل هي جزء من مجموعة رؤيا للذكاء الاصطناعي وشركائها، وتُعد أول منصة عربية حقيقية تقدم لك تجربة تفاعلية متكاملة مع الذكاء الاصطناعي. نحن الأوائل في المنطقة الذين يوفرون لك وكيل ذكاء اصطناعي يقوم فعلياً بالعمل نيابةً عنك—not just advice—سواء في التداول، الاستثمار، أو حلول الأعمال الذكية.

تأسست رؤيا كابيتال على شراكات قوية مع شركات تداول مرخصة وموثوقة تمتلك خبرة تتجاوز 15 عاماً في الأسواق المالية، مدعومة بأصول مالية حقيقية وفريق محترف يجمع بين الخبرة والتحليل المدعوم بالذكاء الاصطناعي. ويعزز ثقتنا في السوق دعم نخبة المستثمرين والخبراء في دبي وتركيا.

نجاحنا ارتقى من خلال التعاون مع رواد الذكاء الاصطناعي العالميين مثل OpenAI (ChatGPT) وAnthropic، وإطلاق بوتات GPT الخاصة بنا—منها <a href="https://chatgpt.com/g/g-685b413e2df08191bebf7a990374d616-ruyaacapital-ai" target="_blank" rel="noopener noreferrer" className="text-yellow-400 underline hover:text-yellow-300">المساعد الرسمي لرؤيا كابيتال على ChatGPT.com</a>، ليكون معك في كل خطوة ويقدم حلولاً عملية وفورية.

في رؤيا كابيتال، هدفنا ليس مجرد تحقيق الربح، بل بناء علاقات طويلة الأمد تقوم على الشفافية، الاحترافية، والدعم المستمر. رسالتنا أن نوفر لك كل الأدوات والتقنيات لتجربة استثمارية ذكية وآمنة—من التداول وحتى اكتشاف كل جديد في عالم الذكاء الاصطناعي.

مع رؤيا كابيتال، الاستثمار الذكي ليس شعاراً—بل واقع جديد تصنعه التكنولوجيا وثقة العملاء في عالم المال العربي.
              </div>
              {/* Visual Gap */}
              <div className="hidden md:block w-px bg-yellow-400 self-stretch opacity-60" />
              {/* English Second */}
              <div className="flex-1 text-lg md:text-xl leading-relaxed text-left" dir="ltr">
                Ruyaa Capital is not just another investment company—it’s part of Ruyaa AI Group and its partners, and stands as the first true Arab platform delivering a complete, interactive experience with artificial intelligence. We’re the first in the region to offer an AI agent that doesn’t just give advice, but actually does the work for you—whether in trading, investing, or smart business solutions.

Our foundation is built on strong partnerships with licensed, trusted brokers with over 15 years of financial market experience, backed by real financial assets and a professional team that combines deep market expertise with advanced AI analysis. We’re supported by leading investors and experts in Dubai and Turkey, which has strengthened our market trust and the quality of our launch.

Our success is elevated through strategic collaborations with global AI pioneers like OpenAI (ChatGPT) and Anthropic, and the launch of our own custom GPTs—including the official <a href="https://chatgpt.com/g/g-685b413e2df08191bebf7a990374d616-ruyaacapital-ai" target="_blank" rel="noopener noreferrer" className="text-yellow-400 underline hover:text-yellow-300">Ruyaa Capital Assistant on ChatGPT.com</a>, to support you every step of the way with practical, instant solutions.

At Ruyaa Capital, we’re not here just to help you make a profit—we aim to build long-term relationships based on transparency, professionalism, and continuous support. Our mission is to provide every tool and technology for a smart, safe investment experience, from trading to discovering the latest in AI.

With Ruyaa Capital, smart investing isn’t just a slogan—it’s a new reality, driven by technology and client trust in the world of Arab finance.
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;