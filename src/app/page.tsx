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
import RecentMicroposts from '../components/RecentMicroposts';
import { Metadata } from 'next'
import Script from 'next/script';

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
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "The Digital Ninja",
    "alternateName": "Russell Perkins' Tech Blog",
    "url": "https://TheDigital.Ninja",
    "description": "Explore tech insights, software architecture, and AI with Russell Perkins, a seasoned Solutions Architect and IT consultant.",
    "author": {
      "@type": "Person",
      "name": "Russell Perkins",
      "jobTitle": "Principal Technical Consultant",
      "image": "https://res.cloudinary.com/thedigitalninja/image/upload/v1720386353/profile_qxup8e.jpg",
      "url": "https://TheDigital.Ninja/about",
      "sameAs": [
        "https://linkedin.com/in/russellperkins/",
        "https://github.com/TheDigitalNinja",
        "https://twitter.com/TheDigitalNinja",
        "https://instagram.com/perkinsrussell/",
        "https://facebook.com/RussellPerkinsDenver",
        "https://youtube.com/TheDigitalNinja"
      ]
    },
    "mainEntity": {
      "@type": "WebPage",
      "@id": "https://TheDigital.Ninja"
    }
  };

  return (
    <>
      <Script id="schema-org-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      
      <div className="min-h-screen md:flex">
        <Sidebar />
        <div className="flex flex-col w-full md:pl-64">
          <Header title="The Digital Ninja" useH1={true}/>
          <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <article className="mb-12 prose dark:prose-invert lg:prose-xl">
              <div className="flex md:flex-row gap-6 items-start">
                <div className="hidden md:block md:w-1/4 flex-shrink-0">
                  <img 
                    src="https://cdn.sanity.io/images/nx08bxy1/production/d0fec3e55f52e54353851f8129a986c384ee5baa-2048x3071.jpg?w=500&q=85&auto=format" 
                    alt="Russell Perkins" 
                    className="rounded-full shadow-lg w-full aspect-square object-cover"
                  />
                </div>
                <div className="w-full md:w-3/4">
                  <p>
                    Looks like you&apos;ve stumbled upon TheDigital.Ninja - welcome to my corner of the web! 
                    I&apos;m Russell Perkins, a Solutions Architect with a passion for all things tech. 
                    Feel free to dive into my blog posts for insights on software architecture, AI, and 
                    the latest in tech innovations. Or, if you&apos;re feeling social, check out my links 
                    and let&apos;s connect in the digital realm!
                  </p>
                </div>
              </div>

            </article>

            <RecentBlogPosts limit={4} />
            <RecentMicroposts />
          </main>
        </div>
      </div>
    </>
  );
}