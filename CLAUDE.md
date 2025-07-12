# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server with Turbopack on port 9002
npm run dev

# Start Genkit development server for AI features
npm run genkit:dev

# Start Genkit with watch mode for AI development
npm run genkit:watch

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Run type checking
npm run typecheck
```

## Architecture Overview

This is a **Next.js 15 portfolio website** for Sameer Alam Shaikh, featuring mobile app development projects and AI capabilities.

### Key Technologies
- **Next.js 15** with Turbopack for development
- **TypeScript** for type safety
- **Tailwind CSS** with shadcn/ui components
- **Google Genkit AI** integration for AI features
- **Radix UI** components for accessibility
- **React Hook Form** with Zod validation

### Project Structure
- `src/app/` - Next.js app router pages and layout
- `src/components/` - Reusable React components
  - `layout/` - Header and Footer components
  - `sections/` - Page sections (Hero, About, Projects, Contact)
  - `ui/` - shadcn/ui component library
- `src/ai/` - Google Genkit AI configuration and development
- `src/services/` - Application services and stores
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility functions

### AI Integration
The project uses Google Genkit with Gemini 2.0 Flash model. AI instance is configured in `src/ai/ai-instance.ts` and requires `GOOGLE_GENAI_API_KEY` environment variable.

### Design System
Following Swiss Design principles with:
- Primary: Dark blue (#1A237E)
- Secondary: Light gray (#F5F5F5)  
- Accent: Teal (#00ACC1)
- Geist Sans font family
- Grid-based layout with minimalist approach

### Components Architecture
- **shadcn/ui**: Complete UI component library in `src/components/ui/`
- **Layout**: Header/Footer with responsive design
- **Sections**: Modular page sections for portfolio content
- **ProjectCard**: Displays mobile app projects with details

### Key Features
- Mobile app project showcase
- Contact form functionality
- Social media integration
- Responsive design with mobile-first approach
- Toast notifications system