'use client';

import React, { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  MotionStyle,
  SpringOptions,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import { Brain, Cpu, Zap } from 'lucide-react';

type TiltProps = {
  children: React.ReactNode;
  className?: string;
  style?: MotionStyle;
  rotationFactor?: number;
  isRevese?: boolean;
  springOptions?: SpringOptions;
};

function Tilt({
  children,
  className,
  style,
  rotationFactor = 15,
  isRevese = false,
  springOptions,
}: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, springOptions);
  const ySpring = useSpring(y, springOptions);

  const rotateX = useTransform(
    ySpring,
    [-0.5, 0.5],
    isRevese
      ? [rotationFactor, -rotationFactor]
      : [-rotationFactor, rotationFactor]
  );
  const rotateY = useTransform(
    xSpring,
    [-0.5, 0.5],
    isRevese
      ? [-rotationFactor, rotationFactor]
      : [rotationFactor, -rotationFactor]
  );

  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPos = mouseX / width - 0.5;
    const yPos = mouseY / height - 0.5;

    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        ...style,
        transform,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

interface AICardProps {
  title?: string;
  description?: string;
  image?: string;
  icon?: React.ReactNode;
  className?: string;
  showContent?: boolean; // New prop to control content visibility
}

function AICard({
  title = "Neural Processing",
  description = "Advanced AI algorithms that learn and adapt to provide intelligent solutions for complex data processing and pattern recognition.",
  image = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&crop=center",
  icon = <Brain className="w-6 h-6" />,
  className,
  showContent = true, // Default to true for existing behavior
}: AICardProps) {
  return (
    <Tilt
      rotationFactor={8}
      isRevese
      springOptions={{
        stiffness: 26.7,
        damping: 4.1,
        mass: 0.2,
      }}
      className={cn("group relative max-w-sm", className)}
    >
      <motion.div
        className={cn(
          "relative overflow-hidden rounded-xl",
          "bg-zinc-950 border border-zinc-800",
          "shadow-2xl shadow-black/50"
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Noise Pattern Background */}
        <div 
          className="absolute inset-0 bg-repeat bg-[length:500px_500px] opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 700 700'%3E%3Cdefs%3E%3Cfilter id='nnnoise-filter' x='-20%25' y='-20%25' width='140%25' height='140%25' filterUnits='objectBoundingBox' primitiveUnits='userSpaceOnUse' color-interpolation-filters='linearRGB'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.167' numOctaves='4' seed='15' stitchTiles='stitch' x='0%25' y='0%25' width='100%25' height='100%25' result='turbulence'%3E%3C/feTurbulence%3E%3CfeSpecularLighting surfaceScale='28' specularConstant='0.75' specularExponent='20' lighting-color='%23fff' x='0%25' y='0%25' width='100%25' height='100%25' in='turbulence' result='specularLighting'%3E%3CfeDistantLight azimuth='3' elevation='100'%3E%3C/feDistantLight%3E%3C/feSpecularLighting%3E%3C/filter%3E%3C/defs%3E%3Crect width='700' height='700' fill='%2309090B'%3E%3C/rect%3E%3Crect width='700' height='700' fill='%23ffffff' filter='url(%23nnnoise-filter)'%3E%3C/rect%3E%3C/svg%3E")`
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/50 via-zinc-950/80 to-black/90" />

        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
          
          {/* Floating Icon */}
          {showContent && ( // Conditionally render icon
            <motion.div
              className="absolute top-4 right-4 p-2 rounded-lg bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="text-zinc-300 group-hover:text-white transition-colors duration-300">
                {icon}
              </div>
            </motion.div>
          )}
        </div>

        {/* Content Section */}
        {showContent && ( // Conditionally render content
          <div className="relative p-6 space-y-4">
            {/* Subtle Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-10 bg-repeat bg-[length:30px_30px]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 800%22%3E%3Cg stroke-width=%223.5%22 stroke=%22hsla(0, 0%25, 100%25, 1.00)%22 fill=%22none%22%3E%3Crect width=%22400%22 height=%22400%22 x=%220%22 y=%220%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%220%22 cy=%220%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22400%22 y=%220%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22400%22 cy=%220%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22800%22 y=%220%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22800%22 cy=%220%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%220%22 y=%22400%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%220%22 cy=%22400%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22400%22 y=%22400%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22400%22 cy=%22400%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22800%22 y=%22400%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22800%22 cy=%22400%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%220%22 y=%22800%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%220%22 cy=%22800%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22400%22 y=%22800%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22400%22 cy=%22800%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22800%22 y=%22800%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22800%22 cy=%22800%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3C/g%3E%3C/svg%3E")`
              }}
            />

            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-zinc-100 transition-colors duration-300">
                {title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                {description}
              </p>
            </div>

            {/* Tech Indicators */}
            <div className="relative z-10 flex items-center justify-between pt-4 border-t border-zinc-800/50">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-75" />
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-150" />
              </div>
              <div className="text-xs text-zinc-500 font-mono">
                AI ENABLED
              </div>
            </div>
          </div>
        )}

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 blur-xl" />
        </div>
      </motion.div>
    </Tilt>
  );
}

interface CustomAICardProps {
  imageSrc: string;
  title?: string;
  buttonText?: string;
  onTitleClick?: () => void;
  isLoggedIn?: boolean;
  hasTradingAccount?: boolean;
  isActive?: boolean; // NEW: highlight active card
  onClick?: () => void; // NEW: handle card click
}

const CustomAICard: React.FC<CustomAICardProps> = ({ imageSrc, title, buttonText = "Signal Engine", isLoggedIn = false, hasTradingAccount = false, isActive = false, onClick }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [shake, setShake] = React.useState(false);

  // Determine sign-in button text
  let signInText = "Sign In";
  if (isLoggedIn && !hasTradingAccount) signInText = "Connect Account";
  if (isLoggedIn && hasTradingAccount) signInText = "Shoot Signal";

  // Handle image click (shake + modal)
  const handleImageClick = () => {
    setShake(true);
    setShowModal(true);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <Tilt
      rotationFactor={8}
      isRevese
      springOptions={{ stiffness: 26.7, damping: 4.1, mass: 0.2 }}
      className="group relative w-full"
    >
      <motion.div
        className={`relative overflow-hidden rounded-2xl shadow-xl border border-[#23272f] hover:scale-[1.03] transition-all duration-300 ${shake ? 'animate-shake' : ''}`}
        style={{ background: 'transparent', width: '100%', height: '100%', minHeight: 450, padding: 0 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        onClick={onClick}
      >
        <div className="relative w-full h-full flex items-center justify-center cursor-pointer" onClick={handleImageClick} style={{padding:0}}>
          <img
            src={imageSrc}
            alt={title || 'AI Card'}
            className="object-fill w-full h-full rounded-2xl transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
            draggable="false"
          />
        </div>
        {/* Subtle white glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/10 to-white/10 blur-xl" />
        </div>
      </motion.div>
    </Tilt>
  );
};

// Add shake animation to global styles if not present
// @layer utilities {
//   .animate-shake {
//     animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
//   }
//   @keyframes shake {
//     10%, 90% { transform: translate3d(-1px, 0, 0); }
//     20%, 80% { transform: translate3d(2px, 0, 0); }
//     30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
//     40%, 60% { transform: translate3d(4px, 0, 0); }
//   }
// }

export default CustomAICard;
