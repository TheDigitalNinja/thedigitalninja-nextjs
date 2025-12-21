'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import PageLayout from '@/components/PageLayout';
import { MicropostData, getSortedMicropostsData } from '@/lib/sanity-microposts';
import MicroPost from '@/components/MicroPost';

const FeedSkeletonCard = () => {
  const placeholderBase = 'bg-gray-200 dark:bg-gray-700';

  return (
    <article className="break-inside-avoid bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 animate-pulse">
      <div className="mb-4 flex justify-between items-center">
        <span className={`h-4 w-24 rounded ${placeholderBase}`} />
        <span className={`h-4 w-16 rounded ${placeholderBase}`} />
      </div>

      <div className={`h-48 w-full rounded-md ${placeholderBase} mb-4`} />

      <div className="space-y-3">
        <div className={`h-3 w-5/6 rounded ${placeholderBase}`} />
        <div className={`h-3 w-full rounded ${placeholderBase}`} />
        <div className={`h-3 w-2/3 rounded ${placeholderBase}`} />
      </div>
    </article>
  );
};

const MIN_CARD_WIDTH = 400; // px, slightly wider cards, fewer columns on wide screens

const FeedSkeleton = ({ columns }: { columns: number }) => (
  <div className="w-full flex gap-4 md:gap-5 xl:gap-6 items-start">
    {Array.from({ length: columns }).map((_, colIdx) => (
      <div key={colIdx} className="flex-1 space-y-4">
        {Array.from({ length: 3 }).map((__, idx) => (
          <FeedSkeletonCard key={`${colIdx}-${idx}`} />
        ))}
      </div>
    ))}
  </div>
);

export default function FeedPage() {
  const [microposts, setMicroposts] = useState<MicropostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    async function fetchMicroposts() {
      try {
        setLoading(true);
        const data = await getSortedMicropostsData();
        setMicroposts(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching microposts:', err);
        setError('Failed to load microposts. Please try again later.');
        setMicroposts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchMicroposts();
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const computeColumns = () => {
      const width = node.getBoundingClientRect().width;
      const gap = width >= 1280 ? 24 : width >= 768 ? 20 : 16; // align with gap utilities
      const col = Math.max(1, Math.floor((width + gap) / (MIN_CARD_WIDTH + gap)));
      setColumns(col);
    };

    computeColumns();

    const ro = new ResizeObserver(() => computeColumns());
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  const distributed = useMemo(() => {
    const buckets: MicropostData[][] = Array.from({ length: columns }, () => []);
    microposts.forEach((post, idx) => {
      buckets[idx % columns].push(post);
    });
    return buckets;
  }, [microposts, columns]);
  
  return (
    <PageLayout
      title="Feed"
      mainClassName="max-w-none px-2 sm:px-3 md:px-4 lg:px-4 xl:px-4 2xl:px-4"
    >
      <div ref={containerRef} className="w-full" data-columns={columns}>
        {loading ? (
          <FeedSkeleton columns={columns} />
        ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      ) : microposts.length > 0 ? (
          <div className="w-full flex gap-4 md:gap-5 xl:gap-6 items-start">
            {distributed.map((bucket, colIdx) => (
              <div key={colIdx} className="flex-1 space-y-4">
                {bucket.map((post) => (
                  <div key={post.id} className="break-inside-avoid">
                    <MicroPost post={post} />
                  </div>
                ))}
              </div>
            ))}
          </div>
      ) : (
        <div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            No microposts yet. Check back soon!
          </p>
        </div>
      )}
      </div>
    </PageLayout>
  );
}

