import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: '1kingdayo@gmail.com',
<<<<<<< HEAD
    href: 'https://mail.google.com/mail/?view=cm&to=1kingdayo@gmail.com'
=======
    href: 'mailto:1kingdayo@gmail.com'
>>>>>>> fecd584fa83f0f4c19d985967a1a61a4cbbb37c8
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+234 811 519 5486',
    href: 'tel:+2348115195486'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Lagos, Nigeria',
    href: '#'
  }
];

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Save to database
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.name,
          email: formData.email,
          message: formData.message
        });

      if (dbError) {
        throw new Error('Failed to save message');
      }

      // Send confirmation email
      const { error: emailError } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          message: formData.message
        }
      });

      if (emailError) {
        console.error('Email error:', emailError);
        // Don't throw here - message was saved, just email failed
      }

      toast.success('Message sent successfully! Check your email for confirmation.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-fluid-lg font-bold mb-6 text-glow">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="glass-card p-8 animate-fade-in-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative group">
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="morph-button bg-background-secondary border-border/50 focus:border-primary focus:glow-primary transition-all duration-300"
                  />
                </div>
                
                <div className="relative group">
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="morph-button bg-background-secondary border-border/50 focus:border-primary focus:glow-primary transition-all duration-300"
                  />
                </div>
                
                <div className="relative group">
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="morph-button bg-background-secondary border-border/50 focus:border-primary focus:glow-primary transition-all duration-300 resize-none"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full morph-button bg-gradient-primary hover:scale-105 transition-all duration-300 glow-primary text-lg py-6"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary">Let's Connect</h3>
              <p className="text-foreground-muted text-lg leading-relaxed mb-8">
                I'm always interested in hearing about new projects and opportunities. 
                Whether you're a company looking to hire, or you're someone with an 
                interesting project, I'd love to hear from you.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <Card
                  key={info.label}
                  className="glass-card p-6 hover:glow-primary transition-all duration-300 group animate-fade-in-up hover:scale-110 active:scale-95"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <a 
                    href={info.href}
                    className="flex items-center space-x-4 text-foreground-muted group-hover:text-background transition-colors duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <info.icon className="w-6 h-6 text-primary-foreground group-hover:text-black transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground-muted">{info.label}</p>
                      <p className="text-lg font-medium text-white group-hover:text-white">{info.value}</p>
                    </div>
                  </a>
                </Card>
              ))}
            </div>

            {/* CTA */}
            <div className="glass-card p-6 text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <h4 className="text-xl font-semibold mb-3 text-primary">Ready to start a project?</h4>
              <p className="text-foreground-muted mb-4">
                Let's discuss how we can bring your vision to life
              </p>
              <Button className="morph-button bg-gradient-primary hover:scale-105 transition-transform duration-300 glow-primary">
                <a href="tel:+2348115195486" className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Schedule a Call
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};