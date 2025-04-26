import React from 'react';
import { motion } from 'framer-motion';

interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description }) => {
  return (
    <motion.div 
      className="relative bg-dark-200 p-6 rounded-xl border border-gray-800"
      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
    >
      <div className="absolute -top-5 -left-5 bg-gradient-to-br from-primary-500 to-secondary-600 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white">
        {number}
      </div>
      <h3 className="text-xl font-bold mb-2 text-white mt-4">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

export default StepCard;