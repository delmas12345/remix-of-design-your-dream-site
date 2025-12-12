-- Add new columns for project type and description
ALTER TABLE public.form_submissions 
ADD COLUMN IF NOT EXISTS project_type text,
ADD COLUMN IF NOT EXISTS project_description text;