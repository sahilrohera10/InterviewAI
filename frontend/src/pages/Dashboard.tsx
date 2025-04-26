import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Play, Clock, Target, TrendingUp } from 'lucide-react';
import type { DashboardStats } from '../types';

const mockData = {
  stats: {
    totalInterviews: 12,
    averageScore: 82,
    improvement: 15,
    topStrengths: ['Communication', 'Problem Solving', 'Technical Knowledge'],
    areasToImprove: ['System Design', 'Time Management'],
  } as DashboardStats,
  recentScores: [
    { date: '2024-03-01', score: 65 },
    { date: '2024-03-05', score: 72 },
    { date: '2024-03-10', score: 78 },
    { date: '2024-03-15', score: 85 },
    { date: '2024-03-20', score: 82 },
  ],
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <button
          onClick={() => navigate('/setup')}
          className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-2 rounded-md font-medium hover:from-primary-700 hover:to-secondary-700 transition-colors"
        >
          Start New Interview
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-dark-200 p-6 rounded-xl border border-gray-800"
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center mr-3">
              <Play className="text-primary-500" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Interviews</p>
              <h3 className="text-2xl font-bold text-white">{mockData.stats.totalInterviews}</h3>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-dark-200 p-6 rounded-xl border border-gray-800"
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-secondary-500/20 rounded-lg flex items-center justify-center mr-3">
              <Target className="text-secondary-500" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Average Score</p>
              <h3 className="text-2xl font-bold text-white">{mockData.stats.averageScore}%</h3>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-dark-200 p-6 rounded-xl border border-gray-800"
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-accent-500/20 rounded-lg flex items-center justify-center mr-3">
              <TrendingUp className="text-accent-500" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Improvement</p>
              <h3 className="text-2xl font-bold text-white">+{mockData.stats.improvement}%</h3>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-dark-200 p-6 rounded-xl border border-gray-800"
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center mr-3">
              <Clock className="text-primary-500" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Practice Time</p>
              <h3 className="text-2xl font-bold text-white">6h 30m</h3>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Progress Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-dark-200 p-6 rounded-xl border border-gray-800"
      >
        <h2 className="text-xl font-bold text-white mb-6">Progress Over Time</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData.recentScores}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem',
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: '#3B82F6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Strengths and Areas to Improve */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-dark-200 p-6 rounded-xl border border-gray-800"
        >
          <h2 className="text-xl font-bold text-white mb-4">Top Strengths</h2>
          <div className="space-y-2">
            {mockData.stats.topStrengths.map((strength, index) => (
              <div
                key={index}
                className="bg-primary-500/10 text-primary-400 px-4 py-2 rounded-lg"
              >
                {strength}
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
          <h2 className="text-xl font-bold text-white mb-4">Areas to Improve</h2>
          <div className="space-y-2">
            {mockData.stats.areasToImprove.map((area, index) => (
              <div
                key={index}
                className="bg-red-500/10 text-red-400 px-4 py-2 rounded-lg"
              >
                {area}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;