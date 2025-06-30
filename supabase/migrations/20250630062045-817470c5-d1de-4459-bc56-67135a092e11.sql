
-- Check and create enum types only if they don't exist
DO $$ BEGIN
    CREATE TYPE public.admin_role AS ENUM ('super', 'local', 'user');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  actual_fee NUMERIC(10,2) NOT NULL DEFAULT 0,
  offer_fee NUMERIC(10,2) NOT NULL DEFAULT 0,
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create panchayaths table
CREATE TABLE IF NOT EXISTS public.panchayaths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  district TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create registrations table
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  mobile TEXT NOT NULL UNIQUE,
  panchayath_id UUID REFERENCES public.panchayaths(id),
  ward TEXT NOT NULL,
  agent_pro TEXT,
  category_id UUID REFERENCES public.categories(id),
  status public.registration_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admins table
CREATE TABLE IF NOT EXISTS public.admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role public.admin_role NOT NULL,
  name TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Create announcements table
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  expiry_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample categories (only if table is empty)
INSERT INTO public.categories (name, description, actual_fee, offer_fee) 
SELECT * FROM (VALUES
  ('Pennyekart Free Registration', 'Totally free registration with free delivery between 2pm to 6pm. Basic level access to hybrid ecommerce platform.', 0, 0),
  ('Pennyekart Paid Registration', 'Premium registration with any time delivery between 8am to 7pm. Full access to hybrid ecommerce platform.', 500, 350),
  ('FarmeLife', 'Connected with dairy farm, poultry farm and agricultural ventures.', 750, 500),
  ('OrganeLife', 'Connected with vegetable and house gardening, especially terrace vegetable farming.', 600, 400),
  ('FoodeLife', 'Connected with food processing business and food-related enterprises.', 800, 600),
  ('EntreLife', 'Connected with skilled projects like stitching, art works, and various home services.', 650, 450),
  ('Job Card (Special)', 'Special offer card with fee cut packages, special offers, discounts. Investment card for getting points and profits. Convertible to any category.', 1200, 800)
) AS v(name, description, actual_fee, offer_fee)
WHERE NOT EXISTS (SELECT 1 FROM public.categories LIMIT 1);

-- Insert sample panchayaths (only if table is empty)
INSERT INTO public.panchayaths (name, district) 
SELECT * FROM (VALUES
  ('Amarambalam', 'Malappuram'),
  ('Wandoor', 'Malappuram'),
  ('Nilambur', 'Malappuram'),
  ('Karulai', 'Malappuram')
) AS v(name, district)
WHERE NOT EXISTS (SELECT 1 FROM public.panchayaths LIMIT 1);

-- Insert admin users (only if table is empty)
INSERT INTO public.admins (username, password_hash, role, name) 
SELECT * FROM (VALUES
  ('evaadmin', 'eva919123', 'super'::admin_role, 'Super Admin'),
  ('admin1', 'elife9094', 'local'::admin_role, 'Local Admin'),
  ('admin2', 'penny9094', 'user'::admin_role, 'User Admin')
) AS v(username, password_hash, role, name)
WHERE NOT EXISTS (SELECT 1 FROM public.admins LIMIT 1);

-- Insert sample announcement (only if table is empty)
INSERT INTO public.announcements (title, content, expiry_date) 
SELECT * FROM (VALUES
  ('Welcome to E-LIFE SOCIETY Registration', 'Register yourself for various self-employment opportunities through our hybrid ecommerce platform.', '2024-12-31 23:59:59'::timestamp with time zone)
) AS v(title, content, expiry_date)
WHERE NOT EXISTS (SELECT 1 FROM public.announcements LIMIT 1);

-- Enable Row Level Security (RLS) for data protection
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.panchayaths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and create new ones
DROP POLICY IF EXISTS "Anyone can view active categories" ON public.categories;
CREATE POLICY "Anyone can view active categories" ON public.categories
  FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Anyone can view active panchayaths" ON public.panchayaths;
CREATE POLICY "Anyone can view active panchayaths" ON public.panchayaths
  FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Anyone can view active announcements" ON public.announcements;
CREATE POLICY "Anyone can view active announcements" ON public.announcements
  FOR SELECT USING (is_active = true AND expiry_date > NOW());

DROP POLICY IF EXISTS "Anyone can insert registrations" ON public.registrations;
CREATE POLICY "Anyone can insert registrations" ON public.registrations
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can view their own registration" ON public.registrations;
CREATE POLICY "Anyone can view their own registration" ON public.registrations
  FOR SELECT USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at (drop first if they exist)
DROP TRIGGER IF EXISTS update_categories_updated_at ON public.categories;
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_panchayaths_updated_at ON public.panchayaths;
CREATE TRIGGER update_panchayaths_updated_at BEFORE UPDATE ON public.panchayaths
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_announcements_updated_at ON public.announcements;
CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON public.announcements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
