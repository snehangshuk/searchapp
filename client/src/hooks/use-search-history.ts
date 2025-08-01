import { useState, useEffect } from "react";
import type { SearchHistoryItem, SearchResponse } from "@shared/schema";

const STORAGE_KEY = "deep-research-history";
const MAX_HISTORY_ITEMS = 50;

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSearchHistory(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error("Failed to parse search history:", error);
        setSearchHistory([]);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(searchHistory));
  }, [searchHistory]);

  const addToHistory = (query: string, results?: SearchResponse) => {
    const historyItem: SearchHistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      query,
      timestamp: new Date().toISOString(),
      results,
    };

    setSearchHistory(prev => {
      // Remove existing item with same query
      const filtered = prev.filter(item => item.query !== query);
      
      // Add new item to beginning and limit total items
      return [historyItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
    });
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getHistoryItem = (id: string) => {
    return searchHistory.find(item => item.id === id);
  };

  return {
    searchHistory,
    addToHistory,
    clearHistory,
    getHistoryItem,
  };
}
