import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";
import { PATHS } from "@/data/paths";
import PathCard from "./PathCard";
import SetupSteps from "./SetupSteps";
import { useTranslation } from "react-i18next";

interface PathModalProps {
  open: boolean;
  onClose: () => void;
}

const PathModal: React.FC<PathModalProps> = ({ open, onClose }) => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [flipped, setFlipped] = useState<string | null>(null);
  const [showSteps, setShowSteps] = useState(false);
  const { t } = useTranslation();

  const handleCardClick = (pathId: string) => {
    if (!flipped) {
      setFlipped(pathId);
    }
  };

  const handleContinue = (pathId: string) => {
    setSelectedPath(pathId);
    setShowSteps(true);
  };

  const handleBack = () => {
    if (showSteps) {
      setShowSteps(false);
      setSelectedPath(null);
    } else {
      setFlipped(null);
    }
  };

  const reset = () => {
    setFlipped(null);
    setSelectedPath(null);
    setShowSteps(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={handleClose}
            className="absolute top-6 end-6 text-green hover:scale-110 transition-transform z-50"
            aria-label="Close modal"
          >
            <X size={32} />
          </button>

          {/* Custom Who We Are content if no card is flipped and no steps shown */}
          {!flipped && !showSteps && (
            <div className="max-w-lg bg-black/80 border border-primary/20 shadow-ai-glow backdrop-blur-xl transition-all duration-500 rounded-2xl p-8 overflow-y-auto max-h-[80vh]">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-4">
                Who We Are
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-2">
                <div className="w-full md:w-1/2">
                  <p className="text-lg md:text-xl text-white leading-relaxed text-left">
                    Ruyaa Capital is a pioneering AI-driven platform dedicated to
                    revolutionizing capital flow analysis and trading strategies.
                    Our mission is to empower traders and investors with advanced
                    tools, real-time insights, and educational resources,
                    leveraging the power of artificial intelligence to unlock new
                    opportunities in global markets.
                  </p>
                </div>
                <div className="w-full md:w-1/2 border-l border-white/20 md:pl-8 md:ml-4 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-8 rtl:ml-0 rtl:mr-4">
                  <p className="text-lg md:text-xl text-white leading-relaxed text-right">
                    رؤيا كابيتال هي منصة رائدة مدعومة بالذكاء الاصطناعي تهدف
                    إلى إحداث ثورة في تحليل تدفقات رأس المال واستراتيجيات
                    التداول. مهمتنا هي تمكين المتداولين والمستثمرين من خلال
                    أدوات متقدمة ورؤى فورية وموارد تعليمية، مستفيدين من قوة
                    الذكاء الاصطناعي لفتح آفاق جديدة في الأسواق العالمية.
                  </p>
                </div>
              </div>
            </div>
          )}

          {(flipped || showSteps) && (
            <button
              onClick={handleBack}
              className="absolute top-6 start-6 text-green hover:scale-110 transition-transform z-50 flex items-center gap-2"
            >
              <ArrowLeft size={24} className="rtl:rotate-180" />
              <span className="text-sm">{t('back_button')}</span>
            </button>
          )}

          <div className="w-full max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {!showSteps ? (
                <motion.div
                  key="cards"
                  className="flex gap-8 justify-center items-center flex-col sm:flex-row sm:rtl:flex-row-reverse"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {PATHS.map((path) => (
                    <PathCard
                      key={path.id}
                      path={path}
                      isFlipped={flipped === path.id}
                      onCardClick={handleCardClick}
                      onContinue={handleContinue}
                    />
                  ))}
                </motion.div>
              ) : (
                selectedPath && <SetupSteps selectedPathId={selectedPath} />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PathModal;
