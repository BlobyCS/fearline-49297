-- Create discord_sessions table to store user authentication data
CREATE TABLE public.discord_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  discord_id TEXT NOT NULL UNIQUE,
  discord_username TEXT NOT NULL,
  discord_avatar TEXT,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.discord_sessions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read their own session
CREATE POLICY "Users can view their own session"
ON public.discord_sessions
FOR SELECT
USING (true);

-- Create policy to allow insertion of new sessions
CREATE POLICY "Anyone can create sessions"
ON public.discord_sessions
FOR INSERT
WITH CHECK (true);

-- Create policy to allow updating sessions
CREATE POLICY "Anyone can update sessions"
ON public.discord_sessions
FOR UPDATE
USING (true);

-- Create policy to allow deleting sessions
CREATE POLICY "Anyone can delete sessions"
ON public.discord_sessions
FOR DELETE
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_discord_sessions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_discord_sessions_timestamp
BEFORE UPDATE ON public.discord_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_discord_sessions_updated_at();