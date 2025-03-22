
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { CreditCard } from 'lucide-react';

interface PaymentFormProps {
  clientSecret: string | null;
  onPaymentComplete: (success: boolean) => void;
  amount: number;
}

const PaymentForm = ({ clientSecret, onPaymentComplete, amount }: PaymentFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Simulate payment processing for demo purposes
  // In a real implementation, you would use Stripe Elements here
  const handleSubmitPayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, we would process the payment with Stripe
      // const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      //   payment_method: { ... }
      // });
      
      const success = Math.random() > 0.2; // 80% success rate for demo
      
      if (success) {
        toast({
          title: "Payment Successful",
          description: `Your payment of $${(amount / 100).toFixed(2)} was processed successfully.`,
          variant: "default",
        });
        onPaymentComplete(true);
      } else {
        setError("Payment failed. Please try again or use a different payment method.");
        onPaymentComplete(false);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      onPaymentComplete(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 border border-gray-200 rounded-lg p-4">
      <h3 className="text-lg font-medium mb-4">Payment Details</h3>
      
      <div className="space-y-4">
        <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
          <div className="flex items-center space-x-3">
            <CreditCard className="text-gray-400" />
            <div>
              <p className="text-sm font-medium">Credit Card (Demo)</p>
              <p className="text-xs text-gray-500">This is a demo payment form. No real payments will be processed.</p>
            </div>
          </div>
        </div>
        
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}
        
        <Button 
          onClick={handleSubmitPayment}
          disabled={loading || !clientSecret}
          className="w-full bg-neatspin-600 hover:bg-neatspin-700"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            `Pay $${(amount / 100).toFixed(2)}`
          )}
        </Button>
      </div>
    </div>
  );
};

export default PaymentForm;
