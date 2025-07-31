import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Palette, Rocket, Users } from 'lucide-react';
const skills = ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Vite', 'React', 'Tailwind CSS', 'Sass', 'TypeScript', 'Bootstrap', 'Multiple Factor Authentication', 'OAuth', 'JSON', 'Microsoft Applications', 'jQuery', 'REST APIs'];
const highlights = [{
  icon: Code,
  title: 'Full-Stack Development',
  description: 'Expertise in modern web technologies and scalable architecture'
}, {
  icon: Palette,
  title: 'Creative Design',
  description: 'Passion for creating beautiful, intuitive user experiences'
}, {
  icon: Rocket,
  title: 'Innovation',
  description: 'Always exploring cutting-edge technologies and methodologies'
}, {
  icon: Users,
  title: 'Collaboration',
  description: 'Strong communication and teamwork in agile environments'
}];
export const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.3
    });
    const element = document.getElementById('about');
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`space-y-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div>
              <h2 className="text-fluid-lg font-bold mb-6 text-glow">
                About <span className="text-primary">Me</span>
              </h2>
              <div className="space-y-4 text-foreground-muted">
                <p className="text-lg leading-relaxed">I'm a passionate full-stack developer with 2+ years of experience creating innovative digital solutions. My journey began with a fascination for how technology can transform ideas into reality.</p>
                <p className="text-lg leading-relaxed">
                  I specialize in building scalable web applications, interactive user 
                  interfaces, and bringing creative visions to life through code. 
                  Every project is an opportunity to push boundaries and create something extraordinary.
                </p>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">Core Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => <Badge key={skill} variant="secondary" className={`morph-button hover-scale transition-all duration-300 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{
                animationDelay: `${index * 0.1}s`
              }}>
                    {skill}
                  </Badge>)}
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => <Card key={highlight.title} className={`glass-card p-6 hover:glow-primary transition-all duration-500 hover-scale group ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{
            animationDelay: `${0.5 + index * 0.2}s`
          }}>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <highlight.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg text-primary">{highlight.title}</h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              </Card>)}
          </div>
        </div>
      </div>
    </section>;
};