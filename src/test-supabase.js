// Simple test to verify Supabase connection
import { supabase } from './lib/supabase.js';

async function testSupabaseConnection() {
  try {
    console.log('🔗 Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase.from('users').select('count').limit(1);
    
    if (error) {
      console.error('❌ Supabase connection failed:', error);
      return false;
    }
    
    console.log('✅ Supabase connection successful!');
    return true;
  } catch (error) {
    console.error('❌ Connection test failed:', error);
    return false;
  }
}

// Test auth
async function testAuth() {
  try {
    console.log('🔐 Testing Supabase Auth...');
    
    const { data: { session } } = await supabase.auth.getSession();
    console.log('Current session:', session ? 'Active' : 'None');
    
    return true;
  } catch (error) {
    console.error('❌ Auth test failed:', error);
    return false;
  }
}

// Run tests
testSupabaseConnection();
testAuth(); 