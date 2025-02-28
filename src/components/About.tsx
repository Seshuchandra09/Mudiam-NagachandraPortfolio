import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-white bg-opacity-90 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">About Me</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-8"></div>
          
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-4">
              Hello! I'm Mudiam Nagachandra, a passionate Production And Application support Engineer with over 4.9 years of experience providing Production And Application support. 
              I specialize in Java, Unix, Linux, SQL, PL/SQL, Oracle technologies across platforms (Jira, Autosys, AWS, MongoDB).
            </p>
            
            <p className="mb-4">
              My journey as a support engineer began during my BSc Computer Science studies at Yogi Vemana University, 
              where I discovered my passion for creating interactive and user-friendly application experiences. 
              Since then, I've worked with various companies ranging from startups to established enterprises, 
              helping them build scalable and maintainable applications.
            </p>
            
            <p className="mb-4">
              When I'm not coding, you can find me hiking in the mountains, reading tech blogs, or experimenting with new technologies. 
              I'm always eager to learn new skills and stay updated with the latest trends in Application Support Engineering.
            </p>
            
            <p>
              I believe in writing clean, efficient code and creating intuitive user experiences. 
              My goal is to build applications that not only meet business requirements but also delight users.
            </p>
          </div>
          
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Education</h3>
              <ul className="space-y-3">
                <li>
                  <p className="font-medium">BSc in Computer Science</p>
                  <p className="text-gray-600">Yogi Vemana University, 2016-2019</p>
                </li>
                <li>
                  <p className="font-medium">Application Support Engineer</p>
                  <p className="text-gray-600">IBM, 2020</p>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Interests</h3>
              <ul className="space-y-3">
                <li>
                  <p className="font-medium">System Administration</p>
                  <p className="text-gray-600">Unix/Linux environments</p>
                </li>
                <li>
                  <p className="font-medium">Database Management</p>
                  <p className="text-gray-600">Oracle, SQL optimization</p>
                </li>
                <li>
                  <p className="font-medium">Automation</p>
                  <p className="text-gray-600">Shell scripting and monitoring tools</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;