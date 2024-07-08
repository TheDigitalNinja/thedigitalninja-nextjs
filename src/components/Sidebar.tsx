/**
 * @file src/components/Sidebar.tsx
 * @fileoverview Sidebar component for The Digital Ninja website
 * @description This file defines a Sidebar component that displays navigation links,
 *              recent blog posts, and a login/logout button. It uses Next.js Link 
 *              for client-side navigation and fetches recent post data using a custom function.
 * 
 * @component Sidebar
 * @returns {JSX.Element} The rendered sidebar component with navigation, recent posts, and login/logout button
 */

import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';
import { LoginLogoutButton } from './LoginLogoutButton';
import Socials from './Socials';

interface PostData {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  og: Record<string, string>;
}

const Sidebar: React.FC = () => {
  const recentPosts = getSortedPostsData(8);

  return (
    <aside className="sidebar w-64 dark:prose-invert p-6 hidden md:flex flex-col h-screen fixed left-0 top-0 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="overflow-y-auto flex-grow">
        {/* Navigation */}
        <nav className="mb-8">
          <ul className="space-y-2">
            {['Home', 'Blog', 'About'].map((item) => (
              <li key={item}>
                <Link 
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                  className="block py-2 px-4 text-lg hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors duration-200"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Recent Blog Posts */}
        <section className="recent-posts">
          <h3 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">Recent Posts</h3>
          <ul className="space-y-3">
            {recentPosts.map((post) => (
              <li key={post.slug} className="truncate">
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="block text-sm hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded transition-colors duration-200"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Login/Logout Button */}
      <div className="mt-4 pt-4">
        <LoginLogoutButton />
      </div>

      {/* Socials */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Socials />
      </div>

    </aside>
  );
};

export default Sidebar;