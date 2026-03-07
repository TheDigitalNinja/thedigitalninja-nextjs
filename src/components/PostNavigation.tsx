import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import type { PostData } from '@/lib/posts';

type NavigationDirection = 'previous' | 'next';

interface PostNavigationProps {
  previousPost: PostData | null;
  nextPost: PostData | null;
}

interface NavigationCardProps {
  direction: NavigationDirection;
  post: PostData;
  className?: string;
}

const navigationConfig: Record<
  NavigationDirection,
  {
    label: string;
    Icon: typeof FiChevronLeft;
    accentOrigin: string;
    hoverShift: string;
  }
> = {
  previous: {
    label: 'Previous',
    Icon: FiChevronLeft,
    accentOrigin: 'origin-left',
    hoverShift: 'group-hover:-translate-x-1',
  },
  next: {
    label: 'Next',
    Icon: FiChevronRight,
    accentOrigin: 'origin-right',
    hoverShift: 'group-hover:translate-x-1',
  },
};

const navDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

function formatPostDate(date: string) {
  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return navDateFormatter.format(parsedDate);
}

function NavigationCard({ direction, post, className = '' }: NavigationCardProps) {
  const { label, Icon, accentOrigin, hoverShift } = navigationConfig[direction];
  const primaryTag = post.tags[0];
  const metadataItems = [
    `${post.readTime} min read`,
    formatPostDate(post.date),
    primaryTag ? `#${primaryTag}` : null,
  ].filter((item): item is string => Boolean(item));
  const labelContent = (
    <span className="inline-flex items-center gap-1.5">
      {direction === 'previous' ? (
        <>
          <Icon className={`h-4 w-4 transition-transform duration-300 ${hoverShift}`} />
          {label}
        </>
      ) : (
        <>
          {label}
          <Icon className={`h-4 w-4 transition-transform duration-300 ${hoverShift}`} />
        </>
      )}
    </span>
  );

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group relative flex h-full min-h-44 flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-blue-300 hover:bg-gray-50 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500/60 dark:hover:bg-gray-700/80 ${className}`}
      aria-label={`${label} post: ${post.title}`}
    >
      <div className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden">
        <span className={`block h-full w-full scale-x-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 transition-transform duration-300 ${accentOrigin} group-hover:scale-x-100`} />
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between gap-4 text-sm font-medium text-gray-500 transition-colors duration-300 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400">
          {direction === 'previous' ? (
            labelContent
          ) : (
            <span className="ml-auto">{labelContent}</span>
          )}
        </div>

        <h3 className="text-lg font-semibold leading-snug text-gray-900 transition-colors duration-300 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-300">
          {post.title}
        </h3>
      </div>

      <p className="mt-6 flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400">
        {metadataItems.map((item, index) => (
          <span key={`${post.slug}-${item}`} className="inline-flex items-center">
            {index > 0 ? (
              <span className="mx-2 text-gray-300 dark:text-gray-600">&bull;</span>
            ) : null}
            <span className={item.startsWith('#') ? 'text-gray-700 dark:text-gray-300' : ''}>{item}</span>
          </span>
        ))}
      </p>
    </Link>
  );
}

export default function PostNavigation({ previousPost, nextPost }: PostNavigationProps) {
  if (!previousPost && !nextPost) {
    return null;
  }

  return (
    <section className="not-prose mt-10" aria-label="Post navigation">
      <div className="mb-4 border-t border-gray-200 pt-6 text-center dark:border-gray-700">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
          Continue Reading
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {previousPost ? (
          <NavigationCard direction="previous" post={previousPost} />
        ) : null}
        {nextPost ? (
          <NavigationCard
            direction="next"
            post={nextPost}
            className={!previousPost ? 'md:col-start-2' : ''}
          />
        ) : null}
      </div>
    </section>
  );
}
