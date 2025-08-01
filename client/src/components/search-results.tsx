import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Search } from "lucide-react";
import type { SearchResponse } from "@shared/schema";

interface SearchResultsProps {
  results: SearchResponse | null;
  query: string;
}

export function SearchResults({ results, query }: SearchResultsProps) {
  const [showMarkdown, setShowMarkdown] = useState(true);

  if (!results || results.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="h-8 w-8 text-text-secondary opacity-50" />
        </div>
        <h3 className="text-xl font-medium text-text-primary mb-2">Ready to Research</h3>
        <p className="text-text-secondary mb-6">Enter a query above to start your deep research</p>
      </div>
    );
  }

  const result = results[0];

  const parseMarkdown = (markdown: string) => {
    // Basic markdown parsing for display
    return markdown
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4 text-text-primary">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mb-3 text-text-primary">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-medium mb-2 text-text-primary">$1</h3>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-semibold text-text-primary">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
      .replace(/^[\*\-] (.*)$/gim, '<li class="mb-1">$1</li>')
      .replace(/^\d+\. (.*)$/gim, '<li class="mb-1">$1</li>')
      .replace(/`(.*?)`/gim, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-text-primary">$1</code>')
      .replace(/^> (.*)$/gim, '<blockquote class="border-l-4 border-primary pl-4 italic text-text-secondary mb-4">$1</blockquote>')
      .replace(/\n\n/gim, '</p><p class="mb-4 text-text-secondary leading-relaxed">')
      .replace(/(<li.*<\/li>)/gis, '<ul class="mb-4 pl-5 list-disc text-text-secondary">$1</ul>')
      .replace(/^(?!<[h|u|l|b|p])(.*)$/gim, '<p class="mb-4 text-text-secondary leading-relaxed">$1</p>');
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-text-primary mb-2">Research Results</h3>
        <div className="flex items-center text-text-secondary text-sm">
          <Clock className="h-4 w-4 mr-1" />
          <span>Just now</span>
          <span className="mx-2">•</span>
          <span>Query: "<span className="font-medium">{query}</span>"</span>
        </div>
      </div>
      
      {/* Format Toggle */}
      <div className="mb-6">
        <div className="flex items-center space-x-1 bg-surface rounded-lg p-1 w-fit">
          <Button
            variant={showMarkdown ? "default" : "ghost"}
            size="sm"
            onClick={() => setShowMarkdown(true)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              showMarkdown 
                ? 'bg-white text-text-primary shadow-sm' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Markdown
          </Button>
          <Button
            variant={!showMarkdown ? "default" : "ghost"}
            size="sm"
            onClick={() => setShowMarkdown(false)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              !showMarkdown 
                ? 'bg-white text-text-primary shadow-sm' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            HTML
          </Button>
        </div>
      </div>

      {/* Results Display */}
      <Card className="bg-white rounded-xl border border-border shadow-sm">
        <div className="p-6">
          {showMarkdown ? (
            <div 
              className="markdown-content prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(result.output) }}
            />
          ) : (
            <div 
              className="prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: result.output_html }}
            />
          )}
        </div>
      </Card>
    </div>
  );
}
