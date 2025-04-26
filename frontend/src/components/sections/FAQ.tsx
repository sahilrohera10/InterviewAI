import React from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import FAQItem from '../ui/FAQItem';
import { faqItems } from '../../constants';

const FAQ: React.FC = () => {
  return (
    <Section id="faq" className="bg-dark-200">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked <span className="text-primary-400">Questions</span>
          </motion.h2>
          <motion.p 
            className="text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get answers to commonly asked questions about Intervue.AI.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <FAQItem
                question={item.question}
                answer={item.answer}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default FAQ;