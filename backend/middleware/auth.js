const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Middleware to verify JWT token and get user
const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'No token provided',
        message: 'Authorization header with Bearer token required' 
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ 
        error: 'Invalid token',
        message: 'Token verification failed' 
      });
    }

    // Get full user profile from our users table
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) {
      // User exists in auth but not in our users table - create profile
      const { data: newProfile, error: createError } = await supabase
        .from('users')
        .insert({
          id: user.id,
          email: user.email,
          display_name: user.user_metadata?.display_name || user.email.split('@')[0],
          avatar_url: user.user_metadata?.avatar_url,
          email_verified: user.email_confirmed_at ? true : false
        })
        .select()
        .single();

      if (createError) {
        return res.status(500).json({ 
          error: 'Profile creation failed',
          message: createError.message 
        });
      }

      req.user = newProfile;
    } else {
      req.user = userProfile;
    }

    // Update last login
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id);

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ 
      error: 'Authentication failed',
      message: 'Internal server error during authentication' 
    });
  }
};

// Middleware to check if user has enough credits
const checkCredits = (requiredCredits = 1) => {
  return async (req, res, next) => {
    try {
      const user = req.user;
      
      // Pro and Enterprise users have unlimited credits
      if (user.plan === 'pro' || user.plan === 'enterprise') {
        req.hasCredits = true;
        return next();
      }

      // Check if free user has enough credits
      if (user.credits >= requiredCredits) {
        req.hasCredits = true;
        req.creditsToDeduct = requiredCredits;
        return next();
      } else {
        return res.status(402).json({
          error: 'Insufficient credits',
          message: `This action requires ${requiredCredits} credits. You have ${user.credits} credits remaining.`,
          creditsRequired: requiredCredits,
          creditsAvailable: user.credits,
          upgradeUrl: '/pricing'
        });
      }
    } catch (error) {
      console.error('Credits check error:', error);
      res.status(500).json({ 
        error: 'Credits verification failed',
        message: 'Internal server error during credits check' 
      });
    }
  };
};

// Function to deduct credits after successful operation
const deductCredits = async (userId, creditsUsed, action, description = '') => {
  try {
    const { data, error } = await supabase.rpc('deduct_credits', {
      user_uuid: userId,
      credits_to_deduct: creditsUsed,
      action_name: action
    });

    if (error) {
      console.error('Credit deduction error:', error);
      return false;
    }

    return data; // Returns true if successful
  } catch (error) {
    console.error('Credit deduction failed:', error);
    return false;
  }
};

// Middleware to check subscription status
const requireSubscription = (allowedPlans = ['pro', 'enterprise']) => {
  return (req, res, next) => {
    const user = req.user;
    
    if (!allowedPlans.includes(user.plan)) {
      return res.status(403).json({
        error: 'Subscription required',
        message: `This feature requires a ${allowedPlans.join(' or ')} subscription.`,
        currentPlan: user.plan,
        upgradeUrl: '/pricing'
      });
    }

    // Check if subscription is active
    if (user.subscription_status !== 'active' && user.plan !== 'free') {
      return res.status(403).json({
        error: 'Inactive subscription',
        message: 'Your subscription is not active. Please update your payment method.',
        subscriptionStatus: user.subscription_status,
        upgradeUrl: '/billing'
      });
    }

    next();
  };
};

module.exports = {
  authenticateUser,
  checkCredits,
  deductCredits,
  requireSubscription
}; 