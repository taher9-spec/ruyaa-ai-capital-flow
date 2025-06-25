import React from "react";
import { motion } from "framer-motion";
import FuturisticBackground from "@/components/FuturisticBackground";
import ParticleBackground from "@/components/ParticleBackground";
import {
  Wallet,
  Bitcoin,
  Gift,
  HeadphonesIcon,
  MessageCircle,
  Building2,
} from "lucide-react";
import OptionCard from "@/components/OptionCard";

const DepositPage: React.FC = () => {
  const depositOptions = [
    {
      icon: Building2,
      title: "Deposit in Forex Account",
      description: "Add funds directly to your MT4/MT5 trading account",
    },
    {
      icon: Bitcoin,
      title: "Crypto Exchange Account",
      description: "Deposit to your cryptocurrency exchange wallet",
    },
    {
      icon: Wallet,
      title: "Crypto Wallet",
      description: "Transfer to your personal crypto wallet",
    },
    {
      icon: Gift,
      title: "Gift a Friend",
      description: "Send funds as a gift to someone special",
    },
    {
      icon: HeadphonesIcon,
      title: "Support",
      description: "Get help with your deposit process",
    },
    {
      icon: MessageCircle,
      title: "Talk to Human",
      description: "Speak with our customer service team",
    },
  ];

  const options = depositOptions;
  const title = "Deposit Options";
  const subtitle = "Choose how you want to add funds to your account";

  return (
    <div className="relative min-h-screen">
      <FuturisticBackground />
      <ParticleBackground />
      <main className="pt-32 pb-20 w-full max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            {title}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {options.map((option, idx) => (
            <OptionCard key={idx} {...option} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default DepositPage;
