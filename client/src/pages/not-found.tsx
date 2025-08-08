import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, Sparkles, ArrowLeft } from "lucide-react";
import { ZenBackground, ZenCard } from "@/components/ui/zen-background";

export default function NotFound() {
  return (
    <ZenBackground>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <ZenCard className="p-8 text-center">
            <div className="w-20 h-20 bg-zen-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 zen-shadow-lg zen-float">
              <Sparkles className="text-white text-2xl" size={32} />
            </div>
            
            <h1 className="text-3xl font-bold text-text-primary mb-4">Page Not Found</h1>
            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              The page you're looking for seems to have wandered off into the digital wilderness.
            </p>
            
            <div className="space-y-4">
              <Link href="/">
                <Button className="w-full bg-zen-gradient-primary text-white hover:shadow-lg zen-transition hover:scale-105">
                  <Home className="h-4 w-4 mr-2" />
                  Return Home
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                className="w-full border-zen-border hover:bg-zen-muted zen-transition"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>
            
            <div className="mt-8 pt-6 border-t border-zen-border">
              <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2 text-zen-accent">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">Peaceful Navigation</span>
                </div>
              </div>
            </div>
          </ZenCard>
        </div>
      </div>
    </ZenBackground>
  );
}
