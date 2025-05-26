module.exports = {
  // Server Configuration
  server: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
  },

  // API Keys
  apiKeys: {
    openai: process.env.OPENAI_API_KEY || '',
    googleSpeech: process.env.GOOGLE_SPEECH_API_KEY || '',
    azureSpeechKey: process.env.AZURE_SPEECH_KEY || '',
    azureSpeechRegion: process.env.AZURE_SPEECH_REGION || ''
  },

  // Database
  database: {
    url: process.env.DATABASE_URL || 'mongodb://localhost:27017/voice-assistant'
  },

  // Security
  security: {
    sessionSecret: process.env.SESSION_SECRET || 'default-dev-secret',
    jwtSecret: process.env.JWT_SECRET || 'default-jwt-secret'
  },

  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
  },

  // File Upload
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024, // 10MB
    allowedAudioTypes: process.env.ALLOWED_AUDIO_TYPES ? 
      process.env.ALLOWED_AUDIO_TYPES.split(',') : 
      ['audio/wav', 'audio/mp3', 'audio/m4a', 'audio/ogg']
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || './logs/app.log'
  }
}; 