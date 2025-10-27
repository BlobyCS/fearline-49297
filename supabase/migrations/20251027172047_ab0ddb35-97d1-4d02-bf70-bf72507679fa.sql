-- Fix function search path security warning
DROP FUNCTION IF EXISTS public.update_discord_sessions_updated_at() CASCADE;

CREATE OR REPLACE FUNCTION public.update_discord_sessions_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER update_discord_sessions_timestamp
BEFORE UPDATE ON public.discord_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_discord_sessions_updated_at();