import React from 'react';
import { BrainCog, Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-300 text-gray-400 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <BrainCog className="h-8 w-8 text-primary-500 mr-2" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-500">
                Intervue.AI
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              AI-powered real interview simulator to practice, analyze, and ace your dream job. Master interviews before facing them.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary-400 transition-colors duration-200">Home</a></li>
              <li><a href="#features" className="hover:text-primary-400 transition-colors duration-200">Features</a></li>
              <li><a href="#demo" className="hover:text-primary-400 transition-colors duration-200">Demo</a></li>
              <li><a href="#pricing" className="hover:text-primary-400 transition-colors duration-200">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary-400 transition-colors duration-200">About</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors duration-200">Contact</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors duration-200">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Intervue.AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;