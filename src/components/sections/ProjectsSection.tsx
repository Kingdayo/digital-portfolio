import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Filter } from 'lucide-react';
const projects = [{
  id: 1,
  title: 'E-Commerce Platform',
  description: 'A modern, responsive e-commerce platform with real-time inventory and payment processing.',
  image: '/placeholder.svg',
  technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
  category: 'Full-Stack',
  demoUrl: '#',
  codeUrl: '#'
}, {
  id: 2,

  title: 'Academic Task Reminder and Planner System',
  description: 'A system that helps students to keep track of their academic tasks and deadlines.',
  image: '/Screenshot 2025-07-31 052042.png',
  technologies: ['Typescript', 'Node.js', 'Javascript', 'CSS','Supabase'],
  category: 'Full-Stack',
  demoUrl: 'https://aurora-task-flow.netlify.app/',
  codeUrl: 'https://aurora-task-flow.netlify.app/'
}, {
  id: 3,
  title: 'AI-Powered Dashboard',
  description: 'Interactive dashboard with machine learning insights and predictive analytics.',
  image: '/placeholder.svg',
  technologies: ['Vue.js', 'Python', 'TensorFlow', 'D3.js'],
  category: 'Data Visualization',
  demoUrl: '#',
  codeUrl: '#'
}, {
  id: 3,
  title: 'Mobile Fitness App',
  description: 'Cross-platform mobile app for fitness tracking with social features.',
  image: '/placeholder.svg',
  technologies: ['React Native', 'Firebase', 'Redux'],
  category: 'Mobile',
  demoUrl: '#',
  codeUrl: '#'
}, {
  id: 4,
  title: '3D Portfolio Website',
  description: 'A 3D portfolio website showcasing my creative work.',
  image: '/placeholder.svg',
  technologies: ['Three.js', 'React', 'CSS'],
  category: 'Creative',
  demoUrl: '#',
  codeUrl: '#'
}];

const categories = ['All', 'Full-Stack', 'Data Visualization', 'Mobile', 'Creative'];

export const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const filteredProjects = activeFilter === 'All' ? projects : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-fluid-lg font-bold mb-6 text-glow">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
            A showcase of my recent work and creative experiments
          </p>
        </div>

        {/* Filter Buttons */}
        

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              className="glass-card overflow-hidden group hover:glow-primary transition-all duration-500 animate-fade-in-up"
              style={{
                animationDelay: `${index * 0.2}s`
              }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-secondary overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl text-primary/30 font-bold">#{project.id}</div>
                </div>
                
                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center gap-4 transition-all duration-300 ${hoveredProject === project.id ? 'opacity-100' : 'opacity-0'}`}>
                  <Button size="sm" className="morph-button glow-primary">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo
                  </Button>
                  <Button variant="outline" size="sm" className="morph-button">
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-primary group-hover:text-glow transition-all duration-300">
                    {project.title}
                  </h3>
                  <p className="text-foreground-muted mt-2">
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <Badge key={tech} variant="secondary" className="morph-button hover-scale">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button size="sm" className="flex-1 morph-button bg-gradient-primary hover:scale-105 transition-transform duration-300">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                  <Button variant="outline" size="sm" className="morph-button border-primary/50 hover:border-primary">
                    <Github className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};