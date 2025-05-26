# Chapter 3: LeadScraping Component Documentation

## Overview
The LeadScraping component provides a comprehensive Google Maps lead scraping interface with country-based targeting, real-time job monitoring, and folder-like results organization.

## Key Features
- **Google Maps Integration**: Direct scraping from Google Maps using ScrapingDog API
- **Country-Based Targeting**: Select from 12 supported countries with optional city/province filtering
- **Animated Location Details**: Smooth animations when expanding location options
- **Real-Time Job Monitoring**: Live progress tracking with 5-second polling intervals
- **Folder-Like Results**: Organized results with expandable folders for each scraping campaign
- **Lead Management**: Individual lead deletion and bulk export capabilities
- **Persistent Data**: All scraping jobs and leads are saved to user's database

## Component Structure

### State Management
- **jobs**: Array of ScrapingJob objects from database
- **leads**: Array of Lead objects from database  
- **isLoading**: Loading state for initial data fetch
- **isStartingJob**: Loading state for new job creation
- **error/success**: Message states with auto-dismiss
- **expandedFolders**: Set tracking which result folders are expanded
- **searchCriteria**: Form data for new scraping campaigns
- **jobName**: Campaign name input
- **showLocationDetails**: Controls animated location field visibility

### Key Functions

#### Data Loading
- **Lines 65-80**: `loadData()` - Fetches jobs and leads from database with error handling
- **Lines 55-62**: Auto-polling setup with 5-second intervals for real-time updates

#### Campaign Management  
- **Lines 90-115**: `handleStartScraping()` - Creates new scraping job with validation
- **Lines 117-135**: Job control functions (pause, resume, delete) with success feedback

#### Results Management
- **Lines 155-175**: `handleExportLeads()` - CSV export with automatic download
- **Lines 177-185**: `toggleFolder()` - Manages expandable folder states
- **Lines 187-193**: `getJobLeads()` - Filters leads by job creation time
- **Lines 195-205**: `deleteLead()` - Individual lead deletion with confirmation

## UI Sections

### 1. Header Section (Lines 220-240)
- Title: "Google Maps Lead Scraper"
- Fixed target platform display: "Google Maps"
- Clean, professional layout with gold accent colors

### 2. New Campaign Form (Lines 242-350)
- **Campaign Name**: Text input for job identification
- **Country Selection**: Dropdown with 12 supported countries
- **Conditional Location Fields**: Animated city/province inputs that appear on country selection
- **Business Keywords**: Text input for search terms (e.g., "restaurants", "dentists")
- **Quantity Selection**: Dropdown for 10-500 leads
- **Action Buttons**: Start Scraping (with loading state) and Reset

### 3. Active Jobs Monitor (Lines 352-420)
- Only shows when active/queued jobs exist
- Real-time progress bars with smooth animations
- Job status indicators (active/queued/paused)
- Live lead count updates
- Control buttons (pause/resume/delete)

### 4. Results Folder System (Lines 422-550)
- Folder-like interface for completed jobs
- Click to expand/collapse individual campaigns
- Lead count and location summary in folder headers
- Export button for individual campaigns
- Scrollable lead list with detailed information

### 5. Individual Lead Cards (Lines 470-540)
- Company name, title, and contact person
- Confidence score with visual indicator
- Email, phone, location, and source information
- Delete button with confirmation dialog
- Hover effects and smooth animations

## Styling Features
- **Dark Theme**: Black/gray backgrounds with gold accents
- **Glassmorphism**: Backdrop blur effects on all panels
- **Smooth Animations**: Framer Motion for all interactions
- **Responsive Design**: Mobile-friendly grid layouts
- **Loading States**: Spinners and disabled states during operations
- **Status Colors**: Green (active), yellow (queued), red (failed), blue (completed)

## Integration Points
- **Authentication**: Uses `useAuth()` for current user context
- **Database**: All operations persist to Supabase via scrapingService
- **API**: Real Google Maps scraping via ScrapingDog API
- **Export**: Client-side CSV generation and download

## Error Handling
- Form validation for required fields
- API error catching with user-friendly messages
- Confirmation dialogs for destructive actions
- Auto-dismissing success/error notifications
- Graceful loading states and fallbacks

## Performance Optimizations
- 5-second polling intervals (not too aggressive)
- Conditional rendering of active jobs section
- Lazy loading of lead details in folders
- Efficient state updates with proper dependencies
- Smooth animations without performance impact

This component provides a complete, production-ready lead scraping interface focused specifically on Google Maps data extraction with excellent user experience and real-time feedback. 