import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
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
      className={cn(
        'relative overflow-hidden rounded-2xl cursor-pointer shadow-lg bg-black/40 backdrop-blur-lg border border-white/10 w-full h-80 flex flex-col',
        className,
      )}
      whileHover={{ rotateX: 6, rotateY: -6 }}
    >
      <img
        src="/Ruyaa-Agent.png"
        alt="Ruyaa Agent"
        className="w-full h-52 object-contain transition-transform duration-300 group-hover:scale-105"
      />
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-4 text-center">
        {profile ? (
          <>
            <div className="text-white text-lg font-bold mb-1">{profile.full_name}</div>
            <div className="text-green-300 text-sm break-all">{profile.id}</div>
          </>
        ) : (
          <div className="text-white text-lg font-bold">Click to Sign Up</div>
        )}
      </div>
    </motion.div>
  );
};

export default RuyaaCharacterCard;
