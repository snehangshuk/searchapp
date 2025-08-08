import { Loader2, Sparkles } from "lucide-react";

interface ZenLoaderProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export function ZenLoader({ message = "Loading...", size = "md" }: ZenLoaderProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 zen-fade-in">
      <div className="relative">
        <div className={`${sizeClasses[size]} bg-zen-gradient-primary rounded-2xl flex items-center justify-center zen-shadow-lg zen-pulse`}>
          <Sparkles className="text-white icon-strong" size={iconSizes[size]} />
        </div>
        <div className={`${sizeClasses[size]} absolute inset-0 bg-zen-gradient-primary rounded-2xl opacity-20 animate-ping`}></div>
      </div>
      <div className="text-center">
        <p className="text-lg font-medium text-text-primary mb-2">{message}</p>
        <div className="flex items-center justify-center space-x-1">
          <div className="w-2 h-2 bg-zen-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-zen-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-zen-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}

export function ZenSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div className={`${sizeClasses[size]} relative`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-zen-accent icon-strong`} />
      <div className="absolute inset-0 rounded-full border-2 border-zen-accent/20 animate-ping"></div>
    </div>
  );
}
