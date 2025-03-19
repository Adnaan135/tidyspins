
import { WashingMachine, Shirt, ShoppingBag } from 'lucide-react';
import ServiceCard from '../ui/ServiceCard';
import { motion } from 'framer-motion';

const Services = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-medium text-neatspin-600 uppercase tracking-wider">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-gray-900">Premium Laundry Solutions</h2>
          <p className="text-lg text-gray-600">
            Choose the perfect laundry service package that fits your lifestyle and budget.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <ServiceCard
            title="Basic Wash"
            icon={<WashingMachine size={28} className="text-neatspin-600" />}
            price="₵19.99"
            description="Perfect for everyday clothes and small loads."
            features={[
              "Wash & Fold",
              "48-hour turnaround",
              "Free pickup for orders ₵30+",
              "Eco-friendly detergents"
            ]}
            delay={0.1}
            serviceId="basic"
          />

          <ServiceCard
            title="Premium Care"
            icon={<Shirt size={28} className="text-neatspin-600" />}
            price="₵29.99"
            description="Ideal for business attire and delicate fabrics."
            features={[
              "Wash, Dry & Press",
              "24-hour turnaround",
              "Free pickup & delivery",
              "Stain treatment included",
              "Fabric softener & protection"
            ]}
            isPopular={true}
            delay={0.2}
            serviceId="premium"
          />

          <ServiceCard
            title="Family Bundle"
            icon={<ShoppingBag size={28} className="text-neatspin-600" />}
            price="₵49.99"
            description="Best value for families and larger households."
            features={[
              "Up to 20 lbs of laundry",
              "36-hour turnaround",
              "Free pickup & delivery",
              "Sorting by color & fabric",
              "Folding & packaging"
            ]}
            delay={0.3}
            serviceId="family"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-2xl p-8 shadow-md border border-gray-100"
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Additional Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-4 rounded-xl bg-gray-50 hover:bg-neatspin-50 transition-colors">
                <h4 className="font-medium text-gray-900 mb-2">Dry Cleaning</h4>
                <p className="text-gray-600 text-sm">From ₵8.99 per item</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 hover:bg-neatspin-50 transition-colors">
                <h4 className="font-medium text-gray-900 mb-2">Ironing Service</h4>
                <p className="text-gray-600 text-sm">From ₵3.99 per item</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 hover:bg-neatspin-50 transition-colors">
                <h4 className="font-medium text-gray-900 mb-2">Stain Removal</h4>
                <p className="text-gray-600 text-sm">From ₵5.99 per item</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 hover:bg-neatspin-50 transition-colors">
                <h4 className="font-medium text-gray-900 mb-2">Bedding & Linens</h4>
                <p className="text-gray-600 text-sm">From ₵14.99 per item</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
