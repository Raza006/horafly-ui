-- Complete Database Setup for AI Voice Calling Application
-- Run this script in your Supabase SQL Editor to create all required tables

-- 1. Create users table for user profiles and preferences
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    display_name TEXT,
    avatar_url TEXT,
    plan TEXT DEFAULT 'Free' CHECK (plan IN ('Free', 'Pro', 'Enterprise')),
    credits INTEGER DEFAULT 100,
    subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active', 'inactive', 'cancelled', 'past_due')),
    onboarding_completed BOOLEAN DEFAULT true,
    preferences JSONB DEFAULT '{"theme": "midnight"}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create scraping_jobs table for lead scraping campaigns
CREATE TABLE IF NOT EXISTS public.scraping_jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    query TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'US',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'paused', 'completed', 'failed')),
    total_leads INTEGER DEFAULT 0,
    scraped_leads INTEGER DEFAULT 0,
    progress DECIMAL(5,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- 3. Create leads table for scraped business data
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    job_id UUID REFERENCES public.scraping_jobs(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    address TEXT,
    phone TEXT,
    website TEXT,
    rating DECIMAL(3,2),
    reviews_count INTEGER DEFAULT 0,
    category TEXT,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    place_id TEXT,
    google_maps_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create call_recordings table for voice call data
CREATE TABLE IF NOT EXISTS public.call_recordings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    duration INTEGER NOT NULL, -- in seconds
    file_url TEXT,
    transcript TEXT,
    summary TEXT,
    sentiment TEXT CHECK (sentiment IN ('positive', 'neutral', 'negative')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_scraping_jobs_user_id ON public.scraping_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_scraping_jobs_status ON public.scraping_jobs(status);
CREATE INDEX IF NOT EXISTS idx_leads_job_id ON public.leads(job_id);
CREATE INDEX IF NOT EXISTS idx_leads_user_id ON public.leads(user_id);
CREATE INDEX IF NOT EXISTS idx_call_recordings_user_id ON public.call_recordings(user_id);
CREATE INDEX IF NOT EXISTS idx_call_recordings_lead_id ON public.call_recordings(lead_id);

-- 6. Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scraping_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.call_recordings ENABLE ROW LEVEL SECURITY;

-- 7. Create RLS policies for users table
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- 8. Create RLS policies for scraping_jobs table
CREATE POLICY "Users can view own scraping jobs" ON public.scraping_jobs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own scraping jobs" ON public.scraping_jobs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own scraping jobs" ON public.scraping_jobs
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own scraping jobs" ON public.scraping_jobs
    FOR DELETE USING (auth.uid() = user_id);

-- 9. Create RLS policies for leads table
CREATE POLICY "Users can view own leads" ON public.leads
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own leads" ON public.leads
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own leads" ON public.leads
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own leads" ON public.leads
    FOR DELETE USING (auth.uid() = user_id);

-- 10. Create RLS policies for call_recordings table
CREATE POLICY "Users can view own call recordings" ON public.call_recordings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own call recordings" ON public.call_recordings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own call recordings" ON public.call_recordings
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own call recordings" ON public.call_recordings
    FOR DELETE USING (auth.uid() = user_id);

-- 11. Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 12. Create triggers for automatic timestamp updates
CREATE TRIGGER handle_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_scraping_jobs_updated_at
    BEFORE UPDATE ON public.scraping_jobs
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 13. Create function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, display_name, preferences)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
        '{"theme": "midnight"}'::jsonb
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 14. Create trigger to automatically create user profile on auth.users insert
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 15. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Success message
SELECT 'Database setup completed successfully! All tables, indexes, RLS policies, and triggers have been created.' AS status; 