import React from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import { useInView } from 'react-intersection-observer';
import { HelpCircle, AlertCircle, AlertTriangle } from 'lucide-react';

const ProblemStatement: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const problems = [
    {
      icon: HelpCircle,
      title: 'Tired of unstructured interview prep?',
      description: 'Random practice questions don\'t prepare you for the flow of a real interview.',
    },
    {
      icon: AlertCircle,
      title: 'Facing real interviews without knowing your weak points?',
      description: 'Without proper feedback, you repeat the same mistakes interview after interview.',
    },
    {
      icon: AlertTriangle,
      title: 'Struggling to get real-time feedback?',
      description: 'Friends and mock interviews can\'t provide the detailed analysis you need to improve.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <Section id="problem" className="bg-dark-200">
      <div className="text-center mb-16">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The Interview <span className="text-primary-400">Problem</span>
        </motion.h2>
        <motion.p 
          className="text-gray-400 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Most candidates face common challenges when preparing for interviews. Intervue.AI was built to solve these problems.
        </motion.p>
      </div>

      <motion.div 
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {problems.map((problem, index) => (
          <motion.div 
            key={index}
            className="bg-dark-300 p-6 rounded-xl border border-gray-800 hover:border-primary-500 transition-all duration-300"
            variants={itemVariants}
          >
            <div className="bg-gradient-to-br from-primary-600 to-secondary-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <problem.icon className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">{problem.title}</h3>
            <p className="text-gray-400">{problem.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

export default ProblemStatement;