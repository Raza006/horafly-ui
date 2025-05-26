import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Plus, 
  Copy, 
  Edit, 
  Star, 
  Search,
  Filter,
  Download,
  Send,
  Bot,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Clock,
  CheckCircle
} from 'lucide-react';

const OutreachScripts: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedScript, setSelectedScript] = useState<number | null>(1);

  const categories = ['All Scripts', 'Cold Outreach', 'Follow-up', 'Discovery', 'Closing', 'Objection Handling'];

  const scripts = [
    {
      id: 1,
      title: 'Tech VP Cold Outreach',
      category: 'Cold Outreach',
      industry: 'Technology',
      useCount: 47,
      successRate: 32,
      lastUsed: '2 hours ago',
      content: `Hi {{firstName}},

I noticed your recent LinkedIn post about {{painPoint}} - something many {{title}}s are struggling with right now.

I work with companies like {{companyName}} who've recently {{recentNews}}. We've helped similar {{industry}} companies {{valueProposition}}.

Given {{companyName}}'s {{specificSituation}}, I'd love to share how we helped {{similarCompany}} {{specificResult}}.

Would you be open to a brief 15-minute conversation this week? I can share the specific playbook we used.

Best regards,
{{senderName}}`,
      variables: ['firstName', 'painPoint', 'title', 'companyName', 'recentNews', 'industry', 'valueProposition', 'specificSituation', 'similarCompany', 'specificResult', 'senderName']
    },
    {
      id: 2,
      title: 'Meeting Follow-up',
      category: 'Follow-up',
      industry: 'All Industries',
      useCount: 89,
      successRate: 68,
      lastUsed: '1 day ago',
      content: `Hi {{firstName}},

Thanks for taking the time to chat yesterday about {{discussionTopic}}. I really enjoyed our conversation about {{specificPoint}}.

As promised, I'm attaching {{resource}} that addresses the {{challenge}} we discussed. I think you'll find the section on {{relevantSection}} particularly relevant to {{companyName}}'s situation.

I'd love to continue our conversation about {{nextSteps}}. Are you available for a quick call {{proposedTime}}?

Looking forward to hearing from you!

Best,
{{senderName}}`,
      variables: ['firstName', 'discussionTopic', 'specificPoint', 'resource', 'challenge', 'relevantSection', 'companyName', 'nextSteps', 'proposedTime', 'senderName']
    },
    {
      id: 3,
      title: 'Discovery Questions Script',
      category: 'Discovery',
      industry: 'SaaS',
      useCount: 156,
      successRate: 78,
      lastUsed: '3 hours ago',
      content: `Discovery Call Script for {{prospectName}}

**Opening (2 minutes)**
- Thank them for their time
- Confirm agenda and time allocation
- Set expectations for next steps

**Current State Questions (10 minutes)**
1. Tell me about your current {{processArea}} workflow
2. What tools are you currently using for {{specificFunction}}?
3. How many people are involved in this process?
4. What's working well with your current setup?

**Pain Point Exploration (8 minutes)**
1. What challenges are you facing with {{currentSolution}}?
2. How is this impacting {{businessMetric}}?
3. What have you tried to solve this problem?
4. If you could wave a magic wand, what would the ideal solution look like?

**Decision Process (5 minutes)**
1. Who else would be involved in evaluating a solution like this?
2. What's your typical timeline for making decisions like this?
3. What criteria are most important in your evaluation?

**Closing (5 minutes)**
- Summarize key points
- Confirm pain points and priorities
- Outline next steps
- Schedule follow-up`,
      variables: ['prospectName', 'processArea', 'specificFunction', 'currentSolution', 'businessMetric']
    }
  ];

  const currentScript = selectedScript ? scripts.find(s => s.id === selectedScript) : null;

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
            <h2 className="text-2xl font-bold text-white mb-2">Smart Outreach Scripts</h2>
            <p className="text-gray-300">AI-powered, personalized messaging templates for every sales scenario</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.button
              className="bg-gold-gradient text-black px-6 py-3 rounded-xl font-semibold hover:shadow-gold transition-all duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bot className="w-5 h-5" />
              <span>Generate Script</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Script Library */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-black/40 backdrop-blur-xl border border-gold-500/20 rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center">
              <FileText className="w-6 h-6 text-gold-400 mr-3" />
              Script Library
            </h3>
            <motion.button
              className="text-gold-400 hover:text-gold-300 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Plus className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-black/60 border border-gold-500/30 rounded-xl px-4 py-3 text-white focus:border-gold-500 focus:outline-none"
            >
              {categories.map((category, index) => (
                <option key={index} value={category.toLowerCase().replace(' ', '-')}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Scripts List */}
          <div className="space-y-4">
            {scripts.map((script, index) => (
              <motion.div
                key={script.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                onClick={() => setSelectedScript(script.id)}
                className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border ${
                  selectedScript === script.id
                    ? 'bg-gold-500/20 border-gold-500/50'
                    : 'bg-black/60 border-gold-500/10 hover:border-gold-500/30'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-white font-semibold">{script.title}</h4>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 text-sm">{script.successRate}%</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Category</span>
                    <span className="text-gold-400 font-medium">{script.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Industry</span>
                    <span className="text-white">{script.industry}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Uses</span>
                    <span className="text-white font-semibold">{script.useCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Last Used</span>
                    <span className="text-gray-300">{script.lastUsed}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Script Editor */}
        <div className="lg:col-span-2 space-y-8">
          {currentScript ? (
            <>
              {/* Script Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-black/40 backdrop-blur-xl border border-gold-500/20 rounded-3xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{currentScript.title}</h3>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="bg-gold-500/20 text-gold-400 px-3 py-1 rounded-lg text-sm font-semibold">
                        {currentScript.category}
                      </span>
                      <span className="text-gray-400 text-sm">{currentScript.industry}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <motion.button
                      className="text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Edit className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      className="text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Copy className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      className="text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Download className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{currentScript.successRate}%</div>
                    <div className="text-gray-400 text-sm">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{currentScript.useCount}</div>
                    <div className="text-gray-400 text-sm">Times Used</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{currentScript.variables.length}</div>
                    <div className="text-gray-400 text-sm">Variables</div>
                  </div>
                </div>
              </motion.div>

              {/* Script Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-black/40 backdrop-blur-xl border border-gold-500/20 rounded-3xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-bold text-white">Script Content</h4>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      className="bg-gold-gradient text-black px-4 py-2 rounded-xl font-semibold text-sm hover:shadow-gold transition-all duration-300 flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Personalize</span>
                    </motion.button>
                  </div>
                </div>

                <div className="bg-black/60 border border-gold-500/10 rounded-xl p-6">
                  <pre className="text-gray-300 whitespace-pre-wrap leading-relaxed font-mono text-sm">
                    {currentScript.content}
                  </pre>
                </div>

                <div className="flex items-center space-x-4 mt-6">
                  <motion.button
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </motion.button>

                  <motion.button
                    className="border border-gold-500/50 text-gold-400 px-6 py-3 rounded-xl font-semibold hover:bg-gold-500/10 transition-all duration-300 flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Copy className="w-5 h-5" />
                    <span>Copy Script</span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Variables Panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-black/40 backdrop-blur-xl border border-gold-500/20 rounded-3xl p-6"
              >
                <h4 className="text-lg font-bold text-white mb-6 flex items-center">
                  <Target className="w-6 h-6 text-gold-400 mr-3" />
                  Variable Personalization
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentScript.variables.map((variable, index) => (
                    <motion.div
                      key={variable}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="space-y-2"
                    >
                      <label className="block text-gray-300 text-sm font-semibold capitalize">
                        {variable.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        type="text"
                        placeholder={`Enter ${variable.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}`}
                        className="w-full bg-black/60 border border-gold-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-gold-500 focus:outline-none"
                      />
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Apply Personalization</span>
                </motion.button>
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-black/40 backdrop-blur-xl border border-gold-500/20 rounded-3xl p-12 text-center"
            >
              <FileText className="w-16 h-16 text-gold-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Select a Script</h3>
              <p className="text-gray-300">Choose a script from the library to view and customize</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutreachScripts; 