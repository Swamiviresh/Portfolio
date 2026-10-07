-- Portfolio Database Schema with RLS Policies

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profile table (single row)
CREATE TABLE IF NOT EXISTS profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  headline TEXT NOT NULL,
  bio TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT NOT NULL,
  social_links JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Experience table
CREATE TABLE IF NOT EXISTS experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  description TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT,
  location TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Education table
CREATE TABLE IF NOT EXISTS education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT,
  location TEXT,
  description TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT[] DEFAULT '{}',
  image TEXT,
  link TEXT,
  github TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  tags TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Resume table
CREATE TABLE IF NOT EXISTS resume (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_url TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume ENABLE ROW LEVEL SECURITY;

-- Public select policies (anon can read)
CREATE POLICY "Profile select for everyone" ON profile FOR SELECT USING (true);
CREATE POLICY "Skills select for everyone" ON skills FOR SELECT USING (true);
CREATE POLICY "Experience select for everyone" ON experience FOR SELECT USING (true);
CREATE POLICY "Education select for everyone" ON education FOR SELECT USING (true);
CREATE POLICY "Projects select for everyone" ON projects FOR SELECT USING (true);
CREATE POLICY "Blog select published" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Resume select for everyone" ON resume FOR SELECT USING (true);

-- Admin policies (authenticated users can do everything)
CREATE POLICY "Profile all for admin" ON profile FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Skills all for admin" ON skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Experience all for admin" ON experience FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Education all for admin" ON education FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Projects all for admin" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Blog all for admin" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Resume all for admin" ON resume FOR ALL USING (auth.role() = 'authenticated');

-- Storage bucket policy SQL (run in Supabase dashboard)
-- Policy name: "Public can read resume bucket"
-- Definition: bucket_id = 'resume'
-- Operation: SELECT
-- Target roles: anon (public)

-- Indexes
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
