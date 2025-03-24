import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-semibold text-neatspin-700">
              Neat<span className="text-neatspin-500">Spin</span>
            </h3>
            <p className="text-gray-600 max-w-xs">
              Premium laundry services that deliver clean, fresh clothes right to your doorstep.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center transition-transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neatspin-600">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center transition-transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neatspin-600">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center transition-transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neatspin-600">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone size={18} className="text-neatspin-500 mt-1 mr-3" />
                <span className="text-gray-600">0542809098</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="text-neatspin-500 mt-1 mr-3" />
                <span className="text-gray-600">adnaanabdulkarim135@gmail.com</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="text-neatspin-500 mt-1 mr-3" />
                <span className="text-gray-600">
                  Ayeduase, Kumasi<br />
                  Ghana
                </span>
              </li>
              <li className="flex items-start">
                <Clock size={18} className="text-neatspin-500 mt-1 mr-3" />
                <div className="text-gray-600">
                  <p>Mon-Fri: 7am - 9pm</p>
                  <p>Sat-Sun: 9am - 7pm</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-gray-600 hover:text-neatspin-600 transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Our Services
                </a>
              </li>
              <li>
                <a href="#process" className="text-gray-600 hover:text-neatspin-600 transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  How It Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-600 hover:text-neatspin-600 transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Pricing
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-600 hover:text-neatspin-600 transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-600 hover:text-neatspin-600 transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Newsletter</h4>
            <p className="text-gray-600 mb-4">
              Subscribe to get special offers and laundry tips.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your Email"
                className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-neatspin-500 focus:border-transparent"
              />
              <Button className="rounded-r-lg bg-neatspin-600 hover:bg-neatspin-700 text-white px-4">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} NeatSpin. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-neatspin-600 text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-neatspin-600 text-sm">
              Terms of Service
            </a>
          </div>
          <button
            onClick={scrollToTop}
            className="mt-6 md:mt-0 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center transition-transform hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neatspin-600">
              <path d="m18 15-6-6-6 6"/>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
