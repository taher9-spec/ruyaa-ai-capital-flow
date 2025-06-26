
import React from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const TradingCTA: React.FC = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <Card className="bg-gradient-to-br from-gold/10 to-green/10 border-gold/20 mt-6">
      <CardContent className="p-6 text-center">
        <TrendingUp className="w-10 h-10 text-gold mx-auto mb-3" />
        <h3 className="font-bold text-white mb-2">
          {isArabic ? 'مستعد لبدء التداول؟' : 'Ready to Start Trading?'}
        </h3>
        <p className="text-gray-300 text-sm mb-4">
          {isArabic ? 
            'افتح حساب MT4/MT5 مع رؤيا AI واحصل على إشارات تداول احترافية.' :
            'Open your MT4/MT5 account with Ruyaa AI and get access to professional trading signals.'
          }
        </p>
          <Link to="/agents?active=mt4mt5">
          <Button className="w-full bg-gold hover:bg-gold/90 text-dark-charcoal font-semibold">
            {isArabic ? 'افتح حساب تداول' : 'Open Trading Account'}
            <ArrowRight className={`w-4 h-4 ${isArabic ? 'mr-2' : 'ml-2'}`} />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default TradingCTA;
