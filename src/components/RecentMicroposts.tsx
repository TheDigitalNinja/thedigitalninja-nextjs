'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MicropostData, getSortedMicropostsData } from '@/lib/sanity-microposts';
import Image from 'next/image';

function getImageDimensions(url: string): { width: number; height: number } | null {
  // Sanity asset URLs end with `-<width>x<height>.<ext>`
  const match = url.match(/-(\d+)x(\d+)\.(?:jpe?g|png|webp|gif|avif)$/i);
  if (!match) return null;

  const width = Number.parseInt(match[1], 10);
  const height = Number.parseInt(match[2], 10);

  if (!Number.isFinite(width) || !Number.isFinite(height) || width === 0 || height === 0) {
    return null;
  }

  return { width, height };
}

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
        const data = await getSortedMicropostsData(3);
        setRecentMicroposts(data);
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

          const firstImage = post.images?.[0];
          const derivedDimensions = firstImage ? getImageDimensions(firstImage) : null;
          const aspectRatio = derivedDimensions
            ? `${derivedDimensions.width} / ${derivedDimensions.height}`
            : '4 / 3';
          
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
                {firstImage && (
                  <div
                    className="mb-3 relative w-full overflow-hidden rounded-lg"
                    style={{ aspectRatio }}
                  >
                    <Image 
                      src={firstImage} 
                      alt={`Thumbnail for post: ${post.content.substring(0, 30)}...`}
                      quality={85}
                      loading="eager"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 232px"
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