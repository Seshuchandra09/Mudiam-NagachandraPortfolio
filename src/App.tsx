import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Background3D from './components/Background3D';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [backgroundOpacity, setBackgroundOpacity] = useState(0.7);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading of 3D resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Loading screen */}
      {isLoading && (
        <div className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-white text-lg">Loading IT World...</p>
          </div>
        </div>
      )}

      {/* 3D Background */}
      <Background3D opacity={backgroundOpacity} />
      
      <Header mobileMenuOpen={mobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      
      <Footer />

      {/* Background opacity control */}
      <div className="fixed bottom-4 left-4 z-10 bg-white bg-opacity-70 p-2 rounded-md shadow-md">
        <label htmlFor="opacity-slider" className="block text-xs text-gray-700 mb-1">
          Background Opacity
        </label>
        <input
          id="opacity-slider"
          type="range"
          min="0.1"
          max="1"
          step="0.05"
          value={backgroundOpacity}
          onChange={(e) => setBackgroundOpacity(parseFloat(e.target.value))}
          className="w-32"
        />
      </div>
    </div>
  );
}

export default App;