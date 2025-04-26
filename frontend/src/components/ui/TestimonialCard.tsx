import React from 'react';
import { motion } from 'framer-motion';
import { TestimonialProps } from '../../types';

const TestimonialCard: React.FC<TestimonialProps> = ({ name, role, image, quote }) => {
  return (
    <motion.div 
      className="bg-dark-200 p-6 rounded-xl border border-gray-800 flex flex-col h-full"
      whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
    >
      <div className="flex items-start mb-4">
        <div className="mr-4">
          <img 
            src={image} 
            alt={name} 
            className="w-16 h-16 rounded-full object-cover border-2 border-primary-500" 
          />
        </div>
        <div>
          <h4 className="text-lg font-bold text-white">{name}</h4>
          <p className="text-sm text-gray-400">{role}</p>
        </div>
      </div>
      <p className="text-gray-300 italic flex-grow">"{quote}"</p>
      <div className="flex mt-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg 
            key={star} 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-yellow-500" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    </motion.div>
  );
};

export default TestimonialCard;