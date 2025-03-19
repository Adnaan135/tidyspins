import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, CreditCard, Wallet, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
    paymentMethod: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
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
          paymentMethod: formData.paymentMethod
        },
      });

      if (emailError) {
        console.warn("Email sending error:", emailError);
        // Continue execution even if email fails
      } else {
        console.log("Email confirmation sent:", emailData);
      }
      
      toast({
        title: "Booking Confirmed!",
        description: `We've sent a confirmation email to ${formData.email}. We'll contact you shortly to confirm your pickup.`,
      });
      
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
        paymentMethod: ''
      });
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was a problem processing your booking. Please try again.",
        variant: "destructive",
      });
      console.error("Booking error:", error);
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
        <div className="flex mb-6">
          <div 
            className={`flex-1 h-2 rounded-full ${
              step >= 1 ? 'bg-neatspin-500' : 'bg-gray-200'
            } transition-all duration-300`}
          />
          <div className="w-1" />
          <div 
            className={`flex-1 h-2 rounded-full ${
              step >= 2 ? 'bg-neatspin-500' : 'bg-gray-200'
            } transition-all duration-300`}
          />
          <div className="w-1" />
          <div 
            className={`flex-1 h-2 rounded-full ${
              step >= 3 ? 'bg-neatspin-500' : 'bg-gray-200'
            } transition-all duration-300`}
          />
          <div className="w-1" />
          <div 
            className={`flex-1 h-2 rounded-full ${
              step >= 4 ? 'bg-neatspin-500' : 'bg-gray-200'
            } transition-all duration-300`}
          />
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Select a Service</h3>
              
              <div className="grid grid-cols-1 gap-4 mb-6">
                <ServiceOption
                  title="Basic Wash"
                  description="Wash & Fold for everyday clothes"
                  price="₵19.99/load"
                  selected={formData.service === 'basic'}
                  onClick={() => handleServiceSelect('basic')}
                />
                
                <ServiceOption
                  title="Premium Care"
                  description="Wash, Dry & Press for business attire"
                  price="₵29.99/load"
                  selected={formData.service === 'premium'}
                  onClick={() => handleServiceSelect('premium')}
                />
                
                <ServiceOption
                  title="Family Bundle"
                  description="Up to 20 lbs of laundry, sorting included"
                  price="₵49.99/bundle"
                  selected={formData.service === 'family'}
                  onClick={() => handleServiceSelect('family')}
                />
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="button" 
                  onClick={nextStep}
                  className="bg-neatspin-600 hover:bg-neatspin-700 text-white button-hover-effect"
                  disabled={!formData.service}
                >
                  Continue
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Schedule Pickup</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2">Pickup Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neatspin-500 focus:border-transparent pl-10"
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Pickup Time</label>
                  <div className="relative">
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neatspin-500 focus:border-transparent pl-10 appearance-none"
                      required
                    >
                      <option value="">Select a time</option>
                      <option value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</option>
                      <option value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</option>
                      <option value="1:00 PM - 3:00 PM">1:00 PM - 3:00 PM</option>
                      <option value="3:00 PM - 5:00 PM">3:00 PM - 5:00 PM</option>
                      <option value="5:00 PM - 7:00 PM">5:00 PM - 7:00 PM</option>
                    </select>
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prevStep}
                  className="border-gray-300 text-gray-700"
                >
                  Back
                </Button>
                <Button 
                  type="button" 
                  onClick={nextStep}
                  className="bg-neatspin-600 hover:bg-neatspin-700 text-white button-hover-effect"
                  disabled={!formData.date || !formData.time}
                >
                  Continue
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Your Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neatspin-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neatspin-500 focus:border-transparent"
                    required
                    placeholder="We'll send your confirmation here"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neatspin-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neatspin-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Special Instructions (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neatspin-500 focus:border-transparent"
                  rows={3}
                />
              </div>
              
              <div className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prevStep}
                  className="border-gray-300 text-gray-700"
                >
                  Back
                </Button>
                <Button 
                  type="button" 
                  onClick={nextStep}
                  className="bg-neatspin-600 hover:bg-neatspin-700 text-white button-hover-effect"
                  disabled={!formData.name || !formData.email || !formData.phone || !formData.address}
                >
                  Continue
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h3>
              
              <div className="grid grid-cols-1 gap-4 mb-6">
                <PaymentOption
                  title="Credit Card"
                  description="Pay securely with your credit card"
                  icon={<CreditCard className="text-neatspin-500" size={24} />}
                  selected={formData.paymentMethod === 'credit-card'}
                  onClick={() => handlePaymentSelect('credit-card')}
                />
                
                <PaymentOption
                  title="Digital Wallet"
                  description="Apple Pay, Google Pay, or PayPal"
                  icon={<Wallet className="text-neatspin-500" size={24} />}
                  selected={formData.paymentMethod === 'digital-wallet'}
                  onClick={() => handlePaymentSelect('digital-wallet')}
                />
                
                <PaymentOption
                  title="Pay Later"
                  description="Pay in cash or card during pickup"
                  icon={<DollarSign className="text-neatspin-500" size={24} />}
                  selected={formData.paymentMethod === 'pay-later'}
                  onClick={() => handlePaymentSelect('pay-later')}
                />
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">Order Summary</h4>
                <div className="flex justify-between text-gray-600 mb-1">
                  <span>Service:</span>
                  <span className="font-medium">{formData.service === 'basic' ? 'Basic Wash' : formData.service === 'premium' ? 'Premium Care' : 'Family Bundle'}</span>
                </div>
                <div className="flex justify-between text-gray-600 mb-1">
                  <span>Price:</span>
                  <span className="font-medium">{formData.service === 'basic' ? '₵19.99' : formData.service === 'premium' ? '₵29.99' : '₵49.99'}</span>
                </div>
                <div className="flex justify-between text-gray-600 mb-1">
                  <span>Pickup Date:</span>
                  <span className="font-medium">{formData.date}</span>
                </div>
                <div className="flex justify-between text-gray-600 mb-1">
                  <span>Pickup Time:</span>
                  <span className="font-medium">{formData.time}</span>
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prevStep}
                  className="border-gray-300 text-gray-700"
                  disabled={isSubmitting}
                >
                  Back
                </Button>
                <Button 
                  type="submit" 
                  className="bg-neatspin-600 hover:bg-neatspin-700 text-white button-hover-effect"
                  disabled={isSubmitting || !formData.paymentMethod}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : "Complete Booking"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </motion.div>
  );
};

const ServiceOption = ({ title, description, price, selected, onClick }: { 
  title: string;
  description: string;
  price: string;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`border rounded-xl p-4 cursor-pointer transition-all duration-200 ${
        selected 
          ? 'border-neatspin-500 bg-neatspin-50 shadow-sm' 
          : 'border-gray-200 hover:border-neatspin-300'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-900 mr-3">{price}</span>
          <div 
            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
              selected 
                ? 'border-neatspin-500 bg-neatspin-500' 
                : 'border-gray-300'
            }`}
          >
            {selected && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="12" height="12">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentOption = ({ title, description, icon, selected, onClick }: { 
  title: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`border rounded-xl p-4 cursor-pointer transition-all duration-200 ${
        selected 
          ? 'border-neatspin-500 bg-neatspin-50 shadow-sm' 
          : 'border-gray-200 hover:border-neatspin-300'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4">
            {icon}
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{title}</h4>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <div 
          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
            selected 
              ? 'border-neatspin-500 bg-neatspin-500' 
              : 'border-gray-300'
          }`}
        >
          {selected && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="12" height="12">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
