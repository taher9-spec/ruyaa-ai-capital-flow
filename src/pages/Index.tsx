import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Zap, Shield, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import AIGrid from "@/components/AIGrid";
import CryptoArbitrageSection from "@/components/CryptoArbitrageSection";
import HeroDashboard from "@/components/HeroDashboard";
import LogoCloud from "@/components/LogoCloud";
import PathModal from "@/components/PathModal";
import FuturisticBackground from "@/components/FuturisticBackground";
import ParticleBackground from "@/components/ParticleBackground";
import { useChatContext } from "@/context/ChatContext";
import { useTranslation } from "react-i18next";
import CustomAICard from "@/components/CustomAICard";

/**
 * The main landing page component for the AI-powered trading platform.
 *
 * Renders the hero section, feature highlights, AI grid animation, real-time dashboard,
 * crypto arbitrage section, and footer. Handles language direction (LTR/RTL) and
 * provides animated transitions for key UI elements.
 *
 * @component
 * @returns {JSX.Element} The rendered landing page.
 *
 * @remarks
 * - Uses Framer Motion for animations.
 * - Integrates with translation and chat context providers.
 * - Displays a modal for path selection.
 * - Features are dynamically rendered from a configuration array.
 *
 * @example
 * ```tsx
 * <Index />
 * ```
 */
const Index = () => {
  const [showPathModal, setShowPathModal] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  const { openChat } = useChatContext();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  React.useEffect(() => {
    const timer = setTimeout(() => setStartAnimation(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced neural networks analyze market patterns 24/7",
      color: "#f5c518",
    },
    {
      icon: Zap,
      title: "Real-Time Execution",
      description: "Lightning-fast trade execution with minimal latency",
      color: "#f5c518",
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Intelligent risk assessment and portfolio protection",
      color: "#f5c518",
    },
    {
      icon: TrendingUp,
      title: "Predictive Insights",
      description: "Machine learning models predict market movements",
      color: "#f5c518",
    },
  ];

  return (
    <div className="relative min-h-screen">
      <FuturisticBackground />
      <ParticleBackground />
      <div
        className="relative z-10 min-h-screen bg-black text-gray-100"
        dir={isArabic ? "rtl" : "ltr"}
      >
        <div className="relative">
          {/* Hero Section with proper spacing */}
          <div className="max-w-7xl mx-auto px-6 text-center pt-40 pb-24">
            {/* AI Badge */}
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-8 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Brain className="w-6 h-6 text-gold group-hover:text-white transition-all duration-300 drop-shadow-lg" />
              <span className="text-lg font-medium text-white/90 group-hover:text-white transition-colors">
                AI-POWERED TRADING PLATFORM
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-6xl lg:text-8xl font-bold font-space-grotesk leading-tight mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-white">Let AI Trade For You</span>
              <br />
              <span className="text-gold">— From Beginner to Pro</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-2xl lg:text-3xl text-[#e6e6e6] mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Your personal AI scans markets, sends you signals, and builds
              strategies on-demand. Just connect, and watch the agent work for
              you.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                to="/dashboard"
                className="group relative overflow-hidden rounded-full bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-medium text-white transition-all hover:bg-white/20 hover:shadow-lg hover:shadow-white/5"
              >
                <span className="relative z-10 flex items-center">
                  GET Started
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 -z-10 bg-white/15 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>

              <button
                onClick={() => openChat("support")}
                className="group relative overflow-hidden rounded-full border border-white/20 bg-transparent px-8 py-4 text-lg font-medium text-white transition-all hover:bg-white/5 hover:shadow-lg hover:shadow-white/5"
              >
                <span className="relative z-10 flex items-center">
                  Talk to AI Assistant
                  <Brain className="ml-3 h-6 w-6 transition-transform group-hover:scale-110" />
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-4xl font-bold lg:text-5xl font-space-grotesk">
              <span className="text-white">Powered by Advanced AI</span>
              <span className="ml-2 px-3 py-1 rounded-full bg-black text-white text-lg font-bold shadow-lg align-middle tracking-wide border border-white/10 animate-none">
                Agent
              </span>
            </h2>
            {/* Custom AI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 justify-center items-stretch">
              {[
                {
                  imageSrc: "/assets/50ee018b-7a53-4e1e-a776-aed7f7c0ca0b.png", // Market Sniper Set (reference image)
                  buttonText: "Signal Engine"
                },
                {
                  imageSrc: "/uploads/1344e471-1643-4f75-ae5c-9b0e36b02a0d.png", // Greenish Arbitrage Engine (reference image)
                  buttonText: "Market Sniper Set"
                },
                {
                  imageSrc: "/uploads/RuyaaCapital-AI-xau.png", // AI XAU
                  buttonText: "Risk Master"
                },
              ].map((card, idx) => (
                <CustomAICard
                  key={card.imageSrc}
                  imageSrc={card.imageSrc}
                  buttonText={card.buttonText}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      {/* AI Grid */}
      <AIGrid startAnimation={startAnimation} />

      {/* Hero Dashboard */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold font-space-grotesk mb-6">
              <span className="text-white">Real-Time </span>
              <span className="text-gradient-ai">AI Dashboard</span>
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-300">
              Monitor your AI-powered trading performance with live market data
              and intelligent insights.
            </p>
          </motion.div>
          <HeroDashboard />
        </div>
      </section>

      {/* Crypto Arbitrage Section */}
      <section className="py-20">
        <CryptoArbitrageSection />
      </section>

      <Footer />

      {/* Path Modal */}
      <PathModal open={showPathModal} onClose={() => setShowPathModal(false)} />
    </div>
  );
};

export default Index;
