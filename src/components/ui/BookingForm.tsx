
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import BookingProgress from '@/components/booking/BookingProgress';
import BookingSteps from '@/components/booking/BookingSteps';
import { FormData, EmailUpdate } from '@/components/booking/types';
import { updateScheduledEmail as updateEmail } from '@/components/booking/emailService';
import { createPaymentIntent, getPaymentStatus } from '@/components/booking/paymentService';

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState<FormData>({
    service: '',
    date: '',
    time: '',
    name: '',
    email: user?.email || '',
    phone: '',
    address: '',
    notes: '',
    paymentMethod: '',
    scheduleEmailFor: '',
    useTestEmail: true,
    paymentStatus: 'pending'
  });
  
  const [sentEmailId, setSentEmailId] = useState<string | null>(null);
  const [paymentClientSecret, setPaymentClientSecret] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: checked
    }));
  };

  const handleServiceSelect = (service: string) => {
    setFormData(prevData => ({
      ...prevData,
      service
    }));
  };

  const handlePaymentSelect = (paymentMethod: string) => {
    setFormData(prevData => ({
      ...prevData,
      paymentMethod
    }));
  };

  const handlePaymentComplete = (success: boolean) => {
    if (success) {
      setFormData(prev => ({
        ...prev,
        paymentStatus: 'completed'
      }));
      
      handleFormSubmission();
    } else {
      setFormData(prev => ({
        ...prev,
        paymentStatus: 'failed'
      }));
      
      toast({
        title: "Payment Failed",
        description: "Your payment could not be processed. Please try again or use a different payment method.",
        variant: "destructive",
      });
    }
  };

  const updateScheduledEmail = async (updateData: EmailUpdate) => {
    if (!sentEmailId) {
      toast({
        title: "No email to update",
        description: "There is no sent email to update.",
        variant: "destructive",
      });
      return;
    }

    try {
      const data = await updateEmail(updateData);
      
      toast({
        title: data.action === "cancelled" ? "Email Cancelled" : "Email Rescheduled",
        description: `The confirmation email has been ${data.action} successfully.`,
        variant: "default",
      });
      
    } catch (error) {
      console.error('Error updating scheduled email:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update the scheduled email. Please try again.",
        variant: "destructive",
      });
    }
  };

  const initializePayment = async () => {
    if (formData.paymentMethod === 'pay-later') {
      handleFormSubmission();
      return;
    }
    
    try {
      const paymentIntent = await createPaymentIntent(formData.service, formData.email);
      
      if (paymentIntent) {
        setPaymentClientSecret(paymentIntent.clientSecret);
        setFormData(prev => ({
          ...prev,
          paymentIntentId: paymentIntent.id
        }));
      } else {
        throw new Error("Failed to create payment intent");
      }
    } catch (error) {
      console.error("Payment initialization error:", error);
      toast({
        title: "Payment Setup Failed",
        description: "There was a problem setting up the payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFormSubmission = async () => {
    try {
      const scheduleTime = formData.scheduleEmailFor ? 
        new Date(formData.scheduleEmailFor).toISOString() : undefined;
      
      const bookingData = {
        service: formData.service,
        date: formData.date,
        time: formData.time,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        notes: formData.notes || null,
        payment_method: formData.paymentMethod,
        status: formData.paymentMethod === 'pay-later' ? 'pending' : 'paid'
      };

      console.log("Saving booking data:", bookingData);

      const { data: savedBooking, error: bookingError } = await supabase
        .from('bookings')
        .insert([bookingData])
        .select();

      if (bookingError) {
        console.error("Booking save error:", bookingError);
        throw new Error("Failed to save booking: " + bookingError.message);
      }

      console.log("Booking saved successfully:", savedBooking);
      
      // Send confirmation email
      console.log("Sending confirmation email to:", formData.email);
      const { data: emailData, error: emailError } = await supabase.functions.invoke('send-booking-confirmation', {
        body: {
          service: formData.service,
          date: formData.date,
          time: formData.time,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          notes: formData.notes,
          paymentMethod: formData.paymentMethod,
          scheduleTime: scheduleTime,
          useTestEmail: formData.useTestEmail
        },
      });

      if (emailError) {
        console.error("Email sending error:", emailError);
        toast({
          title: "Booking Confirmed",
          description: "Your booking was saved, but there was an issue sending the confirmation email. Our team will contact you shortly.",
          variant: "default",
        });
      } else {
        console.log("Email confirmation sent successfully:", emailData);
        
        if (emailData && emailData.emailResponse && emailData.emailResponse.id) {
          setSentEmailId(emailData.emailResponse.id);
        }
        
        if (emailData && emailData.testMode) {
          const scheduledMsg = scheduleTime ? " It has been scheduled to be sent later." : "";
          
          toast({
            title: "Booking Confirmed! (Test Mode)",
            description: `In test mode, emails are sent to a test address. The confirmation would normally be sent to ${formData.email}.${scheduledMsg}`,
            variant: "default",
          });
        } else {
          toast({
            title: "Booking Confirmed!",
            description: `We've sent a confirmation email to ${formData.email}. We'll contact you shortly to confirm your pickup.`,
            variant: "default",
          });
        }
      }
      
      // Reset form
      setStep(1);
      setFormData({
        service: '',
        date: '',
        time: '',
        name: '',
        email: user?.email || '',
        phone: '',
        address: '',
        notes: '',
        paymentMethod: '',
        scheduleEmailFor: '',
        useTestEmail: true,
        paymentStatus: 'pending'
      });
      
      setPaymentClientSecret(null);
    } catch (error) {
      console.error("Booking submission error:", error);
      toast({
        title: "Booking Failed",
        description: "There was a problem processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (formData.paymentMethod === 'pay-later') {
      await handleFormSubmission();
    } else if (paymentClientSecret) {
      // Payment handling will be done by the payment component
    } else {
      await initializePayment();
    }
  };

  const nextStep = () => {
    if (step === 3) {
      initializePayment();
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-1">
        <BookingProgress step={step} />
        
        <BookingSteps
          step={step}
          formData={formData}
          isSubmitting={isSubmitting}
          sentEmailId={sentEmailId}
          paymentClientSecret={paymentClientSecret}
          handleChange={handleChange}
          handleToggleChange={handleToggleChange}
          handleServiceSelect={handleServiceSelect}
          handlePaymentSelect={handlePaymentSelect}
          handlePaymentComplete={handlePaymentComplete}
          updateScheduledEmail={updateScheduledEmail}
          nextStep={nextStep}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      </div>
    </motion.div>
  );
};

export default BookingForm;
