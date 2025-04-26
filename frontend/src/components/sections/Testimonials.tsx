import React from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import TestimonialCard from '../ui/TestimonialCard';
import { testimonials } from '../../constants';

const Testimonials: React.FC = () => {
  return (
    <Section id="testimonials" className="bg-dark-300">
      <div className="text-center mb-16">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Success <span className="text-primary-400">Stories</span>
        </motion.h2>
        <motion.p 
          className="text-gray-400 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Hear from our users who have improved their interview skills and landed their dream jobs.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <TestimonialCard
              name={testimonial.name}
              role={testimonial.role}
              image={testimonial.image}
              quote={testimonial.quote}
            />
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Testimonials;