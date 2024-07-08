# TheDigital.Ninja Project

Welcome to TheDigital.Ninja project! This is a personal website and blog for Russell Perkins, showcasing technical skills and hosting blog posts on various tech topics.

## Project Overview

- **Name**: thedigitalninja-nextjs
- **Purpose**: Personal website and blog for TheDigital.Ninja
- **Live Site**: [https://TheDigital.Ninja](https://TheDigital.Ninja)

## Key Technologies

- Next.js 14.2.4 with App Router
- TypeScript
- React 18
- Tailwind CSS 3.4.1
- Headless UI 2.1.1
- Firebase Authentication
- gray-matter 4.0.3 (for parsing Markdown front matter)
- marked 13.0.1 (for rendering Markdown)

## Main Features

1. Home page with recent blog posts
2. Blog with individual post pages
3. Responsive design with mobile-friendly navigation
4. Authentication using Firebase (Google Sign-In)
5. About page with my background
6. Resume page

## Project Structure

- `src/`: Main application code
- `posts/`: Markdown files for blog posts
- `public/`: Static assets
- `styles/`: Global CSS styles

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm ci
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build the production application
- `npm start`: Start the production server
- `npm run lint`: Run ESLint
- `npm run prep`: Run linting and build, do this before pushing to the main branch

## Deployment

The project is automatically deployed to Vercel upon pushes to the main branch.

## Contributing

This is a personal project, but if you notice any issues or have suggestions, please feel free to open an issue or submit a pull request.
