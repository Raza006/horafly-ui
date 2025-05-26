# 🔧 Troubleshooting Guide

## 🚨 **Current Issues & Fixes**

### **Issue 1: Backend Port Conflict (FIXED)**
**Problem**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solution**:
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /PID [PID_NUMBER] /F

# Then restart backend
cd backend
npm start
```

### **Issue 2: Email Verification Failing (FIXED)**
**Problem**: Signup sends verification email but verification fails

**Root Cause**: Supabase email confirmation is enabled but redirect URL is not configured properly

**Solution Applied**:
- Modified signup flow to handle email confirmation gracefully
- Added fallback to immediate sign-in for development
- Added better error messages

### **Issue 3: Pre-loader Stuck (DEBUGGING)**
**Problem**: App gets stuck on loading screen

**Debugging Steps**:
1. Open browser developer tools (F12)
2. Check Console tab for errors
3. Look for these log messages:
   - "Initial session check: User found/No user"
   - "Loading profile for user: [ID]"
   - "Profile loaded successfully"

---

## 🔍 **Step-by-Step Debugging**

### **1. Check Supabase Connection**
Open browser console and look for:
```
✅ "Supabase connection successful!"
❌ "Supabase connection failed: [error]"
```

### **2. Check Authentication Flow**
Look for these console messages:
```
🔐 "Initial session check: No user" (normal for new users)
🔐 "Auth state change: SIGNED_IN User found" (after signup/login)
👤 "Loading profile for user: [uuid]"
✅ "Profile loaded successfully"
```

### **3. Check Database Access**
If profile loading fails, check:
- Row Level Security (RLS) policies
- User exists in `users` table
- Database permissions

---

## 🛠️ **Quick Fixes**

### **Fix 1: Disable Email Confirmation (Temporary)**
Go to Supabase Dashboard → Authentication → Settings:
- Turn OFF "Enable email confirmations"
- This allows immediate signup without email verification

### **Fix 2: Clear Browser Data**
```
1. Open browser developer tools (F12)
2. Go to Application tab
3. Clear all localStorage data
4. Refresh the page
```

### **Fix 3: Reset Authentication State**
```javascript
// Run this in browser console to reset auth
localStorage.clear();
location.reload();
```

---

## 🔧 **Manual Testing Steps**

### **Test 1: Basic Signup**
```
1. Go to http://localhost:3000
2. Click "Get Started"
3. Enter:
   - Email: test@example.com
   - Password: password123
   - Name: Test User
4. Click Sign Up
5. Check console for errors
```

### **Test 2: Database Check**
```
1. Go to Supabase Dashboard
2. Navigate to Table Editor
3. Click "users" table
4. Look for your test user
5. Check if profile data exists
```

### **Test 3: Login Flow**
```
1. If signup worked, try logging out
2. Log back in with same credentials
3. Check if profile loads correctly
4. Verify theme preferences persist
```

---

## 🚨 **Common Error Messages**

### **"Failed to load user profile"**
**Causes**:
- Database connection issue
- RLS policy blocking access
- User profile doesn't exist

**Fix**:
```sql
-- Check if RLS is properly configured
SELECT * FROM users WHERE id = '[your-user-id]';

-- If no data, RLS might be blocking access
-- Temporarily disable RLS for testing:
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
```

### **"Invalid login credentials"**
**Causes**:
- Wrong email/password
- Email not verified
- User doesn't exist in Supabase Auth

**Fix**:
- Check Supabase Auth dashboard for user
- Try password reset
- Verify email if confirmation is enabled

### **"Email not confirmed"**
**Causes**:
- Email confirmation is enabled
- User hasn't clicked verification link

**Fix**:
- Disable email confirmation in Supabase settings
- Or implement proper email verification flow

---

## 🔍 **Debug Console Commands**

Run these in browser console for debugging:

```javascript
// Check current auth state
supabase.auth.getSession().then(console.log);

// Check if user exists in database
supabase.from('users').select('*').then(console.log);

// Test basic connection
supabase.from('users').select('count').limit(1).then(console.log);

// Clear all auth data
localStorage.clear();
```

---

## 📞 **If Still Stuck**

### **Immediate Actions**:
1. **Check browser console** for specific error messages
2. **Check Supabase logs** in dashboard
3. **Verify database schema** matches expected structure
4. **Test with email confirmation disabled**

### **Share These Details**:
- Exact error message from console
- Steps that led to the error
- Whether signup creates user in Supabase Auth
- Whether user appears in `users` table

---

## ✅ **Success Indicators**

You'll know it's working when:
- ✅ Signup redirects to dashboard (no email verification)
- ✅ User appears in Supabase Auth dashboard
- ✅ User profile appears in `users` table
- ✅ Theme changes persist after logout/login
- ✅ No console errors during auth flow

---

**🎯 Most issues are related to email verification being enabled. Disable it in Supabase settings for immediate testing!** 