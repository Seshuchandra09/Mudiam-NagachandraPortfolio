import React from 'react';
import { Github, Linkedin, Mail, Download } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between">
          <div className="w-full max-w-3xl mb-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Hi, I'm <span className="text-indigo-600">Mudiam Nagachandra</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-gray-700 mb-6">
              Senior Application/Production Support Engineer
            </h2>
            <p className="text-lg text-gray-600 mb-8 mx-auto">
              As Senior Application/Production Support Engineer is responsible for ensuring that business applications run smoothly and efficiently. I troubleshoot technical issues, monitor system performance, and provide support to users. My role includes investigating and resolving incidents, maintaining system stability, and working with development teams to improve applications. I also help implement updates, automate processes, and ensure minimal downtime. My role requires strong problem-solving skills, technical expertise, and the ability to work under pressure to keep critical applications running seamlessly.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#contact"
                className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out flex items-center"
              >
                Contact Me
              </a>
              <a
                href="https://drive.google.com/uc?export=download&id=1dmGby_RjrsUmeQeXXm4Ed1hJeNn4yw3D"
                target="_blank"
                rel="noopener noreferrer"
                download="Mudiam_Nagachandra_Resume.pdf"
                className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-md hover:bg-indigo-50 transition duration-150 ease-in-out flex items-center"
              >
                <Download size={18} className="mr-2" />
                Resume
              </a>
            </div>
            
            <div className="flex mt-8 space-x-4 justify-center">
              <a
                href="https://github.com/Seshuchandra09"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-indigo-600 transition duration-150 ease-in-out"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/mudiam-nagachandra-5a5045251"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-indigo-600 transition duration-150 ease-in-out"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:mudiam.naga99@gmail.com"
                className="text-gray-700 hover:text-indigo-600 transition duration-150 ease-in-out"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;