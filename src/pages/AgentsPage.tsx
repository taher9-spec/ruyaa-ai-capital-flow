import React from 'react';
import AgentSelectionCard from '@/components/AgentSelectionCard';
import ParticleBackground from '@/components/ParticleBackground';
import FuturisticBackground from '@/components/FuturisticBackground';
import { useChatContext, AgentId } from '@/context/ChatContext';
import { useTranslation } from 'react-i18next';

const AgentsPage: React.FC = () => {
  const { openChat } = useChatContext();
  const { t } = useTranslation();

  const agents: {id: AgentId, title: string, description: string, logoSrc: string, href?: string}[] = [
    {
      id: 'mt4mt5',
      title: t('agent_mt4_title'),
      description: t('agent_mt4_desc'),
      logoSrc: '/icons/gold-bars.svg',
      href: '/agents/mt4mt5',
    },
    {
      id: 'crypto',
      title: t('agent_crypto_title'),
      description: t('agent_crypto_desc'),
      logoSrc: '/icons/crypto-coins.svg',
      href: '/agents/crypto',
    },
    {
      id: 'arbitrage',
      title: t('agent_arbitrage_title'),
      description: t('agent_arbitrage_desc'),
      logoSrc: '/icons/arb.svg',
      href: '/agents/arbitrage',
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
              <AgentSelectionCard
                key={agent.id}
                id={agent.id}
                title={agent.title}
                description={agent.description}
                logoSrc={agent.logoSrc}
                href={agent.href}
                onClick={!agent.href ? () => openChat(agent.id) : undefined}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AgentsPage;
