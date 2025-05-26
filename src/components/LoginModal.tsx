import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Crown, 
  X,
  Shield,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginMode, setLoginMode] = useState<'login' | 'signup'>('login');
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);
  const { colors } = useTheme();
  const { login, signup, error, clearError, showEmailVerification, verificationEmail } = useAuth();
  const { showToast } = useToast();

  const validateForm = () => {
    if (!email.trim()) {
      showToast('error', 'Please enter your email address');
      return false;
    }
    
    if (!password.trim()) {
      showToast('error', 'Please enter your password');
      return false;
    }
    
    if (loginMode === 'signup' && !displayName.trim()) {
      showToast('error', 'Please enter your name');
      return false;
    }
    
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('error', 'Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear any previous errors
    clearError();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (loginMode === 'login') {
        const result = await login(email, password);
        
        if (result.success) {
          showToast('success', 'Login successful! Welcome back.');
          // Only close the modal on successful login
          onClose();
        } else if (result.needsVerification) {
          showToast('verification', 'Please check your email and verify your account before signing in.', email, 30000);
          // Keep modal open to show the error
        } else {
          // Show error toast but keep modal open
          showToast('error', error || 'Failed to login. Please try again.');
        }
      } else {
        const result = await signup(email, password, displayName);
        
        if (result.success) {
          if (result.needsVerification) {
            showToast('verification', 'Please check your email for a verification link.', email, 30000);
          } else {
            showToast('success', 'Account created successfully!');
            onClose();
          }
        } else if (result.error?.includes('already registered') || result.error === 'Email already registered') {
          showToast('error', 'This email is already registered. Please log in instead.');
          setLoginMode('login'); // Switch to login mode
          // Keep modal open so they can try to login
        } else {
          // Show error toast but keep modal open
          showToast('error', error || 'Failed to create account. Please try again.');
        }
      }
      
      // Only reset form on success which would close the modal
      if (!error) {
        setEmail('');
        setPassword('');
        setDisplayName('');
      }
    } catch (error: any) {
      // This should rarely happen now since we handle errors in auth functions
      showToast('error', 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const demoCredentials = [
    { email: 'raza@salesaipro.com', password: 'demo123', role: 'Pro Member' },
    { email: 'demo@salesaipro.com', password: 'demo123', role: 'Free User' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ background: `${colors.primary}90` }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-lg glass-morphism rounded-3xl p-8 hover-shine"
            style={{
              background: colors.glassPrimary,
              borderColor: colors.border
            }}
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full transition-all duration-300"
              style={{ 
                background: colors.glassSecondary,
                borderColor: colors.border 
              }}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: `${colors.goldPrimary}20`
              }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" style={{ color: colors.textMuted }} />
            </motion.button>

            {/* Header */}
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 
                className="text-3xl font-bold mb-2"
                style={{ color: colors.textPrimary }}
              >
                {loginMode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p style={{ color: colors.textSecondary }}>
                {loginMode === 'login' 
                  ? 'Access your Horafly Intel Pro dashboard' 
                  : 'Join the next generation of voice AI'}
              </p>
            </motion.div>
            
            <motion.div 
              className="flex items-center justify-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div 
                className="flex rounded-xl p-1"
                style={{ background: colors.glassSecondary }}
              >
                <button
                  onClick={() => setLoginMode('login')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                    loginMode === 'login' ? 'shadow-gold' : ''
                  }`}
                  style={{
                    background: loginMode === 'login' ? colors.goldGradient : 'transparent',
                    color: loginMode === 'login' ? colors.primary : colors.textSecondary
                  }}
                >
                  Login
                </button>
                <button
                  onClick={() => setLoginMode('signup')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                    loginMode === 'signup' ? 'shadow-gold' : ''
                  }`}
                  style={{
                    background: loginMode === 'signup' ? colors.goldGradient : 'transparent',
                    color: loginMode === 'signup' ? colors.primary : colors.textSecondary
                  }}
                >
                  Sign Up
                </button>
              </div>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                className="p-4 rounded-xl border"
                style={{
                  background: `${colors.goldPrimary}10`,
                  borderColor: `${colors.goldPrimary}50`,
                  color: colors.goldPrimary
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-sm font-medium">{error}</p>
                {error.includes('Account does not exist') && loginMode === 'login' && (
                  <motion.button
                    onClick={() => setLoginMode('signup')}
                    className="mt-2 text-xs underline hover:no-underline transition-all"
                    style={{ color: colors.goldPrimary }}
                    whileHover={{ scale: 1.02 }}
                  >
                    Click here to sign up instead
                  </motion.button>
                )}
              </motion.div>
            )}

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Display Name Input (Signup only) */}
              {loginMode === 'signup' && (
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Crown className="w-5 h-5" style={{ color: colors.goldPrimary }} />
                  </div>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2"
                    style={{
                      background: colors.glassSecondary,
                      borderColor: colors.border,
                      color: colors.textPrimary,
                      borderWidth: '1px',
                      borderStyle: 'solid'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.goldPrimary;
                      e.target.style.boxShadow = `0 0 0 2px ${colors.goldPrimary}20`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.border;
                      e.target.style.boxShadow = 'none';
                    }}
                    autoComplete="off" // Disable browser autofill
                  />
                </div>
              )}

              {/* Email Input */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Mail className="w-5 h-5" style={{ color: colors.goldPrimary }} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2"
                  style={{
                    background: colors.glassSecondary,
                    borderColor: colors.border,
                    color: colors.textPrimary,
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.goldPrimary;
                    e.target.style.boxShadow = `0 0 0 2px ${colors.goldPrimary}20`;
                    setShowDemoCredentials(true); // Only show demo credentials when focused
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = colors.border;
                    e.target.style.boxShadow = 'none';
                  }}
                  autoComplete="off" // Disable browser autofill
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Lock className="w-5 h-5" style={{ color: colors.goldPrimary }} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-12 pr-12 py-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2"
                  style={{
                    background: colors.glassSecondary,
                    borderColor: colors.border,
                    color: colors.textPrimary,
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.goldPrimary;
                    e.target.style.boxShadow = `0 0 0 2px ${colors.goldPrimary}20`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = colors.border;
                    e.target.style.boxShadow = 'none';
                  }}
                  autoComplete="new-password" // Disable browser autofill
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors"
                  style={{ color: colors.textMuted }}
                  onMouseEnter={(e) => e.currentTarget.style.color = colors.goldPrimary}
                  onMouseLeave={(e) => e.currentTarget.style.color = colors.textMuted}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Please check your email notification for signup mode when validation is needed */}
              {loginMode === 'signup' && (
                <div className="p-4 rounded-xl border"
                  style={{
                    background: `${colors.goldPrimary}10`,
                    borderColor: `${colors.goldPrimary}50`,
                    color: colors.goldPrimary
                  }}
                >
                  <p className="text-sm">
                    <span className="font-medium">Please check your email</span> and click the confirmation link before signing in.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 transition-all duration-300 hover-shine"
                style={{ 
                  background: colors.goldGradient,
                  color: colors.primary
                }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: `0 8px 25px ${colors.goldPrimary}40`
                }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <div className="spinner" />
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    <span>{loginMode === 'login' ? 'Access Dashboard' : 'Create Account'}</span>
                    <Sparkles className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </motion.form>

            {/* Demo Credentials - Only show when email input is focused */}
            {showDemoCredentials && (
              <motion.div
                className="mt-8 pt-6"
                style={{ borderTop: `1px solid ${colors.border}` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p 
                  className="text-center text-sm mb-4"
                  style={{ color: colors.textMuted }}
                >
                  Demo Credentials:
                </p>
                <div className="space-y-2">
                  {demoCredentials.map((cred, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        setEmail(cred.email);
                        setPassword(cred.password);
                      }}
                      className="w-full p-3 rounded-lg text-left transition-all duration-300 group"
                      style={{
                        background: colors.glassSecondary,
                        borderColor: colors.border,
                        borderWidth: '1px',
                        borderStyle: 'solid'
                      }}
                      whileHover={{
                        borderColor: colors.goldPrimary,
                        backgroundColor: `${colors.goldPrimary}10`
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium" style={{ color: colors.textPrimary }}>
                            {cred.email}
                          </p>
                          <p className="text-xs" style={{ color: colors.textMuted }}>
                            Password: {cred.password}
                          </p>
                        </div>
                        <div 
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{ 
                            background: `${colors.goldPrimary}20`,
                            color: colors.goldPrimary
                          }}
                        >
                          {cred.role}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal; 