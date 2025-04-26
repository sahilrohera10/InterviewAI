import React from 'react';
import { motion } from 'framer-motion';
import { DifferentiatorProps } from '../../types';

const Differentiator: React.FC<DifferentiatorProps> = ({ title, description }) => {
  return (
    <motion.div 
      className="p-4"
      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
    >
      <h3 className="text-xl font-bold mb-2 text-primary-400">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

export default Differentiator;