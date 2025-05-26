import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import LandingPage from './LandingPage';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser } = useAuth();

  const handleDashboardClick = () => {
    // This would typically handle authentication flow
    console.log('Dashboard access requested');
  };

  const handleSettingsClick = () => {
    // This would typically handle settings navigation
    console.log('Settings access requested');
  };

  return currentUser ? <>{children}</> : (
    <LandingPage 
      onDashboardClick={handleDashboardClick}
      onSettingsClick={handleSettingsClick}
      currentUser={currentUser} 
    />
  );
};

export default ProtectedRoute; 