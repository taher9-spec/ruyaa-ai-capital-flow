import React from 'react';
import CustomAICard from '@/components/CustomAICard';
import AIChatDemo from '@/components/CustomAgentChat';
import ParticleBackground from '@/components/ParticleBackground';
import FuturisticBackground from '@/components/FuturisticBackground';
import { useChatContext } from '@/context/ChatContext';
import { useTranslation } from 'react-i18next';

const AgentsPage: React.FC = () => {
  const { openChat } = useChatContext();
  const { t } = useTranslation();

  const [activeAgentId, setActiveAgentId] = React.useState('mt4mt5');

  const agents = [
    {
      id: 'mt4mt5',
      title: t('agent_mt4_title'),
      description: t('agent_mt4_desc'),
      imageSrc: '/uploads/Agent-forex.png',
    },
    {
      id: 'crypto',
      title: t('agent_crypto_title'),
      description: t('agent_crypto_desc'),
      imageSrc: '/uploads/RUYACRYPTOAGENT.png',
    },
    {
      id: 'arbitrage',
      title: t('agent_arbitrage_title'),
      description: t('agent_arbitrage_desc'),
      imageSrc: '/uploads/ARBITRAGGGGGGG.png',
    },
  ];

  return (
    <div className="relative min-h-screen">
      <FuturisticBackground />
      <ParticleBackground />
      <main className="pt-32 pb-20 w-full">
        <section className="w-full max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
              {t('agents_title')}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('agents_desc')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {agents.map((agent) => (
              <CustomAICard
                key={agent.id}
                imageSrc={agent.imageSrc}
                title={agent.title}
                buttonText={agent.title}
                isActive={activeAgentId === agent.id}
                onClick={() => setActiveAgentId(agent.id)}
              />
            ))}
          </div>
          {/* Main Chat UI below cards */}
          <div className="mt-16">
            <AIChatDemo />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AgentsPage;
