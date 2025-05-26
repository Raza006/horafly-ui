# server.js Documentation

## Overview
Express.js backend server for the Voice Assistant application, providing REST API endpoints for voice processing, chat functionality, and real-time communication via WebSockets.

## Dependencies and Setup (Lines 1-8)
- **Line 1**: Express.js web framework for creating REST API
- **Line 2**: CORS middleware for cross-origin resource sharing
- **Line 3**: Helmet for security headers
- **Line 4**: Morgan for HTTP request logging
- **Line 5**: Multer for handling multipart/form-data (file uploads)
- **Line 6**: HTTP module for creating server instance
- **Line 7**: Socket.io for real-time WebSocket communication
- **Line 8**: Path utilities and dotenv for environment configuration

## Server Configuration (Lines 10-18)
- **Line 11**: Creates Express application instance
- **Line 12**: Creates HTTP server wrapping Express app
- **Lines 13-17**: Configures Socket.io with CORS settings for frontend communication
- **Line 19**: Sets server port from environment or defaults to 5000

## Middleware Setup (Lines 21-29)
- **Line 22**: Helmet adds security headers to responses
- **Line 23**: Morgan logs all HTTP requests in combined format
- **Lines 24-27**: CORS configuration allowing localhost:3000 with credentials
- **Lines 28-29**: JSON and URL-encoded body parsing with 50MB limits

## Multer Configuration (Lines 31-45)
### Storage Configuration (Line 32)
- Uses memory storage to handle files in RAM for processing

### Upload Configuration (Lines 33-44)
- **Lines 35-37**: 10MB file size limit for audio uploads
- **Lines 38-43**: File filter accepting only audio MIME types
- Provides error handling for non-audio file uploads

## API Endpoints

### Health Check (Lines 49-56)
- **Endpoint**: `GET /api/health`
- **Purpose**: Service health monitoring and status verification
- **Response**: JSON with status, message, timestamp, and version info

### Voice Processing (Lines 58-95)
- **Endpoint**: `POST /api/voice/process`
- **Purpose**: Processes uploaded audio files for speech-to-text conversion
- **Lines 60-65**: Validates audio file presence
- **Lines 67-68**: Simulates processing delay (1.5 seconds)
- **Lines 70-78**: Mock responses array for demonstration
- **Lines 80-88**: Constructs response with transcription and AI response
- **Lines 90-93**: Returns JSON response and emits WebSocket event

### Text-to-Speech Synthesis (Lines 97-128)
- **Endpoint**: `POST /api/voice/synthesize`
- **Purpose**: Converts text to speech audio
- **Lines 99-105**: Extracts text, voice type, and speed parameters
- **Lines 107-113**: Validates required text parameter
- **Lines 115-116**: Simulates synthesis processing delay
- **Lines 118-126**: Returns mock synthesis data with audio URL and metadata

### Chat Messaging (Lines 130-173)
- **Endpoint**: `POST /api/chat/message`
- **Purpose**: Processes text-based chat messages and generates AI responses
- **Lines 132-138**: Extracts message content and conversation metadata
- **Lines 140-146**: Validates message presence
- **Lines 148-149**: Simulates AI processing time
- **Lines 151-157**: Array of mock AI responses for demonstration
- **Lines 159-167**: Constructs response message with metadata
- **Lines 169-172**: Returns response and broadcasts via WebSocket

### Conversation History (Lines 175-212)
- **Endpoint**: `GET /api/chat/history/:conversationId`
- **Purpose**: Retrieves historical messages for a conversation
- **Line 177**: Extracts conversation ID from URL parameters
- **Lines 179-193**: Mock conversation history with sample messages
- **Lines 195-201**: Returns conversation data with message count

## WebSocket Handling (Lines 214-225)
- **Lines 215-216**: Connection event logs client connections
- **Lines 218-220**: Disconnect event for cleanup
- **Lines 222-225**: Room joining functionality for conversation grouping

## Error Handling (Lines 227-244)
### Global Error Middleware (Lines 227-243)
- **Line 229**: Logs all unhandled errors for debugging
- **Lines 231-237**: Special handling for Multer file upload errors
- **Lines 239-243**: Generic error response with environment-based detail level

### 404 Handler (Lines 246-251)
- Catches all undefined routes and returns structured error response

## Server Startup (Lines 253-257)
- **Line 254**: Starts server on configured port
- **Lines 255-257**: Logs startup information including environment and health check URL

## Key Features

### Security
1. **Helmet**: Adds security headers to prevent common attacks
2. **CORS**: Configured for specific origin to prevent unauthorized access
3. **File Validation**: Only accepts audio files with size limits
4. **Error Sanitization**: Hides internal errors in production

### Real-time Communication
1. **WebSocket Integration**: Socket.io enables live updates
2. **Room Support**: Allows grouping connections by conversation
3. **Event Broadcasting**: Notifies all clients of new messages/voice processing

### File Handling
1. **Memory Storage**: Efficient handling of audio uploads
2. **Size Limits**: Prevents server overload with large files
3. **Type Validation**: Ensures only audio files are processed

### API Design
1. **RESTful Endpoints**: Standard HTTP methods and status codes
2. **Consistent Responses**: Structured JSON format across all endpoints
3. **Error Handling**: Comprehensive error responses with helpful messages
4. **Logging**: Request logging for monitoring and debugging

### Scalability Considerations
1. **Environment Configuration**: Uses environment variables for deployment flexibility
2. **Modular Structure**: Organized code structure for easy maintenance
3. **Mock Responses**: Prepared for integration with external AI services
4. **Health Monitoring**: Endpoint for service health checks

## Integration Points
- **Frontend**: Communicates with React app on port 3000
- **AI Services**: Ready for OpenAI, Google Speech, Azure integration
- **Database**: Prepared for MongoDB integration for persistent storage
- **Monitoring**: Structured logging for production monitoring

## Development vs Production
- **Development**: Detailed error messages and console logging
- **Production**: Sanitized errors and configurable logging levels
- **CORS**: Environment-specific origin configuration
- **Security**: Environment-based security header configuration 