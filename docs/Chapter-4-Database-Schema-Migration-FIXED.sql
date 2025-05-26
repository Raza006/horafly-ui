-- Lead Scraping Database Migration (CORRECTED VERSION)
-- This file contains the SQL commands to create the necessary tables for the lead scraping functionality

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

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_scraping_jobs_updated_at 
    BEFORE UPDATE ON scraping_jobs 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at 
    BEFORE UPDATE ON leads 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

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

-- Create a view for job statistics
CREATE OR REPLACE VIEW job_statistics AS
SELECT 
    user_id,
    COUNT(*) as total_jobs,
    COUNT(CASE WHEN status = 'active' THEN 1 END) as active_jobs,
    COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_jobs,
    COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed_jobs,
    SUM(leads_found) as total_leads_found,
    AVG(progress) as average_progress
FROM scraping_jobs
GROUP BY user_id;

-- Grant access to the view
GRANT SELECT ON job_statistics TO authenticated;

-- Create a function to get user lead statistics (CORRECTED VERSION)
CREATE OR REPLACE FUNCTION get_user_lead_stats(user_uuid UUID)
RETURNS TABLE (
    total_leads BIGINT,
    leads_this_month BIGINT,
    leads_this_week BIGINT,
    top_industry TEXT,
    top_location TEXT,
    average_confidence NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) as total_leads,
        COUNT(CASE WHEN scraped_at >= DATE_TRUNC('month', NOW()) THEN 1 END) as leads_this_month,
        COUNT(CASE WHEN scraped_at >= DATE_TRUNC('week', NOW()) THEN 1 END) as leads_this_week,
        MODE() WITHIN GROUP (ORDER BY industry) as top_industry,
        MODE() WITHIN GROUP (ORDER BY location) as top_location,
        ROUND(AVG(confidence), 2) as average_confidence
    FROM leads 
    WHERE user_id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION get_user_lead_stats(UUID) TO authenticated; 