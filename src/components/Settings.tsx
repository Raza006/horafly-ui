import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Save, 
  LogOut,
  ArrowLeft,
  Shield,
  Bell,
  Palette,
  Crown,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/userService';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  displayName: string;
  plan: string;
  credits: number;
  subscriptionStatus: string;
  onboardingCompleted: boolean;
}

interface SettingsProps {
  onBack: () => void;
  currentUser: User | null;
}

const Settings: React.FC<SettingsProps> = ({ onBack, currentUser }) => {
  const [activeSection, setActiveSection] = useState('profile');
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const { colors, currentTheme, setTheme, themes } = useTheme();
  const { logout } = useAuth();

  const settingsSections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  const handleSaveProfile = async () => {
    if (!currentUser) return;
    
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Update profile in Supabase
      await userService.updateProfile(currentUser.id, {
        display_name: displayName,
        email: email
      });
      
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error: any) {
      console.error('Profile update error:', error);
      setErrorMessage(error.message || 'Failed to update profile. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage('New passwords do not match.');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Update password in Supabase
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        throw error;
      }

      setSuccessMessage('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error: any) {
      console.error('Password change error:', error);
      setErrorMessage(error.message || 'Failed to change password. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      console.log('Settings: Initiating logout...');
      await logout();
      // The redirect will happen automatically by App.tsx when currentUser becomes null
    } catch (error) {
      console.error('Settings: Logout error:', error);
      setErrorMessage('Failed to logout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleThemeChange = async (themeName: string) => {
    try {
      console.log('Settings: Changing theme to', themeName);
      // Simply use setTheme which now handles both local and server persistence
      setTheme(themeName as any);
      
      // Show success message
      setSuccessMessage(`Theme changed to ${themeName}`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Failed to change theme:', error);
      setErrorMessage('Failed to save theme preference.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const renderProfileSection = () => (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
          Display Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: colors.textMuted }} />
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2"
            style={{
              background: colors.glassSecondary,
              borderColor: colors.border,
              color: colors.textPrimary
            }}
            placeholder="Enter your display name"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: colors.textMuted }} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2"
            style={{
              background: colors.glassSecondary,
              borderColor: colors.border,
              color: colors.textPrimary
            }}
            placeholder="Enter your email"
          />
        </div>
      </div>

      <motion.button
        onClick={handleSaveProfile}
        disabled={isLoading}
        className="w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-gold"
        style={{ background: colors.goldGradient, color: colors.primary }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isLoading ? (
          <motion.div
            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        ) : (
          <>
            <Save className="w-5 h-5" />
            <span>Save Changes</span>
          </>
        )}
      </motion.button>
    </motion.div>
  );

  const renderSecuritySection = () => (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
          Current Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: colors.textMuted }} />
                     <input
             type={showCurrentPassword ? 'text' : 'password'}
             value={currentPassword}
             onChange={(e) => setCurrentPassword(e.target.value)}
             className="w-full pl-10 pr-12 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2"
             style={{
               background: colors.glassSecondary,
               borderColor: colors.border,
               color: colors.textPrimary
             }}
             placeholder="Enter current password"
           />
          <button
            type="button"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1"
          >
            {showCurrentPassword ? (
              <EyeOff className="w-5 h-5" style={{ color: colors.textMuted }} />
            ) : (
              <Eye className="w-5 h-5" style={{ color: colors.textMuted }} />
            )}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
          New Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: colors.textMuted }} />
                     <input
             type={showNewPassword ? 'text' : 'password'}
             value={newPassword}
             onChange={(e) => setNewPassword(e.target.value)}
             className="w-full pl-10 pr-12 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2"
             style={{
               background: colors.glassSecondary,
               borderColor: colors.border,
               color: colors.textPrimary
             }}
             placeholder="Enter new password"
           />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1"
          >
            {showNewPassword ? (
              <EyeOff className="w-5 h-5" style={{ color: colors.textMuted }} />
            ) : (
              <Eye className="w-5 h-5" style={{ color: colors.textMuted }} />
            )}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
          Confirm New Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: colors.textMuted }} />
                     <input
             type={showConfirmPassword ? 'text' : 'password'}
             value={confirmPassword}
             onChange={(e) => setConfirmPassword(e.target.value)}
             className="w-full pl-10 pr-12 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2"
             style={{
               background: colors.glassSecondary,
               borderColor: colors.border,
               color: colors.textPrimary
             }}
             placeholder="Confirm new password"
           />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1"
          >
            {showConfirmPassword ? (
              <EyeOff className="w-5 h-5" style={{ color: colors.textMuted }} />
            ) : (
              <Eye className="w-5 h-5" style={{ color: colors.textMuted }} />
            )}
          </button>
        </div>
      </div>

      <motion.button
        onClick={handleChangePassword}
        disabled={isLoading || !currentPassword || !newPassword || !confirmPassword}
        className="w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-gold disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ background: colors.goldGradient, color: colors.primary }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isLoading ? (
          <motion.div
            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        ) : (
          <>
            <Shield className="w-5 h-5" />
            <span>Change Password</span>
          </>
        )}
      </motion.button>
    </motion.div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSection();
      case 'security':
        return renderSecuritySection();
      case 'notifications':
        return (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Bell className="w-16 h-16 mx-auto mb-4" style={{ color: colors.textMuted }} />
            <h3 className="text-xl font-semibold mb-2" style={{ color: colors.textPrimary }}>
              Notifications Settings
            </h3>
            <p style={{ color: colors.textSecondary }}>
              Notification preferences coming soon!
            </p>
          </motion.div>
        );
      case 'appearance':
        return (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: colors.textPrimary }}>
                Theme Selection
              </h3>
              <p className="mb-6" style={{ color: colors.textSecondary }}>
                Choose your preferred theme for the application
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {themes.map((theme) => (
                  <motion.button
                    key={theme.name}
                    onClick={() => handleThemeChange(theme.name)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      currentTheme === theme.name ? 'shadow-lg' : ''
                    }`}
                    style={{
                      background: currentTheme === theme.name 
                        ? `${colors.goldPrimary}20` 
                        : colors.glassSecondary,
                      borderColor: currentTheme === theme.name 
                        ? colors.goldPrimary 
                        : colors.border
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ background: theme.colors.goldGradient }}
                      >
                        <Palette className="w-6 h-6" style={{ color: theme.colors.primary }} />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold" style={{ color: colors.textPrimary }}>
                          {theme.displayName}
                        </div>
                        <div className="text-sm" style={{ color: colors.textSecondary }}>
                          {theme.name === 'midnight' && 'Classic dark theme with warm cream accents'}
                          {theme.name === 'ocean' && 'Cool blue tones inspired by the ocean'}
                          {theme.name === 'forest' && 'Natural green theme for a calming experience'}
                          {theme.name === 'sunset' && 'Warm orange and amber sunset colors'}
                          {theme.name === 'royal' && 'Elegant purple theme with royal vibes'}
                        </div>
                      </div>
                      {currentTheme === theme.name && (
                        <CheckCircle className="w-6 h-6 ml-auto" style={{ color: colors.goldPrimary }} />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        );
      default:
        return renderProfileSection();
    }
  };

  return (
    <div className="min-h-screen" style={{ background: colors.primary }}>
      {/* Header */}
      <motion.div
        className="border-b"
        style={{ 
          background: colors.glassPrimary,
          borderColor: colors.border
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={onBack}
              className="p-2 rounded-xl transition-all duration-300"
              style={{ background: colors.glassSecondary }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" style={{ color: colors.textPrimary }} />
            </motion.button>
            <h1 className="text-2xl font-bold" style={{ color: colors.textPrimary }}>
              Settings
            </h1>
          </div>
          
          <motion.button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 border"
            style={{ 
              background: colors.glassSecondary,
              borderColor: colors.border,
              color: colors.textSecondary
            }}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: `${colors.goldPrimary}20`,
              borderColor: colors.goldPrimary
            }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </motion.button>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div 
              className="rounded-2xl p-6 border"
              style={{ 
                background: colors.glassPrimary,
                borderColor: colors.border
              }}
            >
              {/* User Info */}
              <div className="text-center mb-6 pb-6 border-b" style={{ borderColor: colors.border }}>
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ background: colors.goldGradient }}
                >
                  <Crown className="w-8 h-8" style={{ color: colors.primary }} />
                </div>
                <h3 className="font-semibold" style={{ color: colors.textPrimary }}>
                  {currentUser?.displayName}
                </h3>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  {currentUser?.email}
                </p>
                <div 
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-2"
                  style={{ 
                    background: `${colors.goldPrimary}20`,
                    color: colors.goldPrimary
                  }}
                >
                  {currentUser?.plan} Plan
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {settingsSections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  
                  return (
                    <motion.button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        isActive ? 'shadow-gold' : ''
                      }`}
                      style={{
                        background: isActive ? colors.goldGradient : colors.glassSecondary,
                        color: isActive ? colors.primary : colors.textSecondary
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{section.label}</span>
                    </motion.button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div 
              className="rounded-2xl p-8 border"
              style={{ 
                background: colors.glassPrimary,
                borderColor: colors.border
              }}
            >
              {/* Success/Error Messages */}
              {successMessage && (
                <motion.div
                  className="mb-6 p-4 rounded-xl border flex items-center space-x-3"
                  style={{
                    background: `${colors.goldPrimary}10`,
                    borderColor: `${colors.goldPrimary}50`,
                    color: colors.goldPrimary
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">{successMessage}</span>
                </motion.div>
              )}

              {errorMessage && (
                <motion.div
                  className="mb-6 p-4 rounded-xl border flex items-center space-x-3"
                  style={{
                    background: `${colors.goldPrimary}10`,
                    borderColor: `${colors.goldPrimary}50`,
                    color: colors.goldPrimary
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">{errorMessage}</span>
                </motion.div>
              )}

              {renderContent()}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 