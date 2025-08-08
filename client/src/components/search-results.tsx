import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Search, BookOpen, Sparkles } from "lucide-react";
import type { SearchResponse } from "@shared/schema";

interface SearchResultsProps {
  results: SearchResponse | null;
  query: string;
}

export function SearchResults({ results, query }: SearchResultsProps) {
  const [showMarkdown, setShowMarkdown] = useState(true);

  // Debug logging
  console.log("SearchResults received:", { results, query, resultsType: typeof results, isArray: Array.isArray(results) });
  
  // Handle both array and single object responses
  let resultsArray: any[];
  if (Array.isArray(results)) {
    resultsArray = results;
  } else if (results && typeof results === 'object') {
    resultsArray = [results];
  } else {
    resultsArray = [];
  }
  
  console.log("Results array:", resultsArray);
  if (resultsArray.length > 0) {
    console.log("First result:", resultsArray[0]);
  }

  if (!results || resultsArray.length === 0) {
    return (
      <div className="text-center py-20 zen-fade-in">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-zen-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 zen-shadow-lg zen-float">
            <Search className="h-10 w-10 text-white icon-strong" />
          </div>
          <h3 className="text-2xl font-bold text-text-primary mb-4">Ready to Research</h3>
          <p className="text-lg text-text-secondary mb-8 leading-relaxed">
            Enter a query above to begin your deep research journey and discover comprehensive insights
          </p>
          <div className="bg-white/40 dark:bg-black/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-center space-x-2 text-zen-accent">
              <Sparkles className="h-5 w-5 icon-strong" />
              <span className="text-sm font-medium">AI-Powered Analysis</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const result = resultsArray[0];

  // Check if result has the expected structure
  if (!result || !result.output) {
    return (
      <div className="text-center py-20 zen-fade-in">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Search className="h-10 w-10 text-red-500 dark:text-red-400 icon-strong" />
          </div>
          <h3 className="text-2xl font-bold text-text-primary mb-4">No Results Available</h3>
          <p className="text-lg text-text-secondary mb-8 leading-relaxed">
            Unable to retrieve research results. Please check your n8n connection and try again.
          </p>
        </div>
      </div>
    );
  }

  const parseMarkdown = (markdown: string) => {
    // Basic markdown parsing for display
    return markdown
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-6 text-text-primary border-b-2 border-zen-border pb-2">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mb-4 mt-8 text-text-primary">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-medium mb-3 mt-6 text-text-primary">$1</h3>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-semibold text-text-primary">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
      .replace(/^[\*\-] (.*)$/gim, '<li class="mb-2 leading-relaxed">$1</li>')
      .replace(/^\d+\. (.*)$/gim, '<li class="mb-2 leading-relaxed">$1</li>')
      .replace(/`(.*?)`/gim, '<code class="bg-zen-muted px-3 py-1 rounded-md text-sm font-mono text-text-primary border border-zen-border">$1</code>')
      .replace(/^> (.*)$/gim, '<blockquote class="border-l-4 border-zen-accent pl-6 italic text-text-secondary mb-6 py-3 bg-gradient-to-r from-zen-muted to-transparent rounded-r-lg">$1</blockquote>')
      .replace(/\n\n/gim, '</p><p class="mb-6 text-text-secondary leading-relaxed text-lg">')
      .replace(/(<li.*<\/li>)/gi, '<ul class="mb-6 pl-6 list-disc text-text-secondary space-y-2">$1</ul>')
      .replace(/^(?!<[h|u|l|b|p])(.*)$/gim, '<p class="mb-6 text-text-secondary leading-relaxed text-lg">$1</p>');
  };

  return (
    <div className="zen-fade-in">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-3xl font-bold text-text-primary mb-3">Research Results</h3>
            <div className="flex items-center text-text-secondary text-lg">
              <Clock className="h-5 w-5 mr-2 icon-strong" />
              <span>Just now</span>
              <span className="mx-3">•</span>
              <span>Query: "<span className="font-semibold text-text-primary">{query}</span>"</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-white/60 dark:bg-black/60 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
            <BookOpen className="h-5 w-5 text-zen-accent icon-strong" />
            <span className="text-sm font-medium text-text-secondary">AI Analysis</span>
          </div>
        </div>
      </div>
      
      {/* Format Toggle */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 bg-white/60 dark:bg-black/60 backdrop-blur-sm rounded-xl p-1 w-fit shadow-lg">
          <Button
            variant={showMarkdown ? "default" : "ghost"}
            size="sm"
            onClick={() => setShowMarkdown(true)}
            className={`px-4 py-2 rounded-lg text-sm font-medium zen-transition ${
              showMarkdown 
                ? 'bg-zen-gradient-primary text-white shadow-md' 
                : 'text-text-secondary hover:text-text-primary hover:bg-white/50 dark:hover:bg-black/50'
            }`}
          >
            Markdown
          </Button>
          <Button
            variant={!showMarkdown ? "default" : "ghost"}
            size="sm"
            onClick={() => setShowMarkdown(false)}
            className={`px-4 py-2 rounded-lg text-sm font-medium zen-transition ${
              !showMarkdown 
                ? 'bg-zen-gradient-primary text-white shadow-md' 
                : 'text-text-secondary hover:text-text-primary hover:bg-white/50 dark:hover:bg-black/50'
            }`}
          >
            HTML
          </Button>
        </div>
      </div>

      {/* Results Display */}
      <Card className="bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-2xl border border-zen-border shadow-xl overflow-hidden">
        <div className="p-8">
          {showMarkdown ? (
            <div 
              className="markdown-content prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(result.output) }}
            />
          ) : (
            <div 
              className="prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: result.output_html || parseMarkdown(result.output) }}
            />
          )}
        </div>
      </Card>

      {/* Footer with additional info */}
      <div className="mt-8 text-center">
        <div className="bg-white/40 dark:bg-black/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-center space-x-4 text-text-secondary">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-zen-accent icon-strong" />
              <span className="text-sm">AI-Powered Research</span>
            </div>
            <div className="w-1 h-1 bg-zen-border rounded-full"></div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 icon-strong" />
              <span className="text-sm">Real-time Analysis</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
