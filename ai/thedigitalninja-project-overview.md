# TheDigital.Ninja Project Overview

## Project Name
thedigitalninja-nextjs

## Purpose
A personal website and blog for the domain TheDigital.Ninja, showcasing technical skills and hosting blog posts on various tech topics.

## Key Technologies
- Next.js 13 with App Router
- TypeScript
- Tailwind CSS
- Headless UI
- gray-matter (for parsing Markdown front matter)
- marked (for rendering Markdown)
- Cloudinary (for image hosting) 
    - Cloud Name: `TheDigitalNinja`
- Vercel (for hosting)

## Project Structure
- Uses a `src/` directory for main code organization
- Blog posts stored as Markdown files in `posts/`
- Components organized by function (layout, blog, ui)

## Main Features
1. Home page
2. Blog with individual post pages
3. Responsive design with mobile-friendly navigation
4. PWA functionality

## Specific Components
- Layout components (Header, Footer, Sidebar)
- Blog components (PostList, PostCard)
- UI components (Button, Card)

## Hosting
Is hosted on vercel at https://TheDigital.Ninja 

## Authentication
- Implemented using Firebase Authentication
- Google Sign-In method enabled
- Key components:
  1. `src/lib/firebase.ts`: Firebase initialization and auth instance export
  2. `src/hooks/useAuth.ts`: Custom hook for managing auth state and operations
  3. `src/components/AuthProvider.tsx`: Context provider for app-wide auth state
  4. `src/components/LoginLogoutButton.tsx`: UI component for login/logout actions
  5. `src/app/login/page.tsx`: Dedicated login page

- Usage:
  - Wrap root component with `AuthProvider`
  - Use `useAuthContext()` hook to access auth state and functions
  - `LoginLogoutButton` component for UI interactions
  - Redirect to '/login' for authentication
  - Protected routes should check `user` object from `useAuthContext()`

- Configuration:
  - Firebase project: "TheDigitalNinja"
  - Google Cloud Console: OAuth consent screen and scopes set up
  - `next.config.js`: Configured for Google user profile images

- Future plans:
  - Implement email/password authentication
  - Add admin-only features using Firebase security rules

## Additional Notes
- The project aims to showcase technical skills and serve as a platform for tech-related blog posts
- Future plans may include integrating AI features or other advanced functionalities
- The design should be unique, leveraging Tailwind CSS and custom styling rather than off-the-shelf UI kits

This overview encapsulates the current plan for the TheDigital.Ninja website project, including its technology stack, structure, and key features.
