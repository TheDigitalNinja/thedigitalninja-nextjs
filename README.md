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
   ```
   git clone https://github.com/TheDigitalNinja/thedigitalninja-nextjs.git
   ```
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
- `npm run test`: Start dev server and run Cypress end-to-end tests
- `npm run cypress:run`: Run Cypress end-to-end tests (assuming you have the dev server already running)
- `npm run cypress:dev`: Open Cypress in development mode
- `npm run cypress:open`: Open Cypress run tests interactively (assuming the development server is already running).
- `npm run package-code`: Create a copy of the code to be uploaded to a Claude ai project

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

## Contributing

This is a personal project, but if you notice any issues or have suggestions, please feel free to open an issue or submit a pull request.
