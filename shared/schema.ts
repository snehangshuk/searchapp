import { z } from "zod";

export const searchRequestSchema = z.object({
  query: z.string().min(1, "Query cannot be empty").max(1000, "Query too long"),
});

export const searchResponseSchema = z.array(z.object({
  output: z.string(),
  output_html: z.string(),
}));

export const searchHistoryItemSchema = z.object({
  id: z.string(),
  query: z.string(),
  timestamp: z.string(),
  results: searchResponseSchema.optional(),
});

export type SearchRequest = z.infer<typeof searchRequestSchema>;
export type SearchResponse = z.infer<typeof searchResponseSchema>;
export type SearchHistoryItem = z.infer<typeof searchHistoryItemSchema>;
