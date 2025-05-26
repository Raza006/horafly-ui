# 🗄️ Database Setup for Lead Scraping

## 🚨 Issue: Infinite Loading in Lead Scraping

If you're seeing "Loading lead scraping data..." indefinitely, it means the database tables for lead scraping haven't been created yet.

## ✅ Quick Fix: Create Database Tables

### Step 1: Access Supabase Dashboard
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project: `hzlyxiwdqjvsgihvwiqh`
3. Click on "SQL Editor" in the left sidebar

### Step 2: Run Database Migration
Copy and paste the following SQL into the SQL Editor and click "Run":

```sql
-- Lead Scraping Database Migration
-- This creates the necessary tables for the lead scraping functionality

-- Create scraping_jobs table
CREATE TABLE IF NOT EXISTS scraping_jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'queued' CHECK (status IN ('active', 'completed', 'paused', 'failed', 'queued')),
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    leads_found INTEGER DEFAULT 0,
    total_expected INTEGER DEFAULT 0,
    time_remaining VARCHAR(100) DEFAULT 'Calculating...',
    industry VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    company_size VARCHAR(50) NOT NULL,
    revenue_range VARCHAR(50) NOT NULL,
    search_query TEXT NOT NULL,
    error_message TEXT,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    industry VARCHAR(100) NOT NULL,
    employees VARCHAR(50) NOT NULL,
    revenue VARCHAR(50) NOT NULL,
    location VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    website VARCHAR(500),
    linkedin VARCHAR(500),
    confidence INTEGER DEFAULT 0 CHECK (confidence >= 0 AND confidence <= 100),
    source VARCHAR(100) NOT NULL,
    scraped_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_scraping_jobs_user_id ON scraping_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_scraping_jobs_status ON scraping_jobs(status);
CREATE INDEX IF NOT EXISTS idx_scraping_jobs_created_at ON scraping_jobs(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_leads_user_id ON leads(user_id);
CREATE INDEX IF NOT EXISTS idx_leads_scraped_at ON leads(scraped_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_company ON leads(company);
CREATE INDEX IF NOT EXISTS idx_leads_industry ON leads(industry);
CREATE INDEX IF NOT EXISTS idx_leads_location ON leads(location);

-- Enable Row Level Security (RLS)
ALTER TABLE scraping_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for scraping_jobs
CREATE POLICY "Users can view their own scraping jobs" ON scraping_jobs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own scraping jobs" ON scraping_jobs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own scraping jobs" ON scraping_jobs
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own scraping jobs" ON scraping_jobs
    FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for leads
CREATE POLICY "Users can view their own leads" ON leads
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own leads" ON leads
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own leads" ON leads
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own leads" ON leads
    FOR DELETE USING (auth.uid() = user_id);

-- Grant necessary permissions
GRANT ALL ON scraping_jobs TO authenticated;
GRANT ALL ON leads TO authenticated;
```

### Step 3: Verify Tables Created
After running the SQL, you should see:
- ✅ `scraping_jobs` table created
- ✅ `leads` table created
- ✅ Indexes created
- ✅ RLS policies enabled

### Step 4: Test the Application
1. Go back to your application
2. Navigate to the Lead Scraping section
3. The infinite loading should be resolved
4. You should now see the Google Maps scraping interface

## 🔍 Troubleshooting

### If you still see infinite loading:
1. **Check browser console** for error messages
2. **Refresh the page** after running the SQL
3. **Verify user authentication** - make sure you're logged in
4. **Check Supabase logs** in the dashboard for any errors

### Common Issues:
- **Permission errors**: Make sure RLS policies are created correctly
- **Authentication errors**: Ensure you're logged in with a valid user
- **Network errors**: Check your internet connection and Supabase status

## 🎯 What This Fixes

After running this migration, you'll have access to:
- ✅ **Real Google Maps Scraping**: Actual API integration
- ✅ **Campaign Management**: Create, pause, resume, delete jobs
- ✅ **Lead Storage**: Persistent lead data in database
- ✅ **Export Functionality**: Download leads as CSV
- ✅ **Real-time Progress**: Live updates on scraping jobs
- ✅ **Folder Organization**: Organized campaign results

## 📞 Need Help?

If you're still experiencing issues after following these steps:
1. Check the browser console for specific error messages
2. Verify your Supabase project URL and keys are correct
3. Ensure your Supabase project has the necessary permissions

---

**Status**: 🟢 **Ready to use after database setup**  
**Estimated Setup Time**: 2-3 minutes 