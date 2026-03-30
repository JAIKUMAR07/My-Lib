const express = require('express');
const router = express.Router();
const { authenticateUser, requireRole } = require('../middleware/auth');
const { createClient } = require('@supabase/supabase-js');

// Backend Supabase client (with service role)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

/**
 * Get current user profile (protected)
 * Returns full profile info from our DB after token verification
 */
router.get('/me', authenticateUser, async (req, res) => {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.user.id)
      .single();
    
    if (error) {
       console.error('Profile fetch error:', error);
       return res.status(404).json({ error: 'Profile not found' });
    }
    
    res.json({ 
      success: true,
      user: {
        id: profile.id,
        email: profile.email,
        fullName: profile.full_name,
        role: profile.role,
        libId: profile.lib_id,
        department: profile.department,
        status: profile.status,
        maxBooksAllowed: profile.max_books_allowed
      }
    });

  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

/**
 * Create user profile after successful Supabase Auth Signup (frontend)
 */
router.post('/create-profile', authenticateUser, async (req, res) => {
  const { fullName, phone, department, role = 'student' } = req.body;
  
  try {
    // 1. Create the main profile record
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: req.user.id, // Verified ID from token
        email: req.user.email,
        full_name: fullName,
        phone,
        department,
        role,
        lib_id: `LIB-${Date.now().toString().slice(-4)}`,
        status: 'active',
        max_books_allowed: role === 'student' ? 3 : 10,
        registration_date: new Date().toISOString()
      })
      .select()
      .single();
    
    if (profileError) {
       console.error('Profile creation error:', profileError);
       return res.status(400).json({ error: profileError.message });
    }
    
    res.json({ 
      success: true, 
      profile 
    });

  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ error: 'Failed to create database profile' });
  }
});

/**
 * Admin API: Register a new user and create their profile in one go.
 * This uses the Supabase service role to bypass email confirmation (auto-confirm).
 */
router.post('/admin-register', 
  authenticateUser, 
  requireRole(['admin']), 
  async (req, res) => {
    const { email, password, fullName, role, department } = req.body;
    
    try {
      // 1. Create the Auth account via Supabase Admin API
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: fullName, role, department }
      });
      
      if (authError) throw authError;

      // 2. Create the Database Profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authUser.user.id,
          email,
          full_name: fullName,
          department,
          role,
          lib_id: `LIB-${Math.floor(Math.random() * 9000) + 1000}-${role.charAt(0).toUpperCase()}`,
          status: 'active',
          max_books_allowed: role === 'student' ? 3 : 10,
          registration_date: new Date().toISOString()
        })
        .select()
        .single();
      
      if (profileError) throw profileError;

      res.status(201).json({ 
        success: true, 
        message: `Account and profile created successfully for ${email}.`,
        user: profile
      });

    } catch (error) {
      console.error('Error during admin registration:', error);
      res.status(400).json({ success: false, error: error.message });
    }
  }
);

/**
 * Example of an Admin-only route
 */
router.get('/admin/users', 
  authenticateUser, 
  requireRole(['admin']), 
  async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('registration_date', { ascending: false });
      
      if (error) throw error;
      res.json({ success: true, users: data });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

/**
 * Update user profile (protected)
 */
router.patch('/profile', authenticateUser, async (req, res) => {
  const { fullName, phone, department } = req.body;
  
  try {
    const { data: updatedProfile, error } = await supabase
      .from('profiles')
      .update({
        full_name: fullName,
        phone,
        department
      })
      .eq('id', req.user.id)
      .select()
      .single();
    
    if (error) throw error;
    
    res.json({ 
      success: true, 
      message: 'Profile updated successfully',
      user: updatedProfile 
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
