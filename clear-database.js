const { createClient } = require('@supabase/supabase-js');

// Your Supabase credentials
const supabaseUrl = 'https://hzlyxiwdqjvsgihvwiqh.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6bHl4aXdkcWp2c2dpaHZ3aXFoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODE5MjE3NywiZXhwIjoyMDYzNzY4MTc3fQ.YOUR_SERVICE_ROLE_KEY_HERE'; // You'll need to get this from Supabase

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function clearAllUsers() {
  try {
    console.log('🗑️ Starting database cleanup...');
    
    // 1. Get all users from Auth
    console.log('📋 Fetching all users...');
    const { data: authUsers, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      console.error('❌ Error listing users:', listError.message);
      return;
    }
    
    console.log(`👥 Found ${authUsers.users.length} users in Auth`);
    
    // 2. Delete all users from Auth (this will cascade to the users table if RLS is set up correctly)
    for (const user of authUsers.users) {
      console.log(`🗑️ Deleting user: ${user.email}`);
      
      const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id);
      
      if (deleteError) {
        console.error(`❌ Error deleting user ${user.email}:`, deleteError.message);
      } else {
        console.log(`✅ Deleted user: ${user.email}`);
      }
    }
    
    // 3. Clean up any remaining records in users table
    console.log('🧹 Cleaning up users table...');
    const { error: tableError } = await supabase
      .from('users')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all except a dummy record
    
    if (tableError) {
      console.error('❌ Error cleaning users table:', tableError.message);
    } else {
      console.log('✅ Users table cleaned');
    }
    
    // 4. Clear localStorage (you'll need to do this manually in browser)
    console.log('📝 Manual steps:');
    console.log('1. Open browser console');
    console.log('2. Run: localStorage.clear()');
    console.log('3. Refresh the page');
    
    console.log('🎉 Database cleanup complete!');
    
  } catch (error) {
    console.error('❌ Cleanup failed:', error.message);
  }
}

// Run the cleanup
clearAllUsers(); 