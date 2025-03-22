
import { useState, useEffect } from 'react';
import { X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className={`text-2xl font-bold ${isScrolled ? 'text-neatspin-600' : 'text-white'}`}>
            NeatSpin
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-neatspin-500 transition-colors`}>
            Home
          </Link>
          <a href="#services" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-neatspin-500 transition-colors`}>
            Services
          </a>
          <a href="#process" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-neatspin-500 transition-colors`}>
            How It Works
          </a>
          <a href="#testimonials" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-neatspin-500 transition-colors`}>
            Testimonials
          </a>
          <a href="#contact" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-neatspin-500 transition-colors`}>
            Contact
          </a>
          <Link to="/admin" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-neatspin-500 transition-colors`}>
            Admin
          </Link>
        </nav>
        
        <div className="hidden md:block">
          <a href="#booking">
            <Button className="button-hover-effect">
              Book Now
            </Button>
          </a>
        </div>
        
        <button 
          onClick={toggleMenu} 
          className="md:hidden text-2xl"
        >
          {isMenuOpen ? 
            <X className={isScrolled ? 'text-gray-800' : 'text-white'} /> : 
            <Menu className={isScrolled ? 'text-gray-800' : 'text-white'} />
          }
        </button>
      </div>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white w-full shadow-lg"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 py-2 px-4 hover:bg-gray-100 rounded-md">
                Home
              </Link>
              <a href="#services" className="text-gray-700 py-2 px-4 hover:bg-gray-100 rounded-md">
                Services
              </a>
              <a href="#process" className="text-gray-700 py-2 px-4 hover:bg-gray-100 rounded-md">
                How It Works
              </a>
              <a href="#testimonials" className="text-gray-700 py-2 px-4 hover:bg-gray-100 rounded-md">
                Testimonials
              </a>
              <a href="#contact" className="text-gray-700 py-2 px-4 hover:bg-gray-100 rounded-md">
                Contact
              </a>
              <Link to="/admin" className="text-gray-700 py-2 px-4 hover:bg-gray-100 rounded-md">
                Admin
              </Link>
              <a href="#booking" className="mt-2">
                <Button className="w-full button-hover-effect">
                  Book Now
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
