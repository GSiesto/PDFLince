"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import FileUploader from './FileUploader';
import FileList from './FileList';
import PageSelector from './PageSelector';
import PageOrderer from './PageOrderer';
import ProcessingOptions from './ProcessingOptions';
import { ProcessingStatusDialog } from './ProcessingStatusDialog';
import type {
  DialogAction,
  DialogHighlight,
  DonationPrompt,
} from './ProcessingStatusDialog';
import { useNotification } from '../ui/Notification';
import {
  PDFProcessingOptions,
  ProcessingResult,
  createPdfBlob,
  getPdfPageCount,
  processPDF,
} from '../../lib/pdf-processor';
import { useDictionary } from '../../i18n/LocaleProvider';
import CompressionPreviewCard, { PreviewStatus } from './CompressionPreviewCard';
import CompressionSummaryCard from './CompressionSummaryCard';
import type { OperationKey } from '../../types/operations';
import { trackEvent } from '../../lib/analytics';

type ProcessingMode = OperationKey;

const cloneOptions = (options: PDFProcessingOptions): PDFProcessingOptions => ({
  ...options,
  metadata: options.metadata ? { ...options.metadata } : undefined,
});

const DEFAULT_IMAGE_BASE_NAME = 'pdflince_pages';

const MODE_DEFAULTS: Record<ProcessingMode, PDFProcessingOptions> = {
  merge: {
    addPageDividers: false,
  },
  compress: {
    compressionLevel: 'medium',
    preserveMetadata: false,
    stripAnnotations: false,
    downscaleImages: true,
    downscaleImagesDpi: 150,
  },
  split: {
    pagesPerFile: 1,
  },
  extract: {
    preserveMetadata: true,
  },
  reorder: {
    preserveMetadata: true,
  },
  pdfToImages: {
    imageOutputFormat: 'png',
    imageOutputQuality: 0.9,
    imageRenderDpi: 144,
    bundleAsZip: true,
    imageBaseName: DEFAULT_IMAGE_BASE_NAME,
  },
  imagesToPdf: {
    imageFit: 'contain',
    pageSize: 'auto',
    pageOrientation: 'auto',
    pageMarginPoints: 18,
    backgroundColor: '#ffffff',
  },
};

const MODE_TABS: ProcessingMode[] = [
  'merge',
  'compress',
  'split',
  'extract',
  'reorder',
  'pdfToImages',
  'imagesToPdf',
];

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.tif'];
const IMAGE_MIME_PREFIX = 'image/';

const isPdfFile = (file: File) =>
  file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

const isImageFile = (file: File) => {
  if (file.type.startsWith(IMAGE_MIME_PREFIX)) {
    return true;
  }
  const lower = file.name.toLowerCase();
  return IMAGE_EXTENSIONS.some(ext => lower.endsWith(ext));
};

type CompressionPreviewEntry = {
  result: ProcessingResult;
  fileSignature: string;
  optionsSignature: string;
  generatedAt: number;
};

type CompressionSummaryEntry = {
  id: string;
  fileName: string;
  result: ProcessingResult;
  blob: Blob;
  elapsedSeconds: number;
  originalFile: File;
};

type PreviewStateEntry = {
  status: PreviewStatus;
  error?: string;
};

type PreviewStateMap = Record<string, PreviewStateEntry>;

type DownloadEntry = {
  blob: Blob;
  fileName: string;
};

type ProcessingDialogState = {
  isOpen: boolean;
  status: 'processing' | 'success' | 'error';
  title: string;
  description?: string;
  highlights: DialogHighlight[];
  downloads: DownloadEntry[];
  donationPrompt: DonationPrompt | null;
};

const createSummaryId = () =>
  typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

const serializeOptions = (options: PDFProcessingOptions) =>
  JSON.stringify(
    Object.entries(options)
      .filter(([, value]) => value !== undefined)
      .sort(([a], [b]) => a.localeCompare(b))
  );

const stripPdfExtension = (name: string) => name.replace(/\.pdf$/i, '');

const ensurePdfExtension = (name: string) =>
  name.toLowerCase().endsWith('.pdf') ? name : `${name}.pdf`;

const areSelectionsEqual = (a: Record<number, boolean>, b: Record<number, boolean>) => {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  for (let index = 0; index < aKeys.length; index += 1) {
    const key = aKeys[index];
    if (!Object.prototype.hasOwnProperty.call(b, key)) {
      return false;
    }

    const numericKey = Number(key);
    if (!!a[numericKey] !== !!b[numericKey]) {
      return false;
    }
  }

  return true;
};

const areOrdersEqual = (a: number[], b: number[]) => {
  if (a.length !== b.length) {
    return false;
  }

  for (let index = 0; index < a.length; index += 1) {
    if (a[index] !== b[index]) {
      return false;
    }
  }

  return true;
};

export default function PDFProcessor({ initialMode = 'merge' }: { initialMode?: ProcessingMode }) {
  const dictionary = useDictionary();
  const processorStrings = dictionary.components.pdfProcessor;
  const ordererStrings = dictionary.components.pageOrderer;
  const fileListStrings = dictionary.components.fileList;
  const { error, NotificationContainer } = useNotification();


  const [files, setFiles] = useState<File[]>([]);
  const filesRef = useRef(files);
  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  const [mode, setMode] = useState<ProcessingMode>(initialMode);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPages, setSelectedPages] = useState<Record<number, boolean>>({});
  const [pageOrder, setPageOrder] = useState<number[]>([]);
  const [extractSelectionsByFile, setExtractSelectionsByFile] = useState<Record<string, Record<number, boolean>>>({});
  const [reorderOrdersByFile, setReorderOrdersByFile] = useState<Record<string, number[]>>({});
  const [currentFileIndex, setCurrentFileIndex] = useState<number>(0);
  const [compressionPreviewCache, setCompressionPreviewCache] = useState<Record<string, CompressionPreviewEntry>>({});
  const [compressionPreviewStates, setCompressionPreviewStates] = useState<PreviewStateMap>({});
  const [compressionSummary, setCompressionSummary] = useState<CompressionSummaryEntry[]>([]);
  const [statusDialogState, setStatusDialogState] = useState<ProcessingDialogState>({
    isOpen: false,
    status: 'processing',
    title: '',
    description: undefined,
    highlights: [],
    downloads: [],
    donationPrompt: null,
  });
  const modeOptionsRef = useRef<Record<ProcessingMode, PDFProcessingOptions>>({
    merge: cloneOptions(MODE_DEFAULTS.merge),
    compress: cloneOptions(MODE_DEFAULTS.compress),
    split: cloneOptions(MODE_DEFAULTS.split),
    extract: cloneOptions(MODE_DEFAULTS.extract),
    reorder: cloneOptions(MODE_DEFAULTS.reorder),
    pdfToImages: cloneOptions(MODE_DEFAULTS.pdfToImages),
    imagesToPdf: cloneOptions(MODE_DEFAULTS.imagesToPdf),
  });
  const [processingOptions, setProcessingOptions] = useState<PDFProcessingOptions>(() =>
    cloneOptions(
      modeOptionsRef.current[initialMode] ?? MODE_DEFAULTS[initialMode] ?? MODE_DEFAULTS.merge
    )
  );

  const {
    modes,
    upload,
    downloadNames,
    processButton,
    statusMessages,
    errors: errorStrings,
    labels,
    compressionPreview: compressionPreviewStrings,
    compressionSummary: compressionSummaryStrings,
    statusDialog: statusDialogStrings,
  } = processorStrings;

  const listHeadings = upload.listHeadings;

  const listHeading = useMemo(() => {
    const candidate = (listHeadings as Record<string, string>)[mode];
    return candidate ?? listHeadings.default;
  }, [mode, listHeadings]);

  const currentFile =
    mode === 'extract' || mode === 'reorder'
      ? files[currentFileIndex] ?? null
      : files[0] ?? null;

  const trackProcessorEvent = useCallback(
    (action: string, params?: Record<string, unknown>) => {
      trackEvent({
        action,
        category: 'processor',
        label: mode,
        params,
      });
    },
    [mode]
  );

  const buildFileSignature = useCallback(
    (file: File) => `${file.name}_${file.size}_${file.lastModified}`,
    []
  );

  const buildOptionsSignature = useCallback(
    (options: PDFProcessingOptions) => serializeOptions(options),
    []
  );

  const buildPreviewKey = useCallback(
    (file: File, options: PDFProcessingOptions) =>
      `compress_${buildFileSignature(file)}_${buildOptionsSignature(options)}`,
    [buildFileSignature, buildOptionsSignature]
  );

  const buildFileName = useCallback(
    (operation: ProcessingMode, originalName?: string, index?: number) => {
      // Check for custom title in merge mode
      if (operation === 'merge' && processingOptions.metadata?.title) {
        const customTitle = processingOptions.metadata.title.trim();
        if (customTitle) {
          // Sanitize the custom title to be safe for filenames
          const sanitizedTitle = customTitle.replace(/[^a-zA-Z0-9-_ ]/g, '').replace(/\s+/g, '_');
          return ensurePdfExtension(`${sanitizedTitle}_pdflince`);
        }
      }

      const base = downloadNames[operation] ?? `pdflince_${operation}`;

      if (!originalName) {
        if (operation === 'split' && typeof index === 'number') {
          return ensurePdfExtension(`${base}_${index + 1}`);
        }
        return ensurePdfExtension(base);
      }

      const sanitized = operation === 'imagesToPdf'
        ? originalName.replace(/\.[^/.]+$/, '')
        : stripPdfExtension(originalName);

      if (operation === 'split') {
        const suffix = typeof index === 'number' ? `_${index + 1}` : '';
        return ensurePdfExtension(`${sanitized}${suffix}`);
      }

      return ensurePdfExtension(`${sanitized}_${base}`);
    },
    [downloadNames, processingOptions.metadata]
  );

  const currentFileKey = currentFile ? buildFileSignature(currentFile) : null;

  const previewItems = useMemo(() => {
    if (mode !== 'compress' || files.length === 0) {
      return [] as Array<{
        key: string;
        file: File;
        index: number;
        status: PreviewStatus;
        error?: string;
        result?: ProcessingResult;
      }>;
    }

    const entries: Array<{
      key: string;
      file: File;
      index: number;
      status: PreviewStatus;
      error?: string;
      result?: ProcessingResult;
    }> = [];

    files.forEach((file, index) => {
      const key = buildPreviewKey(file, processingOptions);
      const state = key ? compressionPreviewStates[key] : undefined;
      const cacheEntry = key ? compressionPreviewCache[key] : undefined;

      if (!key) {
        return;
      }

      const hasResult = Boolean(cacheEntry?.result);
      const status = !hasResult && state?.status === 'ready'
        ? 'running'
        : state?.status ?? 'idle';

      entries.push({
        key,
        file,
        index,
        status,
        error: state?.error,
        result: cacheEntry?.result,
      });
    });

    return entries;
  }, [mode, files, processingOptions, compressionPreviewStates, compressionPreviewCache, buildPreviewKey]);

  useEffect(() => {
    if (mode !== 'compress') {
      if (Object.keys(compressionPreviewStates).length > 0) {
        setCompressionPreviewStates({});
      }
      return;
    }

    setCompressionPreviewStates(prev => {
      const next: PreviewStateMap = {};
      files.forEach(file => {
        const key = buildPreviewKey(file, processingOptions);
        if (key && prev[key]) {
          next[key] = prev[key];
        }
      });

      const prevKeys = Object.keys(prev);
      const nextKeys = Object.keys(next);
      const sameSize = prevKeys.length === nextKeys.length;
      const sameEntries = sameSize && nextKeys.every(key => prev[key] === next[key]);
      return sameEntries ? prev : next;
    });
  }, [mode, files, processingOptions, buildPreviewKey, compressionPreviewStates]);

  const ensurePreviewForFile = useCallback(
    async (
      file: File,
      key: string,
      cachedEntry: CompressionPreviewEntry | undefined,
      isCancelled: () => boolean
    ) => {
      if (cachedEntry) {
        setCompressionPreviewStates(prev => ({
          ...prev,
          [key]: { status: 'ready' },
        }));
        return cachedEntry.result;
      }

      let shouldSkip = false;
      setCompressionPreviewStates(prev => {
        const existing = prev[key];
        if (existing?.status === 'running') {
          shouldSkip = true;
          return prev;
        }
        return {
          ...prev,
          [key]: { status: 'running' },
        };
      });

      if (shouldSkip) {
        return cachedEntry?.result;
      }

      try {
        const result = await processPDF('compress', [file], processingOptions);
        if (isCancelled()) {
          return undefined;
        }

        setCompressionPreviewCache(prev => ({
          ...prev,
          [key]: {
            result,
            fileSignature: buildFileSignature(file),
            optionsSignature: buildOptionsSignature(processingOptions),
            generatedAt: Date.now(),
          },
        }));
        setCompressionPreviewStates(prev => ({
          ...prev,
          [key]: { status: 'ready' },
        }));
        return result;
      } catch (err) {
        if (isCancelled()) {
          return undefined;
        }
        const message = err instanceof Error && err.message ? err.message : errorStrings.unknown;
        setCompressionPreviewStates(prev => ({
          ...prev,
          [key]: { status: 'error', error: message },
        }));
        return undefined;
      }
    },
    [processingOptions, buildFileSignature, buildOptionsSignature, errorStrings.unknown]
  );

  const compressionPreviewStatesRef = useRef(compressionPreviewStates);
  useEffect(() => {
    compressionPreviewStatesRef.current = compressionPreviewStates;
  }, [compressionPreviewStates]);

  const compressionPreviewCacheRef = useRef(compressionPreviewCache);
  useEffect(() => {
    compressionPreviewCacheRef.current = compressionPreviewCache;
  }, [compressionPreviewCache]);

  const isMountedRef = useRef(true);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const requestPreview = useCallback(
    (file: File) => {
      const key = buildPreviewKey(file, processingOptions);
      if (!key) {
        return;
      }

      const stateEntry = compressionPreviewStatesRef.current[key];
      const cacheEntry = compressionPreviewCacheRef.current[key];

      if (stateEntry?.status === 'running') {
        return;
      }

      if (stateEntry?.status === 'ready' && cacheEntry) {
        return;
      }

      void ensurePreviewForFile(file, key, cacheEntry, () => !isMountedRef.current);
    },
    [buildPreviewKey, ensurePreviewForFile, processingOptions]
  );

  useEffect(() => {
    if (mode !== 'compress' || files.length === 0 || isProcessing) {
      return;
    }

    files.forEach(requestPreview);
  }, [mode, files, requestPreview, isProcessing]);

  const handleRetryPreviewAction = (retryKey: string) => {
    setCompressionPreviewCache(prev => {
      if (!prev[retryKey]) {
        return prev;
      }

      const next = { ...prev };
      delete next[retryKey];
      return next;
    });

    setCompressionPreviewStates(prev => ({
      ...prev,
      [retryKey]: { status: 'idle' },
    }));

    const targetFile = files.find(file => buildPreviewKey(file, processingOptions) === retryKey);
    const targetIndex = targetFile ? files.findIndex(candidate => candidate === targetFile) : -1;
    trackProcessorEvent('compression_preview_retry', {
      has_target: Boolean(targetFile),
      file_index: targetIndex >= 0 ? targetIndex : undefined,
    });
    if (targetFile) {
      requestPreview(targetFile);
    }
  };

  const handleSummaryDownloadAction = (entry: CompressionSummaryEntry) => {
    triggerDownloadAction(entry.blob, entry.fileName);
    trackProcessorEvent('summary_download', {
      size_bytes: entry.blob.size ?? undefined,
    });
  };

  const handleClearSummaryAction = (entryId: string) => {
    setCompressionSummary(prev => {
      const next = prev.filter(item => item.id !== entryId);
      trackProcessorEvent('summary_entry_removed', {
        remaining: next.length,
      });
      return next;
    });
  };

  const handleFilesSelected = (selectedFiles: File[]) => {
    if (selectedFiles.length === 0) {
      return;
    }

    trackProcessorEvent('files_selected', {
      selection_count: selectedFiles.length,
    });

    if (mode === 'pdfToImages') {
      const pdfCandidates = selectedFiles.filter(isPdfFile);
      if (pdfCandidates.length === 0) {
        trackProcessorEvent('file_rejected', {
          reason: 'invalid_pdf',
          selection_count: selectedFiles.length,
        });
        error(errorStrings.invalidFile);
        return;
      }

      trackProcessorEvent('files_added', {
        accepted_count: pdfCandidates.length,
        previous_total: files.length,
        new_total: files.length + pdfCandidates.length,
      });
      setFiles(prevFiles => [...prevFiles, ...pdfCandidates]);
      setCompressionSummary([]);
      return;
    }

    if (mode === 'imagesToPdf') {
      const imageCandidates = selectedFiles.filter(isImageFile);
      if (imageCandidates.length === 0) {
        trackProcessorEvent('file_rejected', {
          reason: 'invalid_image',
          selection_count: selectedFiles.length,
        });
        error(errorStrings.invalidFile);
        return;
      }
      trackProcessorEvent('files_added', {
        accepted_count: imageCandidates.length,
        previous_total: files.length,
        new_total: files.length + imageCandidates.length,
      });
      setFiles(prevFiles => [...prevFiles, ...imageCandidates]);
      setCompressionSummary([]);
      return;
    }

    const pdfCandidates = selectedFiles.filter(isPdfFile);
    if (pdfCandidates.length === 0) {
      trackProcessorEvent('file_rejected', {
        reason: 'invalid_pdf',
        selection_count: selectedFiles.length,
      });
      error(errorStrings.invalidFile);
      return;
    }

    trackProcessorEvent('files_added', {
      accepted_count: pdfCandidates.length,
      previous_total: files.length,
      new_total: files.length + pdfCandidates.length,
    });
    setFiles(prevFiles => [...prevFiles, ...pdfCandidates]);
    setCompressionSummary([]);
  };

  useEffect(() => {
    const activeKeys = new Set(files.map(file => buildFileSignature(file)));

    setExtractSelectionsByFile(prev => {
      const entries = Object.entries(prev).filter(([key]) => activeKeys.has(key));
      if (entries.length === Object.keys(prev).length) {
        return prev;
      }
      return entries.length === 0 ? {} : Object.fromEntries(entries);
    });

    setReorderOrdersByFile(prev => {
      const entries = Object.entries(prev).filter(([key]) => activeKeys.has(key));
      if (entries.length === Object.keys(prev).length) {
        return prev;
      }
      return entries.length === 0 ? {} : Object.fromEntries(entries);
    });
  }, [files, buildFileSignature]);

  useEffect(() => {
    modeOptionsRef.current[mode] = cloneOptions(processingOptions);
  }, [mode, processingOptions]);

  const handleModeChange = (newMode: ProcessingMode) => {
    if (newMode === mode) {
      return;
    }

    modeOptionsRef.current[mode] = cloneOptions(processingOptions);

    const stored = modeOptionsRef.current[newMode];
    const nextOptions = stored ? cloneOptions(stored) : cloneOptions(MODE_DEFAULTS[newMode]);
    const firstFile = files[0];
    const firstFileKey = firstFile ? buildFileSignature(firstFile) : null;

    setFiles(prevFiles => {
      if (newMode === 'pdfToImages') {
        const pdfCandidates = prevFiles.filter(candidate => isPdfFile(candidate));
        return pdfCandidates;
      }

      if (newMode === 'imagesToPdf') {
        return prevFiles.filter(candidate => isImageFile(candidate));
      }

      return prevFiles;
    });

    const nextSelectedPages =
      newMode === 'extract' && firstFileKey
        ? { ...(extractSelectionsByFile[firstFileKey] ?? {}) }
        : {};
    const nextPageOrder =
      newMode === 'reorder' && firstFileKey && reorderOrdersByFile[firstFileKey]
        ? [...(reorderOrdersByFile[firstFileKey] ?? [])]
        : [];

    setMode(newMode);
    setSelectedPages(nextSelectedPages);
    setPageOrder(nextPageOrder);
    setCurrentFileIndex(0);
    setCompressionSummary([]);
    setCompressionPreviewStates({});
    setCompressionPreviewCache({});
    setProcessingOptions(nextOptions);

    trackEvent({
      action: 'mode_change',
      category: 'processor',
      label: newMode,
      params: {
        previous_mode: mode,
        file_count: files.length,
      },
    });
  };

  const triggerDownloadAction = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const buildDonationPrompt = (): DonationPrompt | null => {
    // Donation prompt disabled for initial deployment
    return null;
  };

  const openProcessingDialog = (description: string) => {
    if (!statusDialogStrings) {
      return;
    }

    setStatusDialogState({
      isOpen: true,
      status: 'processing',
      title: statusDialogStrings.processingTitle,
      description,
      highlights: [],
      downloads: [],
      donationPrompt: null,
    });
  };

  const showSuccessDialog = ({
    description,
    highlights,
    downloads,
    donationPrompt,
  }: {
    description?: string;
    highlights?: DialogHighlight[];
    downloads: DownloadEntry[];
    donationPrompt?: DonationPrompt | null;
  }) => {
    if (!statusDialogStrings) {
      return;
    }

    const resolvedPrompt = donationPrompt ?? buildDonationPrompt();

    if (resolvedPrompt) {
      trackProcessorEvent('donation_prompt_shown', {
        prompt_source: donationPrompt ? 'explicit' : 'auto',
        download_count: downloads.length,
      });
    }

    setStatusDialogState({
      isOpen: true,
      status: 'success',
      title: statusDialogStrings.successTitle,
      description: description ?? statusDialogStrings.successDescription,
      highlights: highlights ?? [],
      downloads,
      donationPrompt: resolvedPrompt,
    });
  };

  const showErrorDialog = (message?: string) => {
    if (!statusDialogStrings) {
      return;
    }

    setStatusDialogState({
      isOpen: true,
      status: 'error',
      title: statusDialogStrings.errorTitle,
      description: message ?? statusDialogStrings.errorDescription,
      highlights: [],
      downloads: [],
      donationPrompt: null,
    });
  };

  const handleProcess = async () => {
    if (isProcessing) {
      return;
    }

    if (!statusDialogStrings) {
      trackProcessorEvent('operation_error', { reason: 'missing_status_strings' });
      error(errorStrings.unknown);
      return;
    }

    const currentFiles = filesRef.current;

    if (currentFiles.length === 0) {
      trackProcessorEvent('operation_blocked', { reason: 'no_files' });
      return;
    }

    const modeLabel = modes[mode]?.label ?? mode;
    const downloads: DownloadEntry[] = [];
    const compressionEntriesBuffer: CompressionSummaryEntry[] = [];
    const extractPlan: Array<{ file: File; pages: number[] }> = [];


    switch (mode) {
      case 'merge':
        if (currentFiles.length < 2) {
          trackProcessorEvent('operation_blocked', {
            reason: 'merge_requires_two',
            file_count: currentFiles.length,
          });
          error(errorStrings.mergeRequiresTwo);
          return;
        }
        break;
      case 'split':
        if (currentFiles.length === 0) {
          trackProcessorEvent('operation_blocked', {
            reason: 'split_no_files',
          });
          error(errorStrings.noFiles);
          return;
        }
        break;
      case 'extract': {
        const activeKey = currentFileKey;
        currentFiles.forEach(file => {
          const key = buildFileSignature(file);
          const selectionRecord =
            key === activeKey ? selectedPages : extractSelectionsByFile[key] ?? {};
          const pages = Object.keys(selectionRecord)
            .map(page => parseInt(page, 10))
            .filter(page => selectionRecord[page])
            .sort((a, b) => a - b);
          if (pages.length > 0) {
            extractPlan.push({ file, pages });
          }
        });

        if (extractPlan.length === 0) {
          trackProcessorEvent('operation_blocked', { reason: 'extract_no_pages' });
          error(errorStrings.noPagesSelected);
          return;
        }
        break;
      }
      case 'reorder':
        if (currentFiles.length === 0) {
          trackProcessorEvent('operation_blocked', { reason: 'reorder_no_files' });
          error(errorStrings.noFiles);
          return;
        }
        break;
      case 'pdfToImages': {
        if (currentFiles.length === 0) {
          trackProcessorEvent('operation_blocked', { reason: 'pdf_to_images_no_files' });
          error(errorStrings.noFiles);
          return;
        }
        if (currentFiles.find(file => !isPdfFile(file))) {
          trackProcessorEvent('operation_blocked', { reason: 'pdf_to_images_invalid_source' });
          error(errorStrings.invalidFile);
          return;
        }
        break;
      }
      case 'imagesToPdf':
        if (currentFiles.length === 0) {
          trackProcessorEvent('operation_blocked', { reason: 'images_to_pdf_no_files' });
          error(errorStrings.noFiles);
          return;
        }
        if (currentFiles.find(file => !isImageFile(file))) {
          trackProcessorEvent('operation_blocked', { reason: 'images_to_pdf_invalid_source' });
          error(errorStrings.invalidFile);
          return;
        }
        break;
      default:
        break;
    }

    setIsProcessing(true);
    openProcessingDialog(statusMessages.info(modeLabel));
    trackProcessorEvent('operation_start', {
      file_count: currentFiles.length,
    });

    try {
      switch (mode) {
        case 'compress': {
          setCompressionSummary([]);
          let totalOriginalBytes = 0;
          let totalProcessedBytes = 0;
          let totalElapsedSeconds = 0;

          for (let index = 0; index < currentFiles.length; index += 1) {
            // Yield to main thread to keep UI responsive
            await new Promise(resolve => setTimeout(resolve, 0));

            const targetFile = currentFiles[index];
            if (!targetFile) {
              continue;
            }

            try {
              const key = buildPreviewKey(targetFile, processingOptions);
              const startedAt = Date.now();
              let compressResult: ProcessingResult;

              const cachedEntry = compressionPreviewCache[key];
              if (cachedEntry) {
                compressResult = cachedEntry.result;
              } else {
                compressResult = await processPDF('compress', [targetFile], processingOptions);
                setCompressionPreviewCache(prev => ({
                  ...prev,
                  [key]: {
                    result: compressResult,
                    fileSignature: buildFileSignature(targetFile),
                    optionsSignature: buildOptionsSignature(processingOptions),
                    generatedAt: Date.now(),
                  },
                }));
              }

              if (key) {
                setCompressionPreviewStates(prev => ({
                  ...prev,
                  [key]: { status: 'ready' },
                }));
              }

              const compressedBlob = createPdfBlob(compressResult.data);
              const downloadName = buildFileName('compress', targetFile.name);
              downloads.push({ blob: compressedBlob, fileName: downloadName });
              triggerDownloadAction(compressedBlob, downloadName);

              const elapsedSeconds =
                typeof compressResult.processingTimeMs === 'number' && compressResult.processingTimeMs > 0
                  ? compressResult.processingTimeMs / 1000
                  : (Date.now() - startedAt) / 1000;

              totalOriginalBytes += compressResult.originalSize;
              totalProcessedBytes += compressResult.processedSize;
              totalElapsedSeconds += elapsedSeconds;

              compressionEntriesBuffer.push({
                id: createSummaryId(),
                fileName: downloadName,
                result: compressResult,
                blob: compressedBlob,
                elapsedSeconds,
                originalFile: targetFile,
              });
            } catch (fileErr) {
              console.error(`Error compressing file ${targetFile.name}:`, fileErr);
              // Continue to next file instead of aborting everything
              trackProcessorEvent('file_processing_error', {
                mode: 'compress',
                file_name: targetFile.name,
                error: fileErr instanceof Error ? fileErr.message : 'unknown',
              });
            }
          }

          if (compressionEntriesBuffer.length === 0) {
            showErrorDialog(errorStrings.noFiles);
            trackProcessorEvent('operation_error', { reason: 'compress_no_results' });
            return;
          }

          const savedBytesTotal = Math.max(0, totalOriginalBytes - totalProcessedBytes);
          const reductionPercentTotal =
            totalOriginalBytes > 0
              ? (((totalOriginalBytes - totalProcessedBytes) / totalOriginalBytes) * 100).toFixed(1)
              : undefined;
          const reductionPercentValue =
            typeof reductionPercentTotal === 'string' ? parseFloat(reductionPercentTotal) : undefined;

          setCompressionSummary([...compressionEntriesBuffer]);

          const highlightEntries: DialogHighlight[] = [];
          const savingsLabel = compressionSummaryStrings.saved(formatFileSize(savedBytesTotal));
          if (reductionPercentTotal) {
            highlightEntries.push({
              label: statusDialogStrings.resultsLabel,
              value: `${compressionSummaryStrings.ratio(reductionPercentTotal)} · ${savingsLabel}`,
            });
          } else {
            highlightEntries.push({
              label: statusDialogStrings.resultsLabel,
              value: savingsLabel,
            });
          }

          if (files.length > 1) {
            highlightEntries.push({
              label: statusDialogStrings.filesProcessedLabel(files.length),
            });
          }

          if (totalElapsedSeconds > 0) {
            const totalLabel = totalElapsedSeconds.toFixed(1);
            highlightEntries.push({
              label: compressionSummaryStrings.duration(totalLabel),
            });
          }

          showSuccessDialog({
            highlights: highlightEntries,
            downloads,
            donationPrompt: buildDonationPrompt(),
          });
          trackProcessorEvent('operation_success', {
            file_count: currentFiles.length,
            saved_bytes: savedBytesTotal,
            reduction_percent: reductionPercentValue,
            duration_seconds: Number(totalElapsedSeconds.toFixed(2)),
          });
          return;
        }
        case 'merge': {
          const outputBlob = await processPDF('merge', currentFiles as [File, ...File[]], processingOptions);
          const fileName = buildFileName('merge');
          downloads.push({ blob: outputBlob, fileName });
          triggerDownloadAction(outputBlob, fileName);

          const highlightEntries: DialogHighlight[] = [
            { label: statusDialogStrings.resultsLabel, value: statusMessages.merged },
          ];
          if (currentFiles.length > 0) {
            highlightEntries.push({
              label: statusDialogStrings.filesProcessedLabel(files.length),
            });
          }

          showSuccessDialog({
            highlights: highlightEntries,
            downloads,
            donationPrompt: buildDonationPrompt(),
          });
          trackProcessorEvent('operation_success', {
            file_count: currentFiles.length,
          });
          return;
        }
        case 'split': {
          let processedSources = 0;
          let latestMessage = '';

          for (const sourceFile of currentFiles) {
            const parts = await processPDF('split', [sourceFile], processingOptions);
            if (!parts || parts.length === 0) {
              continue;
            }

            processedSources += 1;
            latestMessage = `${sourceFile.name}: ${statusMessages.split(parts.length)}`;

            const firstName = buildFileName('split', sourceFile.name, 0);
            downloads.push({ blob: parts[0], fileName: firstName });
            triggerDownloadAction(parts[0], firstName);

            if (parts.length > 1) {
              const remainingParts = parts.slice(1);
              remainingParts.forEach((blob, idx) => {
                const partName = buildFileName('split', sourceFile.name, idx + 1);
                downloads.push({ blob, fileName: partName });
                window.setTimeout(() => {
                  triggerDownloadAction(blob, partName);
                }, 600);
              });
            }
          }

          if (processedSources === 0) {
            showErrorDialog(errorStrings.noFiles);
            trackProcessorEvent('operation_error', { reason: 'split_no_results' });
            return;
          }

          const highlightEntries: DialogHighlight[] = [
            { label: statusDialogStrings.resultsLabel, value: latestMessage },
          ];
          if (processedSources > 1) {
            highlightEntries.push({
              label: statusDialogStrings.filesProcessedLabel(processedSources),
            });
          }

          showSuccessDialog({
            highlights: highlightEntries,
            downloads,
            donationPrompt: buildDonationPrompt(),
          });
          trackProcessorEvent('operation_success', {
            file_count: processedSources,
            output_count: downloads.length,
          });
          return;
        }
        case 'extract': {
          let processedSources = 0;
          let latestMessage = '';
          let totalPagesExtracted = 0;

          for (const entry of extractPlan) {
            const extractOptions: PDFProcessingOptions = {
              ...processingOptions,
              pagesToExtract: entry.pages,
            };
            const blob = await processPDF('extract', [entry.file], extractOptions);
            const fileName = buildFileName('extract', entry.file.name);
            downloads.push({ blob, fileName });
            triggerDownloadAction(blob, fileName);

            processedSources += 1;
            latestMessage = `${entry.file.name}: ${statusMessages.extracted(entry.pages.length)}`;
            totalPagesExtracted += entry.pages.length;
          }

          if (processedSources === 0) {
            showErrorDialog(errorStrings.noPagesSelected);
            trackProcessorEvent('operation_error', { reason: 'extract_no_results' });
            return;
          }

          const highlightEntries: DialogHighlight[] = [
            { label: statusDialogStrings.resultsLabel, value: latestMessage },
          ];
          if (processedSources > 1) {
            highlightEntries.push({
              label: statusDialogStrings.filesProcessedLabel(processedSources),
            });
          }

          showSuccessDialog({
            highlights: highlightEntries,
            downloads,
            donationPrompt: buildDonationPrompt(),
          });
          trackProcessorEvent('operation_success', {
            file_count: processedSources,
            total_pages: totalPagesExtracted,
          });
          return;
        }
        case 'reorder': {
          let processedSources = 0;
          let latestMessage = '';

          for (const sourceFile of currentFiles) {
            const key = buildFileSignature(sourceFile);
            let order = reorderOrdersByFile[key];

            if (!order || order.length === 0) {
              const pageTotal = await getPdfPageCount(sourceFile);
              if (!pageTotal || pageTotal <= 0) {
                continue;
              }
              const identityOrder = Array.from({ length: pageTotal }, (_, idx) => idx + 1);
              order = identityOrder;
              setReorderOrdersByFile(prev => ({
                ...prev,
                [key]: [...identityOrder],
              }));
            }

            if (!order || order.length === 0) {
              continue;
            }

            const reorderOptions: PDFProcessingOptions = {
              ...processingOptions,
              pageOrder: order,
            };
            const blob = await processPDF('reorder', [sourceFile], reorderOptions);
            const fileName = buildFileName('reorder', sourceFile.name);
            downloads.push({ blob, fileName });
            triggerDownloadAction(blob, fileName);

            processedSources += 1;
            latestMessage = `${sourceFile.name}: ${statusMessages.reordered}`;
          }

          if (processedSources === 0) {
            showErrorDialog(errorStrings.noFiles);
            trackProcessorEvent('operation_error', { reason: 'reorder_no_results' });
            return;
          }

          const highlightEntries: DialogHighlight[] = [
            { label: statusDialogStrings.resultsLabel, value: latestMessage },
          ];
          if (processedSources > 1) {
            highlightEntries.push({
              label: statusDialogStrings.filesProcessedLabel(processedSources),
            });
          }

          showSuccessDialog({
            highlights: highlightEntries,
            downloads,
            donationPrompt: buildDonationPrompt(),
          });
          trackProcessorEvent('operation_success', {
            file_count: processedSources,
          });
          return;
        }
        case 'pdfToImages': {
          let processedSources = 0;
          let totalImages = 0;
          let zippedCount = 0;

          for (const source of currentFiles) {
            if (!isPdfFile(source)) {
              continue;
            }

            const result = await processPDF('pdfToImages', [source], {
              ...processingOptions,
              imageBaseName: `${stripPdfExtension(source.name)}_${downloadNames.pdfToImages}`,
            });
            processedSources += 1;
            totalImages += result.imageCount;

            if (result.kind === 'zip') {
              zippedCount += 1;
              downloads.push({ blob: result.blob, fileName: result.suggestedName });
              triggerDownloadAction(result.blob, result.suggestedName);
            } else {
              // Fallback for non-zip (though usually we zip if multiple images)
              // If single image, just download it
              if (result.files.length > 0) {
                const [first, ...rest] = result.files;
                downloads.push({ blob: first.blob, fileName: first.name });
                triggerDownloadAction(first.blob, first.name);

                if (rest.length > 0) {
                  rest.forEach(entry => {
                    downloads.push({ blob: entry.blob, fileName: entry.name });
                    window.setTimeout(() => {
                      triggerDownloadAction(entry.blob, entry.name);
                    }, 600);
                  });
                }
              }
            }

            // Small delay between files to prevent browser choking
            await new Promise(resolve => setTimeout(resolve, 500));
          }

          if (processedSources === 0) {
            showErrorDialog(errorStrings.invalidFile);
            return;
          }

          showSuccessDialog({
            highlights: [
              {
                label: statusDialogStrings.resultsLabel,
                value: statusMessages.pdfToImages(totalImages, processingOptions.imageOutputFormat || 'png', zippedCount > 0),
              },
              {
                label: statusDialogStrings.filesProcessedLabel(processedSources),
              }
            ],
            downloads,
            donationPrompt: buildDonationPrompt(),
          });

          trackProcessorEvent('operation_success', {
            file_count: processedSources,
            image_count: totalImages,
            zipped: zippedCount,
          });
          return;
        }
        case 'imagesToPdf': {
          const output = await processPDF('imagesToPdf', currentFiles as [File, ...File[]], processingOptions);
          const baseSource = currentFiles[0];
          const fileLabel = buildFileName('imagesToPdf', baseSource?.name);
          downloads.push({ blob: output, fileName: fileLabel });
          triggerDownloadAction(output, fileLabel);

          showSuccessDialog({
            highlights: [
              {
                label: statusDialogStrings.resultsLabel,
                value: statusMessages.imagesToPdf(currentFiles.length),
              },
            ],
            downloads,
            donationPrompt: buildDonationPrompt(),
          });
          trackProcessorEvent('operation_success', {
            file_count: currentFiles.length,
          });
          return;
        }
        default:
          showErrorDialog(errorStrings.modeNotSupported);
          return;
      }
    } catch (err) {
      if (compressionEntriesBuffer.length > 0) {
        setCompressionSummary([...compressionEntriesBuffer]);
      }
      console.error('Error processing PDF', err);
      const fallbackMessage = err instanceof Error && err.message ? err.message : errorStrings.unknown;
      trackProcessorEvent('operation_error', {
        reason: 'exception',
        error_name: err instanceof Error ? err.name : undefined,
      });
      showErrorDialog(fallbackMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDialogClose = () => {
    if (statusDialogState.isOpen) {
      trackProcessorEvent('status_dialog_close', {
        status: statusDialogState.status,
        download_count: statusDialogState.downloads.length,
        has_donation_prompt: Boolean(statusDialogState.donationPrompt),
      });
    }

    setStatusDialogState(prev => ({
      ...prev,
      isOpen: false,
    }));
  };

  const handleDownloadAgain = () => {
    trackProcessorEvent('download_again', {
      download_count: statusDialogState.downloads.length,
    });
    statusDialogState.downloads.forEach(entry => {
      triggerDownloadAction(entry.blob, entry.fileName);
    });
  };

  const handleRetry = () => {
    trackProcessorEvent('operation_retry');
    handleDialogClose();
    window.setTimeout(() => {
      handleProcess();
    }, 0);
  };

  const handlePageSelection = useCallback(
    (file: File, pageNumber: number, selected: boolean) => {
      const fileKey = buildFileSignature(file);
      const activeFile = files[currentFileIndex];
      const activeKey = activeFile ? buildFileSignature(activeFile) : null;

      const fileIndex = files.findIndex(candidate => candidate === file);
      trackProcessorEvent(selected ? 'page_selected' : 'page_deselected', {
        page_number: pageNumber,
        file_index: fileIndex >= 0 ? fileIndex : undefined,
      });

      if (fileIndex !== -1 && fileIndex !== currentFileIndex) {
        setCurrentFileIndex(fileIndex);
      }

      let nextSelectionForFile: Record<number, boolean> | undefined;

      setExtractSelectionsByFile(prevMap => {
        const previousSelection = prevMap[fileKey] ?? {};
        const nextSelection = { ...previousSelection };

        if (selected) {
          nextSelection[pageNumber] = true;
        } else if (nextSelection[pageNumber]) {
          delete nextSelection[pageNumber];
        }

        const hasPages = Object.keys(nextSelection).length > 0;

        if (!hasPages) {
          nextSelectionForFile = {};

          if (!prevMap[fileKey]) {
            return prevMap;
          }

          const rest = { ...prevMap };
          delete rest[fileKey];
          return Object.keys(rest).length === 0 ? {} : rest;
        }

        nextSelectionForFile = nextSelection;

        if (prevMap[fileKey] && areSelectionsEqual(prevMap[fileKey], nextSelection)) {
          return prevMap;
        }

        return { ...prevMap, [fileKey]: nextSelection };
      });

      if (activeKey === fileKey) {
        setSelectedPages(nextSelectionForFile && Object.keys(nextSelectionForFile).length > 0 ? { ...nextSelectionForFile } : {});
      }
    },
    [buildFileSignature, files, currentFileIndex, trackProcessorEvent]
  );

  const handlePageOrderChange = useCallback(
    (file: File, newOrder: number[]) => {
      const fileKey = buildFileSignature(file);
      const activeFile = files[currentFileIndex];
      const activeKey = activeFile ? buildFileSignature(activeFile) : null;

      const fileIndex = files.findIndex(candidate => candidate === file);
      trackProcessorEvent('page_order_updated', {
        file_index: fileIndex >= 0 ? fileIndex : undefined,
        page_count: newOrder.length,
      });

      if (fileIndex !== -1 && fileIndex !== currentFileIndex) {
        setCurrentFileIndex(fileIndex);
      }

      setReorderOrdersByFile(prev => {
        if (newOrder.length === 0) {
          if (!prev[fileKey]) {
            return prev;
          }

          const rest = { ...prev };
          delete rest[fileKey];
          return Object.keys(rest).length === 0 ? {} : rest;
        }

        if (prev[fileKey] && areOrdersEqual(prev[fileKey], newOrder)) {
          return prev;
        }

        return { ...prev, [fileKey]: [...newOrder] };
      });

      if (mode === 'reorder' && activeKey === fileKey) {
        setPageOrder(newOrder.length === 0 ? [] : [...newOrder]);
      }
    },
    [buildFileSignature, files, currentFileIndex, mode, trackProcessorEvent]
  );

  useEffect(() => {
    if (mode !== 'extract') {
      if (Object.keys(selectedPages).length > 0) {
        setSelectedPages({});
      }
      return;
    }

    const activeFile = files[currentFileIndex] ?? files[0];
    if (!activeFile) {
      if (Object.keys(selectedPages).length > 0) {
        setSelectedPages({});
      }
      return;
    }

    const key = buildFileSignature(activeFile);
    const storedSelection = extractSelectionsByFile[key] ?? {};

    if (!areSelectionsEqual(selectedPages, storedSelection)) {
      setSelectedPages(Object.keys(storedSelection).length === 0 ? {} : { ...storedSelection });
    }
  }, [mode, files, currentFileIndex, extractSelectionsByFile, buildFileSignature, selectedPages]);

  useEffect(() => {
    if (mode !== 'reorder') {
      if (pageOrder.length > 0) {
        setPageOrder([]);
      }
      return;
    }

    const activeFile = files[currentFileIndex] ?? files[0];
    if (!activeFile) {
      if (pageOrder.length > 0) {
        setPageOrder([]);
      }
      return;
    }

    const key = buildFileSignature(activeFile);
    const storedOrder = reorderOrdersByFile[key];

    if (!storedOrder) {
      if (pageOrder.length > 0) {
        setPageOrder([]);
      }
      return;
    }

    if (!areOrdersEqual(pageOrder, storedOrder)) {
      setPageOrder(storedOrder.length === 0 ? [] : [...storedOrder]);
    }
  }, [mode, files, currentFileIndex, reorderOrdersByFile, buildFileSignature, pageOrder]);

  const moveFile = (index: number, direction: 'up' | 'down') => {
    setFiles(prevFiles => {
      if (
        (direction === 'up' && index === 0) ||
        (direction === 'down' && index === prevFiles.length - 1)
      ) {
        return prevFiles;
      }

      const next = [...prevFiles];
      const nextIndex = direction === 'up' ? index - 1 : index + 1;
      [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
      trackProcessorEvent('file_reordered', {
        direction,
        from_index: index,
        to_index: nextIndex,
      });
      return next;
    });
  };

  const removeFile = (index: number) => {
    setFiles(prevFiles => {
      const target = prevFiles[index];
      const next = prevFiles.filter((_, i) => i !== index);

      if (target) {
        trackProcessorEvent('file_removed', {
          index,
          previous_total: prevFiles.length,
          new_total: next.length,
        });
        const signature = buildFileSignature(target);
        setExtractSelectionsByFile(prev => {
          if (!prev[signature]) {
            return prev;
          }
          const rest = { ...prev };
          delete rest[signature];
          return Object.keys(rest).length === 0 ? {} : rest;
        });

        setReorderOrdersByFile(prev => {
          if (!prev[signature]) {
            return prev;
          }
          const rest = { ...prev };
          delete rest[signature];
          return Object.keys(rest).length === 0 ? {} : rest;
        });

        const key = buildPreviewKey(target, processingOptions);
        if (key) {
          setCompressionPreviewStates(prev => {
            if (!prev[key]) {
              return prev;
            }
            const nextState = { ...prev };
            delete nextState[key];
            return nextState;
          });
          setCompressionPreviewCache(prev => {
            if (!prev[key]) {
              return prev;
            }
            const nextCache = { ...prev };
            delete nextCache[key];
            return nextCache;
          });
        }
      }

      if (mode === 'extract' || mode === 'reorder') {
        setCurrentFileIndex(prevIndex => {
          if (prevIndex === index) {
            return 0;
          }
          if (prevIndex > index) {
            return prevIndex - 1;
          }
          return prevIndex;
        });
      }
      return next;
    });
  };

  const clearFiles = () => {
    if (files.length > 0) {
      trackProcessorEvent('files_cleared', {
        previous_total: files.length,
      });
    }
    setFiles([]);
    setSelectedPages({});
    setPageOrder([]);
    setExtractSelectionsByFile({});
    setReorderOrdersByFile({});
    setCurrentFileIndex(0);
    setCompressionPreviewStates({});
    setCompressionPreviewCache({});
    setCompressionSummary([]);
  };

  const handleFileChange = (index: number) => {
    const targetFile = files[index];
    const targetKey = targetFile ? buildFileSignature(targetFile) : null;

    trackProcessorEvent('active_file_changed', {
      index,
      has_target: Boolean(targetFile),
      changed: index !== currentFileIndex,
    });

    if (mode === 'extract') {
      setSelectedPages(targetKey ? { ...(extractSelectionsByFile[targetKey] ?? {}) } : {});
    }

    if (mode === 'reorder') {
      setPageOrder(
        targetKey && reorderOrdersByFile[targetKey]
          ? [...(reorderOrdersByFile[targetKey] ?? [])]
          : []
      );
    }

    setCurrentFileIndex(index);
  };

  const getModeHelpText = () => modes[mode]?.helper ?? '';

  const showProcessingOptions = files.length > 0 && !isProcessing;

  const uploaderConfig = useMemo(() => {
    if (mode === 'pdfToImages') {
      return { multiple: true, acceptImages: false } as const;
    }
    if (mode === 'imagesToPdf') {
      return { multiple: true, acceptImages: true } as const;
    }
    return { multiple: true, acceptImages: false } as const;
  }, [mode]);

  const totalExtractPageSelections = useMemo(() => {
    let total = 0;
    const activeKey = mode === 'extract' ? currentFileKey : null;

    Object.entries(extractSelectionsByFile).forEach(([key, selection]) => {
      if (mode === 'extract' && key === activeKey) {
        return;
      }

      total += Object.keys(selection).reduce((count, page) => {
        const pageNumber = parseInt(page, 10);
        return selection[pageNumber] ? count + 1 : count;
      }, 0);
    });

    if (mode === 'extract') {
      total += Object.keys(selectedPages).reduce((count, page) => {
        const pageNumber = parseInt(page, 10);
        return selectedPages[pageNumber] ? count + 1 : count;
      }, 0);
    }

    return total;
  }, [mode, currentFileKey, extractSelectionsByFile, selectedPages]);

  const hasExtractSelection = totalExtractPageSelections > 0;

  const handleProcessingOptionsChange = useCallback(
    (nextOptions: PDFProcessingOptions) => {
      const serialize = (value: unknown) =>
        typeof value === 'undefined' ? 'undefined' : JSON.stringify(value);

      const keys = new Set(
        [...Object.keys(processingOptions ?? {}), ...Object.keys(nextOptions ?? {})]
      );

      const changedKeys = Array.from(keys).filter(key => {
        const prevValue = processingOptions[key as keyof PDFProcessingOptions];
        const nextValue = nextOptions[key as keyof PDFProcessingOptions];
        return serialize(prevValue) !== serialize(nextValue);
      });

      if (changedKeys.length > 0) {
        trackProcessorEvent('options_change', {
          changed_keys: changedKeys.join(','),
          changed_count: changedKeys.length,
        });
      }

      setProcessingOptions(nextOptions);
    },
    [processingOptions, trackProcessorEvent]
  );

  const dialogActions: DialogAction[] = [];
  if (statusDialogState.isOpen && statusDialogStrings) {
    if (statusDialogState.status === 'success' && statusDialogState.downloads.length > 0) {
      dialogActions.push({
        label: statusDialogStrings.downloadAgainLabel,
        onClick: handleDownloadAgain,
        variant: 'secondary',
      });
    }

    if (statusDialogState.status === 'error') {
      dialogActions.push({
        label: statusDialogStrings.retryLabel,
        onClick: handleRetry,
        variant: 'primary',
        disabled: isProcessing,
      });
    }
  }

  const resolveIdleButtonLabel = () => {
    if (mode === 'extract') {
      return processButton.extract(totalExtractPageSelections);
    }

    if (mode === 'reorder') {
      return processButton.reorder;
    }

    if (mode === 'pdfToImages' && processButton.pdfToImages) {
      return files.length <= 1
        ? processButton.pdfToImages.single
        : processButton.pdfToImages.multiple(files.length);
    }

    if (mode === 'imagesToPdf' && processButton.imagesToPdf) {
      return files.length <= 1
        ? processButton.imagesToPdf.single
        : processButton.imagesToPdf.multiple(files.length);
    }

    return files.length === 1
      ? processButton.idleSingle
      : processButton.idleMultiple(files.length);
  };

  return (
    <>
      <div className="p-6 surface-card" id="pdf-processor">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">{processorStrings.title}</h2>
          <div className="flex flex-wrap gap-2">
            {MODE_TABS.map(modeKey => {
              const tabStrings = (modes as Record<ProcessingMode, { label: string }>)[modeKey];
              const label = tabStrings?.label ?? modeKey;
              const isActive = mode === modeKey;
              return (
                <button
                  key={modeKey}
                  className={`px-4 py-2 rounded-lg ${isActive
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-[var(--ui-2)] text-[var(--tx-2)]'
                    }`}
                  onClick={() => handleModeChange(modeKey)}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <p className="mt-2 text-sm text-[var(--tx-2)]">{getModeHelpText()}</p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{upload.title}</h2>
            {files.length > 0 && (
              <button
                className="text-sm text-[var(--tx-3)] hover:text-[var(--accent)] transition-colors"
                onClick={clearFiles}
              >
                {upload.clearAll}
              </button>
            )}
          </div>

          <FileUploader
            onFilesSelectedAction={handleFilesSelected}
            multiple={uploaderConfig.multiple}
            acceptImages={uploaderConfig.acceptImages}
          />
        </div>

        {files.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">{listHeading}</h3>
              <button
                className="text-xs text-[var(--tx-3)] hover:text-[var(--accent)] transition-colors"
                onClick={clearFiles}
              >
                {upload.clearAll}
              </button>
            </div>
            <FileList
              files={files}
              onMoveFileAction={mode === 'merge' || mode === 'imagesToPdf' ? moveFile : undefined}
              onRemoveFileAction={removeFile}
              currentIndex={mode === 'extract' || mode === 'reorder' ? currentFileIndex : undefined}
              onFileSelectAction={
                mode === 'extract' || mode === 'reorder' ? handleFileChange : undefined
              }
            />

            {mode === 'extract' && (
              <div className="mt-6 space-y-8">
                <h3 className="font-bold">{labels.pagesToExtract}</h3>
                {files.map((file, index) => {
                  const fileKey = buildFileSignature(file);
                  const selection =
                    fileKey === currentFileKey
                      ? selectedPages
                      : extractSelectionsByFile[fileKey] ?? {};
                  const selectedCount = Object.values(selection).filter(Boolean).length;
                  const isActive = currentFileIndex === index;

                  return (
                    <section
                      key={`extract-panel-${fileKey}`}
                      className={`rounded-lg border border-[var(--ui-2)] bg-[var(--bg-2)]/60 shadow-sm transition hover:border-[var(--accent)] ${isActive ? 'ring-1 ring-[var(--accent)]/60' : ''
                        }`}
                    >
                      <header
                        className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--ui-2)] bg-white/70 px-4 py-3 cursor-pointer"
                        onClick={() => handleFileChange(index)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={event => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            handleFileChange(index);
                          }
                        }}
                      >
                        <div>
                          <p className="font-medium text-[var(--tx)] truncate max-w-[280px] sm:max-w-none">
                            {file.name}
                          </p>
                          <p className="text-xs text-[var(--tx-3)]">
                            {selectedCount > 0
                              ? `${fileListStrings.pagesLabel(selectedCount)} • ${fileListStrings.selected}`
                              : errorStrings.noPagesSelected}
                          </p>
                        </div>
                        {isActive ? (
                          <span className="text-xs font-medium text-[var(--accent)]">
                            {fileListStrings.selected}
                          </span>
                        ) : null}
                      </header>
                      <div className="px-4 pb-4 pt-3">
                        <PageSelector
                          key={`selector-${fileKey}`}
                          file={file}
                          selectedPages={selection}
                          onPageSelectAction={(page, value) => handlePageSelection(file, page, value)}
                        />
                      </div>
                    </section>
                  );
                })}
              </div>
            )}

            {mode === 'reorder' && (
              <div className="mt-6 space-y-8">
                <h3 className="font-bold">{labels.reorderPages}</h3>
                {files.map((file, index) => {
                  const fileKey = buildFileSignature(file);
                  const order =
                    fileKey === currentFileKey
                      ? pageOrder
                      : reorderOrdersByFile[fileKey] ?? [];
                  const isActive = currentFileIndex === index;

                  return (
                    <section
                      key={`reorder-panel-${fileKey}`}
                      className={`rounded-lg border border-[var(--ui-2)] bg-[var(--bg-2)]/60 shadow-sm transition hover:border-[var(--accent)] ${isActive ? 'ring-1 ring-[var(--accent)]/60' : ''
                        }`}
                    >
                      <header
                        className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--ui-2)] bg-white/70 px-4 py-3 cursor-pointer"
                        onClick={() => handleFileChange(index)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={event => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            handleFileChange(index);
                          }
                        }}
                      >
                        <div>
                          <p className="font-medium text-[var(--tx)] truncate max-w-[280px] sm:max-w-none">
                            {file.name}
                          </p>
                          <p className="text-xs text-[var(--tx-3)]">
                            {order.length > 0
                              ? ordererStrings.summary(order.length)
                              : ordererStrings.loading}
                          </p>
                        </div>
                        {isActive ? (
                          <span className="text-xs font-medium text-[var(--accent)]">
                            {fileListStrings.selected}
                          </span>
                        ) : null}
                      </header>
                      <div className="px-4 pb-4 pt-3">
                        <PageOrderer
                          key={`orderer-${fileKey}`}
                          file={file}
                          onOrderChangeAction={orderValues => handlePageOrderChange(file, orderValues)}
                          initialOrder={order.length > 0 ? order : undefined}
                        />
                      </div>
                    </section>
                  );
                })}
              </div>
            )}

            {showProcessingOptions && (
              <ProcessingOptions
                mode={mode}
                options={processingOptions}
                onOptionsChangeAction={handleProcessingOptionsChange}
              />
            )}

            {mode === 'compress' && previewItems.length > 0 && (
              <div className="mt-6 space-y-4">
                {previewItems.map(item => (
                  <CompressionPreviewCard
                    key={item.key}
                    strings={compressionPreviewStrings}
                    status={item.status}
                    result={item.result}
                    formatFileSizeAction={formatFileSize}
                    errorMessage={item.status === 'error' ? item.error : undefined}
                    retryAction={
                      item.status === 'error'
                        ? () => handleRetryPreviewAction(item.key)
                        : undefined
                    }
                    fileName={item.file.name}
                    order={item.index}
                  />
                ))}
              </div>
            )}

            {mode === 'compress' && previewItems.length > 1 && previewItems.every(i => i.status === 'ready') && (
              <div className="mt-8 overflow-hidden rounded-xl border border-[var(--accent)] bg-[var(--accent)]/5 p-5 shadow-sm ring-1 ring-[var(--accent)]/20">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-[var(--tx)] uppercase tracking-wider">
                      {processorStrings.compressionTotal.title}
                    </h4>
                    <p className="text-xs text-[var(--tx-3)]">
                      {processorStrings.compressionTotal.count(files.length)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-[var(--accent)]">
                      {processorStrings.compressionTotal.savings(
                        formatFileSize(previewItems.reduce((acc, i) => acc + ((i.result?.originalSize ?? 0) - (i.result?.processedSize ?? 0)), 0))
                      )}
                    </p>
                    <p className="text-xs font-medium text-[var(--tx-3)]">
                      {formatFileSize(previewItems.reduce((acc, i) => acc + (i.result?.originalSize ?? 0), 0))} → {' '}
                      <span className="text-[var(--tx)]">
                        {formatFileSize(previewItems.reduce((acc, i) => acc + (i.result?.processedSize ?? 0), 0))}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {mode === 'compress' && (
              <div className="mt-4 p-3 bg-[var(--bg-2)] rounded-lg text-sm text-[var(--tx-2)]">
                <p>{upload.hints.compress}</p>
              </div>
            )}

            {mode === 'split' && (
              <div className="mt-4 p-3 bg-[var(--bg-2)] rounded-lg text-sm text-[var(--tx-2)]">
                <p>{upload.hints.split}</p>
              </div>
            )}
            {mode === 'pdfToImages' && upload.hints.pdfToImages && (
              <div className="mt-4 p-3 bg-[var(--bg-2)] rounded-lg text-sm text-[var(--tx-2)]">
                <p>{upload.hints.pdfToImages}</p>
              </div>
            )}
            {mode === 'imagesToPdf' && upload.hints.imagesToPdf && (
              <div className="mt-4 p-3 bg-[var(--bg-2)] rounded-lg text-sm text-[var(--tx-2)]">
                <p>{upload.hints.imagesToPdf}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-center">
          <button
            className="btn-primary px-6 py-3 rounded-lg font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={
              files.length === 0 ||
              isProcessing ||
              (mode === 'extract' && !hasExtractSelection)
            }
            onClick={handleProcess}
          >
            {isProcessing ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {processButton.processing}
              </span>
            ) : (
              resolveIdleButtonLabel()
            )}
          </button>
        </div>

        {mode === 'compress' && compressionSummary.length > 0 && (
          <div className="mt-8 space-y-4">
            {compressionSummary.map(entry => (
              <CompressionSummaryCard
                key={entry.id}
                strings={compressionSummaryStrings}
                result={entry.result}
                fileName={entry.fileName}
                elapsedSeconds={entry.elapsedSeconds}
                formatFileSizeAction={formatFileSize}
                downloadAction={() => handleSummaryDownloadAction(entry)}
                clearAction={() => handleClearSummaryAction(entry.id)}
              />
            ))}
          </div>
        )}
      </div>
      {statusDialogStrings ? (
        <ProcessingStatusDialog
          open={statusDialogState.isOpen}
          status={statusDialogState.status}
          title={statusDialogState.title}
          description={statusDialogState.description}
          highlights={statusDialogState.highlights}
          donationPrompt={statusDialogState.donationPrompt}
          actions={dialogActions}
          closeLabel={statusDialogStrings.closeLabel}
          onClose={handleDialogClose}
          analyticsContext={{ mode }}
        />
      ) : null}
      <NotificationContainer />
    </>
  );
}
