# Agent Instructions for TheDigital.Ninja Website

## Project Overview
- **Name**: thedigitalninja-nextjs
- **Purpose**: Personal website and blog for TheDigital.Ninja https://TheDigital.Ninja
- **Repo**: https://github.com/TheDigitalNinja/thedigitalninja-nextjs
- **Framework**: Next.js 15.3.6 with App Router
- **Blog Content**: Markdown files in `posts/` parsed with `gray-matter` (4.0.3) and `marked` (13.0.1)
- **CMS (Photos & Microposts)**: Sanity.io - See `sanity/` directory, shared client in `src/lib/sanity-client.ts`, photo helpers in `src/lib/sanity-photo-albums.ts`
- **Feed / Micropost Content**: A social media type section using Sanity.io - See `src/lib/sanity-microposts.ts`
- **Testing**: Cypress for E2E tests - See `cypress/` directory and `cypress.config.ts`

## Key Files & Directories
- `src/app/`: Next.js App Router pages and layouts
- `src/app/(main)`: Most pages and using the main layout with sidebar
- `src/app/(clean)`: resume and privacy page using a basic layout without a sidebar
- `src/components/`: Reusable React components
- `src/lib/`: Utility functions, Firebase/Sanity clients, content fetching logic
- `posts/`: Markdown blog posts
- `sanity/`: Sanity schema and configuration
- `cypress/`: End-to-end tests
- `scripts/`: Utility scripts (`index-now.js` for IndexNow submissions, `generate-posts-readme.cjs` for auto generating the posts/README.md)

## Key Technologies
- Next.js 15.3.6 with App Router
- TypeScript 5.x
- React 19.1.2
- Tailwind CSS 3.4.1
- Headless UI 2.2.2 for UI Components
- Firebase Authentication (Google Sign-In) - See `src/lib/firebase.ts` and `src/hooks/useAuth.ts`
- Sanity.io (for photo gallery & micropost management)
- gray-matter 4.0.3 (for parsing Markdown front matter)
- marked 13.0.1 (for rendering Markdown)
- PrismJS for code highlighting
- @heroicons/react and react-icons for iconography
- @tailwindcss/typography for Markdown styling

## Development Workflow & Commands
1. Complete feature implementation.
2. Test manually to verify functionality.
3. Run `npm run lint`
4. Run `npm test` to execute all Cypress tests.
5. Run `npm run build` to ensure it builds successfully.

Notes:
- `npm test` starts the dev server automatically; `cypress:run` assumes a running server.
- Verification is mandatory: run, in this order, `npm run lint`, `npm test` (or npm test --spec … if scoped), then `npm run build`. Do not skip unless the user explicitly says to. Summarize results (pass/fail/omitted with reason) in your final message.

## Agent Usage
- Do not run `git commit`, `git push`, or any other commands that change remote branches; leave committing/pushing to the user.
- Always run npm run lint, npm test, and npm run build before handing off work, unless the user explicitly instructs otherwise.
- Run verification commands exactly as written from the current working directory; do not prepend any `cd` or path changes (e.g., use `npm run lint`, not `cd path && npm run lint`).
- If a verify command is skipped or fails, call it out clearly in your summary.
- Do not edit `.env*` files or commit secrets; use `.env.local` locally if needed.
- Never run or suggest `cd`, `pwd`, or any command that changes or inspects the working directory; assume the correct root and only run the allowed npm scripts.

## Code Style & Conventions
- Follow Next.js App Router conventions and maintain consistent indentation.
- Use TypeScript with strict typing. Define interfaces/types for props and data structures.
- Use path aliases (e.g., `@/components/*`). Check `tsconfig.json`.
- Functional components with hooks.
- Use Tailwind CSS for styling.
- Keep components modular and reusable.
- Follow naming conventions (PascalCase for components/types, camelCase for functions/variables, kebab-case for filenames).
- Implement proper error boundaries and type checking.

## Ticket Creation
Kanban Project URL: https://github.com/users/TheDigitalNinja/projects/3
- Use a short, imperative title (8-10 words)
- This is a solo project—don’t include meta lines like "let me know…" or questions aimed back at the user. Just state requirements and acceptance criteria.
- Do not specify copy or exact UI text unless I provide it.
- After drafting the issue, scan the repo and add a “Likely files to edit” section listing the main file paths/components involved (homepage recent posts + /blog index + data source), with a brief reason per path.

## Important Considerations
- **Authentication**: Client-side Firebase auth is used. Check `AuthProvider.tsx` and `useAuth.ts`.
- **Content Sources**: Blog posts from Markdown, Photos and Microposts/Feed from Sanity.io.
- **Environment Variables**: Ensure `.env.local` is configured with Firebase and Sanity keys (see `.env.local.example`).
- **Testing**: Prefer using existing Cypress commands in `cypress/support/commands.ts`. Ensure tests pass (`npm test`) before committing.
- **State Management**: Primarily React context (`AuthProvider`) and component state. No complex state management library currently used.
- **Image Handling**: Use Next.js `<Image>` component with Cloudinary or Sanity CDN configured in `next.config.mjs`.
- **Runtime Config**: `reactStrictMode` enabled. Image remote patterns include Cloudinary, Google user avatars, and Sanity; update `next.config.mjs` when adding new hosts. `postbuild` runs `next-sitemap`.
- **Type Definitions**: Keep `@types/react` and `@types/react-dom` aligned with the runtime React major version (currently 19).
- **Deployment**: Deployed via Vercel on pushes to `main` after tests pass.
- **Routing & Layouts**: Route groups split layout concerns—`(main)` wraps primary pages with the sidebar, and individual pages call `PageLayout` (`src/components/PageLayout.tsx`) to set header text/`useH1`; `(clean)` omits sidebar/header for minimalist pages like resume and privacy.

## Task-Specific Instructions
- **Adding a new page**: Create a new folder under `src/app/` with a `page.tsx` file. Update navigation/links if necessary.
- **Modifying a component**: Locate the component in `src/components/`. Ensure props types are updated if changed.
- **Writing tests**: Add new `.cy.ts` files in `cypress/e2e/`. Utilize existing custom commands or add new ones to `cypress/support/commands.ts`.
- **Updating dependencies**: Use `npm update <package>` or `npm install <package>@latest`. Run `npm test` after updates.
- **Working with Sanity**: Schema changes in `sanity/schema.ts`. Test content fetching logic in `src/lib/sanity-photo-albums.ts` or `src/lib/sanity-microposts.ts`. Access Studio via `/studio`.
