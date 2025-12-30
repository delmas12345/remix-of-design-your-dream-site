CREATE EXTENSION IF NOT EXISTS "pg_graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "plpgsql";
CREATE EXTENSION IF NOT EXISTS "supabase_vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";
BEGIN;

--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



SET default_table_access_method = heap;

--
-- Name: form_submissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.form_submissions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    full_name text NOT NULL,
    business_name text,
    email text NOT NULL,
    phone text,
    website_purpose text[],
    other_purpose text,
    page_count text,
    main_pages text,
    design_style text[],
    other_style text,
    layout text,
    main_color text,
    secondary_color text,
    accent_color text,
    use_designer_colors boolean DEFAULT false,
    typography text,
    custom_typography text,
    features text[],
    other_features text,
    content_provider text,
    media_provided text[],
    deadline text,
    launch_date text,
    budget text,
    additional_notes text,
    signature text,
    signature_date text,
    submitted_at timestamp with time zone DEFAULT now() NOT NULL,
    project_type text,
    project_description text
);


--
-- Name: form_submissions form_submissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.form_submissions
    ADD CONSTRAINT form_submissions_pkey PRIMARY KEY (id);


--
-- Name: form_submissions Anyone can delete submissions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can delete submissions" ON public.form_submissions FOR DELETE USING (true);


--
-- Name: form_submissions Anyone can submit form; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can submit form" ON public.form_submissions FOR INSERT WITH CHECK (true);


--
-- Name: form_submissions Anyone can view submissions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view submissions" ON public.form_submissions FOR SELECT USING (true);


--
-- Name: form_submissions; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--




COMMIT;