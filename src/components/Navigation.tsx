import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, User, Briefcase, Code, Mail } from 'lucide-react';
interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}
const navItems = [{
  id: 'hero',
  label: 'Home',
  icon: Home
}, {
  id: 'about',
  label: 'About',
  icon: User
}, {
  id: 'projects',
  label: 'Projects',
  icon: Code
}, {
  id: 'contact',
  label: 'Contact',
  icon: Mail
}];
export const Navigation = ({
  activeSection,
  onSectionChange
}: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleNavClick = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsOpen(false);
  };
  return <>
      {/* Desktop Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-card backdrop-blur-md border-b border-glass-border/20' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-bold text-glow animate-pulse-glow">
              
              <span className="text-foreground">Portfolio</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map(item => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => handleNavClick(item.id)}
                  className={`morph-button ${
                    activeSection === item.id 
                      ? 'text-primary glow-primary' 
                      : 'text-foreground-muted hover:text-background hover:bg-foreground'
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="md:hidden morph-button">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={() => setIsOpen(false)} />
          <div className="absolute top-20 left-4 right-4 glass-card p-6 animate-slide-up">
            <div className="space-y-4">
              {navItems.map(item => <Button key={item.id} variant="ghost" onClick={() => handleNavClick(item.id)} className={`w-full justify-start morph-button ${activeSection === item.id ? 'text-primary glow-primary' : 'text-foreground-muted hover:text-background hover:bg-foreground'}`}>
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>)}
            </div>
          </div>
        </div>}

      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 h-1 bg-primary glow-primary z-50 transition-all duration-300" style={{
      width: `${(navItems.findIndex(item => item.id === activeSection) + 1) * 20}%`
    }} />
    </>;
};