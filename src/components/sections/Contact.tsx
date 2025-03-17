
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact = () => {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-medium text-neatspin-600 uppercase tracking-wider">Contact Us</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-gray-900">Get in Touch</h2>
          <p className="text-lg text-gray-600">
            Have questions or need assistance? We're here to help you with all your laundry needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Send Us a Message</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neatspin-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neatspin-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neatspin-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neatspin-500 focus:border-transparent"
                  rows={5}
                  required
                />
              </div>
              
              <Button className="w-full bg-neatspin-600 hover:bg-neatspin-700 text-white button-hover-effect">
                Send Message
              </Button>
            </form>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
              
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="mt-1">
                    <Phone size={20} className="text-neatspin-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900">Phone Number</h4>
                    <p className="text-gray-600">123-456-7890</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="mt-1">
                    <Mail size={20} className="text-neatspin-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900">Email Address</h4>
                    <p className="text-gray-600">hello@neatspin.com</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="mt-1">
                    <MapPin size={20} className="text-neatspin-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900">Location</h4>
                    <p className="text-gray-600">
                      123 Laundry Lane<br />
                      San Francisco, CA 94107
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="mt-1">
                    <Clock size={20} className="text-neatspin-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900">Business Hours</h4>
                    <p className="text-gray-600">
                      Monday - Friday: 7am - 9pm<br />
                      Saturday - Sunday: 9am - 7pm
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Our Location</h3>
              <div className="rounded-xl overflow-hidden h-64 bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.6834834857866!2d-122.40346148488484!3d37.77115712012704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807c1705da09%3A0x8d74f4c4c28f7c99!2s123%20Main%20St%2C%20San%20Francisco%2C%20CA%2094105%2C%20USA!5e0!3m2!1sen!2s!4v1627984814739!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="NeatSpin Location"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
