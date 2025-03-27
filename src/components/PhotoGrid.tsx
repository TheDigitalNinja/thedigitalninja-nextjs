/**
 * @file src/components/PhotoGrid.tsx
 * @fileoverview Component to display a grid of photos
 */

"use client";

import { useState } from 'react';
import Image from 'next/image';
import PhotoModal from './PhotoModal';

interface CloudinaryImage {
  id: string;
  title: string;
  public_id: string;
  format: string;
  secure_url: string;
  width: number;
  height: number;
}

interface PhotoGridProps {
  photos: CloudinaryImage[];
  albumName?: string;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, albumName }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<CloudinaryImage | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (photo: CloudinaryImage) => {
    setSelectedPhoto(photo);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    // Delay clearing the selected photo to avoid flickering during the closing animation
    setTimeout(() => setSelectedPhoto(null), 300);
  };

  const navigatePhotos = (direction: 'prev' | 'next') => {
    if (!selectedPhoto) return;
    
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id);
    let newIndex: number;
    
    if (direction === 'prev') {
      newIndex = currentIndex <= 0 ? photos.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex >= photos.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedPhoto(photos[newIndex]);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div 
            key={photo.id} 
            className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
            onClick={() => openModal(photo)}
          >
            <Image
              src={photo.secure_url}
              alt={photo.title}
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          isOpen={modalOpen}
          onClose={closeModal}
          onNavigate={navigatePhotos}
          albumName={albumName}
        />
      )}
    </>
  );
};

export default PhotoGrid;