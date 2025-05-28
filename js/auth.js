// Authentication functions for Bluestock
// This file uses the Supabase client loaded from CDN

// Initialize Supabase client - only if not already initialized
if (!window.supabaseClient) {
  const SUPABASE_URL = 'https://pyxqwiqvyivyopusgcey.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5eHF3aXF2eWl2eW9wdXNnY2V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwOTE1NzEsImV4cCI6MjA2MzY2NzU3MX0.vJEoejN1jgHeU5hcvujKMVuWCHkIy7010N76WXg3_1s';
  window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  console.log('%c SUPABASE CLIENT INITIALIZED IN AUTH.JS', 'background: #3498db; color: white; font-size: 14px; padding: 3px 6px;');
}

// Check for Supabase client on page load
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c AUTH.JS LOADED', 'background: #2ecc71; color: white; font-size: 14px; padding: 3px 6px;');
  // Check auth state
  setTimeout(checkAuthState, 500); // Small delay to ensure client is initialized
});

// Get the Supabase client instance
function getClient() {
  if (window.supabaseClient) {
    return window.supabaseClient;
  } else {
    console.error('Supabase client not initialized');
    return null;
  }
}

// Check if user is already logged in
async function checkAuthState() {
  const user = await getCurrentUser();
  
  // Store auth state in window object for access by other scripts
  window.userAuthenticated = !!user;
  window.currentUser = user;
  
  const currentPath = window.location.pathname;
  
  if (user) {
    console.log('%c USER AUTHENTICATED:', 'background: #27ae60; color: white; font-size: 14px; padding: 3px 6px;', user.email);
    // If we're on the sign-in or sign-up page and already logged in, redirect to dashboard
    if (currentPath.includes('/signin.html') || currentPath.includes('/signup.html')) {
      console.log('Redirecting to dashboard (already authenticated)');
      window.location.href = '../dashboard/dashboard.html';
    }
  } else {
    console.log('%c NO USER AUTHENTICATED', 'background: #e74c3c; color: white; font-size: 14px; padding: 3px 6px;');
    // If we're on a protected page and not logged in, redirect to sign-in
    if (currentPath.includes('/dashboard')) {
      console.log('Redirecting to signin (not authenticated)');
      window.location.href = '../auth/signin.html';
    }
  }
}

// Get current user
async function getCurrentUser() {
  try {
    const supabase = getClient();
    if (!supabase) return null;
    
    const { data: { user } } = await supabase.auth.getUser();
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
    
    // Show loading state
    signinButton.disabled = true;
    signinButton.textContent = 'Signing in...';
    
    // Get form values
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    // Validate input
    if (!email || !password) {
      errorMessage.textContent = 'Email and password are required';
      signinButton.disabled = false;
      signinButton.textContent = 'Sign In';
      return;
    }
    
    try {
      const supabase = getClient();
      if (!supabase) throw new Error('Supabase client not initialized');
      
      // Attempt to sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        throw error;
      }
      
      // Save remember me preference
      if (rememberMe && rememberMe.checked) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }
      
      // Clear error message
      errorMessage.textContent = '';
      
      // Redirect to dashboard
      window.location.hash = '#/dashboard';
    } catch (error) {
      // Show error message
      errorMessage.textContent = error.message || 'Failed to sign in. Please check your credentials.';
      
      // Reset button state
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
  
  // Set remember me checkbox from localStorage
  if (rememberMe && localStorage.getItem('rememberMe') === 'true') {
    rememberMe.checked = true;
  }
}

// Handle sign out
function signOutUser() {
  const supabase = getClient();
  if (!supabase) {
    console.error('Supabase client not initialized');
    return;
  }
  
  supabase.auth.signOut().then(() => {
    window.location.hash = '#/signin';
  }).catch(error => {
    console.error('Error signing out:', error.message);
  });
}

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
