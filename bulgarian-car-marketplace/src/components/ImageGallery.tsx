// src/components/ImageGallery.tsx
// Image Gallery Component for Bulgarian Car Marketplace

import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../hooks/useTranslation';

interface ImageGalleryProps {
  images: string[];
  mainImage?: string;
  onMainImageChange?: (image: string) => void;
  className?: string;
  showThumbnails?: boolean;
  maxThumbnails?: number;
}

const GalleryContainer = styled.div`
  width: 100%;
`;

const MainImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.grey[100]};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

const ImageCounter = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const NavigationButton = styled.button<{ position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ position }) => position}: ${({ theme }) => theme.spacing.md};
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.primary};
  box-shadow: ${({ theme }) => theme.shadows.base};
  transition: all 0.2s ease-in-out;

  &:hover {
    background: white;
    transform: translateY(-50%) scale(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: translateY(-50%);
  }
`;

const ThumbnailsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  overflow-x: auto;
  padding-bottom: ${({ theme }) => theme.spacing.sm};

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.grey[100]};
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.grey[300]};
    border-radius: 2px;

    &:hover {
      background: ${({ theme }) => theme.colors.grey[400]};
    }
  }
`;

const Thumbnail = styled.div<{ isActive: boolean }>`
  flex-shrink: 0;
  width: 80px;
  height: 60px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${({ theme, isActive }) =>
    isActive ? theme.colors.primary.main : 'transparent'};
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const NoImagesMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing['4xl']};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};

  .icon {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    opacity: 0.5;
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    margin: 0;
  }
`;

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  mainImage,
  onMainImageChange,
  className,
  showThumbnails = true,
  maxThumbnails = 10
}) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Determine the current image to display
  const currentImage = mainImage || (images.length > 0 ? images[currentIndex] : '');

  const handlePrevious = () => {
    if (images.length > 1) {
      const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
      setCurrentIndex(newIndex);
      if (onMainImageChange) {
        onMainImageChange(images[newIndex]);
      }
    }
  };

  const handleNext = () => {
    if (images.length > 1) {
      const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
      setCurrentIndex(newIndex);
      if (onMainImageChange) {
        onMainImageChange(images[newIndex]);
      }
    }
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    if (onMainImageChange) {
      onMainImageChange(images[index]);
    }
  };

  const displayedThumbnails = images.slice(0, maxThumbnails);
  const hasMoreThumbnails = images.length > maxThumbnails;

  if (images.length === 0) {
    return (
      <GalleryContainer className={className}>
        <NoImagesMessage>
          <div className="icon">📷</div>
          <h3>{t('gallery.noImages')}</h3>
          <p>{t('gallery.noImagesDescription')}</p>
        </NoImagesMessage>
      </GalleryContainer>
    );
  }

  return (
    <GalleryContainer className={className}>
      <MainImageContainer>
        <MainImage src={currentImage} alt={`Car image ${currentIndex + 1}`} />

        {images.length > 1 && (
          <>
            <NavigationButton
              position="left"
              onClick={handlePrevious}
              disabled={images.length <= 1}
              aria-label={t('gallery.previous')}
            >
              ‹
            </NavigationButton>

            <NavigationButton
              position="right"
              onClick={handleNext}
              disabled={images.length <= 1}
              aria-label={t('gallery.next')}
            >
              ›
            </NavigationButton>
          </>
        )}

        <ImageCounter>
          {currentIndex + 1} / {images.length}
        </ImageCounter>
      </MainImageContainer>

      {showThumbnails && images.length > 1 && (
        <ThumbnailsContainer>
          {displayedThumbnails.map((image, index) => (
            <Thumbnail
              key={image}
              isActive={index === currentIndex}
              onClick={() => handleThumbnailClick(index)}
              aria-label={`${t('gallery.thumbnail')} ${index + 1}`}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} />
            </Thumbnail>
          ))}

          {hasMoreThumbnails && (
            <Thumbnail
              isActive={false}
              style={{ cursor: 'default', opacity: 0.7 }}
              aria-label={`${t('gallery.moreImages')} ${images.length - maxThumbnails}`}
            >
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f5f5f5',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#666'
              }}>
                +{images.length - maxThumbnails}
              </div>
            </Thumbnail>
          )}
        </ThumbnailsContainer>
      )}
    </GalleryContainer>
  );
};

export default ImageGallery;