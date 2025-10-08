# Maison Noir - Coming Soon 2026

## Overview

Maison Noir is a luxury creative agency website featuring a "coming soon" landing page for 2026. The project presents an elegant, minimalist design inspired by high-end fashion brands like Chanel and Saint Laurent. Built with React, TypeScript, and Tailwind CSS, it showcases the agency's three creative divisions (NOIR STUDIO, NOIR RECORDS, NOIR DIGITAL) through animated dropdown sections with smooth, cinematic transitions.

The application follows a modern monorepo structure with a Vite-powered React frontend and Express.js backend, utilizing shadcn/ui components for consistent UI patterns and Drizzle ORM for database operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tools**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing

**UI Component Strategy**
- shadcn/ui component library (New York style variant) for consistent, accessible UI components
- All components built with Radix UI primitives for accessibility
- HeadlessUI and Framer Motion for custom animated dropdown interactions
- Component aliases configured for clean imports (`@/components`, `@/lib`, `@/hooks`)

**Styling System**
- Tailwind CSS with custom design tokens matching luxury brand aesthetic
- Dark mode as default with deep black (`#0a0a0a`) background
- Three-color palette: deep black, silver (`#e5e5e5`), and soft gold (`#c6a664`)
- Custom CSS variables for theme colors and elevation states
- Typography: Playfair Display (serif) for titles, Inter (sans-serif) for body text

**State Management**
- TanStack Query (React Query) for server state management
- Custom query client configuration with credential-based API requests
- No global state library needed for current landing page scope

### Backend Architecture

**Server Framework**
- Express.js with TypeScript for API endpoints
- ESM module system throughout the codebase
- Custom request logging middleware tracking API response times and payloads

**Development Setup**
- Vite middleware integration for seamless SSR-like development experience
- Hot module replacement during development
- Production build outputs static assets to `dist/public`

**Storage Layer**
- In-memory storage implementation (`MemStorage`) as default
- Storage interface (`IStorage`) designed for easy swapping to persistent solutions
- User CRUD operations defined but minimal implementation for current scope

**API Design**
- Routes prefixed with `/api` for clear separation
- Placeholder route structure ready for expansion
- Error handling middleware for consistent error responses

### Data Storage

**Database Setup**
- Drizzle ORM configured for PostgreSQL via `@neondatabase/serverless`
- Schema location: `shared/schema.ts` for isomorphic access
- Migration directory: `./migrations`
- Database URL expected via environment variable

**Current Schema**
- Users table with UUID primary keys, username, and password fields
- Zod schemas generated from Drizzle for runtime validation
- Schema shared between client and server via shared directory

**Alternative Storage**
- Current implementation uses in-memory storage for development
- Database infrastructure prepared but not actively used in landing page
- Easy migration path to PostgreSQL when backend features expand

### External Dependencies

**UI & Animation Libraries**
- @headlessui/react: Unstyled, accessible UI components for dropdowns
- framer-motion: Animation library for smooth transitions and micro-interactions
- Radix UI suite: Accessible component primitives (40+ components available)
- lucide-react: Icon library for consistent iconography

**Development & Build Tools**
- TypeScript compiler for type checking
- esbuild: Fast bundler for production server code
- PostCSS with Tailwind for CSS processing
- Vite plugins for Replit-specific features (error overlay, cartographer, dev banner)

**Database & ORM**
- drizzle-orm: Type-safe ORM for database operations
- drizzle-kit: CLI tool for schema migrations and management
- @neondatabase/serverless: Postgres client optimized for serverless
- drizzle-zod: Bridge between Drizzle schemas and Zod validation

**Utility Libraries**
- zod: Runtime type validation and schema definition
- date-fns: Date manipulation utilities
- class-variance-authority: Type-safe variant generation for components
- clsx & tailwind-merge: Conditional className utilities

**Form Management**
- react-hook-form: Performant form state management
- @hookform/resolvers: Zod resolver integration for form validation

**Session & Storage**
- connect-pg-simple: PostgreSQL session store for Express (prepared for future use)
- Currently no active session management in landing page