import Link from 'next/link'
import { getSortedPostsData } from '../../lib/posts'
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Head from 'next/head';

export default function BlogPage() {
  const posts = getSortedPostsData()

  return (
    <>
      <Head>
        <link rel="canonical" href="https://TheDigital.Ninja/blog" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header title="Blog"/>
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-8">Blog Posts</h2>
            <ul className="space-y-6">
              {posts.map((post) => (
                <li key={post.slug} className="border-b pb-6">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600">{post.title}</h2>
                    <p className="text-gray-600 mb-2">{post.date}</p>
                    <p className="text-gray-800 dark:text-gray-200">{post.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </main>
        </div>
      </div>
    </>
  )
}