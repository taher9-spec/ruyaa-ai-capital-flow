import React from "react";
import ParticleBackground from "@/components/ParticleBackground";
import AIMarketTable from "@/components/AIMarketTable";
import ArbitrageTicker from "@/components/ArbitrageTicker";
import { motion } from "framer-motion";

const MarketPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#0D0D0D]">
      <ParticleBackground />
      <main className="pt-32 pb-20 w-full max-w-5xl mx-auto px-6 space-y-12">
        <ArbitrageTicker />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AIMarketTable />
        </motion.div>
      </main>
    </div>
  );
};

export default MarketPage;
