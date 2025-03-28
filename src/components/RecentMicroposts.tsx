import Link from 'next/link';
import { getSortedMicropostsData } from '@/lib/sanity-microposts';
import Image from 'next/image';

export default async function RecentMicroposts() {
  // Get the 3 most recent microposts
  const recentMicroposts = await getSortedMicropostsData(3);
  
  if (recentMicroposts.length === 0) {
    return null;
  }
  
  return (
    <section className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Recent Updates</h2>
        <Link 
          href="/feed" 
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          View all
        </Link>
      </div>
      
      <div className="space-y-4">
        {recentMicroposts.map((post) => {
          // Format the date
          const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          });
          
          // Truncate content if needed
          let preview = post.content.substring(0, 150);
          if (post.content.length > 150) {
            preview += '...';
          }
          
          return (
            <Link
              key={post.id}
              href={`/feed/${post.slug}`}
              className="block hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-lg"
            >
              <div 
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formattedDate}
                    </span>
                    {post.location?.name && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-3">
                        • {post.location.name}
                      </span>
                    )}
                  </div>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex space-x-2">
                      {post.tags.slice(0, 2).map(tag => (
                        <span 
                          key={tag}
                          className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  {post.images && post.images.length > 0 && (
                    <div className="flex-shrink-0">
                      <Image 
                        src={post.images[0]} 
                        alt={`Thumbnail for post: ${post.content.substring(0, 30)}...`}
                        width={80} 
                        height={80}
                        quality={80}
                        loading="eager"
                        className="rounded-lg object-cover w-full sm:w-20 h-20"
                      />
                    </div>
                  )}
                  <p className="text-sm flex-grow">{preview}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}