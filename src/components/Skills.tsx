import React from 'react';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      category: 'technologies',
      skills: [
        { name: 'Unix', level: 90 },
        { name: 'Linux', level: 85 },
        { name: 'Java', level: 50 },
        { name: 'Shell Script', level: 80 },
        { name: 'Sql', level: 85 },
        { name: 'PlSql', level: 75 },
        { name: 'Oracle ', level: 80 },
        { name: 'Python ', level: 60 }
      ]
    },
    {
      category: 'Backend',
      skills: [
        { name: 'MongoDB', level: 70 },
        { name: 'PostgreSQL', level: 65 },
        { name: 'REST APIs', level: 85 }
      ]
    },
    {
      category: 'Tools & Others',
      skills: [
        { name: 'Git/GitHub', level: 85 },
        { name: 'Autosys', level: 60 },
        { name: 'ELK', level: 70 },
        { name: 'CI/CD', level: 65 },
        { name: 'Grafana', level: 75 },
        { name: 'Kibana', level: 90 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-16 bg-gray-50 bg-opacity-90 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Skills</h2>
        <div className="w-20 h-1 bg-indigo-600 mx-auto mb-12"></div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold text-center text-gray-900 mb-6 capitalize">{category.category}</h3>
                
                <div className="space-y-4">
                  {category.skills.map((skill, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700 font-medium">{skill.name}</span>
                        <span className="text-gray-500 text-sm">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className="bg-indigo-600 h-2.5 rounded-full relative"
                          style={{ width: `${skill.level}%` }}
                        >
                          <span className="absolute inset-0 w-full h-full bg-white opacity-30 animate-pulse"></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;