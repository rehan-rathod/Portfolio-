import React from 'react';
import { Mail, Linkedin } from 'lucide-react';
import { SiGithub } from 'react-icons/si';

export function Contact() {
  return (
    <footer id="contact" className="py-24 relative z-10 border-t border-white/5 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6 max-w-4xl text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-foreground">
          Let's Build Something Great
        </h2>
        
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl font-light">
          Whether you have a project in mind, an opportunity, or just want to chat about React and AI, I'd love to hear from you.
        </p>

        <a 
          href="mailto:rehanrathod24903@gmail.com" 
          className="text-2xl md:text-4xl font-heading font-bold text-primary hover:text-primary/80 transition-colors mb-12 inline-block border-b-2 border-primary/30 hover:border-primary pb-1"
          data-testid="link-email-contact"
        >
          rehanrathod24903@gmail.com
        </a>

        <div className="flex gap-6 mb-16">
          <a 
            href="https://github.com/rehan-rathod" 
            target="_blank" 
            rel="noreferrer"
            className="p-4 rounded-full bg-secondary/50 border border-white/5 hover:bg-white/10 hover:-translate-y-1 transition-all text-muted-foreground hover:text-foreground"
            data-testid="link-github-contact"
          >
            <SiGithub size={24} />
          </a>
          <a 
            href="https://linkedin.com/in/rehan-rathod" 
            target="_blank" 
            rel="noreferrer"
            className="p-4 rounded-full bg-secondary/50 border border-white/5 hover:bg-white/10 hover:-translate-y-1 transition-all text-muted-foreground hover:text-[#0A66C2]"
            data-testid="link-linkedin-contact"
          >
            <Linkedin size={24} />
          </a>
        </div>

        <div className="text-sm text-muted-foreground/50 flex flex-col gap-2">
          <p>Languages: English, Hindi, Gujarati</p>
          <p>© {new Date().getFullYear()} Rehan Rathod. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
