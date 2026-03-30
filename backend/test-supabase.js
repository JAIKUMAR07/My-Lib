require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testConnection() {
  console.log('--- Supabase Diagnostic ---');
  console.log('URL:', process.env.SUPABASE_URL);
  
  try {
    // 1. Test Categories
    console.log('\n1. Testing Categories Table...');
    const { data: catData, error: catError } = await supabase.from('categories').select('*').limit(1);
    if (catError) {
      console.error('❌ Categories Read Error:', catError.message);
    } else {
      console.log('✅ Categories Read Success. Count:', catData.length);
    }

    // 2. Test Languages
    console.log('\n2. Testing Languages Table...');
    const { data: langData, error: langError } = await supabase.from('languages').select('*').limit(1);
    if (langError) {
      console.error('❌ Languages Read Error:', langError.message);
    } else {
      console.log('✅ Languages Read Success. Count:', langData.length);
    }

    // 3. Test Books (Check if table exists)
    console.log('\n3. Testing Books Table...');
    const { data: bookData, error: bookError } = await supabase.from('books').select('*').limit(1);
    if (bookError) {
      console.error('❌ Books Table Error:', bookError.message);
      if (bookError.message.includes('does not exist')) {
        console.log('⚠️  SUGGESTION: You need to run the books table SQL in Supabase!');
      }
    } else {
      console.log('✅ Books Read Success.');
    }

    // 4. Test Insertion Attempt
    console.log('\n4. Attempting Test Category Insertion...');
    const testName = 'Diagnostic_' + Date.now();
    const { data: insData, error: insError } = await supabase
      .from('categories')
      .insert({ name: testName, link: '/test' })
      .select();
    
    if (insError) {
      console.error('❌ Insertion Failed:', insError.message);
    } else {
      console.log('✅ Insertion Successful! Record:', insData[0]);
      // Cleanup
      await supabase.from('categories').delete().eq('name', testName);
      console.log('🧹 Cleanup complete.');
    }

  } catch (err) {
    console.error('🚨 Unexpected Error:', err.message);
  }
}

testConnection();
