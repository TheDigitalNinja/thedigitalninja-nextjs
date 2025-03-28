import { getSortedMicropostsData } from '@/lib/sanity-microposts';
import MicroPost from '@/components/MicroPost';
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: 'Feed | The Digital Ninja',
  description: 'Short thoughts and updates from The Digital Ninja',
};

// Mark page as dynamic for data fetching - always render the page on the server
export const dynamic = 'force-dynamic';

export default async function FeedPage() {
  const microposts = await getSortedMicropostsData();
  
  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <div className="flex flex-col w-full md:pl-64">
        <Header title="Feed"/>
        <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {microposts.length > 0 ? (
            <div className="space-y-6">
              {microposts.map((post) => (
                <MicroPost key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                No microposts yet. Check back soon!
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
