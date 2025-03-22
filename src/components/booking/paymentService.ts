
import { supabase } from "@/integrations/supabase/client";

interface PaymentIntent {
  id: string;
  clientSecret: string;
  amount: number;
}

export const createPaymentIntent = async (
  service: string,
  email: string
): Promise<PaymentIntent | null> => {
  try {
    // Calculate amount based on service
    const serviceAmounts: Record<string, number> = {
      basic: 1999, // $19.99
      premium: 2999, // $29.99
      family: 4999 // $49.99
    };
    
    const amount = serviceAmounts[service] || 1999;
    
    const { data, error } = await supabase.functions.invoke('create-payment-intent', {
      body: {
        amount,
        email,
        service
      }
    });

    if (error) {
      console.error("Payment intent creation error:", error);
      throw error;
    }

    return data as PaymentIntent;
  } catch (error) {
    console.error("Payment service error:", error);
    return null;
  }
};

export const getPaymentStatus = async (paymentIntentId: string): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('check-payment-status', {
      body: {
        paymentIntentId
      }
    });

    if (error) {
      console.error("Payment status check error:", error);
      throw error;
    }

    return data.status;
  } catch (error) {
    console.error("Payment status check error:", error);
    return 'failed';
  }
};
