import React from 'react';
import { motion } from 'framer-motion';
import { FeatureProps } from '../../types';

const FeatureCard: React.FC<FeatureProps> = ({ icon: Icon, title, description }) => {
  return (
    <motion.div 
      className="bg-dark-200 p-6 rounded-xl border border-gray-800 hover:border-primary-500 transition-all duration-300"
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <div className="bg-gradient-to-br from-primary-600 to-secondary-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
        <Icon className="text-white" size={24} />
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;