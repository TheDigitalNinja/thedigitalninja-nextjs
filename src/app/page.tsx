/**
 * @file src/app/page.tsx
 * @fileoverview Home page component for The Digital Ninja website
 * @description This file contains the main layout and content for the home page,
 *              including the header, sidebar, and main content area.
 * 
 * @component Home
 * @returns {JSX.Element} The rendered home page
 */

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Digital Ninja - Russell Perkins',
  description: 'Explore tech insights, software architecture, and AI with Russell Perkins, a seasoned Solutions Architect and IT consultant.',
  openGraph: {
    title: 'The Digital Ninja - Russell Perkins',
    description: 'Dive into tech insights, software architecture, and AI with Russell Perkins. Discover innovative solutions and industry expertise.',
    type: 'website',
    url: 'https://TheDigital.Ninja',
    images: [
      {
        url: 'https://res.cloudinary.com/TheDigitalNinja/image/upload/logo-white-bg_uk6pkk.jpg',
        width: 1200,
        height: 1200,
        alt: 'The Digital Ninja Logo',
      },
    ],
  },
}

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header title="The Digital Ninja"/>
        <div className="flex flex-1">
          <Sidebar />

          <main className="flex-1 p-4">
            <div className="flex items-center justify-center h-full">
              <h1 className="text-4xl font-bold">The Digital Ninja</h1>
            </div>
          </main>

        </div>
      </div>
    </>
  );
}