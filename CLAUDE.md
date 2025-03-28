# The Digital Ninja - Next.js Project Guidelines

## Project Overview
- Personal website and blog for TheDigital.Ninja
- Next.js with App Router, TypeScript, and Tailwind CSS
- Firebase Authentication (Google Sign-In)
- Content stored as Markdown files in `posts/` and `microposts/`
- Cloudinary for image hosting

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm test` - Run all Cypress tests
- `npm run cypress:open` - Open Cypress test runner
- `npx cypress run --spec cypress/e2e/specific_test.cy.ts` - Run single test

## Development Workflow
1. Complete feature implementation
2. Test manually to verify functionality 
3. Run `npm run build` to ensure it builds successfully
4. Run `npm test` to execute all Cypress tests
5. Stage changes with `git add`
6. Commit changes with descriptive message
7. Never push directly - wait for manual review

## Code Style
- **TypeScript**: Use strict typing with proper interfaces/types
- **Imports**: Use path aliases (e.g., `@/components/*`)
- **Formatting**: Follow Next.js/React conventions with consistent indentation
- **Components**: 
  - Functional components with TypeScript interfaces for props
  - Use hooks for state management
- **Error Handling**: Implement proper error boundaries and type checking
- **Naming**:
  - Components: PascalCase (e.g., `LoginButton.tsx`)
  - Functions/variables: camelCase
  - Files: lowercase with hyphens for multi-word

## Architecture
- Follow Next.js App Router conventions
- Keep components modular and reusable
- Use Tailwind CSS for styling
- Authentication via Firebase (see `src/lib/firebase.ts` and `src/hooks/useAuth.ts`)
- Content rendering with gray-matter and marked