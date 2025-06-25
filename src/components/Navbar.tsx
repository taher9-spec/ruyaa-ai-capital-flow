"use client";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
          <Link
            to="/who-we-are"
            className="flex items-center gap-1 px-2 py-1 bg-white/5 border border-white/10 rounded-md text-white text-[11px] font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm shadow-sm"
            style={{ minHeight: 22, height: 22, fontSize: 11, marginRight: isArabic ? 0 : 8, marginLeft: isArabic ? 8 : 0, alignSelf: 'center' }}
          >
            <Users className="w-3 h-3" />
            <span className="whitespace-nowrap">Who We Are</span>
          </Link>
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
    </header>
  );
};

export default Navbar;