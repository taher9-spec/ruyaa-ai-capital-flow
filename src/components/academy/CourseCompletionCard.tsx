
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface CourseCompletionCardProps {
  progressPercentage: number;
}

const CourseCompletionCard: React.FC<CourseCompletionCardProps> = ({ progressPercentage }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  if (progressPercentage !== 100) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mb-6"
    >
      <Card className="bg-gradient-to-r from-green/20 to-gold/20 border-green/30">
        <CardContent className="p-6 text-center">
          <div className="mb-4">
            <CheckCircle className="w-12 h-12 text-green mx-auto mb-2" />
            <h3 className="text-xl font-bold text-white">
              {isArabic ? 'تهانينا!' : 'Congratulations!'}
            </h3>
            <p className="text-gray-300">
              {isArabic ? 
                'لقد أكملت دورة تداول MT4/MT5' : 
                'You\'ve completed the MT4/MT5 Trading Course'
              }
            </p>
          </div>
          <Link to="/agents?active=mt4mt5">
            <Button className="bg-gold hover:bg-gold/90 text-dark-charcoal font-semibold">
              {isArabic ? 'ابدأ التداول مع رؤيا AI' : 'Start Trading with Ruyaa AI'}
              <ArrowRight className={`w-4 h-4 ${isArabic ? 'mr-2' : 'ml-2'}`} />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CourseCompletionCard;
