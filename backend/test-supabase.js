require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey || supabaseUrl === "YOUR_SUPABASE_PROJECT_URL") {
  console.error("❌ ERROR: Supabase environment variables are not configured in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log("🔍 Checking Supabase connection...");
  try {
    // Attempting to fetch tables from the public schema
    const { data, error } = await supabase
      .from('_prisma_migrations') // This is a common table if you use prisma, but let's try a system fetch
      .select('*')
      .limit(1);

    // If there's an error but it's not a connection error (e.g., table doesn't exist)
    // it means the connection itself is working.
    if (error && error.code === 'PGRST116') {
       console.log("✅ CONNECTION SUCCESSFUL: Logged into Supabase successfully.");
       console.log("   (Note: No tables found in the public schema yet, but credentials are correct.)");
    } else if (error) {
       console.log("⚠️  CREDENTIAL WARNING: ", error.message);
    } else {
       console.log("✅ CONNECTION SUCCESSFUL: Found database and tables.");
    }
    
  } catch (err) {
    console.error("❌ CONNECTION FAILED: ", err.message);
  }
}

testConnection();
