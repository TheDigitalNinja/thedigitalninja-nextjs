import Link from 'next/link';
import { getSortedMicropostsData } from '@/lib/microposts';

export default function RecentMicroposts() {
  // Get the 3 most recent microposts
  const recentMicroposts = getSortedMicropostsData(3);
  
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
              href={`/feed/${post.id}`}
              className="block hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-lg"
            >
              <div 
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formattedDate}
                  </span>
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
                <p className="text-sm">{preview}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}