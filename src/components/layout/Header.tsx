
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "bg-white/80 shadow-sm backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="text-2xl font-display font-semibold text-neatspin-700">
            Neat<span className="text-neatspin-500">Spin</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('services')}
            className="text-base font-medium text-gray-700 hover:text-neatspin-600 transition-colors"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection('process')}
            className="text-base font-medium text-gray-700 hover:text-neatspin-600 transition-colors"
          >
            How It Works
          </button>
          <button 
            onClick={() => scrollToSection('testimonials')}
            className="text-base font-medium text-gray-700 hover:text-neatspin-600 transition-colors"
          >
            Testimonials
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-base font-medium text-gray-700 hover:text-neatspin-600 transition-colors"
          >
            Contact
          </button>
          <Button 
            className="bg-neatspin-600 hover:bg-neatspin-700 text-white rounded-full px-6 button-hover-effect"
            onClick={() => scrollToSection('booking')}
          >
            Book Now
          </Button>
        </nav>

        {/* Phone number on large screens */}
        <div className="hidden lg:flex items-center">
          <a href="tel:+1234567890" className="flex items-center text-gray-700 hover:text-neatspin-600 transition-colors">
            <Phone size={18} className="mr-2" />
            <span className="font-medium">123-456-7890</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? (
            <X size={24} className="text-gray-700" />
          ) : (
            <Menu size={24} className="text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md animate-fade-in">
          <div className="flex flex-col p-4 space-y-4">
            <button 
              onClick={() => scrollToSection('services')}
              className="text-base font-medium text-gray-700 hover:text-neatspin-600 transition-colors py-2"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('process')}
              className="text-base font-medium text-gray-700 hover:text-neatspin-600 transition-colors py-2"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-base font-medium text-gray-700 hover:text-neatspin-600 transition-colors py-2"
            >
              Testimonials
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-base font-medium text-gray-700 hover:text-neatspin-600 transition-colors py-2"
            >
              Contact
            </button>
            <a href="tel:+1234567890" className="flex items-center text-gray-700 hover:text-neatspin-600 transition-colors py-2">
              <Phone size={18} className="mr-2" />
              <span className="font-medium">123-456-7890</span>
            </a>
            <Button 
              className="bg-neatspin-600 hover:bg-neatspin-700 text-white rounded-full px-6 button-hover-effect w-full"
              onClick={() => scrollToSection('booking')}
            >
              Book Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
