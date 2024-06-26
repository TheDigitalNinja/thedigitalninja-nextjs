import Link from 'next/link'
import { getSortedPostsData } from '../../lib/posts'

export default function BlogPage() {
  const posts = getSortedPostsData()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="border-b pb-6">
            <Link href={`/blog/${post.slug}`} className="block">
              <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600">{post.title}</h2>
              <p className="text-gray-600 mb-2">{post.date}</p>
              <p className="text-gray-800">{post.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}