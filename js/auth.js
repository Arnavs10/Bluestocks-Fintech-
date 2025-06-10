// Authentication functions for Bluestock
// This file uses the Supabase client loaded from CDN

// Global state management
window.authState = {
  initialized: false,  // Has auth been initialized?
  user: null,          // Current user object
  isAuthenticated: false, // Is user authenticated?
  isAdmin: true,       // Is user admin? (Default true for now as specified)
  isRedirecting: false // Are we in the middle of a redirect?
};

// Use the global Supabase client ONLY
if (!window.supabaseClient) {
  alert('Authentication error: Supabase client not initialized. Please reload the page or contact support.');
  throw new Error('Supabase client not initialized.');
}

// Check for Supabase client on page load - initialize only once
if (!window.authState.initialized) {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('%c AUTH.JS LOADED', 'background: #2ecc71; color: white; font-size: 14px; padding: 3px 6px;');
    // Wait for Supabase to restore session before checking auth state
    window.supabaseClient.auth.onAuthStateChange((event, session) => {
  console.log('[Supabase] onAuthStateChange event:', event);
  console.log('[Supabase] Session from event:', session);
  if (event === 'INITIAL_SESSION') {
    checkAuthState().then(() => {
      if (window.authState.isAuthenticated) {
  const currentPath = window.location.pathname.replace(/^\/+/, '').toLowerCase();
  if (currentPath === 'signin' || currentPath === 'signin.html') {
    console.log('[Auth Debug] Authenticated user on signin page, redirecting to /admin-dashboard');
    if (window.bluestockRouter && typeof window.bluestockRouter.navigate === 'function') {
      window.bluestockRouter.navigate('admin-dashboard', true);
    } else {
      window.location.href = '/admin-dashboard';
    }
  }
}
    });
  }
});
  });
}

// Get the Supabase client instance
function getClient() {
  if (window.supabaseClient) {
    return window.supabaseClient;
  } else {
    console.error('Supabase client not initialized');
    return null;
  }
}

// Check if user is already logged in (runs on page load and route change)
async function checkAuthState() {
  // Prevent duplicate checks during redirects
  if (window.authState.isRedirecting) {
    console.log('Redirect in progress, skipping auth check');
    return;
  }
  try {
    const supabase = getClient();
    if (!supabase) throw new Error('Supabase client not initialized');
    // Get session from Supabase (uses localStorage/sessionStorage as set by persistSession)
    const { data, error } = await supabase.auth.getSession();
    console.log('[Auth Debug] Supabase getSession() data:', data);
    if (error) throw error;
    const user = data && data.session && data.session.user ? data.session.user : null;
    console.log('[Auth Debug] User from session:', user);
    window.authState.user = user;
    window.authState.isAuthenticated = !!user;
    window.authState.initialized = true;
    window.userAuthenticated = !!user;
    window.currentUser = user;
    // Dispatch auth event for other listeners
    const authInitEvent = new CustomEvent('authInitialized', { 
      detail: { user: user, isAuthenticated: !!user } 
    });
    document.dispatchEvent(authInitEvent);
    // Routing logic
    const currentPath = window.location.pathname;
    const cleanPath = currentPath.replace(/^\/+/, '');
    const adminDashboardLoaded = sessionStorage.getItem('adminDashboardLoaded') === 'true';
    const isAdminDashboardPath = cleanPath.startsWith('admin-dashboard');
    if (user) {
      window.authState.isAdmin = true;
      if (isAdminDashboardPath && !adminDashboardLoaded) {
        sessionStorage.setItem('adminDashboardLoaded', 'true');
      }
      return;
    }
    // Not logged in, redirect if on protected page
    if ((cleanPath.startsWith('dashboard') || cleanPath.startsWith('admin-dashboard')) && 
        !window.location.pathname.includes('signin')) {
      window.authState.isRedirecting = true;
      console.log('Redirecting unauthenticated user from protected page to signin');
      redirectToPage('/signin');
    }
  } catch (error) {
    console.error('[Auth Debug] Error checking authentication state:', error);
  }
}

// Helper function to handle redirects consistently
function redirectToPage(path) {
  // Clean the path for consistent handling
  const cleanPath = path.replace(/^\/+/, '');
  
  // Get current path to prevent redirect loops
  const currentPath = window.location.pathname.toLowerCase().replace(/^\/+/, '');
  
  // Prevent redirect loops by checking if we're already on the target page
  if (currentPath === cleanPath) {
    console.log(`Already on ${cleanPath}, preventing redirect loop`);
    if (window.authState) window.authState.isRedirecting = false;
    return;
  }
  
  // Set session storage flag for admin dashboard to prevent reload loops
  if (cleanPath.startsWith('admin-dashboard')) {
    sessionStorage.setItem('adminDashboardLoaded', 'true');
  } else if (cleanPath.startsWith('signin') || cleanPath.startsWith('signup')) {
    sessionStorage.removeItem('adminDashboardLoaded');
  }
  
  // Use SPA routing if available
  if (typeof window.handleRouting === 'function') {
    console.log(`Using SPA routing to redirect to ${path}`);
    window.history.pushState({}, '', path);
    // Force the routing to avoid skipping redirects in progress
    window.handleRouting(true);
  } else {
    // Fallback to direct navigation
    console.log(`Using direct navigation to redirect to ${path}`);
    setTimeout(() => {
      window.location.href = path;
    }, 150); // Small delay to allow logs to be seen
  }
  
  // Reset redirect flag after a delay
  setTimeout(() => {
    if (window.authState) window.authState.isRedirecting = false;
  }, 500);
}

// Get current user
async function getCurrentUser() {
  try {
    const supabase = getClient();
    if (!supabase) return null;
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      // Log user data for debugging
      console.log('Retrieved user:', user.email);
      console.log('User metadata:', user.user_metadata);
      
      // Store user in global window object for easy access
      window.currentUser = user;
      
      // Ensure we have the latest metadata by refreshing the session
      try {
        const { data: sessionData } = await supabase.auth.refreshSession();
        if (sessionData && sessionData.user) {
          console.log('Refreshed user session with updated metadata');
          // Update the global user object with refreshed data
          window.currentUser = sessionData.user;
          return sessionData.user;
        }
      } catch (refreshError) {
        console.warn('Could not refresh session:', refreshError.message);
      }
    }
    
    return user;
  } catch (error) {
    console.error('Error getting user:', error.message);
    return null;
  }
}

// Handle sign-up form submission
function initSignup() {
  const signupForm = document.getElementById('signupForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const signupButton = document.getElementById('signupButton');
  const errorMessage = document.getElementById('errorMessage');
  
  if (!signupForm) return;
  
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    signupButton.disabled = true;
    signupButton.textContent = 'Signing up...';
    
    // Get form values
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    // Validate input
    if (!name || !email || !password) {
      errorMessage.textContent = 'All fields are required';
      signupButton.disabled = false;
      signupButton.textContent = 'Sign Up';
      return;
    }
    
    if (password.length < 6) {
      errorMessage.textContent = 'Password must be at least 6 characters';
      signupButton.disabled = false;
      signupButton.textContent = 'Sign Up';
      return;
    }
    
    try {
      const supabase = getClient();
      if (!supabase) throw new Error('Supabase client not initialized');
      
      // Attempt to sign up
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name
          }
        }
      });
      
      if (error) {
        throw error;
      }
      
      // Show success message
      errorMessage.textContent = '';
      alert('Registration successful! Please check your email to confirm your account.');
      
      // Redirect to sign-in page
      window.location.hash = '#/signin';
    } catch (error) {
      // Show error message
      errorMessage.textContent = error.message || 'Failed to sign up. Please try again.';
      
      // Reset button state
      signupButton.disabled = false;
      signupButton.textContent = 'Sign Up';
    }
  });
  
  // Password visibility toggle
  const togglePassword = document.getElementById('togglePassword');
  const eyeIcon = document.getElementById('eyeIcon');
  
  if (togglePassword && passwordInput && eyeIcon) {
    togglePassword.addEventListener('click', () => {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.src = '../../images/eye-slash.svg';
      } else {
        passwordInput.type = 'password';
        eyeIcon.src = '../../images/eye.svg';
      }
    });
  }
}

// Handle sign-in form submission
function initSignin() {
  const signinForm = document.getElementById('signinForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const signinButton = document.getElementById('signinButton');
  const errorMessage = document.getElementById('errorMessage');
  const rememberMe = document.getElementById('rememberMe');
  
  if (!signinForm) return;
  
  signinForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Store rememberMe preference for checkbox UI only
    if (rememberMe && rememberMe.checked) {
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('rememberMe');
    }
    // Show loading state
    signinButton.disabled = true;
    signinButton.textContent = 'Signing in...';
    // Get form values
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    try {
      const supabase = getClient();
      if (!supabase) throw new Error('Supabase client not initialized');
      // Always persist session so user stays logged in after reload
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          persistSession: true
        }
      });
      if (error) throw error;
      // No need to save rememberMe preference anymore
      localStorage.removeItem('rememberMe');

      errorMessage.textContent = '';
      // Redirect to dashboard (SPA hash route or use router)
      if (window.bluestockRouter && typeof window.bluestockRouter.navigate === 'function') {
        window.bluestockRouter.navigate('dashboard', true);
      } else {
        window.location.hash = '#/dashboard';
      }
    } catch (error) {
      errorMessage.textContent = error.message || 'Failed to sign in. Please check your credentials.';
      signinButton.disabled = false;
      signinButton.textContent = 'Sign In';
    }
  });
  
  // Password visibility toggle
  const togglePassword = document.getElementById('togglePassword');
  const eyeIcon = document.getElementById('eyeIcon');
  
  if (togglePassword && passwordInput && eyeIcon) {
    togglePassword.addEventListener('click', () => {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.src = '../../images/eye-slash.svg';
      } else {
        passwordInput.type = 'password';
        eyeIcon.src = '../../images/eye.svg';
      }
    });
  }
  
  // No longer need to set remember me checkbox, session is always persisted

}

// Handle sign out
async function signOutUser() {
  const supabase = getClient();
  if (!supabase) {
    console.error('Supabase client not initialized');
    return;
  }
  try {
    console.log('Signing out user...');
    // Clear rememberMe preference when signing out
    localStorage.removeItem('rememberMe');
    // Clear any auth state
    if (window.authState) {
      window.authState.user = null;
      window.authState.isAuthenticated = false;
      window.authState.isAdmin = false;
    }
    // Clear session storage items
    sessionStorage.removeItem('adminDashboardLoaded');
    // Sign out from Supabase
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    // Also clear Supabase session data from localStorage/sessionStorage
    localStorage.removeItem('supabase.auth.token');
    sessionStorage.removeItem('supabase.auth.token');
    console.log('User successfully signed out');
    window.location.href = '../auth/signin.html';
  } catch (error) {
    console.error('Error signing out:', error.message);
    alert('There was an error signing out. Please try again.');
  }
}

// No longer need to set rememberMe checkbox on page load, since session is always persisted


// Initialize auth functionality based on current page
function initAuth() {
  if (window.location.hash === '#/signup') {
    initSignup();
  } else if (window.location.hash === '#/signin') {
    initSignin();
  }
  
  // Listen for hash changes to reinitialize auth when navigating between pages
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#/signup') {
      initSignup();
    } else if (window.location.hash === '#/signin') {
      initSignin();
    }
  });
}
