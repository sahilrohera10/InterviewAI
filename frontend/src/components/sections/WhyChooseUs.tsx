import React from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import Differentiator from '../ui/Differentiator';
import { differentiators } from '../../constants';

const WhyChooseUs: React.FC = () => {
  return (
    <Section id="why-choose-us" className="bg-dark-200">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <motion.div 
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose <span className="text-primary-400">Intervue.AI</span>
          </h2>
          <p className="text-gray-400 mb-8">
            Unlike generic AI assistants, Intervue.AI is specifically designed for interview preparation with features that make your practice sessions more effective and realistic.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {differentiators.map((diff, index) => (
              <Differentiator 
                key={index}
                title={diff.title}
                description={diff.description}
              />
            ))}
          </div>
          
          <div className="mt-8">
            <button className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-medium py-3 px-6 rounded-md transition-all duration-300 shadow-lg transform hover:-translate-y-1">
              Start Your Free Trial
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <div className="bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-xl p-1">
              <div className="bg-dark-300 rounded-xl p-6 border border-gray-800">
                <div className="flex items-center mb-6">
                  <div className="mr-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full text-white text-xl font-bold">
                      AI
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Generic AI Assistant</h3>
                    <p className="text-sm text-gray-400">Basic Q&A format</p>
                  </div>
                </div>
                
                <div className="border-l-4 border-gray-700 pl-4 mb-6">
                  <p className="text-gray-400 italic">
                    "I can provide interview questions and general advice on how to answer them."
                  </p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    <span className="text-gray-400">No structured interview flow</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    <span className="text-gray-400">Limited voice interaction</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    <span className="text-gray-400">No performance analytics</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    <span className="text-gray-400">Generic advice not tailored to your skills</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="absolute -top-6 right-4 transform rotate-[-8deg] w-24 h-8 bg-red-500 flex items-center justify-center text-white font-bold text-sm rounded-md">
              BASIC
            </div>
            
            <div className="relative mt-8">
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl p-1">
                <div className="bg-dark-300 rounded-xl p-6 border border-gray-800">
                  <div className="flex items-center mb-6">
                    <div className="mr-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full text-white text-xl font-bold">
                        IV
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-bold">Intervue.AI</h3>
                      <p className="text-sm text-primary-400">Interview Simulation Platform</p>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-primary-500 pl-4 mb-6">
                    <p className="text-white italic">
                      "I simulate real interview scenarios with adaptive questions, real-time feedback, and comprehensive performance analysis."
                    </p>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-white">Role-specific interview simulation</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-white">Voice recognition and interaction</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-white">Detailed performance analytics</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-white">Personalized improvement suggestions</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="absolute -top-6 right-4 transform rotate-[-8deg] w-24 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 flex items-center justify-center text-white font-bold text-sm rounded-md">
                PREMIUM
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default WhyChooseUs;