/**
 * Supabase Configuration
 * 
 * Configuration for Aldr Vaults BETA with Supabase backend
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database tables schema
export const TABLES = {
  users: 'users',
  vaults: 'vaults', 
  documents: 'documents',
  vault_permissions: 'vault_permissions'
};

// Vault types
export const VAULT_TYPES = {
  IDENTITY: 'identity',
  HEALTH: 'health', 
  LEGAL: 'legal',
  TRAVEL: 'travel',
  MEMORIES: 'memories',
  LEARNING: 'learning'
};

export default supabase;