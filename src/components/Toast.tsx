import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X, Clock, Mail } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export type ToastType = 'success' | 'error' | 'info' | 'verification';

interface ToastProps {
  type: ToastType;
  message: string;
  isVisible: boolean;
  onClose: () => void;
  email?: string; // For verification toasts
  duration?: number; // Duration in ms, defaults to 5000ms (5 seconds)
}

const Toast: React.FC<ToastProps> = ({
  type,
  message,
  isVisible,
  onClose,
  email,
  duration = 5000
}) => {
  const { colors, currentTheme } = useTheme();

  // Auto-close after duration
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  // Get the appropriate icon and color based on type and theme
  const getIconAndColor = () => {
    // For light themes, make toast colors darker for better contrast
    // Currently there's no light theme, but we'll add this for future-proofing
    const isDarkTheme = ['midnight', 'ocean', 'forest', 'sunset', 'royal'].includes(currentTheme);
    
    // Base colors that work with all themes
    const baseColors = {
      success: {
        background: isDarkTheme ? `${colors.goldPrimary}10` : `${colors.goldPrimary}15`,
        borderColor: isDarkTheme ? `${colors.goldPrimary}30` : `${colors.goldPrimary}60`,
        color: colors.goldPrimary,
        iconColor: colors.goldPrimary
      },
      error: {
        background: isDarkTheme ? 'rgba(220, 38, 38, 0.1)' : 'rgba(220, 38, 38, 0.15)',
        borderColor: isDarkTheme ? 'rgba(220, 38, 38, 0.3)' : 'rgba(220, 38, 38, 0.6)',
        color: isDarkTheme ? '#ef4444' : '#dc2626',
        iconColor: isDarkTheme ? '#ef4444' : '#dc2626'
      },
      info: {
        background: isDarkTheme ? `${colors.goldPrimary}10` : `${colors.goldPrimary}15`,
        borderColor: isDarkTheme ? `${colors.goldPrimary}30` : `${colors.goldPrimary}60`,
        color: colors.goldPrimary,
        iconColor: colors.goldPrimary
      },
      verification: {
        background: isDarkTheme ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.15)',
        borderColor: isDarkTheme ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.6)',
        color: isDarkTheme ? '#60a5fa' : '#3b82f6',
        iconColor: isDarkTheme ? '#60a5fa' : '#3b82f6'
      }
    };
    
    const themeColors = baseColors[type];
    
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle className="w-5 h-5" style={{ color: themeColors.iconColor }} />,
          ...themeColors
        };
      case 'error':
        return {
          icon: <AlertCircle className="w-5 h-5" style={{ color: themeColors.iconColor }} />,
          ...themeColors
        };
      case 'verification':
        return {
          icon: <Mail className="w-5 h-5" style={{ color: themeColors.iconColor }} />,
          ...themeColors
        };
      case 'info':
      default:
        return {
          icon: <Clock className="w-5 h-5" style={{ color: themeColors.iconColor }} />,
          ...themeColors
        };
    }
  };

  const { icon, background, borderColor, color } = getIconAndColor();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 max-w-md w-full"
          initial={{ opacity: 0, y: 50, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, x: 0 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <motion.div
            className="rounded-xl p-4 border shadow-lg flex items-start"
            style={{
              background,
              borderColor,
              color
            }}
          >
            {/* Icon */}
            <div className="shrink-0 mr-3 mt-0.5">
              {icon}
            </div>
            
            {/* Content */}
            <div className="flex-1 mr-2">
              <p className="font-medium mb-1">{message}</p>
              
              {type === 'verification' && email && (
                <p className="text-sm opacity-80">
                  Verification email sent to: <span className="font-semibold">{email}</span>
                </p>
              )}
              
              {/* Progress bar */}
              <div className="w-full h-1 rounded-full overflow-hidden mt-2"
                style={{ background: `${color}30` }}
              >
                <motion.div
                  className="h-full"
                  style={{ background: color }}
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ 
                    duration: duration / 1000, 
                    ease: "linear"
                  }}
                />
              </div>
            </div>
            
            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="shrink-0 p-1 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast; 