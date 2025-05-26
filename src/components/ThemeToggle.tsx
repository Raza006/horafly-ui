import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { currentTheme, setTheme, themes } = useTheme();

  const toggleTheme = () => {
    const currentIndex = themes.findIndex(t => t.name === currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex].name);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-3 rounded-xl transition-all duration-300 group overflow-hidden"
      style={{
        background: 'var(--color-glass-primary)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--color-border)',
      }}
      whileHover={{ 
        scale: 1.05,
        borderColor: 'var(--color-border-active)'
      }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to next theme`}
    >
      {/* Background shine effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: 'var(--shine-gradient)',
        }}
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 2,
        }}
      />

      {/* Theme indicator background */}
      <motion.div
        className="absolute inset-1 rounded-lg"
        animate={{
          background: currentTheme === 'midnight' 
            ? 'linear-gradient(135deg, #1e293b, #0f172a)' 
            : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Icon container */}
      <div className="relative z-10 flex items-center justify-center w-6 h-6">
        <motion.div
          key={currentTheme}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 10 
          }}
        >
          {currentTheme === 'midnight' ? (
            <Sun 
              className="w-5 h-5" 
              style={{ color: '#fbbf24' }}
            />
          ) : (
            <Moon 
              className="w-5 h-5" 
              style={{ color: '#e2e8f0' }}
            />
          )}
        </motion.div>
      </div>

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-30"
        style={{
          background: 'var(--color-gold-primary)',
        }}
        initial={{ scale: 0 }}
        whileTap={{ scale: 1 }}
        transition={{ duration: 0.1 }}
      />
    </motion.button>
  );
};

export default ThemeToggle; 