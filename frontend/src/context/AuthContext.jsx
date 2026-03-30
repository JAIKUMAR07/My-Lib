import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Get initial session on app mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session) {
        fetchUserRoleAndProfile(session.access_token);
      } else {
        setLoading(false);
      }
    });

    // 2. Listen for auth changes (Signup, Signin, Signout, Token Refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth State Event:', event);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session) {
          await fetchUserRoleAndProfile(session.access_token);
        } else {
          setUserRole(null);
          setProfileData(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  /**
   * Fetches the user's role and metadata from our own backend
   * This is the "Source of Truth" for library permissions
   */
  const fetchUserRoleAndProfile = async (token) => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      console.log('👤 AUTH: Fetching role from', `${baseUrl}/api/auth/me`);
      const response = await fetch(`${baseUrl}/api/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      console.log('👤 AUTH: /api/auth/me response status:', response.status);
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error('⚠️ BACKEND ERROR: Received HTML/Text instead of JSON. Backend may be down.');
        return;
      }
      
      if (response.ok) {
        console.log('✅ AUTH: Role set to:', data.user.role, '| User:', data.user.email);
        setUserRole(data.user.role);
        setProfileData(data.user);
      } else {
        console.error('❌ AUTH: /api/auth/me failed:', data);
      }
    } catch (error) {
      console.error('❌ AUTH: Network error fetching profile:', error.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sync profile state with new data (called after successful edit)
   */
  const updateProfile = (updatedData) => {
    setProfileData(prev => ({ ...prev, ...updatedData }));
  };

  const value = {
    user,
    session,
    userRole,
    profileData,
    loading,
    isAuthenticated: !!user,
    isAdmin: userRole === 'admin',
    isLibrarian: userRole === 'librarian',
    isStudent: userRole === 'student',
    signOut: () => supabase.auth.signOut(),
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
