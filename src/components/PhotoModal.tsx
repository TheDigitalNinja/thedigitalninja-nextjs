/**
 * @file src/components/PhotoModal.tsx
 * @fileoverview Modal component for displaying full-screen photos
 */

"use client";

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { XMarkIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface CloudinaryImage {
  id: string;
  title: string;
  public_id: string;
  format: string;
  secure_url: string;
  width: number;
  height: number;
}

interface PhotoModalProps {
  photo: CloudinaryImage;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  albumName?: string;
}

const PhotoModal: React.FC<PhotoModalProps> = ({ 
  photo, 
  isOpen, 
  onClose, 
  onNavigate, 
  albumName 
}) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        onNavigate('prev');
        break;
      case 'ArrowRight':
        onNavigate('next');
        break;
      default:
        break;
    }
  }, [isOpen, onClose, onNavigate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    // Lock body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
      <div className="relative w-full h-full flex flex-col">
        {/* Header */}
        <div className="p-4 flex justify-between items-center text-white absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent">
          <div className="text-lg font-medium">
            {albumName && <span className="mr-2">{albumName} /</span>}
            <span>{photo.title}</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-black/50 p-2 hover:bg-black/70"
            aria-label="Close modal"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        {/* Main image */}
        <div className="flex-grow flex items-center justify-center p-4 sm:p-8 md:p-12">
          <Image
            src={photo.secure_url}
            alt={photo.title}
            width={1200}
            height={800}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        
        {/* Navigation controls */}
        <div className="absolute inset-y-0 left-0 flex items-center">
          <button
            onClick={() => onNavigate('prev')}
            className="bg-black/30 hover:bg-black/50 p-2 rounded-r-lg text-white ml-2"
            aria-label="Previous photo"
          >
            <ArrowLeftIcon className="h-8 w-8" />
          </button>
        </div>
        
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            onClick={() => onNavigate('next')}
            className="bg-black/30 hover:bg-black/50 p-2 rounded-l-lg text-white mr-2"
            aria-label="Next photo"
          >
            <ArrowRightIcon className="h-8 w-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;