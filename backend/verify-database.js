const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifyDatabase() {
  console.log('🔍 Verifying Horafly Database Setup...\n');

  try {
    // Check if all tables exist by querying their structure
    const tables = [
      'users',
      'leads', 
      'conversations',
      'messages',
      'call_recordings',
      'scripts',
      'script_usage',
      'credit_usage'
    ];

    console.log('📊 Checking Tables:');
    for (const table of tables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(1);
        
        if (error && error.code !== 'PGRST116') { // PGRST116 = empty table (which is fine)
          console.log(`❌ ${table}: ${error.message}`);
        } else {
          console.log(`✅ ${table}: Table exists and accessible`);
        }
      } catch (err) {
        console.log(`❌ ${table}: ${err.message}`);
      }
    }

    // Check sample scripts were inserted
    console.log('\n📝 Checking Sample Scripts:');
    const { data: scripts, error: scriptsError } = await supabase
      .from('scripts')
      .select('title, category, is_public')
      .eq('is_public', true);

    if (scriptsError) {
      console.log('❌ Scripts check failed:', scriptsError.message);
    } else {
      console.log(`✅ Found ${scripts.length} public script templates:`);
      scripts.forEach(script => {
        console.log(`   - ${script.title} (${script.category})`);
      });
    }

    console.log('\n🎉 Database verification complete!');
    console.log('🚀 Ready to build authentication system!');

  } catch (error) {
    console.error('❌ Database verification failed:', error.message);
  }
}

verifyDatabase(); 