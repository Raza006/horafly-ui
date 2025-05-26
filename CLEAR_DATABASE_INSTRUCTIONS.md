# 🗑️ Clear Database Instructions

## 🚨 **IMPORTANT: This will delete ALL users permanently!**

### **Method 1: Using Supabase Dashboard (Recommended)**

#### **Step 1: Clear Auth Users**
1. Go to your Supabase project: https://supabase.com/dashboard/project/hzlyxiwdqjvsgihvwiqh
2. Navigate to **Authentication** → **Users**
3. Select all users (click checkbox at top)
4. Click **Delete** button
5. Confirm deletion

#### **Step 2: Clear Users Table**
1. Go to **Table Editor** → **users** table
2. Click **Delete** → **Delete all rows**
3. Confirm deletion

#### **Step 3: Clear Browser Data**
1. Open your app in browser
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Run: `localStorage.clear()`
5. Run: `sessionStorage.clear()`
6. Refresh the page

---

### **Method 2: Using SQL (Advanced)**

#### **Step 1: Run SQL Commands**
1. Go to **SQL Editor** in Supabase
2. Run these commands:

```sql
-- Delete all users from the users table
DELETE FROM users;

-- Reset any sequences (if you have auto-incrementing IDs)
-- This is optional since we're using UUIDs
```

#### **Step 2: Clear Auth Users**
- Still need to manually delete from Authentication → Users in dashboard
- Auth users can't be deleted via SQL

---

### **Method 3: Using Node.js Script**

#### **Step 1: Get Service Role Key**
1. Go to **Settings** → **API** in Supabase
2. Copy your **service_role** key (not the anon key)
3. **⚠️ Keep this secret! Don't share it!**

#### **Step 2: Update Script**
1. Open `clear-database.js`
2. Replace `YOUR_SERVICE_ROLE_KEY_HERE` with your actual service role key

#### **Step 3: Run Script**
```bash
cd voice-assistant
npm install @supabase/supabase-js
node clear-database.js
```

---

## 🔧 **Fix Theme Flickering**

The theme flickering has been fixed by:
- ✅ Removed the `setInterval` that was checking every second
- ✅ Simplified the useEffect dependencies
- ✅ Kept only essential localStorage listeners

### **What was causing the flickering:**
- `setInterval(handleThemeReset, 1000)` was running every second
- This caused unnecessary re-renders and theme conflicts
- The dependency array `[currentTheme]` was causing infinite loops

### **What's fixed now:**
- ✅ Theme loads once on app start
- ✅ Theme changes only when user explicitly changes it
- ✅ No more background intervals
- ✅ Smooth theme transitions

---

## 🎯 **After Clearing Database**

### **Test the App:**
1. **Refresh the page** - should show landing page
2. **Try signup** - should work smoothly
3. **Change themes** - should be smooth, no flickering
4. **Logout/Login** - themes should persist correctly

### **Expected Behavior:**
- ✅ No users in Supabase Auth dashboard
- ✅ Empty users table
- ✅ Clean localStorage
- ✅ Smooth theme transitions
- ✅ No flickering or glitches

---

## 🚨 **If You Still Have Issues**

### **Complete Reset:**
```bash
# Clear all browser data
# In browser console:
localStorage.clear();
sessionStorage.clear();
indexedDB.deleteDatabase('supabase-auth-token');

# Hard refresh
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)
```

### **Check These:**
- ✅ All users deleted from Supabase Auth
- ✅ Users table is empty
- ✅ Browser localStorage is cleared
- ✅ No console errors
- ✅ Theme changes are smooth

---

## ✅ **Success Indicators**

You'll know it's working when:
- 🎨 **Themes change smoothly** without flickering
- 🚀 **App loads fast** without delays
- 🔐 **Fresh signup works** without conflicts
- 💾 **No old user data** interfering
- 🎯 **Clean slate** for testing

**The theme flickering should be completely gone now!** 🎉 