import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Search, Sparkles, Lightbulb } from "lucide-react";
import { ZenSpinner } from "@/components/ui/zen-loader";
import { searchApi } from "@/lib/search-api";
import type { SearchResponse } from "@shared/schema";

interface SearchInterfaceProps {
  onSearchComplete: (query: string, results: SearchResponse) => void;
  initialQuery?: string;
}

const sampleQueries = [
  "Future of AI and machine learning",
  "Climate change solutions and innovations",
  "Quantum computing applications",
  "Sustainable energy technologies",
  "Space exploration and discoveries",
  "Biotechnology breakthroughs"
];

export function SearchInterface({ onSearchComplete, initialQuery = "" }: SearchInterfaceProps) {
  const [query, setQuery] = useState(initialQuery);
  const { toast } = useToast();

  const searchMutation = useMutation({
    mutationFn: searchApi.search,
    onSuccess: (data) => {
      console.log("Search API success, received data:", data);
      console.log("Data type:", typeof data, "Is array:", Array.isArray(data));
      onSearchComplete(query, data);
      toast({
        title: "Research Complete",
        description: "Your insights are ready to explore!",
      });
    },
    onError: (error: any) => {
      console.error("Search failed:", error);
      
      let description = "Unable to process your research query. Please try again.";
      
      // Check if it's a connection error to n8n
      if (error.message && error.message.includes("Unable to connect to research service")) {
        description = "Can't connect to n8n research service. Make sure n8n is running on localhost:5678";
      } else if (error.message) {
        description = error.message;
      }
      
      toast({
        title: "Research Failed",
        description,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || searchMutation.isPending) return;
    searchMutation.mutate({ query: query.trim() });
  };

  const handleSampleQuery = (sampleQuery: string) => {
    setQuery(sampleQuery);
    searchMutation.mutate({ query: sampleQuery });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What would you like to research today?"
            className="w-full px-6 py-6 pr-16 text-xl border-2 border-zen-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary zen-transition bg-white/80 dark:bg-black/80 backdrop-blur-sm shadow-lg hover:shadow-xl"
            disabled={searchMutation.isPending}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Button
              type="submit"
              size="sm"
              disabled={!query.trim() || searchMutation.isPending}
              className="bg-zen-gradient-primary text-white p-3 rounded-xl hover:shadow-lg zen-transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {searchMutation.isPending ? (
                <ZenSpinner size="sm" />
              ) : (
                <Search className="h-5 w-5 icon-strong" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Loading State */}
        {searchMutation.isPending && (
          <div className="mt-8 flex items-center justify-center text-text-secondary zen-fade-in">
            <div className="flex items-center space-x-4 bg-white/60 dark:bg-black/60 backdrop-blur-sm px-8 py-6 rounded-2xl shadow-lg">
              <ZenSpinner size="md" />
              <span className="text-lg font-medium">Researching your query...</span>
            </div>
          </div>
        )}
      </form>

      {/* Sample Queries */}
      {!searchMutation.isPending && !query && (
        <div className="mt-12 text-center zen-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-center mb-6">
            <Lightbulb className="h-6 w-6 text-zen-accent mr-2 icon-strong" />
            <p className="text-lg font-medium text-text-secondary">Try these research topics:</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {sampleQueries.map((sampleQuery, index) => (
              <Button
                key={sampleQuery}
                variant="secondary"
                size="sm"
                onClick={() => handleSampleQuery(sampleQuery)}
                className="px-4 py-2 bg-white/60 dark:bg-black/60 backdrop-blur-sm text-text-secondary rounded-xl text-sm hover:bg-white dark:hover:bg-black hover:text-text-primary hover:shadow-lg zen-transition hover:scale-105 border border-zen-border"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <Sparkles className="h-4 w-4 mr-2 text-zen-accent icon-strong" />
                {sampleQuery}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Empty State with Zen Design */}
      {!searchMutation.isPending && query && !searchMutation.isError && (
        <div className="mt-8 text-center zen-fade-in">
          <div className="bg-white/40 dark:bg-black/40 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-zen-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 zen-shadow">
              <Search className="h-8 w-8 text-white icon-strong" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">Ready to Research</h3>
            <p className="text-text-secondary">Press Enter or click the search button to begin your research journey</p>
          </div>
        </div>
      )}
    </div>
  );
}
