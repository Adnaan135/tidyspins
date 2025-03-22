
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY") || '';
const TEST_MODE = !STRIPE_SECRET_KEY || STRIPE_SECRET_KEY === "test_key";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { paymentIntentId } = await req.json();
    
    console.log(`Checking payment status for intent: ${paymentIntentId}`);
    
    let status;
    
    if (TEST_MODE) {
      console.log("Using test mode for payment status check");
      // In test mode, randomly return a status
      const statuses = ['succeeded', 'processing', 'failed'];
      status = paymentIntentId.includes('test') 
        ? statuses[Math.floor(Math.random() * statuses.length)]
        : 'succeeded';
    } else {
      // In production, check with Stripe API
      // const stripe = new Stripe(STRIPE_SECRET_KEY);
      // const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      // status = paymentIntent.status;
      
      // For demo purposes:
      status = paymentIntentId.includes('live') ? 'succeeded' : 'failed';
    }
    
    return new Response(JSON.stringify({ status }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error checking payment status:", error);
    
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
