import React from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import StepCard from '../ui/StepCard';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: 'Select Role & Parameters',
      description: 'Choose your target role, experience level, tech stack, and interview duration.',
    },
    {
      number: 2,
      title: 'Face AI Interviewer',
      description: 'Engage with our realistic AI interviewer through voice and text interactions.',
    },
    {
      number: 3,
      title: 'Get Detailed Analysis',
      description: 'Receive comprehensive feedback, scores, and improvement suggestions.',
    },
  ];

  return (
    <Section id="how-it-works" className="bg-dark-300">
      <div className="text-center mb-16">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          How <span className="text-primary-400">It Works</span>
        </motion.h2>
        <motion.p 
          className="text-gray-400 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Our streamlined process makes interview preparation simple, effective, and tailored to your needs.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 relative">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <StepCard
              number={step.number}
              title={step.title}
              description={step.description}
            />
          </motion.div>
        ))}
        
        {/* Connecting line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-primary-500 to-secondary-600 hidden md:block" style={{ transform: 'translateY(-50%)' }}></div>
      </div>

      <motion.div
        className="mt-16 bg-dark-200 rounded-xl p-8 border border-gray-800"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row items-center">
          <div className="mb-6 md:mb-0 md:mr-8 md:w-1/2">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to start practicing?</h3>
            <p className="text-gray-400 mb-6">
              Our AI-powered platform is designed to give you the most realistic interview experience possible. Start practicing today and be prepared for any interview scenario.
            </p>
            <button className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-medium py-3 px-6 rounded-md transition-all duration-300 shadow-lg transform hover:-translate-y-1">
              Try It Now
            </button>
          </div>
          <div className="md:w-1/2">
            <div className="bg-dark-300 p-4 rounded-lg border border-gray-800">
              <div className="flex items-center mb-4">
                <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <div className="text-gray-400 text-sm flex-grow text-center">interview-simulation.tsx</div>
              </div>
              <pre className="text-sm text-gray-300 font-mono overflow-x-auto p-2">
                <code>
{`function InterviewSimulation() {
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState(0);
  const [stack, setStack] = useState([]);
  const [duration, setDuration] = useState(30);
  
  // Start interview process
  const startInterview = async () => {
    const session = await AI.createSession({
      role, experience, stack, duration
    });
    setInterviewId(session.id);
  };

  return (
    <InterviewContainer>
      <AIInterviewer />
      <UserResponsePanel />
    </InterviewContainer>
  );
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

export default HowItWorks;