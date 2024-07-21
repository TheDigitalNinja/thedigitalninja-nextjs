import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Metadata } from 'next'
import Link from 'next/link';
import RecentBlogPosts from '../components/RecentBlogPosts';

export const metadata: Metadata = {
  title: '404 - Page Not Found | The Digital Ninja',
  description: "The page you\'re looking for doesn\'t exist. But don\'t worry, there\'s plenty more to explore!",
}

export default function NotFound() {
  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <div className="flex flex-col w-full md:pl-64">
        <Header title="404 - Page Not Found" useH1={false}/>
        <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="mb-12 prose dark:prose-invert lg:prose-xl">
            <h1 className="text-4xl font-bold mb-6">404 - Page Not Found</h1>
            <div className="">
              <p>
                Oops! It looks like you've ventured into uncharted territory. 
                The page you're looking for doesn't exist.
              </p>
              <p>
                Why not check out some of my recent blog posts or head back to the &nbsp;
                <Link href="/" className="text-blue-500 hover:text-blue-600">home page</Link>?
              </p>
            </div>
          </article>
          <RecentBlogPosts limit={4} />
        </main>
      </div>
    </div>
  );
}