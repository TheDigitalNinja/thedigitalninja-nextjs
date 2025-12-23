/**
 * @file src/app/(main)/blog/page.tsx
 * @fileoverview Blog posts page component for The Digital Ninja website
 * @description Renders the list of blog posts with featured images.
 * 
 * @component BlogPage
 * @returns {JSX.Element} The rendered blog page
 */

import Image from 'next/image';
import Link from 'next/link';
import { FiClock, FiTag } from 'react-icons/fi';
import PageLayout from '@/components/PageLayout';
import { getSortedPostsData } from '@/lib/posts';
import { getSanityImageUrlFromId } from '@/lib/sanity';

export default function BlogPage() {
  const posts = getSortedPostsData();

  return (
    <PageLayout title="Blog" useH1={false}>
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <article className="flex flex-col md:flex-row mb-4 border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="md:w-1/3 relative h-48 md:h-auto">
                {post.sanityImageId && (
                  <Image
                    src={getSanityImageUrlFromId(post.sanityImageId, { width: 400, height: 300 })}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                )}
              </div>
              <div className="md:w-2/3 p-4 md:p-6">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{post.date}</p>
                <p className="text-gray-800 dark:text-gray-200 mb-4">{post.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <FiClock className="mr-1" />
                  <span className="mr-4">{post.readTime} min read</span>
                  <FiTag className="mr-1" />
                  <span>{post.tags.join(', ')}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}

