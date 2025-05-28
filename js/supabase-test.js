// Supabase connection test utility
const SUPABASE_URL = 'https://pyxqwiqvyivyopusgcey.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5eHF3aXF2eWl2eW9wdXNnY2V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwOTE1NzEsImV4cCI6MjA2MzY2NzU3MX0.vJEoejN1jgHeU5hcvujKMVuWCHkIy7010N76WXg3_1s';

/**
 * Tests the Supabase connection and returns the result
 * @returns {Promise<Object>} Result of the connection test
 */
async function testSupabaseConnection() {
  console.log('Starting Supabase connection test...');
  
  try {
    // Make sure supabase is loaded
    if (!window.supabase) {
      throw new Error('Supabase client not loaded');
    }
    
    console.log('Creating Supabase client...');
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    
    console.log('Testing connection with getSession()...');
    const { data, error } = await client.auth.getSession();
    
    if (error) {
      console.error('Supabase connection test failed:', error);
      return { 
        success: false, 
        message: `Connection failed: ${error.message}`,
        error 
      };
    }
    
    console.log('Supabase connection test successful!', data);
    return { 
      success: true, 
      message: 'Connection successful!',
      data 
    };
  } catch (e) {
    console.error('Error during Supabase connection test:', e);
    return { 
      success: false, 
      message: `Connection error: ${e.message}`,
      error: e 
    };
  }
}

/**
 * Tests user creation in Supabase
 * @returns {Promise<Object>} Result of the test signup
 */
async function testUserCreation() {
  console.log('Starting Supabase user creation test...');
  
  try {
    // Make sure supabase is loaded
    if (!window.supabase) {
      throw new Error('Supabase client not loaded');
    }
    
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    
    // Generate a random test email
    const testEmail = `test_${Math.floor(Math.random() * 10000)}@gmail.com`;
    const testPassword = 'Test123456!';
    
    console.log(`Attempting test signup with email: ${testEmail}`);
    const { data, error } = await client.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: { full_name: 'Test User' }
      }
    });
    
    if (error) {
      console.error('Test user creation failed:', error);
      return { 
        success: false, 
        message: `User creation failed: ${error.message}`,
        error 
      };
    }
    
    console.log('Test user created successfully!', data);
    return { 
      success: true, 
      message: `User created successfully! User ID: ${data.user.id}`,
      data 
    };
  } catch (e) {
    console.error('Error during user creation test:', e);
    return { 
      success: false, 
      message: `User creation error: ${e.message}`,
      error: e 
    };
  }
}

// Expose test functions globally
window.testSupabaseConnection = testSupabaseConnection;
window.testUserCreation = testUserCreation;

console.log('Supabase test utilities loaded - use testSupabaseConnection() and testUserCreation() in the console');
