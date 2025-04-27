import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, ArrowRight, BarChart2, Brain, MessageSquare, Loader2 } from 'lucide-react';
import type { InterviewAnalytics, AnalyticsResponse } from '../types/analytics';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

const Analysis: React.FC = () => {
  const navigate = useNavigate();
  const interviewId = window.location.pathname.split('/analysis/')[1];
  const [analytics, setAnalytics] = useState<InterviewAnalytics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await axios.post(`/api/v1/user/interview/analytics`,
          {
            interviewId: interviewId,
          }
        );
        const data: AnalyticsResponse = response.data;
        
        if (data.status === 'Success') {
          setAnalytics(data.data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setError('Failed to fetch analytics. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (interviewId) {
      fetchAnalytics();
    }
  }, [interviewId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
        <h2 className="text-2xl font-bold text-white">Analyzing Interview...</h2>
        <p className="text-gray-400">This may take a few moments</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <h2 className="text-2xl font-bold text-red-500">Error</h2>
        <p className="text-gray-400">{error}</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-2 rounded-md font-medium hover:from-primary-700 hover:to-secondary-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

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
              <h2 className="text-3xl font-bold text-white">{analytics.general_score}%</h2>
            </div>
          </div>
          <div className="h-2 bg-gray-700 rounded-full mt-2">
            <div
              className="h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
              style={{ width: `${analytics.general_score}%` }}
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
              <h2 className="text-3xl font-bold text-white">{analytics.technical_accuracy}%</h2>
            </div>
          </div>
          <div className="h-2 bg-gray-700 rounded-full mt-2">
            <div
              className="h-2 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full"
              style={{ width: `${analytics.technical_accuracy}%` }}
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
              <h2 className="text-3xl font-bold text-white">{analytics.communication}%</h2>
            </div>
          </div>
          <div className="h-2 bg-gray-700 rounded-full mt-2">
            <div
              className="h-2 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full"
              style={{ width: `${analytics.communication}%` }}
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
            {analytics.strengths.map((strength: string, index: number) => (
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
            {analytics.areas_to_improve.map((weakness: string, index: number) => (
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
        <h3 className="text-xl font-bold text-white mb-4">Overall Performance</h3>
        <p className="text-gray-300">{analytics.overall_performance}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-dark-200 p-6 rounded-xl border border-gray-800"
      >
        <h3 className="text-xl font-bold text-white mb-4">Closing Remarks</h3>
        <p className="text-gray-300">{analytics.closing_remark}</p>
      </motion.div>
    </div>
  );
};

export default Analysis;