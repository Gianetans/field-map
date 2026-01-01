-- FieldMap Database Schema
-- Run this SQL in your Supabase SQL editor to set up the database

-- Farms (optional multi-farm support)
CREATE TABLE public.farms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  total_acres DECIMAL(10, 2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Fields
CREATE TABLE public.fields (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  farm_id UUID REFERENCES public.farms(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  size_acres DECIMAL(10, 2) NOT NULL,
  size_hectares DECIMAL(10, 2),
  geometry JSONB NOT NULL,
  center_lat DECIMAL(10, 8),
  center_lng DECIMAL(11, 8),
  soil_type TEXT,
  soil_ph DECIMAL(3, 1),
  organic_matter_percent DECIMAL(5, 2),
  irrigation_type TEXT,
  drainage_quality TEXT,
  last_soil_test_date DATE,
  notes TEXT,
  color TEXT DEFAULT '#3b82f6',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Crop Assignments (what's planted where and when)
CREATE TABLE public.field_crops (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  field_id UUID REFERENCES public.fields(id) ON DELETE CASCADE,
  crop_id UUID,
  crop_name TEXT NOT NULL,
  crop_category TEXT,
  year INTEGER NOT NULL,
  season TEXT,
  planted_date DATE,
  harvest_date DATE,
  yield_amount DECIMAL(10, 2),
  yield_unit TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Rotation Plans (planned future rotations)
CREATE TABLE public.rotation_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  field_id UUID REFERENCES public.fields(id) ON DELETE CASCADE,
  crop_id UUID,
  crop_name TEXT NOT NULL,
  crop_category TEXT,
  year INTEGER NOT NULL,
  season TEXT,
  is_planned BOOLEAN DEFAULT true,
  rotation_group TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Field Amendments (soil improvements)
CREATE TABLE public.field_amendments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  field_id UUID REFERENCES public.fields(id) ON DELETE CASCADE,
  amendment_type TEXT NOT NULL,
  amount DECIMAL(10, 2),
  unit TEXT,
  application_date DATE NOT NULL,
  cost DECIMAL(10, 2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.field_crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rotation_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.field_amendments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users manage own farms" ON public.farms FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own fields" ON public.fields FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own field crops" ON public.field_crops FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own rotation plans" ON public.rotation_plans FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own amendments" ON public.field_amendments FOR ALL USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX farms_user_id_idx ON public.farms(user_id);
CREATE INDEX fields_user_id_idx ON public.fields(user_id);
CREATE INDEX fields_farm_id_idx ON public.fields(farm_id);
CREATE INDEX field_crops_field_id_idx ON public.field_crops(field_id);
CREATE INDEX field_crops_year_idx ON public.field_crops(year);
CREATE INDEX rotation_plans_field_id_idx ON public.rotation_plans(field_id);
CREATE INDEX rotation_plans_year_idx ON public.rotation_plans(year);
CREATE INDEX amendments_field_id_idx ON public.field_amendments(field_id);

-- Function to auto-calculate hectares from acres
CREATE OR REPLACE FUNCTION update_field_hectares()
RETURNS TRIGGER AS $$
BEGIN
  NEW.size_hectares = NEW.size_acres * 0.404686;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER field_hectares_trigger
BEFORE INSERT OR UPDATE ON public.fields
FOR EACH ROW
EXECUTE FUNCTION update_field_hectares();

-- Optional: Sample Data for Testing
-- Uncomment to insert sample data

/*
-- Sample Farm
INSERT INTO public.farms (user_id, name, address, latitude, longitude, total_acres, notes)
VALUES (
  auth.uid(),
  'Green Valley Farm',
  '123 Farm Road, Farmville, USA',
  40.7128,
  -74.0060,
  150.00,
  'Main family farm established 1985'
);

-- Sample Fields (replace user_id and farm_id with actual UUIDs)
INSERT INTO public.fields (user_id, farm_id, name, size_acres, geometry, soil_type, soil_ph, irrigation_type, drainage_quality, color, is_active)
VALUES 
(
  auth.uid(),
  (SELECT id FROM public.farms WHERE name = 'Green Valley Farm' LIMIT 1),
  'North Field',
  25.5,
  '{"type":"Polygon","coordinates":[[[-74.0060,40.7128],[-74.0050,40.7128],[-74.0050,40.7138],[-74.0060,40.7138],[-74.0060,40.7128]]]}',
  'Loamy',
  6.8,
  'Drip',
  'Good',
  '#3b82f6',
  true
),
(
  auth.uid(),
  (SELECT id FROM public.farms WHERE name = 'Green Valley Farm' LIMIT 1),
  'South Field',
  18.2,
  '{"type":"Polygon","coordinates":[[[-74.0070,40.7118],[-74.0060,40.7118],[-74.0060,40.7128],[-74.0070,40.7128],[-74.0070,40.7118]]]}',
  'Clay Loam',
  6.5,
  'Sprinkler',
  'Fair',
  '#10b981',
  true
);

-- Sample Crop Assignments
INSERT INTO public.field_crops (user_id, field_id, crop_name, crop_category, year, season, planted_date)
VALUES
(
  auth.uid(),
  (SELECT id FROM public.fields WHERE name = 'North Field' LIMIT 1),
  'Corn',
  'Grain',
  EXTRACT(YEAR FROM CURRENT_DATE)::INTEGER,
  'spring',
  CURRENT_DATE - INTERVAL '60 days'
),
(
  auth.uid(),
  (SELECT id FROM public.fields WHERE name = 'South Field' LIMIT 1),
  'Soybeans',
  'Legume',
  EXTRACT(YEAR FROM CURRENT_DATE)::INTEGER,
  'spring',
  CURRENT_DATE - INTERVAL '45 days'
);
*/
