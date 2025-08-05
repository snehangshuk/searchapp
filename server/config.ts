/**
 * Environment Configuration
 * 
 * This file documents the required environment variables.
 * Create a .env file in the root directory with these variables:
 * 
 * N8N_WEBHOOK_URL=http://127.0.0.1:5678/webhook-test/search
 * PORT=5000
 * NODE_ENV=development
 */

import { config as loadEnv } from 'dotenv';

// Load environment variables from .env file
loadEnv();

// Validate required environment variables
if (!process.env.N8N_WEBHOOK_URL) {
  throw new Error("N8N_WEBHOOK_URL environment variable is required. Please set it in your .env file.");
}

export const config = {
  // N8N Webhook URL - required via N8N_WEBHOOK_URL environment variable
  webhookUrl: process.env.N8N_WEBHOOK_URL,
  
  // Server port - configurable via PORT environment variable  
  port: parseInt(process.env.PORT || '5000', 10),
  
  // Node environment
  nodeEnv: process.env.NODE_ENV || 'development'
};
