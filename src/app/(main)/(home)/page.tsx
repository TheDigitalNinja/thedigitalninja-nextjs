/**
 * @file src/app/(main)/(home)/page.tsx
 * @fileoverview Home page component for The Digital Ninja website
 * @description Renders the homepage content including recent blog posts and microposts.
 * 
 * @component Home
 * @returns {JSX.Element} The rendered home page
 */

import { Metadata } from 'next';
import Script from 'next/script';
import PageLayout from '@/components/PageLayout';
import RecentBlogPosts from '@/components/RecentBlogPosts';
import RecentMicroposts from '@/components/RecentMicroposts';
import HomePageHeader from '@/components/HomePageHeader';

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
};

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
    <PageLayout title="The Digital Ninja" useH1>
      <Script id="schema-org-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <div className="flex flex-col md:flex-row md:gap-8">
        <div className="w-full md:w-3/4">
          <HomePageHeader />
          <RecentBlogPosts limit={4} />
        </div>

        <div className="w-full md:w-1/4 mt-8 md:mt-0">
          <RecentMicroposts />
        </div>
      </div>
    </PageLayout>
  );
}

