"use client";

import React, { useState, useRef, useCallback } from 'react';
import { useDictionary } from '../../i18n/LocaleProvider';
import { trackEvent } from '../../lib/analytics';

type FileUploaderProps = {
  onFilesSelectedAction: (files: File[]) => void;
  acceptedFileTypes?: string;
  maxFileSizeMB?: number;
  multiple?: boolean;
  acceptImages?: boolean;
};

export default function FileUploader({
  onFilesSelectedAction,
  acceptedFileTypes,
  maxFileSizeMB = 2000,
  multiple = true,
  acceptImages = false
}: FileUploaderProps) {
  const dictionary = useDictionary();
  const uploaderStrings = dictionary.components.fileUploader;
  const { errors } = uploaderStrings;
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // If acceptedFileTypes is not explicitly provided, determine based on acceptImages
  const fileTypes = acceptedFileTypes || (acceptImages
    ? ".jpg,.jpeg,.png,.webp,.tiff,.tif"
    : "application/pdf");

  // Create a label for display purposes
  const fileTypesLabel = acceptImages
    ? uploaderStrings.accepted.images
    : uploaderStrings.accepted.pdf;

  const maxFileSize = maxFileSizeMB * 1024 * 1024; // Convert MB to bytes

  const validateFiles = useCallback((files: File[]) => {
    if (files.length === 0) return null;

    // Check file types - this needs a more complex validation because we may accept multiple types
    const invalidType = files.find(file => {
      if (acceptImages) {
        // Check image file extensions
        const validExts = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.tif'];
        const fileName = file.name.toLowerCase();
        return !validExts.some(ext => fileName.endsWith(ext)) &&
          !file.type.startsWith('image/');
      } else {
        // Check for PDF
        return file.type !== 'application/pdf' &&
          !file.name.toLowerCase().endsWith('.pdf');
      }
    });

    if (invalidType) {
      trackEvent({
        action: 'file_validation_error',
        category: 'file_upload',
        label: acceptImages ? 'images' : 'pdf',
        params: { reason: 'invalid_type' },
      });
      return errors.invalidType(invalidType.name, fileTypesLabel);
    }

    // Check file sizes
    const oversizedFile = files.find(file => file.size > maxFileSize);
    if (oversizedFile) {
      trackEvent({
        action: 'file_validation_error',
        category: 'file_upload',
        label: acceptImages ? 'images' : 'pdf',
        params: {
          reason: 'too_large',
          max_bytes: maxFileSize,
          attempted_bytes: oversizedFile.size,
        },
      });
      return errors.tooLarge(oversizedFile.name, maxFileSizeMB);
    }

    return null;
  }, [acceptImages, errors, fileTypesLabel, maxFileSize, maxFileSizeMB]);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const validationError = validateFiles(fileArray);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);

    const totalBytes = fileArray.reduce((sum, file) => sum + file.size, 0);
    trackEvent({
      action: 'file_upload',
      category: 'file_upload',
      label: acceptImages ? 'images' : 'pdf',
      params: {
        file_count: fileArray.length,
        total_bytes: totalBytes,
        multiple: multiple ? 1 : 0,
      },
    });
    onFilesSelectedAction(fileArray);
  }, [acceptImages, multiple, onFilesSelectedAction, validateFiles]);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const { files } = e.dataTransfer;
    handleFiles(files);
  }, [handleFiles]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    handleFiles(files);
  }, [handleFiles]);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${dragActive ? 'border-[var(--accent)] bg-[var(--accent)]/10' : 'border-[var(--ui-2)]'}
          ${error ? 'border-[var(--err)] bg-[var(--err)]/5' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={fileTypes}
          multiple={multiple}
          onChange={handleChange}
        />

        <div className="flex flex-col items-center justify-center py-6">
          <svg
            className={`w-12 h-12 mb-3 ${dragActive ? 'text-[var(--accent)]' : 'text-[var(--tx-3)]'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {acceptImages ? (
              // Image icon when accepting images
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            ) : (
              // Document upload icon for PDFs
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            )}
          </svg>

          <p className="mb-2 text-sm text-[var(--tx-2)]">
            <span className="font-semibold">{uploaderStrings.clickToSelect}</span> {uploaderStrings.orDrop(acceptImages ? 'images' : 'pdf')}
          </p>
          <p className="text-xs text-[var(--tx-3)]">
            {acceptImages ? uploaderStrings.accepted.images : uploaderStrings.accepted.pdf} ({uploaderStrings.maxSize(maxFileSizeMB)})
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-2 text-sm text-[var(--err)]">
          {error}
        </div>
      )}
    </div>
  );
}
