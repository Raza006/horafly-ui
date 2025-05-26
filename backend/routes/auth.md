# Authentication Routes Documentation

## Overview
This file contains all authentication-related API endpoints for the Horafly AI Sales Platform, including user registration, login, profile management, and password operations.

## Endpoints

### `POST /api/auth/signup`
**Lines 12-71**: Creates a new user account with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "displayName": "John Doe" // Optional
}
```

**Functionality:**
- Validates required fields (email, password)
- Creates user in Supabase Auth system
- Creates user profile in database with default settings
- Assigns free plan with 100 starting credits
- Handles cleanup if profile creation fails

**Response (201):**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "displayName": "John Doe",
    "plan": "free",
    "credits": 100
  }
}
```

### `POST /api/auth/signin`
**Lines 73-139**: Authenticates user and returns session tokens.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Functionality:**
- Validates credentials with Supabase Auth
- Fetches user profile from database
- Updates last login timestamp
- Returns user data and session tokens

**Response (200):**
```json
{
  "message": "Sign in successful",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "displayName": "John Doe",
    "plan": "free",
    "credits": 95,
    "subscriptionStatus": "inactive",
    "onboardingCompleted": true
  },
  "session": {
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token",
    "expiresAt": 1640995200
  }
}
```

### `POST /api/auth/signout`
**Lines 141-165**: Signs out the current user (requires authentication).

**Headers:**
```
Authorization: Bearer jwt_token
```

**Functionality:**
- Requires valid JWT token
- Invalidates session in Supabase Auth
- Clears user session data

**Response (200):**
```json
{
  "message": "Signed out successfully"
}
```

### `GET /api/auth/me`
**Lines 167-201**: Returns current user profile (requires authentication).

**Headers:**
```
Authorization: Bearer jwt_token
```

**Functionality:**
- Validates JWT token via middleware
- Returns complete user profile data
- Includes subscription and credit information

**Response (200):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "displayName": "John Doe",
    "avatarUrl": null,
    "plan": "pro",
    "credits": 500,
    "creditsUsed": 150,
    "subscriptionStatus": "active",
    "subscriptionEndDate": "2024-12-31T23:59:59Z",
    "theme": "dark",
    "notificationsEnabled": true,
    "onboardingCompleted": true,
    "emailVerified": true,
    "createdAt": "2024-01-01T00:00:00Z",
    "lastLogin": "2024-01-25T10:30:00Z"
  }
}
```

### `PUT /api/auth/profile`
**Lines 203-250**: Updates user profile settings (requires authentication).

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "displayName": "John Smith",
  "theme": "light",
  "notificationsEnabled": false,
  "aiVoicePreference": "professional"
}
```

**Functionality:**
- Updates only provided fields
- Validates theme and voice preference values
- Returns updated profile data

**Response (200):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "displayName": "John Smith",
    "theme": "light",
    "notificationsEnabled": false,
    "aiVoicePreference": "professional"
  }
}
```

### `POST /api/auth/onboarding/complete`
**Lines 252-283**: Marks user onboarding as completed (requires authentication).

**Headers:**
```
Authorization: Bearer jwt_token
```

**Functionality:**
- Sets onboarding_completed flag to true
- Used to track user progress through setup flow

**Response (200):**
```json
{
  "message": "Onboarding completed successfully",
  "user": {
    "id": "uuid",
    "onboardingCompleted": true
  }
}
```

### `POST /api/auth/reset-password`
**Lines 285-316**: Sends password reset email to user.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Functionality:**
- Validates email address
- Sends password reset email via Supabase Auth
- Includes redirect URL for frontend reset page

**Response (200):**
```json
{
  "message": "Password reset email sent successfully"
}
```

### `POST /api/auth/update-password`
**Lines 318-350**: Updates user password (requires authentication).

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "newPassword": "newSecurePassword123"
}
```

**Functionality:**
- Requires valid authentication
- Updates password in Supabase Auth
- Uses admin API for secure password updates

**Response (200):**
```json
{
  "message": "Password updated successfully"
}
```

## Error Responses

### 400 Bad Request
- Missing required fields
- Invalid email format
- Password too weak

### 401 Unauthorized
- Invalid credentials
- Missing authentication token
- Token expired

### 500 Internal Server Error
- Database connection issues
- Supabase Auth service errors
- Profile creation/update failures

## Security Features

1. **Password Hashing**: Handled by Supabase Auth
2. **JWT Tokens**: Secure session management
3. **Email Verification**: Optional email confirmation
4. **Rate Limiting**: Built into Supabase Auth
5. **Input Validation**: Server-side validation for all inputs
6. **Error Sanitization**: No sensitive data in error messages

## Integration Points

- **Supabase Auth**: User authentication and session management
- **Database**: User profile storage and management
- **Middleware**: Authentication verification for protected routes
- **Frontend**: Session token storage and API integration

## Usage Examples

### Frontend Login Flow
```javascript
// 1. Sign in user
const response = await fetch('/api/auth/signin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

const { user, session } = await response.json();

// 2. Store token for future requests
localStorage.setItem('accessToken', session.accessToken);

// 3. Use token for authenticated requests
const profileResponse = await fetch('/api/auth/me', {
  headers: { 'Authorization': `Bearer ${session.accessToken}` }
});
``` 