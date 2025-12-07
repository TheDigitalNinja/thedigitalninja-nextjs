'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MicropostData } from '@/lib/sanity-microposts';
import Image from 'next/image';

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
    return (
      <section className="mt-4">
        <div className="flex justify-center items-center">
          <h2 className="text-2xl font-bold md:hidden mb-8">The Feed</h2>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Loading...
        </div>
      </section>
    );
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