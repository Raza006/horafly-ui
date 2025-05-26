require('dotenv').config();

console.log('🔑 API Keys Test Results:');
console.log('========================');

// Test each API key
const keys = {
  'ScrapingDog': process.env.SCRAPINGDOG_API_KEY,
  'Supabase URL': process.env.SUPABASE_URL,
  'Supabase Anon': process.env.SUPABASE_ANON_KEY,
  'Supabase Service': process.env.SUPABASE_SERVICE_ROLE_KEY,
  'OpenAI': process.env.OPENAI_API_KEY,
  'AssemblyAI': process.env.ASSEMBLYAI_API_KEY,
  'Perplexity': process.env.PERPLEXITY_API_KEY,
  'Stripe Public': process.env.STRIPE_PUBLISHABLE_KEY,
  'Stripe Secret': process.env.STRIPE_SECRET_KEY
};

let allGood = true;

for (const [name, key] of Object.entries(keys)) {
  if (key) {
    console.log(`✅ ${name}: Connected`);
  } else {
    console.log(`❌ ${name}: Missing`);
    allGood = false;
  }
}

console.log('========================');
if (allGood) {
  console.log('🎉 All API keys are loaded successfully!');
  console.log('🚀 Ready to start building!');
} else {
  console.log('⚠️  Some API keys are missing. Check your .env file.');
}

// Test Supabase connection
console.log('\n🔗 Testing Supabase Connection...');
try {
  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
  console.log('✅ Supabase client created successfully!');
} catch (error) {
  console.log('❌ Supabase connection failed:', error.message);
} 