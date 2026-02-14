import { localeLabels } from "../../config";
import { getRoutePath, getOperationPath } from "../../routing";
import { operationsEn } from "./operations";
import { faqsEn } from "./faqs";
import type { Dictionary } from "../dictionary-types";
import { OperationKey } from "../../../types/operations";

const locale = "en" as const;
const { label, nativeName, htmlLang, hrefLang } = localeLabels[locale];
const siteUrl = "https://pdflince.com";
const homePath = getRoutePath(locale, "home");

const operationsRoutes: Record<OperationKey, string> = {
  merge: getOperationPath(locale, "merge"),
  compress: getOperationPath(locale, "compress"),
  split: getOperationPath(locale, "split"),
  extract: getOperationPath(locale, "extract"),
  reorder: getOperationPath(locale, "reorder"),
  pdfToImages: getOperationPath(locale, "pdfToImages"),
  imagesToPdf: getOperationPath(locale, "imagesToPdf"),
};

export const enDictionary: Dictionary = {
  locale,
  localeLabel: label,
  nativeName,
  htmlLang,
  hrefLang,
  routes: {
    home: homePath,
    faq: getRoutePath(locale, "faq"),
    support: getRoutePath(locale, "support"),
    operations: operationsRoutes,
  },
  metadata: {
    site: {
      title: "PDFLince – Merge, compress and convert PDFs for free | No uploads",
      description:
        "PDFLince is a privacy-first toolkit that merges, compresses, splits, extracts, reorders and converts PDFs to and from images directly in your browser. All processing stays on-device, so your files never leave you.",
      keywords: [
        "merge pdf",
        "compress pdf",
        "split pdf",
        "extract pdf pages",
        "reorder pdf",
        "pdf to images",
        "images to pdf",
        "convert pdf",
        "convert pdf online",
        "convert pdf to png",
        "jpg to pdf",
        "edit pdf offline",
        "pdf toolkit",
        "privacy first pdf",
      ],
      canonical: `${siteUrl}${homePath}`,
      openGraph: {
        title: "PDFLince – Merge, Compress, Split, PDF to Image & Image to PDF",
        description:
          "Merge, compress, split, extract, reorder and convert PDFs without uploading files. Free, private and backed by fully local processing.",
        url: `${siteUrl}${homePath}`,
        locale: "en_US",
        type: "website",
        imageUrl: "https://pdflince.com/og-image.jpg",
        imageAlt: "PDFLince - Private and free PDF processing",
      },
    },
    faq: {
      title: "FAQ | PDFLince – Free PDF processing toolkit",
      description:
        "Answers to frequent questions about PDFLince. Learn how to merge, compress, split, extract and reorder PDFs without uploading your files.",
      keywords: [
        "pdflince faq",
        "pdf questions",
        "pdf help",
        "merge pdf help",
        "compress pdf help",
        "split pdf help",
        "reorder pdf",
      ],
      canonical: `${siteUrl}${getRoutePath(locale, "faq")}`,
    },
    support: {
      title: "Support PDFLince | Keep the toolkit free and private",
      description:
        "Your donation keeps PDFLince small, independent, and privacy-first. Help cover hosting and ongoing improvements.",
      keywords: [
        "donate to pdflince",
        "support pdf toolkit",
        "fund privacy projects",
        "pdflince stripe donations",
        "keep pdflince free",
      ],
      canonical: `${siteUrl}${getRoutePath(locale, "support")}`,
    },
    operations: operationsEn,
  },
  brand: {
    name: "PDFLince",
    tagline: "Local processing • 100% private",
  },
  components: {
    nav: {
      home: "Home",
      faq: "FAQ",
      support: "Support",
      photo: "FotoLince",
      languageLabel: "Language",
      menuLabel: "Toggle navigation menu",
    },
    footer: {
      privacy: "Local processing • 100% private • Open licences",
      rights: `© ${new Date().getFullYear()} PDFLince — Tools to manipulate PDFs without compromising privacy`,
      links: {
        home: "Home",
        faq: "FAQ",
        support: "Support",
        photo: "FotoLince",
        contact: "Contact",
      },
      capabilitiesLabel: "Popular actions",
      operations: {
        merge: "Merge PDFs",
        compress: "Compress PDF",
        split: "Split PDF",
        extract: "Extract Pages",
        reorder: "Reorder Pages",
        pdfToImages: "PDF to images",
        imagesToPdf: "Images to PDF",
      },
      license: "PDF Processing: PDF-lib (MIT), PDF.js (Apache 2.0) • Font: Geist (MIT)",
      disclaimer: "The service is provided 'as is' without warranty of any kind. The user is responsible for the use of the generated files.",
    },
    notifications: {
      labels: {
        success: "Success",
        error: "Error",
        info: "Notice",
        warning: "Warning",
      },
      closeLabel: "Close",
    },
    fotolinceBanner: {
      eyebrow: "Need to optimise images?",
      title: "Compress, resize or convert photos with FotoLince",
      description:
        "Our sister toolkit handles JPG, PNG and WEBP locally — perfect for shrinking visuals before you build a PDF.",
      ctaLabel: "Open FotoLince",
      ctaHref: "https://fotolince.com",
      imageAlt: "FotoLince logo",
    },
    feedback: {
      question: "Was this helpful?",
      thanks: "Thanks for your feedback!",
      whatWrong: "Tell us what went wrong",
      emailSubject: "Feedback for PDFLince",
    },
    pdfProcessor: {
      title: "Choose an operation",
      modes: {
        merge: {
          label: "Merge PDFs",
          helper: "Arrange PDFs to merge them into a single document.",
        },
        compress: {
          label: "Compress PDF",
          helper: "Shrink a PDF to reduce its size. Process one file at a time for the best balance of quality and speed.",
        },
        split: {
          label: "Split PDF",
          helper: "Pick PDFs to break them into separate documents.",
        },
        extract: {
          label: "Extract Pages",
          helper: "Choose specific pages to create a new document.",
        },
        reorder: {
          label: "Reorder Pages",
          helper: "Change the order of pages inside a PDF.",
        },
        pdfToImages: {
          label: "PDF to images",
          helper: "Export every PDF page as PNG or JPEG without uploading files.",
        },
        imagesToPdf: {
          label: "Images to PDF",
          helper: "Combine JPG, PNG or WEBP images into a single PDF with custom layout.",
        },
      },
      upload: {
        title: "Select your files",
        clearAll: "Clear all",
        listHeadings: {
          merge: "Files to merge (reorder to define the final sequence):",
          extract: "Select a file to work with its pages:",
          reorder: "Select a file to work with its pages:",
          pdfToImages: "PDFs to convert (processed one by one):",
          imagesToPdf: "Images to combine (reorder for the final sequence):",
          default: "Selected files (reorder or remove them):",
        },
        hints: {
          compress: "Each file is compressed individually using the best quality-to-size balance.",
          split: "Each PDF will be split according to the options you select in the next step.",
          pdfToImages: "We render one PDF at a time. Adjust format and DPI from the options panel before exporting.",
          imagesToPdf: "Drop JPG, PNG, WEBP or TIFF images. Use the options panel to choose page size, margins and background colour.",
        },
      },
      downloadNames: {
        compress: "compressed_PDFLince",
        merge: "merged_PDFLince",
        split: "part_PDFLince",
        extract: "extracted_PDFLince",
        reorder: "reordered_PDFLince",
        pdfToImages: "images_PDFLince",
        imagesToPdf: "images_to_pdf_PDFLince",
      },
      processButton: {
        idleSingle: "Process 1 file",
        idleMultiple: (count: number) => `Process ${count} files`,
        processing: "Processing...",
        extract: (count: number) => `Extract ${count} ${count === 1 ? "page" : "pages"}`,
        reorder: "Save new order",
        pdfToImages: {
          single: "Export images",
          multiple: (count: number) => `Export ${count} PDFs`,
        },
        imagesToPdf: {
          single: "Create PDF",
          multiple: (count: number) => `Create PDF from ${count} images`,
        },
      },
      statusMessages: {
        info: (mode: string) => `Processing (${mode})...`,
        compressed: (reduction: string, original: string, next: string, seconds: string) =>
          `Compressed. Reduction: ${reduction}% (${original} → ${next}) in ${seconds}s`,
        merged: "Merge complete",
        split: (count: number) =>
          count > 1
            ? `Generated ${count} files. Downloading the first one...`
            : "Split complete",
        extracted: (count: number) => `Extracted ${count} ${count === 1 ? "page" : "pages"}`,
        reordered: "Reordering complete",
        pdfToImages: (count: number, format: "png" | "jpeg", zipped: boolean) => {
          const label = format === "png" ? "PNG" : "JPEG";
          return zipped
            ? `Exported ${count} ${label} ${count === 1 ? "image" : "images"} inside a ZIP archive`
            : `Downloaded ${count} ${label} ${count === 1 ? "image" : "images"}`;
        },
        imagesToPdf: (count: number) =>
          `Created a PDF from ${count} ${count === 1 ? "image" : "images"}`,
        imageFormatLabels: {
          png: "PNG",
          jpeg: "JPEG",
        },
      },
      errors: {
        noFiles: "No result produced",
        mergeRequiresTwo: "Select at least two files to merge",
        noPagesSelected: "Pick at least one page",
        invalidFile: "Choose a valid file",
        reorderEmpty: "No new order detected",
        unknown: "Unknown error",
        modeNotSupported: "Unsupported mode",
      },
      labels: {
        pagesToExtract: "Select the pages to extract:",
        reorderPages: "Drag pages to reorder them:",
      },
      compressionPreview: {
        title: "Compression preview",
        description:
          "Adjust the settings to estimate the output size before you run the compression.",
        running: "Calculating preview…",
        readyLabel: "Estimated output",
        ratio: (percent: string) => `${percent}% smaller`,
        saved: (size: string) => `${size} saved`,
        time: (seconds: string) => `≈ ${seconds}s`,
        original: "Original",
        result: "Estimated",
        notice:
          "Preview runs locally. When you click Process we reuse this result, so nothing is uploaded.",
        error: "Preview could not be generated.",
        retry: "Retry preview",
        universalBadge: "Universal Optimization",
      },
      compressionSummary: {
        title: "Latest compression",
        ratio: (percent: string) => `${percent}% smaller`,
        saved: (size: string) => `${size} saved`,
        original: "Original",
        result: "Compressed",
        duration: (seconds: string) => `Completed in ${seconds}s`,
        download: "Download again",
        clear: "Clear summary",
      },
      donationReminder: {
        message: "Did PDFLince save you time today? Your support keeps it private and free.",
        actionLabel: "Support PDFLince",
        withSavings: (percent: string, saved: string) =>
          `Saved ${saved} (${percent}% smaller)? Help keep PDFLince private and ad-free.`,
      },
      statusDialog: {
        processingTitle: "Processing locally",
        successTitle: "Your files are ready",
        successDescription:
          "Downloads start automatically. You can download them again.",
        resultsLabel: "Latest result",
        filesProcessedLabel: (count: number) =>
          `${count} ${count === 1 ? "file processed" : "files processed"}`,
        downloadAgainLabel: "Download again",
        errorTitle: "Processing failed",
        errorDescription: "We couldn't finish this operation. Check the files and try again.",
        retryLabel: "Retry",
        closeLabel: "Close",
      },
      compressionTotal: {
        title: "Total Savings (all files)",
        savings: (size: string) => `${size} saved in total`,
        count: (count: number) => `${count} files optimized`,
      },
    },
    fileUploader: {
      clickToSelect: "Click to select",
      orDrop: (type: "pdf" | "images") =>
        type === "images" ? "or drag and drop images" : "or drag and drop PDF files",
      accepted: {
        pdf: "PDF files",
        images: "Accepted formats: JPG, PNG, WEBP, TIFF",
      },
      maxSize: (sizeMb: number) => `Recommended size: < ${sizeMb}MB`,
      errors: {
        invalidType: (fileName: string, label: string) =>
          `Unsupported file type: ${fileName}. Only ${label} are allowed.`,
        tooLarge: (fileName: string, sizeMb: number) =>
          `File too large: ${fileName}. The maximum size is ${sizeMb}MB.`,
      },
      dropImagesAlt: "PDF document placeholder image",
    },
    fileList: {
      moveUp: "Move up",
      moveDown: "Move down",
      remove: "Remove",
      removeAll: "Remove all",
      imageLabel: "Image",
      fileLabel: "File",
      selected: "Selected",
      pdfLabel: "PDF",
      deselect: "Deselect",
      pagesLabel: (count: number) => `${count} ${count === 1 ? "page" : "pages"}`,
      previewLoading: "Loading preview…",
    },
    pageSelector: {
      loading: "Loading PDF pages...",
      error: "The PDF information could not be loaded",
      summary: (total: number, selected: number) =>
        `${total} pages detected — ${selected} selected`,
      selectAll: "Select all",
      deselectAll: "Deselect all",
      pageLabel: (pageNumber: number) => `Page ${pageNumber}`,
      extraPages: (shown: number, total: number) =>
        `Showing ${shown} of ${total} pages. To extract additional pages, enter their numbers below.`,
      manualLabel: "Enter extra page numbers (e.g. 21, 25-30, 42)",
      manualPlaceholder: "21, 25-30, 42",
    },
    pageOrderer: {
      loading: "Loading PDF pages...",
      error: "The PDF information could not be loaded",
      limitReached: (count: number) =>
        `This PDF has ${count} pages. For performance reasons you can reorder up to 120 pages at a time.`,
      limitHint:
        "Split the PDF into smaller chunks first and then reorder each part.",
      summary: (count: number) => `${count} pages ready to reorder`,
      reset: "Restore original order",
      dragHint: "Drag to change the order",
      pageLabel: (pageNumber: number) => `Page ${pageNumber}`,
      originalLabel: (pageNumber: number) => `Original: Page ${pageNumber}`,
      instructions:
        'Drag the pages or use the arrow buttons. When you are done, click "Save new order" to apply the changes.',
    },
    processingOptions: {
      compress: {
        title: "Compression",
        level: "Level",
        levels: {
          low: "Low",
          medium: "Medium",
          high: "High",
        },
        removeMetadata: "Remove metadata",
        removeMetadataHint: "Deletes hidden details like author, subject, and edit history.",
        stripAnnotations: "Strip annotations and comments",
        stripAnnotationsHint: "Removes notes, form fields, signatures, and document actions.",
        downscaleImages: "Downscale embedded images",
        downscaleHint: "Best for scanned documents and photo-heavy PDFs. Keeps text crisp while shrinking photos.",
        advancedTitle: "Advanced cleanup",
        advancedDescription: "Keep it simple, or enable only the extras you need.",
        activeLabel: "Enabled:",
      },
      merge: {
        title: "Merge",
        pageDivider: "Blank page between documents",
        metadataTitle: "Merged document title (optional)",
        metadataAuthor: "Merged document author (optional)",
        metadataHint: "Set custom metadata for the merged PDF. Leave blank to keep defaults.",
      },
      split: {
        title: "Split",
        pagesPerFile: "Pages per file",
        pagesPerFileHint: "We will create a new PDF after every N pages.",
      },
      extract: {
        title: "Extract",
        preserveMetadata: "Preserve original metadata",
        preserveMetadataHint: "Keeps title, author, and other document details in the extracted file.",
      },
      reorder: {
        title: "Reorder",
        hint: "Drag thumbnails to change the order.",
      },
      pdfToImages: {
        title: "Image export",
        formatLabel: "Image format",
        formatHint: "Choose PNG for lossless quality or JPEG for smaller file sizes.",
        pngLabel: "PNG (lossless)",
        jpegLabel: "JPEG (smaller file)",
        qualityLabel: "JPEG quality",
        qualityHint: "Higher quality preserves more detail at the cost of bigger images.",
        dpiLabel: "Render DPI",
        dpiHint: "Higher DPI increases sharpness and file size. 144 DPI fits slides and screens.",
        dpiPresets: {
          screen: "72 DPI · Screen",
          balanced: "144 DPI · Balanced",
          print: "300 DPI · Print",
        },
        zipLabel: "Bundle images in a ZIP",
        zipHint: "Download a single archive instead of triggering one file per page.",
        baseNameLabel: "Base filename",
        baseNamePlaceholder: "pdflince_pages",
        baseNameHint: "We use this as the prefix for exported files. Leave blank to reuse the PDF name.",
      },
      imagesToPdf: {
        title: "Layout",
        layoutTitle: "Page layout",
        fitLabel: "Image fit",
        fitOptions: {
          contain: "Contain (show entire image)",
          cover: "Cover (fill page)",
        },
        sizeLabel: "Page size",
        sizeOptions: {
          auto: "Auto (match image)",
          a4: "A4",
          letter: "Letter",
        },
        orientationLabel: "Orientation",
        orientationOptions: {
          auto: "Auto",
          portrait: "Portrait",
          landscape: "Landscape",
        },
        marginLabel: "Margins (pts)",
        marginHint: "Adds white space around the image. 72 pts ≈ 1 inch.",
        backgroundLabel: "Background colour",
        backgroundHint: "Applied behind images and anywhere the page remains uncovered.",
      },
    },
    cookieBanner: {
      message: "We use cookies to analyze traffic and improve your experience. We do not share your personal data.",
      accept: "Accept",
      decline: "Decline",
    },
  },
  pages: {
    home: {
      hero: {
        title: "PDFLince: Compress, merge and convert PDF online for free",
        subtitle:
          "Compress PDF, merge PDF, split documents, extract pages, and convert PDF to images or images to PDF right in your browser. No uploads, fully private, always free.",
        badges: [
          "Compress PDF fast",
          "Merge PDFs without limits",
          "Local processing",
          "Support PDFLince",
        ],
        imageAlt: "PDF document illustration",
        ctaLinks: [
          {
            label: "PDF to images",
            href: operationsRoutes.pdfToImages,
            description: "Export pages as PNG or JPEG",
          },
          {
            label: "Images to PDF",
            href: operationsRoutes.imagesToPdf,
            description: "Combine JPG, PNG or WEBP",
          },
        ],
      },
      why: {
        title: "Why use PDFLince?",
        cards: [
          {
            title: "Private by default",
            description:
              "Your PDFs never leave your device. Everything happens in your browser.",
            icon: "🔒",
          },
          {
            title: "Fast & efficient",
            description:
              "Our local engine delivers top speed without cloud uploads or background jobs.",
            icon: "⚡",
          },
          {
            title: "Works everywhere",
            description:
              "Desktop, tablet, or phone — if you have a modern browser, you're set.",
            icon: "📱",
          },
        ],
      },
      callout: {
        title: "Help keep PDFLince free",
        description:
          "Every donation covers hosting, development time, and lets us keep the experience 100% private with no ads or trackers.",
        ctaLabel: "Support the project",
        ctaUrl: getRoutePath(locale, "support"),
        secondaryLabel: "See how we use the funds",
        secondaryUrl: getRoutePath(locale, "support") + "#support-transparency",
      },
    },
    faq: {
      title: "Frequently Asked Questions",
      intro: "Answers to the most common PDFLince questions",
      cta: {
        title: "Try PDFLince now",
        description:
          "Merge, compress, split, extract, and reorder PDFs with full privacy. No sign-ups, no uploads.",
        ctaLabel: "Go to the toolkit",
      },
    },
    support: {
      hero: {
        eyebrow: "🌱 Indie project",
        title: "Help keep PDFLince free and private",
        subtitle:
          "PDFLince is a tiny passion project. Your support covers the servers and buys time to polish new features.",
        highlight: "Just a small tool that respects your privacy.",
      },
      reasons: {
        title: "Why donate?",
        cards: [
          {
            title: "Keep it free",
            description:
              "Donations let us keep PDFLince 100% free for everyone, with no premium tiers or locked features.",
            icon: "💚",
          },
          {
            title: "Ship improvements",
            description:
              "Your support funds bug fixes, new tools, and the polish that makes PDF work fast.",
            icon: "✨",
          },
          {
            title: "Protect privacy",
            description:
              "We process everything locally so your PDFs stay on your device. Donations let us keep it that way.",
            icon: "🔒",
          },
        ],
      },
      tiers: {
        title: "Give what you can",
        description: "Every amount helps. Secure payment via Stripe.",
        cards: [
          {
            id: "coffee",
            title: "Buy a coffee",
            amount: "€3",
            description: "Covers hosting for a couple of weeks.",
            ctaLabel: "Donate €3",
            ctaHref: "#stripe-checkout-coffee",
          },
          {
            id: "monthly",
            title: "Monthly support",
            amount: "€10/mo",
            description: "Gives us time every week to improve PDFLince.",
            ctaLabel: "Give €10/mo",
            ctaHref: "#stripe-checkout-monthly",
            badge: "💙 Thank you",
          },
          {
            id: "custom",
            title: "Custom amount",
            amount: "Anything",
            description: "Every euro matters. Pick the amount that works for you.",
            ctaLabel: "Choose amount",
            ctaHref: "#stripe-checkout-custom",
          },
        ],
        note: "Secure Stripe payments. Cancel recurring donations whenever you like.",
      },
      transparency: {
        title: "Where the money goes",
        items: [
          "Hosting and CDN so the site stays fast worldwide",
          "Development time for fixes and new features",
          "Design and UX tweaks to keep things smooth",
          "Translations and docs for every supported language",
        ],
      },
      faq: {
        title: "Questions",
        entries: [
          {
            question: "What if I can't donate?",
            answer:
              "No worries. PDFLince will stay free. Sharing the tool or telling us how it helped is already amazing support.",
          },
          {
            question: "Will I get a receipt?",
            answer:
              "Yes. Stripe emails you a receipt automatically with all the payment details.",
          },
          {
            question: "How do I cancel a recurring donation?",
            answer:
              "Manage it through your Stripe portal or email us and we'll cancel it for you, no questions asked.",
          },
        ],
      },
      closing: {
        title: "Thanks for being here",
        description:
          "Every person who backs PDFLince helps keep a useful, privacy-first PDF toolkit alive for everyone.",
        ctaLabel: "Email the team",
        ctaHref: "mailto:info@pdflince.com?subject=Hello%20PDFLince%20team",
      },
      legalNotice: {
        title: "Legal & transparency notes",
        points: [
          "PDFLince is an independent personal project run by a small volunteer team.",
          "Contributions are voluntary and help cover hosting, tooling, and development time.",
          "Payments are not charitable donations and do not create tax deductions; Stripe will email an automatic receipt.",
          "The service is provided as-is with no warranties. Questions? Reach out at info@pdflince.com.",
        ],
      },
    },
  },
  faqs: faqsEn,
  operations: operationsEn,
};
