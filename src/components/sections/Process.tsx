
import { PhoneCall, Package, Truck, Check } from 'lucide-react';
import ProcessStep from '../ui/ProcessStep';
import { motion } from 'framer-motion';

const Process = () => {
  return (
    <section id="process" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-medium text-neatspin-600 uppercase tracking-wider">How It Works</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-gray-900">Simple 4-Step Process</h2>
          <p className="text-lg text-gray-600">
            We've made our laundry service incredibly easy to use. Just follow these simple steps.
          </p>
        </motion.div>

        <div className="mt-12 space-y-12 md:space-y-16 max-w-4xl mx-auto">
          <ProcessStep
            number={1}
            title="Schedule a Pickup"
            description="Book a convenient pickup time through our website or mobile app. We offer flexible time slots to fit your schedule."
            icon={<PhoneCall size={24} className="text-neatspin-600" />}
            delay={0.1}
          />
          
          <ProcessStep
            number={2}
            title="We Collect Your Laundry"
            description="Our professional driver will arrive at your doorstep to collect your laundry in our special laundry bags."
            icon={<Package size={24} className="text-neatspin-600" />}
            delay={0.2}
          />
          
          <ProcessStep
            number={3}
            title="Expert Cleaning"
            description="Our experts clean, dry, and fold your clothes with care using eco-friendly products and professional equipment."
            icon={<WashingMachineIcon size={24} className="text-neatspin-600" />}
            delay={0.3}
          />
          
          <ProcessStep
            number={4}
            title="Delivery to Your Door"
            description="Your freshly cleaned clothes are delivered back to you, neatly folded and packaged, ready to be put away."
            icon={<Truck size={24} className="text-neatspin-600" />}
            delay={0.4}
            isLast={true}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 bg-neatspin-50 rounded-2xl p-8 max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="p-4 rounded-full bg-neatspin-100">
              <Check size={24} className="text-neatspin-600" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Satisfaction Guaranteed</h3>
              <p className="text-gray-600">
                Not completely satisfied with our service? We'll re-clean your items or refund your money. Your satisfaction is our top priority.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Custom washing machine icon since it's not in Lucide
const WashingMachineIcon = ({ size = 24, className = "" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
      <line x1="2" y1="7" x2="22" y2="7" />
      <line x1="6" y1="2" x2="6" y2="7" />
      <circle cx="4" cy="4" r="1" />
    </svg>
  );
};

export default Process;
