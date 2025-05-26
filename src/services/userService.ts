import { supabase, UserProfile } from '../lib/supabase';

export class UserService {
  async updateProfile(userId: string, updates: Partial<UserProfile>) {
    try {
      console.log('💾 Saving profile updates:', updates);
      
      // Get the current user data first to ensure we have the latest
      const { data: currentUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Error fetching current user data:', fetchError);
        throw fetchError;
      }
      
      // Merge the current data with updates
      const updatedData = {
        ...(currentUser || {}),
        ...updates,
        updated_at: new Date().toISOString()
      };
      
      // If user doesn't exist, insert instead of update
      if (!currentUser) {
        const { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert([{
            id: userId,
            ...updatedData
          }])
          .select()
          .single();
          
        if (insertError) throw insertError;
        console.log('✅ Created new user profile:', newUser);
        return newUser;
      }
      
      // Otherwise update the existing user
      const { data, error } = await supabase
        .from('users')
        .update(updatedData)
        .eq('id', userId)
        .select()
        .single();
      
      if (error) throw error;
      console.log('✅ Profile updated successfully');
      return data;
    } catch (error) {
      console.error('❌ Failed to update profile:', error);
      throw new Error('Failed to update profile');
    }
  }

  async updateTheme(userId: string, theme: string) {
    try {
      console.log('🎨 Saving theme preference:', theme);
      
      // First get current preferences to preserve other settings
      const { data: currentUser, error: fetchError } = await supabase
        .from('users')
        .select('preferences')
        .eq('id', userId)
        .single();
      
      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Error fetching current preferences:', fetchError);
      }
      
      const currentPreferences = currentUser?.preferences || {};
      
      // Create updated preferences object with theme
      const updatedPreferences = {
        ...currentPreferences,
        theme
      };
      
      // Save immediately to localStorage for instant feedback
      localStorage.setItem('theme', theme);
      
      // Trigger theme change event
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'theme',
        newValue: theme,
        oldValue: localStorage.getItem('theme')
      }));
      
      // Save to database in background
      const { error } = await supabase
        .from('users')
        .update({
          preferences: updatedPreferences,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);
      
      if (error) {
        // If user doesn't exist yet, create a new profile
        if (error.code === 'PGRST116') {
          return this.updateProfile(userId, {
            preferences: updatedPreferences
          });
        }
        throw error;
      }
      
      console.log('✅ Theme saved to database:', theme);
      return { success: true, theme };
    } catch (error) {
      console.error('❌ Failed to save theme preference:', error);
      // Still return success if local storage was updated
      if (localStorage.getItem('theme') === theme) {
        return { success: true, theme, localOnly: true };
      }
      throw new Error('Failed to save theme preference');
    }
  }

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      console.log('🔍 Fetching user profile for:', userId);
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          console.log('User profile not found, will be created on first update');
          return null;
        }
        throw error;
      }
      
      console.log('✅ User profile loaded successfully');
      return data;
    } catch (error) {
      console.error('❌ Failed to get user profile:', error);
      throw new Error('Failed to get user profile');
    }
  }

  async updatePreferences(userId: string, preferences: any) {
    try {
      console.log('🔧 Updating user preferences');
      
      // First get current preferences
      const { data: currentUser, error: fetchError } = await supabase
        .from('users')
        .select('preferences')
        .eq('id', userId)
        .single();
      
      // Merge with existing preferences
      const currentPreferences = currentUser?.preferences || {};
      const updatedPreferences = {
        ...currentPreferences,
        ...preferences
      };
      
      // Store theme in localStorage for immediate use
      if (preferences.theme) {
        localStorage.setItem('theme', preferences.theme);
        
        // Trigger theme change event
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'theme',
          newValue: preferences.theme,
          oldValue: localStorage.getItem('theme')
        }));
      }
      
      // Save to database
      const { error } = await supabase
        .from('users')
        .update({
          preferences: updatedPreferences,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);
      
      if (error) {
        // If user doesn't exist yet, create a new profile
        if (error.code === 'PGRST116') {
          return this.updateProfile(userId, {
            preferences: updatedPreferences
          });
        }
        throw error;
      }
      
      console.log('✅ Preferences updated successfully');
      return { success: true, preferences: updatedPreferences };
    } catch (error) {
      console.error('❌ Failed to update preferences:', error);
      throw new Error('Failed to update preferences');
    }
  }

  async syncUserData(userId: string) {
    try {
      console.log('🔄 Syncing user data...');
      
      // Get user profile from database
      const profile = await this.getUserProfile(userId);
      
      if (!profile) {
        console.log('No profile found, will create one when user performs an action');
        return null;
      }
      
      // Sync theme to localStorage
      if (profile.preferences?.theme) {
        localStorage.setItem('theme', profile.preferences.theme);
        
        // Trigger theme change event
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'theme',
          newValue: profile.preferences.theme,
          oldValue: localStorage.getItem('theme')
        }));
      }
      
      console.log('✅ User data synced successfully');
      return profile;
    } catch (error) {
      console.error('❌ Failed to sync user data:', error);
      return null;
    }
  }

  async logSecurityEvent(userId: string, event: string, metadata?: any) {
    try {
      // This would log security events - for now just console log
      console.log('Security event:', { userId, event, metadata, timestamp: new Date() });
      return { success: true };
    } catch (error) {
      console.error('Failed to log security event:', error);
      return { success: false };
    }
  }
}

export const userService = new UserService(); 