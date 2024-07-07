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
import RecentBlogPosts from '../components/RecentBlogPosts';
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
      <div className="min-h-screen flex flex-col">
        <Header title="The Digital Ninja" useH1={true}/>
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <article className="prose dark:prose-invert lg:prose-xl mb-12">
              <h2 className="text-3xl font-bold mb-6">Hey there,</h2>
              <p className="mb-6">
                Looks like you&apos;ve stumbled upon TheDigital.Ninja - welcome to my corner of the web! 
                I&apos;m Russell Perkins, a Solutions Architect with a passion for all things tech. 
                Feel free to dive into my blog posts for insights on software architecture, AI, and 
                the latest in tech innovations. Or, if you&apos;re feeling social, check out my links 
                and let&apos;s connect in the digital realm!
              </p>
            </article>

            <RecentBlogPosts limit={4} />
          </main>
        </div>
      </div>
    </>
  );
}