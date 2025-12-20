'use client';

import { useState, useEffect } from 'react';
import { MicropostData, getSortedMicropostsData } from '@/lib/sanity-microposts';
import MicroPost from '@/components/MicroPost';

export default function FeedPage() {
  const [microposts, setMicroposts] = useState<MicropostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  
  return (
    <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Loading The Feed...
          </p>
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      ) : microposts.length > 0 ? (
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
  );
}
