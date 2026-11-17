-- ==============================================================================
-- Authify – Supabase PostgreSQL Schema
-- μLearn Foundation LF 2026 Web Development Task 14
-- ==============================================================================

-- 1. Create the users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create index on email for accelerated lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users (email);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 4. Note on RLS Policies:
-- Authify connects exclusively from server-side Next.js route handlers using the
-- Supabase service-role key, which bypasses RLS on the server.
-- By not granting public/anon access policies, the users table remains completely
-- protected from unauthorized external access through Supabase public REST APIs.

