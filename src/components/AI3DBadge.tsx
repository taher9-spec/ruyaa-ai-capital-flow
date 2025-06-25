import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial, Sphere, RoundedBox } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import * as THREE from 'three';

// 3D Brain Icon Component
const Brain3D: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
    
    if (materialRef.current) {
      materialRef.current.distort = isHovered ? 0.4 : 0.2;
      materialRef.current.speed = isHovered ? 2 : 1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[0.3, 32, 32]} position={[-1.2, 0, 0]}>
        <MeshDistortMaterial
          ref={materialRef}
          color="#f5c518"
          distort={0.2}
          speed={1}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
      
      {/* Neural network connections */}
      <group>
        {Array.from({ length: 8 }, (_, i) => (
          <mesh
            key={i}
            position={[
              -1.2 + Math.sin(i * 0.785) * 0.4,
              Math.cos(i * 0.785) * 0.4,
              Math.sin(i * 0.392) * 0.2,
            ]}
          >
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="#ffffff" opacity={0.6} transparent />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

// 3D Background Element
const BackgroundSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2, 32, 32]} position={[0, 0, -3]}>
      <MeshDistortMaterial
        color="#1a1a1a"
        distort={0.3}
        speed={0.5}
        roughness={0.8}
        metalness={0.1}
        opacity={0.1}
        transparent
      />
    </Sphere>
  );
};

// 3D Text Component
const Text3D: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  const textRef = useRef<THREE.Mesh | null>(null);
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <Text
        ref={textRef}
        position={[0.5, 0, 0]}
        fontSize={0.25}
        maxWidth={4}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign="center"
        font="/fonts/SpaceGrotesk-Bold.woff"
        anchorX="center"
        anchorY="middle"
      >
        AI-POWERED TRADING PLATFORM
        <meshStandardMaterial
          color={isHovered ? "#f5c518" : "#ffffff"}
          emissive={isHovered ? "#f5c518" : "#ffffff"}
          emissiveIntensity={isHovered ? 0.3 : 0.1}
        />
      </Text>
    </Float>
  );
};

// Main 3D Scene
const AI3DScene: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#f5c518" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
      
      <BackgroundSphere />
      <Brain3D isHovered={isHovered} />
      <Text3D isHovered={isHovered} />
    </>
  );
};

// Main Component
const AI3DBadge: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative inline-block group cursor-pointer"
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        type: "spring", 
        stiffness: 100,
        damping: 15 
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          style={{ width: '100%', height: '100%' }}
        >
          <AI3DScene isHovered={isHovered} />
        </Canvas>
      </div>
      
      {/* Overlay Content */}
      <div className="relative z-10 inline-flex items-center gap-3 px-8 py-4 backdrop-blur-md border border-white/20 rounded-full bg-black/20">
        {/* Fallback 2D Brain Icon */}
        <motion.div
          animate={{ 
            rotate: isHovered ? 360 : 0,
            scale: isHovered ? 1.2 : 1
          }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <Brain className="w-6 h-6 text-gold drop-shadow-lg" />
        </motion.div>
        
        <motion.span 
          className="text-lg font-bold font-space-grotesk bg-gradient-to-r from-white via-gold to-white bg-clip-text text-transparent"
          animate={{
            backgroundPosition: isHovered ? "200% 0" : "0% 0",
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
          style={{
            backgroundSize: "200% 100%",
          }}
        >
          AI-POWERED TRADING PLATFORM
        </motion.span>
      </div>
      
      {/* Glow Effects */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-gold/20 blur-xl"
        animate={{
          scale: isHovered ? 1.4 : 1,
          opacity: isHovered ? 0.6 : 0.2,
        }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Particle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold rounded-full"
            style={{
              left: `${20 + (i * 5)}%`,
              top: `${10 + Math.sin(i) * 30}%`,
            }}
            animate={{
              y: isHovered ? [-10, 10] : [0, 0],
              opacity: isHovered ? [0.3, 0.8, 0.3] : [0.1, 0.3, 0.1],
              scale: isHovered ? [0.5, 1.2, 0.5] : [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default AI3DBadge;