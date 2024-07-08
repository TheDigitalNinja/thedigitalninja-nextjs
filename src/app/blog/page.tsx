/**
 * @file src/app/blog/page.tsx
 * @fileoverview Blog posts page component for The Digital Ninja website
 * @description This file contains the main layout and content for the blog posts page,
 *              including the header, sidebar, and a list of blog posts.
 * 
 * @component BlogPage
 * @returns {JSX.Element} The rendered blog page
 */

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

      <div className="min-h-screen md:flex">
        <Sidebar />
        <div className="flex flex-col w-full md:pl-64">
          <Header title="Blog"/>
          <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-4xl font-bold mb-8">Blog Posts</h2>
            <ul className="space-y-6">
              {posts.map((post) => (
                <li key={post.slug} className="border-b pb-6">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600">{post.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">{post.date}</p>
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