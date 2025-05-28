// Data services for Bluestock app
import { supabase, getCurrentUser } from './supabase.js';

// ==================== STOCKS API ====================

// Get all stocks with optional filtering
export async function getStocks(filters = {}) {
  try {
    let query = supabase.from('stocks').select('*');
    
    // Apply filters if provided
    if (filters.sector) {
      query = query.eq('sector', filters.sector);
    }
    
    if (filters.search) {
      query = query.or(`company_name.ilike.%${filters.search}%,symbol.ilike.%${filters.search}%`);
    }
    
    // Apply sorting
    const orderBy = filters.orderBy || 'market_cap';
    const ascending = filters.ascending !== undefined ? filters.ascending : false;
    query = query.order(orderBy, { ascending });
    
    // Apply pagination
    if (filters.limit) {
      query = query.limit(filters.limit);
    }
    
    if (filters.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching stocks:', error.message);
    return { data: null, error };
  }
}

// Get a single stock by symbol
export async function getStockBySymbol(symbol) {
  try {
    const { data, error } = await supabase
      .from('stocks')
      .select('*')
      .eq('symbol', symbol)
      .single();
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching stock:', error.message);
    return { data: null, error };
  }
}

// ==================== IPO API ====================

// Get all IPOs with filtering options
export async function getIPOs(filters = {}) {
  try {
    let query = supabase.from('ipos').select('*');
    
    // Filter by status
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    
    // Filter by date range
    if (filters.startDate) {
      query = query.gte('ipo_date', filters.startDate);
    }
    
    if (filters.endDate) {
      query = query.lte('ipo_date', filters.endDate);
    }
    
    // Search by company name
    if (filters.search) {
      query = query.ilike('company_name', `%${filters.search}%`);
    }
    
    // Apply sorting
    const orderBy = filters.orderBy || 'ipo_date';
    const ascending = filters.ascending !== undefined ? filters.ascending : false;
    query = query.order(orderBy, { ascending });
    
    // Apply pagination
    if (filters.limit) {
      query = query.limit(filters.limit);
    }
    
    if (filters.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching IPOs:', error.message);
    return { data: null, error };
  }
}

// Get upcoming IPOs
export async function getUpcomingIPOs(limit = 5) {
  return getIPOs({
    status: 'upcoming',
    orderBy: 'subscription_start',
    ascending: true,
    limit
  });
}

// Get newly listed IPOs
export async function getNewlyListedIPOs(limit = 5) {
  return getIPOs({
    status: 'listed',
    orderBy: 'ipo_date',
    ascending: false,
    limit
  });
}

// Get a single IPO by ID
export async function getIPOById(id) {
  try {
    const { data, error } = await supabase
      .from('ipos')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching IPO:', error.message);
    return { data: null, error };
  }
}

// ==================== WATCHLIST API ====================

// Get user watchlists
export async function getUserWatchlists() {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error('Not authenticated');
    
    const { data, error } = await supabase
      .from('watchlists')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching watchlists:', error.message);
    return { data: null, error };
  }
}

// Create a new watchlist
export async function createWatchlist(name) {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error('Not authenticated');
    
    const { data, error } = await supabase
      .from('watchlists')
      .insert({ name, user_id: user.id })
      .select();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating watchlist:', error.message);
    return { data: null, error };
  }
}

// Get stocks in a watchlist
export async function getWatchlistStocks(watchlistId) {
  try {
    const { data, error } = await supabase
      .from('watchlist_items')
      .select(`
        id,
        stocks (*)
      `)
      .eq('watchlist_id', watchlistId);
      
    if (error) throw error;
    
    // Transform data to make it easier to work with
    const stocks = data.map(item => item.stocks);
    
    return { data: stocks, error: null };
  } catch (error) {
    console.error('Error fetching watchlist stocks:', error.message);
    return { data: null, error };
  }
}

// Add stock to watchlist
export async function addStockToWatchlist(watchlistId, stockId) {
  try {
    const { data, error } = await supabase
      .from('watchlist_items')
      .insert({ watchlist_id: watchlistId, stock_id: stockId })
      .select();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error adding stock to watchlist:', error.message);
    return { data: null, error };
  }
}

// Remove stock from watchlist
export async function removeStockFromWatchlist(watchlistId, stockId) {
  try {
    const { error } = await supabase
      .from('watchlist_items')
      .delete()
      .match({ watchlist_id: watchlistId, stock_id: stockId });
      
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error removing stock from watchlist:', error.message);
    return { error };
  }
}

// ==================== USER PROFILE API ====================

// Get user profile
export async function getUserProfile() {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error('Not authenticated');
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    return { data: null, error };
  }
}

// Update user profile
export async function updateUserProfile(profile) {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error('Not authenticated');
    
    // Add updated_at timestamp
    profile.updated_at = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', user.id)
      .select();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating user profile:', error.message);
    return { data: null, error };
  }
}
