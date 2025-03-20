
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import BookingProgress from '@/components/booking/BookingProgress';
import BookingSteps from '@/components/booking/BookingSteps';
import { FormData, EmailUpdate } from '@/components/booking/types';
import { updateScheduledEmail as updateEmail } from '@/components/booking/emailService';

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    service: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
    paymentMethod: '',
    scheduleEmailFor: '',
    useTestEmail: true // Default to test mode for safety
  });
  
  const [sentEmailId, setSentEmailId] = useState<string | null>(null);

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
      toast({
        title: "Update Failed",
        description: "Failed to update the scheduled email. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const scheduleTime = formData.scheduleEmailFor ? 
        new Date(formData.scheduleEmailFor).toISOString() : undefined;
      
      const { data: bookingData, error: bookingError } = await supabase
        .from('bookings')
        .insert([
          {
            service: formData.service,
            date: formData.date,
            time: formData.time,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            notes: formData.notes || null,
            payment_method: formData.paymentMethod
          }
        ])
        .select();

      if (bookingError) {
        throw new Error("Failed to save booking: " + bookingError.message);
      }

      console.log("Booking saved to database:", bookingData);
      
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
      
      setStep(1);
      setFormData({
        service: '',
        date: '',
        time: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        notes: '',
        paymentMethod: '',
        scheduleEmailFor: '',
        useTestEmail: true
      });
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Booking Failed",
        description: "There was a problem processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
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
          handleChange={handleChange}
          handleToggleChange={handleToggleChange}
          handleServiceSelect={handleServiceSelect}
          handlePaymentSelect={handlePaymentSelect}
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
