import React, { useState } from "react";
import { motion } from "framer-motion";
import ArbitrageTicker from "./ArbitrageTicker";
import ArbitrageVisual from "./ArbitrageVisual";
import ArbitrageAlertCard from "./ArbitrageAlertCard";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const DUMMY_ARBITRAGE_DATA = {
  pair: "ETH/USDT",
  buyExchange: "Kraken",
  sellExchange: "Binance",
  buyPrice: "$3,005.10",
  sellPrice: "$3,012.65",
  profit: "$7.55",
  potential: "0.25%",
};

const CryptoArbitrageSection = () => {
  const [showAlert, setShowAlert] = useState(true);
  const { t } = useTranslation();

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <motion.section
      className="w-full max-w-7xl mx-auto flex flex-col items-center text-center mt-20 p-10 sm:p-16 relative bg-black/90 backdrop-blur-xl border border-green/20 rounded-3xl overflow-hidden shadow-2xl hover:shadow-green/20 transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="w-3 h-3 bg-green rounded-full animate-pulse shadow-green-glow"></div>
        <h2 className="text-5xl lg:text-6xl font-bold text-white font-spacegrotesk tracking-tight">
          {t("arbitrage_title")}{" "}
          <span className="text-gradient-green">{t("arbitrage_subtitle")}</span>
        </h2>
        <div className="w-3 h-3 bg-gold rounded-full animate-pulse shadow-gold-glow"></div>
      </div>
      <p className="text-xl text-gray-300 mb-16 max-w-4xl font-light leading-relaxed">
        {t("arbitrage_desc")}
      </p>

      <ArbitrageTicker />

      <div className="w-full flex flex-col lg:flex-row lg:rtl:flex-row-reverse items-center lg:items-start justify-center gap-8 mt-8">
        <ArbitrageVisual />
        <ArbitrageAlertCard
          show={showAlert}
          onClose={handleCloseAlert}
          data={DUMMY_ARBITRAGE_DATA}
        />
      </div>

      <motion.div
        className="mt-12"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link
          to="/agents?active=arbitrage"
          className="bg-green text-black px-8 py-4 rounded-xl text-lg font-bold shadow-green-glow hover:bg-green/90 transition-all duration-300 tracking-wide inline-flex items-center gap-2 font-spacegrotesk"
        >
          {t("try_now_arbitrage")}
          <ArrowRight className="w-5 h-5 rtl:rotate-180" />
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default CryptoArbitrageSection;
