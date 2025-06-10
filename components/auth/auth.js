// Initialize Supabase client
// Use the global Supabase client ONLY
const supabase = window.supabaseClient;
if (!supabase) {
  alert('Authentication error: Supabase client not initialized. Please reload the page or contact support.');
  throw new Error('Supabase client not initialized.');
}

// Check which page we're on
const isSignin = window.location.pathname.includes('signin');
const isSignup = window.location.pathname.includes('signup');

// Common DOM Elements
const togglePasswordBtn = document.getElementById('togglePassword');
const eyeIcon = document.getElementById('eyeIcon');
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notificationMessage');
const googleSignInBtn = document.getElementById('googleSignIn');

// Page-specific DOM elements
let signinForm, signinButton, emailInput, passwordInput, rememberMe;
let signupForm, signupButton, nameInput;

// Initialize page-specific elements
if (isSignin) {
    signinForm = document.getElementById('signinForm');
    signinButton = document.getElementById('signinButton');
    emailInput = document.getElementById('email');
    passwordInput = document.getElementById('password');
    rememberMe = document.getElementById('rememberMe');
} else if (isSignup) {
    signupForm = document.getElementById('signupForm');
    signupButton = document.getElementById('signupButton');
    nameInput = document.getElementById('name');
    emailInput = document.getElementById('email');
    passwordInput = document.getElementById('password');
}

// Toggle password visibility
if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.src = '../../images/eye-slash.svg';
        } else {
            passwordInput.type = 'password';
            eyeIcon.src = '../../images/eye.svg';
        }
    });
}

// Show notification
function showNotification(message, type = 'success') {
    notificationMessage.textContent = message;
    notification.classList.remove('hidden');
    notification.classList.add('shown');
    notification.classList.remove('success', 'error');
    notification.classList.add(type);
    
    setTimeout(() => {
        notification.classList.remove('shown');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 300);
    }, 3000);
}

// Basic password validation
function validatePassword(password) {
    // Check if password is at least 8 characters
    return password.length >= 8;
}

// SIGN IN FUNCTIONALITY
if (signinForm) {
    signinForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        if (!email || !password) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        try {
            signinButton.disabled = true;
            signinButton.textContent = 'Logging in...';
            
            // Sign in with Supabase
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            
            if (error) throw error;
            
            // Check if user exists
            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('*')
                .eq('user_id', data.user.id)
                .single();
                
            if (userError || !userData) {
                await supabase.auth.signOut();
                throw new Error('User account not found');
            }
            
            // Remember user if checkbox is checked
            if (rememberMe && rememberMe.checked) {
                localStorage.setItem('rememberUser', 'true');
            } else {
                localStorage.removeItem('rememberUser');
            }
            
            // Save session info
            localStorage.setItem('user', JSON.stringify(data.user));
            
            showNotification('Sign in successful, redirecting...');
            
            // Redirect to admin dashboard after successful sign-in
            setTimeout(() => {
                if (window.bluestockRouter && typeof window.bluestockRouter.navigate === 'function') {
                    window.bluestockRouter.navigate('admin-dashboard', true);
                } else {
                    window.location.href = '/admin-dashboard';
                }
            }, 1500);
            
        } catch (error) {
            showNotification(error.message || 'Sign in failed', 'error');
            console.error('Sign in error:', error);
        } finally {
            signinButton.disabled = false;
            signinButton.textContent = 'Login';
        }
    });
}

// SIGN UP FUNCTIONALITY
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        // Basic validation
        if (!name || !email || !password) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Check password strength
        if (!validatePassword(password)) {
            showNotification('Password must be at least 8 characters', 'error');
            return;
        }
        
        try {
            signupButton.disabled = true;
            signupButton.textContent = 'Creating account...';
            
            // Sign up with Supabase
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        full_name: name
                    }
                }
            });
            
            if (error) throw error;
            
            // Add user to users table
            const { error: userError } = await supabase
                .from('users')
                .insert({
                    user_id: data.user.id,
                    full_name: name,
                    email: email,
                    created_at: new Date()
                });
                
            if (userError) throw userError;
            
            showNotification('Account created successfully! Please check your email to verify your account.');
            
            // Redirect to sign in page
            setTimeout(() => {
                window.location.href = '/signin';
            }, 3000);
            
        } catch (error) {
            showNotification(error.message || 'Sign up failed', 'error');
            console.error('Sign up error:', error);
        } finally {
            signupButton.disabled = false;
            signupButton.textContent = 'Sign up';
        }
    });
}

// Google Sign-In
if (googleSignInBtn) {
    googleSignInBtn.addEventListener('click', async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin + (isSignin ? '/signin-callback' : '/signup-callback')
                }
            });
            
            if (error) throw error;
            
        } catch (error) {
            showNotification('Google sign-in failed', 'error');
            console.error('Google sign-in error:', error);
        }
    });
}

// Check for existing session on page load
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (data.session) {
            // Check if user exists in our database
            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('*')
                .eq('user_id', data.session.user.id)
                .single();
                
            if (!userError && userData) {
                // User is already signed in, redirect to home page if on auth pages
                if (isSignin || isSignup) {
                    if (window.bluestockRouter && typeof window.bluestockRouter.navigate === 'function') {
                        window.bluestockRouter.navigate('admin-dashboard', true);
                    } else {
                        window.location.href = '/admin-dashboard';
                    }
                }
            }
        }
    } catch (error) {
        console.error('Session check error:', error);
    }
});
