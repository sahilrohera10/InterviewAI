import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mic, MicOff, Send, HelpCircle, Settings, Clock } from 'lucide-react';
import type { InterviewQuestion, InterviewResponse } from '../types';

const mockQuestions: InterviewQuestion[] = [
  {
    id: '1',
    question: 'Tell me about a challenging project you worked on and how you overcame obstacles.',
    type: 'behavioral',
    followUp: [
      'What was the biggest challenge you faced?',
      'How did you handle team conflicts during this project?',
    ],
  },
  {
    id: '2',
    question: 'Explain the concept of RESTful APIs and their key principles.',
    type: 'technical',
    followUp: [
      'How would you handle API versioning?',
      'What security measures would you implement?',
    ],
  },
];

const Interview: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [response, setResponse] = useState('');
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setResponse('');
    } else {
      navigate(`/analysis/${id}`);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-gray-400">Question {currentQuestionIndex + 1}/{mockQuestions.length}</span>
          <div className="flex items-center text-primary-400">
            <Clock size={16} className="mr-1" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-white transition-colors">
            <HelpCircle size={20} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
        {/* AI Interviewer */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-dark-200 rounded-xl p-6 border border-gray-800"
        >
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full flex items-center justify-center mr-4">
              <span className="text-white font-bold">AI</span>
            </div>
            <div>
              <h3 className="text-white font-bold">AI Interviewer</h3>
              <p className="text-sm text-gray-400">Senior Technical Interviewer</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-dark-300 p-4 rounded-lg">
              <p className="text-white">{mockQuestions[currentQuestionIndex].question}</p>
            </div>
            {mockQuestions[currentQuestionIndex].followUp?.map((question, index) => (
              <div key={index} className="bg-dark-300/50 p-4 rounded-lg">
                <p className="text-gray-400">{question}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Response Area */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-dark-200 rounded-xl p-6 border border-gray-800 flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-bold">Your Response</h3>
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`p-2 rounded-full transition-colors ${
                isRecording ? 'bg-red-500 text-white' : 'bg-dark-300 text-gray-400 hover:text-white'
              }`}
            >
              {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
          </div>

          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Type your response here..."
            className="flex-grow bg-dark-300 text-white p-4 rounded-lg border border-gray-700 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 resize-none mb-4"
          />

          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm text-gray-400 bg-dark-300 rounded-md hover:bg-dark-100">
                Request clarification
              </button>
              <button className="px-3 py-1 text-sm text-gray-400 bg-dark-300 rounded-md hover:bg-dark-100">
                Skip question
              </button>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!response.trim()}
              className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-2 rounded-md font-medium hover:from-primary-700 hover:to-secondary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Interview;