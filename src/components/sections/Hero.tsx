
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { WashingMachine, Droplets, Clock } from 'lucide-react';

const Hero = () => {
  const bubbleRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const createBubbles = () => {
      if (!bubbleRef.current) return;
      
      const container = bubbleRef.current;
      container.innerHTML = '';
      
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      
      // Create bubble elements
      for (let i = 0; i < 6; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble absolute';
        
        // Random position
        const size = Math.random() * 200 + 100;
        const left = Math.random() * containerWidth;
        const top = Math.random() * containerHeight;
        
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${left}px`;
        bubble.style.top = `${top}px`;
        
        // Animation
        bubble.style.opacity = '0.3';
        if (i % 2 === 0) {
          bubble.style.animation = `float ${8 + i * 2}s ease-in-out infinite, rotate-slow ${20 + i * 5}s linear infinite`;
        } else {
          bubble.style.animation = `float ${10 + i * 2}s ease-in-out infinite, rotate-slow ${25 + i * 5}s linear infinite reverse`;
        }
        
        container.appendChild(bubble);
      }
    };
    
    createBubbles();
    window.addEventListener('resize', createBubbles);
    
    return () => {
      window.removeEventListener('resize', createBubbles);
    };
  }, []);
  
  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="relative pt-32 pb-20 md:pb-32 overflow-hidden">
      <div ref={bubbleRef} className="absolute inset-0 z-0" aria-hidden="true" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-neatspin-100 text-neatspin-800 rounded-full mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Premium Laundry Service
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-gray-900 mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Fresh Clothes, <br />
              <span className="text-neatspin-600">Delivered</span> to <br />Your Door
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Experience the convenience of premium laundry service with NeatSpin. We collect, clean, and deliver your clothes with care and precision.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <Button 
                className="bg-neatspin-600 hover:bg-neatspin-700 text-white rounded-full px-8 py-6 button-hover-effect text-base"
                onClick={scrollToBooking}
              >
                Book a Pickup
              </Button>
              <Button 
                variant="outline" 
                className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full px-8 py-6 text-base"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Services
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center md:justify-end animate-scale-up relative">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-10 -left-10 z-10 glass-card rounded-2xl p-5 shadow-lg animate-fade-in-left" style={{ animationDelay: '0.7s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-neatspin-100 flex items-center justify-center">
                    <WashingMachine className="text-neatspin-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Expert Cleaning</h3>
                    <p className="text-sm text-gray-600">For all fabric types</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-5 -left-5 z-10 glass-card rounded-2xl p-5 shadow-lg animate-fade-in-left" style={{ animationDelay: '0.9s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-neatspin-100 flex items-center justify-center">
                    <Droplets className="text-neatspin-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Eco-Friendly</h3>
                    <p className="text-sm text-gray-600">Safe for environment</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-8 right-10 z-10 glass-card rounded-2xl p-5 shadow-lg animate-fade-in-right" style={{ animationDelay: '1.1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-neatspin-100 flex items-center justify-center">
                    <Clock className="text-neatspin-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">24-Hour Turnaround</h3>
                    <p className="text-sm text-gray-600">Quick & reliable service</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80&w=2671&ixlib=rb-4.0.3"
                  alt="Freshly laundered clothes" 
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
