import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to get user with profile
  const getUserWithProfile = async () => {
    try {
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !authUser) return null;

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
        // Fallback to auth user metadata if profile fetch fails
        return {
          ...authUser,
          role: authUser.user_metadata?.role || "member",
          ...authUser.user_metadata,
        };
      }

      return {
        ...authUser,
        ...profile,
      };
    } catch (error) {
      console.error("Error getting user:", error);
      return null;
    }
  };

  useEffect(() => {
    // Check active sessions and sets the user
    const initializeAuth = async () => {
      const currentUser = await getUserWithProfile();
      setUser(currentUser);
      setLoading(false);
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const currentUser = await getUserWithProfile();
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sign up with email and password
  const signUp = async ({
    email,
    password,
    username,
    full_name,
    role = "member",
  }) => {
    try {
      // 1. Create user in Supabase Auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp(
        {
          email,
          password,
          options: {
            data: {
              username,
              full_name,
              role,
            },
          },
        }
      );

      if (signUpError) throw signUpError;

      // 2. Create profile in database
      if (authData.user) {
        const { error: profileError } = await supabase.from("profiles").insert({
          id: authData.user.id,
          email,
          username,
          full_name,
          role,
        });

        if (profileError) {
          // If profile creation fails, delete the auth user
          // Note: This requires admin privileges which public client might not have
          // Ideally this should be done on backend
          console.error("Profile creation error:", profileError);
          throw profileError;
        }
      }

      return { success: true, user: authData.user, session: authData.session };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Sign in with email and password
  const signIn = async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Get user profile
      const userData = await getUserWithProfile();
      setUser(userData);

      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Sign out
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Check if user has any of the roles
  const hasAnyRole = (roles) => {
    return roles.includes(user?.role);
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    hasRole,
    hasAnyRole,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
