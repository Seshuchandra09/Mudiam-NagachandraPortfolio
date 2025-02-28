import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-white">Mudiam Nagachandra </h2>
            <p className="text-gray-400 mt-2">Senior Application/Production Support Engineer</p>
          </div>
          
          <div className="flex space-x-6 mb-6 md:mb-0">
            <a
              href="https://github.com/Seshuchandra09"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-150 ease-in-out"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/mudiam-nagachandra-5a5045251"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-150 ease-in-out"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:mudiam.naga99@gmail.com"
              className="text-gray-400 hover:text-white transition duration-150 ease-in-out"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            &copy; {currentYear} Mudiam Nagachandra. All rights reserved.
          </p>
          
          <nav className="flex space-x-6 mt-4 md:mt-0">
            <a href="#about" className="text-gray-400 hover:text-white transition duration-150 ease-in-out">
              About
            </a>
            <a href="#experience" className="text-gray-400 hover:text-white transition duration-150 ease-in-out">
              Experience
            </a>
            <a href="#projects" className="text-gray-400 hover:text-white transition duration-150 ease-in-out">
              Projects
            </a>
            <a href="#contact" className="text-gray-400 hover:text-white transition duration-150 ease-in-out">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;