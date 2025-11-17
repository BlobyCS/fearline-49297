import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  email: string;
  token_hash: string;
  type: string;
  redirect_to?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, token_hash, type, redirect_to }: EmailRequest = await req.json();
    
    const smtpClient = new SMTPClient({
      connection: {
        hostname: Deno.env.get("SMTP_HOST") || "smtp.seznam.cz",
        port: parseInt(Deno.env.get("SMTP_PORT") || "587"),
        tls: true,
        auth: {
          username: Deno.env.get("SMTP_USER") || "",
          password: Deno.env.get("SMTP_PASSWORD") || "",
        },
      },
    });

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const verificationUrl = `${supabaseUrl}/auth/v1/verify?token=${token_hash}&type=${type}${redirect_to ? `&redirect_to=${redirect_to}` : ''}`;

    await smtpClient.send({
      from: "no-reply@fearline.eu",
      to: email,
      subject: "Ověření emailu - Fearline.eu",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; background-color: #0a0a0a; color: #cccccc; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 30px 0; }
            .logo { font-size: 32px; font-weight: bold; background: linear-gradient(135deg, #ff3333, #ff6666); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .content { background: #1a1a1a; border: 1px solid #ff3333; border-radius: 12px; padding: 30px; margin: 20px 0; }
            .button { display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #ff3333, #ff6666); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">FEARLINE</div>
            </div>
            <div class="content">
              <h2 style="color: #ff3333;">Ověření emailové adresy</h2>
              <p>Ahoj,</p>
              <p>Děkujeme za registraci na Fearline.eu! Pro dokončení registrace prosím ověř svou emailovou adresu kliknutím na tlačítko níže.</p>
              <div style="text-align: center;">
                <a href="${verificationUrl}" class="button">Ověřit email</a>
              </div>
              <p style="color: #888888; font-size: 12px; margin-top: 20px;">
                Pokud tlačítko nefunguje, zkopíruj tento odkaz do prohlížeče:<br>
                <a href="${verificationUrl}" style="color: #ff6666; word-break: break-all;">${verificationUrl}</a>
              </p>
              <p style="color: #888888; font-size: 12px;">
                Pokud jsi se neregistroval/a na Fearline.eu, tento email ignoruj.
              </p>
            </div>
            <div class="footer">
              <p>&copy; 2024 Fearline.eu | Všechna práva vyhrazena</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    await smtpClient.close();

    console.log(`Verification email sent to ${email}`);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending verification email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
