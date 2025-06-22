/**
 * Bluestock Client-Side Router
 * Handles navigation between authentication pages and protected content
 */

// Only define the router if it doesn't already exist
if (!window.bluestockRouter) {

class AuthRouter {
    constructor() {
        this.routes = {
            'signin': '/components/auth/signin.html',
            'signup': '/components/auth/signup.html',
            'forgot-password': '/components/auth/forgot-password.html',
            'reset-password': '/components/auth/reset-password.html',
            'dashboard': '/components/dashboard/admin-dashboard.html',
            'admin-dashboard': '/components/dashboard/admin-dashboard.html', // Add explicit admin-dashboard route
            'manage-ipo': '/components/dashboard/manage-ipo.html',
            'ipo': '/ipo.html',
            'all-upcoming': '/ipo-all-upcoming.html',
            'home': '/index.html'
        };
        
        // Initialize Supabase client
        this.SUPABASE_URL = 'https://pyxqwiqvyivyopusgcey.supabase.co';
        this.SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5eHF3aXF2eWl2eW9wdXNnY2V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwOTE1NzEsImV4cCI6MjA2MzY2NzU3MX0.vJEoejN1jgHeU5hcvujKMVuWCHkIy7010N76WXg3_1s';
        this.supabase = null;
        
        // Protected routes that require authentication
        this.protectedRoutes = ['dashboard', 'admin-dashboard', 'manage-ipo'];
    }
    
    /**
     * Initialize the router
     */
    init() {
        // Use the global Supabase client if available, otherwise create a new one
        if (window.supabaseClient) {
            this.supabase = window.supabaseClient;
            console.log('Router using global Supabase client from window.supabaseClient');
        } else if (window.supabase) {
            // Create a new client with proper persistence settings
            this.supabase = supabase.createClient(this.SUPABASE_URL, this.SUPABASE_KEY, {
                auth: {
                    persistSession: true,
                    autoRefreshToken: true,
                    detectSessionInUrl: true,
                    storageKey: 'sb-pyxqwiqvyivyopusgcey-auth-token'
                }
            });
            console.log('Router initialized with new Supabase client with persistence settings');
            // Make it available globally to prevent multiple instances
            window.supabaseClient = this.supabase;
        } else {
            console.error('Supabase library not loaded!');
        }
        
        // Check for navigation events
        document.addEventListener('click', (e) => {
            // Find the closest anchor tag
            const link = e.target.closest('a');
            if (link && link.getAttribute('data-route')) {
                console.log('[Bluestock Router] Intercepted click on data-route link:', link.getAttribute('data-route'));
                e.preventDefault();
                const route = link.getAttribute('data-route');
                this.navigate(route);
            }
        });
        
        // Support direct access / reloads with hash fragments like #/dashboard
        const handleInitialHash = () => {
            const hashRoute = window.location.hash.replace(/^#\/?/, ''); // e.g. "admin-dashboard"
            if (hashRoute) {
                console.log('[Bluestock Router] Detected hash route on load:', hashRoute);
                this.navigate(hashRoute, true);
            }
        };

        // Run once on DOM loaded (after scripts) – may still wait for auth below
        handleInitialHash();

        // Listen for future hash changes (e.g., user typing URL)
        window.addEventListener('hashchange', () => {
            const newRoute = window.location.hash.replace(/^#\/?/, '');
            if (newRoute) {
                this.navigate(newRoute);
            }
        });

        // Delay initial auth check until Supabase restores the persisted session
        // This avoids a race-condition where getSession() returns null briefly on page reloads
        this.supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'INITIAL_SESSION') {
                console.log('[Bluestock Router] INITIAL_SESSION event received – running auth check');
                this.checkAuth();
            }
        });
        // As a fallback in case the event never fires (rare), run a delayed check once
        setTimeout(() => {
            if (!window._bluestockInitialAuthChecked) {
                console.log('[Bluestock Router] Fallback delayed auth check');
                this.checkAuth();
                window._bluestockInitialAuthChecked = true;
            }
        }, 1500);
    }
    
    /**
     * Navigate to a specific route
     * @param {string} route - Route name as defined in routes object
     * @param {boolean} replaceState - Whether to replace current history state
     * @param {boolean} preventRecursion - Flag to prevent recursion between navigate and checkAuth
     */
    navigate(route, replaceState = false, preventRecursion = false) {
        console.log(`[Bluestock Router] Navigating to: ${route}`);
        console.log(`[Bluestock Router] Route exists in routes:`, !!this.routes[route]);
        console.log(`[Bluestock Router] Route path:`, this.routes[route]);
        
        // Check if route exists
        if (!this.routes[route]) {
            console.error(`Route '${route}' not defined`);
            return;
        }
        
        // For dashboard redirects, use direct URL navigation for reliability
        if (route === 'dashboard' || route === 'admin-dashboard') {
            console.log(`[Bluestock Router] Using direct URL for dashboard navigation`);
            const dashboardUrl = this.routes['dashboard'];
            // Set flag to prevent redirect loops
            sessionStorage.setItem('adminDashboardLoaded', 'true');
            
            if (replaceState) {
                window.location.replace(dashboardUrl);
            } else {
                window.location.href = dashboardUrl;
            }
            return;
        }
        
        // For manage-ipo route, use direct URL navigation for reliability
        if (route === 'manage-ipo') {
            console.log(`[Bluestock Router] Using direct URL for manage-ipo navigation`);
            const manageIpoUrl = this.routes['manage-ipo'];
            
            if (replaceState) {
                window.location.replace(manageIpoUrl);
            } else {
                window.location.href = manageIpoUrl;
            }
            return;
        }
        
        // Check if route is protected
        if (this.protectedRoutes.includes(route)) {
            console.log(`[Bluestock Router] Protected route detected: ${route}`);
            // Set flag to prevent redirect loops
            if (route === 'dashboard' || route === 'admin-dashboard') {
                sessionStorage.setItem('adminDashboardLoaded', 'true');
                sessionStorage.setItem('adminDashboardDirectLoad', 'true');
            }
            this.checkAuth(route, preventRecursion);
            return;
        }
        
        // Decide navigation strategy.
        const inAppRoutes = ['dashboard', 'admin-dashboard', 'all-upcoming', 'home', 'ipo'];

        if (inAppRoutes.includes(route)) {
            // Keep user on root page and update hash – this preserves same-origin storage for file:// protocol
            const hash = `#/${route}`;
            if (replaceState) {
                window.location.replace(hash);
            } else {
                window.location.hash = hash;
            }
            return;
        }

        // Fallback to original full-page navigation (mainly for standalone auth pages)
        const url = this.routes[route];
        if (replaceState) {
            window.location.replace(url);
        } else {
            window.location.href = url;
        }
    }
    
    /**
     * Check authentication status and redirect if needed
     * @param {string} intendedRoute - Route the user is trying to access
     * @param {boolean} preventRecursion - Flag to prevent recursion between navigate and checkAuth
     */
    async checkAuth(intendedRoute = null, preventRecursion = false) {
        if (!this.supabase) {
            console.error('Supabase client not initialized');
            return;
        }
        
        try {
            console.log(`[Bluestock Router] Checking auth for route: ${intendedRoute || 'no specific route'}`);
            
            // First check for token in localStorage for faster decision making
            const hasAuthToken = !!localStorage.getItem('sb-pyxqwiqvyivyopusgcey-auth-token');
            const hasBluestockAuth = localStorage.getItem('bluestock_user_authenticated') === 'true';
            const isAdminDashboardPath = window.location.pathname.toLowerCase().includes('admin-dashboard') || 
                                         window.location.pathname.toLowerCase().includes('dashboard');
            
            // For admin dashboard: if we have a token, skip redirect to prevent unnecessary flash
            if (isAdminDashboardPath && (hasAuthToken || hasBluestockAuth)) {
                console.log('[Bluestock Router] Admin dashboard with auth token, skipping immediate redirect');
                sessionStorage.setItem('adminDashboardLoaded', 'true');
                
                // Still verify session in background, but don't redirect immediately
                this.supabase.auth.getSession().then(({ data, error }) => {
                    if (error || !data || !data.session) {
                        console.log('[Bluestock Router] Background auth check failed, redirecting to signin');
                        // Use direct redirection to prevent recursion
                        window.location.href = this.routes['signin'];
                    }
                });
                
                // If intended route provided, navigate to it, but prevent further recursion
                if (intendedRoute && intendedRoute !== 'dashboard' && intendedRoute !== 'admin-dashboard' && !preventRecursion) {
                    this.navigate(intendedRoute, false, true); // Pass preventRecursion flag
                }
                
                return;
            }
            
            // Check current session
            const { data, error } = await this.supabase.auth.getSession();
            
            if (error) throw error;
            
            const isAuthenticated = data && data.session;
            
            // Store auth state in localStorage for persistence
            if (isAuthenticated && data.session && data.session.user) {
                localStorage.setItem('bluestock_user_authenticated', 'true');
                localStorage.setItem('bluestock_user_email', data.session.user.email);
                if (data.session.user.user_metadata && data.session.user.user_metadata.full_name) {
                    localStorage.setItem('bluestock_user_name', data.session.user.user_metadata.full_name);
                }
                
                // Also set the dashboard loaded flag
                if (intendedRoute === 'dashboard' || intendedRoute === 'admin-dashboard') {
                    sessionStorage.setItem('adminDashboardLoaded', 'true');
                }
            }
            
            // Handle protected routes
            if (intendedRoute && this.protectedRoutes.includes(intendedRoute)) {
                if (!isAuthenticated) {
                    console.log('[Bluestock Router] Authentication required. Redirecting to signin.');
                    // Use direct redirection to prevent recursion
                    window.location.href = this.routes['signin'];
                    return;
                }
            }
            
            // If on auth pages but already authenticated, redirect to dashboard
            const currentPath = window.location.pathname;
            const isSigninPage = currentPath.includes('/signin.html') || 
                                currentPath.includes('/signin') || 
                                currentPath.endsWith('/signin');
            const isSignupPage = currentPath.includes('/signup.html') || 
                                currentPath.includes('/signup') || 
                                currentPath.endsWith('/signup');
                                
            if (isAuthenticated && (isSigninPage || isSignupPage)) {
                console.log('[Bluestock Router] Already authenticated. Redirecting to dashboard.');
                // Use a direct URL for more reliable redirection
                window.location.href = this.routes['dashboard'];
                return;
            }
            
            // If intended route provided, navigate to it, but prevent recursion
            if (intendedRoute && !preventRecursion) {
                this.navigate(intendedRoute, false, true); // Pass preventRecursion flag
            }
            
        } catch (error) {
            console.error('Auth check failed:', error.message);
        }
    }
    
    /**
     * Sign out the current user
     */
    async signOut() {
        if (!this.supabase) {
            console.error('Supabase client not initialized');
            return;
        }
        
        try {
            // First clear all session storage flags
            sessionStorage.removeItem('adminDashboardLoaded');
            sessionStorage.removeItem('adminDashboardDirectLoad');
            
            // Clear Bluestock authentication flags from localStorage
            localStorage.removeItem('bluestock_user_authenticated');
            localStorage.removeItem('bluestock_user_email');
            localStorage.removeItem('bluestock_user_name');
            
            // Then do the actual Supabase signout
            const { error } = await this.supabase.auth.signOut();
            if (error) throw error;
            
            console.log('User signed out successfully');
            // Use direct URL navigation to prevent potential recursion
            window.location.href = this.routes['ipo'] + '?from=logout';
        } catch (error) {
            console.error('Sign out failed:', error.message);
            // Still redirect to ensure user can get to a usable page
            window.location.href = this.routes['ipo'] + '?from=logout';
        }
    }
}

// Create global router instance
window.bluestockRouter = new AuthRouter();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (window.supabase) {
        window.bluestockRouter.init();
    } else {
        console.error('Router initialization delayed: Supabase not loaded');
        // Try again when Supabase might be loaded
        setTimeout(() => {
            if (window.supabase) {
                window.bluestockRouter.init();
            } else {
                console.error('Router initialization failed: Supabase not available');
            }
        }, 1000);
    }
});

} else {
    console.log('Bluestock Router already initialized, skipping re-initialization');
}
