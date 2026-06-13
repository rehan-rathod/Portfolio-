import React from 'react';

export function Navigation() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="font-heading font-bold text-xl text-foreground">
          Rehan Rathod
        </div>
        <div className="hidden md:flex gap-6">
          {['about', 'skills', 'projects', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
              data-testid={`nav-${item}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
