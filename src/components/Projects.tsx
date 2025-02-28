import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'Kenko Health insurance Platform',
      description: 'Kenko Health is a tech-driven healthcare platform offering subscription-based plans that provide comprehensive coverage for outpatient department (OPD) expenses like doctor visits, medicines, and lab tests, aiming to make affordable healthcare accessible to individuals and families through a network of partnered providers.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      technologies: ['Java', 'Python', 'SQL', 'MongoDB', 'shell script', 'OpenWeather API'],
      liveLink: 'https://kenkohealth.in',
      githubLink: 'https://github.com/yourusername/kenko-platform'
    },
    {
      title: 'Danske Bank',
      description: 'Danske Bank is a Danish bank that offers banking, insurance, and investment management services. It is the largest bank in Denmark and a major bank in Northern Europe.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      technologies: ['Unix', 'Lunix', 'PLSQL', 'shell script'],
      liveLink: 'https://project-example.com',
      githubLink: 'https://github.com/yourusername/task-manager'
    },
    {
      title: ' Telia Tele Services',
      description: ' Telia Tele Services are technology pioneers who have been digitalizing societies for the past 170 years. Today, our 19,000 talented colleagues serve 25 million customers across the Nordic and Baltic region with essential digital infrastructure and digital services that are fundamental enablers of the digital societies we live in. We are the telecommunications leader in the region, the leading Nordic media house, and the leader in ICT in both Finland and the Baltics.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      technologies: ['Lunix', 'SQL', 'PLSQL', 'shell script'],
      liveLink: 'https://www.telia.se/',
      githubLink: 'https://github.com/Seshuchandra09/telia-services'
    }
  ];

  return (
    <section id="projects" className="py-16 bg-white bg-opacity-90 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Projects</h2>
        <div className="w-20 h-1 bg-indigo-600 mx-auto mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-700 mb-4">{project.description}</p>
                
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span 
                      key={i} 
                      className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <a 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 flex items-center"
                  >
                    <ExternalLink size={16} className="mr-1" />
                    Live Demo
                  </a>
                  {project.githubLink && (
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 flex items-center"
                    >
                      <Github size={16} className="mr-1" />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;