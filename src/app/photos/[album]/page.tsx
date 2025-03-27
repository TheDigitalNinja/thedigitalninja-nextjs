/**
 * @file src/app/photos/[album]/page.tsx
 * @fileoverview Page for displaying photos in a specific album
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PhotoGrid from "../../../components/PhotoGrid";
import { getAlbumPhotos } from "../../../lib/cloudinary";

interface AlbumPageProps {
  params: {
    album: string;
  };
}

export async function generateMetadata({ params }: AlbumPageProps): Promise<Metadata> {
  const album = params.album;
  const formattedName = album.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return {
    title: `${formattedName} Photos - The Digital Ninja`,
    description: `Browse ${formattedName} photos by Russell Perkins.`,
    openGraph: {
      title: `${formattedName} Photos - The Digital Ninja`,
      description: `Browse ${formattedName} photos by Russell Perkins.`,
      type: 'website',
      url: `https://TheDigital.Ninja/photos/${album}`,
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
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { album } = params;
  const photos = await getAlbumPhotos(album);
  
  if (photos.length === 0) {
    notFound();
  }

  const albumName = album.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <div className="flex flex-col w-full md:pl-64">
        <Header title={`${albumName} Photos`} />
        <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">{albumName} Album</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Browse through my collection of {albumName.toLowerCase()} photos. Click on any photo to view it in full size.
            </p>
          </div>
          
          <PhotoGrid photos={photos} albumName={albumName} />
        </main>
      </div>
    </div>
  );
}