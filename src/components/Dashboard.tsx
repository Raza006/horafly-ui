import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Brain, 
  Bot, 
  FileText, 
  Headphones, 
  Mic, 
  BarChart3,
  Users,
  Settings,
  LogOut,
  Bell,
  Crown,
  TrendingUp,
  Calendar,
  Filter,
  Menu,
  DollarSign,
  Target,
  Phone,
  Download,
  Upload,
  Play,
  Pause,
  Square,
  Send,
  Copy,
  Edit3,
  Plus,
  RefreshCw,
  MessageCircle,
  Globe,
  Building,
  Mail,
  LinkIcon,
  Save,
  Eye,
  Mic2,
  StopCircle,
  Volume2,
  Star,
  MapPin,
  ChevronDown,
  Sparkles,
  Zap,
  Clock,
  CheckCircle,
  ArrowRight,
  PlusCircle,
  Lightbulb,
  Target as TargetIcon,
  TrendingUp as TrendingUpIcon
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useTheme } from '../contexts/ThemeContext';
import ShardBackground from './ShardBackground';
import horaflyLogo from '../images/horaflylogo.png';
import LeadScraping from './dashboard/LeadScraping';

interface User {
  id: string;
  email: string;
  displayName: string;
  plan: string;
  credits: number;
  subscriptionStatus: string;
  onboardingCompleted: boolean;
}

interface DashboardProps {
  onLogout: () => void;
  onSettings?: () => void;
  currentUser: User | null;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, onSettings, currentUser }) => {
  // Initialize all hooks first
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [timeFilter, setTimeFilter] = useState('1 month');
  const [isRecording, setIsRecording] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your AI assistant. How can I help you with your sales process today?' },
    { role: 'user', content: 'I need help writing a cold email for a SaaS prospect' },
    { role: 'assistant', content: 'I\'d be happy to help you craft a compelling cold email! Let me create a personalized template based on your prospect\'s industry and pain points. Here\'s a high-converting structure:\n\nSubject: Quick question about [Company]\'s sales automation\n\nHi [Name],\n\nI noticed [Company] has been growing rapidly in the SaaS space. Many companies your size struggle with manual lead qualification - is this something your team faces?\n\nWe\'ve helped similar companies like [Competitor] increase their qualified leads by 80% while reducing manual work.\n\nWorth a quick 15-minute chat?\n\nBest,\n[Your name]' },
    { role: 'user', content: 'That\'s great! Can you also help me research this prospect?' },
    { role: 'assistant', content: 'Absolutely! I can help you research prospects comprehensively. Here\'s what I can gather:\n\n• Company background & recent news\n• Key decision makers & their roles\n• Technology stack they\'re using\n• Recent funding or growth milestones\n• Pain points based on industry trends\n• Social media activity & interests\n\nJust provide me with the company name and I\'ll compile a detailed research report for you!' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const { colors } = useTheme();

  // Redirect if no user (shouldn't happen due to routing, but safety check)
  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3, color: 'from-gold-400 to-gold-600' },
    { id: 'lead-scraping', label: 'Lead Scraping', icon: Search, color: 'from-blue-400 to-blue-600' },
    { id: 'lead-research', label: 'Lead Research', icon: Brain, color: 'from-purple-400 to-purple-600' },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot, color: 'from-green-400 to-green-600' },
    { id: 'outreach-scripts', label: 'Outreach Scripts', icon: FileText, color: 'from-orange-400 to-orange-600' },
    { id: 'call-recording', label: 'Call Recording', icon: Headphones, color: 'from-red-400 to-red-600' },
    { id: 'transcription', label: 'AI Transcription', icon: Mic, color: 'from-indigo-400 to-indigo-600' },
  ];

  const timeFilters = ['Today', '7 days', '1 month', '3 months', '1 year'];

  const getStatsForTimeFilter = (filter: string) => {
    const statsData = {
      'Today': [
        { label: 'Total Leads', value: '12', change: '+8.3%', icon: Users, color: 'text-blue-400' },
        { label: 'Conversion Rate', value: '18.5%', change: '+2.1%', icon: Target, color: 'text-green-400' },
        { label: 'Revenue Generated', value: '$2,450', change: '+15.2%', icon: DollarSign, color: 'text-gold-400' },
        { label: 'Calls Recorded', value: '8', change: '+12.5%', icon: Phone, color: 'text-purple-400' },
      ],
      '7 days': [
        { label: 'Total Leads', value: '89', change: '+12.8%', icon: Users, color: 'text-blue-400' },
        { label: 'Conversion Rate', value: '22.1%', change: '+4.3%', icon: Target, color: 'text-green-400' },
        { label: 'Revenue Generated', value: '$18,750', change: '+18.9%', icon: DollarSign, color: 'text-gold-400' },
        { label: 'Calls Recorded', value: '67', change: '+9.7%', icon: Phone, color: 'text-purple-400' },
      ],
      '1 month': [
        { label: 'Total Leads', value: '347', change: '+15.2%', icon: Users, color: 'text-blue-400' },
        { label: 'Conversion Rate', value: '24.8%', change: '+5.2%', icon: Target, color: 'text-green-400' },
        { label: 'Revenue Generated', value: '$78,450', change: '+22.1%', icon: DollarSign, color: 'text-gold-400' },
        { label: 'Calls Recorded', value: '289', change: '+11.3%', icon: Phone, color: 'text-purple-400' },
      ],
      '3 months': [
        { label: 'Total Leads', value: '1,024', change: '+18.7%', icon: Users, color: 'text-blue-400' },
        { label: 'Conversion Rate', value: '26.3%', change: '+7.8%', icon: Target, color: 'text-green-400' },
        { label: 'Revenue Generated', value: '$234,890', change: '+25.4%', icon: DollarSign, color: 'text-gold-400' },
        { label: 'Calls Recorded', value: '847', change: '+14.6%', icon: Phone, color: 'text-purple-400' },
      ],
      '1 year': [
        { label: 'Total Leads', value: '4,156', change: '+32.1%', icon: Users, color: 'text-blue-400' },
        { label: 'Conversion Rate', value: '28.9%', change: '+12.3%', icon: Target, color: 'text-green-400' },
        { label: 'Revenue Generated', value: '$987,650', change: '+41.7%', icon: DollarSign, color: 'text-gold-400' },
        { label: 'Calls Recorded', value: '3,421', change: '+28.9%', icon: Phone, color: 'text-purple-400' },
      ],
    };
    return statsData[filter as keyof typeof statsData] || statsData['1 month'];
  };

  const stats = getStatsForTimeFilter(timeFilter);

  const getChartDataForTimeFilter = (filter: string) => {
    const chartData = {
      'Today': [
        { name: '9 AM', leads: 2, revenue: 450, calls: 1 },
        { name: '11 AM', leads: 3, revenue: 680, calls: 2 },
        { name: '1 PM', leads: 4, revenue: 920, calls: 3 },
        { name: '3 PM', leads: 2, revenue: 340, calls: 1 },
        { name: '5 PM', leads: 1, revenue: 60, calls: 1 },
      ],
      '7 days': [
        { name: 'Mon', leads: 12, revenue: 2450, calls: 8 },
        { name: 'Tue', leads: 15, revenue: 3200, calls: 11 },
        { name: 'Wed', leads: 18, revenue: 4100, calls: 14 },
        { name: 'Thu', leads: 13, revenue: 2800, calls: 9 },
        { name: 'Fri', leads: 21, revenue: 4900, calls: 16 },
        { name: 'Sat', leads: 6, revenue: 980, calls: 4 },
        { name: 'Sun', leads: 4, revenue: 320, calls: 5 },
      ],
      '1 month': [
        { name: 'Week 1', leads: 89, revenue: 18750, calls: 67 },
        { name: 'Week 2', leads: 94, revenue: 21200, calls: 72 },
        { name: 'Week 3', leads: 87, revenue: 19800, calls: 69 },
        { name: 'Week 4', leads: 77, revenue: 18700, calls: 81 },
      ],
      '3 months': [
        { name: 'Month 1', leads: 347, revenue: 78450, calls: 289 },
        { name: 'Month 2', leads: 389, revenue: 89200, calls: 312 },
        { name: 'Month 3', leads: 288, revenue: 67240, calls: 246 },
      ],
      '1 year': [
        { name: 'Q1', leads: 1024, revenue: 234890, calls: 847 },
        { name: 'Q2', leads: 1156, revenue: 267450, calls: 923 },
        { name: 'Q3', leads: 1089, revenue: 251200, calls: 876 },
        { name: 'Q4', leads: 887, revenue: 234110, calls: 775 },
      ],
    };
    return chartData[filter as keyof typeof chartData] || chartData['1 month'];
  };

  const chartData = getChartDataForTimeFilter(timeFilter);

  const recentActivities = [
    { type: 'lead', message: 'New lead scraped: John Smith from TechCorp', time: '2 minutes ago', icon: Search },
    { type: 'call', message: 'Call with Sarah Johnson completed & transcribed', time: '15 minutes ago', icon: Phone },
    { type: 'script', message: 'Outreach script generated for Healthcare vertical', time: '1 hour ago', icon: FileText },
    { type: 'research', message: 'Deep research completed for 15 prospects', time: '2 hours ago', icon: Brain },
  ];

  // Lead Scraping Component
  const LeadScrapingTool = () => {
    const [scrapingTarget, setScrapingTarget] = useState('linkedin');
    const [industry, setIndustry] = useState('Technology');
    const [location, setLocation] = useState('United States');
    const [isScrapingActive, setIsScrapingActive] = useState(false);

    const scrapingTabs = ['Setup', 'Results', 'History'];
    const [activeScrapingTab, setActiveScrapingTab] = useState('Results');

    const mockLeads = [
      { 
        name: 'John Smith', 
        company: 'TechCorp Inc.', 
        title: 'VP of Sales', 
        email: 'john.smith@techcorp.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        industry: 'SaaS',
        employees: '500-1000',
        revenue: '$50M-100M',
        score: 95,
        status: 'Hot Lead'
      },
      { 
        name: 'Sarah Johnson', 
        company: 'InnovateLabs', 
        title: 'Marketing Director', 
        email: 'sarah.j@innovatelabs.com',
        phone: '+1 (555) 987-6543',
        location: 'Austin, TX',
        industry: 'AI/ML',
        employees: '100-500',
        revenue: '$10M-50M',
        score: 88,
        status: 'Warm Lead'
      },
      { 
        name: 'Mike Brown', 
        company: 'StartupXYZ', 
        title: 'CEO & Founder', 
        email: 'mike@startupxyz.com',
        phone: '+1 (555) 456-7890',
        location: 'New York, NY',
        industry: 'FinTech',
        employees: '50-100',
        revenue: '$1M-10M',
        score: 92,
        status: 'Hot Lead'
      },
      { 
        name: 'Emily Chen', 
        company: 'DataDriven Solutions', 
        title: 'Head of Business Development', 
        email: 'emily.chen@datadriven.com',
        phone: '+1 (555) 234-5678',
        location: 'Seattle, WA',
        industry: 'Analytics',
        employees: '200-500',
        revenue: '$25M-50M',
        score: 85,
        status: 'Warm Lead'
      },
      { 
        name: 'David Rodriguez', 
        company: 'CloudScale Systems', 
        title: 'VP of Operations', 
        email: 'd.rodriguez@cloudscale.com',
        phone: '+1 (555) 345-6789',
        location: 'Denver, CO',
        industry: 'Cloud Infrastructure',
        employees: '1000+',
        revenue: '$100M+',
        score: 90,
        status: 'Hot Lead'
      }
    ];

    const scrapingHistory = [
      {
        id: 1,
        date: '2024-01-15',
        platform: 'LinkedIn',
        industry: 'Technology',
        location: 'United States',
        leadsFound: 247,
        status: 'Completed',
        duration: '2h 15m'
      },
      {
        id: 2,
        date: '2024-01-14',
        platform: 'Apollo.io',
        industry: 'Healthcare',
        location: 'California',
        leadsFound: 189,
        status: 'Completed',
        duration: '1h 45m'
      },
      {
        id: 3,
        date: '2024-01-13',
        platform: 'ZoomInfo',
        industry: 'Finance',
        location: 'New York',
        leadsFound: 156,
        status: 'Completed',
        duration: '1h 30m'
      }
    ];

    return (
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-opacity-20 rounded-xl p-1" style={{ background: colors.glassSecondary }}>
          {scrapingTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveScrapingTab(tab)}
              className={`flex-1 py-3 px-6 rounded-lg transition-all duration-300 font-medium ${
                activeScrapingTab === tab ? 'shadow-lg' : ''
              }`}
              style={{
                background: activeScrapingTab === tab ? colors.goldGradient : 'transparent',
                color: activeScrapingTab === tab ? colors.primary : colors.textSecondary
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeScrapingTab === 'Setup' && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Search Configuration */}
                <div className="glass-morphism rounded-2xl p-6" style={{ background: colors.glassPrimary }}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: colors.textPrimary }}>
                    <Search className="w-5 h-5 mr-2" style={{ color: colors.goldPrimary }} />
                    Search Configuration
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                        Target Platform
                      </label>
                      <select 
                        value={scrapingTarget}
                        onChange={(e) => setScrapingTarget(e.target.value)}
                        className="w-full p-3 rounded-lg border transition-colors"
                        style={{ 
                          background: colors.glassSecondary, 
                          borderColor: colors.border,
                          color: colors.textPrimary 
                        }}
                      >
                        <option value="">Select Platform</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="apollo">Apollo.io</option>
                        <option value="zoominfo">ZoomInfo</option>
                        <option value="salesnavigator">Sales Navigator</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                        Industry
                      </label>
                      <input
                        type="text"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        placeholder="e.g., Technology, Healthcare, Finance"
                        className="w-full p-3 rounded-lg border transition-colors"
                        style={{ 
                          background: colors.glassSecondary, 
                          borderColor: colors.border,
                          color: colors.textPrimary 
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                        Location
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g., United States, New York, Remote"
                        className="w-full p-3 rounded-lg border transition-colors"
                        style={{ 
                          background: colors.glassSecondary, 
                          borderColor: colors.border,
                          color: colors.textPrimary 
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="glass-morphism rounded-2xl p-6" style={{ background: colors.glassPrimary }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsScrapingActive(!isScrapingActive)}
                      className="w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center"
                      style={{
                        background: isScrapingActive ? colors.error : colors.goldGradient,
                        color: colors.primary
                      }}
                    >
                      {isScrapingActive ? (
                        <>
                          <Square className="w-4 h-4 mr-2" />
                          Stop Scraping
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Start Scraping
                        </>
                      )}
                    </motion.button>
                    <button 
                      className="w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center"
                      style={{ 
                        background: `${colors.goldPrimary}20`,
                        color: colors.goldPrimary,
                        border: `1px solid ${colors.goldPrimary}30`
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Results
                    </button>
                  </div>
                  
                  {isScrapingActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 p-4 rounded-lg"
                      style={{ background: colors.glassSecondary }}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: colors.success }}></div>
                        <span className="text-sm font-medium" style={{ color: colors.success }}>
                          Scraping in progress...
                        </span>
                      </div>
                      <div className="text-xs" style={{ color: colors.textMuted }}>
                        Found 47 leads • Processed 23 profiles
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeScrapingTab === 'Results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Results Summary */}
              <div className="grid md:grid-cols-4 gap-4">
                <div className="glass-morphism rounded-xl p-4" style={{ background: colors.glassPrimary }}>
                  <div className="text-2xl font-bold" style={{ color: colors.goldPrimary }}>
                    {timeFilter === 'Today' ? '12' : 
                     timeFilter === '7 days' ? '89' : 
                     timeFilter === '1 month' ? '347' : 
                     timeFilter === '3 months' ? '1,024' : '4,156'}
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>Total Leads</div>
                </div>
                <div className="glass-morphism rounded-xl p-4" style={{ background: colors.glassPrimary }}>
                  <div className="text-2xl font-bold" style={{ color: colors.success }}>
                    {timeFilter === 'Today' ? '85%' : 
                     timeFilter === '7 days' ? '87%' : 
                     timeFilter === '1 month' ? '89%' : 
                     timeFilter === '3 months' ? '91%' : '93%'}
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>Quality Score</div>
                </div>
                <div className="glass-morphism rounded-xl p-4" style={{ background: colors.glassPrimary }}>
                  <div className="text-2xl font-bold" style={{ color: colors.textPrimary }}>
                    {timeFilter === 'Today' ? '8' : 
                     timeFilter === '7 days' ? '56' : 
                     timeFilter === '1 month' ? '234' : 
                     timeFilter === '3 months' ? '687' : '2,789'}
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>Hot Leads</div>
                </div>
                <div className="glass-morphism rounded-xl p-4" style={{ background: colors.glassPrimary }}>
                  <div className="text-2xl font-bold" style={{ color: colors.textPrimary }}>
                    {timeFilter === 'Today' ? '45m' : 
                     timeFilter === '7 days' ? '4h 30m' : 
                     timeFilter === '1 month' ? '18h 15m' : 
                     timeFilter === '3 months' ? '67h 45m' : '289h 30m'}
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>Time Saved</div>
                </div>
              </div>



              {/* Leads List */}
              <div className="glass-morphism rounded-2xl p-6" style={{ background: colors.glassPrimary }}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
                    Scraped Leads
                  </h3>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 rounded-lg font-medium transition-all flex items-center"
                      style={{ 
                        background: colors.goldGradient,
                        color: colors.primary
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export CSV
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 rounded-lg font-medium transition-all flex items-center border"
                      style={{ 
                        background: 'transparent',
                        color: colors.textSecondary,
                        borderColor: colors.border
                      }}
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </motion.button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {mockLeads.map((lead, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 rounded-xl border transition-all hover:shadow-lg"
                      style={{ 
                        background: colors.glassSecondary,
                        borderColor: colors.border 
                      }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
                              {lead.name}
                            </h4>
                            <span 
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                lead.status === 'Hot Lead' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {lead.status}
                            </span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4" style={{ color: colors.goldPrimary }} />
                              <span className="text-sm font-medium" style={{ color: colors.goldPrimary }}>
                                {lead.score}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>
                            {lead.title}
                          </p>
                          <p className="text-sm font-medium mb-3" style={{ color: colors.goldPrimary }}>
                            {lead.company}
                          </p>
                          
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4" style={{ color: colors.textMuted }} />
                                <span style={{ color: colors.textPrimary }}>{lead.email}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4" style={{ color: colors.textMuted }} />
                                <span style={{ color: colors.textPrimary }}>{lead.phone}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4" style={{ color: colors.textMuted }} />
                                <span style={{ color: colors.textPrimary }}>{lead.location}</span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <Building className="w-4 h-4" style={{ color: colors.textMuted }} />
                                <span style={{ color: colors.textPrimary }}>{lead.industry}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Users className="w-4 h-4" style={{ color: colors.textMuted }} />
                                <span style={{ color: colors.textPrimary }}>{lead.employees} employees</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <DollarSign className="w-4 h-4" style={{ color: colors.textMuted }} />
                                <span style={{ color: colors.textPrimary }}>{lead.revenue} revenue</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-2 ml-4">
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-3 rounded-lg transition-all"
                            style={{ background: colors.goldGradient, color: colors.primary }}
                          >
                            <Mail className="w-5 h-5" />
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-3 rounded-lg transition-all border"
                            style={{ 
                              background: 'transparent',
                              borderColor: colors.border,
                              color: colors.textSecondary
                            }}
                          >
                            <LinkIcon className="w-5 h-5" />
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-3 rounded-lg transition-all border"
                            style={{ 
                              background: 'transparent',
                              borderColor: colors.border,
                              color: colors.textSecondary
                            }}
                          >
                            <Plus className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeScrapingTab === 'History' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-morphism rounded-2xl p-6"
              style={{ background: colors.glassPrimary }}
            >
              <h3 className="text-lg font-semibold mb-6" style={{ color: colors.textPrimary }}>
                Scraping History
              </h3>
              
              <div className="space-y-4">
                {scrapingHistory.map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-xl border transition-all hover:shadow-lg"
                    style={{ 
                      background: colors.glassSecondary,
                      borderColor: colors.border 
                    }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
                            {session.platform} Scraping
                          </h4>
                          <span 
                            className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                          >
                            {session.status}
                          </span>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" style={{ color: colors.textMuted }} />
                              <span style={{ color: colors.textPrimary }}>{session.date}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Building className="w-4 h-4" style={{ color: colors.textMuted }} />
                              <span style={{ color: colors.textPrimary }}>{session.industry}</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4" style={{ color: colors.textMuted }} />
                              <span style={{ color: colors.textPrimary }}>{session.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4" style={{ color: colors.textMuted }} />
                              <span style={{ color: colors.textPrimary }}>{session.leadsFound} leads found</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" style={{ color: colors.textMuted }} />
                              <span style={{ color: colors.textPrimary }}>{session.duration}</span>
                            </div>
                            <div className="text-lg font-bold" style={{ color: colors.goldPrimary }}>
                              {session.leadsFound} leads
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 rounded-lg transition-all"
                          style={{ background: colors.goldGradient, color: colors.primary }}
                        >
                          <Download className="w-5 h-5" />
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 rounded-lg transition-all border"
                          style={{ 
                            background: 'transparent',
                            borderColor: colors.border,
                            color: colors.textSecondary
                          }}
                        >
                          <Eye className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // AI Assistant Component
  const AIAssistantTool = () => {
    const [isTyping, setIsTyping] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState('');

    const handleSendMessage = () => {
      if (!newMessage.trim()) return;
      
      const userMessage = { role: 'user', content: newMessage };
      setChatMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      setIsTyping(true);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = { 
          role: 'assistant', 
          content: 'I understand you need help with that. Let me analyze your request and provide you with a comprehensive solution...' 
        };
        setChatMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1500);
    };

    const quickActions = [
      { 
        label: 'Generate Cold Email', 
        icon: Mail, 
        color: 'from-blue-400 to-blue-600',
        description: 'Create personalized outreach emails'
      },
      { 
        label: 'Research Prospect', 
        icon: Search, 
        color: 'from-purple-400 to-purple-600',
        description: 'Deep dive into prospect background'
      },
      { 
        label: 'Create Follow-up', 
        icon: RefreshCw, 
        color: 'from-green-400 to-green-600',
        description: 'Generate follow-up sequences'
      },
      { 
        label: 'Analyze Call', 
        icon: BarChart3, 
        color: 'from-orange-400 to-orange-600',
        description: 'Extract insights from recordings'
      },
      { 
        label: 'Write LinkedIn Message', 
        icon: MessageCircle, 
        color: 'from-indigo-400 to-indigo-600',
        description: 'Craft engaging LinkedIn outreach'
      },
      { 
        label: 'Create Proposal', 
        icon: FileText, 
        color: 'from-red-400 to-red-600',
        description: 'Generate custom proposals'
      }
    ];

    const templates = [
      { id: 'cold-email', name: 'Cold Email Template', icon: Mail },
      { id: 'follow-up', name: 'Follow-up Sequence', icon: Clock },
      { id: 'linkedin', name: 'LinkedIn Outreach', icon: MessageCircle },
      { id: 'proposal', name: 'Proposal Generator', icon: FileText }
    ];

    return (
      <div className="space-y-6">
        {/* Header Section */}
        <div className="glass-morphism rounded-2xl p-6" style={{ background: colors.glassPrimary }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold" style={{ color: colors.textPrimary }}>
                  AI Sales Assistant
                </h2>
                <p style={{ color: colors.textSecondary }}>
                  Your intelligent sales companion powered by advanced AI
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                Online & Ready
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-lg" style={{ background: colors.glassSecondary }}>
              <div className="text-2xl font-bold" style={{ color: colors.goldPrimary }}>247</div>
              <div className="text-sm" style={{ color: colors.textMuted }}>Tasks Completed</div>
            </div>
            <div className="text-center p-3 rounded-lg" style={{ background: colors.glassSecondary }}>
              <div className="text-2xl font-bold" style={{ color: colors.goldPrimary }}>98%</div>
              <div className="text-sm" style={{ color: colors.textMuted }}>Accuracy Rate</div>
            </div>
            <div className="text-center p-3 rounded-lg" style={{ background: colors.glassSecondary }}>
              <div className="text-2xl font-bold" style={{ color: colors.goldPrimary }}>2.3s</div>
              <div className="text-sm" style={{ color: colors.textMuted }}>Avg Response</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Template Selector */}
            <div className="glass-morphism rounded-2xl p-6" style={{ background: colors.glassPrimary }}>
              <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: colors.textPrimary }}>
                <Lightbulb className="w-5 h-5 mr-2" style={{ color: colors.goldPrimary }} />
                Quick Templates
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {templates.map((template) => (
                  <motion.button
                    key={template.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-4 rounded-xl border transition-all flex items-center space-x-3 ${
                      selectedTemplate === template.id ? 'shadow-lg' : ''
                    }`}
                    style={{
                      background: selectedTemplate === template.id 
                        ? `${colors.goldPrimary}20` 
                        : colors.glassSecondary,
                      borderColor: selectedTemplate === template.id 
                        ? colors.goldPrimary 
                        : colors.border,
                      color: colors.textPrimary
                    }}
                  >
                    <template.icon className="w-5 h-5" style={{ color: colors.goldPrimary }} />
                    <span className="font-medium">{template.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Chat Interface */}
            <div className="glass-morphism rounded-2xl p-6" style={{ background: colors.glassPrimary }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center" style={{ color: colors.textPrimary }}>
                  <Bot className="w-5 h-5 mr-2" style={{ color: colors.goldPrimary }} />
                  AI Chat
                </h3>
                <button 
                  className="text-sm px-3 py-1 rounded-lg transition-colors"
                  style={{ 
                    background: colors.glassSecondary,
                    color: colors.textSecondary 
                  }}
                >
                  Clear Chat
                </button>
              </div>
              
              <div className="h-80 overflow-y-auto mb-4 space-y-4 p-4 rounded-xl" style={{ 
                background: colors.glassSecondary
              }}>
                {chatMessages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-[80%] ${
                      message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === 'user' 
                          ? 'bg-gradient-to-br from-blue-400 to-blue-600' 
                          : 'bg-gradient-to-br from-purple-400 to-purple-600'
                      }`}>
                        {message.role === 'user' ? (
                          <Users className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          message.role === 'user' 
                            ? 'rounded-br-md' 
                            : 'rounded-bl-md'
                        }`}
                        style={{
                          background: message.role === 'user' 
                            ? `linear-gradient(135deg, ${colors.goldPrimary}20, ${colors.goldSecondary}30)`
                            : colors.glassPrimary,
                          color: colors.textPrimary,
                          border: `1px solid ${colors.border}`
                        }}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-3 max-w-[80%]">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div
                        className="px-4 py-3 rounded-2xl rounded-bl-md"
                        style={{
                          background: colors.glassPrimary,
                          border: `1px solid ${colors.border}`
                        }}
                      >
                        <div className="flex space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 rounded-full"
                              style={{ background: colors.goldPrimary }}
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5]
                              }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              
              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask me anything about your sales process..."
                    className="w-full p-4 pr-12 rounded-xl border transition-colors"
                    style={{ 
                      background: colors.glassSecondary, 
                      borderColor: colors.border,
                      color: colors.textPrimary 
                    }}
                  />
                  <button
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg transition-colors"
                    style={{ color: colors.textMuted }}
                  >
                    <PlusCircle className="w-5 h-5" />
                  </button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="px-6 py-4 rounded-xl font-medium transition-all disabled:opacity-50"
                  style={{ 
                    background: colors.goldGradient, 
                    color: colors.primary 
                  }}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            {/* AI Capabilities */}
            <div className="glass-morphism rounded-2xl p-6" style={{ background: colors.glassPrimary }}>
              <h4 className="font-semibold mb-4 flex items-center" style={{ color: colors.textPrimary }}>
                <Zap className="w-5 h-5 mr-2" style={{ color: colors.goldPrimary }} />
                AI Capabilities
              </h4>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-4 rounded-xl text-left transition-all group"
                    style={{ 
                      background: colors.glassSecondary,
                      border: `1px solid ${colors.border}`
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = `${colors.goldPrimary}10`;
                      (e.currentTarget as HTMLElement).style.borderColor = `${colors.goldPrimary}30`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = colors.glassSecondary;
                      (e.currentTarget as HTMLElement).style.borderColor = colors.border;
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center flex-shrink-0`}>
                        <action.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium mb-1" style={{ color: colors.textPrimary }}>
                          {action.label}
                        </div>
                        <div className="text-xs" style={{ color: colors.textMuted }}>
                          {action.description}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: colors.goldPrimary }} />
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-morphism rounded-2xl p-6" style={{ background: colors.glassPrimary }}>
              <h4 className="font-semibold mb-4 flex items-center" style={{ color: colors.textPrimary }}>
                <Clock className="w-5 h-5 mr-2" style={{ color: colors.goldPrimary }} />
                Recent AI Tasks
              </h4>
              <div className="space-y-3">
                {[
                  { task: 'Generated cold email for TechCorp', time: '2 min ago', status: 'completed' },
                  { task: 'Researched prospect background', time: '5 min ago', status: 'completed' },
                  { task: 'Created follow-up sequence', time: '12 min ago', status: 'completed' },
                  { task: 'Analyzed call recording', time: '18 min ago', status: 'completed' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg" style={{ background: colors.glassSecondary }}>
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-sm font-medium" style={{ color: colors.textPrimary }}>
                        {item.task}
                      </div>
                      <div className="text-xs" style={{ color: colors.textMuted }}>
                        {item.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Call Recording Component
  const CallRecordingTool = () => {
    const [recordingDuration, setRecordingDuration] = useState(0);
    const [recordingQuality, setRecordingQuality] = useState('high');
    const [autoTranscribe, setAutoTranscribe] = useState(true);

    const recordingTabs = ['Record', 'Library', 'Settings'];
    const [activeRecordingTab, setActiveRecordingTab] = useState('Record');

    const mockRecordings = [
      { 
        id: 1,
        name: 'Sales Call - TechCorp Discovery',
        duration: '23:45',
        date: '2024-01-15',
        time: '2:30 PM',
        participants: ['John (Sales)', 'Sarah (Client)'],
        status: 'completed',
        transcribed: true,
        size: '12.3 MB',
        quality: 'HD'
      },
      { 
        id: 2,
        name: 'Follow-up Call - InnovateLabs',
        duration: '18:32',
        date: '2024-01-14',
        time: '10:15 AM',
        participants: ['Mike (Sales)', 'David (CTO)'],
        status: 'completed',
        transcribed: true,
        size: '9.8 MB',
        quality: 'HD'
      },
      { 
        id: 3,
        name: 'Demo Call - StartupXYZ',
        duration: '35:12',
        date: '2024-01-13',
        time: '4:00 PM',
        participants: ['Emily (Sales)', 'Alex (CEO)', 'Lisa (CMO)'],
        status: 'completed',
        transcribed: false,
        size: '18.7 MB',
        quality: 'HD'
      }
    ];

    React.useEffect(() => {
      let interval: NodeJS.Timeout;
      if (isRecording) {
        interval = setInterval(() => {
          setRecordingDuration(prev => prev + 1);
        }, 1000);
      } else {
        setRecordingDuration(0);
      }
      return () => clearInterval(interval);
    }, [isRecording]);

    const formatDuration = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-opacity-20 rounded-xl p-1" style={{ background: colors.glassSecondary }}>
          {recordingTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveRecordingTab(tab)}
              className={`flex-1 py-3 px-6 rounded-lg transition-all duration-300 font-medium ${
                activeRecordingTab === tab ? 'shadow-lg' : ''
              }`}
              style={{
                background: activeRecordingTab === tab ? colors.goldGradient : 'transparent',
                color: activeRecordingTab === tab ? colors.primary : colors.textSecondary
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeRecordingTab === 'Record' && (
            <motion.div
              key="record"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-2 gap-6"
            >
              {/* Recording Controls */}
              <div className="glass-morphism rounded-2xl p-6" style={{ background: colors.glassPrimary }}>
                <h3 className="text-lg font-semibold mb-6 flex items-center" style={{ color: colors.textPrimary }}>
                  <Headphones className="w-5 h-5 mr-2" style={{ color: colors.goldPrimary }} />
                  Call Recording Studio
                </h3>
                
                <div className="text-center space-y-6">
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsRecording(!isRecording)}
                      className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg transition-all relative ${
                        isRecording ? 'animate-pulse' : ''
                      }`}
                      style={{
                        background: isRecording ? 'linear-gradient(135deg, #dc2626, #ef4444)' : colors.goldGradient,
                        color: 'white'
                      }}
                    >
                      {isRecording ? (
                        <Square className="w-10 h-10" />
                      ) : (
                        <Mic className="w-10 h-10" />
                      )}
                    </motion.button>
                    
                    {isRecording && (
                      <>
                        <motion.div
                          className="absolute inset-0 rounded-full border-4 border-red-400"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-red-500 text-white"
                        >
                          REC
                        </motion.div>
                      </>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-xl font-semibold mb-2" style={{ color: colors.textPrimary }}>
                      {isRecording ? 'Recording Active' : 'Ready to Record'}
                    </p>
                    <p className="text-lg font-mono" style={{ color: colors.goldPrimary }}>
                      {isRecording ? formatDuration(recordingDuration) : '00:00'}
                    </p>
                    <p className="text-sm mt-1" style={{ color: colors.textMuted }}>
                      {isRecording ? 'High quality recording in progress' : 'Click to start recording your call'}
                    </p>
                  </div>

                  {/* Recording Controls */}
                  <div className="flex justify-center space-x-4">
                    <motion.button 
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-4 rounded-xl transition-all flex items-center justify-center"
                      style={{ 
                        background: !isRecording ? `${colors.textMuted}20` : colors.glassSecondary, 
                        color: !isRecording ? colors.textMuted : colors.textPrimary,
                        border: `1px solid ${colors.border}`,
                        opacity: !isRecording ? 0.5 : 1
                      }}
                      disabled={!isRecording}
                    >
                      <Pause className="w-5 h-5" />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-4 rounded-xl transition-all flex items-center justify-center"
                      style={{ 
                        background: colors.glassSecondary, 
                        color: colors.textPrimary,
                        border: `1px solid ${colors.border}`
                      }}
                    >
                      <Volume2 className="w-5 h-5" />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-4 rounded-xl transition-all flex items-center justify-center"
                      style={{ 
                        background: !isRecording ? `${colors.textMuted}20` : colors.goldGradient, 
                        color: !isRecording ? colors.textMuted : colors.primary,
                        border: `1px solid ${!isRecording ? colors.border : colors.goldPrimary}`,
                        opacity: !isRecording ? 0.5 : 1
                      }}
                      disabled={!isRecording}
                    >
                      <Save className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Recording Stats */}
                  {isRecording && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="grid grid-cols-3 gap-4 p-4 rounded-xl"
                      style={{ background: colors.glassSecondary }}
                    >
                      <div className="text-center">
                        <div className="text-lg font-bold" style={{ color: colors.goldPrimary }}>HD</div>
                        <div className="text-xs" style={{ color: colors.textMuted }}>Quality</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold" style={{ color: colors.goldPrimary }}>48kHz</div>
                        <div className="text-xs" style={{ color: colors.textMuted }}>Sample Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold" style={{ color: colors.goldPrimary }}>
                          {(recordingDuration * 0.5).toFixed(1)}MB
                        </div>
                        <div className="text-xs" style={{ color: colors.textMuted }}>File Size</div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Recording Settings */}
              <div className="space-y-6">
                <div className="glass-morphism rounded-2xl p-6" style={{ background: colors.glassPrimary }}>
                  <h4 className="text-lg font-semibold mb-4 flex items-center" style={{ color: colors.textPrimary }}>
                    <Settings className="w-5 h-5 mr-2" style={{ color: colors.goldPrimary }} />
                    Recording Settings
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                        Audio Quality
                      </label>
                      <select 
                        value={recordingQuality}
                        onChange={(e) => setRecordingQuality(e.target.value)}
                        className="w-full p-3 rounded-lg border transition-colors"
                        style={{ 
                          background: colors.glassSecondary, 
                          borderColor: colors.border,
                          color: colors.textPrimary 
                        }}
                      >
                        <option value="high">High Quality (48kHz)</option>
                        <option value="medium">Medium Quality (44kHz)</option>
                        <option value="low">Low Quality (22kHz)</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: colors.textSecondary }}>Auto-transcribe recordings</span>
                      <button
                        onClick={() => setAutoTranscribe(!autoTranscribe)}
                        className={`w-12 h-6 rounded-full transition-all ${
                          autoTranscribe ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          autoTranscribe ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="glass-morphism rounded-2xl p-6" style={{ background: colors.glassPrimary }}>
                  <h4 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>
                    Quick Actions
                  </h4>
                  <div className="space-y-3">
                    {[
                      { label: 'Test Microphone', icon: Mic2, action: 'test' },
                      { label: 'Upload Recording', icon: Upload, action: 'upload' },
                      { label: 'Export Settings', icon: Download, action: 'export' }
                    ].map((action, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full p-3 rounded-lg text-left transition-all flex items-center"
                        style={{ 
                          background: colors.glassSecondary,
                          color: colors.textPrimary,
                          border: `1px solid ${colors.border}`
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = `${colors.goldPrimary}10`;
                          (e.currentTarget as HTMLElement).style.borderColor = `${colors.goldPrimary}30`;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = colors.glassSecondary;
                          (e.currentTarget as HTMLElement).style.borderColor = colors.border;
                        }}
                      >
                        <action.icon className="w-5 h-5 mr-3" style={{ color: colors.goldPrimary }} />
                        {action.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeRecordingTab === 'Library' && (
            <motion.div
              key="library"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {/* Library Header */}
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold" style={{ color: colors.textPrimary }}>
                  Recording Library
                </h3>
                <div className="flex space-x-3">
                  <button 
                    className="px-4 py-2 rounded-lg border transition-colors flex items-center"
                    style={{ 
                      borderColor: colors.border,
                      color: colors.textSecondary 
                    }}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </button>
                  <button 
                    className="px-4 py-2 rounded-lg transition-colors flex items-center"
                    style={{ 
                      background: colors.goldGradient,
                      color: colors.primary 
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export All
                  </button>
                </div>
              </div>

              {/* Recordings List */}
              <div className="space-y-4">
                {mockRecordings.map((recording, index) => (
                  <motion.div
                    key={recording.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-morphism rounded-2xl p-6 hover:shadow-lg transition-all"
                    style={{ 
                      background: colors.glassPrimary,
                      border: `1px solid ${colors.border}`
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
                            {recording.name}
                          </h4>
                          <span 
                            className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                          >
                            {recording.status}
                          </span>
                          {recording.transcribed && (
                            <span 
                              className="px-2 py-1 rounded-full text-xs font-medium"
                              style={{ 
                                background: `${colors.goldPrimary}20`,
                                color: colors.goldPrimary 
                              }}
                            >
                              Transcribed
                            </span>
                          )}
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4" style={{ color: colors.textMuted }} />
                              <span style={{ color: colors.textPrimary }}>{recording.duration}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" style={{ color: colors.textMuted }} />
                              <span style={{ color: colors.textPrimary }}>{recording.date} at {recording.time}</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4" style={{ color: colors.textMuted }} />
                              <span style={{ color: colors.textPrimary }}>{recording.participants.join(', ')}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Download className="w-4 h-4" style={{ color: colors.textMuted }} />
                              <span style={{ color: colors.textPrimary }}>{recording.size} • {recording.quality}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 rounded-lg transition-all"
                          style={{ background: colors.goldGradient, color: colors.primary }}
                        >
                          <Play className="w-5 h-5" />
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 rounded-lg transition-all border"
                          style={{ 
                            background: 'transparent',
                            borderColor: colors.border,
                            color: colors.textSecondary
                          }}
                        >
                          <Download className="w-5 h-5" />
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 rounded-lg transition-all border"
                          style={{ 
                            background: 'transparent',
                            borderColor: colors.border,
                            color: colors.textSecondary
                          }}
                        >
                          <Eye className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeRecordingTab === 'Settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <div className="glass-morphism rounded-2xl p-6" style={{ background: colors.glassPrimary }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>
                  Audio Settings
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Default Quality', value: 'High (48kHz)', desc: 'Best quality for professional calls' },
                    { label: 'Auto-save Location', value: '/recordings', desc: 'Where recordings are saved' },
                    { label: 'File Format', value: 'MP3', desc: 'Audio file format' },
                    { label: 'Compression', value: 'Medium', desc: 'Balance between quality and size' }
                  ].map((setting, index) => (
                    <div key={index} className="p-4 rounded-lg" style={{ background: colors.glassSecondary }}>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium" style={{ color: colors.textPrimary }}>{setting.label}</div>
                          <div className="text-sm" style={{ color: colors.textMuted }}>{setting.desc}</div>
                        </div>
                        <div className="text-sm font-medium" style={{ color: colors.goldPrimary }}>
                          {setting.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-morphism rounded-2xl p-6" style={{ background: colors.glassPrimary }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>
                  Privacy & Security
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Encrypt recordings', enabled: true, desc: 'End-to-end encryption' },
                    { label: 'Auto-delete after 30 days', enabled: false, desc: 'Automatic cleanup' },
                    { label: 'Require password for playback', enabled: true, desc: 'Additional security' },
                    { label: 'Share with team members', enabled: false, desc: 'Team collaboration' }
                  ].map((setting, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg" style={{ background: colors.glassSecondary }}>
                      <div>
                        <div className="font-medium" style={{ color: colors.textPrimary }}>{setting.label}</div>
                        <div className="text-sm" style={{ color: colors.textMuted }}>{setting.desc}</div>
                      </div>
                      <button
                        className={`w-12 h-6 rounded-full transition-all ${
                          setting.enabled ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          setting.enabled ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Other tool components would follow similar patterns...
  const LeadResearchTool = () => {
    const [researchTarget, setResearchTarget] = useState('');
    const [researchDepth, setResearchDepth] = useState('standard');
    const [isResearching, setIsResearching] = useState(false);
    
    const researchTabs = ['Setup', 'Results', 'Analytics'];
    const [activeResearchTab, setActiveResearchTab] = useState('Setup');

    const mockResearchData = [
      {
        name: 'Sarah Johnson',
        company: 'TechCorp Inc.',
        position: 'VP of Sales',
        email: 'sarah.j@techcorp.com',
        linkedin: 'linkedin.com/in/sarahjohnson',
        insights: ['Recently posted about AI adoption', 'Company expanding to new markets', 'Looking for automation solutions'],
        score: 92
      },
      {
        name: 'Michael Chen',
        company: 'InnovateLabs',
        position: 'CTO',
        email: 'm.chen@innovatelabs.io',
        linkedin: 'linkedin.com/in/michaelchen',
        insights: ['Active in tech communities', 'Interested in ML/AI', 'Company raised Series B funding'],
        score: 88
      }
    ];

    return (
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-opacity-20 rounded-xl p-1" style={{ background: colors.glassSecondary }}>
          {researchTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveResearchTab(tab)}
              className={`flex-1 py-3 px-6 rounded-lg transition-all duration-300 font-medium ${
                activeResearchTab === tab ? 'shadow-lg' : ''
              }`}
              style={{
                background: activeResearchTab === tab ? colors.goldGradient : 'transparent',
                color: activeResearchTab === tab ? colors.primary : colors.textSecondary
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeResearchTab === 'Setup' && (
            <motion.div
              key="research-setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Research Configuration */}
              <div className="glass-morphism rounded-2xl p-6" style={{ background: colors.glassPrimary }}>
                <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: colors.textPrimary }}>
                  <Brain className="w-5 h-5 mr-2" style={{ color: colors.goldPrimary }} />
                  Research Configuration
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                      Target Company/Person
                    </label>
                    <input
                      type="text"
                      value={researchTarget}
                      onChange={(e) => setResearchTarget(e.target.value)}
                      placeholder="Enter company name or LinkedIn profile"
                      className="w-full p-3 rounded-lg border transition-colors"
                      style={{ 
                        background: colors.glassSecondary, 
                        borderColor: colors.border,
                        color: colors.textPrimary 
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                      Research Depth
                    </label>
                    <select 
                      value={researchDepth}
                      onChange={(e) => setResearchDepth(e.target.value)}
                      className="w-full p-3 rounded-lg border transition-colors"
                      style={{ 
                        background: colors.glassSecondary, 
                        borderColor: colors.border,
                        color: colors.textPrimary 
                      }}
                    >
                      <option value="basic">Basic Research</option>
                      <option value="standard">Standard Research</option>
                      <option value="deep">Deep Research</option>
                      <option value="comprehensive">Comprehensive Analysis</option>
                    </select>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsResearching(!isResearching)}
                    className="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300"
                    style={{
                      background: colors.goldGradient,
                      color: colors.primary
                    }}
                  >
                    {isResearching ? (
                      <div className="flex items-center justify-center">
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Researching...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Brain className="w-4 h-4 mr-2" />
                        Start Research
                      </div>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Research Features */}
              <div className="glass-morphism rounded-2xl p-6" style={{ background: colors.glassPrimary }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>
                  Research Features
                </h3>
                <div className="space-y-3">
                  {[
                    { icon: Globe, label: 'Company Intelligence', desc: 'Financial data, news, competitors' },
                    { icon: Users, label: 'Contact Discovery', desc: 'Key decision makers and contacts' },
                    { icon: MessageCircle, label: 'Social Insights', desc: 'Recent posts and engagement' },
                    { icon: TrendingUp, label: 'Growth Signals', desc: 'Hiring, funding, expansion' }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center p-3 rounded-lg" style={{ background: colors.glassSecondary }}>
                      <feature.icon className="w-5 h-5 mr-3" style={{ color: colors.goldPrimary }} />
                      <div>
                        <div className="font-medium" style={{ color: colors.textPrimary }}>{feature.label}</div>
                        <div className="text-sm" style={{ color: colors.textMuted }}>{feature.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeResearchTab === 'Results' && (
            <motion.div
              key="research-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {mockResearchData.map((prospect, index) => (
                <div key={index} className="glass-morphism rounded-2xl p-6" style={{ background: colors.glassPrimary }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ background: colors.goldGradient }}>
                        <Users className="w-6 h-6" style={{ color: colors.primary }} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>{prospect.name}</h3>
                        <p style={{ color: colors.textSecondary }}>{prospect.position} at {prospect.company}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold" style={{ color: colors.goldPrimary }}>{prospect.score}</div>
                      <div className="text-sm" style={{ color: colors.textMuted }}>Match Score</div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>Contact Info</div>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm" style={{ color: colors.textPrimary }}>
                          <Mail className="w-4 h-4 mr-2" style={{ color: colors.goldPrimary }} />
                          {prospect.email}
                        </div>
                        <div className="flex items-center text-sm" style={{ color: colors.textPrimary }}>
                          <LinkIcon className="w-4 h-4 mr-2" style={{ color: colors.goldPrimary }} />
                          {prospect.linkedin}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>Key Insights</div>
                      <div className="space-y-1">
                        {prospect.insights.slice(0, 2).map((insight, i) => (
                          <div key={i} className="text-sm" style={{ color: colors.textPrimary }}>• {insight}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 py-2 px-4 rounded-lg border transition-colors" style={{ borderColor: colors.border, color: colors.textSecondary }}>
                      <Eye className="w-4 h-4 inline mr-2" />
                      View Full Profile
                    </button>
                    <button className="flex-1 py-2 px-4 rounded-lg transition-colors" style={{ background: colors.goldGradient, color: colors.primary }}>
                      <Send className="w-4 h-4 inline mr-2" />
                      Generate Outreach
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeResearchTab === 'Analytics' && (
            <motion.div
              key="research-analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <div className="glass-morphism rounded-2xl p-6" style={{ background: colors.glassPrimary }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>Research Performance</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Prospects Researched', value: '1,247', change: '+23%' },
                    { label: 'High-Quality Leads', value: '342', change: '+18%' },
                    { label: 'Contact Discovery Rate', value: '89%', change: '+5%' },
                    { label: 'Data Accuracy', value: '96%', change: '+2%' }
                  ].map((metric, index) => (
                    <div key={index} className="flex justify-between items-center p-3 rounded-lg" style={{ background: colors.glassSecondary }}>
                      <div>
                        <div className="font-medium" style={{ color: colors.textPrimary }}>{metric.label}</div>
                        <div className="text-sm text-green-400">{metric.change} this month</div>
                      </div>
                      <div className="text-xl font-bold" style={{ color: colors.goldPrimary }}>{metric.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="glass-morphism rounded-2xl p-6" style={{ background: colors.glassPrimary }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>Industry Distribution</h3>
                
                {/* Industry Stats */}
                <div className="space-y-3">
                  {[
                    { industry: 'Technology', percentage: 35, count: 437, color: '#3B82F6' },
                    { industry: 'Healthcare', percentage: 22, count: 274, color: '#10B981' },
                    { industry: 'Finance', percentage: 18, count: 224, color: '#F59E0B' },
                    { industry: 'Manufacturing', percentage: 15, count: 187, color: '#8B5CF6' },
                    { industry: 'Other', percentage: 10, count: 125, color: '#EF4444' }
                  ].map((item, index) => (
                    <div key={index} className="p-3 rounded-lg" style={{ background: colors.glassSecondary }}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="font-medium" style={{ color: colors.textPrimary }}>{item.industry}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold" style={{ color: colors.goldPrimary }}>{item.percentage}%</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm" style={{ color: colors.textMuted }}>{item.count} prospects researched</div>
                        <div className="w-24 h-2 rounded-full" style={{ background: `${colors.border}` }}>
                          <div 
                            className="h-2 rounded-full transition-all duration-500"
                            style={{ 
                              width: `${item.percentage}%`,
                              background: item.color
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const OutreachScriptsTool = () => {
    const [scriptType, setScriptType] = useState('email');
    const [industry, setIndustry] = useState('');
    const [tone, setTone] = useState('professional');
    const [generatedScript, setGeneratedScript] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    
    const scriptTabs = ['Generator', 'Templates', 'Performance'];
    const [activeScriptTab, setActiveScriptTab] = useState('Generator');

    const mockTemplates = [
      {
        name: 'Cold Email - Tech Industry',
        type: 'email',
        industry: 'Technology',
        performance: '24% open rate',
        preview: 'Hi {{firstName}}, I noticed your company is expanding into AI...'
      },
      {
        name: 'LinkedIn Connection',
        type: 'linkedin',
        industry: 'Healthcare',
        performance: '67% acceptance rate',
        preview: 'Hi {{firstName}}, I saw your recent post about healthcare innovation...'
      },
      {
        name: 'Follow-up Sequence',
        type: 'sequence',
        industry: 'Finance',
        performance: '31% response rate',
        preview: 'Following up on my previous message about cost optimization...'
      }
    ];

    const generateScript = () => {
      setIsGenerating(true);
      setTimeout(() => {
        setGeneratedScript(`Subject: Revolutionize Your ${industry || 'Business'} Operations with AI

Hi {{firstName}},

I hope this message finds you well. I came across {{companyName}} and was impressed by your recent growth in the ${industry || 'industry'}.

I wanted to reach out because we've been helping companies like yours achieve remarkable results through AI-powered automation. Our clients typically see:

• 40% reduction in operational costs
• 60% faster lead processing
• 300% improvement in conversion rates

I'd love to show you how we can help {{companyName}} achieve similar results. Would you be open to a brief 15-minute conversation this week?

Best regards,
{{senderName}}

P.S. I've attached a case study of how we helped a similar company increase their revenue by 180% in just 6 months.`);
        setIsGenerating(false);
      }, 2000);
    };

    return (
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-opacity-20 rounded-xl p-1" style={{ background: colors.glassSecondary }}>
          {scriptTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveScriptTab(tab)}
              className={`flex-1 py-3 px-6 rounded-lg transition-all duration-300 font-medium ${
                activeScriptTab === tab ? 'shadow-lg' : ''
              }`}
              style={{
                background: activeScriptTab === tab ? colors.goldGradient : 'transparent',
                color: activeScriptTab === tab ? colors.primary : colors.textSecondary
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeScriptTab === 'Generator' && (
            <motion.div
              key="script-generator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Script Configuration */}
              <div className="glass-morphism rounded-2xl p-6" style={{ background: colors.glassPrimary }}>
                <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: colors.textPrimary }}>
                  <FileText className="w-5 h-5 mr-2" style={{ color: colors.goldPrimary }} />
                  Script Generator
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                      Script Type
                    </label>
                    <select 
                      value={scriptType}
                      onChange={(e) => setScriptType(e.target.value)}
                      className="w-full p-3 rounded-lg border transition-colors"
                      style={{ 
                        background: colors.glassSecondary, 
                        borderColor: colors.border,
                        color: colors.textPrimary 
                      }}
                    >
                      <option value="email">Cold Email</option>
                      <option value="linkedin">LinkedIn Message</option>
                      <option value="phone">Phone Script</option>
                      <option value="sequence">Follow-up Sequence</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                      Target Industry
                    </label>
                    <input
                      type="text"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      placeholder="e.g., Technology, Healthcare, Finance"
                      className="w-full p-3 rounded-lg border transition-colors"
                      style={{ 
                        background: colors.glassSecondary, 
                        borderColor: colors.border,
                        color: colors.textPrimary 
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                      Tone
                    </label>
                    <select 
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      className="w-full p-3 rounded-lg border transition-colors"
                      style={{ 
                        background: colors.glassSecondary, 
                        borderColor: colors.border,
                        color: colors.textPrimary 
                      }}
                    >
                      <option value="professional">Professional</option>
                      <option value="casual">Casual</option>
                      <option value="urgent">Urgent</option>
                      <option value="friendly">Friendly</option>
                    </select>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={generateScript}
                    className="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300"
                    style={{
                      background: colors.goldGradient,
                      color: colors.primary
                    }}
                  >
                    {isGenerating ? (
                      <div className="flex items-center justify-center">
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Generate Script
                      </div>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Generated Script */}
              <div className="glass-morphism rounded-2xl p-6" style={{ background: colors.glassPrimary }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
                    Generated Script
                  </h3>
                  {generatedScript && (
                    <div className="flex space-x-2">
                      <button className="p-2 rounded-lg transition-colors" style={{ background: colors.glassSecondary, color: colors.textSecondary }}>
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg transition-colors" style={{ background: colors.glassSecondary, color: colors.textSecondary }}>
                        <Save className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                {generatedScript ? (
                  <div className="space-y-4">
                    <textarea
                      value={generatedScript}
                      onChange={(e) => setGeneratedScript(e.target.value)}
                      className="w-full h-64 p-4 rounded-lg border resize-none"
                      style={{ 
                        background: colors.glassSecondary, 
                        borderColor: colors.border,
                        color: colors.textPrimary 
                      }}
                    />
                    <div className="flex space-x-2">
                      <button className="flex-1 py-2 px-4 rounded-lg border transition-colors" style={{ borderColor: colors.border, color: colors.textSecondary }}>
                        <Edit3 className="w-4 h-4 inline mr-2" />
                        Edit Script
                      </button>
                      <button className="flex-1 py-2 px-4 rounded-lg transition-colors" style={{ background: colors.goldGradient, color: colors.primary }}>
                        <Send className="w-4 h-4 inline mr-2" />
                        Use Script
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center" style={{ background: colors.glassSecondary, borderRadius: '0.5rem' }}>
                    <div className="text-center">
                      <FileText className="w-12 h-12 mx-auto mb-2" style={{ color: colors.goldPrimary }} />
                      <p style={{ color: colors.textSecondary }}>Your generated script will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeScriptTab === 'Templates' && (
            <motion.div
              key="script-templates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {mockTemplates.map((template, index) => (
                <div key={index} className="glass-morphism rounded-2xl p-6" style={{ background: colors.glassPrimary }}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>{template.name}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm px-2 py-1 rounded" style={{ background: colors.glassSecondary, color: colors.textSecondary }}>
                          {template.type}
                        </span>
                        <span className="text-sm" style={{ color: colors.textMuted }}>{template.industry}</span>
                        <span className="text-sm font-medium" style={{ color: colors.goldPrimary }}>{template.performance}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 rounded-lg transition-colors" style={{ background: colors.glassSecondary, color: colors.textSecondary }}>
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg transition-colors" style={{ background: colors.goldGradient, color: colors.primary }}>
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg" style={{ background: colors.glassSecondary }}>
                    <p className="text-sm" style={{ color: colors.textPrimary }}>{template.preview}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeScriptTab === 'Performance' && (
            <motion.div
              key="script-performance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <div className="glass-morphism rounded-2xl p-6" style={{ background: colors.glassPrimary }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>Script Performance</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Scripts Generated', value: '2,847', change: '+34%' },
                    { label: 'Average Open Rate', value: '28%', change: '+7%' },
                    { label: 'Response Rate', value: '12%', change: '+15%' },
                    { label: 'Conversion Rate', value: '4.2%', change: '+22%' }
                  ].map((metric, index) => (
                    <div key={index} className="flex justify-between items-center p-3 rounded-lg" style={{ background: colors.glassSecondary }}>
                      <div>
                        <div className="font-medium" style={{ color: colors.textPrimary }}>{metric.label}</div>
                        <div className="text-sm text-green-400">{metric.change} this month</div>
                      </div>
                      <div className="text-xl font-bold" style={{ color: colors.goldPrimary }}>{metric.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="glass-morphism rounded-2xl p-6" style={{ background: colors.glassPrimary }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>Top Performing Scripts</h3>
                <div className="space-y-3">
                  {[
                    { name: 'AI Automation Pitch', rate: '18.5%', type: 'Email' },
                    { name: 'Cost Reduction Focus', rate: '16.2%', type: 'LinkedIn' },
                    { name: 'Growth Opportunity', rate: '14.8%', type: 'Phone' },
                    { name: 'Industry Insights', rate: '13.1%', type: 'Follow-up' }
                  ].map((script, index) => (
                    <div key={index} className="flex justify-between items-center p-3 rounded-lg" style={{ background: colors.glassSecondary }}>
                      <div>
                        <div className="font-medium" style={{ color: colors.textPrimary }}>{script.name}</div>
                        <div className="text-sm" style={{ color: colors.textMuted }}>{script.type}</div>
                      </div>
                      <div className="text-lg font-bold" style={{ color: colors.goldPrimary }}>{script.rate}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const TranscriptionTool = () => {
    const [isRecordingTranscription, setIsRecordingTranscription] = useState(false);
    const [transcriptionResult, setTranscriptionResult] = useState('');
    const [speakers, setSpeakers] = useState<string[]>([]);
    const [transcriptionLanguage, setTranscriptionLanguage] = useState('en');
    const [speakerDetection, setSpeakerDetection] = useState(true);
    const [realTimeTranscription, setRealTimeTranscription] = useState(true);
    
    const transcriptionTabs = ['Live Transcribe', 'Upload & Process', 'Transcription Library'];
    const [activeTranscriptionTab, setActiveTranscriptionTab] = useState('Live Transcribe');

    const mockTranscriptions = [
      {
        id: 1,
        title: 'Sales Call - TechCorp Discovery',
        date: '2024-01-15',
        duration: '23:45',
        speakers: ['John (Sales Rep)', 'Sarah (Client)'],
        status: 'Completed',
        accuracy: '96%',
        language: 'English',
        wordCount: 3247,
        confidence: 'High'
      },
      {
        id: 2,
        title: 'Follow-up Call - InnovateLabs',
        date: '2024-01-14',
        duration: '18:32',
        speakers: ['Mike (Sales Rep)', 'David (CTO)'],
        status: 'Completed',
        accuracy: '94%',
        language: 'English',
        wordCount: 2156,
        confidence: 'High'
      },
      {
        id: 3,
        title: 'Demo Presentation - StartupXYZ',
        date: '2024-01-13',
        duration: '35:12',
        speakers: ['Emily (Sales)', 'Alex (CEO)', 'Lisa (CMO)'],
        status: 'Processing',
        accuracy: '92%',
        language: 'English',
        wordCount: 4892,
        confidence: 'Medium'
      }
    ];

    const startTranscriptionRecording = () => {
      setIsRecordingTranscription(true);
      // Simulate real-time transcription
      setTimeout(() => {
        setTranscriptionResult(`[00:00] Speaker 1 (John - Sales Rep): Hello, thank you for taking the time to speak with me today. I'm excited to discuss how our AI solutions can transform your sales process.

[00:08] Speaker 2 (Sarah - Client): Of course! I'm excited to learn more about your AI solutions. We've been looking for ways to streamline our operations.

[00:15] Speaker 1 (John - Sales Rep): Great! I understand you're looking to automate some of your sales processes. Can you tell me more about your current challenges and pain points?

[00:25] Speaker 2 (Sarah - Client): We're spending too much time on manual lead qualification. Our team is overwhelmed with the volume of inquiries we receive, and we're missing opportunities.

[00:38] Speaker 1 (John - Sales Rep): That's exactly what our AI assistant can help with. We can automate up to 80% of your lead qualification process while maintaining high accuracy and personalization.

[00:52] Speaker 2 (Sarah - Client): That sounds promising. What kind of accuracy rates do you typically see with your AI system?

[01:02] Speaker 1 (John - Sales Rep): Our clients typically see 94-96% accuracy in lead scoring and qualification. We also provide detailed analytics on why leads are scored the way they are, giving you full transparency.

[01:18] Speaker 2 (Sarah - Client): Impressive. How quickly can we see results after implementation?

[01:25] Speaker 1 (John - Sales Rep): Most clients see initial results within the first week, with full optimization typically achieved within 30 days of implementation.`);
        setSpeakers(['John (Sales Rep)', 'Sarah (Client)']);
        setIsRecordingTranscription(false);
      }, 5000);
    };

    return (
      <div className="space-y-6">
        {/* Header Section */}
        <div className="glass-morphism rounded-2xl p-6" style={{ background: colors.glassPrimary }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center">
                <Mic className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold" style={{ color: colors.textPrimary }}>
                  AI Transcription Studio
                </h2>
                <p style={{ color: colors.textSecondary }}>
                  Real-time speech-to-text with speaker identification
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
              <span className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                AI Engine Active
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg" style={{ background: colors.glassSecondary }}>
              <div className="text-2xl font-bold" style={{ color: colors.goldPrimary }}>96%</div>
              <div className="text-sm" style={{ color: colors.textMuted }}>Accuracy</div>
            </div>
            <div className="text-center p-3 rounded-lg" style={{ background: colors.glassSecondary }}>
              <div className="text-2xl font-bold" style={{ color: colors.goldPrimary }}>12</div>
              <div className="text-sm" style={{ color: colors.textMuted }}>Languages</div>
            </div>
            <div className="text-center p-3 rounded-lg" style={{ background: colors.glassSecondary }}>
              <div className="text-2xl font-bold" style={{ color: colors.goldPrimary }}>Real-time</div>
              <div className="text-sm" style={{ color: colors.textMuted }}>Processing</div>
            </div>
            <div className="text-center p-3 rounded-lg" style={{ background: colors.glassSecondary }}>
              <div className="text-2xl font-bold" style={{ color: colors.goldPrimary }}>Auto</div>
              <div className="text-sm" style={{ color: colors.textMuted }}>Speaker ID</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-opacity-20 rounded-xl p-1" style={{ background: colors.glassSecondary }}>
          {transcriptionTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTranscriptionTab(tab)}
              className={`flex-1 py-3 px-6 rounded-lg transition-all duration-300 font-medium ${
                activeTranscriptionTab === tab ? 'shadow-lg' : ''
              }`}
              style={{
                background: activeTranscriptionTab === tab ? colors.goldGradient : 'transparent',
                color: activeTranscriptionTab === tab ? colors.primary : colors.textSecondary
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTranscriptionTab === 'Live Transcribe' && (
            <motion.div
              key="live-transcribe"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-3 gap-6"
            >
              {/* Recording Controls */}
              <div className="lg:col-span-2 space-y-6">
                <div className="glass-morphism rounded-2xl p-6" style={{ background: colors.glassPrimary }}>
                  <h3 className="text-lg font-semibold mb-6 flex items-center" style={{ color: colors.textPrimary }}>
                    <Mic2 className="w-5 h-5 mr-2" style={{ color: colors.goldPrimary }} />
                    Live Transcription
                  </h3>
                  
                  <div className="text-center space-y-6">
                    <div className="relative">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startTranscriptionRecording}
                        className="w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 relative"
                        style={{
                          background: isRecordingTranscription 
                            ? 'linear-gradient(135deg, #dc2626, #ef4444)' 
                            : 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                        }}
                      >
                        {isRecordingTranscription ? (
                          <Square className="w-10 h-10 text-white" />
                        ) : (
                          <Mic2 className="w-10 h-10 text-white" />
                        )}
                      </motion.button>
                      
                      {isRecordingTranscription && (
                        <>
                          <motion.div
                            className="absolute inset-0 rounded-full border-4 border-red-400"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-red-500 text-white"
                          >
                            LIVE
                          </motion.div>
                        </>
                      )}
                    </div>
                    
                    <div>
                      <div className="text-xl font-semibold mb-2" style={{ color: colors.textPrimary }}>
                        {isRecordingTranscription ? 'Transcribing Live...' : 'Ready to Transcribe'}
                      </div>
                      <div className="text-sm" style={{ color: colors.textMuted }}>
                        {isRecordingTranscription ? 'AI is processing speech in real-time' : 'Click to start live transcription'}
                      </div>
                    </div>
                    
                    {isRecordingTranscription && (
                      <div className="space-y-3">
                        <div className="flex justify-center space-x-1">
                          {[...Array(7)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-1 bg-indigo-400 rounded-full"
                              animate={{
                                height: [4, 24, 4],
                              }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.1
                              }}
                            />
                          ))}
                        </div>
                        <div className="grid grid-cols-3 gap-4 p-4 rounded-xl" style={{ background: colors.glassSecondary }}>
                          <div className="text-center">
                            <div className="text-lg font-bold" style={{ color: colors.goldPrimary }}>00:23</div>
                            <div className="text-xs" style={{ color: colors.textMuted }}>Duration</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold" style={{ color: colors.goldPrimary }}>2</div>
                            <div className="text-xs" style={{ color: colors.textMuted }}>Speakers</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold" style={{ color: colors.goldPrimary }}>156</div>
                            <div className="text-xs" style={{ color: colors.textMuted }}>Words</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Live Transcription Display */}
                <div className="glass-morphism rounded-2xl p-6" style={{ background: colors.glassPrimary }}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
                      Live Transcript
                    </h3>
                    {speakers.length > 0 && (
                      <div className="flex space-x-2">
                        {speakers.map((speaker, index) => (
                          <span key={index} className="text-xs px-3 py-1 rounded-full" style={{ 
                            background: `${colors.goldPrimary}20`, 
                            color: colors.goldPrimary 
                          }}>
                            {speaker}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {transcriptionResult ? (
                    <div className="space-y-4">
                      <div className="h-80 overflow-y-auto p-4 rounded-xl" style={{ background: colors.glassSecondary }}>
                        <div className="space-y-3">
                          {transcriptionResult.split('\n\n').map((line, index) => {
                            const isUser1 = line.includes('John - Sales Rep');
                            return (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`flex ${isUser1 ? 'justify-end' : 'justify-start'}`}
                              >
                                <div
                                  className={`max-w-[85%] p-3 rounded-xl ${
                                    isUser1 ? 'rounded-br-md' : 'rounded-bl-md'
                                  }`}
                                  style={{
                                    background: isUser1 
                                      ? `linear-gradient(135deg, ${colors.goldPrimary}20, ${colors.goldSecondary}30)`
                                      : colors.glassPrimary,
                                    border: `1px solid ${colors.border}`
                                  }}
                                >
                                  <div className="text-sm leading-relaxed" style={{ color: colors.textPrimary }}>
                                    {line}
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <motion.button 
                          whileHover={{ scale: 1.02, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 py-3 px-4 rounded-lg border transition-colors flex items-center justify-center" 
                          style={{ borderColor: colors.border, color: colors.textSecondary }}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.02, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 py-3 px-4 rounded-lg transition-colors flex items-center justify-center" 
                          style={{ background: colors.goldGradient, color: colors.primary }}
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.05, y: -1 }}
                          whileTap={{ scale: 0.95 }}
                          className="py-3 px-4 rounded-lg border transition-colors flex items-center justify-center" 
                          style={{ borderColor: colors.border, color: colors.textSecondary }}
                        >
                          <Copy className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <div className="h-80 flex items-center justify-center" style={{ background: colors.glassSecondary, borderRadius: '0.75rem' }}>
                      <div className="text-center">
                        <Volume2 className="w-16 h-16 mx-auto mb-4" style={{ color: colors.goldPrimary }} />
                        <p className="text-lg font-medium mb-2" style={{ color: colors.textPrimary }}>Ready for Live Transcription</p>
                        <p style={{ color: colors.textSecondary }}>Your conversation will appear here in real-time</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Settings Panel */}
              <div className="space-y-6">
                <div className="glass-morphism rounded-2xl p-6" style={{ background: colors.glassPrimary }}>
                  <h4 className="text-lg font-semibold mb-4 flex items-center" style={{ color: colors.textPrimary }}>
                    <Settings className="w-5 h-5 mr-2" style={{ color: colors.goldPrimary }} />
                    Transcription Settings
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                        Language
                      </label>
                      <select 
                        value={transcriptionLanguage}
                        onChange={(e) => setTranscriptionLanguage(e.target.value)}
                        className="w-full p-3 rounded-lg border transition-colors"
                        style={{ 
                          background: colors.glassSecondary, 
                          borderColor: colors.border,
                          color: colors.textPrimary 
                        }}
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="it">Italian</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: colors.textSecondary }}>Speaker Detection</span>
                      <button
                        onClick={() => setSpeakerDetection(!speakerDetection)}
                        className={`w-12 h-6 rounded-full transition-all ${
                          speakerDetection ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          speakerDetection ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: colors.textSecondary }}>Real-time Processing</span>
                      <button
                        onClick={() => setRealTimeTranscription(!realTimeTranscription)}
                        className={`w-12 h-6 rounded-full transition-all ${
                          realTimeTranscription ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          realTimeTranscription ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="glass-morphism rounded-2xl p-6" style={{ background: colors.glassPrimary }}>
                  <h4 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>
                    Quick Actions
                  </h4>
                  <div className="space-y-3">
                    {[
                      { label: 'Test Microphone', icon: Mic2, color: 'from-blue-400 to-blue-600' },
                      { label: 'Import Audio File', icon: Upload, color: 'from-green-400 to-green-600' },
                      { label: 'Export Settings', icon: Download, color: 'from-purple-400 to-purple-600' }
                    ].map((action, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02, x: 4, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full p-3 rounded-lg text-left transition-all flex items-center justify-start"
                        style={{ 
                          background: colors.glassSecondary,
                          color: colors.textPrimary,
                          border: `1px solid ${colors.border}`
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = `${colors.goldPrimary}10`;
                          (e.currentTarget as HTMLElement).style.borderColor = `${colors.goldPrimary}30`;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = colors.glassSecondary;
                          (e.currentTarget as HTMLElement).style.borderColor = colors.border;
                        }}
                      >
                        <motion.div 
                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mr-3`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          <action.icon className="w-4 h-4 text-white" />
                        </motion.div>
                        <span className="font-medium">{action.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTranscriptionTab === 'Upload & Process' && (
            <motion.div
              key="upload-process"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <div className="glass-morphism rounded-2xl p-6" style={{ background: colors.glassPrimary }}>
                <h3 className="text-lg font-semibold mb-6" style={{ color: colors.textPrimary }}>
                  Upload Audio File
                </h3>
                
                <div className="border-2 border-dashed rounded-xl p-8 text-center mb-6" style={{ borderColor: colors.border }}>
                  <Upload className="w-16 h-16 mx-auto mb-4" style={{ color: colors.goldPrimary }} />
                  <h4 className="text-lg font-semibold mb-2" style={{ color: colors.textPrimary }}>
                    Drop your audio file here
                  </h4>
                  <p className="mb-4" style={{ color: colors.textSecondary }}>
                    Supports MP3, WAV, M4A, FLAC files up to 500MB
                  </p>
                  <button className="py-3 px-6 rounded-lg transition-colors" style={{ background: colors.goldGradient, color: colors.primary }}>
                    Choose File
                  </button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold" style={{ color: colors.textPrimary }}>Processing Options</h4>
                  {[
                    { label: 'Speaker identification', desc: 'Identify different speakers automatically' },
                    { label: 'Timestamp generation', desc: 'Add precise timestamps to transcript' },
                    { label: 'Sentiment analysis', desc: 'Analyze emotional tone of conversation' },
                    { label: 'Key phrase extraction', desc: 'Extract important topics and keywords' },
                    { label: 'Summary generation', desc: 'Create AI-powered conversation summary' }
                  ].map((option, index) => (
                    <label key={index} className="flex items-start space-x-3 p-3 rounded-lg" style={{ background: colors.glassSecondary }}>
                      <input type="checkbox" defaultChecked className="mt-1 rounded" />
                      <div>
                        <div className="font-medium" style={{ color: colors.textPrimary }}>{option.label}</div>
                        <div className="text-sm" style={{ color: colors.textMuted }}>{option.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="glass-morphism rounded-2xl p-6" style={{ background: colors.glassPrimary }}>
                <h3 className="text-lg font-semibold mb-6" style={{ color: colors.textPrimary }}>
                  Output Settings
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3" style={{ color: colors.textPrimary }}>Export Format</h4>
                    {[
                      { label: 'Plain Text (.txt)', desc: 'Simple text format' },
                      { label: 'JSON with metadata', desc: 'Structured data with timestamps' },
                      { label: 'SRT Subtitles (.srt)', desc: 'Video subtitle format' },
                      { label: 'Word Document (.docx)', desc: 'Formatted document' },
                      { label: 'PDF Report', desc: 'Professional report format' }
                    ].map((format, index) => (
                      <label key={index} className="flex items-start space-x-3 p-3 rounded-lg mb-2" style={{ background: colors.glassSecondary }}>
                        <input type="radio" name="format" defaultChecked={index === 0} className="mt-1" />
                        <div>
                          <div className="font-medium" style={{ color: colors.textPrimary }}>{format.label}</div>
                          <div className="text-sm" style={{ color: colors.textMuted }}>{format.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="pt-4 border-t" style={{ borderColor: colors.border }}>
                    <button className="w-full py-3 px-6 rounded-lg font-semibold transition-all" style={{ background: colors.goldGradient, color: colors.primary }}>
                      Start Processing
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTranscriptionTab === 'Transcription Library' && (
            <motion.div
              key="transcription-library"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {/* Library Header */}
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold" style={{ color: colors.textPrimary }}>
                  Transcription Library
                </h3>
                <div className="flex space-x-3">
                  <button 
                    className="px-4 py-2 rounded-lg border transition-colors flex items-center"
                    style={{ 
                      borderColor: colors.border,
                      color: colors.textSecondary 
                    }}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </button>
                  <button 
                    className="px-4 py-2 rounded-lg transition-colors flex items-center"
                    style={{ 
                      background: colors.goldGradient,
                      color: colors.primary 
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export All
                  </button>
                </div>
              </div>

              {/* Transcriptions List */}
              <div className="space-y-4">
                {mockTranscriptions.map((transcription, index) => (
                  <motion.div
                    key={transcription.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-morphism rounded-2xl p-6 hover:shadow-lg transition-all"
                    style={{ 
                      background: colors.glassPrimary,
                      border: `1px solid ${colors.border}`
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
                            {transcription.title}
                          </h4>
                          <span 
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              transcription.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {transcription.status}
                          </span>
                          <span 
                            className="px-2 py-1 rounded-full text-xs font-medium"
                            style={{ 
                              background: `${colors.goldPrimary}20`,
                              color: colors.goldPrimary 
                            }}
                          >
                            {transcription.confidence} Confidence
                          </span>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4" style={{ color: colors.textMuted }} />
                              <span style={{ color: colors.textPrimary }}>{transcription.duration}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" style={{ color: colors.textMuted }} />
                              <span style={{ color: colors.textPrimary }}>{transcription.date}</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Globe className="w-4 h-4" style={{ color: colors.textMuted }} />
                              <span style={{ color: colors.textPrimary }}>{transcription.language}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FileText className="w-4 h-4" style={{ color: colors.textMuted }} />
                              <span style={{ color: colors.textPrimary }}>{transcription.wordCount} words</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4" style={{ color: colors.textMuted }} />
                              <span style={{ color: colors.textPrimary }}>{transcription.speakers.length} speakers</span>
                            </div>
                            <div className="text-lg font-bold" style={{ color: colors.goldPrimary }}>
                              {transcription.accuracy}
                            </div>
                          </div>
                        </div>

                        <div className="mt-3">
                          <div className="text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>Speakers</div>
                          <div className="flex space-x-2">
                            {transcription.speakers.map((speaker, speakerIndex) => (
                              <span key={speakerIndex} className="text-xs px-2 py-1 rounded" style={{ background: colors.glassSecondary, color: colors.textSecondary }}>
                                {speaker}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 rounded-lg transition-all"
                          style={{ background: colors.goldGradient, color: colors.primary }}
                        >
                          <Eye className="w-5 h-5" />
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 rounded-lg transition-all border"
                          style={{ 
                            background: 'transparent',
                            borderColor: colors.border,
                            color: colors.textSecondary
                          }}
                        >
                          <Download className="w-5 h-5" />
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 rounded-lg transition-all border"
                          style={{ 
                            background: 'transparent',
                            borderColor: colors.border,
                            color: colors.textSecondary
                          }}
                        >
                          <Send className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'lead-scraping':
        return <LeadScraping />;
      case 'lead-research':
        return <LeadResearchTool />;
      case 'ai-assistant':
        return <AIAssistantTool />;
      case 'outreach-scripts':
        return <OutreachScriptsTool />;
      case 'call-recording':
        return <CallRecordingTool />;
      case 'transcription':
        return <TranscriptionTool />;
      default:
        return (
          <div className="space-y-8">
            {/* Welcome Section with Glass Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-morphism rounded-3xl p-8 hover-shine"
              style={{
                background: colors.glassPrimary,
                borderColor: colors.border
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h1 
                    className="text-3xl font-bold mb-2"
                    style={{ color: colors.textPrimary }}
                  >
                    Welcome back, <span style={{ color: colors.goldPrimary }}>{currentUser.displayName.split(' ')[0]}!</span>
                  </h1>
                  <p style={{ color: colors.textSecondary }}>
                    Your Horafly AI sales platform is performing exceptionally well.
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  {/* Time Filter Dropdown */}
                  <div className="relative">
                    <select
                      value={timeFilter}
                      onChange={(e) => setTimeFilter(e.target.value)}
                      className="appearance-none px-4 py-2 rounded-lg border transition-colors pr-8"
                      style={{ 
                        background: colors.glassSecondary, 
                        borderColor: colors.border,
                        color: colors.textPrimary 
                      }}
                    >
                      {timeFilters.map((filter) => (
                        <option key={filter} value={filter}>{filter}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: colors.textMuted }} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <img 
                      src={horaflyLogo} 
                      alt="Horafly" 
                      className="w-8 h-8 rounded-lg object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <span style={{ color: colors.goldPrimary }} className="font-semibold">Horafly Pro</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid with Glass Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-premium"
                  style={{
                    background: colors.glassPrimary,
                    borderColor: colors.border
                  }}
                  whileHover={{
                    borderColor: colors.borderActive,
                    transform: 'translateY(-4px)',
                    boxShadow: `0 12px 40px ${colors.goldPrimary}20`
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    <span className="text-green-400 text-sm font-semibold">{stat.change}</span>
                  </div>
                  <div className="text-2xl font-bold mb-1" style={{ color: colors.textPrimary }}>
                    {stat.value}
                  </div>
                  <div className="text-sm" style={{ color: colors.textMuted }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Charts and Activities Row with Glass Effect */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Performance Chart */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2 glass-morphism rounded-2xl p-6"
                style={{
                  background: colors.glassPrimary,
                  borderColor: colors.border
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
                    Performance Overview
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button 
                      className="transition-colors"
                      style={{ color: colors.textMuted }}
                      onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = colors.goldPrimary}
                      onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = colors.textMuted}
                    >
                      <Calendar className="w-5 h-5" />
                    </button>
                    <button 
                      className="transition-colors"
                      style={{ color: colors.textMuted }}
                      onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = colors.goldPrimary}
                      onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = colors.textMuted}
                    >
                      <Filter className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {/* Performance Charts */}
                <div className="space-y-6">
                  {/* Leads Chart */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3" style={{ color: colors.textSecondary }}>
                      Lead Generation Trend
                    </h4>
                    <div className="h-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="leadsGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false}
                            tick={{ fontSize: 12, fill: colors.textMuted }}
                          />
                          <YAxis hide />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: colors.glassPrimary,
                              border: `1px solid ${colors.border}`,
                              borderRadius: '8px',
                              color: colors.textPrimary
                            }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="leads" 
                            stroke="#3B82F6" 
                            fillOpacity={1} 
                            fill="url(#leadsGradient)" 
                            strokeWidth={2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Revenue Chart */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3" style={{ color: colors.textSecondary }}>
                      Revenue Growth
                    </h4>
                    <div className="h-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                          <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false}
                            tick={{ fontSize: 12, fill: colors.textMuted }}
                          />
                          <YAxis hide />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: colors.glassPrimary,
                              border: `1px solid ${colors.border}`,
                              borderRadius: '8px',
                              color: colors.textPrimary
                            }}
                            formatter={(value) => [`$${value}`, 'Revenue']}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="revenue" 
                            stroke={colors.goldPrimary}
                            strokeWidth={3}
                            dot={{ fill: colors.goldPrimary, strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, stroke: colors.goldPrimary, strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Recent Activities */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-morphism rounded-2xl p-6"
                style={{
                  background: colors.glassPrimary,
                  borderColor: colors.border
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
                    Recent Activity
                  </h3>
                  <Bell className="w-5 h-5" style={{ color: colors.goldPrimary }} />
                </div>

                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-start space-x-3 p-3 rounded-lg transition-colors"
                      style={{
                        background: colors.glassSecondary
                      }}
                      whileHover={{
                        background: `${colors.goldPrimary}10`
                      }}
                    >
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: colors.goldGradient }}
                      >
                        <activity.icon className="w-4 h-4" style={{ color: colors.primary }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm" style={{ color: colors.textPrimary }}>
                          {activity.message}
                        </p>
                        <p className="text-xs mt-1" style={{ color: colors.textMuted }}>
                          {activity.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <button 
                  className="w-full mt-4 text-sm font-semibold transition-colors"
                  style={{ color: colors.goldPrimary }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = colors.goldSecondary}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = colors.goldPrimary}
                >
                  View All Activities
                </button>
              </motion.div>
            </div>

            {/* Quick Actions with Glass Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="glass-morphism rounded-2xl p-6"
              style={{
                background: colors.glassPrimary,
                borderColor: colors.border
              }}
            >
              <h3 className="text-xl font-bold mb-6" style={{ color: colors.textPrimary }}>
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Scrape New Leads', icon: Search, action: () => setActiveTab('lead-scraping') },
                  { label: 'Generate Script', icon: FileText, action: () => setActiveTab('outreach-scripts') },
                  { label: 'Start Recording', icon: Headphones, action: () => setActiveTab('call-recording') },
                  { label: 'Ask AI Assistant', icon: Bot, action: () => setActiveTab('ai-assistant') },
                ].map((action, index) => (
                  <motion.button
                    key={action.label}
                    onClick={action.action}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: `0 8px 25px ${colors.goldPrimary}20`
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-xl p-4 text-center transition-all duration-300 group card-premium"
                    style={{
                      background: `linear-gradient(135deg, ${colors.goldPrimary}10, ${colors.goldSecondary}20)`,
                      borderColor: `${colors.goldPrimary}30`
                    }}
                  >
                    <action.icon 
                      className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform" 
                      style={{ color: colors.goldPrimary }}
                    />
                    <p className="text-sm font-semibold" style={{ color: colors.textPrimary }}>
                      {action.label}
                    </p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        );
    }
  };

  return (
    <div 
      className="min-h-screen transition-all duration-300 relative"
      style={{ background: colors.primary, color: colors.textPrimary }}
    >
      {/* Fractal Triangle Background */}
      <ShardBackground />

      {/* Sidebar with Glass Effect */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className={`fixed left-0 top-0 h-full glass-morphism z-50 transition-all duration-300 ${
          sidebarCollapsed ? 'w-20' : 'w-72'
        }`}
        style={{
          background: colors.glassPrimary,
          borderColor: colors.border
        }}
      >
        {/* Sidebar Header */}
        <div className="p-6" style={{ borderBottom: `1px solid ${colors.border}` }}>
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden">
                  <img 
                    src={horaflyLogo} 
                    alt="Horafly Logo" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Fallback if logo doesn't exist yet
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: colors.goldGradient, display: 'none' }}
                  >
                    <Crown className="w-6 h-6" style={{ color: colors.primary }} />
                  </div>
                </div>
                <div>
                  <h2 
                    className="text-lg font-bold"
                    style={{ color: colors.goldPrimary }}
                  >
                    Horafly
                  </h2>
                  <p className="text-xs" style={{ color: colors.goldSecondary }}>
                    AI Sales Platform
                  </p>
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="transition-colors"
              style={{ color: colors.textMuted }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = colors.goldPrimary}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = colors.textMuted}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              whileHover={{ 
                x: sidebarCollapsed ? 0 : 8, 
                scale: 1.02 
              }}
              whileTap={{ scale: 0.95 }}
              className={`w-full flex items-center p-3 rounded-xl transition-all duration-300 group ${
                sidebarCollapsed ? 'justify-center' : 'space-x-3'
              } ${
                activeTab === item.id
                  ? 'shadow-horafly-lg'
                  : ''
              }`}
              style={{
                background: activeTab === item.id 
                  ? `linear-gradient(135deg, ${colors.goldPrimary}20, ${colors.goldSecondary}30)`
                  : 'transparent',
                color: activeTab === item.id 
                  ? colors.goldPrimary 
                  : colors.textSecondary,
                border: activeTab === item.id 
                  ? `1px solid ${colors.goldPrimary}40`
                  : '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== item.id) {
                  (e.currentTarget as HTMLElement).style.background = `${colors.goldPrimary}10`;
                  (e.currentTarget as HTMLElement).style.color = colors.textPrimary;
                  (e.currentTarget as HTMLElement).style.border = `1px solid ${colors.goldPrimary}20`;
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== item.id) {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = colors.textSecondary;
                  (e.currentTarget as HTMLElement).style.border = '1px solid transparent';
                }
              }}
            >
              <motion.div 
                className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: activeTab === item.id ? 0 : 10,
                  boxShadow: `0 4px 15px ${colors.goldPrimary}40`
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <item.icon className="w-4 h-4 text-white" />
              </motion.div>
              {!sidebarCollapsed && (
                <motion.span 
                  className="font-semibold"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.span>
              )}
            </motion.button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div 
          className="absolute bottom-0 left-0 right-0 p-4"
          style={{ borderTop: `1px solid ${colors.border}` }}
        >
          <div className="space-y-2">
            <button
              onClick={onSettings}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                sidebarCollapsed ? 'justify-center' : ''
              }`}
              style={{ color: colors.textSecondary }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = `${colors.textMuted}20`;
                (e.currentTarget as HTMLElement).style.color = colors.textPrimary;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = colors.textSecondary;
              }}
            >
              <Settings className="w-5 h-5" />
              {!sidebarCollapsed && <span>Settings</span>}
            </button>
            <button
              onClick={onLogout}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                sidebarCollapsed ? 'justify-center' : ''
              }`}
              style={{ color: colors.textSecondary }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = `${colors.error}20`;
                (e.currentTarget as HTMLElement).style.color = colors.error;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = colors.textSecondary;
              }}
            >
              <LogOut className="w-5 h-5" />
              {!sidebarCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-72'}`}>
        {/* Top Header with Glass Effect */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-morphism p-6"
          style={{
            background: colors.glassPrimary,
            borderColor: colors.border
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold capitalize" style={{ color: colors.textPrimary }}>
                {activeTab.replace('-', ' ')}
              </h1>
              <p style={{ color: colors.textMuted }}>
                {activeTab === 'overview' ? 'Your AI sales command center' : `Manage your ${activeTab.replace('-', ' ')} tools`}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                className="relative transition-colors"
                style={{ color: colors.textMuted }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = colors.goldPrimary}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = colors.textMuted}
              >
                <Bell className="w-6 h-6" />
                <span 
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                  style={{ background: colors.goldPrimary }}
                ></span>
              </button>
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: colors.goldGradient }}
                >
                  <span style={{ color: colors.primary }} className="font-bold">
                    {currentUser.displayName.charAt(0)}
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-semibold" style={{ color: colors.textPrimary }}>
                    {currentUser.displayName}
                  </p>
                  <p className="text-sm" style={{ color: colors.goldPrimary }}>
                    Pro Member
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Page Content */}
        <main className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 