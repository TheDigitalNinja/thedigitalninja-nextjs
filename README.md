# [TheDigital.Ninja](https://TheDigital.Ninja)

[![Cypress E2E Tests](https://github.com/TheDigitalNinja/thedigitalninja-nextjs/actions/workflows/cypress.yml/badge.svg)](https://github.com/TheDigitalNinja/thedigitalninja-nextjs/actions/workflows/cypress.yml)
[![Next.js](https://img.shields.io/badge/Next.js-15.3.6-blueviolet)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.2-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=thedigitalninja-nextjs)](https://thedigital.ninja)

## Project Overview
Welcome to TheDigital.Ninja! This is a personal website and blog for Russell Perkins, showcasing technical skills and hosting blog posts on various topics. View the site live at [https://TheDigital.Ninja](https://TheDigital.Ninja)

## Main Features
- Home page with recent blog posts
- Blog with individual post pages
- Photo gallery with Sanity.io integration
- Feed/Microposts a social media style feed with small life updates
- Responsive design with mobile-friendly navigation
- Authentication using Firebase (Google Sign-In, not currently used for anything)
- About page with my background

## Project Structure
- `src/`: Main application code
- `src/app/`: Next.js app router pages
- `src/components/`: React components
- `posts/`: Markdown files for blog posts
- `public/`: Static assets
- `styles/`: Global CSS styles
- `src/lib/`: Utility functions and hooks (Sanity client config in `src/lib/sanity-client.ts`, photo gallery helpers in `src/lib/sanity-photo-albums.ts`, feed helpers in `src/lib/sanity-microposts.ts`)
- `sanity/`: Sanity.io schema and configuration, used for microposts/feed

## Blog Post Frontmatter
- `title` (string): Post title.
- `date` (YYYY-MM-DD): Publish date.
- `excerpt` (string): Short summary used for SEO/meta descriptions.
- `sanityImageId` (string): Sanity asset ID for the featured image; used for cards, OG, and schema defaults.
- `readTime` (number): Estimated read time in minutes.
- `tags` (string[]): Tags for filtering/display.
- `og` (optional object): Overrides for OpenGraph data (`title`, `description`, `image`, `url`, `type`). When omitted, OG metadata defaults to the post title, excerpt, canonical URL, a 1200x630 image derived from `sanityImageId`, and type `article`.

### Routing & Layouts
- `(main)` route group (`src/app/(main)/layout.tsx`) renders the sidebar once for all primary pages. Individual pages call `PageLayout` (`src/components/PageLayout.tsx`) to set header text and whether it renders as `<h1>` or `<p>`, keeping SEO-safe single-`<h1>` pages.
- `(clean)` route group (`src/app/(clean)/layout.tsx`) omits sidebar/header for minimalist pages like `resume` and `privacy`.
- `PageLayout` wraps content in a standard `<main>` container by default.

## Getting Started
1. Clone the repository
   ```Bash
   git clone https://github.com/TheDigitalNinja/thedigitalninja-nextjs.git
   ```
2. Install dependencies:
   ```Bash
   npm ci
   ```
3. Configure environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Add your Firebase and Sanity credentials

4. Run the development server:
   ```Bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser
6. Access Sanity Studio at [http://localhost:3000/studio](http://localhost:3000/studio)

## Scripts
| Script                  | Description                                                                 |
|-------------------------|-----------------------------------------------------------------------------|
| `npm run dev`           | Start development server                                                    |
| `npm run build`         | Build the production application                                            |
| `npm start`             | Start the production server                                                 |
| `npm run lint`          | Run ESLint                                                                  |
| `npm run test`          | Start dev server and run Cypress end-to-end tests                           |
| `npm run cypress:run`   | Run Cypress end-to-end tests (assuming you have the dev server already running) |
| `npm run cypress:dev`   | Open Cypress in development mode                                            |
| `npm run cypress:open`  | Open Cypress run tests interactively (assuming the development server is already running) |

## Cypress End-to-End Tests
The project includes comprehensive end-to-end tests using Cypress to ensure the functionality and reliability of the website. The tests are located in the `cypress/e2e/` directory and are configured in `cypress.config.ts`.

### Running Tests
To run the Cypress tests, use the following scripts:

- `npm run test`: Start the development server and run all Cypress end-to-end tests.
- `npm run cypress:run`: Run all Cypress end-to-end tests (assuming the development server is already running).
- `npm run cypress:dev`: Open Cypress in development mode to run tests interactively.
- `npm run cypress:open`: Open Cypress run tests interactively (assuming the development server is already running).

## Deployment
The project is automatically deployed to Vercel upon pushes to the main branch and all tests passing.

## IndexNow CLI
This project includes a simple CLI tool for submitting URLs to the [IndexNow API](https://www.bing.com/indexnow/), allowing quick indexing of new or updated content to all the major search engines. The script now lives at `scripts/index-now.js`.

Usage:
```Bash
node scripts/index-now.js <url>
```

Example:
```Bash
node scripts/index-now.js https://TheDigital.Ninja/blog/your-new-post
```

## Contributing
This is a personal project, but if you notice any issues or have suggestions, please feel free to open an issue or submit a pull request.

## Ticket Creation
Utalize github co-pilot with the following prompt.

```
/create-issue in TheDigitalNinja/thedigitalninja-nextjs after reading "Ticket Creation" in `AGENTS.md`. 
```

## License
This project is released under the Unlicense. See the [LICENSE](LICENSE) file for details.