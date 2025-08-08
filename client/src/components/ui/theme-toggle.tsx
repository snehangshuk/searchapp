import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="p-3 text-text-secondary hover:text-text-primary hover:bg-zen-muted rounded-xl zen-transition group"
      aria-label="Toggle theme"
    >
      <div className="relative">
        {isDark ? (
          <Sun className="h-5 w-5 icon-enhanced text-zen-accent" />
        ) : (
          <Moon className="h-5 w-5 icon-enhanced text-zen-accent" />
        )}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-zen-accent rounded-full opacity-0 group-hover:opacity-100 zen-transition"></div>
      </div>
    </Button>
  );
}

export function ThemeIndicator() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex items-center space-x-2 px-3 py-2 bg-white/40 dark:bg-black/40 backdrop-blur-sm rounded-xl">
      <div className="flex items-center space-x-1">
        <Sun className="h-3 w-3 text-zen-accent" />
        <span className="text-xs font-medium text-text-secondary">Light</span>
      </div>
      <div className="w-6 h-3 bg-zen-muted rounded-full relative">
        <div 
          className={`absolute top-0.5 w-2 h-2 bg-zen-accent rounded-full zen-transition ${
            isDark ? 'translate-x-3' : 'translate-x-0.5'
          }`}
        />
      </div>
      <div className="flex items-center space-x-1">
        <Moon className="h-3 w-3 text-zen-accent" />
        <span className="text-xs font-medium text-text-secondary">Dark</span>
      </div>
    </div>
  );
}
