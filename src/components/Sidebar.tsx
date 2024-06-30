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
    <aside className="sidebar w-64 dark:prose-invert shadow-md p-4 hidden md:block">
      {/* Navigation */}
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
        </ul>
      </nav>

      {/* Recent Blog Posts */}
      <section className="recent-posts mt-8">
        <h3>Recent Posts</h3>
        <ul>
          {recentPosts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
};

export default Sidebar;