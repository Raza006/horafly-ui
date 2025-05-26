import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Download, 
  MapPin, 
  Building, 
  Users, 
  Mail, 
  Phone, 
  Globe, 
  TrendingUp,
  Clock,
  Star,
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  Trash2,
  Loader,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { scrapingService, type SearchCriteria, type ScrapingJob, type Lead } from '../../services/scrapingService';

const LeadScraping: React.FC = () => {
  const { currentUser } = useAuth();
  
  // State management
  const [jobs, setJobs] = useState<ScrapingJob[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isStartingJob, setIsStartingJob] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  // Form state
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    country: 'United States',
    city: '',
    province: '',
    keywords: '',
    quantity: 10
  });
  const [jobName, setJobName] = useState('');
  const [showLocationDetails, setShowLocationDetails] = useState(false);

  // Countries list
  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 
    'France', 'Spain', 'Italy', 'Netherlands', 'Sweden', 'Norway', 'Denmark'
  ];

  // Load data on component mount and set up polling
  useEffect(() => {
    if (currentUser) {
      loadData();
      const interval = setInterval(loadData, 5000); // Poll every 5 seconds
      return () => clearInterval(interval);
    }
  }, [currentUser]);

  // Auto-dismiss messages
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const loadData = async () => {
    if (!currentUser) return;
    
    try {
      console.log('🔄 Loading lead scraping data...');
      const [jobsData, leadsData] = await Promise.all([
        scrapingService.getUserJobs(currentUser.id),
        scrapingService.getUserLeads(currentUser.id, 1000)
      ]);
      
      console.log('✅ Data loaded successfully:', { jobs: jobsData.length, leads: leadsData.length });
      setJobs(jobsData);
      setLeads(leadsData);
    } catch (err) {
      console.error('❌ Failed to load data:', err);
      
      // Check if it's a database table issue
      if (err instanceof Error && (
        err.message.includes('relation') || 
        err.message.includes('table') || 
        err.message.includes('does not exist')
      )) {
        setError('Database tables not found. Please run the database migration first.');
      } else {
        setError('Failed to load data. Using offline mode.');
      }
      
      // Set empty arrays as fallback
      setJobs([]);
      setLeads([]);
    } finally {
      console.log('🏁 Loading complete, setting isLoading to false');
      setIsLoading(false);
    }
  };

  const handleCountryChange = (country: string) => {
    setSearchCriteria(prev => ({ ...prev, country, city: '', province: '' }));
    setShowLocationDetails(true);
  };

  const handleStartScraping = async () => {
    if (!currentUser || !jobName.trim() || !searchCriteria.keywords.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    setIsStartingJob(true);
    try {
      await scrapingService.startScrapingJob(currentUser.id, searchCriteria, jobName);
      setSuccess(`Started scraping job: ${jobName}`);
      setJobName('');
      setSearchCriteria({
        country: 'United States',
        city: '',
        province: '',
        keywords: '',
        quantity: 10
      });
      setShowLocationDetails(false);
      loadData();
    } catch (err) {
      setError('Failed to start scraping job');
    } finally {
      setIsStartingJob(false);
    }
  };

  const handlePauseJob = async (jobId: string) => {
    try {
      await scrapingService.pauseJob(jobId);
      setSuccess('Job paused successfully');
      loadData();
    } catch (err) {
      setError('Failed to pause job');
    }
  };

  const handleResumeJob = async (jobId: string) => {
    try {
      await scrapingService.resumeJob(jobId);
      setSuccess('Job resumed successfully');
      loadData();
    } catch (err) {
      setError('Failed to resume job');
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!window.confirm('Are you sure you want to delete this job and all its leads?')) return;
    
    try {
      await scrapingService.deleteJob(jobId);
      setSuccess('Job deleted successfully');
      loadData();
    } catch (err) {
      setError('Failed to delete job');
    }
  };

  const handleExportLeads = async (jobName?: string) => {
    try {
      const csvData = await scrapingService.exportLeads(currentUser!.id, 'csv');
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leads-${jobName || 'all'}-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setSuccess('Leads exported successfully');
    } catch (err) {
      setError('Failed to export leads');
    }
  };

  const toggleFolder = (jobName: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(jobName)) {
      newExpanded.delete(jobName);
    } else {
      newExpanded.add(jobName);
    }
    setExpandedFolders(newExpanded);
  };

  const getJobLeads = (jobName: string) => {
    return leads.filter(lead => {
      const job = jobs.find(j => j.name === jobName);
      return job && lead.scraped_at >= job.created_at;
    });
  };

  const deleteLead = async (leadId: string) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    
    try {
      await scrapingService.deleteLead(leadId);
      setSuccess('Lead deleted successfully');
      loadData();
    } catch (err) {
      setError('Failed to delete lead');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="w-8 h-8 animate-spin text-gold-400" />
        <span className="ml-3 text-white">Loading lead scraping data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Success/Error Messages */}
      <AnimatePresence>
        {(error || success) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-4 rounded-xl ${
              error ? 'bg-red-500/20 border border-red-500/30 text-red-400' : 
              'bg-green-500/20 border border-green-500/30 text-green-400'
            }`}
          >
            {error || success}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/40 backdrop-blur-xl border border-gold-500/20 rounded-3xl p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Google Maps Lead Scraper</h2>
            <p className="text-gray-300">Extract business leads directly from Google Maps with precision targeting</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-black/60 px-4 py-2 rounded-xl border border-gold-500/30">
              <span className="text-gray-400 text-sm">Target Platform:</span>
              <span className="text-gold-400 font-semibold ml-2">Google Maps</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-black/40 backdrop-blur-xl border border-gold-500/20 rounded-3xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <Search className="w-6 h-6 text-gold-400 mr-3" />
          New Scraping Campaign
        </h3>

        <div className="space-y-6">
          {/* Job Name */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Campaign Name</label>
            <input
              type="text"
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
              placeholder="e.g., US-Wyoming-Restaurants"
              className="w-full bg-black/60 border border-gold-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Country Selection */}
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">Country</label>
              <select 
                value={searchCriteria.country}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="w-full bg-black/60 border border-gold-500/30 rounded-xl px-4 py-3 text-white focus:border-gold-500 focus:outline-none"
              >
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            {/* City (conditional) */}
            <AnimatePresence>
              {showLocationDetails && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <label className="block text-gray-300 text-sm font-semibold mb-2">City (Optional)</label>
                  <input
                    type="text"
                    value={searchCriteria.city}
                    onChange={(e) => setSearchCriteria(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="e.g., New York"
                    className="w-full bg-black/60 border border-gold-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-gold-500 focus:outline-none"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Province/State (conditional) */}
            <AnimatePresence>
              {showLocationDetails && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-gray-300 text-sm font-semibold mb-2">State/Province (Optional)</label>
                  <input
                    type="text"
                    value={searchCriteria.province}
                    onChange={(e) => setSearchCriteria(prev => ({ ...prev, province: e.target.value }))}
                    placeholder="e.g., California"
                    className="w-full bg-black/60 border border-gold-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-gold-500 focus:outline-none"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Keywords */}
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">Business Keywords</label>
              <input
                type="text"
                value={searchCriteria.keywords}
                onChange={(e) => setSearchCriteria(prev => ({ ...prev, keywords: e.target.value }))}
                placeholder="e.g., restaurants, dentists, gyms"
                className="w-full bg-black/60 border border-gold-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-gold-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Quantity */}
          <div className="w-full md:w-1/4">
            <label className="block text-gray-300 text-sm font-semibold mb-2">Number of Leads</label>
            <select
              value={searchCriteria.quantity}
              onChange={(e) => setSearchCriteria(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
              className="w-full bg-black/60 border border-gold-500/30 rounded-xl px-4 py-3 text-white focus:border-gold-500 focus:outline-none"
            >
              <option value={10}>10 leads</option>
              <option value={25}>25 leads</option>
              <option value={50}>50 leads</option>
              <option value={100}>100 leads</option>
              <option value={250}>250 leads</option>
              <option value={500}>500 leads</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={handleStartScraping}
              disabled={isStartingJob || !jobName.trim() || !searchCriteria.keywords.trim()}
              className="bg-gold-gradient text-black px-8 py-3 rounded-xl font-semibold hover:shadow-gold transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isStartingJob ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Starting...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Start Scraping</span>
                </>
              )}
            </motion.button>

            <motion.button
              onClick={() => {
                setSearchCriteria({
                  country: 'United States',
                  city: '',
                  province: '',
                  keywords: '',
                  quantity: 10
                });
                setJobName('');
                setShowLocationDetails(false);
              }}
              className="border border-gold-500/50 text-gold-400 px-6 py-3 rounded-xl font-semibold hover:bg-gold-500/10 transition-all duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-5 h-5" />
              <span>Reset</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Active Jobs */}
      {jobs.filter(job => job.status === 'active' || job.status === 'queued').length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-black/40 backdrop-blur-xl border border-gold-500/20 rounded-3xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 text-gold-400 mr-3" />
            Active Scraping Jobs
          </h3>

          <div className="space-y-4">
            {jobs.filter(job => job.status === 'active' || job.status === 'queued').map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-black/60 rounded-2xl p-6 border border-gold-500/10 hover:border-gold-500/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white">{job.name}</h4>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <Building className="w-4 h-4 mr-1" />
                        {job.industry}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      job.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      job.status === 'queued' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {job.status}
                    </div>
                    <div className="text-white font-bold text-lg mt-1">{job.leads_found}</div>
                    <div className="text-gray-400 text-sm">leads found</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-300">Progress</span>
                    <span className="text-gold-400 font-semibold">{job.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <motion.div
                      className="h-2 bg-gold-gradient rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${job.progress}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {job.time_remaining}
                  </div>
                  <div className="flex items-center space-x-2">
                    {job.status === 'active' && (
                      <motion.button
                        onClick={() => handlePauseJob(job.id)}
                        className="text-yellow-400 hover:text-yellow-300 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Pause className="w-5 h-5" />
                      </motion.button>
                    )}
                    {job.status === 'paused' && (
                      <motion.button
                        onClick={() => handleResumeJob(job.id)}
                        className="text-green-400 hover:text-green-300 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Play className="w-5 h-5" />
                      </motion.button>
                    )}
                    <motion.button
                      onClick={() => handleDeleteJob(job.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Results - Folder System */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-black/40 backdrop-blur-xl border border-gold-500/20 rounded-3xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center">
            <Users className="w-6 h-6 text-gold-400 mr-3" />
            Scraping Results
          </h3>
          <motion.button
            onClick={() => handleExportLeads()}
            className="border border-gold-500/50 text-gold-400 px-4 py-2 rounded-xl font-semibold text-sm hover:bg-gold-500/10 transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4" />
            <span>Export All</span>
          </motion.button>
        </div>

        {jobs.filter(job => job.status === 'completed').length === 0 ? (
          <div className="text-center py-12">
            <Folder className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No completed scraping jobs yet</p>
            <p className="text-gray-500 text-sm">Start a new scraping campaign to see results here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.filter(job => job.status === 'completed').map((job) => {
              const jobLeads = getJobLeads(job.name);
              const isExpanded = expandedFolders.has(job.name);
              
              return (
                <div key={job.id} className="border border-gold-500/10 rounded-2xl overflow-hidden">
                  {/* Folder Header */}
                  <motion.div
                    onClick={() => toggleFolder(job.name)}
                    className="bg-black/60 p-4 cursor-pointer hover:bg-black/80 transition-all duration-300 flex items-center justify-between"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center space-x-3">
                      {isExpanded ? (
                        <FolderOpen className="w-6 h-6 text-gold-400" />
                      ) : (
                        <Folder className="w-6 h-6 text-gold-400" />
                      )}
                      <div>
                        <h4 className="text-white font-semibold">{job.name}</h4>
                        <p className="text-gray-400 text-sm">{jobLeads.length} leads • {job.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExportLeads(job.name);
                        }}
                        className="text-gold-400 hover:text-gold-300 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Download className="w-5 h-5" />
                      </motion.button>
                      
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </motion.div>

                  {/* Folder Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-black/40"
                      >
                        <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                          {jobLeads.map((lead) => (
                            <motion.div
                              key={lead.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-black/60 rounded-xl p-4 border border-gold-500/10 hover:border-gold-500/30 transition-all duration-300"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-start justify-between mb-3">
                                    <div>
                                      <h5 className="text-white font-semibold">{lead.company}</h5>
                                      <p className="text-gold-400 text-sm">{lead.title}</p>
                                      <p className="text-gray-300 text-sm">{lead.name}</p>
                                    </div>
                                    <div className="flex items-center bg-green-500/20 text-green-400 px-2 py-1 rounded-lg text-xs font-semibold">
                                      <Star className="w-3 h-3 mr-1" />
                                      {lead.confidence}%
                                    </div>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <div className="flex items-center text-gray-400 text-sm">
                                        <Mail className="w-4 h-4 mr-2" />
                                        {lead.email}
                                      </div>
                                      <div className="flex items-center text-gray-400 text-sm">
                                        <Phone className="w-4 h-4 mr-2" />
                                        {lead.phone}
                                      </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                      <div className="flex items-center text-gray-400 text-sm">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        {lead.location}
                                      </div>
                                      <div className="flex items-center text-gray-400 text-sm">
                                        <Globe className="w-4 h-4 mr-2" />
                                        {lead.source}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                <motion.button
                                  onClick={() => deleteLead(lead.id)}
                                  className="text-red-400 hover:text-red-300 transition-colors ml-4"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </motion.button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default LeadScraping; 