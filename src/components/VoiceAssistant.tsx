import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, Settings, MessageCircle, Zap, X, LogOut } from 'lucide-react';
import ChatHistory from './ChatHistory';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI voice assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const { currentUser, logout } = useAuth();

  // Simulate voice level animation
  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setCurrentLevel(Math.random() * 100);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isListening]);

  const handleVoiceToggle = () => {
    if (isListening) {
      setIsListening(false);
      setIsProcessing(true);
      
      // Add user message
      const userMessage: Message = {
        id: Date.now(),
        text: "This is a sample user message from voice input",
        isUser: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      
      // Simulate processing
      setTimeout(() => {
        setIsProcessing(false);
        const assistantMessage: Message = {
          id: Date.now() + 1,
          text: "I heard what you said! This is a demo response from your AI assistant.",
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      }, 2000);
    } else {
      setIsListening(true);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 p-6 flex justify-between items-center"
      >
        <div className="flex items-center space-x-3">
          <motion.div 
            className="w-10 h-10 voice-gradient rounded-xl flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Zap className="w-6 h-6 text-white" />
          </motion.div>
          <div>
                            <h1 className="text-2xl font-bold voice-gradient-text">Horafly Intel Pro</h1>
            <p className="text-sm text-gray-400">Welcome, {currentUser?.displayName || currentUser?.email}</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <motion.button 
            onClick={() => setShowChat(!showChat)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`glass-effect rounded-xl p-3 transition-all duration-300 ${
              showChat ? 'bg-voice-primary bg-opacity-30' : 'hover:bg-white hover:bg-opacity-20'
            }`}
          >
            {showChat ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="glass-effect rounded-xl p-3 hover:bg-white hover:bg-opacity-20 transition-all duration-300"
          >
            <Settings className="w-6 h-6" />
          </motion.button>
          <motion.button 
            onClick={handleLogout}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="glass-effect rounded-xl p-3 hover:bg-red-500 hover:bg-opacity-20 transition-all duration-300"
            title="Logout"
          >
            <LogOut className="w-6 h-6" />
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6">
        
        {/* Voice Visualizer */}
        <motion.div 
          className="relative mb-12"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          {/* Outer Rings */}
          <AnimatePresence>
            {isListening && (
              <>
                <motion.div
                  className="absolute inset-0 w-80 h-80 border-2 border-cyan-400 rounded-full opacity-30"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: [0.8, 1.2, 0.8], 
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute inset-0 w-80 h-80 border-2 border-purple-400 rounded-full opacity-20"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ 
                    scale: [0.9, 1.3, 0.9], 
                    opacity: [0, 0.2, 0],
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </>
            )}
          </AnimatePresence>

          {/* Voice Level Bars */}
          <div className="absolute inset-0 w-80 h-80 flex items-center justify-center">
            <div className="flex space-x-1">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gradient-to-t from-cyan-400 to-purple-400 rounded-full"
                  initial={{ height: 4 }}
                  animate={{ 
                    height: isListening 
                      ? Math.max(4, (currentLevel + Math.random() * 20)) 
                      : 4 
                  }}
                  transition={{ duration: 0.1 }}
                  style={{ maxHeight: '60px' }}
                />
              ))}
            </div>
          </div>

          {/* Main Voice Button */}
          <motion.button
            onClick={handleVoiceToggle}
            className={`relative w-80 h-80 rounded-full border-4 transition-all duration-300 ${
              isListening 
                ? 'border-cyan-400 bg-cyan-500 bg-opacity-20' 
                : isProcessing 
                ? 'border-yellow-400 bg-yellow-500 bg-opacity-20'
                : 'border-purple-400 bg-purple-500 bg-opacity-20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={isListening ? { scale: [1, 1.02, 1] } : {}}
            transition={isListening ? { duration: 1, repeat: Infinity } : {}}
          >
            <motion.div
              className="absolute inset-0 voice-gradient rounded-full opacity-20"
              animate={isListening ? { 
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2]
              } : {}}
              transition={isListening ? { duration: 2, repeat: Infinity } : {}}
            />
            
            <div className="relative z-10 flex items-center justify-center h-full">
              <AnimatePresence mode="wait">
                {isProcessing ? (
                  <motion.div
                    key="processing"
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    exit={{ scale: 0, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"
                  />
                ) : isListening ? (
                  <motion.div
                    key="listening"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MicOff className="w-16 h-16 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Mic className="w-16 h-16 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.button>
        </motion.div>

        {/* Status Text */}
        <motion.div 
          className="text-center mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-2">
            {isProcessing ? 'Processing...' : isListening ? 'Listening...' : 'Ready to help'}
          </h2>
          <p className="text-gray-400 text-lg">
            {isProcessing 
              ? 'Analyzing your request' 
              : isListening 
              ? 'Speak now, I\'m listening' 
              : 'Tap the microphone to start'
            }
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="flex space-x-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="glass-effect rounded-xl p-4 hover:bg-white hover:bg-opacity-20 transition-all duration-300"
          >
            <Volume2 className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>

      {/* Chat History */}
      <ChatHistory messages={messages} isVisible={showChat} />

      {/* Footer */}
      <motion.footer 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 p-6 text-center"
      >
        <p className="text-gray-400 text-sm">
          Your AI-powered sales assistant with human-like expertise
        </p>
      </motion.footer>
    </div>
  );
}

export default VoiceAssistant; 