import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, ArrowRight, BarChart2, Brain, MessageSquare } from 'lucide-react';
import type { InterviewSession } from '../types';

const mockSession: InterviewSession = {
  id: '123',
  date: new Date().toISOString(),
  duration: 30,
  role: 'Software Engineer',
  score: 85,
  questions: [
    {
      id: '1',
      question: 'Tell me about a challenging project you worked on.',
      type: 'behavioral',
    },
    {
      id: '2',
      question: 'Explain RESTful APIs and their principles.',
      type: 'technical',
    },
  ],
  responses: [
    {
      id: '1',
      questionId: '1',
      response: 'I led a team project to redesign our company\'s e-commerce platform...',
      analysis: {
        clarity: 90,
        relevance: 85,
        structure: 80,
      },
    },
    {
      id: '2',
      questionId: '2',
      response: 'RESTful APIs are based on REST architecture principles...',
      analysis: {
        clarity: 85,
        relevance: 90,
        structure: 85,
        technicalAccuracy: 88,
      },
    },
  ],
  strengths: [
    'Clear Communication',
    'Technical Knowledge',
    'Structured Responses',
  ],
  weaknesses: [
    'Time Management',
    'Conciseness',
  ],
  recommendations: [
    'Practice providing more concise answers while maintaining clarity',
    'Focus on improving system design knowledge',
    'Work on time management during responses',
  ],
};

const Analysis: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Interview Analysis</h1>
        <div className="flex space-x-4">
          <button className="bg-dark-200 text-white px-4 py-2 rounded-md font-medium hover:bg-dark-100 transition-colors">
            <Download size={20} className="inline-block mr-2" />
            Download Report
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-2 rounded-md font-medium hover:from-primary-700 hover:to-secondary-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-dark-200 p-6 rounded-xl border border-gray-800"
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mr-4">
              <BarChart2 className="text-primary-500" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Overall Score</p>
              <h2 className="text-3xl font-bold text-white">{mockSession.score}%</h2>
            </div>
          </div>
          <div className="h-2 bg-gray-700 rounded-full mt-2">
            <div
              className="h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
              style={{ width: `${mockSession.score}%` }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-dark-200 p-6 rounded-xl border border-gray-800"
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-secondary-500/20 rounded-lg flex items-center justify-center mr-4">
              <Brain className="text-secondary-500" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Technical Accuracy</p>
              <h2 className="text-3xl font-bold text-white">88%</h2>
            </div>
          </div>
          <div className="h-2 bg-gray-700 rounded-full mt-2">
            <div
              className="h-2 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full"
              style={{ width: '88%' }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-dark-200 p-6 rounded-xl border border-gray-800"
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-accent-500/20 rounded-lg flex items-center justify-center mr-4">
              <MessageSquare className="text-accent-500" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Communication</p>
              <h2 className="text-3xl font-bold text-white">85%</h2>
            </div>
          </div>
          <div className="h-2 bg-gray-700 rounded-full mt-2">
            <div
              className="h-2 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full"
              style={{ width: '85%' }}
            />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-dark-200 p-6 rounded-xl border border-gray-800"
        >
          <h3 className="text-xl font-bold text-white mb-4">Strengths</h3>
          <div className="space-y-2">
            {mockSession.strengths.map((strength, index) => (
              <div
                key={index}
                className="bg-primary-500/10 text-primary-400 px-4 py-2 rounded-lg flex items-center"
              >
                <ArrowRight size={16} className="mr-2" />
                {strength}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-dark-200 p-6 rounded-xl border border-gray-800"
        >
          <h3 className="text-xl font-bold text-white mb-4">Areas to Improve</h3>
          <div className="space-y-2">
            {mockSession.weaknesses.map((weakness, index) => (
              <div
                key={index}
                className="bg-red-500/10 text-red-400 px-4 py-2 rounded-lg flex items-center"
              >
                <ArrowRight size={16} className="mr-2" />
                {weakness}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-dark-200 p-6 rounded-xl border border-gray-800"
      >
        <h3 className="text-xl font-bold text-white mb-4">Recommendations</h3>
        <div className="space-y-4">
          {mockSession.recommendations.map((recommendation, index) => (
            <div
              key={index}
              className="bg-dark-300 p-4 rounded-lg text-gray-300"
            >
              {recommendation}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-dark-200 p-6 rounded-xl border border-gray-800"
      >
        <h3 className="text-xl font-bold text-white mb-4">Detailed Response Analysis</h3>
        <div className="space-y-6">
          {mockSession.responses.map((response, index) => (
            <div key={index} className="space-y-4">
              <div className="bg-dark-300 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">
                  Question {index + 1}: {mockSession.questions[index].question}
                </h4>
                <p className="text-gray-400">{response.response}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(response.analysis).map(([key, value]) => (
                  <div key={key} className="bg-dark-300 p-3 rounded-lg">
                    <p className="text-sm text-gray-400 capitalize">{key}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex-grow h-2 bg-gray-700 rounded-full mr-2">
                        <div
                          className="h-2 bg-primary-500 rounded-full"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                      <span className="text-white font-medium">{value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Analysis;