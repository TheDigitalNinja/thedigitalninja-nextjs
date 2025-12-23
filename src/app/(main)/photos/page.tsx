/**
 * @file src/app/(main)/photos/page.tsx
 * @fileoverview Photos page that displays all albums
 */

import { Metadata } from 'next';
import AlbumGrid from '@/components/AlbumGrid';
import PageLayout from '@/components/PageLayout';
import { getAlbums } from '@/lib/sanity-photo-albums';

export const metadata: Metadata = {
  title: 'Photos - The Digital Ninja',
  description: 'Browse photo albums by Russell Perkins, including travel photography, nature photography, and more.',
  openGraph: {
    title: 'Photos - The Digital Ninja',
    description: 'Browse photo albums by Russell Perkins, including travel photography, nature photography, and more.',
    type: 'website',
    url: 'https://TheDigital.Ninja/photos',
    images: [
      {
        url: 'https://res.cloudinary.com/TheDigitalNinja/image/upload/logo-white-bg_uk6pkk.jpg',
        width: 1200,
        height: 1200,
        alt: 'The Digital Ninja Logo',
      },
    ],
  },
};

export default async function PhotosPage() {
  const albums = await getAlbums();

  return (
    <PageLayout title="Photos">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Photo Albums</h2>
      </div>

      <AlbumGrid albums={albums} />
    </PageLayout>
  );
}

