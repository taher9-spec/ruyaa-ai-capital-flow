import React from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import AgentChat from '@/components/AgentChat';
import { useTranslation } from 'react-i18next';

const MT4Page: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <main className="pt-32 pb-20 w-full flex justify-center">
        <div className="agent-container w-full max-w-3xl px-4">
           <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              {t('mt4_page_title')}
            </h1>
            <p className="text-lg text-gray-300">
              {t('mt4_page_desc')}
            </p>
          </div>
          <AgentChat agentId="mt4mt5" />
        </div>
      </main>
    </div>
  );
};

export default MT4Page;
