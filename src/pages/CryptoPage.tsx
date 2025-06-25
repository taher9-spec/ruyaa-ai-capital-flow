import React from 'react';
import AgentChat from '@/components/AgentChat';
import ParticleBackground from '@/components/ParticleBackground';
import { useTranslation } from 'react-i18next';

const CryptoPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <main className="pt-32 pb-20 w-full">
        <section className="w-full max-w-2xl mx-auto px-6">
          <div className="text-start mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              {t('crypto_page_title')}
            </h1>
            <p className="text-xl text-gray-300">
              {t('crypto_page_desc')}
            </p>
          </div>
          <AgentChat agentId="crypto" />
        </section>
      </main>
    </div>
  );
};

export default CryptoPage;
