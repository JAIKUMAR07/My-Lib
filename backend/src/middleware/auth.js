const { createClient } = require('@supabase/supabase-js');

// Backend Supabase client (with service role for full access)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY, // IMPORTANT: Use service role, not anon
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

/**
 * Middleware to verify JWT token from frontend
 */
const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error('🚫 AUTH: No Bearer token in request headers');
    return res.status(401).json({ error: 'No token provided' });
  }
  
  const token = authHeader.split(' ')[1];
  console.log(`🔑 AUTH: Token received (first 20 chars): ${token.substring(0, 20)}...`);
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      console.error('🚫 AUTH: Token verification FAILED:', error?.message);
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    
    console.log(`✅ AUTH: Token valid. User: ${user.email}`);
    req.user = { id: user.id, email: user.email, user_metadata: user.user_metadata };
    
    const { data: profile, error: roleError } = await supabase
      .from('profiles')
      .select('role, lib_id, status')
      .eq('id', user.id)
      .single();
    
    if (roleError) {
      console.error(`🚫 AUTH: Profile lookup FAILED for ${user.email}:`, roleError.message);
    } else if (profile) {
      console.log(`✅ AUTH: Profile found. Role: "${profile.role}"`);
      req.user.role = profile.role;
      req.user.libId = profile.lib_id;
      req.user.status = profile.status;
    } else {
      console.error(`🚫 AUTH: No profile found for user ${user.email}`);
    }
    
    next();
  } catch (error) {
    console.error('🚫 AUTH: Unexpected error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

/**
 * Role-based authorization middleware
 */
const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      console.error('🚫 ROLE: No user attached to request');
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    console.log(`🔒 ROLE CHECK: User "${req.user.email}" has role "${req.user.role}". Required: [${allowedRoles.join(', ')}]`);
    
    if (!req.user.role || !allowedRoles.includes(req.user.role)) {
      console.error(`🚫 ROLE DENIED: "${req.user.role}" is not in [${allowedRoles.join(', ')}]`);
      return res.status(403).json({ 
        error: `Access denied. Your role is "${req.user.role || 'none'}". Required: ${allowedRoles.join(' or ')}`
      });
    }
    
    console.log(`✅ ROLE GRANTED for ${req.user.email}`);
    next();
  };
};

module.exports = { authenticateUser, requireRole };
