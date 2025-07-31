import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
interface HeroSectionProps {
  onScrollToNext: () => void;
}
export const HeroSection = ({
  onScrollToNext
}: HeroSectionProps) => {
<<<<<<< HEAD
  const [displayName, setDisplayName] = useState('');
  const [displaySubtitle, setDisplaySubtitle] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [typingActive, setTypingActive] = useState(false);
  const [subtitleTyping, setSubtitleTyping] = useState(false);
  const nameText = 'Ekundayo King';
  const subtitleText = 'Creative Developer & Digital Artist';

  useEffect(() => {
    // Simulate loader duration (e.g. 3s), then start typing
    const loaderTimeout = setTimeout(() => setTypingActive(true), 3000);
    return () => clearTimeout(loaderTimeout);
  }, []);

  useEffect(() => {
    if (!typingActive) return;
    let currentIndex = 0;
    setDisplayName('');
    setDisplaySubtitle('');
    const typingInterval = setInterval(() => {
      if (currentIndex <= nameText.length) {
        setDisplayName(nameText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setSubtitleTyping(true);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, [typingActive]);

  useEffect(() => {
    if (!subtitleTyping) return;
    let currentIndex = 0;
    setDisplaySubtitle('');
    const typingInterval = setInterval(() => {
      if (currentIndex <= subtitleText.length) {
        setDisplaySubtitle(subtitleText.slice(0, currentIndex));
=======
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'Creative Developer & Digital Artist';
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
>>>>>>> fecd584fa83f0f4c19d985967a1a61a4cbbb37c8
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
<<<<<<< HEAD
    return () => clearInterval(typingInterval);
  }, [subtitleTyping]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">


=======

    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);
  return <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
>>>>>>> fecd584fa83f0f4c19d985967a1a61a4cbbb37c8
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{
        animationDelay: '2s'
      }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse-glow" />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Main Content */}
        <div className="space-y-8 animate-fade-in-up">
          {/* Name */}
          <div className="space-y-4">
            <h1 className="text-fluid-2xl font-bold text-glow">
<<<<<<< HEAD
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                {displayName}
                {(!subtitleTyping && showCursor) && <span className="inline-block w-0.5 h-10 bg-primary ml-1 align-baseline animate-pulse" />}
              </span>
            </h1>
            {/* Animated Title */}
            <div className="h-16 flex items-center justify-center">
              <h2 className="text-fluid-lg text-foreground-muted font-mono">
                {displaySubtitle}
                {(subtitleTyping && showCursor) && <span className="inline-block w-0.5 h-8 bg-primary ml-1 animate-pulse" />}
=======
              <span className="bg-gradient-primary bg-clip-text text-transparent">Ekundayo King </span>
            </h1>
            
            {/* Animated Title */}
            <div className="h-16 flex items-center justify-center">
              <h2 className="text-fluid-lg text-foreground-muted font-mono">
                {displayText}
                <span className={`inline-block w-0.5 h-8 bg-primary ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
>>>>>>> fecd584fa83f0f4c19d985967a1a61a4cbbb37c8
              </h2>
            </div>
          </div>

          {/* Description */}
          <p className="text-xl text-foreground-muted max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{
          animationDelay: '0.5s'
        }}>
            Crafting immersive digital experiences through innovative web technologies, 
            creative design, and cutting-edge development practices.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{
          animationDelay: '1s'
        }}>
            <Button size="lg" className="morph-button bg-gradient-primary hover:scale-105 transition-transform duration-300 glow-primary text-lg px-8 py-6" onClick={() => onScrollToNext()}>
              Explore My Work
              <ChevronDown className="w-5 h-5 ml-2 animate-bounce" />
            </Button>
            
<<<<<<< HEAD
            <a
  href="/resume.pdf"
  download
  className="morph-button border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-lg px-8 py-6 inline-block rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/80 transform hover:scale-105 active:scale-95"
>
  Download Resume
</a>
=======
            <Button variant="outline" size="lg" className="morph-button border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-lg px-8 py-6">
              Download Resume
            </Button>
>>>>>>> fecd584fa83f0f4c19d985967a1a61a4cbbb37c8
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 animate-fade-in-up" style={{
          animationDelay: '1.5s'
        }}>
<<<<<<< HEAD
            {[
            {
              icon: Github,
              href: 'https://github.com/Kingdayo',
              label: 'GitHub'
            },
            {
              icon: Linkedin,
              href: 'https://www.linkedin.com/in/ekundayo-king/',
              label: 'LinkedIn'
            },
            {
              icon: Mail,
              href: 'https://mail.google.com/mail/?view=cm&to=1kingdayo@gmail.com',
              label: 'Email'
            }
          ].map((social, index) => (
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              key={social.label}
              style={{ animationDelay: `${1.5 + index * 0.2}s` }}
              className="morph-button group hover:glow-primary transition-all duration-300 bg-indigo-800 hover:bg-indigo-700 hover:scale-110 active:scale-95 flex items-center justify-center w-12 h-12 rounded-full"
            >
              <social.icon className="w-6 h-6 text-white group-hover:text-white transition-colors duration-300" />
              <span className="sr-only">{social.label}</span>
            </a>
          ))}
=======
            {[{
            icon: Github,
            href: '#',
            label: 'GitHub'
          }, {
            icon: Linkedin,
            href: '#',
            label: 'LinkedIn'
          }, {
            icon: Mail,
            href: '#',
            label: 'Email'
          }].map((social, index) => <Button key={social.label} variant="ghost" size="icon" style={{
            animationDelay: `${1.5 + index * 0.2}s`
          }} className="morph-button group hover:glow-primary transition-all duration-300 bg-indigo-800 hover:bg-indigo-700 hover:scale-110 active:scale-95">
                <social.icon className="w-6 h-6 text-white group-hover:text-white transition-colors duration-300" />
                <span className="sr-only">{social.label}</span>
              </Button>)}
>>>>>>> fecd584fa83f0f4c19d985967a1a61a4cbbb37c8
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
<<<<<<< HEAD
    </section>
  );
=======
    </section>;
>>>>>>> fecd584fa83f0f4c19d985967a1a61a4cbbb37c8
};