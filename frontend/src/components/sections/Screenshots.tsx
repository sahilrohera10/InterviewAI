import React from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import useAnimatedCounter from '../../hooks/useAnimatedCounter';

const Screenshots: React.FC = () => {
  const { count: usersCount, ref: usersRef } = useAnimatedCounter({ end: 5000 });
  const { count: interviewsCount, ref: interviewsRef } = useAnimatedCounter({ end: 25000 });
  const { count: questionsCount, ref: questionsRef } = useAnimatedCounter({ end: 120000 });

  return (
    <Section id="demo" className="bg-dark-300">
      <div className="text-center mb-16">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          See <span className="text-primary-400">Intervue.AI</span> in Action
        </motion.h2>
        <motion.p 
          className="text-gray-400 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Explore our intuitive interface and powerful features designed to help you ace your next interview.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-dark-200 rounded-xl overflow-hidden border border-gray-800 shadow-xl"
        >
          <div className="bg-dark-100 p-2 border-b border-gray-800">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-gray-400 text-sm">Interview Session</span>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-12 gap-4 h-[350px]">
              <div className="col-span-5 bg-dark-300 rounded-lg p-4 flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary-900 rounded-full flex items-center justify-center mr-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">AI Interviewer</h4>
                    <p className="text-xs text-gray-500">Senior Engineering Manager</p>
                  </div>
                </div>
                
                <div className="bg-dark-200 rounded-lg p-3 mb-3">
                  <p className="text-white text-sm">Tell me about a time when you had to deal with a difficult team member. How did you handle the situation?</p>
                </div>
                
                <div className="bg-dark-200 rounded-lg p-3 mb-3">
                  <p className="text-white text-sm">That's interesting. How did you ensure the project stayed on track despite these challenges?</p>
                </div>
                
                <div className="mt-auto">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Question 3/10</span>
                    <span>13:25 remaining</span>
                  </div>
                  <div className="w-full bg-gray-800 h-2 rounded-full mt-1">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="col-span-7 bg-dark-300 rounded-lg p-4 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-white font-medium">Your Response</h4>
                  <div className="flex">
                    <button className="bg-dark-100 p-1 rounded-md mr-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 5V3" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 21V19" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5 12H3" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 12H19" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button className="bg-dark-100 p-1 rounded-md">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 1C8.13401 1 5 4.13401 5 8C5 12.7681 11.1 20.5 11.3273 20.7809C11.4782 20.9610 11.7218 20.9610 11.8727 20.7809C12.1 20.5 18 12.7681 18 8C18 4.13401 14.866 1 11 1H12Z" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="bg-dark-200 rounded-lg p-3 mb-4 flex-grow">
                  <p className="text-gray-300 text-sm">I once had a team member who was consistently missing deadlines and creating tension within the team. Instead of immediately escalating, I arranged a private meeting to understand their perspective...</p>
                </div>
                
                <div className="mt-auto">
                  <div className="flex space-x-2 mb-3">
                    <button className="bg-dark-100 py-1 px-3 rounded-md text-xs text-gray-400">Request clarification</button>
                    <button className="bg-dark-100 py-1 px-3 rounded-md text-xs text-gray-400">Skip question</button>
                    <button className="bg-dark-100 py-1 px-3 rounded-md text-xs text-gray-400">Take a note</button>
                  </div>
                  
                  <div className="flex">
                    <button className="bg-dark-100 p-2 rounded-l-md border-r border-gray-700">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 11C19 14.866 15.866 18 12 18M12 18C8.13401 18 5 14.866 5 11M12 18V22M12 22H8M12 22H16M12 2V4M4.22 6.22L5.64 7.64M19.78 6.22L18.36 7.64M3 11H1M23 11H21M8 2H16" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <input 
                      type="text" 
                      className="flex-grow bg-dark-100 p-2 text-white border-none focus:ring-0 outline-none"
                      placeholder="Type your response or press to speak..."
                    />
                    <button className="bg-gradient-to-r from-primary-600 to-secondary-600 p-2 rounded-r-md">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-dark-200 rounded-xl overflow-hidden border border-gray-800 shadow-xl"
        >
          <div className="bg-dark-100 p-2 border-b border-gray-800">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-gray-400 text-sm">Performance Analysis</span>
            </div>
          </div>
          <div className="p-4">
            <div className="h-[350px] flex flex-col">
              <div className="border-b border-gray-800 pb-4 mb-4">
                <h3 className="text-lg font-bold text-white mb-2">Interview Performance</h3>
                <div className="flex items-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-dark-300 border-4 border-primary-500 flex items-center justify-center mr-4">
                    <span className="text-white text-2xl font-bold">83%</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Excellent Progress!</h4>
                    <p className="text-sm text-gray-400">You're in the top 15% of candidates</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-dark-300 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Communication</p>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-700 h-2 rounded-full mr-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="text-white text-xs">85%</span>
                    </div>
                  </div>
                  <div className="bg-dark-300 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Technical</p>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-700 h-2 rounded-full mr-2">
                        <div className="bg-primary-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                      <span className="text-white text-xs">78%</span>
                    </div>
                  </div>
                  <div className="bg-dark-300 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Problem Solving</p>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-700 h-2 rounded-full mr-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <span className="text-white text-xs">65%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-grow">
                <h3 className="text-lg font-bold text-white mb-3">Strengths & Weaknesses</h3>
                
                <div className="mb-4">
                  <h4 className="text-primary-400 font-medium mb-2">Strengths</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-primary-900/30 text-primary-400 text-xs py-1 px-2 rounded-full">Clear Communication</span>
                    <span className="bg-primary-900/30 text-primary-400 text-xs py-1 px-2 rounded-full">Structured Responses</span>
                    <span className="bg-primary-900/30 text-primary-400 text-xs py-1 px-2 rounded-full">Technical Knowledge</span>
                    <span className="bg-primary-900/30 text-primary-400 text-xs py-1 px-2 rounded-full">Positive Attitude</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-red-400 font-medium mb-2">Areas to Improve</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-red-900/30 text-red-400 text-xs py-1 px-2 rounded-full">Conciseness</span>
                    <span className="bg-red-900/30 text-red-400 text-xs py-1 px-2 rounded-full">System Design Knowledge</span>
                    <span className="bg-red-900/30 text-red-400 text-xs py-1 px-2 rounded-full">Time Management</span>
                  </div>
                </div>
                
                <div className="mt-auto flex">
                  <button className="bg-dark-300 hover:bg-dark-100 text-white py-2 px-4 rounded-md transition-colors duration-200 mr-3">
                    View Detailed Report
                  </button>
                  <button className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white py-2 px-4 rounded-md transition-colors duration-200">
                    Practice Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="bg-dark-200 rounded-xl p-8 border border-gray-800">
        <h3 className="text-2xl font-bold text-white text-center mb-8">Our Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center" ref={usersRef}>
            <div className="text-4xl font-bold text-primary-400 mb-2">{usersCount}+</div>
            <p className="text-gray-400">Active Users</p>
          </div>
          <div className="text-center" ref={interviewsRef}>
            <div className="text-4xl font-bold text-secondary-400 mb-2">{interviewsCount}+</div>
            <p className="text-gray-400">Interviews Conducted</p>
          </div>
          <div className="text-center" ref={questionsRef}>
            <div className="text-4xl font-bold text-accent-400 mb-2">{questionsCount}+</div>
            <p className="text-gray-400">Questions Answered</p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Screenshots;