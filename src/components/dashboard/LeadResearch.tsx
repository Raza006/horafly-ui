import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Search, 
  User, 
  Building, 
  TrendingUp, 
  Clock, 
  Star, 
  CheckCircle,
  AlertCircle,
  Globe,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Target,
  DollarSign,
  Users,
  Eye,
  Download,
  ExternalLink
} from 'lucide-react';

const LeadResearch: React.FC = () => {
  const [selectedLead, setSelectedLead] = useState<number | null>(1);
  const [researchStatus, setResearchStatus] = useState<'idle' | 'researching' | 'completed'>('completed');

  const leadsToResearch = [
    {
      id: 1,
      name: 'Sarah Chen',
      title: 'VP of Engineering',
      company: 'TechFlow Dynamics',
      status: 'completed',
      confidence: 95,
      lastResearched: '2 hours ago',
      priority: 'high',
      source: 'LinkedIn'
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      title: 'Chief Technology Officer',
      company: 'DataVault Systems',
      status: 'researching',
      confidence: 0,
      lastResearched: 'In progress',
      priority: 'medium',
      source: 'Company Website'
    },
    {
      id: 3,
      name: 'Emily Foster',
      title: 'Director of Sales',
      company: 'GrowthLab Inc',
      status: 'pending',
      confidence: 0,
      lastResearched: 'Not started',
      priority: 'high',
      source: 'Sales Navigator'
    },
  ];

  const researchData = {
    1: {
      personalInfo: {
        name: 'Sarah Chen',
        title: 'VP of Engineering',
        company: 'TechFlow Dynamics',
        location: 'San Francisco, CA',
        experience: '8+ years',
        education: 'Stanford University - MS Computer Science',
        email: 'sarah.chen@techflow.com',
        phone: '+1 (415) 555-0123'
      },
      companyInfo: {
        name: 'TechFlow Dynamics',
        industry: 'SaaS Platform',
        size: '250-500 employees',
        revenue: '$10M-50M',
        founded: '2015',
        headquarters: 'San Francisco, CA',
        website: 'techflowdynamics.com',
        description: 'Leading provider of workflow automation solutions for enterprise clients.'
      },
      socialPresence: {
        linkedin: {
          url: 'linkedin.com/in/sarahchen-vp',
          followers: '2.3K',
          posts: 'Weekly tech leadership content',
          engagement: 'High'
        },
        twitter: {
          url: 'twitter.com/sarahchen_tech',
          followers: '1.2K',
          posts: 'Industry insights & team updates',
          engagement: 'Medium'
        }
      },
      insights: [
        'Recently posted about hiring challenges in AI/ML space',
        'Company just raised Series B funding ($25M)',
        'Actively expanding engineering team (5 open positions)',
        'Frequently engages with content about DevOps tools',
        'Mentioned interest in improving CI/CD processes'
      ],
      painPoints: [
        'Scaling engineering team rapidly',
        'Improving development velocity',
        'Managing technical debt',
        'Implementing better monitoring solutions'
      ],
      opportunities: [
        'Perfect timing - company is in growth phase',
        'Direct decision maker for engineering tools',
        'Budget likely available post-funding',
        'Pain points align with our solutions'
      ],
      recommendedApproach: [
        'Reference recent LinkedIn post about hiring challenges',
        'Mention mutual connections in SF tech scene',
        'Lead with ROI metrics from similar companies',
        'Offer specific case study from Series B company'
      ]
    }
  };

  const currentResearch = selectedLead ? researchData[selectedLead as keyof typeof researchData] : null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/40 backdrop-blur-xl border border-gold-500/20 rounded-3xl p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">AI Lead Research Center</h2>
            <p className="text-gray-300">Deep intelligence gathering and prospect analysis powered by advanced AI</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => setResearchStatus('researching')}
              className="bg-gold-gradient text-black px-6 py-3 rounded-xl font-semibold hover:shadow-gold transition-all duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Brain className="w-5 h-5" />
              <span>Start AI Research</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lead Selection Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-black/40 backdrop-blur-xl border border-gold-500/20 rounded-3xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Users className="w-6 h-6 text-gold-400 mr-3" />
            Research Queue
          </h3>

          <div className="space-y-4">
            {leadsToResearch.map((lead, index) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                onClick={() => setSelectedLead(lead.id)}
                className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border ${
                  selectedLead === lead.id
                    ? 'bg-gold-500/20 border-gold-500/50'
                    : 'bg-black/60 border-gold-500/10 hover:border-gold-500/30'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-semibold">{lead.name}</h4>
                  <div className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                    lead.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                    lead.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {lead.priority}
                  </div>
                </div>
                
                <p className="text-gold-400 text-sm mb-2">{lead.title}</p>
                <p className="text-gray-300 text-sm mb-3">{lead.company}</p>
                
                <div className="flex items-center justify-between">
                  <div className={`flex items-center px-2 py-1 rounded-lg text-xs font-semibold ${
                    lead.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    lead.status === 'researching' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {lead.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                    {lead.status === 'researching' && <Clock className="w-3 h-3 mr-1" />}
                    {lead.status === 'pending' && <AlertCircle className="w-3 h-3 mr-1" />}
                    {lead.status}
                  </div>
                  {lead.status === 'completed' && (
                    <div className="flex items-center text-green-400 text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      {lead.confidence}%
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            className="w-full mt-6 border border-gold-500/50 text-gold-400 py-3 rounded-xl font-semibold hover:bg-gold-500/10 transition-all duration-300 flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Search className="w-5 h-5" />
            <span>Add New Lead</span>
          </motion.button>
        </motion.div>

        {/* Research Results */}
        <div className="lg:col-span-2 space-y-8">
          {currentResearch ? (
            <>
              {/* Personal & Company Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-black/40 backdrop-blur-xl border border-gold-500/20 rounded-3xl p-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <User className="w-6 h-6 text-gold-400 mr-3" />
                      Personal Profile
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-gray-400 text-sm">Name</p>
                        <p className="text-white font-semibold">{currentResearch.personalInfo.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Title</p>
                        <p className="text-white font-semibold">{currentResearch.personalInfo.title}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Experience</p>
                        <p className="text-white font-semibold">{currentResearch.personalInfo.experience}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Education</p>
                        <p className="text-white font-semibold">{currentResearch.personalInfo.education}</p>
                      </div>
                      <div className="pt-3 border-t border-gold-500/20">
                        <div className="flex items-center text-gray-400 text-sm mb-2">
                          <Mail className="w-4 h-4 mr-2" />
                          {currentResearch.personalInfo.email}
                        </div>
                        <div className="flex items-center text-gray-400 text-sm mb-2">
                          <Phone className="w-4 h-4 mr-2" />
                          {currentResearch.personalInfo.phone}
                        </div>
                        <div className="flex items-center text-gray-400 text-sm">
                          <MapPin className="w-4 h-4 mr-2" />
                          {currentResearch.personalInfo.location}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <Building className="w-6 h-6 text-gold-400 mr-3" />
                      Company Intel
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-gray-400 text-sm">Company</p>
                        <p className="text-white font-semibold">{currentResearch.companyInfo.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Industry</p>
                        <p className="text-white font-semibold">{currentResearch.companyInfo.industry}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Size</p>
                        <p className="text-white font-semibold">{currentResearch.companyInfo.size}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Revenue</p>
                        <p className="text-white font-semibold">{currentResearch.companyInfo.revenue}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Founded</p>
                        <p className="text-white font-semibold">{currentResearch.companyInfo.founded}</p>
                      </div>
                      <div className="pt-3 border-t border-gold-500/20">
                        <p className="text-gray-300 text-sm">{currentResearch.companyInfo.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Social Presence */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-black/40 backdrop-blur-xl border border-gold-500/20 rounded-3xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Globe className="w-6 h-6 text-gold-400 mr-3" />
                  Social Presence Analysis
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4">
                    <div className="flex items-center mb-3">
                      <Linkedin className="w-5 h-5 text-blue-400 mr-2" />
                      <span className="text-white font-semibold">LinkedIn</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Followers</span>
                        <span className="text-white font-semibold">{currentResearch.socialPresence.linkedin.followers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Activity</span>
                        <span className="text-white font-semibold">{currentResearch.socialPresence.linkedin.posts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Engagement</span>
                        <span className="text-green-400 font-semibold">{currentResearch.socialPresence.linkedin.engagement}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-400/10 border border-blue-400/20 rounded-2xl p-4">
                    <div className="flex items-center mb-3">
                      <Twitter className="w-5 h-5 text-blue-400 mr-2" />
                      <span className="text-white font-semibold">Twitter</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Followers</span>
                        <span className="text-white font-semibold">{currentResearch.socialPresence.twitter.followers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Activity</span>
                        <span className="text-white font-semibold">{currentResearch.socialPresence.twitter.posts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Engagement</span>
                        <span className="text-yellow-400 font-semibold">{currentResearch.socialPresence.twitter.engagement}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* AI Insights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-black/40 backdrop-blur-xl border border-gold-500/20 rounded-3xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Brain className="w-6 h-6 text-gold-400 mr-3" />
                  AI-Generated Insights
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gold-400 mb-4">Key Insights</h4>
                    <ul className="space-y-3">
                      {currentResearch.insights.map((insight, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <div className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-300 text-sm">{insight}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <h4 className="text-lg font-semibold text-red-400 mb-4 mt-8">Pain Points</h4>
                    <ul className="space-y-3">
                      {currentResearch.painPoints.map((pain, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{pain}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-green-400 mb-4">Opportunities</h4>
                    <ul className="space-y-3">
                      {currentResearch.opportunities.map((opportunity, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <Target className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{opportunity}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <h4 className="text-lg font-semibold text-blue-400 mb-4 mt-8">Recommended Approach</h4>
                    <ul className="space-y-3">
                      {currentResearch.recommendedApproach.map((approach, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9 + index * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{approach}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mt-8 pt-6 border-t border-gold-500/20">
                  <motion.button
                    className="bg-gold-gradient text-black px-6 py-3 rounded-xl font-semibold hover:shadow-gold transition-all duration-300 flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="w-5 h-5" />
                    <span>Export Research</span>
                  </motion.button>

                  <motion.button
                    className="border border-gold-500/50 text-gold-400 px-6 py-3 rounded-xl font-semibold hover:bg-gold-500/10 transition-all duration-300 flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Generate Script</span>
                  </motion.button>
                </div>
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-black/40 backdrop-blur-xl border border-gold-500/20 rounded-3xl p-12 text-center"
            >
              <Brain className="w-16 h-16 text-gold-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Select a Lead to Research</h3>
              <p className="text-gray-300">Choose a lead from the queue to view detailed AI research</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadResearch; 