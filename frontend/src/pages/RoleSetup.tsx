import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Select from '@radix-ui/react-select';
import * as Slider from '@radix-ui/react-slider';
import { ChevronDown, Check } from 'lucide-react';
import type { InterviewSetup, TechStack } from '../types';

const roles = [
  'Software Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Data Scientist',
  'Product Manager',
  'UX Designer',
];

const techStacks: TechStack[] = [
  { id: 'react', name: 'React', category: 'Frontend' },
  { id: 'vue', name: 'Vue.js', category: 'Frontend' },
  { id: 'angular', name: 'Angular', category: 'Frontend' },
  { id: 'node', name: 'Node.js', category: 'Backend' },
  { id: 'python', name: 'Python', category: 'Backend' },
  { id: 'java', name: 'Java', category: 'Backend' },
  { id: 'aws', name: 'AWS', category: 'DevOps' },
  { id: 'docker', name: 'Docker', category: 'DevOps' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'DevOps' },
];

const durations = [15, 30, 60];

const RoleSetup: React.FC = () => {
  const navigate = useNavigate();
  const [setup, setSetup] = useState<InterviewSetup>({
    role: '',
    experience: 0,
    techStack: [],
    duration: 30,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would create an interview session here
    navigate('/interview/123');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-dark-200 rounded-xl p-8 border border-gray-800"
      >
        <h1 className="text-3xl font-bold text-white mb-8">Setup Your Interview</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Choose Your Role
            </label>
            <Select.Root
              value={setup.role}
              onValueChange={(value) => setSetup({ ...setup, role: value })}
            >
              <Select.Trigger
                className="w-full flex items-center justify-between bg-dark-300 px-4 py-2 rounded-md border border-gray-700 text-white hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <Select.Value placeholder="Select a role" />
                <Select.Icon>
                  <ChevronDown size={20} />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content
                  className="bg-dark-200 rounded-md border border-gray-700 shadow-xl"
                >
                  <Select.Viewport>
                    {roles.map((role) => (
                      <Select.Item
                        key={role}
                        value={role}
                        className="flex items-center px-4 py-2 text-white hover:bg-dark-300 focus:bg-dark-300 focus:outline-none cursor-pointer"
                      >
                        <Select.ItemText>{role}</Select.ItemText>
                        <Select.ItemIndicator className="ml-auto">
                          <Check size={16} />
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Years of Experience: {setup.experience}
            </label>
            <Slider.Root
              className="relative flex items-center w-full h-5"
              value={[setup.experience]}
              max={10}
              step={1}
              onValueChange={([value]) => setSetup({ ...setup, experience: value })}
            >
              <Slider.Track className="bg-gray-700 relative grow h-2 rounded-full">
                <Slider.Range className="absolute bg-primary-500 h-full rounded-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </Slider.Root>
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Select Tech Stack
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {techStacks.map((tech) => (
                <button
                  key={tech.id}
                  type="button"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    setup.techStack.includes(tech.id)
                      ? 'bg-primary-500 text-white'
                      : 'bg-dark-300 text-gray-400 hover:bg-dark-100'
                  }`}
                  onClick={() => {
                    const newStack = setup.techStack.includes(tech.id)
                      ? setup.techStack.filter((id) => id !== tech.id)
                      : [...setup.techStack, tech.id];
                    setSetup({ ...setup, techStack: newStack });
                  }}
                >
                  {tech.name}
                </button>
              ))}
            </div>
          </div>

          {/* Interview Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Interview Duration
            </label>
            <div className="grid grid-cols-3 gap-4">
              {durations.map((duration) => (
                <button
                  key={duration}
                  type="button"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    setup.duration === duration
                      ? 'bg-primary-500 text-white'
                      : 'bg-dark-300 text-gray-400 hover:bg-dark-100'
                  }`}
                  onClick={() => setSetup({ ...setup, duration })}
                >
                  {duration} minutes
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 px-6 rounded-md font-medium hover:from-primary-700 hover:to-secondary-700 transition-colors"
          >
            Start Interview
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default RoleSetup;