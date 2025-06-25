import React from "react";
import { motion } from "framer-motion";
import ParticleBackground from "@/components/ParticleBackground";
import FuturisticBackground from "@/components/FuturisticBackground";
import { Brain, Zap, Bot, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HowItWorksPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen">
      <FuturisticBackground />
      <ParticleBackground />
      <main className="pt-32 pb-20 w-full max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* AI Brain Animation */}
          <motion.div
            className="flex justify-center mb-8"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="relative">
              <Brain className="w-24 h-24 text-primary" />
              <motion.div
                className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            How Ruyaa AI Works
          </h1>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#1A1A1A] border border-gray-600 rounded-2xl p-12 mb-8 backdrop-blur-sm shadow-future-card"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <Zap className="w-12 h-12 text-secondary" />
              <Bot className="w-12 h-12 text-primary" />
            </motion.div>

            <h2 className="text-3xl font-bold text-white mb-4">
              Visual Guide Coming Soon
            </h2>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              We're preparing an interactive visual guide that will show you
              exactly how Ruyaa AI works behind the scenes. From automated
              trading to intelligent market analysis, you'll see the power of AI
              in action.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-secondary">
                <div className="w-3 h-3 bg-secondary rounded-full animate-pulse" />
                <span className="font-medium">Interactive Tutorials</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                <span className="font-medium">Step-by-Step Guides</span>
              </div>
              <div className="flex items-center gap-2 text-gold">
                <div className="w-3 h-3 bg-gold rounded-full animate-pulse" />
                <span className="font-medium">Live Demonstrations</span>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/")}
              className="bg-primary hover:bg-primary/80 text-white px-8 py-3 text-lg"
            >
              Back to Home
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              onClick={() => navigate("/agents")}
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10 px-8 py-3 text-lg"
            >
              Explore AI Agents
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default HowItWorksPage;
