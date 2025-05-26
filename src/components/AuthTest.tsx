import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const AuthTest: React.FC = () => {
  const { currentUser, isLoading, error } = useAuth();

  if (isLoading) {
    return (
      <div style={{ padding: '20px', background: '#f0f0f0', margin: '10px', borderRadius: '8px' }}>
        <h3>🔄 Authentication Status: LOADING</h3>
        <p>Checking authentication state...</p>
        <p><em>If this stays loading for more than 5 seconds, there's an issue.</em></p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', background: '#ffe6e6', margin: '10px', borderRadius: '8px' }}>
        <h3>❌ Authentication Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (currentUser) {
    return (
      <div style={{ padding: '20px', background: '#e6ffe6', margin: '10px', borderRadius: '8px' }}>
        <h3>✅ User Authenticated</h3>
        <p><strong>ID:</strong> {currentUser.id}</p>
        <p><strong>Email:</strong> {currentUser.email}</p>
        <p><strong>Name:</strong> {currentUser.displayName}</p>
        <p><strong>Plan:</strong> {currentUser.plan}</p>
        <p><strong>Credits:</strong> {currentUser.credits}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', background: '#fff3cd', margin: '10px', borderRadius: '8px' }}>
      <h3>👤 No User Authenticated</h3>
      <p>User is not logged in. This is normal for the landing page.</p>
    </div>
  );
};

export default AuthTest; 