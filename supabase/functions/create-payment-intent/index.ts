
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
    const { amount, email, service } = await req.json();
    
    console.log(`Creating payment intent for ${email}, service: ${service}, amount: ${amount}`);
    
    let paymentIntent;
    
    if (TEST_MODE) {
      console.log("Using test mode for payment intent");
      // Generate fake payment intent for testing
      paymentIntent = {
        id: `pi_test_${Math.random().toString(36).substring(2, 15)}`,
        clientSecret: `test_secret_${Math.random().toString(36).substring(2, 15)}`,
        amount: amount,
      };
    } else {
      // In production, use Stripe API
      // Note: You would need to import Stripe here and initialize it with your secret key
      // const stripe = new Stripe(STRIPE_SECRET_KEY);
      // paymentIntent = await stripe.paymentIntents.create({
      //   amount,
      //   currency: 'usd',
      //   receipt_email: email,
      //   metadata: { service }
      // });
      // 
      // return { id: paymentIntent.id, clientSecret: paymentIntent.client_secret, amount };
      
      // For demo purposes:
      paymentIntent = {
        id: `pi_live_${Math.random().toString(36).substring(2, 15)}`,
        clientSecret: `live_secret_${Math.random().toString(36).substring(2, 15)}`,
        amount: amount,
      };
    }
    
    return new Response(JSON.stringify(paymentIntent), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
