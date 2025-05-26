import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const ShardBackground: React.FC = () => {
  const { colors } = useTheme();

  // Complex fractal geometric patterns - multiple interconnected shapes
  const fractalShards = [
    { 
      id: 1, 
      type: 'complex-polygon',
      size: { width: 350, height: 280 }, 
      position: { top: '8%', right: '12%' },
      rotation: 15,
      opacity: 0.25,
      delay: 0,
      color: colors.goldPrimary,
      clipPath: 'polygon(50% 0%, 85% 35%, 70% 100%, 30% 100%, 15% 35%)', // Pentagon-based fractal
      innerPattern: 'polygon(50% 20%, 70% 45%, 60% 80%, 40% 80%, 30% 45%)'
    },
    { 
      id: 2, 
      type: 'fractal-star',
      size: { width: 300, height: 300 }, 
      position: { bottom: '15%', left: '8%' },
      rotation: -30,
      opacity: 0.22,
      delay: 1.2,
      color: colors.goldSecondary,
      clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', // Star fractal
      innerPattern: 'polygon(50% 15%, 58% 38%, 75% 38%, 63% 50%, 68% 70%, 50% 60%, 32% 70%, 37% 50%, 25% 38%, 42% 38%)'
    },
    { 
      id: 3, 
      type: 'crystal-formation',
      size: { width: 280, height: 320 }, 
      position: { top: '45%', left: '65%' },
      rotation: 45,
      opacity: 0.28,
      delay: 2.1,
      color: colors.goldMuted,
      clipPath: 'polygon(50% 0%, 80% 25%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 20% 25%)', // Crystal shard
      innerPattern: 'polygon(50% 15%, 70% 35%, 85% 65%, 65% 85%, 35% 85%, 15% 65%, 30% 35%)'
    },
    { 
      id: 4, 
      type: 'hexagonal-fractal',
      size: { width: 260, height: 260 }, 
      position: { top: '20%', left: '25%' },
      rotation: 60,
      opacity: 0.24,
      delay: 0.8,
      color: colors.goldPrimary,
      clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)', // Hexagon
      innerPattern: 'polygon(40% 15%, 60% 15%, 80% 50%, 60% 85%, 40% 85%, 20% 50%)'
    },
    { 
      id: 5, 
      type: 'spiral-fractal',
      size: { width: 240, height: 280 }, 
      position: { bottom: '25%', right: '30%' },
      rotation: -45,
      opacity: 0.26,
      delay: 1.8,
      color: colors.goldSecondary,
      clipPath: 'polygon(50% 0%, 90% 20%, 100% 70%, 60% 100%, 10% 80%, 0% 30%, 40% 0%)', // Spiral approximation
      innerPattern: 'polygon(50% 20%, 75% 35%, 80% 65%, 55% 80%, 25% 65%, 20% 35%)'
    }
  ];

  // Smaller geometric fractals for layering
  const microFractals = [
    ...Array(12)
  ].map((_, i) => {
    const patterns = [
      'polygon(50% 0%, 0% 100%, 100% 100%)', // Triangle
      'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)', // Hexagon
      'polygon(50% 0%, 85% 35%, 70% 100%, 30% 100%, 15% 35%)', // Pentagon
      'polygon(20% 0%, 80% 0%, 100% 80%, 50% 100%, 0% 80%)', // House shape
    ];
    
    return {
      id: `micro-${i}`,
      size: 40 + Math.random() * 60,
      position: { 
        top: `${Math.random() * 100}%`, 
        left: `${Math.random() * 100}%` 
      },
      rotation: Math.random() * 360,
      opacity: 0.15 + Math.random() * 0.25,
      delay: Math.random() * 4,
      color: i % 3 === 0 ? colors.goldPrimary : i % 3 === 1 ? colors.goldSecondary : colors.goldMuted,
      clipPath: patterns[i % patterns.length]
    };
  });

  // Animated light beams and energy lines
  const lightBeams = [
    {
      id: 'beam-1',
      startX: 15,
      startY: 20,
      endX: 85,
      endY: 80,
      thickness: 2,
      opacity: 0.3,
      duration: 4,
      delay: 0
    },
    {
      id: 'beam-2',
      startX: 80,
      startY: 15,
      endX: 20,
      endY: 75,
      thickness: 1.5,
      opacity: 0.25,
      duration: 5,
      delay: 1.5
    },
    {
      id: 'beam-3',
      startX: 45,
      startY: 5,
      endX: 55,
      endY: 95,
      thickness: 1,
      opacity: 0.2,
      duration: 6,
      delay: 3
    },
    {
      id: 'beam-4',
      startX: 10,
      startY: 60,
      endX: 90,
      endY: 40,
      thickness: 1.8,
      opacity: 0.28,
      duration: 3.5,
      delay: 0.8
    }
  ];

  // Orbiting energy particles
  const energyOrbs = [
    ...Array(8)
  ].map((_, i) => ({
    id: `orb-${i}`,
    radius: 120 + i * 30,
    size: 8 + Math.random() * 12,
    opacity: 0.2 + Math.random() * 0.2,
    duration: 15 + i * 3,
    delay: i * 0.5,
    color: i % 2 === 0 ? colors.goldPrimary : colors.goldSecondary
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Complex Fractal Geometric Shards */}
      {fractalShards.map((shard) => (
        <motion.div
          key={shard.id}
          className="absolute"
          style={{
            width: `${shard.size.width}px`,
            height: `${shard.size.height}px`,
            ...shard.position,
          }}
          initial={{ 
            opacity: 0, 
            scale: 0.3, 
            rotate: shard.rotation - 120,
            rotateY: -180
          }}
          animate={{ 
            opacity: shard.opacity, 
            scale: 1, 
            rotate: shard.rotation,
            rotateY: 0
          }}
          transition={{ 
            duration: 4, 
            delay: shard.delay,
            ease: "easeOut"
          }}
        >
          {/* Main fractal shape */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${shard.color}${Math.floor(shard.opacity * 255).toString(16)} 0%, ${shard.color}${Math.floor(shard.opacity * 0.4 * 255).toString(16)} 50%, transparent 100%)`,
              clipPath: shard.clipPath,
              filter: 'blur(0.8px)',
              backdropFilter: 'blur(1px)'
            }}
            animate={{
              rotateY: [0, 360],
              scale: [1, 1.08, 1],
              filter: ['blur(0.8px)', 'blur(1.5px)', 'blur(0.8px)']
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Inner fractal pattern */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(45deg, ${shard.color}${Math.floor(shard.opacity * 1.2 * 255).toString(16)} 0%, transparent 70%)`,
              clipPath: shard.innerPattern,
              filter: 'blur(0.3px)'
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [shard.opacity * 1.2, shard.opacity * 2, shard.opacity * 1.2],
              rotateZ: [0, -360]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: shard.delay * 0.5
            }}
          />

          {/* Fractal edge glow */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'transparent',
              border: `1px solid ${shard.color}${Math.floor(shard.opacity * 0.8 * 255).toString(16)}`,
              clipPath: shard.clipPath,
              filter: 'blur(2px)'
            }}
            animate={{
              borderColor: [
                `${shard.color}${Math.floor(shard.opacity * 0.8 * 255).toString(16)}`,
                `${shard.color}${Math.floor(shard.opacity * 1.5 * 255).toString(16)}`,
                `${shard.color}${Math.floor(shard.opacity * 0.8 * 255).toString(16)}`
              ],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      ))}

      {/* Micro Fractal Patterns */}
      {microFractals.map((fractal) => (
        <motion.div
          key={fractal.id}
          className="absolute"
          style={{
            width: `${fractal.size}px`,
            height: `${fractal.size}px`,
            ...fractal.position
          }}
          initial={{ 
            opacity: 0, 
            scale: 0.1,
            rotate: fractal.rotation - 180
          }}
          animate={{ 
            opacity: fractal.opacity, 
            scale: 1,
            rotate: fractal.rotation
          }}
          transition={{ 
            duration: 2, 
            delay: fractal.delay,
            ease: "easeOut"
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: `${fractal.color}${Math.floor(fractal.opacity * 255).toString(16)}`,
              clipPath: fractal.clipPath,
              filter: 'blur(0.2px)'
            }}
            animate={{
              rotateZ: [0, 360],
              scale: [1, 1.2, 1],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      ))}

      {/* Animated Light Beams */}
      {lightBeams.map((beam) => (
        <motion.div
          key={beam.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: beam.delay }}
        >
          <motion.div
            className="absolute"
            style={{
              left: `${beam.startX}%`,
              top: `${beam.startY}%`,
              width: `${Math.sqrt(Math.pow(beam.endX - beam.startX, 2) + Math.pow(beam.endY - beam.startY, 2))}%`,
              height: `${beam.thickness}px`,
              background: `linear-gradient(90deg, transparent 0%, ${colors.goldPrimary}${Math.floor(beam.opacity * 255).toString(16)} 20%, ${colors.goldPrimary}${Math.floor(beam.opacity * 255).toString(16)} 80%, transparent 100%)`,
              transformOrigin: '0 50%',
              transform: `rotate(${Math.atan2(beam.endY - beam.startY, beam.endX - beam.startX) * 180 / Math.PI}deg)`,
              filter: 'blur(0.5px)'
            }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, beam.opacity, 0]
            }}
            transition={{
              duration: beam.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: beam.delay
            }}
          />
          
          {/* Beam glow effect */}
          <motion.div
            className="absolute"
            style={{
              left: `${beam.startX}%`,
              top: `${beam.startY}%`,
              width: `${Math.sqrt(Math.pow(beam.endX - beam.startX, 2) + Math.pow(beam.endY - beam.startY, 2))}%`,
              height: `${beam.thickness * 3}px`,
              background: `linear-gradient(90deg, transparent 0%, ${colors.goldPrimary}${Math.floor(beam.opacity * 0.3 * 255).toString(16)} 50%, transparent 100%)`,
              transformOrigin: '0 50%',
              transform: `rotate(${Math.atan2(beam.endY - beam.startY, beam.endX - beam.startX) * 180 / Math.PI}deg) translateY(-${beam.thickness}px)`,
              filter: 'blur(2px)'
            }}
            animate={{
              scaleX: [0, 1.2, 0],
              opacity: [0, beam.opacity * 0.5, 0]
            }}
            transition={{
              duration: beam.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: beam.delay + 0.2
            }}
          />
        </motion.div>
      ))}

      {/* Orbiting Energy Particles */}
      {energyOrbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute top-1/2 left-1/2"
          style={{
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            marginLeft: `-${orb.size / 2}px`,
            marginTop: `-${orb.size / 2}px`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: orb.opacity }}
          transition={{ duration: 1, delay: orb.delay }}
        >
          <motion.div
            className="w-full h-full rounded-full"
            style={{
              background: `radial-gradient(circle, ${orb.color}${Math.floor(orb.opacity * 255).toString(16)} 0%, transparent 70%)`,
              filter: 'blur(1px)'
            }}
            animate={{
              x: [orb.radius, -orb.radius, orb.radius],
              y: [0, orb.radius, -orb.radius, 0],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      ))}

      {/* Central Fractal Energy Core */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3, delay: 2 }}
      >
        {/* Outer fractal ring - complex geometry */}
        <motion.div
          className="w-64 h-64"
          style={{
            background: `conic-gradient(from 0deg, ${colors.goldPrimary}20, ${colors.goldSecondary}35, ${colors.goldMuted}20, transparent, ${colors.goldPrimary}15)`,
            clipPath: 'polygon(50% 0%, 85% 35%, 70% 100%, 30% 100%, 15% 35%)',
            filter: 'blur(15px)'
          }}
          animate={{
            rotateZ: [0, 360],
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Middle fractal layer */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40"
          style={{
            background: `radial-gradient(polygon, ${colors.goldPrimary}30 0%, ${colors.goldSecondary}40 50%, transparent 80%)`,
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
            filter: 'blur(8px)'
          }}
          animate={{
            rotateZ: [0, -360],
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Inner fractal core */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${colors.goldPrimary}40 0%, transparent 70%)`,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            filter: 'blur(4px)'
          }}
          animate={{
            rotateZ: [0, 360],
            scale: [1, 1.6, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
};

export default ShardBackground; 