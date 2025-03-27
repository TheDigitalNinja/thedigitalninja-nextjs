/**
 * @file src/app/photos/page.tsx
 * @fileoverview Photos page that displays all albums
 */

import { Metadata } from 'next';
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import AlbumGrid from "../../components/AlbumGrid";
import { getAlbums } from "../../lib/cloudinary";

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
    <div className="min-h-screen md:flex">
      <Sidebar />
      <div className="flex flex-col w-full md:pl-64">
        <Header title="Photos" />
        <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Photo Albums</h2>
          </div>
          
          <AlbumGrid albums={albums} />
        </main>
      </div>
    </div>
  );
}