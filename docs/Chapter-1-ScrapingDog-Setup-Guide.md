# 🔍 ScrapingDog Integration Setup Guide

## Overview
This guide will help you set up the ScrapingDog API integration for the Lead Scraping functionality in your voice assistant application.

## Prerequisites
- ScrapingDog account and API key
- Supabase database access
- Node.js application environment

## Step 1: ScrapingDog Account Setup

### 1.1 Create ScrapingDog Account
1. Visit [ScrapingDog.com](https://scrapingdog.com)
2. Sign up for an account
3. Choose a plan that fits your scraping needs
4. Verify your email address

### 1.2 Get Your API Key
1. Log into your ScrapingDog dashboard
2. Navigate to the API section
3. Copy your API key
4. Note your plan limits (requests per month, concurrent requests, etc.)

## Step 2: Environment Configuration

### 2.1 Update API Key
In `src/services/scrapingService.ts`, the API key has already been configured:

```typescript
// Already configured with your API key:
const SCRAPINGDOG_API_KEY = '6825eb973e8d266412f52147';
```

✅ **Status:** API key is already integrated and ready to use!

### 2.2 Environment Variables (Recommended)
For better security, use environment variables:

1. Create a `.env` file in your project root:
```env
REACT_APP_SCRAPINGDOG_API_KEY=your_actual_api_key_here
```

2. Update the service file:
```typescript
const SCRAPINGDOG_API_KEY = process.env.REACT_APP_SCRAPINGDOG_API_KEY || 'fallback_key';
```

## Step 3: Database Setup

### 3.1 Run Database Migration
Execute the SQL migration file in your Supabase dashboard:

1. Open Supabase dashboard
2. Go to SQL Editor
3. Copy and paste the contents of `database_migration_scraping.sql`
4. Execute the migration

### 3.2 Verify Tables Created
Check that these tables were created:
- `scraping_jobs`
- `leads`
- `job_statistics` (view)

### 3.3 Test Database Permissions
Ensure Row Level Security (RLS) is working:
1. Try inserting test data as an authenticated user
2. Verify you can only see your own data
3. Test the `get_user_lead_stats` function

## Step 4: API Configuration

### 4.1 ScrapingDog API Parameters
The service uses these ScrapingDog parameters:
- `premium: true` - Uses premium proxy pool
- `render: true` - Enables JavaScript rendering
- `country: 'US'` - Sets proxy location (optional)

### 4.2 Rate Limiting
Configure rate limiting based on your plan:
```typescript
// Add to scrapingService.ts
private rateLimiter = {
  requestsPerMinute: 60, // Adjust based on your plan
  concurrent: 5,         // Adjust based on your plan
  lastRequest: 0,
  queue: []
};
```

## Step 5: Testing the Integration

### 5.1 Test API Connection
Create a simple test to verify API connectivity:

```typescript
// Test function (add to scrapingService.ts temporarily)
async testConnection() {
  try {
    const testUrl = 'https://httpbin.org/ip';
    const result = await this.makeScrapingRequest(testUrl);
    console.log('ScrapingDog connection successful:', result);
    return true;
  } catch (error) {
    console.error('ScrapingDog connection failed:', error);
    return false;
  }
}
```

### 5.2 Test Lead Scraping
1. Start the application
2. Navigate to Lead Scraping section
3. Create a test scraping job
4. Monitor the console for API calls
5. Verify leads are being saved to database

## Step 6: Production Considerations

### 6.1 Error Handling
Implement robust error handling for:
- API rate limits
- Network timeouts
- Invalid responses
- Quota exceeded errors

### 6.2 Monitoring
Set up monitoring for:
- API usage tracking
- Success/failure rates
- Response times
- Cost tracking

### 6.3 Caching
Implement caching to reduce API calls:
- Cache successful responses
- Implement TTL (Time To Live)
- Use Redis or similar for distributed caching

## Step 7: Compliance and Ethics

### 7.1 Legal Compliance
- Respect robots.txt files
- Follow website terms of service
- Implement proper delays between requests
- Respect rate limits

### 7.2 Data Privacy
- Implement data retention policies
- Ensure GDPR compliance
- Secure API keys and credentials
- Encrypt sensitive data

## Troubleshooting

### Common Issues

#### API Key Not Working
- Verify API key is correct
- Check account status and billing
- Ensure sufficient credits/quota

#### Rate Limiting Errors
- Reduce request frequency
- Implement exponential backoff
- Check plan limits

#### Parsing Errors
- Update CSS selectors for target sites
- Handle dynamic content loading
- Implement fallback parsing methods

#### Database Errors
- Verify RLS policies are correct
- Check user authentication
- Ensure proper permissions

### Debug Mode
Enable debug logging:
```typescript
const DEBUG_MODE = process.env.NODE_ENV === 'development';

if (DEBUG_MODE) {
  console.log('ScrapingDog request:', params);
  console.log('ScrapingDog response:', response);
}
```

## Support and Resources

### ScrapingDog Resources
- [API Documentation](https://docs.scrapingdog.com)
- [Support Portal](https://support.scrapingdog.com)
- [Status Page](https://status.scrapingdog.com)

### Application Support
- Check application logs for errors
- Monitor database performance
- Review API usage patterns
- Implement proper logging

## Security Best Practices

### API Key Security
- Never commit API keys to version control
- Use environment variables
- Rotate keys regularly
- Monitor for unauthorized usage

### Data Security
- Encrypt sensitive lead data
- Implement access controls
- Regular security audits
- Secure data transmission

### Network Security
- Use HTTPS for all requests
- Implement request signing
- Monitor for suspicious activity
- Use VPN for sensitive operations

## Performance Optimization

### Request Optimization
- Batch requests when possible
- Use appropriate timeouts
- Implement connection pooling
- Cache frequently accessed data

### Database Optimization
- Use proper indexes
- Implement pagination
- Regular database maintenance
- Monitor query performance

### Application Optimization
- Implement lazy loading
- Use efficient state management
- Optimize re-renders
- Monitor memory usage 