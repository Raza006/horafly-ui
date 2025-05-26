import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import Preloader from './components/Preloader';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import './App.css';

function AppContent() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'settings'>('landing');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { currentUser, isLoading: authLoading, logout } = useAuth();

  useEffect(() => {
    // Reduced loading time for better user experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Reduced to 1 second loading time

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-navigate to dashboard if user is logged in
    console.log('🔄 Navigation check:', { 
      currentUser: !!currentUser, 
      authLoading, 
      isLoggingOut, 
      currentView 
    });
    
    if (currentUser && !authLoading && !isLoggingOut) {
      console.log('✅ User logged in, navigating to dashboard');
      setCurrentView('dashboard');
    } else if (!currentUser && !authLoading && !isLoggingOut) {
      console.log('🔓 No user, staying on landing page');
      setCurrentView('landing');
    }
  }, [currentUser, authLoading, isLoggingOut]);

  // Additional effect to handle immediate navigation after login
  useEffect(() => {
    if (currentUser && currentView === 'landing') {
      console.log('🚀 Force navigation to dashboard after login');
      setCurrentView('dashboard');
    }
  }, [currentUser, currentView]);

  const handleDashboardClick = () => {
    if (currentUser) {
      setCurrentView('dashboard');
    }
  };

  const handleSettingsClick = () => {
    if (currentUser) {
      setCurrentView('settings');
    }
  };

  const handleBackFromSettings = () => {
    setCurrentView('landing');
  };

  const handleLogout = async () => {
    try {
      console.log('🚪 App handleLogout called');
      setIsLoggingOut(true);
      
      // Set a timeout to prevent infinite loading during logout
      const logoutTimeout = setTimeout(() => {
        console.log('⚠️ Logout timeout reached, forcing navigation');
        setIsLoggingOut(false);
        setCurrentView('landing');
      }, 3000); // 3 second timeout for logout
      
      // Call the actual logout function from AuthContext
      await logout();
      
      // Clear the timeout since logout completed successfully
      clearTimeout(logoutTimeout);
      setIsLoggingOut(false);
      
      // Navigation will happen automatically via useEffect when currentUser becomes null
      console.log('✅ Logout completed, user should be redirected');
    } catch (error) {
      console.error('❌ Logout error:', error);
      // Force navigation even if logout fails
      setIsLoggingOut(false);
      setCurrentView('landing');
    }
  };

  // Show preloader while loading (but not during logout to prevent infinite loading)
  if ((isLoading || authLoading) && !isLoggingOut) {
    return <Preloader />;
  }

  // Show a simple loading message during logout
  if (isLoggingOut) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-primary)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Logging out...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-all duration-300" style={{ background: 'var(--color-primary)' }}>
      {currentView === 'landing' ? (
        <LandingPage 
          onDashboardClick={handleDashboardClick}
          onSettingsClick={handleSettingsClick}
          currentUser={currentUser}
        />
      ) : currentView === 'dashboard' ? (
        <Dashboard 
          onLogout={handleLogout}
          onSettings={handleSettingsClick}
          currentUser={currentUser}
        />
      ) : (
        <Settings
          onBack={handleBackFromSettings}
          currentUser={currentUser}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
