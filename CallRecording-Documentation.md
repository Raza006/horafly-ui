# CallRecording Component Documentation

## Overview
The CallRecording component provides AI-powered call recording, playback, and analysis functionality for sales conversations.

## File Location
`src/components/dashboard/CallRecording.tsx`

## Component Structure

### 1. Header Section (Lines 95-131)
- **Recording Controls**: Start/Stop recording button with real-time timer
- **Status Display**: Shows recording duration with animated red dot
- **Settings Button**: Access to recording preferences

### 2. Call History Sidebar (Lines 138-227)
- **Call List**: Display of all recorded calls with metadata
- **Call Cards**: Each card shows:
  - Prospect name and company
  - Call duration and outcome
  - AI confidence score (1-100)
  - Sentiment analysis
  - Tags for quick identification

### 3. Audio Player (Lines 235-278)
- **Playback Controls**: Play/pause with progress bar
- **Timeline Scrubbing**: Interactive progress bar for navigation
- **Volume Control**: Audio level adjustment
- **Download Option**: Export call recordings

### 4. AI Analysis Section (Lines 285-377)
- **Performance Metrics**: Overall score, talk ratio, questions asked
- **Key Moments**: Timestamped important conversation points
- **Sentiment Analysis**: Visual breakdown of conversation mood
- **AI Recommendations**: Strengths and improvement suggestions

## Key Features

### State Management
```typescript
const [isRecording, setIsRecording] = useState(false);
const [recordingTime, setRecordingTime] = useState(0);
const [selectedCall, setSelectedCall] = useState<number | null>(1);
```

### Data Structure
Each call object contains:
- Prospect and company information
- Duration and date/time
- Outcome and sentiment
- AI scoring and tags
- Analysis results

### Interactive Elements
- **Hover Effects**: All buttons have scale animations
- **Selection States**: Active call highlighted with gold border
- **Real-time Updates**: Recording timer updates live
- **Responsive Design**: Adapts to different screen sizes

## Dummy Data Features
- 3 sample recorded calls with realistic data
- AI analysis with sentiment scoring
- Key moments with timestamps
- Actionable insights and recommendations

## UI/UX Design
- **Black/Gold Theme**: Consistent with app branding
- **Glass Morphism**: Backdrop blur effects
- **Smooth Animations**: Framer Motion for all interactions
- **Visual Hierarchy**: Clear organization of information

## Integration Points
- Imports from main Dashboard component
- Uses shared styling patterns
- Follows app navigation structure
- Compatible with voice assistant workflow 