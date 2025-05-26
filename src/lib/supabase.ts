import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hzlyxiwdqjvsgihvwiqh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6bHl4aXdkcWp2c2dpaHZ3aXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxOTIxNzcsImV4cCI6MjA2Mzc2ODE3N30.GnUF1pIJpRfjYjrvbsjedG3UP0uzPuULBx2Jrv-qhWk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface UserProfile {
  id: string;
  email: string;
  display_name: string;
  avatar_url?: string;
  plan: 'Free' | 'Pro' | 'Enterprise';
  credits: number;
  subscription_status: 'active' | 'cancelled' | 'expired';
  preferences: {
    theme: 'midnight' | 'ocean' | 'forest' | 'sunset' | 'royal';
    notifications: {
      email: boolean;
      push: boolean;
      marketing: boolean;
    };
    privacy: {
      profileVisible: boolean;
      dataSharing: boolean;
    };
  };
  security: {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
  };
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
} 