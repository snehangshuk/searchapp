import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { searchRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Proxy route to n8n webhook
  app.post("/api/search", async (req, res) => {
    try {
      // Validate request body
      const { query } = searchRequestSchema.parse(req.body);

      // Make request to n8n webhook
      const n8nResponse = await fetch("http://localhost:5678/webhook-test/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!n8nResponse.ok) {
        throw new Error(`n8n webhook responded with status: ${n8nResponse.status}`);
      }

      const data = await n8nResponse.json();
      res.json(data);
    } catch (error) {
      console.error("Search API error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid request", 
          errors: error.errors 
        });
      }

      if (error instanceof Error) {
        if (error.message.includes("fetch")) {
          return res.status(503).json({ 
            message: "Unable to connect to research service. Please ensure n8n is running on localhost:5678" 
          });
        }
        return res.status(500).json({ message: error.message });
      }

      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
