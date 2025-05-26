import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  FileText, 
  Search, 
  Mic, 
  TrendingUp, 
  ChevronRight,
  Play,
  Check,
  Star,
  ArrowRight,
  Shield,
  Clock,
  Target,
  Crown,
  Sparkles,
  Infinity as InfinityIcon,
  Award,
  Rocket,
  Diamond,
  Headphones,
  Brain,
  Users,
  Globe,
  Zap,
  MessageSquare,
  Calendar,
  Phone,
  Building,
  Briefcase,
  DollarSign,
  Settings
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';
import ShardBackground from './ShardBackground';
import horaflyLogo from '../images/horaflylogo.png';
import { useToast } from '../contexts/ToastContext';

interface StatData {
  number: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface User {
  id: string;
  email: string;
  displayName: string;
  plan: string;
  credits: number;
  subscriptionStatus: string;
  onboardingCompleted: boolean;
}

interface LandingPageProps {
  onDashboardClick: () => void;
  onSettingsClick: () => void;
  currentUser: User | null;
}

const LandingPage: React.FC<LandingPageProps> = ({ onDashboardClick, onSettingsClick, currentUser }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { currentTheme, colors } = useTheme();
  const { showEmailVerification, verificationEmail, hideEmailVerification } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (showEmailVerification && verificationEmail) {
      showToast(
        'verification',
        'Please check your email and click the verification link before signing in.',
        verificationEmail,
        30000 // 30 seconds duration
      );
      hideEmailVerification(); // Hide the modal flag since we're using toast
    }
  }, [showEmailVerification, verificationEmail, showToast, hideEmailVerification]);

  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "AI Lead Scraping",
      description: "Automatically discover and collect high-quality leads from multiple sources with AI-powered precision and real-time data validation.",
      color: "from-gold-400 to-gold-600",
      delay: 0,
      metrics: "10,000+ leads/month",
      accuracy: "97.5%"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Deep Lead Research", 
      description: "Advanced AI algorithms analyze prospect data, social profiles, and business intelligence to provide comprehensive insights.",
      color: "from-gold-500 to-gold-700",
      delay: 0.1,
      metrics: "50+ data points",
      accuracy: "99.2%"
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI Sales Assistant",
      description: "Your personal AI coach provides real-time guidance, strategic insights, and expert recommendations during every interaction.",
      color: "from-gold-600 to-gold-800",
      delay: 0.2,
      metrics: "24/7 availability",
      accuracy: "95.8%"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Smart Outreach Scripts",
      description: "AI-generated, personalized messages that adapt to each prospect's profile, industry, and communication style for maximum impact.",
      color: "from-gold-400 to-gold-700",
      delay: 0.3,
      metrics: "80% open rate",
      accuracy: "450% conversion"
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Crystal Call Recording",
      description: "Professional-grade voice recording with noise cancellation, automatic organization, and secure cloud storage.",
      color: "from-gold-500 to-gold-800",
      delay: 0.4,
      metrics: "HD quality audio",
      accuracy: "Enterprise security"
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: "AI Transcription Pro",
      description: "99.9% accurate transcripts with speaker identification, sentiment analysis, and automated key moment detection.",
      color: "from-gold-600 to-gold-900",
      delay: 0.5,
      metrics: "Real-time processing",
      accuracy: "99.9% accurate"
    }
  ];

  const detailedStats = [
    { number: '2.3M+', label: 'Leads Generated', icon: Users, color: 'text-blue-400', growth: '+245%' },
    { number: '890%', label: 'ROI Increase', icon: TrendingUp, color: 'text-green-400', growth: '+67%' },
    { number: '$47M', label: 'Revenue Generated', icon: DollarSign, color: 'text-gold-400', growth: '+312%' },
    { number: '15k+', label: 'Happy Customers', icon: Crown, color: 'text-purple-400', growth: '+189%' },
    { number: '99.9%', label: 'Uptime SLA', icon: Shield, color: 'text-indigo-400', growth: 'Stable' },
    { number: '<2s', label: 'Response Time', icon: Zap, color: 'text-orange-400', growth: '+78%' },
  ];

  const industryStats = [
    { industry: 'Technology', growth: '+425%', companies: '2,847', icon: Zap },
    { industry: 'Healthcare', growth: '+380%', companies: '1,923', icon: Shield },
    { industry: 'Finance', growth: '+465%', companies: '3,156', icon: TrendingUp },
    { industry: 'Real Estate', growth: '+390%', companies: '2,234', icon: Building },
    { industry: 'Manufacturing', growth: '+340%', companies: '1,789', icon: Briefcase },
    { industry: 'E-commerce', growth: '+510%', companies: '4,023', icon: Globe }
  ];

  const workflowSteps = [
    {
      step: 1,
      title: "AI Lead Discovery",
      description: "Our AI scans millions of data points to identify your perfect prospects",
      icon: Search,
      duration: "2-5 minutes",
      automation: "100% Automated"
    },
    {
      step: 2,
      title: "Deep Research Analysis", 
      description: "Advanced algorithms analyze each prospect's business, pain points, and opportunities",
      icon: Brain,
      duration: "30 seconds",
      automation: "AI-Powered"
    },
    {
      step: 3,
      title: "Personalized Outreach",
      description: "Generate custom scripts and messages tailored to each prospect's specific needs",
      icon: MessageSquare,
      duration: "1 minute",
      automation: "Smart Generation"
    },
    {
      step: 4,
      title: "Intelligent Follow-up",
      description: "AI tracks responses and optimizes follow-up timing and messaging automatically",
      icon: Calendar,
      duration: "Ongoing",
      automation: "Smart Scheduling"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "VP of Sales",
      company: "TechFlow Dynamics",
      content: "Horafly Intel Pro transformed our entire sales process. We've seen a 350% increase in qualified leads and our team's confidence has skyrocketed with the AI coaching.",
      rating: 5,
      avatar: "👩‍💼",
      revenue: "+$2.4M ARR",
      timeline: "6 months",
      previousTools: "HubSpot, Salesforce"
    },
    {
      name: "Michael Chen",
      role: "Sales Director", 
      company: "GrowthCorp Solutions",
      content: "The call analysis and real-time feedback feature is absolutely revolutionary. It's like having a world-class sales expert available 24/7.",
      rating: 5,
      avatar: "👨‍💼",
      revenue: "+$1.8M ARR",
      timeline: "4 months",
      previousTools: "Outreach, ZoomInfo"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Business Development",
      company: "ScaleUp Ventures",
      content: "The lead research capabilities are mind-blowing. Our team discovers insights we never would have found manually, giving us a massive competitive edge.",
      rating: 5,
      avatar: "👩‍🚀",
      revenue: "+$3.2M ARR",
      timeline: "8 months",
      previousTools: "Apollo, Clay"
    },
    {
      name: "David Park",
      role: "CEO",
      company: "InnovateTech",
      content: "ROI was immediate. Within 30 days, our conversion rates doubled. The AI insights are scary accurate - it's like having a crystal ball for sales.",
      rating: 5,
      avatar: "👨‍💼",
      revenue: "+$4.1M ARR",
      timeline: "3 months",
      previousTools: "Pipedrive, LinkedIn Sales Navigator"
    }
  ];

  const pricingPlans = [
    {
      name: "Free Starter",
      price: { monthly: 0, yearly: 0 },
      credits: 100,
      description: "Perfect for testing our AI capabilities",
      features: [
        "100 AI credits per month",
        "Basic lead research",
        "Simple call recording",
        "Email support",
        "Basic analytics",
        "2 team members"
      ],
      limitations: [
        "Limited integrations",
        "Basic reporting",
        "No priority support"
      ],
      popular: false,
      cta: "Start Free"
    },
    {
      name: "Pro Unlimited",
      price: { monthly: 97, yearly: 970 },
      credits: "Unlimited",
      description: "For serious sales professionals",
      features: [
        "Unlimited AI credits",
        "Advanced lead scraping",
        "Premium call analysis",
        "Real-time AI coaching",
        "Priority support",
        "Advanced analytics",
        "Custom integrations",
        "White-label options",
        "Unlimited team members",
        "API access",
        "Custom workflows",
        "Advanced reporting"
      ],
      popular: true,
      trial: "7-day free trial",
      cta: "Start Free Trial"
    },
    {
      name: "Enterprise",
      price: { monthly: "Custom", yearly: "Custom" },
      credits: "Unlimited",
      description: "For large organizations",
      features: [
        "Everything in Pro",
        "Dedicated account manager",
        "Custom AI model training",
        "On-premise deployment",
        "Advanced security",
        "SLA guarantees",
        "Custom integrations",
        "24/7 phone support",
        "Unlimited everything",
        "Custom features"
      ],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  const statsData: StatData[] = [
    { number: '400%', label: 'Conversion Boost', icon: TrendingUp },
    { number: '20h', label: 'Weekly Time Saved', icon: Clock },
    { number: '99.9%', label: 'AI Accuracy', icon: Target },
    { number: '24/7', label: 'AI Assistance', icon: Shield }
  ];

  return (
    <div 
      className="min-h-screen text-white overflow-hidden relative transition-all duration-300"
      style={{ 
        background: colors.primary,
        color: colors.textPrimary 
      }}
    >
      {/* Shard Background */}
      <ShardBackground />

      {/* Enhanced Header */}
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled ? 'glass-morphism border-b' : 'bg-transparent'
        }`}
        style={{
          borderColor: isScrolled ? colors.border : 'transparent'
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-gold-lg hover-shine overflow-hidden"
              style={{ background: colors.glassPrimary }}
              animate={{ 
                boxShadow: [
                  `0 0 20px ${colors.goldPrimary}50`,
                  `0 0 40px ${colors.goldPrimary}80`,
                  `0 0 20px ${colors.goldPrimary}50`
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <img 
                src={horaflyLogo} 
                alt="Horafly Logo" 
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  // Fallback if logo doesn't load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <Crown 
                className="w-7 h-7 hidden" 
                style={{ color: colors.goldPrimary }} 
              />
            </motion.div>
            <div>
              <span 
                className="text-2xl font-bold"
                style={{ color: colors.goldPrimary }}
              >
                Horafly
              </span>
              <div className="text-xs font-medium" style={{ color: colors.goldSecondary }}>
                AI Sales Platform
              </div>
            </div>
          </motion.div>

          <nav className="hidden md:flex space-x-8">
            {['Features', 'Workflow', 'Pricing', 'Testimonials', 'Contact'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="transition-all duration-300 relative group"
                style={{ color: colors.textSecondary }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                whileHover={{ y: -2, color: colors.goldPrimary }}
              >
                {item}
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0.5 opacity-0 group-hover:opacity-100"
                  style={{ background: colors.goldGradient }}
                  layoutId="underline"
                />
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {currentUser && (
              <motion.button
                onClick={onSettingsClick}
                className="p-3 rounded-xl transition-all duration-300 border"
                style={{ 
                  background: colors.glassSecondary,
                  borderColor: colors.border,
                  color: colors.textSecondary
                }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: `${colors.goldPrimary}20`,
                  borderColor: colors.goldPrimary,
                  color: colors.goldPrimary
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Settings className="w-5 h-5" />
              </motion.button>
            )}
            
            <motion.button
              onClick={currentUser ? onDashboardClick : () => setShowLoginModal(true)}
              className="relative overflow-hidden rounded-xl font-bold transition-all duration-300 px-6 py-3 hover-shine"
              style={{ 
                background: colors.goldGradient, 
                color: colors.primary 
              }}
              whileHover={{ scale: 1.05, boxShadow: `0 8px 25px ${colors.goldPrimary}40` }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>{currentUser ? 'Dashboard' : 'Login'}</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Enhanced Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring" }}
          >
            {currentUser && (
              <motion.div 
                className="inline-flex items-center space-x-2 rounded-full px-4 py-2 mb-8 glass-morphism"
                style={{ borderColor: colors.border }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Sparkles className="w-4 h-4" style={{ color: colors.goldPrimary }} />
                <span style={{ color: colors.goldPrimary }} className="text-sm font-medium">
                  Welcome back, {currentUser.displayName}!
                </span>
                <Crown className="w-4 h-4" style={{ color: colors.goldPrimary }} />
              </motion.div>
            )}

            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
              <motion.span 
                style={{ 
                  background: colors.goldGradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                AI Sales
              </motion.span>
              <br />
              <motion.span 
                style={{ color: colors.textPrimary }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Domination
              </motion.span>
            </h1>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed"
            style={{ color: colors.textSecondary }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Transform your sales process with military-grade AI that scrapes leads, 
            researches prospects, records calls, and provides expert feedback with 
            <span style={{ color: colors.goldPrimary }} className="font-semibold"> human-like precision</span>.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <motion.button
              onClick={currentUser ? onDashboardClick : () => setShowLoginModal(true)}
              className="px-10 py-5 rounded-2xl font-bold text-lg flex items-center space-x-3 group relative overflow-hidden hover-shine"
              style={{ 
                background: colors.goldGradient, 
                color: colors.primary 
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: `0 12px 40px ${colors.goldPrimary}50`
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Rocket className="w-6 h-6 group-hover:animate-bounce-x" />
              <span>Access Dashboard</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              className="px-10 py-5 rounded-2xl font-bold text-lg flex items-center space-x-3 group border-2 transition-all duration-300"
              style={{ 
                borderColor: colors.goldPrimary,
                color: colors.goldPrimary 
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                backgroundColor: `${colors.goldPrimary}10`
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Watch Demo</span>
            </motion.button>
          </motion.div>

          {/* Enhanced Stats Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            {statsData.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-gold-lg"
                    style={{ background: colors.goldGradient }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent className="w-6 h-6 text-current" />
                  </motion.div>
                  <div 
                    className="text-4xl md:text-5xl font-black mb-2"
                    style={{ 
                      background: colors.goldGradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {stat.number}
                  </div>
                  <div className="font-medium" style={{ color: colors.textMuted }}>
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Detailed Performance Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            {detailedStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="glass-morphism rounded-2xl p-6 text-center group hover-shine"
                  style={{
                    background: colors.glassPrimary,
                    borderColor: colors.border
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6 + index * 0.1 }}
                  whileHover={{ 
                    y: -5,
                    borderColor: colors.borderActive
                  }}
                >
                  <IconComponent className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                  <div 
                    className="text-2xl font-bold mb-1"
                    style={{ color: colors.textPrimary }}
                  >
                    {stat.number}
                  </div>
                  <div 
                    className="text-sm mb-2"
                    style={{ color: colors.textMuted }}
                  >
                    {stat.label}
                  </div>
                  <div 
                    className="text-xs font-medium"
                    style={{ color: colors.success }}
                  >
                    {stat.growth}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Industry Performance Section */}
      <section className="py-32 px-6 relative" id="industries">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-8">
              <span 
                style={{ 
                  background: colors.goldGradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Industry Leaders
              </span>
              <br />
                              <span style={{ color: colors.textPrimary }}>Choose Horafly Intel Pro</span>
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto leading-relaxed"
              style={{ color: colors.textSecondary }}
            >
              See how top companies across industries are dominating their markets with our AI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industryStats.map((industry, index) => {
              const IconComponent = industry.icon;
              return (
                <motion.div
                  key={index}
                  className="glass-morphism rounded-3xl p-8 hover-shine"
                  style={{
                    background: colors.glassPrimary,
                    borderColor: colors.border
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -10,
                    borderColor: colors.borderActive
                  }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <IconComponent 
                      className="w-12 h-12" 
                      style={{ color: colors.goldPrimary }}
                    />
                    <div 
                      className="text-2xl font-bold"
                      style={{ color: colors.success }}
                    >
                      {industry.growth}
                    </div>
                  </div>
                  
                  <h3 
                    className="text-2xl font-bold mb-4"
                    style={{ color: colors.textPrimary }}
                  >
                    {industry.industry}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <span style={{ color: colors.textMuted }}>
                      Active Companies
                    </span>
                    <span 
                      className="font-bold"
                      style={{ color: colors.goldPrimary }}
                    >
                      {industry.companies}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Workflow Section */}
      <section className="py-32 px-6 relative" id="workflow">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-8">
              <span style={{ color: colors.textPrimary }}>How </span>
              <span 
                style={{ 
                  background: colors.goldGradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                AI Takes Over
              </span>
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto leading-relaxed"
              style={{ color: colors.textSecondary }}
            >
              Watch our AI system work its magic on your entire sales pipeline
            </p>
          </motion.div>

          <div className="space-y-12">
            {workflowSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={index}
                  className={`flex flex-col lg:flex-row items-center gap-12 ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Visual Element */}
                  <div className="lg:w-1/2">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div 
                        className="w-80 h-80 rounded-3xl glass-morphism flex items-center justify-center mx-auto hover-shine"
                        style={{
                          background: colors.glassPrimary,
                          borderColor: colors.border
                        }}
                      >
                        <motion.div
                          className="w-32 h-32 rounded-2xl flex items-center justify-center"
                          style={{ background: colors.goldGradient }}
                          animate={{ 
                            boxShadow: [
                              `0 0 30px ${colors.goldPrimary}50`,
                              `0 0 60px ${colors.goldPrimary}80`,
                              `0 0 30px ${colors.goldPrimary}50`
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <IconComponent 
                            className="w-16 h-16" 
                            style={{ color: colors.primary }}
                          />
                        </motion.div>
                      </div>
                      
                      {/* Step Number */}
                      <motion.div
                        className="absolute -top-6 -left-6 w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl"
                        style={{ 
                          background: colors.goldGradient,
                          color: colors.primary
                        }}
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
                        viewport={{ once: true }}
                      >
                        {step.step}
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-1/2">
                    <motion.div
                      className="glass-morphism rounded-3xl p-8"
                      style={{
                        background: colors.glassPrimary,
                        borderColor: colors.border
                      }}
                      whileHover={{ borderColor: colors.borderActive }}
                    >
                      <h3 
                        className="text-3xl font-bold mb-4"
                        style={{ color: colors.textPrimary }}
                      >
                        {step.title}
                      </h3>
                      <p 
                        className="text-lg mb-6 leading-relaxed"
                        style={{ color: colors.textSecondary }}
                      >
                        {step.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div 
                          className="rounded-xl p-4"
                          style={{ background: colors.glassSecondary }}
                        >
                          <div 
                            className="text-sm font-medium mb-1"
                            style={{ color: colors.textMuted }}
                          >
                            Processing Time
                          </div>
                          <div 
                            className="text-xl font-bold"
                            style={{ color: colors.goldPrimary }}
                          >
                            {step.duration}
                          </div>
                        </div>
                        <div 
                          className="rounded-xl p-4"
                          style={{ background: colors.glassSecondary }}
                        >
                          <div 
                            className="text-sm font-medium mb-1"
                            style={{ color: colors.textMuted }}
                          >
                            Automation Level
                          </div>
                          <div 
                            className="text-xl font-bold"
                            style={{ color: colors.success }}
                          >
                            {step.automation}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-32 px-6 relative" id="features">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="inline-flex items-center space-x-2 rounded-full px-6 py-3 mb-8 glass-morphism"
              style={{ borderColor: colors.border }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Diamond className="w-5 h-5" style={{ color: colors.goldPrimary }} />
              <span style={{ color: colors.goldPrimary }} className="font-medium">
                Premium Features
              </span>
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-black mb-8">
              <span 
                style={{ 
                  background: colors.goldGradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Elite Sales Arsenal
              </span>
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto leading-relaxed"
              style={{ color: colors.textSecondary }}
            >
              Military-grade AI tools designed to dominate every aspect of your sales process
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="relative rounded-3xl p-8 transition-all duration-500 group overflow-hidden card-premium"
                style={{
                  background: colors.glassPrimary,
                  borderColor: colors.border
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: feature.delay }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  borderColor: colors.borderActive
                }}
              >
                <motion.div 
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:shadow-gold-lg`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>
                
                <h3 
                  className="text-2xl font-bold mb-4 transition-colors"
                  style={{ color: colors.textPrimary }}
                >
                  {feature.title}
                </h3>
                <p 
                  className="leading-relaxed mb-6 transition-colors"
                  style={{ color: colors.textSecondary }}
                >
                  {feature.description}
                </p>

                {/* Feature Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div 
                    className="rounded-lg p-3 text-center"
                    style={{ background: colors.glassSecondary }}
                  >
                    <div 
                      className="text-lg font-bold"
                      style={{ color: colors.goldPrimary }}
                    >
                      {feature.metrics}
                    </div>
                    <div 
                      className="text-xs"
                      style={{ color: colors.textMuted }}
                    >
                      Performance
                    </div>
                  </div>
                  <div 
                    className="rounded-lg p-3 text-center"
                    style={{ background: colors.glassSecondary }}
                  >
                    <div 
                      className="text-lg font-bold"
                      style={{ color: colors.success }}
                    >
                      {feature.accuracy}
                    </div>
                    <div 
                      className="text-xs"
                      style={{ color: colors.textMuted }}
                    >
                      Accuracy
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials with more details */}
      <section className="py-32 px-6" id="testimonials">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-8">
              What <span 
                className="px-4 py-2 rounded-xl font-black"
                style={{ 
                  background: colors.goldGradient,
                  color: colors.textPrimary
                }}
              >
                Elite Sales
              </span> Teams Say
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto leading-relaxed"
              style={{ color: colors.textSecondary }}
            >
              Real results from real companies who've transformed their sales with AI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="glass-morphism rounded-3xl p-8 hover-shine"
                style={{
                  background: colors.glassPrimary,
                  borderColor: colors.border
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  borderColor: colors.borderActive
                }}
              >
                <div className="flex space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Star className="w-5 h-5 text-gold-400 fill-current" />
                    </motion.div>
                  ))}
                </div>
                
                <p 
                  className="mb-8 leading-relaxed text-lg"
                  style={{ color: colors.textSecondary }}
                >
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                      style={{ background: colors.goldGradient }}
                    >
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div 
                        className="font-bold"
                        style={{ color: colors.textPrimary }}
                      >
                        {testimonial.name}
                      </div>
                      <div style={{ color: colors.textMuted }}>
                        {testimonial.role}
                      </div>
                      <div 
                        className="text-sm font-medium"
                        style={{ color: colors.goldPrimary }}
                      >
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                  <div 
                    className="text-2xl font-bold"
                    style={{ color: colors.success }}
                  >
                    {testimonial.revenue}
                  </div>
                </div>

                {/* Additional metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    className="rounded-lg p-3 text-center"
                    style={{ background: colors.glassSecondary }}
                  >
                    <div 
                      className="text-sm font-medium mb-1"
                      style={{ color: colors.textMuted }}
                    >
                      Timeframe
                    </div>
                    <div 
                      className="font-bold"
                      style={{ color: colors.goldPrimary }}
                    >
                      {testimonial.timeline}
                    </div>
                  </div>
                  <div 
                    className="rounded-lg p-3 text-center"
                    style={{ background: colors.glassSecondary }}
                  >
                    <div 
                      className="text-sm font-medium mb-1"
                      style={{ color: colors.textMuted }}
                    >
                      Previous Tools
                    </div>
                    <div 
                      className="text-xs font-medium"
                      style={{ color: colors.textSecondary }}
                    >
                      {testimonial.previousTools}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Pricing Section with more details */}
      <section className="py-32 px-6 relative" id="pricing">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="inline-flex items-center space-x-2 rounded-full px-6 py-3 mb-8 glass-morphism"
              style={{ borderColor: colors.border }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Award className="w-5 h-5" style={{ color: colors.goldPrimary }} />
              <span style={{ color: colors.goldPrimary }} className="font-medium">
                Simple Pricing
              </span>
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-black mb-8">
              <span 
                style={{ 
                  background: colors.goldGradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Choose Your Plan
              </span>
            </h2>
            
            {/* Pricing Toggle */}
            <motion.div 
              className="flex items-center justify-center space-x-4 mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <span 
                className={`font-medium transition-colors ${!isYearly ? 'text-gold-400' : 'text-gray-400'}`}
                style={{ color: !isYearly ? colors.goldPrimary : colors.textMuted }}
              >
                Monthly
              </span>
              <motion.button
                onClick={() => setIsYearly(!isYearly)}
                className="relative w-16 h-8 rounded-full transition-colors duration-300"
                style={{ 
                  background: isYearly ? colors.goldPrimary : colors.textMuted 
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                  animate={{ x: isYearly ? 32 : 4 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.button>
              <span 
                className={`font-medium transition-colors ${isYearly ? 'text-gold-400' : 'text-gray-400'}`}
                style={{ color: isYearly ? colors.goldPrimary : colors.textMuted }}
              >
                Yearly <span style={{ color: colors.goldPrimary }} className="text-sm">(Save 17%)</span>
              </span>
            </motion.div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                className={`relative rounded-3xl p-8 transition-all duration-500 group overflow-hidden ${
                  plan.popular 
                    ? 'shadow-gold-lg' 
                    : ''
                }`}
                style={{
                  background: colors.glassPrimary,
                  borderColor: plan.popular ? colors.goldPrimary : colors.border,
                  borderWidth: plan.popular ? '2px' : '1px',
                  borderStyle: 'solid'
                }}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                {plan.popular && (
                  <motion.div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div 
                      className="px-6 py-2 rounded-full font-bold text-sm flex items-center space-x-2"
                      style={{ 
                        background: colors.goldGradient,
                        color: colors.primary
                      }}
                    >
                      <Crown className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </motion.div>
                )}

                <div className="text-center mb-8">
                  <h3 
                    className="text-2xl font-bold mb-2"
                    style={{ color: colors.textPrimary }}
                  >
                    {plan.name}
                  </h3>
                  <p 
                    className="mb-6"
                    style={{ color: colors.textMuted }}
                  >
                    {plan.description}
                  </p>
                  
                  <div className="mb-4">
                    <span 
                      className="text-5xl font-black"
                      style={{ 
                        background: colors.goldGradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      {typeof plan.price.monthly === 'number' 
                        ? `$${isYearly ? plan.price.yearly : plan.price.monthly}`
                        : plan.price.monthly
                      }
                    </span>
                    {typeof plan.price.monthly === 'number' && (
                      <span style={{ color: colors.textMuted }} className="ml-2">
                        /{isYearly ? 'year' : 'month'}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2 mb-6">
                    <InfinityIcon className="w-5 h-5" style={{ color: colors.goldPrimary }} />
                    <span style={{ color: colors.goldPrimary }} className="font-medium">
                      {plan.credits} Credits
                    </span>
                  </div>
                  
                  {plan.trial && (
                    <div 
                      className="rounded-xl px-4 py-2 mb-6"
                      style={{ 
                        background: `${colors.goldPrimary}10`,
                        borderColor: `${colors.goldPrimary}20`,
                        borderWidth: '1px',
                        borderStyle: 'solid'
                      }}
                    >
                      <span style={{ color: colors.goldPrimary }} className="font-medium">
                        {plan.trial}
                      </span>
                    </div>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + featureIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: colors.goldGradient }}
                      >
                        <Check className="w-4 h-4" style={{ color: colors.primary }} />
                      </div>
                      <span style={{ color: colors.textSecondary }}>
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {plan.limitations && (
                  <div className="mb-8">
                    <h4 
                      className="text-sm font-medium mb-3"
                      style={{ color: colors.textMuted }}
                    >
                      Limitations:
                    </h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, limitIndex) => (
                        <li 
                          key={limitIndex}
                          className="flex items-center space-x-3 text-sm"
                        >
                          <div 
                            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: colors.textMuted }}
                          >
                            <span className="text-xs">-</span>
                          </div>
                          <span style={{ color: colors.textMuted }}>
                            {limitation}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <motion.button
                  onClick={() => setShowLoginModal(true)}
                  className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-300"
                  style={{
                    background: plan.popular ? colors.goldGradient : 'transparent',
                    color: plan.popular ? colors.primary : colors.goldPrimary,
                    borderColor: colors.goldPrimary,
                    borderWidth: plan.popular ? '0' : '2px',
                    borderStyle: 'solid'
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: plan.popular 
                      ? `0 8px 25px ${colors.goldPrimary}40`
                      : `0 4px 15px ${colors.goldPrimary}20`
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.cta}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{ background: colors.goldGradient }}
          animate={{
            background: [
              colors.goldGradient,
              `linear-gradient(45deg, ${colors.goldSecondary}, ${colors.goldMuted})`,
              colors.goldGradient,
            ]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-5xl md:text-6xl font-black mb-8"
              style={{ color: colors.textPrimary }}
            >
              Ready to Dominate Sales?
            </h2>
            <p 
              className="text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
              style={{ color: colors.textSecondary }}
            >
              Join thousands of elite sales professionals who've already revolutionized 
              their process with military-grade AI
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                onClick={() => setShowLoginModal(true)}
                className="px-12 py-6 rounded-2xl font-bold text-xl flex items-center space-x-3 group hover-shine"
                style={{ 
                  background: colors.goldGradient,
                  color: colors.primary
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: `0 12px 40px ${colors.goldPrimary}50`
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Rocket className="w-6 h-6 group-hover:animate-bounce-x" />
                <span>Start Free Trial</span>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </motion.button>

              <motion.button
                className="px-12 py-6 rounded-2xl font-bold text-xl flex items-center space-x-3 border-2 transition-all duration-300"
                style={{ 
                  borderColor: colors.goldPrimary,
                  color: colors.goldPrimary 
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  backgroundColor: `${colors.goldPrimary}10`
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-6 h-6" />
                <span>Book Demo Call</span>
              </motion.button>
            </div>

            {/* Trust indicators */}
            <motion.div
              className="mt-12 flex flex-wrap items-center justify-center gap-8 opacity-60"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.6 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" style={{ color: colors.goldPrimary }} />
                <span style={{ color: colors.textMuted }}>Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" style={{ color: colors.goldPrimary }} />
                <span style={{ color: colors.textMuted }}>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5" style={{ color: colors.goldPrimary }} />
                <span style={{ color: colors.textMuted }}>99.9% Uptime</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
};

export default LandingPage; 