import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Select from '@radix-ui/react-select';
import * as Slider from '@radix-ui/react-slider';
import { ChevronDown, Check, Crown } from 'lucide-react';
import type { InterviewSetup } from '../types';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';


const domains = {
  'Technology': {
    roles: [
      'Software Engineer',
      'Frontend Developer',
      'Backend Developer',
      'Full Stack Developer',
      'DevOps Engineer',
      'Data Scientist',
      'Machine Learning Engineer',
      'Cloud Architect',
    ],
    techStacks: [
      { id: 'react', name: 'React', category: 'Frontend' },
      { id: 'vue', name: 'Vue.js', category: 'Frontend' },
      { id: 'angular', name: 'Angular', category: 'Frontend' },
      { id: 'node', name: 'Node.js', category: 'Backend' },
      { id: 'python', name: 'Python', category: 'Backend' },
      { id: 'java', name: 'Java', category: 'Backend' },
      { id: 'aws', name: 'AWS', category: 'DevOps' },
      { id: 'docker', name: 'Docker', category: 'DevOps' },
      { id: 'kubernetes', name: 'Kubernetes', category: 'DevOps' },
      { id: 'tensorflow', name: 'TensorFlow', category: 'ML' },
      { id: 'pytorch', name: 'PyTorch', category: 'ML' },
    ]
  },
  'Business': {
    roles: [
      'Product Manager',
      'Business Analyst',
      'Project Manager',
      'Marketing Manager',
      'Sales Manager',
      'Operations Manager',
    ],
    techStacks: [
      { id: 'jira', name: 'Jira', category: 'Project Management' },
      { id: 'trello', name: 'Trello', category: 'Project Management' },
      { id: 'salesforce', name: 'Salesforce', category: 'CRM' },
      { id: 'hubspot', name: 'HubSpot', category: 'Marketing' },
      { id: 'google_analytics', name: 'Google Analytics', category: 'Analytics' },
      { id: 'power_bi', name: 'Power BI', category: 'Analytics' },
    ]
  },
  'Design': {
    roles: [
      'UX Designer',
      'UI Designer',
      'Product Designer',
      'Graphic Designer',
      'Motion Designer',
    ],
    techStacks: [
      { id: 'figma', name: 'Figma', category: 'Design' },
      { id: 'sketch', name: 'Sketch', category: 'Design' },
      { id: 'adobe_xd', name: 'Adobe XD', category: 'Design' },
      { id: 'photoshop', name: 'Photoshop', category: 'Design' },
      { id: 'illustrator', name: 'Illustrator', category: 'Design' },
      { id: 'after_effects', name: 'After Effects', category: 'Motion' },
    ]
  }
};

const durations = [5, 10, 15];

const RoleSetup: React.FC = () => {
  const navigate = useNavigate();
  const [setup, setSetup] = useState<InterviewSetup>({
    domain: '',
    role: '',
    experience: 0,
    techStack: [],
    duration: 0,
    jobDescription: '',
  });

  // Get available roles based on selected domain
  const getAvailableRoles = () => {
    return setup.domain ? domains[setup.domain as keyof typeof domains].roles : [];
  };

  // Get available tech stacks based on selected role
  const getAvailableTechStacks = () => {
    if (!setup.domain || !setup.role) return [];
    return domains[setup.domain as keyof typeof domains].techStacks;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create array of missing fields
    const missingFields = [];
    
    if (!setup.domain) {
      missingFields.push('Domain');
    }
    
    if (!setup.role) {
      missingFields.push('Role');
    }
    
    if (setup.techStack.length === 0) {
      missingFields.push('Tech Stack');
    }
    
    if (!setup.duration) {
      missingFields.push('Interview Duration');
    }

    // If any fields are missing, show consolidated error message
    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields:\n${missingFields.join('\n')}`);
      return;
    }

    // If all fields are filled, proceed with form submission
        console.log(setup);

    // hit an endpoint to server to create an interview session
    const response = await axios.post('/api/v1/user/initiate-interview', setup);

    const data = response.data;
    console.log(data);
    const interviewId = data.interviewId;
    if(interviewId){
      navigate(`/interview/${interviewId}`);
    }else{
      alert("Error in initiating interview");
    }
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
          {/* Domain Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Choose Your Domain
            </label>
            <Select.Root
              value={setup.domain}
              onValueChange={(value) => setSetup({ ...setup, domain: value, role: '', techStack: [] })}
            >
              <Select.Trigger
                className="w-full flex items-center justify-between bg-dark-300 px-4 py-2 rounded-md border border-gray-700 text-white hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <Select.Value placeholder="Select a domain" />
                <Select.Icon>
                  <ChevronDown size={20} />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content
                  className="bg-dark-200 rounded-md border border-gray-700 shadow-xl"
                >
                  <Select.Viewport>
                    {Object.keys(domains).map((domain) => (
                      <Select.Item
                        key={domain}
                        value={domain}
                        className="flex items-center px-4 py-2 text-white hover:bg-dark-300 focus:bg-dark-300 focus:outline-none cursor-pointer"
                      >
                        <Select.ItemText>{domain}</Select.ItemText>
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

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Choose Your Role
            </label>
            <Select.Root
              value={setup.role}
              onValueChange={(value) => setSetup({ ...setup, role: value, techStack: [] })}
              disabled={!setup.domain}
            >
              <Select.Trigger
                className="w-full flex items-center justify-between bg-dark-300 px-4 py-2 rounded-md border border-gray-700 text-white hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    {getAvailableRoles().map((role) => (
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
              {getAvailableTechStacks().map((tech) => (
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

          {/* Job Description - Premium Feature */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-sm font-medium text-gray-400">
                Job Description (Premium)
              </label>
              <div className="flex items-center gap-1 text-yellow-500">
                <Crown size={16} />
                <span className="text-xs">Premium</span>
              </div>
            </div>
            <textarea
              value={setup.jobDescription}
              onChange={(e) => setSetup({ ...setup, jobDescription: e.target.value })}
              placeholder="Paste the job description you're targeting (optional)"
              className="w-full bg-dark-300 text-white p-4 rounded-md border border-gray-700 focus:border-primary-500 focus:ring-primary-500 focus:ring-1 resize-none h-32"
            />
            <p className="mt-1 text-xs text-gray-500">
              Adding a job description helps us tailor the interview questions to match your target role.
            </p>
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