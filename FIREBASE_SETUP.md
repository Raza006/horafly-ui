# Firebase Setup Guide for SalesAI Pro

## Overview
This guide will help you set up Firebase Authentication for your SalesAI Pro application, enabling user registration, login, and Google Sign-In.

## Prerequisites
- A Google account
- Node.js and npm installed
- The SalesAI Pro project running locally

## Step 1: Create a Firebase Project

1. **Go to Firebase Console**
   - Visit https://console.firebase.google.com/
   - Click "Create a project"

2. **Project Setup**
   - Enter project name: `salesai-pro` (or your preferred name)
   - Enable Google Analytics (optional but recommended)
   - Select or create a Google Analytics account
   - Click "Create project"

## Step 2: Enable Authentication

1. **Navigate to Authentication**
   - In the Firebase console, click "Authentication" in the left sidebar
   - Click "Get started"

2. **Configure Sign-in Methods**
   - Go to the "Sign-in method" tab
   - Enable the following providers:

   **Email/Password:**
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"

   **Google:**
   - Click on "Google"
   - Toggle "Enable" to ON
   - Enter your project support email
   - Click "Save"

## Step 3: Register Your Web App

1. **Add Web App**
   - In Project Overview, click the "</>" (web) icon
   - Enter app nickname: `salesai-pro-web`
   - Check "Also set up Firebase Hosting" (optional)
   - Click "Register app"

2. **Get Configuration**
   - Copy the Firebase configuration object
   - It should look like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "your-app-id",
     measurementId: "G-XXXXXXXXXX"
   };
   ```

## Step 4: Configure Environment Variables

1. **Create Environment File**
   Create a `.env` file in your project root:
   ```bash
   # In the voice-assistant directory
   touch .env
   ```

2. **Add Firebase Configuration**
   Add your Firebase config to `.env`:
   ```env
   REACT_APP_FIREBASE_API_KEY=your-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
   REACT_APP_FIREBASE_APP_ID=your-app-id
   REACT_APP_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

   **⚠️ Important:** Replace all placeholder values with your actual Firebase configuration values.

## Step 5: Configure Authorized Domains

1. **Add Localhost for Development**
   - In Firebase Console → Authentication → Settings → Authorized domains
   - `localhost` should already be there for development
   - For production, add your actual domain

2. **Add Production Domain** (when deploying)
   - Click "Add domain"
   - Enter your production domain (e.g., `yourapp.com`)
   - Click "Add"

## Step 6: Test the Setup

1. **Start the Development Server**
   ```bash
   npm start
   ```

2. **Test Authentication Flow**
   - Navigate to http://localhost:3000
   - Click "Get Started" to open the authentication modal
   - Try registering a new account with email/password
   - Test Google Sign-In
   - Verify that you're redirected to the voice assistant after login

## Step 7: Additional Configuration (Optional)

### Enable Firestore Database
If you want to store user data or conversation history:

1. **Create Firestore Database**
   - In Firebase Console → Firestore Database
   - Click "Create database"
   - Choose "Start in test mode" for development
   - Select a location for your database

2. **Set Up Security Rules**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Users can read/write their own data
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       
       // Conversations belong to authenticated users
       match /conversations/{conversationId} {
         allow read, write: if request.auth != null && 
           request.auth.uid == resource.data.userId;
       }
     }
   }
   ```

### Enable Storage (For Voice Files)
If you want to store audio recordings:

1. **Enable Cloud Storage**
   - In Firebase Console → Storage
   - Click "Get started"
   - Choose security rules (start in test mode)
   - Select a location

2. **Configure Storage Rules**
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /users/{userId}/audio/{allPaths=**} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

## Troubleshooting

### Common Issues

**1. "Firebase config is not found"**
- Ensure `.env` file is in the root directory
- Check that all environment variables start with `REACT_APP_`
- Restart the development server after adding environment variables

**2. "Google Sign-In not working"**
- Verify Google provider is enabled in Firebase Console
- Check that your domain is in the authorized domains list
- Ensure you're using HTTPS in production

**3. "User creation fails"**
- Check that Email/Password provider is enabled
- Verify password meets minimum requirements (6+ characters)
- Check browser console for detailed error messages

**4. "CORS errors"**
- Add your domain to Firebase authorized domains
- For development, ensure `localhost:3000` is authorized

### Development vs Production

**Development Setup:**
- Use `localhost:3000` as authorized domain
- Test mode security rules are acceptable
- Environment variables in `.env` file

**Production Setup:**
- Add your production domain to authorized domains
- Implement proper Firestore security rules
- Use environment variables in your hosting platform
- Enable proper CORS settings

## Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files to version control
   - Use different Firebase projects for development/production
   - Regularly rotate API keys

2. **Authentication Rules**
   - Implement proper user verification
   - Use Firebase security rules for database access
   - Validate user input on both client and server

3. **Data Protection**
   - Encrypt sensitive user data
   - Implement proper backup strategies
   - Follow GDPR compliance if applicable

## Next Steps

After completing the Firebase setup:

1. **Test all authentication flows** thoroughly
2. **Implement user profile management** if needed
3. **Set up Firestore** for data persistence
4. **Configure email verification** for new users
5. **Implement password reset** functionality
6. **Add social login providers** as needed

## Support

If you encounter issues:

- Check the Firebase Console logs
- Review browser console for errors
- Consult Firebase documentation: https://firebase.google.com/docs
- Check community forums for common issues

Your SalesAI Pro application should now have a fully functional authentication system with beautiful UI and seamless user experience! 