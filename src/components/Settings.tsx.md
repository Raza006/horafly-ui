# Settings Component Documentation

## Overview
The Settings component provides a comprehensive user settings interface for the Horafly AI Voice Calling application. It allows users to manage their profile information, security settings, theme preferences, and account options.

## Component Structure

### Lines 1-25: Imports and Interfaces
- **React and Framer Motion**: Core React functionality and smooth animations
- **Lucide React Icons**: UI icons for various settings sections and actions
- **Theme and Auth Contexts**: Access to theme colors, theme switching, and authentication functions
- **User Interface**: Defines the user data structure with profile information
- **SettingsProps Interface**: Component props including onBack callback and currentUser

### Lines 26-60: Component State and Setup
- **activeSection**: Controls which settings section is currently displayed (profile, security, notifications, appearance)
- **Profile State**: displayName and email for profile updates
- **Password State**: currentPassword, newPassword, confirmPassword for security changes
- **Visibility State**: showCurrentPassword, showNewPassword, showConfirmPassword for password field toggles
- **UI State**: isLoading, successMessage, errorMessage for user feedback
- **Theme Context**: Access to colors, currentTheme, setTheme, and themes array

### Lines 61-85: Settings Navigation Configuration
- **settingsSections Array**: Defines the available settings sections with icons and labels
  - Profile: User information management
  - Security: Password and security settings
  - Notifications: Notification preferences (placeholder)
  - Appearance: Theme selection and customization

### Lines 86-120: Profile Management Functions
- **handleSaveProfile**: Simulates API call to update user profile information
- **handleChangePassword**: Validates and updates user password with security checks
- **handleLogout**: Logs out user and returns to previous view

### Lines 121-180: Profile Section Rendering
- **Display Name Input**: Text field with user icon for updating display name
- **Email Input**: Email field with mail icon for updating email address
- **Save Button**: Animated button with loading state for profile updates
- **Form Validation**: Real-time validation and error handling

### Lines 181-280: Security Section Rendering
- **Current Password Field**: Secure input with visibility toggle for current password
- **New Password Field**: Secure input with visibility toggle for new password
- **Confirm Password Field**: Secure input with visibility toggle for password confirmation
- **Password Validation**: Checks for password match and minimum length requirements
- **Change Password Button**: Animated button with loading state and validation

### Lines 281-350: Theme Selection (Appearance Section)
- **Theme Grid**: Displays all 5 available themes in a responsive grid layout
- **Theme Cards**: Interactive cards showing theme preview and description
- **Theme Switching**: Real-time theme switching with visual feedback
- **Theme Descriptions**: Descriptive text for each theme explaining its characteristics
- **Active Theme Indicator**: Visual indicator showing currently selected theme

### Lines 351-420: Main Component Layout
- **Header Section**: Back button, settings title, and logout button
- **Sidebar Navigation**: User profile card and settings section navigation
- **Main Content Area**: Dynamic content based on selected settings section
- **Success/Error Messages**: Animated feedback messages for user actions

## Theme Integration

### Available Themes
1. **Midnight Dark**: Classic dark theme with warm cream accents
2. **Ocean Blue**: Cool blue tones inspired by the ocean
3. **Forest Green**: Natural green theme for a calming experience
4. **Sunset Orange**: Warm orange and amber sunset colors
5. **Royal Purple**: Elegant purple theme with royal vibes

### Theme Features
- **Real-time Switching**: Themes apply instantly across the entire application
- **Persistent Storage**: Selected theme is saved to localStorage
- **Visual Previews**: Each theme shows a preview of its accent colors
- **Responsive Design**: Theme selector works on all screen sizes

## Animation Features

### Framer Motion Animations
- **Page Transitions**: Smooth fade and slide animations between sections
- **Button Interactions**: Scale and hover effects on interactive elements
- **Loading States**: Rotating spinner animations for async operations
- **Success/Error Messages**: Slide-in animations for feedback messages

### Interactive Elements
- **Hover Effects**: Color and scale changes on buttons and cards
- **Focus States**: Visual feedback for form inputs and navigation
- **Loading Indicators**: Animated spinners during API operations
- **Theme Transitions**: Smooth color transitions when switching themes

## Security Features

### Password Management
- **Visibility Toggles**: Show/hide password functionality for all password fields
- **Validation**: Real-time validation for password requirements
- **Confirmation**: Password confirmation matching for security
- **Error Handling**: Clear error messages for validation failures

### Form Security
- **Input Sanitization**: Proper handling of user input data
- **State Management**: Secure state handling for sensitive information
- **Logout Functionality**: Secure logout with state cleanup

## Responsive Design

### Layout Adaptations
- **Mobile-First**: Optimized for mobile devices with responsive breakpoints
- **Grid Layouts**: Flexible grid systems that adapt to screen size
- **Navigation**: Collapsible sidebar navigation for smaller screens
- **Touch-Friendly**: Large touch targets for mobile interaction

### Accessibility Features
- **Keyboard Navigation**: Full keyboard accessibility for all interactive elements
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: High contrast ratios for text readability
- **Focus Management**: Clear focus indicators and logical tab order

This Settings component provides a comprehensive and user-friendly interface for managing all aspects of the user's account and preferences, with particular emphasis on the new theme selection system that allows users to customize their experience across the entire application.

## Key Features

### 1. Profile Management
- Update display name and email address
- Real-time form validation
- Success/error feedback
- Simulated API integration ready

### 2. Security Settings
- Change password functionality
- Password strength validation
- Secure password visibility toggles
- Current password verification

### 3. User Interface
- Modern glass morphism design
- Smooth animations and transitions
- Responsive layout for all devices
- Consistent theme integration

### 4. Navigation
- Intuitive sidebar navigation
- Clear section indicators
- Back button to return to landing page
- Logout functionality

### 5. Future Extensibility
- Placeholder sections for notifications
- Appearance customization ready
- Modular design for easy feature addition

## Usage
The Settings component is accessed via a gear icon in the landing page header for authenticated users. It provides a complete settings interface while maintaining the application's premium design aesthetic.

## Integration
- Connects with AuthContext for logout functionality
- Uses ThemeContext for consistent styling
- Designed to integrate with backend API for profile updates
- Maintains user session state throughout the application 