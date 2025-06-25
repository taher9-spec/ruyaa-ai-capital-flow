import React from 'react';
import { motion } from 'framer-motion';
import type { Tables } from '@/integrations/supabase/types';

interface RuyaaCharacterCardProps {
  onClick?: () => void;
  profile?: Tables<'profiles'> | null;
  className?: string;
}

const RuyaaCharacterCard: React.FC<RuyaaCharacterCardProps> = ({ onClick, profile, className }) => {
  return (
    <motion.div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={0}
      className={`relative overflow-hidden rounded-2xl cursor-pointer shadow-lg bg-gradient-to-br from-[#1a1a1c]/70 to-[#111114]/60 backdrop-blur-lg border-2 border-[#d4af37]/40 ${className || ''}`}
      whileHover={{ rotateX: 6, rotateY: -6 }}
    >
      <img
        src="/Ruyaa-Agent.png"
        alt="Ruyaa Agent"
        className="w-full h-48 object-cover object-center transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-center p-4">
        {profile ? (
          <>
            <div className="text-white text-lg font-bold">{profile.full_name}</div>
            {profile.info && <div className="text-neutral-400 text-sm">{profile.info}</div>}
          </>
        ) : (
          <div className="text-white text-lg font-bold">Click to Sign Up</div>
        )}
      </div>
    </motion.div>
  );
};

export default RuyaaCharacterCard;
