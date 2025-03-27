import { MicropostData } from '@/lib/microposts';
import { marked } from 'marked';
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

  // Parse the markdown content
  const htmlContent = marked.parse(post.content) as string;

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <div className="mb-4 flex justify-between items-center">
        <time dateTime={post.date} className="text-sm text-gray-500 dark:text-gray-400">
          {formattedDate}
        </time>
        <Link 
          href={`/feed/${post.id}`}
          className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
        >
          Permalink
        </Link>
      </div>
      
      <div className="prose dark:prose-invert lg:prose-xl max-w-none" 
           dangerouslySetInnerHTML={{ __html: htmlContent }} />
      
      {post.imageUrl && (
        <div className="mt-4">
          <Image 
            src={post.imageUrl}
            alt="Post image"
            width={600}
            height={400}
            className="rounded-md w-full h-auto"
          />
        </div>
      )}
      
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
  );
}
