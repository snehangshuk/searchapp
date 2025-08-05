import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Search, Loader2 } from "lucide-react";
import { searchApi } from "@/lib/search-api";
import type { SearchResponse } from "@shared/schema";

interface SearchInterfaceProps {
  onSearchComplete: (query: string, results: SearchResponse) => void;
  initialQuery?: string;
}

const sampleQueries = [
  "Future of AI",
  "Climate change solutions",
  "Quantum computing",
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
        description: "Your research results are ready!",
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
    <div>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your research query..."
            className="w-full px-4 py-4 pr-12 text-lg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            disabled={searchMutation.isPending}
          />
          <Button
            type="submit"
            size="sm"
            disabled={!query.trim() || searchMutation.isPending}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {searchMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        {/* Loading State */}
        {searchMutation.isPending && (
          <div className="mt-4 flex items-center justify-center text-text-secondary">
            <div className="animate-pulse">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            </div>
            <span>Researching your query...</span>
          </div>
        )}
      </form>

      {/* Sample Queries */}
      {!searchMutation.isPending && !query && (
        <div className="mt-8 text-center">
          <p className="text-text-secondary mb-4">Try these sample queries:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {sampleQueries.map((sampleQuery) => (
              <Button
                key={sampleQuery}
                variant="secondary"
                size="sm"
                onClick={() => handleSampleQuery(sampleQuery)}
                className="px-3 py-1 bg-surface text-text-secondary rounded-full text-sm hover:bg-border transition-colors"
              >
                {sampleQuery}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
