import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mic, 
  FileText, 
  Download, 
  Search,
  Filter,
  Play,
  Pause,
  Brain,
  Target,
  Star,
  Bot,
  Clock,
  Calendar,
  User,
  Phone,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Heart,
  MessageSquare
} from 'lucide-react';

const AITranscription: React.FC = () => {
  const [selectedTranscript, setSelectedTranscript] = useState<number | null>(1);
  const [searchTerm, setSearchTerm] = useState('');

  const transcripts = [
    {
      id: 1,
      title: 'Sarah Chen - Discovery Call',
      company: 'TechFlow Dynamics',
      date: '2024-01-15',
      duration: '18:23',
      wordCount: 2840,
      sentiment: 'positive',
      status: 'completed',
      aiScore: 94,
      keyTopics: ['Budget', 'Timeline', 'Technical Requirements']
    },
    {
      id: 2,
      title: 'Michael Rodriguez - Demo Call',
      company: 'DataVault Systems',
      date: '2024-01-15',
      duration: '25:10',
      wordCount: 3200,
      sentiment: 'neutral',
      status: 'completed',
      aiScore: 78,
      keyTopics: ['Features', 'Integration', 'Pricing']
    },
    {
      id: 3,
      title: 'Emily Foster - Follow-up',
      company: 'GrowthLab Inc',
      date: '2024-01-14',
      duration: '12:45',
      wordCount: 1850,
      sentiment: 'negative',
      status: 'completed',
      aiScore: 45,
      keyTopics: ['Objections', 'Competition', 'Timeline']
    }
  ];

  const transcriptContent = {
    1: {
      speakers: [
        { name: 'You', role: 'Sales Rep' },
        { name: 'Sarah Chen', role: 'VP Engineering' }
      ],
      segments: [
        {
          timestamp: '00:00',
          speaker: 'You',
          text: 'Hi Sarah, thanks for taking the time to meet with me today. I know how busy you must be with the Series B announcement.',
          sentiment: 'neutral',
          tags: ['Opening', 'Rapport']
        },
        {
          timestamp: '00:12',
          speaker: 'Sarah Chen',
          text: 'Of course! Yes, it\'s been a whirlwind since we announced the funding. We\'re really excited about scaling the team.',
          sentiment: 'positive',
          tags: ['Engagement', 'Company Update']
        },
        {
          timestamp: '00:24',
          speaker: 'You',
          text: 'That\'s fantastic. I saw your LinkedIn post about the hiring challenges you\'re facing. Can you tell me more about your current recruitment process?',
          sentiment: 'neutral',
          tags: ['Discovery', 'Pain Point']
        },
        {
          timestamp: '00:38',
          speaker: 'Sarah Chen',
          text: 'It\'s honestly been our biggest bottleneck. We\'re trying to hire 15 engineers this quarter, but our current process is so manual. We\'re spending 60% of our time on administrative tasks instead of actually evaluating candidates.',
          sentiment: 'negative',
          tags: ['Pain Point', 'Quantified Impact']
        },
        {
          timestamp: '01:02',
          speaker: 'You',
          text: 'That sounds incredibly frustrating. What impact is this having on your ability to hit your growth targets?',
          sentiment: 'neutral',
          tags: ['Discovery', 'Business Impact']
        },
        {
          timestamp: '01:15',
          speaker: 'Sarah Chen',
          text: 'Well, we\'re already behind by about 3 weeks on our roadmap because we don\'t have the engineering capacity. Each week of delay potentially costs us around $50K in lost revenue opportunity.',
          sentiment: 'negative',
          tags: ['Impact Quantified', 'Urgency']
        }
      ],
      insights: [
        'Strong pain point identification around manual recruiting processes',
        'Clear business impact quantified ($50K weekly opportunity cost)',
        'High urgency due to Series B growth targets',
        'Decision maker with budget authority confirmed'
      ],
      actionItems: [
        'Send ROI calculator showing time savings',
        'Schedule technical demo for next week',
        'Provide case study from similar Series B company',
        'Follow up with proposal by Friday'
      ]
    }
  };

  const currentTranscript = selectedTranscript ? transcripts.find(t => t.id === selectedTranscript) : null;
  const currentContent = selectedTranscript ? transcriptContent[selectedTranscript as keyof typeof transcriptContent] : null;

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
            <h2 className="text-2xl font-bold text-white mb-2">AI Conversation Intelligence</h2>
            <p className="text-gray-300">Transform your conversations into actionable insights with advanced AI analysis</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.button
              className="bg-gold-gradient text-black px-6 py-3 rounded-xl font-semibold hover:shadow-gold transition-all duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Brain className="w-5 h-5" />
              <span>New Analysis</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Transcript Library */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-black/40 backdrop-blur-xl border border-gold-500/20 rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center">
              <FileText className="w-6 h-6 text-gold-400 mr-3" />
              Transcripts
            </h3>
            <motion.button
              className="text-gray-400 hover:text-gold-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Filter className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search transcripts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/60 border border-gold-500/30 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div className="space-y-4">
            {transcripts.map((transcript, index) => (
              <motion.div
                key={transcript.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                onClick={() => setSelectedTranscript(transcript.id)}
                className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border ${
                  selectedTranscript === transcript.id
                    ? 'bg-gold-500/20 border-gold-500/50'
                    : 'bg-black/60 border-gold-500/10 hover:border-gold-500/30'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-semibold text-sm">{transcript.title}</h4>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 text-sm">{transcript.aiScore}</span>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-2">{transcript.company}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-white">{transcript.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Words</span>
                    <span className="text-white">{transcript.wordCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Sentiment</span>
                    <div className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                      transcript.sentiment === 'positive' ? 'bg-green-500/20 text-green-400' :
                      transcript.sentiment === 'negative' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {transcript.sentiment}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                  {transcript.keyTopics.slice(0, 2).map((topic, topicIndex) => (
                    <span key={topicIndex} className="bg-gold-500/20 text-gold-400 px-2 py-1 rounded text-xs">
                      {topic}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Transcript Viewer */}
        <div className="lg:col-span-2 space-y-8">
          {currentTranscript && currentContent ? (
            <>
              {/* Transcript Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-black/40 backdrop-blur-xl border border-gold-500/20 rounded-3xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{currentTranscript.title}</h3>
                    <p className="text-gray-300">{currentTranscript.company} • {currentTranscript.date}</p>
                  </div>
                  <motion.button
                    className="text-gray-400 hover:text-gold-400 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Download className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{currentTranscript.duration}</div>
                    <div className="text-gray-400 text-sm">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{currentTranscript.wordCount.toLocaleString()}</div>
                    <div className="text-gray-400 text-sm">Words</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{currentTranscript.aiScore}</div>
                    <div className="text-gray-400 text-sm">AI Score</div>
                  </div>
                </div>
              </motion.div>

              {/* Conversation View */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-black/40 backdrop-blur-xl border border-gold-500/20 rounded-3xl p-6"
              >
                <h4 className="text-lg font-bold text-white mb-6 flex items-center">
                  <MessageSquare className="w-6 h-6 text-gold-400 mr-3" />
                  Conversation
                </h4>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {currentContent.segments.map((segment, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: segment.speaker === 'You' ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className={`flex ${segment.speaker === 'You' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${segment.speaker === 'You' ? 'order-2' : 'order-1'}`}>
                        <div className={`flex items-center mb-2 ${segment.speaker === 'You' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                            segment.speaker === 'You' ? 'bg-gold-gradient order-2 ml-3 mr-0' : 'bg-blue-500/20 order-1'
                          }`}>
                            {segment.speaker === 'You' ? 
                              <User className="w-4 h-4 text-black" /> : 
                              <Phone className="w-4 h-4 text-blue-400" />
                            }
                          </div>
                          <div className="text-xs text-gray-400">
                            <span className="font-semibold">{segment.speaker}</span> • {segment.timestamp}
                          </div>
                        </div>
                        <div className={`p-4 rounded-2xl ${
                          segment.speaker === 'You' 
                            ? 'bg-gold-gradient text-black' 
                            : 'bg-black/60 border border-blue-500/20 text-white'
                        }`}>
                          <p className="text-sm leading-relaxed mb-2">{segment.text}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {segment.tags.map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className={`px-2 py-1 rounded text-xs font-medium ${
                                    segment.speaker === 'You'
                                      ? 'bg-black/20 text-black'
                                      : 'bg-blue-500/20 text-blue-400'
                                  }`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className={`w-2 h-2 rounded-full ${
                              segment.sentiment === 'positive' ? 'bg-green-400' :
                              segment.sentiment === 'negative' ? 'bg-red-400' :
                              'bg-yellow-400'
                            }`}></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* AI Insights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-black/40 backdrop-blur-xl border border-gold-500/20 rounded-3xl p-6"
              >
                <h4 className="text-lg font-bold text-white mb-6 flex items-center">
                  <Brain className="w-6 h-6 text-gold-400 mr-3" />
                  AI Insights & Action Items
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h5 className="text-md font-semibold text-green-400 mb-4">Key Insights</h5>
                    <ul className="space-y-3">
                      {currentContent.insights.map((insight, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{insight}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-md font-semibold text-blue-400 mb-4">Action Items</h5>
                    <ul className="space-y-3">
                      {currentContent.actionItems.map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{item}</span>
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
                    <span>Export Analysis</span>
                  </motion.button>

                  <motion.button
                    className="border border-gold-500/50 text-gold-400 px-6 py-3 rounded-xl font-semibold hover:bg-gold-500/10 transition-all duration-300 flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>Generate Follow-up</span>
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
              <Mic className="w-16 h-16 text-gold-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Select a Transcript</h3>
              <p className="text-gray-300">Choose a conversation to view the full transcript and AI analysis</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AITranscription; 