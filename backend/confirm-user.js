const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function confirmUser() {
  try {
    console.log('🔧 Confirming test user email...');
    
    // Get the user by email
    const { data: users, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      console.error('❌ Error listing users:', listError.message);
      return;
    }
    
    const testUser = users.users.find(user => user.email === 'test@horafly.com');
    
    if (!testUser) {
      console.log('❌ Test user not found');
      return;
    }
    
    console.log('👤 Found user:', testUser.email);
    console.log('📧 Email confirmed:', testUser.email_confirmed_at ? 'Yes' : 'No');
    
    if (!testUser.email_confirmed_at) {
      // Confirm the user's email
      const { data, error } = await supabase.auth.admin.updateUserById(
        testUser.id,
        { email_confirm: true }
      );
      
      if (error) {
        console.error('❌ Error confirming email:', error.message);
        return;
      }
      
      console.log('✅ Email confirmed successfully!');
    } else {
      console.log('ℹ️ Email already confirmed');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

confirmUser(); 