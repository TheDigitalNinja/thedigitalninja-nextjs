# TheDigital.Ninja

Welcome to TheDigital.Ninja! This is a personal website and blog for Russell Perkins, showcasing technical skills and hosting blog posts on various tech topics.

[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)
[![Cypress E2E Tests](https://github.com/TheDigitalNinja/thedigitalninja-nextjs/actions/workflows/cypress.yml/badge.svg)](https://github.com/TheDigitalNinja/thedigitalninja-nextjs/actions/workflows/cypress.yml)
[![Next.js](https://img.shields.io/badge/Next.js-15.3.6-blueviolet)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.2-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=thedigitalninja-nextjs)](https://thedigital.ninja)

## Project Overview

- **Name**: thedigitalninja-nextjs
- **Purpose**: Personal website and blog for TheDigital.Ninja
- **Live Site**: [https://TheDigital.Ninja](https://TheDigital.Ninja)

## Key Technologies

- Next.js 15.3.6 with App Router
- TypeScript 5.x
- React 19.1.2
- Tailwind CSS 3.4.1
- Headless UI 2.2.2
- Firebase Authentication
- Sanity.io (for photo gallery management)
- gray-matter 4.0.3 (for parsing Markdown front matter)
- marked 13.0.1 (for rendering Markdown)

## Main Features

1. Home page with recent blog posts
2. Blog with individual post pages
3. Photo gallery with Sanity.io integration
4. Responsive design with mobile-friendly navigation
5. Authentication using Firebase (Google Sign-In)
6. About page with my background
7. Resume page

## Project Structure

- `src/`: Main application code
- `src/app/`: Next.js app router pages
- `src/components/`: React components
- `posts/`: Markdown files for blog posts
- `public/`: Static assets
- `styles/`: Global CSS styles
- `src/lib/`: Utility functions and hooks
- `sanity/`: Sanity.io schema and configuration

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
| `npm run package-code`  | Create a copy of the code to be uploaded to a Claude ai project             |

## Cypress End-to-End Tests

The project includes comprehensive end-to-end tests using Cypress to ensure the functionality and reliability of the website. The tests are located in the `cypress/e2e/` directory and are configured in `cypress.config.ts`.

### Running Tests

To run the Cypress tests, use the following scripts:

- `npm run test`: Start the development server and run all Cypress end-to-end tests.
- `npm run cypress:run`: Run all Cypress end-to-end tests (assuming the development server is already running).
- `npm run cypress:dev`: Open Cypress in development mode to run tests interactively.
- `npm run cypress:open`: Open Cypress run tests interactively (assuming the development server is already running).

## Deployment

The project is automatically deployed to Vercel upon pushes to the main branch.

## IndexNow CLI

This project includes a simple CLI tool for submitting URLs to the [IndexNow API](https://www.bing.com/indexnow/), allowing quick indexing of new or updated content.

Usage:
```Bash
node index-now.js <url>
```

Example:
```Bash
node index-now.js https://TheDigital.Ninja/blog/your-new-post
```

## Contributing

This is a personal project, but if you notice any issues or have suggestions, please feel free to open an issue or submit a pull request.

## License

This project is released under the Unlicense. See the [LICENSE](LICENSE) file for details.