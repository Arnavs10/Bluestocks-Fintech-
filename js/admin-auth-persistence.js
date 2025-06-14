/**
 * Admin Dashboard Authentication Persistence Handler
 * 
 * This script prevents the issue of being redirected to the signin page
 * after reloading the admin dashboard by checking for auth tokens
 * early in the page load process, before redirects can happen.
 */

(function() {
  // Run immediately to check auth state before any other scripts
  console.log('[Auth Persistence] Running early auth persistence check');
  
  // Store the authentication check result to prevent duplicate redirects
  window.bluestockAuthCheck = window.bluestockAuthCheck || {};
  
  // Helper function to check if we're on admin dashboard
  function isAdminDashboardPage() {
    const path = window.location.href.toLowerCase();
    return path.includes('admin-dashboard') || path.includes('dashboard');
  }
  
  // Check if we're on the admin dashboard page
  if (isAdminDashboardPage()) {
    console.log('[Auth Persistence] On admin dashboard page');
    
    // First, set a flag to prevent immediate redirects by other scripts
    sessionStorage.setItem('adminDashboardLoaded', 'true');
    sessionStorage.setItem('adminDashboardDirectLoad', 'true');
    
    // Check for auth tokens in various storage locations
    const hasSupabaseToken = !!localStorage.getItem('sb-pyxqwiqvyivyopusgcey-auth-token');
    const hasBluestockAuth = localStorage.getItem('bluestock_user_authenticated') === 'true';
    const hasUserEmail = !!localStorage.getItem('bluestock_user_email');
    
    console.log('[Auth Persistence] Auth tokens present:', {
      supabaseToken: hasSupabaseToken,
      bluestockAuth: hasBluestockAuth,
      userEmail: hasUserEmail
    });
    
    // If no authentication tokens are found, redirect to signin
    if (!hasSupabaseToken && !hasBluestockAuth && !hasUserEmail) {
      console.log('[Auth Persistence] No auth tokens found, redirecting to signin');
      window.location.href = '/components/auth/signin.html';
    } else {
      console.log('[Auth Persistence] Auth tokens found, allowing admin dashboard to load');
      
      // Store a timestamp of when auth was verified to prevent multiple redirects
      window.bluestockAuthCheck.lastVerified = Date.now();
      
      // Try to initialize Supabase client if not already available
      if (!window.supabaseClient && window.supabase) {
        const supabase = window.supabase.createClient(
          'https://pyxqwiqvyivyopusgcey.supabase.co',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5eHF3aXF2eWl2eW9wdXNnY2V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwOTE1NzEsImV4cCI6MjA2MzY2NzU3MX0.vJEoejN1jgHeU5hcvujKMVuWCHkIy7010N76WXg3_1s',
          {
            auth: {
              persistSession: true,
              autoRefreshToken: true,
              detectSessionInUrl: true,
              storageKey: 'sb-pyxqwiqvyivyopusgcey-auth-token'
            }
          }
        );
        
        window.supabaseClient = supabase;
        console.log('[Auth Persistence] Created Supabase client with persistent session settings');
      }
      
      // Verify the token is valid in the background
      if (window.supabaseClient) {
        console.log('[Auth Persistence] Verifying session validity with Supabase');
        window.supabaseClient.auth.getSession().then(({ data, error }) => {
          if (error || !data || !data.session) {
            console.log('[Auth Persistence] Invalid session, redirecting to signin');
            // Only redirect if this is the first time we're checking (prevent redirect loops)
            if (!window.bluestockAuthCheck.redirected) {
              window.bluestockAuthCheck.redirected = true;
              window.location.href = '/components/auth/signin.html';
            }
          } else {
            console.log('[Auth Persistence] Valid session confirmed');
            
            // Store session data in localStorage for better persistence
            if (data.session.user) {
              localStorage.setItem('bluestock_user_authenticated', 'true');
              localStorage.setItem('bluestock_user_email', data.session.user.email);
              if (data.session.user.user_metadata && data.session.user.user_metadata.full_name) {
                localStorage.setItem('bluestock_user_name', data.session.user.user_metadata.full_name);
              }
            }
          }
        }).catch(err => {
          console.error('[Auth Persistence] Error checking session:', err);
        });
      }
    }
  }
})();
