/**
 * @file src/components/RecentBlogPosts.tsx
 * @fileoverview RecentBlogPosts component for The Digital Ninja website
 * @description This component displays a grid of recent blog posts with featured images,
 *              titles, dates, and excerpts. It's designed to be used on the home page
 *              and potentially other areas of the site.
 * 
 * @component RecentBlogPosts
 * @param {number} [limit=3] - The maximum number of blog posts to display
 * @returns {JSX.Element} The rendered RecentBlogPosts component
 */

import Image from 'next/image';
import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';
import { FiClock, FiTag } from 'react-icons/fi';

interface RecentBlogPostsProps {
  limit?: number;
}

const RecentBlogPosts: React.FC<RecentBlogPostsProps> = ({ limit = 3 }) => {
  const posts = getSortedPostsData(limit);

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Recent Blog Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <article className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src={`https://res.cloudinary.com/TheDigitalNinja/image/upload/c_scale,w_600/${post.cloudinaryImageId}`}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{post.date}</p>
                <p className="text-gray-800 dark:text-gray-200 mb-4">{post.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <FiClock className="mr-1" />
                  <span className="mr-4">5 min read</span>
                  <FiTag className="mr-1" />
                  <span>{post.tags[0]}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecentBlogPosts;