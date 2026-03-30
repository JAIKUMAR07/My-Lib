require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

async function testSave() {
  console.log('\n=== PIPELINE DIAGNOSTIC ===');
  console.log('Supabase URL:', process.env.SUPABASE_URL);
  console.log('Key length:', process.env.SUPABASE_SERVICE_ROLE_KEY?.length, '(should be 200+ chars)');
  console.log('Key starts with eyJ:', process.env.SUPABASE_SERVICE_ROLE_KEY?.startsWith('eyJ'));

  // Test 1: Direct insert to categories
  console.log('\n--- Test 1: Direct INSERT to categories ---');
  const testName = 'TEST_' + Date.now();
  const { data, error } = await supabase
    .from('categories')
    .insert({ name: testName, link: '/test' })
    .select().single();

  if (error) {
    console.error('❌ INSERT FAILED:', error.message);
    console.error('   Code:', error.code);
    console.error('   Details:', error.details);
    console.error('   Hint:', error.hint);
  } else {
    console.log('✅ INSERT WORKED! Row:', data);
    // Cleanup
    await supabase.from('categories').delete().eq('id', data.id);
    console.log('🧹 Cleaned up test row.');
  }

  // Test 2: Check profiles table (for role lookup)
  console.log('\n--- Test 2: Check profiles table ---');
  const { data: profiles, error: profErr } = await supabase
    .from('profiles')
    .select('id, role, email')
    .limit(3);
  
  if (profErr) {
    console.error('❌ Cannot read profiles table:', profErr.message);
    console.log('   ⚠️  This is why requireRole() fails! User role cannot be fetched.');
  } else {
    console.log('✅ Profiles found:', profiles);
    const hasAdmin = profiles.some(p => p.role === 'admin' || p.role === 'librarian');
    if (!hasAdmin) {
      console.log('⚠️  WARNING: No admin/librarian role found in profiles!');
      console.log('   This means requireRole(["admin","librarian"]) will BLOCK all saves.');
    }
  }
}

testSave().catch(console.error);
