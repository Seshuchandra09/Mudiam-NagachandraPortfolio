import React from 'react';
import { ChevronRight } from 'lucide-react';

const Experience: React.FC = () => {
  const experiences = [
    {
      title: 'Application support engineer',
      company: ' REDKENKO HEALT TECH PRIVATE LIMITED.',
      period: 'Nov 2022 - Jul 2024',
      description: [
        'Lead a team of 5 support Engineer in Providing Support to the end users for Better Experience with Application and Product',
        'Implemented CI/CD pipelines that reduced deployment time by 40%',
        'Architected and developed reusable component library used across multiple projects',
        'Mentored junior support Engineer and conducted code reviews to ensure Application support'
      ]
    },
    {
      title: 'Production support Engineer',
      company:'(IBM) SYS Admin Solutions Ltd.',
      period: 'Mar 2020 - Nov 2022',
      description: [
        'Incident management: Detect, respond to, and resolve incidents with minimal impact on users. ',
        'Monitoring: Use tools like Nagios or Splunk to monitor systems. ',
        'Communication: Explain complex technical issues to non-technical stakeholders.',
        'Collaboration: Work with team members and stakeholders to share information and solve problems.'
      ]
    }
  ];

  return (
    <section id="experience" className="py-16 bg-gray-50 bg-opacity-90 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Work Experience</h2>
        <div className="w-20 h-1 bg-indigo-600 mx-auto mb-12"></div>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                    <p className="text-indigo-600 font-medium">{exp.company}</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                      {exp.period}
                    </span>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex">
                      <ChevronRight size={20} className="text-indigo-600 flex-shrink-0 mt-1" />
                      <span className="ml-2 text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;