-- Horafly AI Sales Platform Database Schema
-- Created: 2025-01-25
-- Description: Complete database structure for users, leads, conversations, calls, and scripts

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- USERS TABLE
-- =============================================
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    display_name VARCHAR(100),
    avatar_url TEXT,
    
    -- Subscription & Credits
    plan VARCHAR(20) DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
    credits INTEGER DEFAULT 100,
    credits_used INTEGER DEFAULT 0,
    credits_reset_date TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '1 month',
    
    -- Stripe Integration
    stripe_customer_id VARCHAR(100),
    stripe_subscription_id VARCHAR(100),
    subscription_status VARCHAR(20) DEFAULT 'inactive' CHECK (subscription_status IN ('active', 'inactive', 'canceled', 'past_due')),
    subscription_end_date TIMESTAMP WITH TIME ZONE,
    
    -- User Preferences
    theme VARCHAR(10) DEFAULT 'dark' CHECK (theme IN ('dark', 'light')),
    notifications_enabled BOOLEAN DEFAULT true,
    ai_voice_preference VARCHAR(20) DEFAULT 'default' CHECK (ai_voice_preference IN ('default', 'professional', 'casual')),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE,
    
    -- Metadata
    onboarding_completed BOOLEAN DEFAULT false,
    email_verified BOOLEAN DEFAULT false
);

-- =============================================
-- LEADS TABLE
-- =============================================
CREATE TABLE leads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Personal Information
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(50),
    linkedin_url TEXT,
    profile_picture_url TEXT,
    job_title VARCHAR(200),
    
    -- Company Information
    company_name VARCHAR(200),
    company_website TEXT,
    company_industry VARCHAR(100),
    company_size VARCHAR(50),
    company_location VARCHAR(200),
    company_description TEXT,
    
    -- Lead Scoring & Status
    lead_score INTEGER DEFAULT 0 CHECK (lead_score >= 0 AND lead_score <= 100),
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost', 'archived')),
    priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    
    -- Lead Source & Tracking
    source VARCHAR(50) DEFAULT 'manual' CHECK (source IN ('manual', 'linkedin', 'import', 'scraping', 'referral')),
    source_url TEXT,
    tags TEXT[], -- Array of tags
    
    -- Notes & Research
    notes TEXT,
    research_data JSONB, -- Store research results from Perplexity
    last_research_date TIMESTAMP WITH TIME ZONE,
    
    -- Contact History
    last_contacted_at TIMESTAMP WITH TIME ZONE,
    next_follow_up TIMESTAMP WITH TIME ZONE,
    contact_attempts INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- CONVERSATIONS TABLE
-- =============================================
CREATE TABLE conversations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    
    -- Conversation Details
    title VARCHAR(200),
    type VARCHAR(20) DEFAULT 'chat' CHECK (type IN ('chat', 'voice', 'email')),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'archived', 'deleted')),
    
    -- AI Context
    context_data JSONB, -- Store conversation context for AI
    summary TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- MESSAGES TABLE
-- =============================================
CREATE TABLE messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    
    -- Message Content
    content TEXT NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    
    -- AI Metadata
    ai_model VARCHAR(50),
    confidence_score DECIMAL(3,2),
    processing_time INTEGER, -- milliseconds
    token_count INTEGER,
    
    -- Message Type & Status
    message_type VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'voice', 'image', 'file')),
    status VARCHAR(20) DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'read', 'failed')),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- CALL RECORDINGS TABLE
-- =============================================
CREATE TABLE call_recordings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    conversation_id UUID REFERENCES conversations(id) ON DELETE SET NULL,
    
    -- Call Details
    title VARCHAR(200) NOT NULL,
    description TEXT,
    duration INTEGER, -- seconds
    
    -- File Information
    audio_file_url TEXT,
    audio_file_size INTEGER, -- bytes
    audio_format VARCHAR(10) DEFAULT 'mp3',
    
    -- Transcription Data
    transcription_text TEXT,
    transcription_confidence DECIMAL(3,2),
    speakers JSONB, -- Array of speaker data with timestamps
    
    -- AI Analysis
    sentiment VARCHAR(20) CHECK (sentiment IN ('positive', 'negative', 'neutral', 'mixed')),
    key_topics TEXT[],
    action_items TEXT[],
    summary TEXT,
    next_steps TEXT,
    
    -- Processing Status
    transcription_status VARCHAR(20) DEFAULT 'pending' CHECK (transcription_status IN ('pending', 'processing', 'completed', 'failed')),
    analysis_status VARCHAR(20) DEFAULT 'pending' CHECK (analysis_status IN ('pending', 'processing', 'completed', 'failed')),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    transcribed_at TIMESTAMP WITH TIME ZONE,
    analyzed_at TIMESTAMP WITH TIME ZONE
);

-- =============================================
-- SCRIPTS TABLE
-- =============================================
CREATE TABLE scripts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Script Details
    title VARCHAR(200) NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'email' CHECK (category IN ('email', 'call', 'linkedin', 'sms', 'other')),
    
    -- Template Variables
    variables TEXT[], -- Array of variable names like ['firstName', 'companyName']
    
    -- Sharing & Visibility
    is_public BOOLEAN DEFAULT false,
    is_template BOOLEAN DEFAULT false,
    
    -- Usage Statistics
    times_used INTEGER DEFAULT 0,
    success_rate DECIMAL(3,2) DEFAULT 0.00,
    
    -- Tags & Organization
    tags TEXT[],
    folder VARCHAR(100),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_used_at TIMESTAMP WITH TIME ZONE
);

-- =============================================
-- SCRIPT USAGE TABLE
-- =============================================
CREATE TABLE script_usage (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    script_id UUID REFERENCES scripts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    
    -- Usage Details
    outcome VARCHAR(20) CHECK (outcome IN ('success', 'failure', 'pending', 'no_response')),
    notes TEXT,
    
    -- Timestamps
    used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- CREDIT USAGE TABLE
-- =============================================
CREATE TABLE credit_usage (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Usage Details
    action VARCHAR(50) NOT NULL, -- 'lead_scraping', 'ai_chat', 'transcription', etc.
    credits_used INTEGER NOT NULL DEFAULT 1,
    description TEXT,
    
    -- Related Records
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    conversation_id UUID REFERENCES conversations(id) ON DELETE SET NULL,
    call_recording_id UUID REFERENCES call_recordings(id) ON DELETE SET NULL,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- Users indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_stripe_customer ON users(stripe_customer_id);
CREATE INDEX idx_users_plan ON users(plan);

-- Leads indexes
CREATE INDEX idx_leads_user_id ON leads(user_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_score ON leads(lead_score);
CREATE INDEX idx_leads_company ON leads(company_name);
CREATE INDEX idx_leads_created_at ON leads(created_at);

-- Conversations indexes
CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_conversations_lead_id ON conversations(lead_id);
CREATE INDEX idx_conversations_updated_at ON conversations(updated_at);

-- Messages indexes
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);

-- Call recordings indexes
CREATE INDEX idx_call_recordings_user_id ON call_recordings(user_id);
CREATE INDEX idx_call_recordings_lead_id ON call_recordings(lead_id);
CREATE INDEX idx_call_recordings_status ON call_recordings(transcription_status);

-- Scripts indexes
CREATE INDEX idx_scripts_user_id ON scripts(user_id);
CREATE INDEX idx_scripts_category ON scripts(category);
CREATE INDEX idx_scripts_public ON scripts(is_public);

-- Credit usage indexes
CREATE INDEX idx_credit_usage_user_id ON credit_usage(user_id);
CREATE INDEX idx_credit_usage_action ON credit_usage(action);
CREATE INDEX idx_credit_usage_created_at ON credit_usage(created_at);

-- =============================================
-- ROW LEVEL SECURITY POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_recordings ENABLE ROW LEVEL SECURITY;
ALTER TABLE scripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE script_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_usage ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Leads policies
CREATE POLICY "Users can view own leads" ON leads FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own leads" ON leads FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own leads" ON leads FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own leads" ON leads FOR DELETE USING (auth.uid() = user_id);

-- Conversations policies
CREATE POLICY "Users can view own conversations" ON conversations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own conversations" ON conversations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own conversations" ON conversations FOR UPDATE USING (auth.uid() = user_id);

-- Messages policies
CREATE POLICY "Users can view messages in own conversations" ON messages FOR SELECT 
USING (EXISTS (SELECT 1 FROM conversations WHERE conversations.id = messages.conversation_id AND conversations.user_id = auth.uid()));
CREATE POLICY "Users can insert messages in own conversations" ON messages FOR INSERT 
WITH CHECK (EXISTS (SELECT 1 FROM conversations WHERE conversations.id = messages.conversation_id AND conversations.user_id = auth.uid()));

-- Call recordings policies
CREATE POLICY "Users can view own call recordings" ON call_recordings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own call recordings" ON call_recordings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own call recordings" ON call_recordings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own call recordings" ON call_recordings FOR DELETE USING (auth.uid() = user_id);

-- Scripts policies
CREATE POLICY "Users can view own scripts and public scripts" ON scripts FOR SELECT 
USING (auth.uid() = user_id OR is_public = true);
CREATE POLICY "Users can insert own scripts" ON scripts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own scripts" ON scripts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own scripts" ON scripts FOR DELETE USING (auth.uid() = user_id);

-- Script usage policies
CREATE POLICY "Users can view own script usage" ON script_usage FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own script usage" ON script_usage FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Credit usage policies
CREATE POLICY "Users can view own credit usage" ON credit_usage FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own credit usage" ON credit_usage FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================
-- FUNCTIONS & TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_call_recordings_updated_at BEFORE UPDATE ON call_recordings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_scripts_updated_at BEFORE UPDATE ON scripts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to deduct credits
CREATE OR REPLACE FUNCTION deduct_credits(user_uuid UUID, credits_to_deduct INTEGER, action_name TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    current_credits INTEGER;
    user_plan TEXT;
BEGIN
    -- Get current credits and plan
    SELECT credits, plan INTO current_credits, user_plan FROM users WHERE id = user_uuid;
    
    -- Pro users have unlimited credits
    IF user_plan = 'pro' OR user_plan = 'enterprise' THEN
        -- Log the usage but don't deduct credits
        INSERT INTO credit_usage (user_id, action, credits_used, description)
        VALUES (user_uuid, action_name, credits_to_deduct, 'Pro/Enterprise user - unlimited credits');
        RETURN TRUE;
    END IF;
    
    -- Check if user has enough credits
    IF current_credits >= credits_to_deduct THEN
        -- Deduct credits
        UPDATE users 
        SET credits = credits - credits_to_deduct,
            credits_used = credits_used + credits_to_deduct
        WHERE id = user_uuid;
        
        -- Log the usage
        INSERT INTO credit_usage (user_id, action, credits_used, description)
        VALUES (user_uuid, action_name, credits_to_deduct, 'Credits deducted successfully');
        
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- SAMPLE DATA (Optional - for testing)
-- =============================================

-- Insert sample public scripts
INSERT INTO scripts (id, user_id, title, description, content, category, is_public, is_template, variables) VALUES
(uuid_generate_v4(), NULL, 'Cold Email - SaaS Introduction', 'Professional cold email template for SaaS products', 
'Hi {{firstName}},

I noticed {{companyName}} is in the {{industry}} space and thought you might be interested in how we''ve helped similar companies increase their sales efficiency by 300%.

Our AI-powered sales platform has helped companies like yours:
- Generate 15+ qualified leads per week
- Reduce research time by 80%
- Increase email response rates by 45%

Would you be open to a quick 15-minute call this week to see if this could benefit {{companyName}}?

Best regards,
{{senderName}}', 
'email', true, true, ARRAY['firstName', 'companyName', 'industry', 'senderName']),

(uuid_generate_v4(), NULL, 'LinkedIn Connection Request', 'Professional LinkedIn connection message', 
'Hi {{firstName}}, I see you''re leading {{department}} at {{companyName}}. I''d love to connect and share some insights about how AI is transforming sales processes in the {{industry}} industry. Would you be open to connecting?', 
'linkedin', true, true, ARRAY['firstName', 'department', 'companyName', 'industry']),

(uuid_generate_v4(), NULL, 'Follow-up Email', 'Professional follow-up email template', 
'Hi {{firstName}},

I wanted to follow up on my previous email about helping {{companyName}} streamline your sales process.

I understand you''re probably busy, but I''d hate for you to miss out on the opportunity to see how we''ve helped companies in {{industry}} achieve:

✓ 300% increase in qualified leads
✓ 15+ hours saved per week on research
✓ 45% higher email response rates

Would a brief 10-minute call work better for you? I''m happy to work around your schedule.

Best,
{{senderName}}', 
'email', true, true, ARRAY['firstName', 'companyName', 'industry', 'senderName']);

-- =============================================
-- COMPLETION MESSAGE
-- =============================================

-- This will show when the schema is successfully created
DO $$
BEGIN
    RAISE NOTICE '🎉 Horafly Database Schema Created Successfully!';
    RAISE NOTICE '📊 Tables Created: users, leads, conversations, messages, call_recordings, scripts, script_usage, credit_usage';
    RAISE NOTICE '🔒 Row Level Security Enabled';
    RAISE NOTICE '⚡ Indexes and Triggers Added';
    RAISE NOTICE '🚀 Ready for Authentication Setup!';
END $$; 