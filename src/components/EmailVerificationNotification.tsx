import React from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, Clock } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface EmailVerificationNotificationProps {
  email: string;
  onClose: () => void;
  isVisible: boolean;
}

const EmailVerificationNotification: React.FC<EmailVerificationNotificationProps> = ({
  email,
  onClose,
  isVisible
}) => {
  const { colors } = useTheme();

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0, 0, 0, 0.7)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="max-w-md w-full rounded-2xl p-8 border shadow-2xl"
        style={{
          background: colors.glassPrimary,
          borderColor: colors.border
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: colors.goldGradient }}
          >
            <Mail className="w-8 h-8" style={{ color: colors.primary }} />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: colors.textPrimary }}>
            Check Your Email
          </h2>
          <p style={{ color: colors.textSecondary }}>
            We've sent a verification link to
          </p>
          <p className="font-semibold mt-1" style={{ color: colors.goldPrimary }}>
            {email}
          </p>
        </div>

        {/* Instructions */}
        <div className="space-y-4 mb-6">
          <div className="flex items-start space-x-3">
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
              style={{ background: `${colors.goldPrimary}20` }}
            >
              <span className="text-xs font-bold" style={{ color: colors.goldPrimary }}>1</span>
            </div>
            <div>
              <p className="font-medium" style={{ color: colors.textPrimary }}>
                Check your inbox
              </p>
              <p className="text-sm" style={{ color: colors.textSecondary }}>
                Look for an email from Horafly Intel Pro
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
              style={{ background: `${colors.goldPrimary}20` }}
            >
              <span className="text-xs font-bold" style={{ color: colors.goldPrimary }}>2</span>
            </div>
            <div>
              <p className="font-medium" style={{ color: colors.textPrimary }}>
                Click the verification link
              </p>
              <p className="text-sm" style={{ color: colors.textSecondary }}>
                This will activate your account
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
              style={{ background: `${colors.goldPrimary}20` }}
            >
              <span className="text-xs font-bold" style={{ color: colors.goldPrimary }}>3</span>
            </div>
            <div>
              <p className="font-medium" style={{ color: colors.textPrimary }}>
                Return and sign in
              </p>
              <p className="text-sm" style={{ color: colors.textSecondary }}>
                Use your email and password to access your account
              </p>
            </div>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Clock className="w-4 h-4" style={{ color: colors.textMuted }} />
            <span className="text-sm" style={{ color: colors.textMuted }}>
              Waiting for verification...
            </span>
          </div>
          <div 
            className="w-full h-2 rounded-full overflow-hidden"
            style={{ background: `${colors.goldPrimary}20` }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: colors.goldGradient }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <motion.button
            onClick={onClose}
            className="w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300"
            style={{ 
              background: colors.goldGradient,
              color: colors.primary
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            I'll Check My Email
          </motion.button>
          
          <p className="text-xs text-center" style={{ color: colors.textMuted }}>
            Didn't receive the email? Check your spam folder or contact support.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EmailVerificationNotification; 