# 🔍 ScrapingService.ts Documentation

## Overview
The ScrapingService provides comprehensive lead scraping functionality using the ScrapingDog API. It handles job management, data persistence, and real-time progress tracking for lead generation campaigns.

## Key Features

### 🎯 Lead Scraping Engine
- **Lines 1-10**: API configuration and base URL setup for ScrapingDog integration
- **Lines 50-75**: ScrapingDog API request handler with premium features enabled
- **Lines 77-105**: LinkedIn search results parser for extracting lead information
- **Lines 107-145**: Mock lead generator for testing and demonstration purposes

### 📊 Data Models
- **Lines 12-25**: `Lead` interface defining complete lead information structure
- **Lines 27-42**: `ScrapingJob` interface for tracking scraping campaign progress
- **Lines 44-50**: `SearchCriteria` interface for defining search parameters

### 🚀 Job Management
- **Lines 147-175**: `startScrapingJob()` - Creates and initiates new scraping campaigns
- **Lines 177-220**: `performScraping()` - Handles the actual scraping process with progress updates
- **Lines 222-235**: `updateJobProgress()` - Updates job status and progress in real-time
- **Lines 237-248**: `getUserJobs()` - Retrieves user's scraping job history

### 💾 Data Persistence
- **Lines 250-261**: `getUserLeads()` - Fetches user's scraped leads with pagination
- **Lines 263-275**: `pauseJob()` - Pauses active scraping jobs
- **Lines 277-289**: `resumeJob()` - Resumes paused scraping jobs
- **Lines 291-303**: `deleteJob()` - Removes scraping jobs from database

### 📤 Export Functionality
- **Lines 305-335**: `exportLeads()` - Exports leads in CSV or JSON format for external use

## Technical Implementation

### API Integration
The service integrates with ScrapingDog API using:
- Premium scraping with JavaScript rendering
- Automatic retry mechanisms
- Error handling and fallback systems
- Rate limiting compliance

### Database Operations
All data is persisted using Supabase with:
- Real-time updates for job progress
- User-specific data isolation
- Optimized queries for performance
- Automatic timestamp management

### Progress Tracking
Jobs provide real-time updates including:
- Percentage completion
- Estimated time remaining
- Number of leads found
- Current status (active, paused, completed, failed)

## Usage Examples

### Starting a New Scraping Job
```typescript
const criteria = {
  industry: 'Technology',
  location: 'San Francisco, CA',
  companySize: '50-200',
  revenueRange: '$5M-10M'
};

const job = await scrapingService.startScrapingJob(
  userId, 
  criteria, 
  'Tech Startups - SF'
);
```

### Retrieving User Leads
```typescript
const leads = await scrapingService.getUserLeads(userId, 100);
```

### Exporting Data
```typescript
const csvData = await scrapingService.exportLeads(userId, 'csv');
```

## Error Handling
The service includes comprehensive error handling for:
- API rate limits and failures
- Database connection issues
- Invalid search criteria
- Network timeouts
- Data parsing errors

## Security Features
- User data isolation through user_id filtering
- API key protection
- Input validation and sanitization
- Secure database operations
- Rate limiting compliance 