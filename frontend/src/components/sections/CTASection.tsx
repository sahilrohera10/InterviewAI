import React from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import Button from '../ui/Button';

const CTASection: React.FC = () => {
  return (
    <Section id="cta" className="bg-gradient-to-br from-dark-300 to-dark-200">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-primary-900/30 to-secondary-900/30 p-1 rounded-xl">
          <div className="bg-dark-300 rounded-xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Background decoration elements */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-primary-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-secondary-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-accent-500/10 rounded-full blur-3xl"></div>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to Ace Your Next Interview?
            </motion.h2>
            <motion.p 
              className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Start practicing with Intervue.AI today and significantly improve your chances of landing your dream job.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button primary className="px-8 py-4 text-base">Start Your Practice Now</Button>
              <Button className="px-8 py-4 text-base">View Demo</Button>
            </motion.div>
            
            <motion.p 
              className="text-gray-400 mt-6 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Free for Hackathon. No credit card required.
            </motion.p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CTASection;