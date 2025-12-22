import { MicropostData } from '@/lib/sanity-microposts';
import Image from 'next/image';
import Link from 'next/link';

interface MicroPostProps {
  post: MicropostData;
}

export default function MicroPost({ post }: MicroPostProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link
      href={`/feed/${post.slug}`}
      className="block group"
    >
      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 break-inside-avoid transition-colors group-hover:bg-gray-50 dark:group-hover:bg-gray-700">
        <div className="mb-4 flex items-center justify-between gap-3">
          <time dateTime={post.date} className="text-sm text-gray-500 dark:text-gray-400">
            {formattedDate}
          </time>
        </div>
        
        <div className="text-lg whitespace-pre-wrap">
          {post.content}
        </div>
        
        {/* Display multiple images if available */}
        {post.images && post.images.length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {post.images.map((imageUrl, index) => (
              <div key={index} className={post.images.length === 1 ? 'col-span-2' : ''}>
                <Image 
                  src={imageUrl}
                  alt={`Post image ${index + 1}`}
                  width={600}
                  height={400}
                  quality={85}
                  loading={index === 0 ? "eager" : "lazy"}
                  priority={index === 0 && post.images.length === 1}
                  className="rounded-md w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        )}
        
        {/* Display location if available */}
        {post.location?.name && (
          <div className="mt-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{post.location.name}</span>
          </div>
        )}
        
        {/* Display tags/hashtags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}
