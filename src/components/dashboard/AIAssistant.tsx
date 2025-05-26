import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Star, 
  Clock, 
  TrendingUp, 
  Target, 
  Lightbulb,
  MessageSquare,
  User,
  Crown,
  Zap,
  BookOpen,
  Brain
} from 'lucide-react';

const AIAssistant: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [activeConversation, setActiveConversation] = useState(1);

  const conversations = [
    { id: 1, title: 'Sarah Chen - Outreach Strategy', time: '2 hours ago', status: 'active' },
    { id: 2, title: 'Michael Rodriguez - Follow-up Plan', time: '1 day ago', status: 'completed' },
    { id: 3, title: 'Emily Foster - Discovery Questions', time: '2 days ago', status: 'completed' },
  ];

  const chatHistory = [
    {
      id: 1,
      type: 'user',
      message: 'I need help crafting an outreach message for Sarah Chen, VP of Engineering at TechFlow Dynamics. She recently posted about hiring challenges.',
      time: '10:30 AM',
    },
    {
      id: 2,
      type: 'ai',
      message: "Perfect! I've analyzed Sarah's recent LinkedIn activity and company intel. Here's my recommended approach:\n\n**Opening Hook:**\n\"Hi Sarah, I noticed your recent post about the challenges of scaling engineering teams in today's market - something many VPs are struggling with right now.\"\n\n**Value Proposition:**\n\"I work with companies like yours who've just secured Series B funding and are rapidly expanding their tech teams. We've helped similar companies reduce their hiring timeline by 40% while improving candidate quality.\"\n\n**Specific Relevance:**\n\"Given TechFlow's recent $25M raise and your 5 open engineering positions, I'd love to share how we helped another SaaS company in SF scale from 200 to 400 engineers in 18 months.\"\n\n**Call to Action:**\n\"Would you be open to a brief 15-minute conversation this week? I can share the specific playbook we used.\"\n\nThis approach references her pain point, acknowledges the funding news, and offers concrete value. Would you like me to adjust the tone or focus?",
      time: '10:31 AM',
    },
    {
      id: 3,
      type: 'user',
      message: 'That\'s great! Can you make it more casual and mention that we have mutual connections in the SF tech scene?',
      time: '10:35 AM',
    },
    {
      id: 4,
      type: 'ai',
      message: "Absolutely! Here's a more casual version:\n\n**Revised Message:**\n\n\"Hey Sarah!\n\nJust saw your post about the hiring crunch - totally feel you on that one! 😅\n\nI work with a bunch of engineering leaders in the SF tech scene (pretty sure we have some mutual connections through the usual suspects at GitHub and Stripe), and this topic keeps coming up in every conversation.\n\nSince TechFlow just raised that awesome Series B, I'm guessing you're probably in full hiring mode. I've been helping companies in similar spots navigate this crazy market - just helped another SaaS company here scale their eng team from 200 to 400 people without completely losing their minds.\n\nWould you be up for a quick coffee chat sometime this week? I can share what's actually working right now (spoiler: it's not what most people think).\n\nCheers,\n[Your name]\"\n\n**Key improvements:**\n- More conversational tone\n- Emoji for warmth\n- References mutual connections\n- Uses \"coffee chat\" instead of formal meeting\n- Adds intrigue with the spoiler teaser\n\nThis feels much more natural and SF tech scene appropriate!",
      time: '10:36 AM',
    }
  ];

  const suggestions = [
    { icon: Target, text: 'Help me identify pain points for this prospect', category: 'Research' },
    { icon: Lightbulb, text: 'Generate discovery questions for my next call', category: 'Preparation' },
    { icon: TrendingUp, text: 'What\'s my best approach for this industry?', category: 'Strategy' },
    { icon: Star, text: 'Review my last call and provide feedback', category: 'Coaching' },
  ];

  const quickActions = [
    { title: 'Objection Handler', description: 'Get responses to common objections', icon: MessageSquare },
    { title: 'Closing Techniques', description: 'AI-powered closing suggestions', icon: Target },
    { title: 'Email Templates', description: 'Generate personalized emails', icon: Bot },
    { title: 'Call Scripts', description: 'Dynamic conversation flows', icon: BookOpen },
  ];

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
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
              <Crown className="w-8 h-8 text-gold-400 mr-3" />
              AI Sales Coach
            </h2>
            <p className="text-gray-300">Your personal AI sales expert available 24/7 for strategic guidance and coaching</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl text-sm font-semibold flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>AI Online</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Conversation Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-black/40 backdrop-blur-xl border border-gold-500/20 rounded-3xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <MessageSquare className="w-6 h-6 text-gold-400 mr-3" />
            Conversations
          </h3>

          <div className="space-y-4">
            {conversations.map((conv, index) => (
              <motion.div
                key={conv.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                onClick={() => setActiveConversation(conv.id)}
                className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border ${
                  activeConversation === conv.id
                    ? 'bg-gold-500/20 border-gold-500/50'
                    : 'bg-black/60 border-gold-500/10 hover:border-gold-500/30'
                }`}
              >
                <h4 className="text-white font-semibold text-sm mb-2">{conv.title}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">{conv.time}</span>
                  <div className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                    conv.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {conv.status}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            className="w-full mt-6 bg-gold-gradient text-black py-3 rounded-xl font-semibold hover:shadow-gold transition-all duration-300 flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Bot className="w-5 h-5" />
            <span>New Chat</span>
          </motion.button>
        </motion.div>

        {/* Main Chat Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chat Messages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black/40 backdrop-blur-xl border border-gold-500/20 rounded-3xl p-6 h-96 overflow-y-auto"
          >
            <div className="space-y-6">
              {chatHistory.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-center mb-2 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        msg.type === 'user' ? 'bg-gold-gradient order-2 ml-3 mr-0' : 'bg-purple-500/20 order-1'
                      }`}>
                        {msg.type === 'user' ? 
                          <User className="w-4 h-4 text-black" /> : 
                          <Bot className="w-4 h-4 text-purple-400" />
                        }
                      </div>
                      <span className="text-xs text-gray-400">{msg.time}</span>
                    </div>
                    <div className={`p-4 rounded-2xl ${
                      msg.type === 'user' 
                        ? 'bg-gold-gradient text-black' 
                        : 'bg-black/60 border border-purple-500/20 text-white'
                    }`}>
                      <p className="whitespace-pre-line text-sm leading-relaxed">{msg.message}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Message Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-black/40 backdrop-blur-xl border border-gold-500/20 rounded-3xl p-6"
          >
            <div className="flex items-end space-x-4">
              <div className="flex-1">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask your AI sales coach anything..."
                  className="w-full bg-black/60 border border-gold-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-gold-500 focus:outline-none resize-none"
                  rows={3}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <motion.button
                  onClick={() => setIsListening(!isListening)}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    isListening 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-gray-800 hover:bg-gray-700 text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </motion.button>
                <motion.button
                  className="bg-gold-gradient text-black p-3 rounded-xl hover:shadow-gold transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Quick Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-black/40 backdrop-blur-xl border border-gold-500/20 rounded-3xl p-6"
          >
            <h4 className="text-lg font-bold text-white mb-4">Quick Suggestions</h4>
            <div className="grid grid-cols-2 gap-4">
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="p-4 bg-black/60 border border-gold-500/10 rounded-xl hover:border-gold-500/30 transition-all duration-300 text-left group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <suggestion.icon className="w-6 h-6 text-gold-400 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-white text-sm font-semibold mb-1">{suggestion.text}</p>
                  <span className="text-gray-400 text-xs">{suggestion.category}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-black/40 backdrop-blur-xl border border-gold-500/20 rounded-3xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Zap className="w-6 h-6 text-gold-400 mr-3" />
            Quick Actions
          </h3>

          <div className="space-y-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="w-full p-4 bg-black/60 border border-gold-500/10 rounded-2xl hover:border-gold-500/30 transition-all duration-300 text-left group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center mb-3">
                  <action.icon className="w-6 h-6 text-gold-400 mr-3 group-hover:scale-110 transition-transform" />
                  <h4 className="text-white font-semibold">{action.title}</h4>
                </div>
                <p className="text-gray-400 text-sm">{action.description}</p>
              </motion.button>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gradient-to-br from-gold-500/10 to-gold-600/20 border border-gold-500/30 rounded-2xl">
            <div className="flex items-center mb-3">
              <Brain className="w-6 h-6 text-gold-400 mr-3" />
              <h4 className="text-white font-semibold">AI Coach Stats</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Questions Answered</span>
                <span className="text-white font-semibold">247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Success Rate</span>
                <span className="text-green-400 font-semibold">94%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Response Time</span>
                <span className="text-blue-400 font-semibold">&lt; 2s</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIAssistant; 