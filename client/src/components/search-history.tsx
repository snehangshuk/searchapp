import { Button } from "@/components/ui/button";
import { Clock, Trash2, Sparkles, History } from "lucide-react";
import type { SearchHistoryItem } from "@shared/schema";

interface SearchHistoryProps {
  searchHistory: SearchHistoryItem[];
  onHistoryItemClick: (query: string, results?: any) => void;
  onClearHistory: () => void;
  isMobile?: boolean;
}

export function SearchHistory({ 
  searchHistory, 
  onHistoryItemClick, 
  onClearHistory,
  isMobile = false 
}: SearchHistoryProps) {
  const getRelativeTime = (timestamp: string) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now.getTime() - past.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffHrs > 24) return `${Math.floor(diffHrs / 24)} days ago`;
    if (diffHrs > 0) return `${diffHrs} hours ago`;
    if (diffMins > 0) return `${diffMins} minutes ago`;
    return 'Just now';
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear your search history?')) {
      onClearHistory();
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-zen-gradient-primary rounded-xl flex items-center justify-center zen-shadow">
            <History className="text-white text-lg icon-strong" size={18} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Search History</h2>
            <p className="text-sm text-text-secondary">Your research journey</p>
          </div>
        </div>
        {searchHistory.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearHistory}
            className="text-text-secondary hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl zen-transition p-2"
          >
            <Trash2 size={18} className="icon-strong" />
          </Button>
        )}
      </div>
      
      {searchHistory.length === 0 ? (
        <div className="text-center py-12 zen-fade-in">
          <div className="w-16 h-16 bg-zen-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Clock className="h-8 w-8 text-text-secondary opacity-60 icon-strong" />
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-2">No Search History</h3>
          <p className="text-sm text-text-secondary mb-4">Your research queries will appear here</p>
          <div className="bg-white/40 dark:bg-black/40 backdrop-blur-sm rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-center space-x-2 text-zen-accent">
              <Sparkles className="h-4 w-4 icon-strong" />
              <span className="text-xs font-medium">Start exploring to build your history</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {searchHistory.map((item, index) => (
            <div
              key={item.id}
              onClick={() => onHistoryItemClick(item.query, item.results)}
              className="p-4 rounded-xl border border-zen-border hover:bg-white/60 dark:hover:bg-black/60 hover:shadow-lg cursor-pointer zen-transition hover:scale-[1.02] bg-white/40 dark:bg-black/40 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary mb-2 line-clamp-2 leading-relaxed">
                    {item.query}
                  </div>
                  <div className="flex items-center text-xs text-text-secondary">
                    <Clock className="h-3 w-3 mr-1 icon-strong" />
                    {getRelativeTime(item.timestamp)}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="w-2 h-2 bg-zen-accent rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer info */}
      {searchHistory.length > 0 && (
        <div className="mt-8 pt-6 border-t border-zen-border">
          <div className="text-center">
            <div className="bg-white/40 dark:bg-black/40 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="flex items-center justify-center space-x-2 text-text-secondary">
                <Sparkles className="h-4 w-4 text-zen-accent icon-strong" />
                <span className="text-xs font-medium">{searchHistory.length} research queries</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
