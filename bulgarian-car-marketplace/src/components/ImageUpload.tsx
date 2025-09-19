// src/components/ImageUpload.tsx
// Image Upload Component for Bulgarian Car Marketplace
// Image Upload component for Bulgarian Car Marketplace

import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../hooks/useTranslation';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  maxSizeMB?: number;
  className?: string;
}

interface ImageFile {
  file: File;
  preview: string;
  uploading: boolean;
  error?: string;
}

const UploadContainer = styled.div`
  width: 100%;
`;

const UploadArea = styled.div<{ isDragOver: boolean; disabled: boolean }>`
  border: 2px dashed ${({ theme, isDragOver }) =>
    isDragOver ? theme.colors.primary.main : theme.colors.grey[300]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing['3xl']};
  text-align: center;
  background: ${({ theme, isDragOver }) =>
    isDragOver ? theme.colors.primary.main + '10' : theme.colors.grey[50]};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease-in-out;
  opacity: ${({ disabled }) => disabled ? 0.6 : 1};

  &:hover {
    border-color: ${({ theme, disabled }) =>
      disabled ? theme.colors.grey[300] : theme.colors.primary.main};
    background: ${({ theme, disabled }) =>
      disabled ? theme.colors.grey[50] : theme.colors.primary.main + '05'};
  }
`;

const UploadIcon = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  color: ${({ theme }) => theme.colors.grey[400]};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const UploadText = styled.div`
  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const ImageItem = styled.div`
  position: relative;
  aspect-ratio: 4/3;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.grey[100]};
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  ${ImageItem}:hover & {
    opacity: 1;
  }
`;

const ImageActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ActionButton = styled.button<{ variant: 'primary' | 'danger' }>`
  padding: ${({ theme }) => theme.spacing.sm};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme, variant }) =>
    variant === 'danger' ? theme.colors.error.main : theme.colors.primary.main};
  color: white;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${({ theme, variant }) =>
      variant === 'danger' ? theme.colors.error.dark : theme.colors.primary.dark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const UploadProgress = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: ${({ theme }) => theme.colors.grey[300]};
`;

const ProgressBar = styled.div<{ progress: number }>`
  height: 100%;
  background: ${({ theme }) => theme.colors.primary.main};
  width: ${({ progress }) => progress}%;
  transition: width 0.3s ease-in-out;
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error.main};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
  text-align: center;
`;

const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  onImagesChange,
  maxImages = 10,
  maxSizeMB = 5,
  className
}) => {
  const { t } = useTranslation();
  const [isDragOver, setIsDragOver] = useState(false);
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback((file: File): string | null => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      return t('upload.errors.invalidType');
    }

    // Check file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return `File size too large. Maximum size is ${maxSizeMB}MB`;
    }

    return null;
  }, [maxSizeMB, t]);

  const uploadFile = useCallback(async (imageFile: ImageFile) => {
    // Update status to uploading
    setImageFiles(prev =>
      prev.map(f =>
        f.file === imageFile.file
          ? { ...f, uploading: true, error: undefined }
          : f
      )
    );

    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In a real implementation, you would upload to Firebase Storage
      // For now, we'll just use the preview URL
      const uploadedUrl = imageFile.preview;

      // Update images array
      onImagesChange([...images, uploadedUrl]);

      // Remove from local files
      setImageFiles(prev => prev.filter(f => f.file !== imageFile.file));

      // Clean up object URL
      URL.revokeObjectURL(imageFile.preview);

    } catch (error) {
      setImageFiles(prev =>
        prev.map(f =>
          f.file === imageFile.file
            ? { ...f, uploading: false, error: t('upload.errors.uploadFailed') }
            : f
        )
      );
    }
  }, [images, onImagesChange, t]);

  const processFiles = useCallback(async (files: FileList) => {
    const newFiles: ImageFile[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate file
      const error = validateFile(file);
      if (error) {
        newFiles.push({
          file,
          preview: '',
          uploading: false,
          error
        });
        continue;
      }

      // Create preview
      const preview = URL.createObjectURL(file);
      newFiles.push({
        file,
        preview,
        uploading: false
      });
    }

    setImageFiles(prev => [...prev, ...newFiles]);

    // Upload files
    for (const imageFile of newFiles) {
      if (!imageFile.error) {
        await uploadFile(imageFile);
      }
    }
  }, [validateFile, uploadFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFiles(files);
    }
  }, [processFiles]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
  }, [processFiles]);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const removeImage = useCallback((index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  }, [images, onImagesChange]);

  const removeLocalFile = useCallback((file: File) => {
    setImageFiles(prev => {
      const filtered = prev.filter(f => f.file !== file);
      // Clean up object URL
      const fileToRemove = prev.find(f => f.file === file);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return filtered;
    });
  }, []);

  const isDisabled = images.length >= maxImages;

  return (
    <UploadContainer className={className}>
      <UploadArea
        isDragOver={isDragOver}
        disabled={isDisabled}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleUploadClick}
      >
        <UploadIcon>📷</UploadIcon>
        <UploadText>
          <h3>{t('upload.title')}</h3>
          <p>
            {isDisabled
              ? `Maximum ${maxImages} images reached`
              : `Drag & drop images or click to select. Max ${maxImages} images, ${maxSizeMB}MB each`
            }
          </p>
        </UploadText>
        <HiddenInput
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          disabled={isDisabled}
        />
      </UploadArea>

      {/* Display uploaded images */}
      {images.length > 0 && (
        <ImagesGrid>
          {images.map((image, index) => (
            <ImageItem key={`uploaded-${index}`}>
              <ImagePreview src={image} alt={`Car image ${index + 1}`} />
              <ImageOverlay>
                <ImageActions>
                  <ActionButton
                    variant="danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(index);
                    }}
                    title={t('upload.remove')}
                  >
                    🗑️
                  </ActionButton>
                </ImageActions>
              </ImageOverlay>
            </ImageItem>
          ))}
        </ImagesGrid>
      )}

      {/* Display local files being uploaded */}
      {imageFiles.length > 0 && (
        <ImagesGrid>
          {imageFiles.map((imageFile, index) => (
            <ImageItem key={`local-${index}`}>
              {imageFile.preview && (
                <ImagePreview src={imageFile.preview} alt="Preview" />
              )}
              {imageFile.uploading && (
                <UploadProgress>
                  <ProgressBar progress={50} />
                </UploadProgress>
              )}
              {imageFile.error && (
                <ErrorMessage>{imageFile.error}</ErrorMessage>
              )}
              <ImageOverlay>
                <ImageActions>
                  <ActionButton
                    variant="danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeLocalFile(imageFile.file);
                    }}
                    disabled={imageFile.uploading}
                    title={t('upload.cancel')}
                  >
                    ❌
                  </ActionButton>
                </ImageActions>
              </ImageOverlay>
            </ImageItem>
          ))}
        </ImagesGrid>
      )}
    </UploadContainer>
  );
};

export default ImageUpload;