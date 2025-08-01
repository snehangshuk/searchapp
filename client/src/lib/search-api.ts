import { apiRequest } from "./queryClient";
import type { SearchRequest, SearchResponse } from "@shared/schema";

export const searchApi = {
  async search(request: SearchRequest): Promise<SearchResponse> {
    const response = await apiRequest("POST", "/api/search", request);
    return response.json();
  },
};
