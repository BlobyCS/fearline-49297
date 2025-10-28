import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    
    if (!code) {
      return new Response(
        JSON.stringify({ error: 'No code provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const clientId = Deno.env.get('DISCORD_CLIENT_ID');
    const clientSecret = Deno.env.get('DISCORD_CLIENT_SECRET');
    const redirectUri = `${url.origin}/auth/callback`;

    console.log('Exchanging code for token...');

    // Exchange code for access token
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId!,
        client_secret: clientSecret!,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      console.error('Token exchange failed:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to exchange code for token' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const tokenData = await tokenResponse.json();
    console.log('Token received');

    // Get user info from Discord
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!userResponse.ok) {
      console.error('Failed to get user info');
      return new Response(
        JSON.stringify({ error: 'Failed to get user info' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userData = await userResponse.json();
    console.log('User info received:', userData.username);

    // Get guild ID from environment or use the invite code to join
    const guildId = Deno.env.get('DISCORD_GUILD_ID');
    
    if (guildId) {
      try {
        // Try to add user to the guild using bot token
        const botToken = Deno.env.get('DISCORD_BOT_TOKEN');
        if (botToken) {
          const addMemberResponse = await fetch(
            `https://discord.com/api/guilds/${guildId}/members/${userData.id}`,
            {
              method: 'PUT',
              headers: {
                Authorization: `Bot ${botToken}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                access_token: tokenData.access_token,
              }),
            }
          );
          
          if (addMemberResponse.ok) {
            console.log('User added to guild successfully');
          } else if (addMemberResponse.status === 204) {
            console.log('User is already in the guild');
          } else {
            console.log('Could not add user to guild:', await addMemberResponse.text());
          }
        }
      } catch (error) {
        console.error('Error adding user to guild:', error);
        // Continue with login even if guild join fails
      }
    }

    // Calculate token expiration
    const expiresAt = new Date(Date.now() + tokenData.expires_in * 1000).toISOString();

    // Store session in Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const avatarUrl = userData.avatar
      ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`
      : null;

    // Check if session exists
    const { data: existingSession } = await supabase
      .from('discord_sessions')
      .select('*')
      .eq('discord_id', userData.id)
      .single();

    if (existingSession) {
      // Update existing session
      const { error } = await supabase
        .from('discord_sessions')
        .update({
          discord_username: userData.username,
          discord_avatar: avatarUrl,
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token,
          expires_at: expiresAt,
        })
        .eq('discord_id', userData.id);

      if (error) {
        console.error('Failed to update session:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to update session' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    } else {
      // Create new session
      const { error } = await supabase
        .from('discord_sessions')
        .insert({
          discord_id: userData.id,
          discord_username: userData.username,
          discord_avatar: avatarUrl,
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token,
          expires_at: expiresAt,
        });

      if (error) {
        console.error('Failed to create session:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to create session' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    console.log('Session saved successfully');

    // Return session data
    return new Response(
      JSON.stringify({
        success: true,
        session: {
          discord_id: userData.id,
          discord_username: userData.username,
          discord_avatar: avatarUrl,
        },
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in discord-auth:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
