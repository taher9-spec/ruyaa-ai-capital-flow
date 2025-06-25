import React, { useState } from "react";
import AiBrainIcon from "./icons/AiBrainIcon";
import ConvergingArrowsIcon from "./icons/ConvergingArrowsIcon";
import VerifiedShieldIcon from "./icons/VerifiedShieldIcon";
import { GraduationCap, LineChart, X } from "lucide-react";
import { useChatContext } from "@/context/ChatContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const FeatureGrid: React.FC = () => {
  const [showSignalModal, setShowSignalModal] = useState(false);
  const { openChat } = useChatContext();
  const navigate = useNavigate();

  const handleFeatureClick = (featureTitle: string) => {
    switch (featureTitle) {
      case "Verified Broker": {
        // Scroll to MT4/MT5 section
        const aiSection = document.getElementById("ai");
        if (aiSection) {
          aiSection.scrollIntoView({ behavior: "smooth" });
        }
        break;
      }
      case "24/7 Ruyaa AI Assistant": {
        // Open chatbot
        openChat('support');
        break;
      }
      case "Trading Academy + Mentor": {
        // Navigate to academy page
        navigate("/academy");
        break;
      }
      case "Live Ticker + Signal Feed": {
        // Show signal modal
        setShowSignalModal(true);
        break;
      }
      case "Crypto Arbitrage System": {
        // Route to agents page with arbitrage agent active
        navigate("/agents?active=arbitrage");
        break;
      }
    }
  };

  const features = [
    {
      icon: <VerifiedShieldIcon />,
      title: "Verified Broker",
      subtitle: "1-Click Withdraw",
      color: "from-gray-800/20 to-gray-700/20",
    },
    {
      icon: <AiBrainIcon />,
      title: "24/7 Ruyaa AI Assistant",
      subtitle: "Always available to help",
      color: "from-gray-800/20 to-gray-700/20",
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Trading Academy + Mentor",
      subtitle: "Learn with guidance",
      color: "from-yellow-600/20 to-yellow-500/20",
    },
    {
      icon: <LineChart className="w-8 h-8" />,
      title: "Live Ticker + Signal Feed",
      subtitle: "Real-time trading data",
      color: "from-gray-800/20 to-gray-700/20",
    },
    {
      icon: <ConvergingArrowsIcon />,
      title: "Crypto Arbitrage System",
      subtitle: "Auto profit scan",
      color: "from-gray-700/20 to-gray-600/20",
    },
  ];

  return (
    <>
      <div className="w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              onClick={() => handleFeatureClick(feature.title)}
              className="group relative flex flex-col items-center justify-center text-center w-44 h-44 bg-gray-900 backdrop-blur-xl border border-gray-700 rounded-3xl p-6 transition-all duration-500 hover:border-gray-600 hover:shadow-xl cursor-pointer hover:scale-102 overflow-hidden"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 bg-geometric-pattern opacity-10" />

              {/* Subtle gold border on hover */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-gold/40 transition-colors duration-500 pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-4 p-4 rounded-2xl bg-gray-800 border border-gray-600 transition-all duration-500 group-hover:scale-110 group-hover:border-yellow-500/60 group-hover:bg-gray-700 group-hover:shadow-glow">
                  {React.cloneElement(feature.icon, {
                    className:
                      "w-8 h-8 text-yellow-500 group-hover:text-white transition-all duration-500 group-hover:drop-shadow-lg",
                  })}
                </div>

                <h3 className="text-sm font-bold text-white mb-2 transition-all duration-500 group-hover:text-yellow-500 font-spacegrotesk text-center leading-tight">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors duration-500 text-center leading-relaxed">
                  {feature.subtitle}
                </p>
              </div>

              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-yellow-500/30 group-hover:animate-pulse-subtle transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Signal Feed Modal */}
      <AnimatePresence>
        {showSignalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSignalModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 max-w-md w-full relative"
            >
              <button
                onClick={() => setShowSignalModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center">
                <div className="w-16 h-16 bg-gray-800 border border-gray-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <LineChart className="w-8 h-8 text-yellow-500" />
                </div>

                <h3 className="text-xl font-bold text-white mb-4 font-spacegrotesk">
                  Live Signal Feed
                </h3>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  Join the waitlist – This isn't just a signal. It's an AI
                  engine that understands market reasoning.
                </p>

                <div className="flex items-center gap-2 justify-center mb-4">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-yellow-500 text-sm font-medium">
                    AI Engine Active
                  </span>
                </div>

                <button
                  onClick={() => setShowSignalModal(false)}
                  className="w-full bg-yellow-500 text-black py-3 rounded-xl font-semibold hover:bg-yellow-400 transition-colors hover:scale-102 duration-300"
                >
                  Join Waitlist
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FeatureGrid;