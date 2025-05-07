/**
 * @file src/components/HomePageHeader.tsx
 * @fileoverview Home page header component for The Digital Ninja website
 * @description This component displays the introductory section on the home page,
 *              including the author's image and welcome message.
 * 
 * @component HomePageHeader
 * @returns {JSX.Element} The rendered home page header
 */

import React from 'react';

export default function HomePageHeader() {
  return (
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
  );
}