const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const { authenticateUser } = require('../middleware/auth');

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Sign up new user
router.post('/signup', async (req, res) => {
  try {
    const { email, password, displayName } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Email and password are required'
      });
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        display_name: displayName || email.split('@')[0]
      },
      email_confirm: true // Skip email confirmation for development
    });

    if (authError) {
      return res.status(400).json({
        error: 'Signup failed',
        message: authError.message
      });
    }

    // Create user profile in our users table
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email: authData.user.email,
        display_name: displayName || email.split('@')[0],
        plan: 'free',
        credits: 100, // Free users start with 100 credits
        onboarding_completed: false,
        email_verified: false
      })
      .select()
      .single();

    if (profileError) {
      // If profile creation fails, clean up auth user
      await supabase.auth.admin.deleteUser(authData.user.id);
      return res.status(500).json({
        error: 'Profile creation failed',
        message: profileError.message
      });
    }

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: profile.id,
        email: profile.email,
        displayName: profile.display_name,
        plan: profile.plan,
        credits: profile.credits
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to create user account'
    });
  }
});

// Sign in user
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Missing credentials',
        message: 'Email and password are required'
      });
    }

    // Sign in with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: authError.message
      });
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) {
      return res.status(500).json({
        error: 'Profile fetch failed',
        message: profileError.message
      });
    }

    // Update last login
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', authData.user.id);

    res.json({
      message: 'Sign in successful',
      user: {
        id: profile.id,
        email: profile.email,
        displayName: profile.display_name,
        plan: profile.plan,
        credits: profile.credits,
        subscriptionStatus: profile.subscription_status,
        onboardingCompleted: profile.onboarding_completed
      },
      session: {
        accessToken: authData.session.access_token,
        refreshToken: authData.session.refresh_token,
        expiresAt: authData.session.expires_at
      }
    });

  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to sign in'
    });
  }
});

// Sign out user
router.post('/signout', authenticateUser, async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(500).json({
        error: 'Signout failed',
        message: error.message
      });
    }

    res.json({
      message: 'Signed out successfully'
    });

  } catch (error) {
    console.error('Signout error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to sign out'
    });
  }
});

// Get current user profile
router.get('/me', authenticateUser, async (req, res) => {
  try {
    const user = req.user;

    res.json({
      user: {
        id: user.id,
        email: user.email,
        displayName: user.display_name,
        avatarUrl: user.avatar_url,
        plan: user.plan,
        credits: user.credits,
        creditsUsed: user.credits_used,
        subscriptionStatus: user.subscription_status,
        subscriptionEndDate: user.subscription_end_date,
        theme: user.theme,
        notificationsEnabled: user.notifications_enabled,
        onboardingCompleted: user.onboarding_completed,
        emailVerified: user.email_verified,
        createdAt: user.created_at,
        lastLogin: user.last_login
      }
    });

  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch user profile'
    });
  }
});

// Update user profile
router.put('/profile', authenticateUser, async (req, res) => {
  try {
    const { displayName, theme, notificationsEnabled, aiVoicePreference } = req.body;
    const userId = req.user.id;

    const updates = {};
    if (displayName !== undefined) updates.display_name = displayName;
    if (theme !== undefined) updates.theme = theme;
    if (notificationsEnabled !== undefined) updates.notifications_enabled = notificationsEnabled;
    if (aiVoicePreference !== undefined) updates.ai_voice_preference = aiVoicePreference;

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        error: 'Profile update failed',
        message: error.message
      });
    }

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: data.id,
        email: data.email,
        displayName: data.display_name,
        theme: data.theme,
        notificationsEnabled: data.notifications_enabled,
        aiVoicePreference: data.ai_voice_preference
      }
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to update profile'
    });
  }
});

// Complete onboarding
router.post('/onboarding/complete', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from('users')
      .update({ onboarding_completed: true })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        error: 'Onboarding update failed',
        message: error.message
      });
    }

    res.json({
      message: 'Onboarding completed successfully',
      user: {
        id: data.id,
        onboardingCompleted: data.onboarding_completed
      }
    });

  } catch (error) {
    console.error('Onboarding completion error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to complete onboarding'
    });
  }
});

// Request password reset
router.post('/reset-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: 'Missing email',
        message: 'Email is required for password reset'
      });
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.FRONTEND_URL}/reset-password`
    });

    if (error) {
      return res.status(400).json({
        error: 'Password reset failed',
        message: error.message
      });
    }

    res.json({
      message: 'Password reset email sent successfully'
    });

  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to send password reset email'
    });
  }
});

// Update password
router.post('/update-password', authenticateUser, async (req, res) => {
  try {
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({
        error: 'Missing password',
        message: 'New password is required'
      });
    }

    const { error } = await supabase.auth.admin.updateUserById(
      req.user.id,
      { password: newPassword }
    );

    if (error) {
      return res.status(400).json({
        error: 'Password update failed',
        message: error.message
      });
    }

    res.json({
      message: 'Password updated successfully'
    });

  } catch (error) {
    console.error('Password update error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to update password'
    });
  }
});

module.exports = router; 