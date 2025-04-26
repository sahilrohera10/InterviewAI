import React from 'react';
import { SectionProps } from '../../types';
import { motion } from 'framer-motion';

const Section: React.FC<SectionProps> = ({ children, className = '', id }) => {
  return (
    <motion.section
      id={id}
      className={`py-16 md:py-24 w-full ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        {children}
      </div>
    </motion.section>
  );
};

export default Section;