# 🚀 Horafly AI Sales Platform

A sophisticated AI-powered sales platform that combines lead generation, research, voice assistance, call transcription, and payment processing for marketing agencies and sales teams.

## 🎯 Platform Overview

**Horafly** transforms how sales teams work by providing:
- **Automated Lead Scraping** via ScrapingDog API
- **AI-Powered Lead Research** via Perplexity Search
- **Intelligent AI Assistant** with full data access via OpenAI
- **Advanced Call Transcription** with speaker identification via AssemblyAI
- **Seamless Payment Processing** via Stripe

---

## 🛠️ Technology Stack

### **Frontend**
- **React.js 19.1.0** + TypeScript
- **TailwindCSS 3.4.17** with custom Horafly theme
- **Framer Motion 12.12.2** for animations
- **Recharts** for data visualization
- **Firebase Auth** for authentication

### **Backend**
- **Node.js 18+** + Express.js
- **Firebase Firestore** for database
- **Socket.io** for real-time features
- **Firebase Storage** for file uploads

### **API Integrations**
- **ScrapingDog** - LinkedIn & web scraping
- **Perplexity Search** - AI-powered research
- **OpenAI GPT-4** - Intelligent assistant
- **AssemblyAI** - Audio transcription & analysis
- **Stripe** - Payment processing

---

## 🔑 **API KEYS CHECKLIST**

**Track your progress getting API keys:**

- [ ] **ScrapingDog** ✅ (you have this!)
  - Website: [scrapingdog.com](https://scrapingdog.com)
  - Used for: LinkedIn profile scraping
  
- [ ] **Supabase** 🎯 (get this next!)
  - Website: [supabase.com](https://supabase.com)
  - Used for: Database and authentication
  - **Need 3 keys**: URL, Anon Key, Service Role Key
  
- [ ] **OpenAI** (for AI features)
  - Website: [platform.openai.com](https://platform.openai.com)
  - Used for: AI assistant and chat
  
- [ ] **AssemblyAI** (for audio features)
  - Website: [assemblyai.com](https://assemblyai.com)
  - Used for: Audio transcription
  
- [ ] **Perplexity Search** (for research)
  - Website: [perplexity.ai](https://perplexity.ai)
  - Used for: Lead research and analysis
  
- [ ] **Stripe** (for payments - can wait)
  - Website: [stripe.com](https://stripe.com)
  - Used for: Payment processing

**🎯 Next Step**: Get your Supabase keys so we can set up the database!

---

## 🚀 Quick Start

### **1. Clone & Install**
```bash
git clone <repository-url>
cd voice-assistant

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

### **2. Environment Setup**

**📁 Create `.env` file in `backend/` directory and paste this:**

```bash
# ===== PASTE YOUR API KEYS HERE =====

# ScrapingDog (you have this one!)
SCRAPINGDOG_API_KEY=

# Supabase Database (get these next)
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# OpenAI (for AI assistant)
OPENAI_API_KEY=

# AssemblyAI (for audio transcription)
ASSEMBLYAI_API_KEY=

# Perplexity Search (for lead research)
PERPLEXITY_API_KEY=

# Stripe (for payments - can add later)
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

# Server Configuration (leave as is)
PORT=5000
NODE_ENV=development
```

**📝 How to fill this in:**
1. **Copy the template above**
2. **Create a file**: `voice-assistant/backend/.env`
3. **Paste the template** into the file
4. **Add your ScrapingDog key** after the `=` sign
5. **Get Supabase keys next** (I'll help you with this)
6. **Save the file**

**⚠️ Important**: 
- No spaces around the `=` sign
- Keep the `.env` file secret (never share it)
- The file should be exactly named `.env` (no .txt extension)

### **3. Run Application**
```bash
# Start backend server
cd backend
npm run dev

# Start frontend (new terminal)
cd ..
npm start
```

---

## 🔧 Feature Implementation Guide

### **1. Lead Scraping System**

**Purpose**: Extract lead data from LinkedIn profiles and company websites

**How it Works**:
1. User inputs LinkedIn URL or company website
2. ScrapingDog API extracts profile/company data
3. Data is cleaned, structured, and stored in Firestore
4. Lead appears in dashboard with enriched information

**ScrapingDog Setup**:
- Sign up at [scrapingdog.com](https://scrapingdog.com)
- Get API key from dashboard
- Choose plan based on scraping volume needs
- Supports LinkedIn profiles and general web scraping

**Data Extracted**:
- **Personal**: Name, title, location, profile picture
- **Company**: Name, industry, size, website, description
- **Contact**: Email (when available), social links

---

### **2. Lead Research System**

**Purpose**: AI-powered analysis of leads for actionable sales insights

**How it Works**:
1. User selects a lead for research
2. Perplexity Search API analyzes company background
3. Researches recent news, social media, website content
4. Generates realistic feedback and call recommendations
5. Results stored with lead for future reference

**Perplexity Search Setup**:
- Sign up at [perplexity.ai](https://perplexity.ai)
- Get API key from developer console
- Set up billing for API usage
- Provides real-time web search with AI analysis

**Research Insights**:
- Company recent news and updates
- Social media activity analysis
- Website content and services review
- Industry trends and competitive landscape
- Optimal contact timing recommendations

---

### **3. AI Assistant with Full Data Access**

**Purpose**: Intelligent assistant that can answer questions about any lead using complete user data

**How it Works**:
1. User asks questions about specific leads
2. System retrieves all related data from Firestore
3. OpenAI GPT-4 processes context and generates insights
4. Responses include actionable sales recommendations
5. Conversation history maintained for context

**OpenAI Setup**:
- Sign up at [platform.openai.com](https://platform.openai.com)
- Get API key and set up billing
- Access to GPT-4 model required
- Custom prompts optimized for sales insights

**Data Context Includes**:
- Lead personal and company information
- Research findings and analysis
- Previous interactions and notes
- Call recordings and transcriptions
- Email history and responses

---

### **4. Audio Recording & Transcription System**

**Purpose**: Record sales calls, transcribe with speaker identification, and provide custom playback

**How it Works**:
1. User uploads or records audio files
2. AssemblyAI transcribes with speaker identification
3. Timestamps aligned for precise navigation
4. AI generates call summary and action items
5. Custom MP3 player with Horafly theme
6. Export functionality for sharing

**AssemblyAI Setup**:
- Sign up at [assemblyai.com](https://assemblyai.com)
- Get API key from dashboard
- Choose plan based on transcription hours needed
- Advanced features: speaker diarization, sentiment analysis

**Features**:
- **Speaker Identification**: Distinguish different voices
- **Timestamp Navigation**: Jump to specific moments
- **Call Summaries**: AI-generated insights
- **Action Items**: Extracted next steps
- **Custom Player**: Horafly black & cream theme

---

### **5. Stripe Payment System**

**Purpose**: Handle subscriptions, billing, and payment processing

**How it Works**:
1. User selects subscription plan
2. Stripe checkout session created
3. Payment processed securely
4. Webhooks update user plan and credits
5. Subscription lifecycle managed automatically

**Stripe Setup**:
- Sign up at [stripe.com](https://stripe.com)
- Get publishable and secret keys
- Set up webhook endpoints
- Configure products and pricing

**Subscription Plans**:
- **Free**: 100 credits/month
- **Pro**: $50/month, unlimited credits
- **Enterprise**: Custom pricing and features

---

## 📊 Dashboard Features

### **Overview Section**
- Real-time metrics and KPIs
- Interactive charts and graphs
- Time-based filtering (Today, 7 days, 1 month, 3 months, 1 year)
- Revenue tracking and lead conversion rates

### **Lead Scraping Section**
- URL input for LinkedIn/website scraping
- Lead management with search and filtering
- Bulk import and export functionality
- Lead scoring and status tracking

### **AI Assistant Section**
- Chat interface with context awareness
- Task management and prioritization
- AI coaching and recommendations
- Performance analytics

### **Call Recording Section**
- Audio upload and recording
- Transcription management
- Custom MP3 player with timestamps
- Call analytics and insights

### **AI Transcription Section**
- Batch transcription processing
- Speaker identification and labeling
- Export options (PDF, TXT, JSON)
- Search within transcriptions

---

## 🔐 Security & Authentication

- **Firebase Authentication** with email/password and Google Sign-In
- **JWT tokens** for API authentication
- **Rate limiting** on API endpoints
- **Input validation** and sanitization
- **CORS** configuration for secure cross-origin requests

---

## 📱 Responsive Design

- **Mobile-first** approach
- **Glass morphism** effects
- **Smooth animations** with Framer Motion
- **Horafly branding** with black & cream color scheme
- **Professional typography** and spacing

---

## 🚀 Deployment

### **Frontend Deployment**
- Optimized for Vercel or Netlify
- Environment variables configured
- Build optimization and lazy loading

### **Backend Deployment**
- Firebase Functions for serverless hosting
- Environment variables secured
- Webhook endpoints configured
- Monitoring and logging enabled

---

## 📈 Roadmap

### **Phase 1: Core Features (Weeks 1-2)**
- ✅ Frontend foundation complete
- 🔄 Backend API development
- 🔄 Database schema implementation
- 🔄 Authentication integration

### **Phase 2: API Integrations (Weeks 3-4)**
- ScrapingDog lead scraping
- Perplexity Search research
- OpenAI assistant integration
- AssemblyAI transcription

### **Phase 3: Advanced Features (Weeks 5-6)**
- Stripe payment processing
- Real-time WebSocket features
- Custom audio player
- Analytics and reporting

### **Phase 4: Production Ready (Weeks 7-8)**
- Security hardening
- Performance optimization
- Testing and QA
- Production deployment

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

For support and questions:
- Email: support@horafly.com
- Documentation: [docs.horafly.com](https://docs.horafly.com)
- Issues: [GitHub Issues](https://github.com/horafly/issues)

---

**Built with ❤️ by the Horafly Team**
