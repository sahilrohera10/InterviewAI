import React from 'react';
import { Outlet } from 'react-router-dom';
import { BrainCog, Menu, Bell, User } from 'lucide-react';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-300">
      <header className="bg-dark-200 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <BrainCog className="h-8 w-8 text-primary-500 mr-2" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-500">
                Intervue.AI
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Bell size={20} />
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <User size={20} />
              </button>
              <button className="md:hidden p-2 text-gray-400 hover:text-white transition-colors">
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;