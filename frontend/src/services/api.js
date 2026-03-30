import { supabase } from '../lib/supabaseClient';

/**
 * 🔗 NEX-LIB API INFRASTRUCTURE
 * Standardized service for all authenticated backend communication.
 */
class ApiService {
  constructor() {
    // 1. Get Base URL from environment (Vite only exposes variables with VITE_ prefix)
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    console.log(`🌐 API_SERVICE: Initialized with base: ${this.baseUrl}`);
  }

  /**
   * 🔐 Core Fetch Logic with JWT Injection
   */
  async fetchWithAuth(endpoint, options = {}) {
    console.log(`📡 API_REQUEST: [${options.method || 'GET'}] ${endpoint}`);
    
    // 1. Recover current Supabase session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      console.error("❌ API_AUTH: Session missing or invalid.");
      // Throwing error instead of redirecting prevents infinite loops during dev
      throw new Error('Unauthorized: No active session found.');
    }
    
    // 2. Build secure request headers
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`,
      ...options.headers
    };
    
    try {
      // 3. Perform network request
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers
      });
      
      console.log(`📥 API_RESPONSE: [${response.status}] ${endpoint}`);

      // 4. Trace the actual payload
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown Network Error' }));
        console.error('❌ API_SERVER_ERROR:', errorData);
        throw new Error(errorData.error || `Server Request Failed (${response.status})`);
      }
      
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error(`🚨 API_PIPELINE_ERROR @ ${endpoint}:`, error.message);
      throw error;
    }
  }

  async fetchPublic(endpoint, options = {}) {
    console.log(`📡 API_PUBLIC_REQUEST: [${options.method || 'GET'}] ${endpoint}`);
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers
      });

      console.log(`📥 API_PUBLIC_RESPONSE: [${response.status}] ${endpoint}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown Network Error' }));
        throw new Error(errorData.error || `Server Request Failed (${response.status})`);
      }

      return await response.json();
    } catch (error) {
      console.error(`🚨 API_PUBLIC_ERROR @ ${endpoint}:`, error.message);
      throw error;
    }
  }
  
  /**
   * 📒 BOOK INVENTORY API
   */
  async getAllBooks() {
    return this.fetchWithAuth('/api/books');
  }
  
  async getBorrowingHistory() {
    return this.fetchWithAuth('/api/auth/me/borrowings');
  }
  
  async requestBorrow(bookId) {
    return this.fetchWithAuth('/api/borrow', {
      method: 'POST',
      body: JSON.stringify({ bookId })
    });
  }

  /**
   * 👤 IDENTITY MANAGEMENT
   */
  async patch(endpoint, body) {
    return this.fetchWithAuth(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  /**
   * ⚙️ CATALOG SETTINGS (Metadata Lifecycle)
   */
  async getCategories() {
    return this.fetchPublic('/api/settings/categories');
  }

  async addCategory(name, link) {
    return this.fetchWithAuth('/api/settings/categories', {
      method: 'POST',
      body: JSON.stringify({ name, link })
    });
  }

  async deleteCategory(id) {
    return this.fetchWithAuth(`/api/settings/categories/${id}`, {
      method: 'DELETE'
    });
  }

  async updateCategoryLink(id, link) {
    return this.fetchWithAuth(`/api/settings/categories/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ link })
    });
  }

  async getLanguages() {
    return this.fetchPublic('/api/settings/languages');
  }

  async addLanguage(name) {
    return this.fetchWithAuth('/api/settings/languages', {
      method: 'POST',
      body: JSON.stringify({ name })
    });
  }

  async deleteLanguage(id) {
    return this.fetchWithAuth(`/api/settings/languages/${id}`, {
      method: 'DELETE'
    });
  }

  /**
   * 🛡️ ADMINISTRATIVE REGISTRY
   */
  async getAdminUserRegistry() {
    return this.fetchWithAuth('/api/auth/admin/users');
  }
}

export const apiService = new ApiService();
