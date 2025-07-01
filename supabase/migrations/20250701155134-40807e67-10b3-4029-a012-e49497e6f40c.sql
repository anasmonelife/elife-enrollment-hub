
-- Add missing columns to registrations table
ALTER TABLE public.registrations 
ADD COLUMN IF NOT EXISTS name TEXT,
ADD COLUMN IF NOT EXISTS mobile_number TEXT,
ADD COLUMN IF NOT EXISTS ward TEXT,
ADD COLUMN IF NOT EXISTS agent_pro TEXT,
ADD COLUMN IF NOT EXISTS fee_paid DECIMAL(10,2) DEFAULT 0.00;

-- Update existing registrations data to use new columns (only if they don't have data)
UPDATE public.registrations 
SET 
  name = COALESCE(name, full_name),
  mobile_number = COALESCE(mobile_number, phone)
WHERE name IS NULL OR mobile_number IS NULL;

-- Add missing column to categories table
ALTER TABLE public.categories 
ADD COLUMN IF NOT EXISTS is_highlighted BOOLEAN NOT NULL DEFAULT false;
