import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message }: ContactEmailRequest = await req.json();

    console.log("Sending confirmation email to:", email);

    const emailResponse = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting me!",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">Thank You for Reaching Out!</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <p style="color: #334155; font-size: 18px; margin-bottom: 20px;">Hi ${name},</p>
            
            <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Thank you for contacting me! I've received your message and will get back to you as soon as possible, usually within 24 hours.
            </p>
            
            <div style="background: #f1f5f9; padding: 20px; border-radius: 6px; border-left: 4px solid #667eea; margin: 20px 0;">
              <p style="color: #475569; font-size: 14px; margin: 0; font-weight: 600;">Your Message:</p>
              <p style="color: #64748b; font-size: 14px; margin: 10px 0 0 0; font-style: italic;">"${message}"</p>
            </div>
            
            <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              In the meantime, feel free to check out my portfolio and recent projects. I'm excited to discuss how we can work together!
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="tel:+2348115195486" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
                📞 Schedule a Call
              </a>
            </div>
            
            <p style="color: #64748b; font-size: 16px; line-height: 1.6;">
              Best regards,<br>
              <strong style="color: #334155;">Dayo</strong><br>
              <span style="color: #94a3b8; font-size: 14px;">Full Stack Developer</span>
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 15px;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
              This is an automated confirmation email. Please do not reply to this message.
            </p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    console.error("Error in send-contact-email function:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);