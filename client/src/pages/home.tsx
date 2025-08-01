import { useState } from "react";
import { SearchInterface } from "@/components/search-interface";
import { SearchHistory } from "@/components/search-history";
import { SearchResults } from "@/components/search-results";
import { useSearchHistory } from "@/hooks/use-search-history";
import { Button } from "@/components/ui/button";
import { Search, History, X } from "lucide-react";
import type { SearchResponse } from "@shared/schema";

export default function Home() {
  const [currentResults, setCurrentResults] = useState<SearchResponse | null>(null);
  const [currentQuery, setCurrentQuery] = useState<string>("");
  const [isMobileHistoryOpen, setIsMobileHistoryOpen] = useState(false);
  const { searchHistory, addToHistory, clearHistory } = useSearchHistory();

  const handleSearchComplete = (query: string, results: SearchResponse) => {
    setCurrentQuery(query);
    setCurrentResults(results);
    addToHistory(query, results);
  };

  const handleHistoryItemClick = (query: string, results?: SearchResponse) => {
    setCurrentQuery(query);
    if (results) {
      setCurrentResults(results);
    }
    setIsMobileHistoryOpen(false);
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Search className="text-white text-sm" size={16} />
              </div>
              <h1 className="text-xl font-semibold text-text-primary">Deep Research</h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2 text-text-secondary hover:text-text-primary"
              onClick={() => setIsMobileHistoryOpen(true)}
            >
              <History size={18} />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex min-h-screen">
        {/* Desktop Search History Sidebar */}
        <div className="hidden lg:block w-80 bg-white border-r border-border overflow-y-auto">
          <SearchHistory
            searchHistory={searchHistory}
            onHistoryItemClick={handleHistoryItemClick}
            onClearHistory={clearHistory}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Search Section */}
          <div className="bg-white border-b border-border">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-text-primary mb-2">
                  AI-Powered Deep Research
                </h2>
                <p className="text-text-secondary">
                  Enter your research query and get comprehensive insights
                </p>
              </div>
              
              <SearchInterface
                onSearchComplete={handleSearchComplete}
                initialQuery={currentQuery}
              />
            </div>
          </div>

          {/* Results Section */}
          <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            <SearchResults
              results={currentResults}
              query={currentQuery}
            />
          </div>
        </div>
      </div>

      {/* Mobile History Overlay */}
      {isMobileHistoryOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-text-primary">Search History</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileHistoryOpen(false)}
                >
                  <X size={18} />
                </Button>
              </div>
              <SearchHistory
                searchHistory={searchHistory}
                onHistoryItemClick={handleHistoryItemClick}
                onClearHistory={clearHistory}
                isMobile
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
