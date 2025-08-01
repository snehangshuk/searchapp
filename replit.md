# Overview

This is a deep research application that provides a web-based interface for conducting comprehensive research queries. The system consists of a React frontend with shadcn/ui components and an Express.js backend that acts as a proxy to an external n8n webhook service. Users can submit research queries through an intuitive interface and receive detailed research results with both markdown and HTML formatted outputs. The application includes search history functionality with local storage persistence and responsive design for both desktop and mobile experiences.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with CSS variables for theming and design tokens

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API with a single `/api/search` endpoint that proxies requests
- **External Integration**: Acts as a proxy to an n8n webhook service running on localhost:5678
- **Error Handling**: Comprehensive error handling with proper HTTP status codes and user-friendly messages
- **Request Validation**: Zod schemas for request/response validation

## Data Storage
- **Client-side Storage**: localStorage for persisting search history (max 50 items)
- **Database Setup**: Drizzle ORM configured for PostgreSQL with migrations support (via Neon Database)
- **In-memory Storage**: Temporary user storage implementation using Map structure for development

## Key Design Patterns
- **Proxy Pattern**: Backend serves as a proxy to external n8n research service
- **Component Composition**: Modular React components with clear separation of concerns
- **Custom Hooks**: Reusable logic for search history management and mobile detection
- **Response Caching**: TanStack Query provides automatic caching of API responses
- **Mobile-first Design**: Responsive layout with mobile sidebar and adaptive components

## Development Workflow
- **Hot Reloading**: Vite development server with HMR support
- **Type Safety**: Full TypeScript coverage across frontend, backend, and shared schemas
- **Build Process**: Separate build processes for client (Vite) and server (esbuild)
- **Development Tools**: Replit-specific plugins for enhanced development experience

# External Dependencies

## Core Runtime Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity via Neon
- **drizzle-orm**: Type-safe database ORM with PostgreSQL dialect
- **@tanstack/react-query**: Server state management and caching
- **express**: Node.js web framework for REST API
- **zod**: Runtime type validation and schema definition

## UI Component Libraries
- **@radix-ui/***: Comprehensive set of unstyled, accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant creation for components
- **clsx**: Conditional className utility

## Development and Build Tools
- **vite**: Fast build tool and development server
- **typescript**: Static type checking
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production builds
- **drizzle-kit**: Database migration and schema management

## External Services Integration
- **n8n Webhook Service**: External research service running on localhost:5678 that processes search queries and returns formatted research results
- **Replit Platform**: Development environment with specific plugins for enhanced development experience

## Browser APIs and Standards
- **localStorage**: Client-side persistence for search history
- **Fetch API**: HTTP client for API requests
- **Web History API**: Client-side routing via Wouter
- **CSS Custom Properties**: Theme customization and design tokens