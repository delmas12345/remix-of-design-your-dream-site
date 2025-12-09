-- Create table for form submissions
CREATE TABLE public.form_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  business_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  website_purpose TEXT[],
  other_purpose TEXT,
  page_count TEXT,
  main_pages TEXT,
  design_style TEXT[],
  other_style TEXT,
  layout TEXT,
  main_color TEXT,
  secondary_color TEXT,
  accent_color TEXT,
  use_designer_colors BOOLEAN DEFAULT false,
  typography TEXT,
  custom_typography TEXT,
  features TEXT[],
  other_features TEXT,
  content_provider TEXT,
  media_provided TEXT[],
  deadline TEXT,
  launch_date TEXT,
  budget TEXT,
  additional_notes TEXT,
  signature TEXT,
  signature_date TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (anyone can submit the form)
CREATE POLICY "Anyone can submit form" 
ON public.form_submissions 
FOR INSERT 
WITH CHECK (true);

-- Allow public select (for admin - we'll use password protection in frontend)
CREATE POLICY "Anyone can view submissions" 
ON public.form_submissions 
FOR SELECT 
USING (true);

-- Allow delete for admin management
CREATE POLICY "Anyone can delete submissions" 
ON public.form_submissions 
FOR DELETE 
USING (true);

-- Enable realtime for submissions
ALTER PUBLICATION supabase_realtime ADD TABLE public.form_submissions;