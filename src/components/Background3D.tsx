import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Background3DProps {
  opacity?: number;
}

const Background3D: React.FC<Background3DProps> = ({ opacity = 0.7 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const animationRef = useRef<number | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const nodesRef = useRef<THREE.Group | null>(null);
  const linesRef = useRef<THREE.LineSegments | null>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const targetMousePosition = useRef({ x: 0, y: 0 });

  // Handle browser support check
  const [supportsWebGL, setSupportsWebGL] = useState(true);

  useEffect(() => {
    // Check for WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setSupportsWebGL(!!gl);
    } catch (e) {
      setSupportsWebGL(false);
      return;
    }

    if (!supportsWebGL || !containerRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    cameraRef.current = camera;

    // Initialize renderer with alpha for transparency
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // Add renderer to DOM
    containerRef.current.appendChild(renderer.domElement);
    updateRendererSize();

    // Create particles
    createParticles();
    
    // Create network nodes
    createNodes();
    
    // Create connecting lines
    createLines();
    
    // Create binary streams
    createBinaryStreams();
    
    // Create circuit board elements
    createCircuitElements();

    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Start animation
    animate();
    setIsLoaded(true);

    // Cleanup
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose of geometries and materials
      disposeThreeObjects();
    };
  }, [supportsWebGL]);

  // Update renderer size based on container
  const updateRendererSize = () => {
    if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    rendererRef.current.setSize(width, height);
    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
  };

  // Handle window resize
  const handleResize = () => {
    updateRendererSize();
  };

  // Handle mouse movement for interactive effects
  const handleMouseMove = (event: MouseEvent) => {
    targetMousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    targetMousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  // Create floating particles
  const createParticles = () => {
    if (!sceneRef.current) return;
    
    const particleCount = 1000;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 100;
      positions[i3 + 1] = (Math.random() - 0.5) * 100;
      positions[i3 + 2] = (Math.random() - 0.5) * 100;
      sizes[i] = Math.random() * 2;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.5,
      color: 0x4fc3f7,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particlesRef.current = particles;
    sceneRef.current.add(particles);
  };

  // Create network nodes
  const createNodes = () => {
    if (!sceneRef.current) return;
    
    const nodeGroup = new THREE.Group();
    const nodeCount = 20;
    
    for (let i = 0; i < nodeCount; i++) {
      const geometry = new THREE.SphereGeometry(0.5, 16, 16);
      const material = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0x4fc3f7 : (i % 3 === 1 ? 0x29b6f6 : 0x0288d1),
        transparent: true,
        opacity: 0.8
      });
      
      const node = new THREE.Mesh(geometry, material);
      node.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60
      );
      
      // Add custom properties for animation
      (node as any).velocity = {
        x: (Math.random() - 0.5) * 0.05,
        y: (Math.random() - 0.5) * 0.05,
        z: (Math.random() - 0.5) * 0.05
      };
      
      nodeGroup.add(node);
    }
    
    nodesRef.current = nodeGroup;
    sceneRef.current.add(nodeGroup);
  };

  // Create connecting lines between nodes
  const createLines = () => {
    if (!sceneRef.current || !nodesRef.current) return;
    
    const lineGeometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    
    // Connect nodes that are close to each other
    for (let i = 0; i < nodesRef.current.children.length; i++) {
      const nodeA = nodesRef.current.children[i];
      
      for (let j = i + 1; j < nodesRef.current.children.length; j++) {
        const nodeB = nodesRef.current.children[j];
        
        // Calculate distance between nodes
        const distance = nodeA.position.distanceTo(nodeB.position);
        
        // Connect if within threshold
        if (distance < 30) {
          positions.push(
            nodeA.position.x, nodeA.position.y, nodeA.position.z,
            nodeB.position.x, nodeB.position.y, nodeB.position.z
          );
        }
      }
    }
    
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0288d1,
      transparent: true,
      opacity: 0.3
    });
    
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    linesRef.current = lines;
    sceneRef.current.add(lines);
  };

  // Create binary code streams
  const createBinaryStreams = () => {
    if (!sceneRef.current) return;
    
    const streamCount = 5;
    
    for (let i = 0; i < streamCount; i++) {
      const streamLength = 20 + Math.floor(Math.random() * 30);
      const streamGeometry = new THREE.BufferGeometry();
      const positions: number[] = [];
      
      // Create a path for the binary stream
      const startX = (Math.random() - 0.5) * 80;
      const startY = (Math.random() - 0.5) * 80;
      const startZ = (Math.random() - 0.5) * 80;
      
      const dirX = (Math.random() - 0.5) * 2;
      const dirY = (Math.random() - 0.5) * 2;
      const dirZ = (Math.random() - 0.5) * 2;
      
      for (let j = 0; j < streamLength; j++) {
        positions.push(
          startX + dirX * j * 0.5,
          startY + dirY * j * 0.5,
          startZ + dirZ * j * 0.5
        );
      }
      
      streamGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      
      const streamMaterial = new THREE.PointsMaterial({
        size: 0.5,
        color: 0x4fc3f7,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
      });
      
      const stream = new THREE.Points(streamGeometry, streamMaterial);
      
      // Add custom properties for animation
      (stream as any).speed = 0.01 + Math.random() * 0.03;
      (stream as any).offset = 0;
      
      sceneRef.current.add(stream);
    }
  };

  // Create circuit board elements
  const createCircuitElements = () => {
    if (!sceneRef.current) return;
    
    // Create a grid to represent a circuit board
    const gridSize = 50;
    const gridDivisions = 10;
    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x0288d1, 0x0288d1);
    gridHelper.position.y = -20;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.2;
    sceneRef.current.add(gridHelper);
    
    // Add some circuit paths
    const circuitCount = 3;
    
    for (let i = 0; i < circuitCount; i++) {
      const pathPoints = [];
      const segmentCount = 5 + Math.floor(Math.random() * 5);
      
      let x = (Math.random() - 0.5) * 40;
      let y = -19.5; // Just above the grid
      let z = (Math.random() - 0.5) * 40;
      
      for (let j = 0; j < segmentCount; j++) {
        pathPoints.push(new THREE.Vector3(x, y, z));
        
        // Move in a random direction, but only along x or z (to mimic circuit paths)
        if (Math.random() > 0.5) {
          x += (Math.random() > 0.5 ? 1 : -1) * (3 + Math.random() * 5);
        } else {
          z += (Math.random() > 0.5 ? 1 : -1) * (3 + Math.random() * 5);
        }
      }
      
      const circuitGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
      const circuitMaterial = new THREE.LineBasicMaterial({
        color: 0x4fc3f7,
        transparent: true,
        opacity: 0.8,
        linewidth: 2
      });
      
      const circuit = new THREE.Line(circuitGeometry, circuitMaterial);
      sceneRef.current.add(circuit);
    }
  };

  // Animation loop
  const animate = () => {
    if (!isPlaying) return;
    
    animationRef.current = requestAnimationFrame(animate);
    
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
    
    // Smooth mouse movement
    mousePosition.current.x += (targetMousePosition.current.x - mousePosition.current.x) * 0.05;
    mousePosition.current.y += (targetMousePosition.current.y - mousePosition.current.y) * 0.05;
    
    // Rotate camera slightly based on mouse position
    cameraRef.current.position.x += (mousePosition.current.x * 10 - cameraRef.current.position.x) * 0.01;
    cameraRef.current.position.y += (mousePosition.current.y * 10 - cameraRef.current.position.y) * 0.01;
    cameraRef.current.lookAt(0, 0, 0);
    
    // Animate particles
    if (particlesRef.current) {
      particlesRef.current.rotation.x += 0.0005;
      particlesRef.current.rotation.y += 0.0003;
    }
    
    // Animate nodes
    if (nodesRef.current) {
      nodesRef.current.children.forEach((node) => {
        // Move nodes according to their velocity
        node.position.x += (node as any).velocity.x;
        node.position.y += (node as any).velocity.y;
        node.position.z += (node as any).velocity.z;
        
        // Bounce off boundaries
        if (Math.abs(node.position.x) > 30) (node as any).velocity.x *= -1;
        if (Math.abs(node.position.y) > 30) (node as any).velocity.y *= -1;
        if (Math.abs(node.position.z) > 30) (node as any).velocity.z *= -1;
      });
    }
    
    // Update lines connecting nodes
    if (linesRef.current && nodesRef.current) {
      const positions: number[] = [];
      
      for (let i = 0; i < nodesRef.current.children.length; i++) {
        const nodeA = nodesRef.current.children[i];
        
        for (let j = i + 1; j < nodesRef.current.children.length; j++) {
          const nodeB = nodesRef.current.children[j];
          
          // Calculate distance between nodes
          const distance = nodeA.position.distanceTo(nodeB.position);
          
          // Connect if within threshold
          if (distance < 30) {
            positions.push(
              nodeA.position.x, nodeA.position.y, nodeA.position.z,
              nodeB.position.x, nodeB.position.y, nodeB.position.z
            );
          }
        }
      }
      
      linesRef.current.geometry.setAttribute(
        'position', 
        new THREE.Float32BufferAttribute(positions, 3)
      );
      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }
    
    // Animate binary streams
    sceneRef.current.children.forEach((child) => {
      if (child instanceof THREE.Points && (child as any).speed !== undefined) {
        (child as any).offset += (child as any).speed;
        
        if ((child as any).offset > 1) {
          (child as any).offset = 0;
        }
        
        // Move points along the stream
        const positions = child.geometry.attributes.position.array;
        for (let i = 0; i < positions.length / 3; i++) {
          const i3 = i * 3;
          const nextI3 = ((i + 1) % (positions.length / 3)) * 3;
          
          if (Math.random() > 0.95) {
            // Occasionally make a point brighter
            (child.material as THREE.PointsMaterial).size = 1.0;
          } else {
            (child.material as THREE.PointsMaterial).size = 0.5;
          }
        }
        child.geometry.attributes.position.needsUpdate = true;
      }
    });
    
    // Render scene
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  };

  // Toggle animation play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    
    if (!isPlaying && animationRef.current === null) {
      animate();
    }
  };

  // Clean up Three.js objects
  const disposeThreeObjects = () => {
    if (sceneRef.current) {
      sceneRef.current.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
    }
  };

  // Fallback for browsers without WebGL support
  if (!supportsWebGL) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-blue-900 to-black opacity-70 z-[-1]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')] bg-cover bg-center opacity-20"></div>
      </div>
    );
  }

  return (
    <>
      <div 
        ref={containerRef} 
        className="fixed inset-0 z-[-1]" 
        style={{ opacity }}
      />
      
      {isLoaded && (
        <button 
          onClick={togglePlay}
          className="fixed bottom-4 right-4 bg-indigo-600 text-white p-2 rounded-full z-10 opacity-70 hover:opacity-100 transition-opacity"
          aria-label={isPlaying ? "Pause background animation" : "Play background animation"}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          )}
        </button>
      )}
    </>
  );
};

export default Background3D;