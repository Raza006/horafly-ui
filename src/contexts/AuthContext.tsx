import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { supabase, UserProfile } from '../lib/supabase';
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { userService } from '../services/userService';

interface User {
  id: string;
  email: string;
  displayName: string;
  plan: string;
  credits: number;
  subscriptionStatus: string;
  onboardingCompleted: boolean;
}

interface AuthResult {
  success: boolean;
  error?: string;
  needsVerification?: boolean;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<AuthResult>;
  signup: (email: string, password: string, displayName?: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
  showEmailVerification: boolean;
  verificationEmail: string;
  hideEmailVerification: () => void;
  updateUserTheme: (userId: string, theme: string) => Promise<void>;
  updateUserPreferences: (userId: string, preferences: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  const isLoggingOutRef = useRef(false);

  useEffect(() => {
    // Set a timeout to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
      console.log('⚠️ Loading timeout reached, stopping loader');
      setIsLoading(false);
    }, 5000); // 5 second timeout

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user ? 'User found' : 'No user');
      clearTimeout(loadingTimeout); // Clear timeout since we got a response
      
      if (session?.user) {
        loadUserProfile(session.user);
      } else {
        setIsLoading(false);
      }
    }).catch((error) => {
      console.error('Session check error:', error);
      clearTimeout(loadingTimeout);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event, session?.user ? 'User found' : 'No user');
      
      // Don't process auth changes during logout
      if (isLoggingOutRef.current) {
        console.log('🚫 Ignoring auth change during logout');
        return;
      }
      
      // Handle different auth events
      if (event === 'SIGNED_IN' && session?.user) {
        console.log('🔐 User signed in event received');
        await loadUserProfile(session.user);
        return;
      }
      
      if (event === 'TOKEN_REFRESHED' && session?.user) {
        console.log('🔄 Token refreshed, updating user profile');
        await loadUserProfile(session.user);
        return;
      }
      
      // For sign out or no session cases
      if (!session?.user || event === 'SIGNED_OUT') {
        console.log('🔓 User signed out or no session');
        setCurrentUser(null);
        setIsLoading(false);
        return;
      }
      
      // For other events with valid session, load user profile
      if (session?.user) {
        await loadUserProfile(session.user);
      }
    });

    return () => {
      subscription.unsubscribe();
      clearTimeout(loadingTimeout);
    };
  }, []);

  const loadUserProfile = async (user: SupabaseUser) => {
    try {
      setIsLoading(true);
      console.log('Loading profile for user:', user.id);
      
      // Set a timeout for profile loading
      const profileTimeout = setTimeout(() => {
        console.log('⚠️ Profile loading timeout, using basic user data');
        setCurrentUser(createBasicUserProfile(user));
        setIsLoading(false);
      }, 3000);
      
      // First sync user data to ensure localStorage is up to date
      await userService.syncUserData(user.id);
      
      // Get user profile from database
      const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      clearTimeout(profileTimeout);

      if (error && error.code === 'PGRST116') {
        // User profile doesn't exist, create it
        console.log('Creating new user profile...');
        try {
          const newProfile = await createUserProfile(user);
          const userProfile = transformUserProfile(newProfile);
          setCurrentUser(userProfile);
          console.log('New profile created successfully');
        } catch (createError) {
          console.error('Failed to create profile, using basic data:', createError);
          setCurrentUser(createBasicUserProfile(user));
        }
      } else if (error) {
        console.error('Database error, using basic user data:', error);
        setCurrentUser(createBasicUserProfile(user));
      } else {
        console.log('Profile loaded successfully');
        const userProfile = transformUserProfile(profile);
        setCurrentUser(userProfile);
      }
    } catch (error: any) {
      console.error('Error loading user profile, using basic data:', error);
      setCurrentUser(createBasicUserProfile(user));
    } finally {
      setIsLoading(false);
    }
  };

  const createBasicUserProfile = (user: SupabaseUser): User => {
    return {
      id: user.id,
      email: user.email!,
      displayName: user.user_metadata?.display_name || user.email!.split('@')[0],
      plan: 'Free',
      credits: 100,
      subscriptionStatus: 'active',
      onboardingCompleted: true
    };
  };

  const createUserProfile = async (user: SupabaseUser): Promise<UserProfile> => {
    const newProfile: Omit<UserProfile, 'created_at' | 'updated_at'> = {
      id: user.id,
      email: user.email!,
      display_name: user.user_metadata?.display_name || user.email!.split('@')[0],
      avatar_url: user.user_metadata?.avatar_url || null,
      plan: 'Free',
      credits: 100,
      subscription_status: 'active',
      preferences: {
        theme: 'midnight',
        notifications: {
          email: true,
          push: false,
          marketing: false
        },
        privacy: {
          profileVisible: false,
          dataSharing: false
        }
      },
      security: {
        twoFactorEnabled: false,
        lastPasswordChange: new Date().toISOString()
      },
      onboarding_completed: true
    };

    const { data, error } = await supabase
      .from('users')
      .insert([newProfile])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  };

  const transformUserProfile = (profile: UserProfile): User => {
    // Ensure theme is properly saved and propagated
    if (profile.preferences?.theme) {
      console.log('🎨 Restoring user theme:', profile.preferences.theme);
      localStorage.setItem('theme', profile.preferences.theme);
      // Trigger a storage event to update theme immediately
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'theme',
        newValue: profile.preferences.theme,
        oldValue: localStorage.getItem('theme')
      }));
    }
    
    return {
      id: profile.id,
      email: profile.email,
      displayName: profile.display_name,
      plan: profile.plan,
      credits: profile.credits,
      subscriptionStatus: profile.subscription_status,
      onboardingCompleted: profile.onboarding_completed
    };
  };

  const signup = async (email: string, password: string, displayName?: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // First, check if a user with this email already exists
      const { data: existingUser, error: getUserError } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .single();

      if (existingUser) {
        // User already exists in the database
        setError('An account with this email already exists. Please sign in instead.');
        return { success: false, error: 'Email already registered' };
      }

      // Proceed with signup if no existing user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName || email.split('@')[0]
          }
        }
      });

      if (error) {
        setError(error.message || 'Failed to create account. Please try again.');
        return { success: false, error: error.message };
      }

      if (data.user) {
        if (!data.session) {
          // Email confirmation is required
          setVerificationEmail(email);
          setShowEmailVerification(true);
          console.log('📧 Email verification required for:', email);
          return { success: true, needsVerification: true };
        }
        
        // User is logged in successfully (email confirmation disabled)
        console.log('✅ User signed up and logged in successfully');
        return { success: true };
      }
      
      return { success: false, error: 'Unknown error occurred' };
    } catch (error: any) {
      console.error('Signup error:', error);
      if (error.message.includes('already registered') || error.message === 'Email already registered') {
        setError('An account with this email already exists. Please sign in instead.');
      } else {
        setError(error.message || 'Failed to create account. Please try again.');
      }
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        // Handle specific error cases
        if (error.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please check your credentials and try again.');
        } else if (error.message.includes('Email not confirmed')) {
          setError('Please verify your email before signing in. Check your inbox for the verification link.');
          setVerificationEmail(email);
          setShowEmailVerification(true);
        } else {
          setError(error.message || 'Failed to sign in. Please try again.');
        }
        return { success: false, error: error.message };
      }

      if (!data.session) {
        setError('Please verify your email before signing in. Check your inbox for the verification link.');
        setVerificationEmail(email);
        setShowEmailVerification(true);
        return { success: false, needsVerification: true };
      }

      // User profile will be loaded automatically by the auth state change listener
      return { success: true };
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'An unexpected error occurred. Please try again.');
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log('🚪 Starting logout process...');
      
      // Set the logout flag FIRST to prevent any auth listener interference
      isLoggingOutRef.current = true;
      
      // Clear user state immediately to prevent re-authentication attempts
      setCurrentUser(null);
      setError(null);
      
      // Reset theme to default before logout
      console.log('🎨 Resetting theme to midnight');
      localStorage.setItem('theme', 'midnight');
      
      // Trigger theme change event
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'theme',
        newValue: 'midnight',
        oldValue: localStorage.getItem('theme')
      }));
      
      // Clear ALL possible Supabase related localStorage items
      console.log('🧹 Clearing localStorage...');
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('sb-') || key.includes('supabase')) {
          localStorage.removeItem(key);
        }
      });
      
      // Also remove specific known keys
      localStorage.removeItem('supabase.auth.token');
      localStorage.removeItem('sb-hzlyxiwdqjvsgihvwiqh-auth-token');
      localStorage.removeItem('supabase.auth.refreshToken');
      
      // Clear sessionStorage as well
      Object.keys(sessionStorage).forEach(key => {
        if (key.startsWith('sb-') || key.includes('supabase')) {
          sessionStorage.removeItem(key);
        }
      });
      sessionStorage.clear();
      
      // Sign out from Supabase with specific scope
      console.log('🔐 Signing out from Supabase...');
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      if (error) {
        console.warn('Supabase signOut warning (continuing anyway):', error);
        // Don't throw error, continue with logout
      }
      
      // Ensure loading is false immediately after logout operations
      setIsLoading(false);
      
      console.log('✅ Logout completed successfully');
      
    } catch (error: any) {
      console.error('❌ Logout error (forcing logout anyway):', error);
      // Force logout even if there are errors
      setCurrentUser(null);
      setError(null);
      setIsLoading(false);
      
      // Force clear all storage related to auth
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('sb-') || key.includes('supabase')) {
          localStorage.removeItem(key);
        }
      });
      localStorage.setItem('theme', 'midnight');
      localStorage.removeItem('supabase.auth.token');
      localStorage.removeItem('sb-hzlyxiwdqjvsgihvwiqh-auth-token');
      
      Object.keys(sessionStorage).forEach(key => {
        if (key.startsWith('sb-') || key.includes('supabase')) {
          sessionStorage.removeItem(key);
        }
      });
      sessionStorage.clear();
      
      console.log('⚠️ Forced logout completed');
    } finally {
      // Reset the logout flag and ensure loading is false
      setTimeout(() => {
        isLoggingOutRef.current = false;
        setIsLoading(false);
        console.log('🏁 Logout process finished');
      }, 100); // Reduced timeout to prevent long loading states
    }
  };

  const clearError = () => {
    setError(null);
  };

  const hideEmailVerification = () => {
    setShowEmailVerification(false);
    setVerificationEmail('');
  };

  const updateUserTheme = async (userId: string, theme: string) => {
    if (!userId) return;
    
    try {
      await userService.updateTheme(userId, theme);
    } catch (error) {
      console.error('Failed to update theme:', error);
      // Still set theme locally even if server update fails
      localStorage.setItem('theme', theme);
    }
  };

  const updateUserPreferences = async (userId: string, preferences: any) => {
    if (!userId) return;
    
    try {
      await userService.updatePreferences(userId, preferences);
    } catch (error) {
      console.error('Failed to update preferences:', error);
    }
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    isLoading,
    error,
    clearError,
    showEmailVerification,
    verificationEmail,
    hideEmailVerification,
    updateUserTheme,
    updateUserPreferences
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 