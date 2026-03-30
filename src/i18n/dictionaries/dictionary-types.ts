import type { OperationContent } from "./operation-types";
import type { OperationKey } from "../../types/operations";

type ModeKey = OperationKey;

type ExtractPagesLabel = (count: number) => string;

type FileCountLabel = (count: number) => string;
type FilesProcessedLabel = (count: number) => string;

type RatioStatus = (reduction: string, original: string, next: string, seconds: string) => string;

type ModeStatus = (mode: string) => string;

type OperationCountStatus = (count: number) => string;

type PdfToImagesStatus = (count: number, format: 'png' | 'jpeg', zipped: boolean) => string;

type ImagesToPdfStatus = (imageCount: number) => string;

type UploadDropLabel = (type: "pdf" | "images") => string;

type FileSizeMessage = (sizeMb: number) => string;

type FileErrorMessage = (fileName: string, labelOrSize: string | number) => string;

type PageSummary = (total: number, selected: number) => string;

type PageNotice = (shown: number, total: number) => string;

type PageLabel = (pageNumber: number) => string;

type LimitMessage = (count: number) => string;

type PercentLabel = (percent: string) => string;

type DurationLabel = (seconds: string) => string;

type SizeLabel = (size: string) => string;

type PagesLabel = (count: number) => string;

export interface FotolinceBannerStrings {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageAlt: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface NavStrings {
  home: string;
  faq: string;
  support: string;
  photo: string;
  languageLabel: string;
  menuLabel: string;
}

export interface FooterStrings {
  privacy: string;
  rights: string;
  links: {
    home: string;
    faq: string;
    support: string;
    photo: string;
    contact: string;
  };
  capabilitiesLabel: string;
  operations: Record<OperationKey, string>;
  license: string;
  disclaimer?: string;
}

export interface NotificationStrings {
  labels: {
    success: string;
    error: string;
    info: string;
    warning: string;
  };
  closeLabel: string;
}

export interface PdfProcessorStrings {
  title: string;
  modes: Record<ModeKey, { label: string; helper: string }>;
  upload: {
    title: string;
    clearAll: string;
    listHeadings: {
      merge: string;
      extract: string;
      rotate: string;
      reorder: string;
      pdfToImages: string;
      imagesToPdf: string;
      default: string;
    };
    hints: {
      compress: string;
      split: string;
      pdfToImages: string;
      imagesToPdf: string;
    };
  };
  downloadNames: Record<ModeKey, string>;
  processButton: {
    idleSingle: string;
    idleMultiple: FileCountLabel;
    processing: string;
    extract: ExtractPagesLabel;
    rotate: ExtractPagesLabel;
    reorder: string;
    pdfToImages: {
      single: string;
      multiple: FileCountLabel;
    };
    imagesToPdf: {
      single: string;
      multiple: FileCountLabel;
    };
  };
  statusMessages: {
    info: ModeStatus;
    compressed: RatioStatus;
    merged: string;
    split: OperationCountStatus;
    extracted: OperationCountStatus;
    rotated: OperationCountStatus;
    reordered: string;
    pdfToImages: PdfToImagesStatus;
    imagesToPdf: ImagesToPdfStatus;
    imageFormatLabels: Record<'png' | 'jpeg', string>;
  };
  errors: {
    noFiles: string;
    mergeRequiresTwo: string;
    noPagesSelected: string;
    invalidFile: string;
    reorderEmpty: string;
    unknown: string;
    modeNotSupported: string;
  };
  labels: {
    pagesToExtract: string;
    pagesToRotate: string;
    reorderPages: string;
  };
  compressionPreview: CompressionPreviewStrings;
  compressionSummary: CompressionSummaryStrings;
  donationReminder: {
    message: string;
    actionLabel: string;
    withSavings?: (percent: string, savedSize: string) => string;
  };
  statusDialog: {
    processingTitle: string;
    successTitle: string;
    successDescription: string;
    resultsLabel: string;
    filesProcessedLabel: FilesProcessedLabel;
    downloadAgainLabel: string;
    errorTitle: string;
    errorDescription: string;
    retryLabel: string;
    closeLabel: string;
  };
  compressionTotal: {
    title: string;
    savings: SizeLabel;
    count: FileCountLabel;
  };
}

export interface FileUploaderStrings {
  clickToSelect: string;
  orDrop: UploadDropLabel;
  accepted: {
    pdf: string;
    images: string;
  };
  maxSize: FileSizeMessage;
  errors: {
    invalidType: FileErrorMessage;
    tooLarge: FileErrorMessage;
  };
  dropImagesAlt: string;
}

export interface FileListStrings {
  moveUp: string;
  moveDown: string;
  remove: string;
  removeAll: string;
  imageLabel: string;
  fileLabel: string;
  pdfLabel: string;
  selected: string;
  deselect: string;
  pagesLabel: PagesLabel;
  previewLoading: string;
}

export interface CompressionPreviewStrings {
  title: string;
  description: string;
  running: string;
  readyLabel: string;
  ratio: PercentLabel;
  saved: SizeLabel;
  time: DurationLabel;
  original: string;
  result: string;
  notice: string;
  error: string;
  retry: string;
  universalBadge: string;
}

export interface CompressionSummaryStrings {
  title: string;
  ratio: PercentLabel;
  saved: SizeLabel;
  original: string;
  result: string;
  duration: DurationLabel;
  download: string;
  clear: string;
}

export interface PageSelectorStrings {
  loading: string;
  error: string;
  summary: PageSummary;
  selectAll: string;
  deselectAll: string;
  pageLabel: PageLabel;
  extraPages: PageNotice;
  manualLabel: string;
  manualPlaceholder: string;
}

export interface PageOrdererStrings {
  loading: string;
  error: string;
  limitReached: LimitMessage;
  limitHint: string;
  summary: LimitMessage;
  reset: string;
  dragHint: string;
  pageLabel: PageLabel;
  originalLabel: PageLabel;
  instructions: string;
}

export interface ProcessingOptionsStrings {
  compress: {
    title: string;
    level: string;
    levels: {
      low: string;
      medium: string;
      high: string;
    };
    removeMetadata: string;
    removeMetadataHint: string;
    stripAnnotations: string;
    stripAnnotationsHint: string;
    downscaleImages: string;
    downscaleHint: string;
    advancedTitle: string;
    advancedDescription: string;
    activeLabel: string;
  };
  merge: {
    title: string;
    pageDivider: string;
    metadataTitle: string;
    metadataAuthor: string;
    metadataHint: string;
  };
  split: {
    title: string;
    pagesPerFile: string;
    pagesPerFileHint: string;
  };
  extract: {
    title: string;
    preserveMetadata: string;
    preserveMetadataHint: string;
  };
  rotate: {
    title: string;
    hint: string;
    rotateRight90: string;
    rotate180: string;
    rotateLeft90: string;
  };
  reorder: {
    title: string;
    hint: string;
  };
  pdfToImages: {
    title: string;
    formatLabel: string;
    formatHint: string;
    pngLabel: string;
    jpegLabel: string;
    qualityLabel: string;
    qualityHint: string;
    dpiLabel: string;
    dpiHint: string;
    dpiPresets: {
      screen: string;
      balanced: string;
      print: string;
    };
    zipLabel: string;
    zipHint: string;
    baseNameLabel: string;
    baseNamePlaceholder: string;
    baseNameHint: string;
  };
  imagesToPdf: {
    title: string;
    layoutTitle: string;
    fitLabel: string;
    fitOptions: {
      contain: string;
      cover: string;
    };
    sizeLabel: string;
    sizeOptions: {
      auto: string;
      a4: string;
      letter: string;
    };
    orientationLabel: string;
    orientationOptions: {
      auto: string;
      portrait: string;
      landscape: string;
    };
    marginLabel: string;
    marginHint: string;
    backgroundLabel: string;
    backgroundHint: string;
  };
}

export interface HomePageStrings {
  hero: {
    title: string;
    subtitle: string;
    badges: string[];
    imageAlt: string;
    ctaLinks?: Array<{
      label: string;
      href: string;
      description?: string;
    }>;
  };
  why: {
    title: string;
    cards: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  callout: {
    title: string;
    description: string;
    ctaLabel: string;
    ctaUrl: string;
    secondaryLabel?: string;
    secondaryUrl?: string;
    note?: string;
  };
}

export interface SupportPageStrings {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    highlight: string;
  };
  reasons: {
    title: string;
    cards: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  tiers: {
    title: string;
    description: string;
    cards: Array<{
      id: string;
      title: string;
      amount: string;
      description: string;
      ctaLabel: string;
      ctaHref: string;
      badge?: string;
    }>;
    note: string;
  };
  transparency: {
    title: string;
    items: string[];
  };
  faq: {
    title: string;
    entries: FAQItem[];
  };
  closing: {
    title: string;
    description: string;
    ctaLabel?: string;
    ctaHref?: string;
  };
  legalNotice?: {
    title: string;
    points: string[];
  };
}

export interface FaqPageStrings {
  title: string;
  intro: string;
  contact?: {
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
  cta: {
    title: string;
    description: string;
    ctaLabel: string;
  };
}

export interface CookieBannerStrings {
  message: string;
  accept: string;
  decline: string;
}

export interface FeedbackStrings {
  question: string;
  thanks: string;
  whatWrong: string;
  emailSubject: string;
}

export interface ComponentsStrings {
  nav: NavStrings;
  footer: FooterStrings;
  notifications: NotificationStrings;
  fotolinceBanner: FotolinceBannerStrings;
  pdfProcessor: PdfProcessorStrings;
  fileUploader: FileUploaderStrings;
  fileList: FileListStrings;
  pageSelector: PageSelectorStrings;
  pageOrderer: PageOrdererStrings;
  processingOptions: ProcessingOptionsStrings;
  cookieBanner: CookieBannerStrings;
  feedback: FeedbackStrings;
}

export interface Dictionary {
  locale: string;
  localeLabel: string;
  nativeName: string;
  htmlLang: string;
  hrefLang: string;
  routes: {
    home: string;
    faq: string;
    support: string;
    operations: Record<OperationKey, string>;
  };
  metadata: {
    site: {
      title: string;
      description: string;
      keywords: string[];
      canonical: string;
      openGraph: {
        title: string;
        description: string;
        url: string;
        locale: string;
        type: string;
        imageUrl: string;
        imageAlt: string;
      };
    };
    faq: {
      title: string;
      description: string;
      keywords: string[];
      canonical: string;
    };
    support: {
      title: string;
      description: string;
      keywords: string[];
      canonical: string;
    };
    operations: Record<OperationKey, OperationContent>;
  };
  brand: {
    name: string;
    tagline: string;
  };
  components: ComponentsStrings;
  pages: {
    home: HomePageStrings;
    faq: FaqPageStrings;
    support: SupportPageStrings;
  };
  faqs: {
    common: FAQItem[];
    spain?: FAQItem[];
    latam?: FAQItem[];
    regional?: FAQItem[];
    tech: FAQItem[];
  };
  operations: Record<OperationKey, OperationContent>;
}
