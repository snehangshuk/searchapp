import { useState } from "react";
import { SearchInterface } from "@/components/search-interface";
import { SearchHistory } from "@/components/search-history";
import { SearchResults } from "@/components/search-results";
import { useSearchHistory } from "@/hooks/use-search-history";
import { Button } from "@/components/ui/button";
import { Search, History, X, Sparkles } from "lucide-react";
import { ZenBackground, ZenSection } from "@/components/ui/zen-background";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import type { SearchResponse } from "@shared/schema";

export default function Home() {
  const [currentResults, setCurrentResults] = useState<SearchResponse | null>(null);
  const [currentQuery, setCurrentQuery] = useState<string>("");
  const [isMobileHistoryOpen, setIsMobileHistoryOpen] = useState(false);
  const { searchHistory, addToHistory, clearHistory } = useSearchHistory();

  const handleSearchComplete = (query: string, results: SearchResponse) => {
    console.log("handleSearchComplete called with:", { query, results });
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
    <ZenBackground>
      {/* Header */}
      <header className="bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-zen-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-zen-gradient-primary rounded-2xl flex items-center justify-center zen-shadow">
                <Search className="text-white text-lg icon-strong" size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-text-primary">Deep Research</h1>
                <p className="text-sm text-text-secondary">AI-Powered Knowledge Discovery</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-3 text-text-secondary hover:text-text-primary hover:bg-zen-muted rounded-xl zen-transition"
                onClick={() => setIsMobileHistoryOpen(true)}
              >
                <History className="h-5 w-5 icon-strong" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex min-h-screen">
        {/* Desktop Search History Sidebar */}
        <div className="hidden lg:block w-96 bg-white/60 dark:bg-black/60 backdrop-blur-sm border-r border-zen-border overflow-y-auto">
          <SearchHistory
            searchHistory={searchHistory}
            onHistoryItemClick={handleHistoryItemClick}
            onClearHistory={clearHistory}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Search Section */}
          <ZenSection className="border-b border-zen-border">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="text-center mb-12 zen-fade-in">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-zen-gradient-primary rounded-3xl flex items-center justify-center zen-shadow-lg zen-float">
                    <Sparkles className="text-white text-2xl icon-strong" size={28} />
                  </div>
                </div>
                <h2 className="text-4xl font-bold text-text-primary mb-4">
                  Discover Deep Insights
                </h2>
                <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                  Enter your research query and unlock comprehensive knowledge with AI-powered analysis
                </p>
              </div>
              
              <div className="zen-fade-in" style={{ animationDelay: '0.2s' }}>
                <SearchInterface
                  onSearchComplete={handleSearchComplete}
                  initialQuery={currentQuery}
                />
              </div>
            </div>
          </ZenSection>

          {/* Results Section */}
          <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
            <div className="zen-fade-in" style={{ animationDelay: '0.4s' }}>
              <SearchResults
                results={currentResults}
                query={currentQuery}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile History Overlay */}
      {isMobileHistoryOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 zen-transition">
          <div className="fixed right-0 top-0 h-full w-96 bg-white/95 dark:bg-black/95 backdrop-blur-sm shadow-2xl zen-transition">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold text-text-primary">Search History</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileHistoryOpen(false)}
                  className="p-2 hover:bg-zen-muted rounded-xl zen-transition"
                >
                  <X className="h-5 w-5 icon-strong" size={20} />
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
    </ZenBackground>
  );
}
