import { createClient } from '@supabase/supabase-js';

// Vite uses import.meta.env for environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase configuration missing in .env");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,   // Keeps the user logged in after refresh
    autoRefreshToken: true,  // Automatically refreshes the JWT token
    detectSessionInUrl: true // Required for social logins and password resets
  }
});

/**
 * Auth service for centralized authentication logic
 */
export const authService = {
  // Sign up - creates user in Supabase Auth
  async signUp(email, password, userData) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: userData.fullName,
          role: userData.role || 'student'
        }
      }
    });
    
    if (error) throw error;
    
    // After signup, we create the database profile record via our backend
    if (data.user && data.session) {
      const token = data.session.access_token;
      await this.createUserProfile(token, {
        fullName: userData.fullName,
        phone: userData.phone,
        department: userData.department,
        role: userData.role || 'student'
      });
    }
    
    return data;
  },
  
  // Sign in
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    return data;
  },
  
  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
  
  // Create user profile record in the database via the backend
  async createUserProfile(token, profileData) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/create-profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
    });
    
    if (!response.ok) {
       const err = await response.json();
       throw new Error(err.error || 'Failed to initialize database profile');
    }
    return response.json();
  }
};
