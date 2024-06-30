import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';

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
    <aside className="sidebar w-64 dark:prose-invert p-6 hidden md:block">
      {/* Navigation */}
      <nav className="mb-8">
        <ul className="space-y-2">
          <li>
            <Link href="/" className="text-lg font-semibold hover:text-blue-600 transition-colors duration-200">Home</Link>
          </li>
          <li>
            <Link href="/blog" className="text-lg font-semibold hover:text-blue-600 transition-colors duration-200">Blog</Link>
          </li>
        </ul>
      </nav>

      {/* Recent Blog Posts */}
      <section className="recent-posts">
        <h3 className="text-xl font-bold mb-4 border-b pb-2">Recent Posts</h3>
        <ul className="space-y-3">
          {recentPosts.map((post) => (
            <li key={post.slug} className="truncate">
              <Link href={`/blog/${post.slug}`} className="text-sm hover:text-blue-600 transition-colors duration-200">{post.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
};

export default Sidebar;