import { Button } from "@/components/ui/button";
import { Clock, Trash2 } from "lucide-react";
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
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-text-primary">Search History</h2>
        {searchHistory.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearHistory}
            className="text-text-secondary hover:text-red-500 transition-colors"
          >
            <Trash2 size={16} />
          </Button>
        )}
      </div>
      
      {searchHistory.length === 0 ? (
        <div className="text-center py-8 text-text-secondary">
          <Clock className="h-8 w-8 mx-auto mb-3 opacity-50" />
          <p className="text-sm">No search history yet</p>
          <p className="text-xs mt-1 opacity-75">Your searches will appear here</p>
        </div>
      ) : (
        <div className="space-y-2">
          {searchHistory.map((item) => (
            <div
              key={item.id}
              onClick={() => onHistoryItemClick(item.query, item.results)}
              className="p-3 rounded-lg border border-border hover:bg-surface cursor-pointer transition-colors"
            >
              <div className="text-sm font-medium text-text-primary mb-1 line-clamp-2">
                {item.query}
              </div>
              <div className="text-xs text-text-secondary">
                {getRelativeTime(item.timestamp)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
