'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MicropostData } from '@/lib/sanity-microposts';
import Image from 'next/image';

const FeedSkeleton = () => {
  // Lightweight pulse animation; pure CSS to avoid runtime overhead.
  const placeholderBase = 'bg-gray-200 dark:bg-gray-700';

  return (
    <section className="mt-4">
      <div className="flex justify-center items-center">
        <h2 className="text-2xl font-bold md:hidden mb-8">The Feed</h2>
      </div>
      <div className="space-y-4">
        {[0, 1, 2].map((key) => (
          <div
            key={key}
            className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg animate-pulse"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-3">
                <span className={`h-3 w-16 rounded ${placeholderBase}`} />
                <span className={`h-3 w-20 rounded ${placeholderBase}`} />
              </div>
              <span className={`h-4 w-12 rounded ${placeholderBase}`} />
            </div>

            <div className={`mb-3 h-20 w-full rounded-lg ${placeholderBase}`} />

            <div className="space-y-2">
              <div className={`h-3 w-full rounded ${placeholderBase}`} />
              <div className={`h-3 w-5/6 rounded ${placeholderBase}`} />
              <div className={`h-3 w-2/3 rounded ${placeholderBase}`} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default function RecentMicroposts() {
  const [recentMicroposts, setRecentMicroposts] = useState<MicropostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMicroposts() {
      try {
        setLoading(true);
        const response = await fetch('/api/microposts');
        if (!response.ok) {
          throw new Error('Failed to fetch microposts');
        }
        const data = await response.json();
        // Get the 3 most recent microposts (limit on client side)
        setRecentMicroposts(data.slice(0, 3));
      } catch (err) {
        console.error('Error fetching microposts:', err);
        setRecentMicroposts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchMicroposts();
  }, []);
  
  if (loading) {
    return <FeedSkeleton />;
  }
  
  if (recentMicroposts.length === 0) {
    return null;
  }
  
  return (
    <section className="mt-4">
      <div className="flex justify-center items-center">
        <h2 className="text-2xl font-bold md:hidden mb-8">The Feed</h2>
      </div>
      
      <div className="space-y-4">
        {recentMicroposts.map((post) => {
          // Format the date
          const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          });

          const primaryTag = post.tags?.[0];
          
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
                  {primaryTag && (
                    <div className="flex">
                      <span 
                        className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
                      >
                        #{primaryTag}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Image will be on top and full-width */}
                {post.images && post.images.length > 0 && (
                  <div className="mb-3"> {/* Margin below the image */}
                    <Image 
                      src={post.images[0]} 
                      alt={`Thumbnail for post: ${post.content.substring(0, 30)}...`}
                      width={232}
                      height={80}
                      quality={85}
                      loading="eager"
                      className="rounded-lg object-cover w-full h-auto"
                    />
                  </div>
                )}
                {/* Preview text below the image */}
                <p className="text-sm">{preview}</p>
              </div>
            </Link>
          );
        })}

      <div className="flex justify-center items-center mt-4">
        <Link 
          href="/feed" 
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          View all
        </Link>
      </div>

        
      </div>
    </section>
  );
}