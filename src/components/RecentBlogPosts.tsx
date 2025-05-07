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
      <div className="space-y-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block mb-6">
            <article className="flex flex-col md:flex-row border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              {/* Image container */}
              <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                <Image
                  src={`https://res.cloudinary.com/TheDigitalNinja/image/upload/c_fill,w_400,h_300,g_auto/${post.cloudinaryImageId}`}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  className="rounded-l-lg"
                />
              </div>
              {/* Text content container */}
              <div className="w-full md:w-2/3 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{post.date}</p>
                  <p className="text-gray-800 dark:text-gray-200 mb-4 text-sm">{post.excerpt}</p>
                </div>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-auto">
                  <FiClock className="mr-1" />
                  <span className="mr-3">{post.readTime} min read</span>
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