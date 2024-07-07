import Image from 'next/image';
import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';

interface RecentBlogPostsProps {
  limit?: number;
}

const RecentBlogPosts: React.FC<RecentBlogPostsProps> = ({ limit = 3 }) => {
  const posts = getSortedPostsData(limit);

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Recent Blog Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="block">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="relative h-48">
                <Image
                  src={post.og?.image || '/images/default-cover.jpg'}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{post.date}</p>
                <p className="text-sm text-gray-700 dark:text-gray-200">{post.excerpt}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecentBlogPosts;