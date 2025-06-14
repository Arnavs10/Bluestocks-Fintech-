// Supabase Client Initialization Helper
// This script must be loaded before any scripts that use Supabase

(function() {
  // Supabase configuration
  const SUPABASE_URL = 'https://pyxqwiqvyivyopusgcey.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5eHF3aXF2eWl2eW9wdXNnY2V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwOTE1NzEsImV4cCI6MjA2MzY2NzU3MX0.vJEoejN1jgHeU5hcvujKMVuWCHkIy7010N76WXg3_1s';
  
  // Initialize supabase client only if it doesn't exist
  function initializeSupabaseClient() {
    if (window.supabaseClient) {
      console.log('[Supabase Init] Client already exists');
      return window.supabaseClient;
    }
    
    if (typeof supabase === 'undefined') {
      console.error('[Supabase Init] Supabase library not loaded!');
      
      // Create a custom event to notify when the library is finally loaded
      window.addEventListener('supabaseLoaded', function() {
        console.log('[Supabase Init] Library loaded event detected, initializing client');
        initializeSupabaseClient();
      });
      
      return null;
    }
    
    try {
      console.log('[Supabase Init] Creating new Supabase client');
      const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          storageKey: 'sb-pyxqwiqvyivyopusgcey-auth-token'
        }
      });
      
      window.supabaseClient = client;
      console.log('[Supabase Init] Client successfully initialized');
      
      // Dispatch an event to notify that the client is ready
      const event = new CustomEvent('supabaseClientReady', { detail: { client } });
      window.dispatchEvent(event);
      
      return client;
    } catch (error) {
      console.error('[Supabase Init] Failed to initialize client:', error);
      return null;
    }
  }
  
  // Try to initialize immediately
  if (typeof supabase !== 'undefined') {
    initializeSupabaseClient();
  } else {
    // Wait for Supabase library to load
    console.log('[Supabase Init] Waiting for Supabase library to load');
    
    // Set up a watcher for the supabase object
    let supabaseCheckCount = 0;
    const checkInterval = setInterval(function() {
      supabaseCheckCount++;
      
      if (typeof supabase !== 'undefined') {
        clearInterval(checkInterval);
        console.log('[Supabase Init] Supabase library detected after ' + supabaseCheckCount + ' checks');
        
        // Dispatch an event
        const event = new CustomEvent('supabaseLoaded');
        window.dispatchEvent(event);
        
        initializeSupabaseClient();
      }
      
      // Give up after 100 attempts (10 seconds)
      if (supabaseCheckCount > 100) {
        clearInterval(checkInterval);
        console.error('[Supabase Init] Timed out waiting for Supabase library');
      }
    }, 100);
  }
  
  // Also try on DOM content loaded
  document.addEventListener('DOMContentLoaded', function() {
    if (!window.supabaseClient && typeof supabase !== 'undefined') {
      initializeSupabaseClient();
    }
  });
  
  // Export initialization function globally
  window.initializeSupabaseClient = initializeSupabaseClient;
})();
