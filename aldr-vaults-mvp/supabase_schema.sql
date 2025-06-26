-- Aldr Vaults BETA Database Schema
-- Run this in your Supabase SQL editor to set up the database

-- Enable Row Level Security
ALTER TABLE IF EXISTS auth.users ENABLE ROW LEVEL SECURITY;

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vaults table
CREATE TABLE IF NOT EXISTS public.vaults (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Documents table  
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vault_id UUID REFERENCES public.vaults(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT,
  file_name TEXT,
  file_size INTEGER,
  file_type TEXT,
  tags TEXT[],
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vault permissions table (for future sharing functionality)
CREATE TABLE IF NOT EXISTS public.vault_permissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vault_id UUID REFERENCES public.vaults(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  granted_by UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  permission_level TEXT NOT NULL CHECK (permission_level IN ('read', 'write', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security Policies

-- Users table policies
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users  
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Vaults table policies
CREATE POLICY "Users can view own vaults" ON public.vaults
  FOR SELECT USING (
    auth.uid() = user_id 
    OR 
    auth.uid() IN (
      SELECT user_id FROM public.vault_permissions 
      WHERE vault_id = public.vaults.id
    )
  );

CREATE POLICY "Users can create own vaults" ON public.vaults
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own vaults" ON public.vaults
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own vaults" ON public.vaults
  FOR DELETE USING (auth.uid() = user_id);

-- Documents table policies  
CREATE POLICY "Users can view own documents" ON public.documents
  FOR SELECT USING (
    auth.uid() = user_id
    OR
    auth.uid() IN (
      SELECT user_id FROM public.vault_permissions 
      WHERE vault_id = public.documents.vault_id
    )
  );

CREATE POLICY "Users can create documents in own vaults" ON public.documents
  FOR INSERT WITH CHECK (
    auth.uid() = user_id 
    AND 
    vault_id IN (
      SELECT id FROM public.vaults WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own documents" ON public.documents
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own documents" ON public.documents  
  FOR DELETE USING (auth.uid() = user_id);

-- Vault permissions policies
CREATE POLICY "Users can view vault permissions" ON public.vault_permissions
  FOR SELECT USING (
    auth.uid() = user_id 
    OR 
    auth.uid() = granted_by
    OR
    auth.uid() IN (
      SELECT user_id FROM public.vaults WHERE id = vault_id
    )
  );

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vaults ENABLE ROW LEVEL SECURITY;  
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vault_permissions ENABLE ROW LEVEL SECURITY;

-- Function to handle user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create user profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_vaults_user_id ON public.vaults(user_id);
CREATE INDEX IF NOT EXISTS idx_vaults_type ON public.vaults(type);
CREATE INDEX IF NOT EXISTS idx_documents_vault_id ON public.documents(vault_id);
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON public.documents(user_id);
CREATE INDEX IF NOT EXISTS idx_vault_permissions_vault_id ON public.vault_permissions(vault_id);
CREATE INDEX IF NOT EXISTS idx_vault_permissions_user_id ON public.vault_permissions(user_id);