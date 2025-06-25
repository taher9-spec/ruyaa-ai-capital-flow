import React, { useState, useEffect, useMemo } from 'react';
import CustomAICard from '@/components/CustomAICard';
import AIChatDemo from '@/components/CustomAgentChat';
import ParticleBackground from '@/components/ParticleBackground';
import FuturisticBackground from '@/components/FuturisticBackground';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

const AgentsPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const agents = useMemo(() => [
    {
      id: 'mt4mt5',
      title: 'MT4/MT5 Forex Agent',
      description: t('agent_mt4_desc'),
      imageSrc: '/uploads/Agent-forex.png',
    },
    {
      id: 'crypto',
      title: 'Crypto Trading Agent',
      description: t('agent_crypto_desc'),
      imageSrc: '/uploads/RUYACRYPTOAGENT.png',
    },
    {
      id: 'arbitrage',
      title: 'Arbitrage Agent',
      description: t('agent_arbitrage_desc'),
      imageSrc: '/uploads/ARBITRAGGGGGGG.png',
    },
  ], [t]);

  // Selection state
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  // On mount, check for ?active=... param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const active = params.get('active');
    if (active && agents.some(a => a.id === active)) {
      setSelectedAgentId(active);
    }
  }, [location.search, agents]);

  // Handle card click
  const handleSelectAgent = (id: string) => {
    setSelectedAgentId(id);
    // Update URL param
    navigate(`?active=${id}`, { replace: true });
  };

  const selectedAgent = agents.find(a => a.id === selectedAgentId);

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
          {/* Agent cards grid with selection logic */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className={`flex flex-col items-center transition-all duration-300 ${selectedAgentId === agent.id ? 'ring-4 ring-green-400 scale-105 z-20' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => handleSelectAgent(agent.id)}
              >
                <CustomAICard
                  imageSrc={agent.imageSrc}
                  title={agent.title}
                  buttonText={agent.title}
                />
                <span
                  className="-mt-3 px-3 py-1 rounded-b-xl bg-black/80 text-white text-xs font-semibold shadow-md border-t border-white/10 tracking-wide w-5/6 text-center"
                  style={{
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    marginTop: '-0.75rem',
                    position: 'relative',
                    zIndex: 10,
                  }}
                >
                  {agent.title}
                </span>
              </div>
            ))}
          </div>
          {/* Main Chat UI below cards, pass selected agent */}
          <div className="mt-16">
            <AIChatDemo agent={selectedAgent} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AgentsPage;
