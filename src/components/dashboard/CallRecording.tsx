import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Headphones, 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Square, 
  Download, 
  MoreHorizontal,
  Phone,
  Clock,
  Volume2,
  Filter,
  Calendar,
  Star,
  TrendingUp,
  BarChart3,
  User,
  Brain,
  Target,
  Heart,
  Zap,
  Search,
  Settings
} from 'lucide-react';

const CallRecording: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedCall, setSelectedCall] = useState<number | null>(1);

  const calls = [
    {
      id: 1,
      prospect: 'Sarah Chen',
      company: 'TechFlow Dynamics',
      duration: '18:23',
      status: 'completed',
      outcome: 'Meeting Scheduled',
      sentiment: 'positive',
      date: '2024-01-15',
      time: '10:30 AM',
      score: 92,
      tags: ['Follow-up', 'Interested', 'Budget Confirmed']
    },
    {
      id: 2,
      prospect: 'Michael Rodriguez',
      company: 'DataVault Systems',
      duration: '12:45',
      status: 'completed',
      outcome: 'Proposal Requested',
      sentiment: 'neutral',
      date: '2024-01-15',
      time: '2:15 PM',
      score: 78,
      tags: ['Decision Maker', 'Q2 Timeline']
    },
    {
      id: 3,
      prospect: 'Emily Foster',
      company: 'GrowthLab Inc',
      duration: '25:18',
      status: 'completed',
      outcome: 'No Immediate Need',
      sentiment: 'neutral',
      date: '2024-01-14',
      time: '11:00 AM',
      score: 45,
      tags: ['Not Ready', 'Future Opportunity']
    }
  ];

  const currentCall = selectedCall ? calls.find(c => c.id === selectedCall) : null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8">
      {/* Header with Recording Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/40 backdrop-blur-xl border border-gold-500/20 rounded-3xl p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">AI Call Recording & Analysis</h2>
            <p className="text-gray-300">Record, analyze, and improve your sales conversations with AI insights</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {isRecording ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-red-500/20 border border-red-500/50 rounded-xl px-4 py-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-3"></div>
                  <span className="text-red-400 font-semibold">{formatTime(recordingTime)}</span>
                </div>
                <motion.button
                  onClick={() => setIsRecording(false)}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Square className="w-5 h-5" />
                  <span>Stop Recording</span>
                </motion.button>
              </div>
            ) : (
              <motion.button
                onClick={() => setIsRecording(true)}
                className="bg-gold-gradient text-black px-6 py-3 rounded-xl font-semibold hover:shadow-gold transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mic className="w-5 h-5" />
                <span>Start Recording</span>
              </motion.button>
            )}

            <motion.button
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Settings className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Call History */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-black/40 backdrop-blur-xl border border-gold-500/20 rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center">
              <Phone className="w-6 h-6 text-gold-400 mr-3" />
              Call History
            </h3>
            <motion.button
              className="text-gray-400 hover:text-gold-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Filter className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="space-y-4">
            {calls.map((call, index) => (
              <motion.div
                key={call.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                onClick={() => setSelectedCall(call.id)}
                className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border ${
                  selectedCall === call.id
                    ? 'bg-gold-500/20 border-gold-500/50'
                    : 'bg-black/60 border-gold-500/10 hover:border-gold-500/30'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-semibold">{call.prospect}</h4>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 text-sm">{call.score}</span>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-2">{call.company}</p>
                
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-gray-400">Duration: {call.duration}</span>
                  <span className={`px-2 py-1 rounded-lg font-semibold ${
                    call.sentiment === 'positive' ? 'bg-green-500/20 text-green-400' :
                    call.sentiment === 'negative' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {call.outcome}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {call.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span key={tagIndex} className="bg-gold-500/20 text-gold-400 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call Player & Analysis */}
        <div className="lg:col-span-2 space-y-8">
          {currentCall ? (
            <>
              {/* Audio Player */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-black/40 backdrop-blur-xl border border-gold-500/20 rounded-3xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">{currentCall.prospect}</h3>
                    <p className="text-gray-300">{currentCall.company} • {currentCall.date} at {currentCall.time}</p>
                  </div>
                  <motion.button
                    className="text-gray-400 hover:text-gold-400 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Download className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Audio Controls */}
                <div className="bg-black/60 rounded-xl p-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <motion.button
                      className="bg-gold-gradient text-black p-3 rounded-full hover:shadow-gold transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Play className="w-6 h-6" />
                    </motion.button>
                    
                    <div className="flex-1 bg-gray-800 rounded-full h-2 relative">
                      <div className="bg-gold-gradient h-2 rounded-full w-1/3"></div>
                      <div className="absolute top-1/2 left-1/3 transform -translate-y-1/2 w-4 h-4 bg-gold-400 rounded-full border-2 border-black"></div>
                    </div>
                    
                    <span className="text-gray-400 text-sm">6:12 / {currentCall.duration}</span>
                    
                    <motion.button
                      className="text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Volume2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Call Analysis */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-black/40 backdrop-blur-xl border border-gold-500/20 rounded-3xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Brain className="w-6 h-6 text-gold-400 mr-3" />
                  AI Call Analysis
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">{currentCall.score}</div>
                    <div className="text-gray-400 text-sm">Overall Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">67%</div>
                    <div className="text-gray-400 text-sm">Talk Ratio</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">4</div>
                    <div className="text-gray-400 text-sm">Questions Asked</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gold-400 mb-4">Key Moments</h4>
                    <div className="space-y-3">
                      <div className="bg-black/60 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-green-400 font-semibold">Budget Confirmed</span>
                          <span className="text-gray-400 text-sm">8:45</span>
                        </div>
                        <p className="text-gray-300 text-sm">"We have allocated $50K for this quarter"</p>
                      </div>
                      <div className="bg-black/60 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-blue-400 font-semibold">Pain Point Identified</span>
                          <span className="text-gray-400 text-sm">12:30</span>
                        </div>
                        <p className="text-gray-300 text-sm">"Our current process takes too much manual work"</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gold-400 mb-4">Sentiment Analysis</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-300">Positive</span>
                          <span className="text-green-400 font-semibold">65%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div className="bg-green-400 h-2 rounded-full w-[65%]"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-300">Neutral</span>
                          <span className="text-yellow-400 font-semibold">30%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div className="bg-yellow-400 h-2 rounded-full w-[30%]"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-300">Negative</span>
                          <span className="text-red-400 font-semibold">5%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div className="bg-red-400 h-2 rounded-full w-[5%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gold-500/20">
                  <h4 className="text-lg font-semibold text-gold-400 mb-4">AI Recommendations</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                      <h5 className="text-green-400 font-semibold mb-2">Strengths</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Excellent rapport building</li>
                        <li>• Clear value proposition</li>
                        <li>• Good discovery questions</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                      <h5 className="text-yellow-400 font-semibold mb-2">Improvements</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Ask more qualifying questions</li>
                        <li>• Handle objections earlier</li>
                        <li>• Stronger call-to-action</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-black/40 backdrop-blur-xl border border-gold-500/20 rounded-3xl p-12 text-center"
            >
              <Headphones className="w-16 h-16 text-gold-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Select a Call</h3>
              <p className="text-gray-300">Choose a recorded call to view analysis and insights</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallRecording; 