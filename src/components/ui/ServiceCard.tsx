
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  icon: React.ReactNode;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  delay?: number;
}

const ServiceCard = ({
  title,
  icon,
  price,
  description,
  features,
  isPopular = false,
  delay = 0
}: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={cn(
        "relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl bg-white",
        isPopular ? "shadow-lg border-2 border-neatspin-500" : "shadow-md border border-gray-100"
      )}
    >
      {isPopular && (
        <div className="absolute top-0 right-0">
          <div className="bg-neatspin-500 text-white text-xs font-semibold px-4 py-1 rounded-bl-lg">
            MOST POPULAR
          </div>
        </div>
      )}
      
      <div className="px-6 py-8">
        <div className={cn(
          "w-14 h-14 rounded-lg flex items-center justify-center mb-6",
          isPopular ? "bg-neatspin-100" : "bg-gray-100"
        )}>
          {icon}
        </div>
        
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
        
        <div className="flex items-baseline mb-4">
          <span className="text-3xl font-bold text-gray-900">{price}</span>
          <span className="text-gray-500 ml-1">/load</span>
        </div>
        
        <p className="text-gray-600 mb-6">{description}</p>
        
        <div className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <Check className={cn(
                "mr-3 mt-0.5 w-5 h-5",
                isPopular ? "text-neatspin-500" : "text-gray-500"
              )} />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
        
        <button
          className={cn(
            "w-full py-3 rounded-lg font-medium transition-all duration-200",
            isPopular
              ? "bg-neatspin-600 text-white hover:bg-neatspin-700"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          )}
        >
          Choose Plan
        </button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
