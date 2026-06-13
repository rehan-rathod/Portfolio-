import React from 'react';
import { Navigation } from '@/components/Navigation';
import { FishBackground } from '@/components/FishBackground';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { CurrentlyBuilding } from '@/components/CurrentlyBuilding';
import { Contact } from '@/components/Contact';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 relative">
      <FishBackground />
      <Navigation />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <CurrentlyBuilding />
      </main>

      <Contact />
    </div>
  );
}
