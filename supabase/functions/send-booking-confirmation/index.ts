
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// Initialize Resend with the API key from environment variable
const resendApiKey = Deno.env.get("RESEND_API_KEY");
const resend = new Resend(resendApiKey);

// Debugging: Log whether the API key was successfully retrieved
console.log(`Resend API key found: ${resendApiKey ? "Yes" : "No"}`);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingRequest {
  service: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
  paymentMethod: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const booking: BookingRequest = await req.json();
    console.log("Processing booking confirmation for:", booking.email);

    // Format the service name for display
    let serviceName = "Unknown Service";
    let servicePrice = "₵19.99";
    
    if (booking.service === "basic") {
      serviceName = "Basic Wash";
      servicePrice = "₵19.99";
    } else if (booking.service === "premium") {
      serviceName = "Premium Care";
      servicePrice = "₵29.99";
    } else if (booking.service === "family") {
      serviceName = "Family Bundle";
      servicePrice = "₵49.99";
    }

    // Format payment method for display
    let paymentMethodName = "Unknown Payment Method";
    if (booking.paymentMethod === "credit-card") {
      paymentMethodName = "Credit Card";
    } else if (booking.paymentMethod === "digital-wallet") {
      paymentMethodName = "Digital Wallet";
    } else if (booking.paymentMethod === "pay-later") {
      paymentMethodName = "Pay Later (during pickup)";
    }

    console.log("Attempting to send email with Resend...");
    
    // Get the allowed email for testing
    const testingEmail = "adnaanabdulkarim@icloud.com"; // This is the only email allowed during testing
    
    // Send email to the testing email during development
    // In production, this would send to the actual customer email
    const emailResponse = await resend.emails.send({
      from: "NeatSpin Laundry <onboarding@resend.dev>",
      to: [testingEmail], // Always send to the testing email for now
      subject: `[TEST] Booking Confirmation for ${booking.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #3b82f6; margin-bottom: 10px;">NeatSpin Laundry</h1>
            <p style="font-size: 18px; color: #333;">Booking Confirmation</p>
            <p style="font-size: 16px; color: #e11d48; font-weight: bold;">TEST EMAIL - Would normally be sent to: ${booking.email}</p>
          </div>
          
          <div style="margin-bottom: 30px;">
            <p>Hello ${booking.name},</p>
            <p>Thank you for choosing NeatSpin Laundry! Your booking has been confirmed.</p>
          </div>
          
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h2 style="color: #333; font-size: 18px; margin-bottom: 15px;">Booking Details</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eaeaea; color: #666;">Service</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eaeaea; text-align: right; font-weight: bold;">${serviceName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eaeaea; color: #666;">Price</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eaeaea; text-align: right; font-weight: bold;">${servicePrice}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eaeaea; color: #666;">Pickup Date</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eaeaea; text-align: right; font-weight: bold;">${booking.date}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eaeaea; color: #666;">Pickup Time</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eaeaea; text-align: right; font-weight: bold;">${booking.time}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eaeaea; color: #666;">Address</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eaeaea; text-align: right; font-weight: bold;">${booking.address}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eaeaea; color: #666;">Payment Method</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eaeaea; text-align: right; font-weight: bold;">${paymentMethodName}</td>
              </tr>
            </table>
          </div>
          
          <div>
            <p>Our team will be at your location during the scheduled time to pick up your laundry. Please have your items ready for pickup.</p>
            <p>If you have any questions or need to make changes to your booking, please contact us at support@neatspin.example.com or call (555) 123-4567.</p>
            <p style="margin-top: 30px;">Thank you for choosing NeatSpin Laundry!</p>
            <p>Best regards,<br>The NeatSpin Team</p>
          </div>
        </div>
      `,
    });

    console.log("Email response from Resend:", emailResponse);

    // Modify the response to handle Resend's testing limitations
    const successResponse = {
      success: true,
      testMode: true, 
      sentToTestEmail: testingEmail,
      intendedRecipient: booking.email,
      emailResponse
    };

    return new Response(JSON.stringify(successResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error) {
    console.error("Error in send-booking-confirmation function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Unknown error occurred",
        stack: error.stack,
        name: error.name
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
