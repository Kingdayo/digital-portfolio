import { useEffect, useRef } from 'react';

export const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random starting position
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.animationDuration = (8 + Math.random() * 4) + 's';
      
      // Random opacity and size variations
      particle.style.opacity = (0.3 + Math.random() * 0.5).toString();
      const size = 1 + Math.random() * 2;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';

      container.appendChild(particle);

      // Remove particle after animation
      setTimeout(() => {
        if (container.contains(particle)) {
          container.removeChild(particle);
        }
      }, 12000);
    };

    // Create particles at intervals
    const interval = setInterval(createParticle, 500);

    // Create initial particles
    for (let i = 0; i < 20; i++) {
      setTimeout(createParticle, i * 100);
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div ref={containerRef} className="particle-container" />;
};