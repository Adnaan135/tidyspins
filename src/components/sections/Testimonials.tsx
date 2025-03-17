
import TestimonialCard from '../ui/TestimonialCard';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "NeatSpin has completely transformed my laundry routine. The quality of cleaning is impeccable and the convenience of doorstep pickup and delivery is unmatched.",
      author: "Sarah Johnson",
      role: "Busy Professional",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      rating: 5
    },
    {
      quote: "As a parent with three kids, laundry used to take up so much of my time. NeatSpin gives me that time back, and the results are better than I could do myself!",
      author: "Michael Chen",
      role: "Parent of Three",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      rating: 5
    },
    {
      quote: "I was skeptical at first, but after trying NeatSpin, I'm a convert. My clothes come back perfectly clean, neatly folded, and they even got out stains I thought were permanent!",
      author: "Emily Rodriguez",
      role: "Graduate Student",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      rating: 4
    },
    {
      quote: "The service is reliable, the staff is professional, and the attention to detail is impressive. NeatSpin has made laundry day something I no longer dread.",
      author: "David Wilson",
      role: "Small Business Owner",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      rating: 5
    },
    {
      quote: "I travel frequently for work and coming home to freshly cleaned clothes is such a luxury. NeatSpin's subscription service is perfect for my lifestyle.",
      author: "Olivia Taylor",
      role: "Sales Executive",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      rating: 5
    },
    {
      quote: "The eco-friendly options are what initially drew me to NeatSpin, but the quality of service is why I stayed. Highly recommend to anyone who values sustainability!",
      author: "James Scott",
      role: "Environmental Consultant",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      rating: 4
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-medium text-neatspin-600 uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-gray-900">What Our Customers Say</h2>
          <p className="text-lg text-gray-600">
            Don't just take our word for it. Here's what our satisfied customers have to say about our laundry services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              avatar={testimonial.avatar}
              rating={testimonial.rating}
              delay={0.1 * index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-700 mb-4">Overall customer satisfaction</p>
          <div className="flex items-center justify-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-3 text-2xl font-bold text-gray-900">4.9/5</span>
          </div>
          <p className="text-gray-600">Based on 500+ reviews</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
