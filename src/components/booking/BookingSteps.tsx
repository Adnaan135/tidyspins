
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, CreditCard, Wallet, DollarSign } from 'lucide-react';
import ServiceOption from './ServiceOption';
import PaymentOption from './PaymentOption';
import { FormData } from './types';

interface BookingStepsProps {
  step: number;
  formData: FormData;
  isSubmitting: boolean;
  sentEmailId: string | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleToggleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleServiceSelect: (service: string) => void;
  handlePaymentSelect: (paymentMethod: string) => void;
  updateScheduledEmail: (updateData: { emailId: string; scheduleTime?: string; cancel?: boolean }) => Promise<void>;
  nextStep: () => void;
  prevStep: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const BookingSteps = ({ 
  step, 
  formData, 
  isSubmitting, 
  sentEmailId,
  handleChange, 
  handleToggleChange,
  handleServiceSelect, 
  handlePaymentSelect,
  updateScheduledEmail,
  nextStep, 
  prevStep,
  handleSubmit 
}: BookingStepsProps) => {
  return (
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

          <div className="mt-6 mb-6">
            <label className="block text-gray-700 mb-2">Schedule Confirmation Email (Optional)</label>
            <div className="relative">
              <input
                type="datetime-local"
                name="scheduleEmailFor"
                value={formData.scheduleEmailFor}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neatspin-500 focus:border-transparent pl-10"
                min={new Date().toISOString().slice(0, 16)}
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Leave empty to send immediately, or select a future date and time to schedule the confirmation email.
            </p>
          </div>

          <div className="mt-4 mb-6">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="useTestEmail"
                name="useTestEmail"
                checked={formData.useTestEmail}
                onChange={handleToggleChange}
                className="rounded text-neatspin-500 focus:ring-neatspin-500"
              />
              <label htmlFor="useTestEmail" className="text-sm text-gray-700">
                Use test email mode (sends to test address instead of customer)
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-1 ml-6">
              When unchecked, emails will be sent to the actual customer email address.
            </p>
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
          
          {sentEmailId && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">Manage Confirmation Email</h4>
              <div className="grid grid-cols-1 gap-3 mt-3">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    const newTime = new Date(Date.now() + 1000 * 60).toISOString(); // 1 minute from now
                    updateScheduledEmail({ emailId: sentEmailId, scheduleTime: newTime });
                  }}
                  className="border-gray-300 text-gray-700"
                >
                  Reschedule for 1 Minute Later
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => updateScheduledEmail({ emailId: sentEmailId, cancel: true })}
                  className="border-red-300 text-red-700 hover:bg-red-50"
                >
                  Cancel Scheduled Email
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                These options are only available for testing and would typically be part of an admin interface.
              </p>
            </div>
          )}
        </div>
      )}
    </form>
  );
};

export default BookingSteps;
