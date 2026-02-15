/**
 * @file src/components/HomePageHeader.tsx
 * @fileoverview Home page header component for The Digital Ninja website
 * @description This component displays the introductory section on the home page,
 *              including the author's image and welcome message.
 * 
 * @component HomePageHeader
 * @returns {JSX.Element} The rendered home page header
 */

import Image from 'next/image';

export default function HomePageHeader() {
  return (
    <article className="mb-12 prose dark:prose-invert lg:prose-xl">
      <div className="flex md:flex-row gap-6 items-start">
        <div className="hidden md:block md:w-1/4 flex-shrink-0">
          <Image
            src="https://cdn.sanity.io/images/nx08bxy1/production/d0fec3e55f52e54353851f8129a986c384ee5baa-2048x3071.jpg?w=500&q=85&auto=format"
            alt="Russell Perkins"
            width={500}
            height={500}
            className="rounded-full shadow-lg w-full aspect-square object-cover"
          />
        </div>
        <div className="w-full md:w-3/4">
          <p>
            I&apos;m Russell Perkins. I work in tech, do improv, sometimes act, and have too many opinions about self-help books.
            This site is basically a look into my life with blog posts, upcoming events, book reviews, photos, and whatever random
            thoughts I felt like putting on the internet that day. If you&apos;re feeling social, check out my links and let&apos;s connect!
          </p>
        </div>        
      </div>
    </article>
  );
}