// Initialize Supabase client - global version

// Supabase configuration
const SUPABASE_URL = 'https://pyxqwiqvyivyopusgcey.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5eHF3aXF2eWl2eW9wdXNnY2V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwOTE1NzEsImV4cCI6MjA2MzY2NzU3MX0.vJEoejN1jgHeU5hcvujKMVuWCHkIy7010N76WXg3_1s';

// Initialize client
let _supabase = null;

// Function to initialize Supabase
function initSupabase() {
  if (!_supabase && window.supabase) {
    _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('Supabase client initialized');
  }
  return _supabase;
}

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', () => {
  initSupabase();
});

// Get the Supabase client
function getSupabaseClient() {
  if (!_supabase) {
    return initSupabase();
  }
  return _supabase;
}

// Authentication functions
async function signUp(email, password, name) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase client not initialized');
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name
        }
      }
    });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error signing up:', error.message);
    return { data: null, error };
  }
}

async function signIn(email, password) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase client not initialized');
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error signing in:', error.message);
    return { data: null, error };
  }
}

async function signOut() {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase client not initialized');
    
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error signing out:', error.message);
    return { error };
  }
}

async function getCurrentUser() {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase client not initialized');
    
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Error getting user:', error.message);
    return null;
  }
}

// Make functions available globally
window.bluestockAuth = {
  signUp,
  signIn,
  signOut,
  getCurrentUser,
  getSupabaseClient
};

// Database operations
async function createRecord(table, data) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase client not initialized');
    
    const { data: record, error } = await supabase
      .from(table)
      .insert(data)
      .select();
    
    if (error) throw error;
    return { data: record, error: null };
  } catch (error) {
    console.error(`Error creating ${table} record:`, error.message);
    return { data: null, error };
  }
}

async function getRecords(table, query = {}) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase client not initialized');
    
    let queryBuilder = supabase.from(table).select('*');
    
    // Apply filters if provided
    if (query.filters) {
      for (const [column, value] of Object.entries(query.filters)) {
        queryBuilder = queryBuilder.eq(column, value);
      }
    }
    
    // Apply order if provided
    if (query.orderBy) {
      queryBuilder = queryBuilder.order(query.orderBy, { 
        ascending: query.ascending !== undefined ? query.ascending : false 
      });
    }
    
    // Apply pagination
    if (query.limit) {
      queryBuilder = queryBuilder.limit(query.limit);
    }
    
    if (query.offset) {
      queryBuilder = queryBuilder.range(query.offset, query.offset + (query.limit || 10) - 1);
    }
    
    const { data, error } = await queryBuilder;
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error(`Error fetching ${table} records:`, error.message);
    return { data: null, error };
  }
}

async function updateRecord(table, id, data) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase client not initialized');
    
    const { data: record, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return { data: record, error: null };
  } catch (error) {
    console.error(`Error updating ${table} record:`, error.message);
    return { data: null, error };
  }
}

async function deleteRecord(table, id) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase client not initialized');
    
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error(`Error deleting ${table} record:`, error.message);
    return { error };
  }
}

// Add database operations to global object
window.bluestockDB = {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
};
