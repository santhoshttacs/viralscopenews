-- ViralScopeNews Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('ai','tech','crypto','middle-east')),
  featured_image TEXT,
  ai_summary TEXT NOT NULL,
  why_it_matters TEXT NOT NULL,
  key_takeaways TEXT[] NOT NULL DEFAULT '{}',
  full_content TEXT NOT NULL,
  source_url TEXT,
  source_name TEXT,
  word_count INTEGER NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft','published','rejected')),
  author_name TEXT DEFAULT 'ViralScope AI Desk',
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT
);

-- Contact submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin users
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_views ON articles(views DESC);
CREATE INDEX IF NOT EXISTS idx_articles_source_url ON articles(source_url);

-- Insert default categories
INSERT INTO categories (slug, name, description) VALUES
  ('ai', 'Artificial Intelligence', 'Latest AI breakthroughs, machine learning advances, and industry applications.'),
  ('tech', 'Technology', 'Cutting-edge technology news, innovations, and digital transformation trends.'),
  ('crypto', 'Cryptocurrency', 'Blockchain developments, crypto markets, DeFi, and Web3 innovations.'),
  ('middle-east', 'Middle East Business', 'Business trends, economic developments, and investment opportunities in the Middle East.')
ON CONFLICT (slug) DO NOTHING;

-- Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Public read access for articles and categories
CREATE POLICY "Public can read published articles" ON articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can read categories" ON categories
  FOR SELECT USING (true);

-- Service role has full access (used by backend)
CREATE POLICY "Service role full access articles" ON articles
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access contacts" ON contact_submissions
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access admins" ON admin_users
  FOR ALL USING (auth.role() = 'service_role');

-- Allow public to insert contact submissions
CREATE POLICY "Public can submit contact forms" ON contact_submissions
  FOR INSERT WITH CHECK (true);
