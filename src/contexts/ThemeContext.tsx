import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

type ThemeName = 'midnight' | 'ocean' | 'forest' | 'sunset' | 'royal';

interface ThemeColors {
  // Background colors
  primary: string;
  secondary: string;
  tertiary: string;
  
  // Text colors
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  
  // Gold/Accent variations
  goldPrimary: string;
  goldSecondary: string;
  goldMuted: string;
  goldGradient: string;
  
  // Status colors
  success: string;
  warning: string;
  error: string;
  info: string;
  
  // Border and accent colors
  border: string;
  borderActive: string;
  accent: string;
  
  // Glass morphism
  glassPrimary: string;
  glassSecondary: string;
  
  // Diagonal shine effect
  shineGradient: string;
}

interface Theme {
  name: ThemeName;
  displayName: string;
  colors: ThemeColors;
}

interface ThemeContextType {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  colors: ThemeColors;
  themes: Theme[];
}

const themes: Theme[] = [
  {
    name: 'midnight',
    displayName: 'Midnight Dark',
    colors: {
      // Background colors - Deep blacks with warm cream undertones
      primary: 'linear-gradient(135deg, #0a0a0a 0%, #1a1510 100%)',
      secondary: 'linear-gradient(135deg, #1a1510 0%, #2a2318 100%)',
      tertiary: 'linear-gradient(135deg, #2a2318 0%, #3a3020 100%)',
      
      // Text colors - High contrast with cream accents
      textPrimary: '#ffffff',
      textSecondary: '#f5f5f5',
      textMuted: '#e8d5b7',
      
      // Horafly-inspired cream and gold palette
      goldPrimary: '#e8d5b7',
      goldSecondary: '#d4c4a8',
      goldMuted: '#c4b49a',
      goldGradient: 'linear-gradient(135deg, #e8d5b7 0%, #d4c4a8 50%, #c4b49a 100%)',
      
      // Status colors
      success: '#32cd32',
      warning: '#ff8c00',
      error: '#dc143c',
      info: '#4169e1',
      
      // Border and accent colors
      border: 'rgba(232, 213, 183, 0.25)',
      borderActive: 'rgba(232, 213, 183, 0.5)',
      accent: '#e8d5b7',
      
      // Glass morphism
      glassPrimary: 'rgba(26, 21, 16, 0.85)',
      glassSecondary: 'rgba(42, 35, 24, 0.7)',
      
      // Diagonal shine effect
      shineGradient: 'linear-gradient(45deg, transparent 30%, rgba(232, 213, 183, 0.15) 50%, transparent 70%)'
    }
  },
  {
    name: 'ocean',
    displayName: 'Ocean Blue',
    colors: {
      // Background colors - Deep ocean blues
      primary: 'linear-gradient(135deg, #0c1821 0%, #1e3a5f 100%)',
      secondary: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)',
      tertiary: 'linear-gradient(135deg, #2d5a87 0%, #3c7bb0 100%)',
      
      // Text colors
      textPrimary: '#ffffff',
      textSecondary: '#e1f5fe',
      textMuted: '#b3e5fc',
      
      // Ocean-inspired accent colors
      goldPrimary: '#00bcd4',
      goldSecondary: '#26c6da',
      goldMuted: '#4dd0e1',
      goldGradient: 'linear-gradient(135deg, #00bcd4 0%, #26c6da 50%, #4dd0e1 100%)',
      
      // Status colors
      success: '#4caf50',
      warning: '#ff9800',
      error: '#f44336',
      info: '#2196f3',
      
      // Border and accent colors
      border: 'rgba(0, 188, 212, 0.25)',
      borderActive: 'rgba(0, 188, 212, 0.5)',
      accent: '#00bcd4',
      
      // Glass morphism
      glassPrimary: 'rgba(30, 58, 95, 0.85)',
      glassSecondary: 'rgba(45, 90, 135, 0.7)',
      
      // Diagonal shine effect
      shineGradient: 'linear-gradient(45deg, transparent 30%, rgba(0, 188, 212, 0.15) 50%, transparent 70%)'
    }
  },
  {
    name: 'forest',
    displayName: 'Forest Green',
    colors: {
      // Background colors - Deep forest greens
      primary: 'linear-gradient(135deg, #1b2f1b 0%, #2d5a2d 100%)',
      secondary: 'linear-gradient(135deg, #2d5a2d 0%, #3e7b3e 100%)',
      tertiary: 'linear-gradient(135deg, #3e7b3e 0%, #4f9c4f 100%)',
      
      // Text colors
      textPrimary: '#ffffff',
      textSecondary: '#e8f5e8',
      textMuted: '#c8e6c9',
      
      // Forest-inspired accent colors
      goldPrimary: '#66bb6a',
      goldSecondary: '#81c784',
      goldMuted: '#a5d6a7',
      goldGradient: 'linear-gradient(135deg, #66bb6a 0%, #81c784 50%, #a5d6a7 100%)',
      
      // Status colors
      success: '#4caf50',
      warning: '#ff9800',
      error: '#f44336',
      info: '#2196f3',
      
      // Border and accent colors
      border: 'rgba(102, 187, 106, 0.25)',
      borderActive: 'rgba(102, 187, 106, 0.5)',
      accent: '#66bb6a',
      
      // Glass morphism
      glassPrimary: 'rgba(45, 90, 45, 0.85)',
      glassSecondary: 'rgba(62, 123, 62, 0.7)',
      
      // Diagonal shine effect
      shineGradient: 'linear-gradient(45deg, transparent 30%, rgba(102, 187, 106, 0.15) 50%, transparent 70%)'
    }
  },
  {
    name: 'sunset',
    displayName: 'Sunset Orange',
    colors: {
      // Background colors - Warm sunset tones
      primary: 'linear-gradient(135deg, #2e1a0a 0%, #5d3317 100%)',
      secondary: 'linear-gradient(135deg, #5d3317 0%, #8b4d24 100%)',
      tertiary: 'linear-gradient(135deg, #8b4d24 0%, #b96731 100%)',
      
      // Text colors
      textPrimary: '#ffffff',
      textSecondary: '#fff3e0',
      textMuted: '#ffcc80',
      
      // Sunset-inspired accent colors
      goldPrimary: '#ff9800',
      goldSecondary: '#ffb74d',
      goldMuted: '#ffcc80',
      goldGradient: 'linear-gradient(135deg, #ff9800 0%, #ffb74d 50%, #ffcc80 100%)',
      
      // Status colors
      success: '#4caf50',
      warning: '#ff9800',
      error: '#f44336',
      info: '#2196f3',
      
      // Border and accent colors
      border: 'rgba(255, 152, 0, 0.25)',
      borderActive: 'rgba(255, 152, 0, 0.5)',
      accent: '#ff9800',
      
      // Glass morphism
      glassPrimary: 'rgba(93, 51, 23, 0.85)',
      glassSecondary: 'rgba(139, 77, 36, 0.7)',
      
      // Diagonal shine effect
      shineGradient: 'linear-gradient(45deg, transparent 30%, rgba(255, 152, 0, 0.15) 50%, transparent 70%)'
    }
  },
  {
    name: 'royal',
    displayName: 'Royal Purple',
    colors: {
      // Background colors - Deep royal purples
      primary: 'linear-gradient(135deg, #1a0d2e 0%, #3d1a5b 100%)',
      secondary: 'linear-gradient(135deg, #3d1a5b 0%, #5e2788 100%)',
      tertiary: 'linear-gradient(135deg, #5e2788 0%, #7f34b5 100%)',
      
      // Text colors
      textPrimary: '#ffffff',
      textSecondary: '#f3e5f5',
      textMuted: '#ce93d8',
      
      // Royal-inspired accent colors
      goldPrimary: '#9c27b0',
      goldSecondary: '#ba68c8',
      goldMuted: '#ce93d8',
      goldGradient: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 50%, #ce93d8 100%)',
      
      // Status colors
      success: '#4caf50',
      warning: '#ff9800',
      error: '#f44336',
      info: '#2196f3',
      
      // Border and accent colors
      border: 'rgba(156, 39, 176, 0.25)',
      borderActive: 'rgba(156, 39, 176, 0.5)',
      accent: '#9c27b0',
      
      // Glass morphism
      glassPrimary: 'rgba(61, 26, 91, 0.85)',
      glassSecondary: 'rgba(94, 39, 136, 0.7)',
      
      // Diagonal shine effect
      shineGradient: 'linear-gradient(45deg, transparent 30%, rgba(156, 39, 176, 0.15) 50%, transparent 70%)'
    }
  }
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentThemeState] = useState<ThemeName>(() => {
    // Get from localStorage or use default
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as ThemeName) || 'midnight';
  });

  // Get auth context to access user data
  const auth = useAuth();

  // Update the setTheme function to save to user profile when logged in
  const setTheme = useCallback((theme: ThemeName) => {
    setCurrentThemeState(theme);
    localStorage.setItem('theme', theme);
    
    // If user is logged in, save theme preference to their profile
    if (auth?.currentUser?.id) {
      auth.updateUserTheme(auth.currentUser.id, theme)
        .catch(error => console.error('Failed to save theme to user profile:', error));
    }
  }, [auth]);

  // Update CSS variables when theme changes
  useEffect(() => {
    const currentThemeData = themes.find(t => t.name === currentTheme) || themes[0];
    updateCSSVariables(currentThemeData.colors);
  }, [currentTheme]);

  // Listen for storage events (theme changes in other tabs)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme' && e.newValue) {
        const newTheme = e.newValue as ThemeName;
        if (newTheme !== currentTheme) {
          setCurrentThemeState(newTheme);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [currentTheme]);

  const updateCSSVariables = (colors: ThemeColors) => {
    const root = document.documentElement;
    
    // Update CSS custom properties
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-tertiary', colors.tertiary);
    
    root.style.setProperty('--color-text-primary', colors.textPrimary);
    root.style.setProperty('--color-text-secondary', colors.textSecondary);
    root.style.setProperty('--color-text-muted', colors.textMuted);
    
    root.style.setProperty('--color-gold-primary', colors.goldPrimary);
    root.style.setProperty('--color-gold-secondary', colors.goldSecondary);
    root.style.setProperty('--color-gold-muted', colors.goldMuted);
    root.style.setProperty('--color-gold-gradient', colors.goldGradient);
    
    root.style.setProperty('--color-success', colors.success);
    root.style.setProperty('--color-warning', colors.warning);
    root.style.setProperty('--color-error', colors.error);
    root.style.setProperty('--color-info', colors.info);
    
    root.style.setProperty('--color-border', colors.border);
    root.style.setProperty('--color-border-active', colors.borderActive);
    root.style.setProperty('--color-accent', colors.accent);
    
    root.style.setProperty('--color-glass-primary', colors.glassPrimary);
    root.style.setProperty('--color-glass-secondary', colors.glassSecondary);
    
    root.style.setProperty('--shine-gradient', colors.shineGradient);
  };

  const currentThemeData = themes.find(t => t.name === currentTheme) || themes[0];

  return (
    <ThemeContext.Provider value={{ 
      currentTheme, 
      setTheme, 
      colors: currentThemeData.colors,
      themes
    }}>
      {children}
    </ThemeContext.Provider>
  );
}; 