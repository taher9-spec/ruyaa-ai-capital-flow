import React from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import BrokerRegistrationForm from '@/components/forms/BrokerRegistrationForm';

const BrokerRegistrationPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#0D0D0D] pb-20">
      <ParticleBackground />
      <main className="pt-32 px-6">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Open Trading Account</h1>
        <BrokerRegistrationForm />
      </main>
    </div>
  );
};

export default BrokerRegistrationPage;
