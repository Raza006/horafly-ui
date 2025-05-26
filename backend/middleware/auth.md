# Authentication Middleware Documentation

## Overview
This file contains authentication middleware for the Horafly AI Sales Platform, providing JWT token verification, user session management, credit checking, and subscription validation.

## Functions

### `authenticateUser(req, res, next)`
**Lines 8-75**: Main authentication middleware that verifies JWT tokens and loads user profiles.

**Functionality:**
- Extracts Bearer token from Authorization header
- Verifies token with Supabase Auth service
- Loads user profile from database
- Creates new profile if user exists in auth but not in users table
- Updates last login timestamp
- Attaches user object to request for downstream middleware

**Usage:**
```javascript
app.get('/api/protected', authenticateUser, (req, res) => {
  // req.user contains full user profile
  res.json({ user: req.user });
});
```

### `checkCredits(requiredCredits = 1)`
**Lines 77-110**: Middleware factory that checks if user has sufficient credits for an operation.

**Functionality:**
- Returns middleware function that checks credit availability
- Pro/Enterprise users bypass credit checks (unlimited usage)
- Free users must have sufficient credits
- Sets `req.hasCredits` and `req.creditsToDeduct` for downstream use
- Returns 402 Payment Required if insufficient credits

**Usage:**
```javascript
app.post('/api/scrape-leads', authenticateUser, checkCredits(5), (req, res) => {
  // Operation requires 5 credits
  // req.hasCredits will be true
  // req.creditsToDeduct will be 5 (for free users)
});
```

### `deductCredits(userId, creditsUsed, action, description)`
**Lines 112-131**: Function to deduct credits after successful operations.

**Functionality:**
- Calls database function `deduct_credits` 
- Handles Pro/Enterprise unlimited credit logic
- Logs credit usage for billing and analytics
- Returns boolean indicating success/failure

**Usage:**
```javascript
const success = await deductCredits(userId, 3, 'lead_scraping', 'LinkedIn scraping operation');
if (!success) {
  // Handle credit deduction failure
}
```

### `requireSubscription(allowedPlans = ['pro', 'enterprise'])`
**Lines 133-158**: Middleware factory that restricts access to subscription features.

**Functionality:**
- Checks if user's plan is in allowed plans array
- Validates subscription status is 'active'
- Returns 403 Forbidden with upgrade information if access denied

**Usage:**
```javascript
app.post('/api/advanced-ai', authenticateUser, requireSubscription(['pro', 'enterprise']), (req, res) => {
  // Only Pro and Enterprise users can access
});

app.post('/api/premium-feature', authenticateUser, requireSubscription(['enterprise']), (req, res) => {
  // Only Enterprise users can access
});
```

## Error Responses

### 401 Unauthorized
- Missing or invalid JWT token
- Token verification failed

### 402 Payment Required
- Insufficient credits for operation
- Includes credit information and upgrade URL

### 403 Forbidden
- Subscription required for feature
- Inactive subscription status

### 500 Internal Server Error
- Database connection issues
- Unexpected authentication errors

## Security Features

1. **JWT Verification**: All tokens verified with Supabase Auth
2. **Automatic Profile Creation**: Seamless user onboarding
3. **Credit Tracking**: Prevents abuse and enables billing
4. **Subscription Validation**: Enforces plan restrictions
5. **Error Handling**: Secure error messages without data leakage

## Integration with Database

- Uses Supabase client with service role key for admin operations
- Calls `deduct_credits` PostgreSQL function for atomic credit operations
- Updates user login timestamps for analytics
- Respects Row Level Security policies 