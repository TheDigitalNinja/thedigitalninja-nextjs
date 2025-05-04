# Copilot Instructions for The Digital Ninja Project

## Project Overview
- **Name**: thedigitalninja-nextjs
- **Purpose**: Personal website and blog for TheDigital.Ninja ([https://TheDigital.Ninja](https://TheDigital.Ninja))
- **Framework**: Next.js 14.2.28 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4.1
- **UI Components**: Headless UI 2.1.1
- **Authentication**: Firebase Authentication (Google Sign-In) - See `src/lib/firebase.ts` and `src/hooks/useAuth.ts`
- **CMS (Photos)**: Sanity.io - See `sanity/` directory and `src/lib/sanity.ts`
- **Blog Content**: Markdown files in `posts/` parsed with `gray-matter` and `marked`
- **Microblog Content**: Sanity.io - See `src/lib/sanity-microposts.ts`
- **Testing**: Cypress for E2E tests - See `cypress/` directory and `cypress.config.ts`

## Key Files & Directories
- `src/app/`: Next.js App Router pages and layouts
- `src/components/`: Reusable React components
- `src/lib/`: Utility functions, Firebase/Sanity clients, content fetching logic
- `posts/`: Markdown blog posts
- `sanity/`: Sanity schema and configuration
- `cypress/`: End-to-end tests
- `CLAUDE.md`: Existing guidelines (potentially for another AI)
- `README.md`: Project overview, setup, and scripts

## Development Workflow & Commands
- **Install**: `npm ci`
- **Run Dev Server**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Run All Tests**: `npm test` (Starts dev server + runs Cypress)
- **Run Cypress Interactively**: `npm run cypress:open` (Assumes dev server is running)
- **Run Specific Test**: `npx cypress run --spec cypress/e2e/specific_test.cy.ts`

Refer to `README.md` and `CLAUDE.md` for more detailed commands and workflow steps.

## Code Style & Conventions
- Follow Next.js App Router conventions.
- Use TypeScript with strict typing. Define interfaces/types for props and data structures.
- Use path aliases (e.g., `@/components/*`). Check `tsconfig.json`.
- Functional components with hooks.
- Use Tailwind CSS for styling.
- Keep components modular and reusable.
- Follow naming conventions (PascalCase for components/types, camelCase for functions/variables, kebab-case for filenames).

## Important Considerations
- **Authentication**: Client-side Firebase auth is used. Check `AuthProvider.tsx` and `useAuth.ts`.
- **Content Sources**: Blog posts from Markdown, Photos and Microposts from Sanity.io.
- **Environment Variables**: Ensure `.env.local` is configured with Firebase and Sanity keys (see `.env.local.example`).
- **Testing**: Prefer using existing Cypress commands in `cypress/support/commands.ts`. Ensure tests pass (`npm test`) before committing.
- **State Management**: Primarily React context (`AuthProvider`) and component state. No complex state management library currently used.
- **API Routes**: Located in `src/app/api/`.
- **Image Handling**: Use Next.js `<Image>` component with Cloudinary or Sanity CDN configured in `next.config.mjs`.

## Task-Specific Instructions
- **Adding a new page**: Create a new folder under `src/app/` with a `page.tsx` file. Update navigation/links if necessary.
- **Modifying a component**: Locate the component in `src/components/`. Ensure props types are updated if changed.
- **Writing tests**: Add new `.cy.ts` files in `cypress/e2e/`. Utilize existing custom commands or add new ones to `cypress/support/commands.ts`.
- **Updating dependencies**: Use `npm update <package>` or `npm install <package>@latest`. Run `npm test` after updates.
- **Working with Sanity**: Schema changes in `sanity/schema.ts`. Test content fetching logic in `src/lib/sanity.ts` or `src/lib/sanity-microposts.ts`. Access Studio via `/studio`.
