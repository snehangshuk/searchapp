# Environment Configuration

This application uses environment variables for configuration. Create a `.env` file in the project root with the following variables:

## Required Environment Variables

```bash
# N8N Webhook Configuration
N8N_WEBHOOK_URL=http://127.0.0.1:5678/webhook-test/search

# Server Configuration  
PORT=5000
NODE_ENV=development
```

## Setting up the .env file

1. Create a `.env` file in the project root directory
2. Copy the variables above and adjust the values as needed
3. The `.env` file is automatically ignored by git for security

## Configuration Options

- **N8N_WEBHOOK_URL**: The complete URL to your n8n webhook endpoint
  - Default: `http://127.0.0.1:5678/webhook-test/search`
  - Examples:
    - `http://localhost:5678/webhook-test/search`
    - `http://192.168.0.154:5678/webhook-test/search`
    - `https://your-n8n-instance.com/webhook-test/search`

- **PORT**: The port for the development server
  - Default: `5000`

- **NODE_ENV**: The application environment
  - Default: `development`
  - Options: `development`, `production`

## Security Notes

- Never commit the `.env` file to version control
- Use different webhook URLs for different environments
- Consider using secrets management for production deployments
