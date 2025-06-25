import React from "react";

// Animated border using SVG for smoothness and performance
const AnimatedBorderCard: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative flex flex-col items-center justify-center bg-black rounded-3xl shadow-2xl p-10 md:p-16 w-[380px] h-[380px] md:w-[480px] md:h-[480px] overflow-hidden">
      {/* Animated SVG Border */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-20"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <rect
          x="2" y="2" width="96" height="96" rx="18" ry="18"
          fill="none"
          stroke="url(#animated-gradient)"
          strokeWidth="3"
          strokeDasharray="60 30 60 30 60 30 60 30"
          strokeDashoffset="0"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="180"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </rect>
        <defs>
          <linearGradient id="animated-gradient">
            <stop offset="0%" stopColor="#e6c200" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#fffbe6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#e6c200" stopOpacity="0.7" />
          </linearGradient>
        </defs>
      </svg>
      {/* Card Content */}
      <div className="relative z-30 w-full h-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBorderCard;
