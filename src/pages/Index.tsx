
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import BookingForm from '@/components/ui/BookingForm';
import { motion } from 'framer-motion';

const Index = () => {
  useEffect(() => {
    // Reveal animations on scroll
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('revealed');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <Hero />
        
        <Services />
        
        <section id="booking" className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <span className="text-sm font-medium text-neatspin-600 uppercase tracking-wider">Book Now</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-gray-900">Schedule a Pickup</h2>
              <p className="text-lg text-gray-600">
                Getting started is easy. Book your first laundry pickup in just a few simple steps.
              </p>
            </motion.div>
            
            <BookingForm />
          </div>
        </section>
        
        <Process />
        
        <Testimonials />
        
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
