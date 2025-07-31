import { useState, useEffect } from 'react';
import { Loader } from '@/components/ui/loader';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ContactSection } from '@/components/sections/ContactSection';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  // Simulate loading process
  useEffect(() => {
    const startTime = Date.now();
    const duration = 3000; // 3 seconds

    let frameId: number;
    let timeoutId: number;
    const frame = () => {
      const elapsedTime = Date.now() - startTime;
      const currentProgress = Math.min(elapsedTime / duration, 1);
      setProgress(currentProgress);

      if (currentProgress < 1) {
        frameId = requestAnimationFrame(frame);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 500); // Wait for fade out animation
      }
    };

    frameId = requestAnimationFrame(frame);

    // Failsafe: force loading to false after 5s
    timeoutId = window.setTimeout(() => setLoading(false), 5000);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId);
    };
  }, []);

  // Scroll handling effect
  useEffect(() => {
    if (loading) return; // Don't attach scroll listeners while loading

    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToNext = () => {
    scrollToSection('about');
  };

  return (
    <>
      {/* Loader overlay, always on top, not affected by main content opacity */}
      {loading && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/95">
          <ErrorBoundary fallback={<div className="text-foreground text-xl animate-pulse">Loading...</div>}>
            <Loader progress={progress} />
          </ErrorBoundary>
        </div>
      )}
      {/* Main content fades in only after loading is done */}
      <div className={`min-h-screen bg-background text-foreground relative overflow-x-hidden transition-opacity duration-1000 ease-in-out ${loading ? 'opacity-0 pointer-events-none select-none' : 'opacity-100'}`}>
        {/* Particle Background */}
        {!loading && <ParticleBackground />}

        {/* Navigation */}
        <Navigation activeSection={activeSection} onSectionChange={scrollToSection} />

        {/* Sections */}
        <div id="hero">
          <HeroSection onScrollToNext={scrollToNext} />
        </div>

        <div id="about">
          <AboutSection />
        </div>

        <div id="projects">
          <ProjectsSection />
        </div>

        <div id="contact">
          <ContactSection />
        </div>

        {/* Footer */}
        <footer className="py-12 border-t border-border/50 text-center">
          <div className="container mx-auto px-6">
            <p className="text-foreground-muted">© 2025 Ekundayo King. Crafted with passion and innovation.</p>
          </div>
        </footer>
      </div>
    </>
  );
};
export default Index;