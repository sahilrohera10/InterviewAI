import React from 'react';
import { ButtonProps } from '../../types';

const Button: React.FC<ButtonProps> = ({ 
  children, 
  primary = false, 
  className = '', 
  onClick 
}) => {
  const baseClasses = 'inline-flex items-center justify-center px-6 py-3 font-medium rounded-md text-sm transition-all duration-300 shadow-lg transform hover:-translate-y-1';
  
  const primaryClasses = 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:from-primary-700 hover:to-secondary-700';
  
  const secondaryClasses = 'bg-dark-200 text-white border border-gray-700 hover:bg-dark-100 hover:border-primary-500';
  
  const buttonClasses = `${baseClasses} ${primary ? primaryClasses : secondaryClasses} ${className}`;
  
  return (
    <button onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;