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
            'dashboard': '/components/dashboard/dashboard.html',
            'ipo': '/components/ipo/ipo.html',
            'upcoming-ipo': '/components/ipo/all-upcoming-ipo.html',
            'home': '/index.html'
        };
        
        // Initialize Supabase client
        this.SUPABASE_URL = 'https://pyxqwiqvyivyopusgcey.supabase.co';
        this.SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5eHF3aXF2eWl2eW9wdXNnY2V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwOTE1NzEsImV4cCI6MjA2MzY2NzU3MX0.vJEoejN1jgHeU5hcvujKMVuWCHkIy7010N76WXg3_1s';
        this.supabase = null;
        
        // Protected routes that require authentication
        this.protectedRoutes = ['dashboard'];
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
            this.supabase = supabase.createClient(this.SUPABASE_URL, this.SUPABASE_KEY);
            console.log('Router initialized with new Supabase client');
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
                e.preventDefault();
                const route = link.getAttribute('data-route');
                this.navigate(route);
            }
        });
        
        // Handle initial route on page load
        this.checkAuth();
    }
    
    /**
     * Navigate to a specific route
     * @param {string} route - Route name as defined in routes object
     * @param {boolean} replaceState - Whether to replace current history state
     */
    navigate(route, replaceState = false) {
        console.log(`Navigating to: ${route}`);
        
        // Check if route exists
        if (!this.routes[route]) {
            console.error(`Route '${route}' not defined`);
            return;
        }
        
        // Check if route is protected
        if (this.protectedRoutes.includes(route)) {
            this.checkAuth(route);
            return;
        }
        
        // Navigate to the route
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
     */
    async checkAuth(intendedRoute = null) {
        if (!this.supabase) {
            console.error('Supabase client not initialized');
            return;
        }
        
        try {
            // Check current session
            const { data, error } = await this.supabase.auth.getSession();
            
            if (error) throw error;
            
            const isAuthenticated = data && data.session;
            
            // Handle protected routes
            if (intendedRoute && this.protectedRoutes.includes(intendedRoute)) {
                if (!isAuthenticated) {
                    console.log('Authentication required. Redirecting to signin.');
                    this.navigate('signin', true);
                    return;
                }
            }
            
            // If on auth pages but already authenticated, redirect to dashboard
            const currentPath = window.location.pathname;
            if (isAuthenticated && 
                (currentPath.includes('/signin.html') || currentPath.includes('/signup.html'))) {
                console.log('Already authenticated. Redirecting to dashboard.');
                this.navigate('dashboard', true);
                return;
            }
            
            // If intended route provided, navigate to it
            if (intendedRoute) {
                this.navigate(intendedRoute);
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
            const { error } = await this.supabase.auth.signOut();
            if (error) throw error;
            
            console.log('User signed out successfully');
            this.navigate('home', true);
        } catch (error) {
            console.error('Sign out failed:', error.message);
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
