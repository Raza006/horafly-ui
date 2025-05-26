import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const Preloader: React.FC = () => {
  const { colors } = useTheme();

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: colors.primary }}
    >
      {/* Background animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-30"
            style={{ background: colors.goldPrimary }}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
            }}
            transition={{
              duration: Math.random() * 8 + 12,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main nucleus container */}
      <div className="relative">
        {/* Central nucleus */}
        <motion.div
          className="w-20 h-20 rounded-full shadow-2xl relative z-10"
          style={{ background: colors.goldGradient }}
          animate={{
            scale: [1, 1.15, 1],
            boxShadow: [
              `0 0 20px ${colors.goldPrimary}50`,
              `0 0 40px ${colors.goldPrimary}80`,
              `0 0 20px ${colors.goldPrimary}50`
            ]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Inner glow */}
          <div 
            className="absolute inset-3 rounded-full opacity-60" 
            style={{ background: colors.textPrimary }}
          />
        </motion.div>

        {/* Electron orbit rings */}
        {[...Array(3)].map((_, ringIndex) => {
          const radius = 70 + ringIndex * 35;
          const duration = 4 + ringIndex * 0.8;
          
          return (
            <div key={ringIndex} className="absolute inset-0 flex items-center justify-center">
              {/* Orbit path */}
              <motion.div
                className="absolute border rounded-full"
                style={{
                  width: radius * 2,
                  height: radius * 2,
                  borderColor: `${colors.goldPrimary}20`
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: duration * 2.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Electrons */}
              {[...Array(ringIndex + 2)].map((_, electronIndex) => {
                const angle = (electronIndex * 360) / (ringIndex + 2);
                return (
                  <motion.div
                    key={electronIndex}
                    className="absolute w-3 h-3 rounded-full shadow-lg"
                    style={{
                      left: '50%',
                      top: '50%',
                      marginLeft: '-6px',
                      marginTop: '-6px',
                      background: colors.goldGradient
                    }}
                    animate={{
                      rotate: 360,
                      x: Math.cos((angle * Math.PI) / 180) * radius,
                      y: Math.sin((angle * Math.PI) / 180) * radius,
                    }}
                    transition={{
                      duration: duration,
                      repeat: Infinity,
                      ease: "linear",
                      delay: (electronIndex * duration) / (ringIndex + 2)
                    }}
                  >
                    {/* Electron trail */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ background: colors.goldPrimary }}
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.8, 0.2, 0.8]
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>
          );
        })}

        {/* Energy waves */}
        {[...Array(3)].map((_, waveIndex) => (
          <motion.div
            key={waveIndex}
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{
              duration: 10 + waveIndex * 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <motion.div
              className="border-2 rounded-full"
              style={{
                width: 220 + waveIndex * 50,
                height: 220 + waveIndex * 50,
                borderColor: `${colors.goldPrimary}30`
              }}
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: waveIndex * 1.3
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Loading text */}
      <motion.div
        className="absolute bottom-32 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <motion.h2
          className="text-3xl font-bold mb-4"
          style={{ color: colors.textPrimary }}
          animate={{
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Horafly AI Platform
        </motion.h2>
        
        {/* Loading dots */}
        <div className="flex justify-center space-x-3 mb-4">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{ background: colors.goldPrimary }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3
              }}
            />
          ))}
        </div>
        
        <motion.p
          className="text-sm font-medium"
          style={{ color: colors.goldPrimary }}
          animate={{
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Initializing AI systems...
        </motion.p>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8">
        <motion.div
          className="w-10 h-10 border-2 rounded-full"
          style={{ borderColor: `${colors.goldPrimary}40` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      <div className="absolute top-8 right-8">
        <motion.div
          className="w-8 h-8 border-2 rounded-full"
          style={{ borderColor: `${colors.goldSecondary}40` }}
          animate={{ rotate: -360 }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      <div className="absolute bottom-8 left-8">
        <motion.div
          className="w-6 h-6 rounded-full"
          style={{ background: `${colors.goldPrimary}30` }}
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <div className="absolute bottom-8 right-8">
        <motion.div
          className="w-12 h-12 border rounded-full"
          style={{ borderColor: `${colors.goldMuted}30` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full"
        style={{ background: `${colors.goldPrimary}20` }}
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-3/4 right-1/4 w-6 h-6 rounded-full"
        style={{ background: `${colors.goldSecondary}25` }}
        animate={{
          y: [20, -20, 20],
          x: [10, -10, 10],
          rotate: [360, 180, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default Preloader; 