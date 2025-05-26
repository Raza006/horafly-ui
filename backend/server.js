const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const multer = require('multer');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Configure multer for audio file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept audio files
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Only audio files are allowed!'), false);
    }
  }
});

// Routes

// Authentication routes
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Voice Assistant API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Process voice input endpoint
app.post('/api/voice/process', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No audio file provided'
      });
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock response - In a real app, this would integrate with speech-to-text
    // and AI processing services like OpenAI, Google Speech, etc.
    const mockResponses = [
      "I understand you want to know about the weather. Let me check that for you.",
      "That's an interesting question! Here's what I found...",
      "I can help you with that task. Let me process your request.",
      "Based on your voice input, I'll assist you with this information.",
      "Thank you for your question. Here's my response to help you."
    ];

    const response = {
      status: 'success',
      message: 'Voice processed successfully',
      data: {
        transcription: "This is a simulated transcription of your voice input",
        response: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        confidence: 0.95,
        processingTime: 1500,
        timestamp: new Date().toISOString()
      }
    };

    res.status(200).json(response);

    // Emit to connected clients via WebSocket
    io.emit('voiceProcessed', response.data);

  } catch (error) {
    console.error('Error processing voice:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to process voice input',
      error: error.message
    });
  }
});

// Text-to-speech endpoint
app.post('/api/voice/synthesize', async (req, res) => {
  try {
    const { text, voice = 'default', speed = 1.0 } = req.body;

    if (!text) {
      return res.status(400).json({
        status: 'error',
        message: 'Text is required for synthesis'
      });
    }

    // Simulate synthesis processing
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock response - In a real app, this would integrate with TTS services
    const response = {
      status: 'success',
      message: 'Text synthesized successfully',
      data: {
        audioUrl: '/api/audio/placeholder.mp3', // Placeholder
        duration: text.length * 50, // Estimated duration in ms
        voice: voice,
        speed: speed,
        timestamp: new Date().toISOString()
      }
    };

    res.status(200).json(response);

  } catch (error) {
    console.error('Error synthesizing speech:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to synthesize speech',
      error: error.message
    });
  }
});

// Chat conversation endpoint
app.post('/api/chat/message', async (req, res) => {
  try {
    const { message, conversationId, userId } = req.body;

    if (!message) {
      return res.status(400).json({
        status: 'error',
        message: 'Message is required'
      });
    }

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    const aiResponses = [
      "I understand your request. How can I help you further?",
      "That's a great question! Let me provide you with some information.",
      "I'm here to assist you. What would you like to know more about?",
      "Thank you for sharing that. Here's what I think about it.",
      "I can help you with that. Let me break it down for you."
    ];

    const response = {
      status: 'success',
      data: {
        id: Date.now(),
        message: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        isUser: false,
        timestamp: new Date().toISOString(),
        conversationId: conversationId || 'default',
        confidence: 0.9
      }
    };

    res.status(200).json(response);

    // Emit to connected clients
    io.emit('newMessage', response.data);

  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to process message',
      error: error.message
    });
  }
});

// Get conversation history
app.get('/api/chat/history/:conversationId', (req, res) => {
  try {
    const { conversationId } = req.params;

    // Mock conversation history
    const mockHistory = [
      {
        id: 1,
        message: "Hello! I'm your AI voice assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 2,
        message: "Can you tell me about the weather?",
        isUser: true,
        timestamp: new Date(Date.now() - 3000000).toISOString()
      },
      {
        id: 3,
        message: "I'd be happy to help with weather information! However, I need access to weather services to provide current data.",
        isUser: false,
        timestamp: new Date(Date.now() - 2900000).toISOString()
      }
    ];

    res.status(200).json({
      status: 'success',
      data: {
        conversationId,
        messages: mockHistory,
        totalMessages: mockHistory.length
      }
    });

  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch conversation history',
      error: error.message
    });
  }
});

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`Client ${socket.id} joined room: ${room}`);
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  
  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      status: 'error',
      message: 'File upload error',
      error: error.message
    });
  }

  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Voice Assistant API server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
}); 