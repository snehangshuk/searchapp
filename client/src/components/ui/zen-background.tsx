import React from "react";

interface ZenBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function ZenBackground({ children, className = "" }: ZenBackgroundProps) {
  return (
    <div className={`relative min-h-screen ${className}`}>
      {/* Zen-inspired background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-purple-50/30 dark:from-blue-950/20 dark:via-indigo-950/10 dark:to-purple-950/20"></div>
        
        {/* Floating circles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-zen-accent/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-zen-accent/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export function ZenCard({ children, className = "" }: ZenBackgroundProps) {
  return (
    <div className={`bg-white/60 dark:bg-black/60 backdrop-blur-sm rounded-2xl border border-zen-border shadow-lg hover:shadow-xl zen-transition ${className}`}>
      {children}
    </div>
  );
}

export function ZenSection({ children, className = "" }: ZenBackgroundProps) {
  return (
    <div className={`bg-white/40 dark:bg-black/40 backdrop-blur-sm border border-zen-border ${className}`}>
      {children}
    </div>
  );
}
