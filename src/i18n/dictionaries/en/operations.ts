import { OperationContent } from "../operation-types";
import { OperationKey } from "../../../types/operations";

const operationsEnContent: Record<OperationKey, OperationContent> = {
  compress: {
    key: "compress",
    slug: "compress",
    mode: "compress",
    meta: {
      title: "Compress PDF Online for Free | Reduce Size | PDFLince",
      description:
        "Shrink PDF file size efficiently without quality loss. Private, free compression directly in your browser.",
      keywords: [
        "compress pdf",
        "reduce pdf size",
        "optimize pdf",
        "pdf compressor",
        "lightweight pdf",
      ],
      ogTitle: "Compress PDFs without losing quality | PDFLince",
      ogDescription:
        "Drop your file, choose the optimal compression level, and download a significantly smaller PDF in seconds — completely secure with no server uploads.",
      ogImageAlt: "PDFLince compression tool interface",
    },
    hero: {
      title: "Compress PDF online with clear results",
      description:
        "Reduce document size so it meets email limits, LMS platforms, or public procedures while keeping every page readable.",
      bulletPoints: [
        "100% local processing — your files never leave the browser",
        "Choose basic, medium, or aggressive compression depending on your goals",
        "Preserve metadata and document structure when you need it",
      ],
      imageAlt: "PDF compression workflow in PDFLince",
    },
    benefitsTitle: "Why compress PDFs with PDFLince",
    benefits: [
      {
        title: "Balanced quality",
        description:
          "Our compression engine evaluates each resource to deliver the highest reduction without blurring text or graphics.",
      },
      {
        title: "Ready for submissions",
        description:
          "Produce files that pass strict upload limits in government portals, universities, or corporate workflows.",
      },
      {
        title: "Privacy by design",
        description:
          "Skip server uploads and avoid data leaks so you comply with internal privacy policies with zero effort.",
      },
    ],
    howTo: {
      title: "How to compress a PDF with PDFLince",
      steps: [
        "Click “Upload your files” and pick the PDF you want to optimize.",
        "Choose the compression level and tweak advanced options like keeping metadata.",
        "Press “Process” and download the compressed document within seconds.",
      ],
      note:
        "Working with multiple reports? Compress them one by one with no daily limits or watermarks.",
    },
    useCasesTitle: "When compression makes sense",
    useCases: [
      "Send contracts, invoices, or manuals by email without hitting attachment limits.",
      "Upload coursework to Moodle, Canvas, or any LMS that enforces a strict file cap.",
      "Slim down theses, catalogues, or research papers to improve download speed.",
      "Archive records in the cloud while saving storage without losing important details.",
    ],
  },
  imagesToPdf: {
    key: "imagesToPdf",
    slug: "images-to-pdf",
    mode: "imagesToPdf",
    meta: {
      title: "Create PDF from Images | JPG, PNG to PDF | PDFLince",
      description:
        "Create a professional PDF from your images. Arrange photos, customize layout and margins, and generate your document locally in your browser.",
      keywords: [
        "images to pdf",
        "jpg to pdf",
        "png to pdf",
        "webp to pdf",
        "create pdf from images",
      ],
      ogTitle: "Build a clean PDF from your images | PDFLince",
      ogDescription:
        "Drag your images into place, define the layout settings, and export a print-ready PDF file — with no uploads or watermarks attached.",
      ogImageAlt: "Creating a PDF from images in PDFLince",
    },
    hero: {
      title: "Create a polished PDF from images",
      description:
        "Group scans, photos, or graphics into a single PDF ready to share with teams, students, or clients.",
      bulletPoints: [
        "Drag to define the order of every page",
        "Choose page size, orientation, and margins that suit print or on-screen review",
        "Set a solid background colour to avoid unexpected transparency",
      ],
      imageAlt: "Images to PDF workflow",
    },
    benefitsTitle: "Why assemble PDFs from images with PDFLince",
    benefits: [
      {
        title: "Consistent layout",
        description:
          "Align mixed image formats into a unified PDF without stretching or cropping surprises.",
      },
      {
        title: "Ready for print and review",
        description:
          "Fine-tune margins, orientation, and background colour so the exported PDF looks great on paper and screens.",
      },
      {
        title: "Secure processing",
        description:
          "All conversions happen locally in your browser, making it safe for scans of IDs, receipts, or classroom material.",
      },
    ],
    howTo: {
      title: "How to convert images to a PDF",
      steps: [
        "Add the images you want to include. Reorder them so the sequence matches your final document.",
        "Adjust fit mode, page size, orientation, and margins to match your output needs.",
        "Click “Create PDF” to download a compiled document ready to share or archive.",
      ],
      note:
        "Large batches? Compress the resulting PDF or split it afterwards without re-uploading your images.",
    },
    useCasesTitle: "Great uses for image-to-PDF conversions",
    useCases: [
      "Combine scanned worksheets or test papers before sending them back to students.",
      "Prepare expense receipts as a single PDF instead of dozens of attachments.",
      "Create lookbooks or catalogues from design exports in seconds.",
      "Bundle photo evidence or inspection shots into a single document for stakeholders.",
    ],
  },
  merge: {
    key: "merge",
    slug: "merge",
    mode: "merge",
    meta: {
      title: "Merge PDF Online | Combine Multiple PDFs Free | PDFLince",
      description:
        "Combine multiple PDF files into a single, organized document with no page limits. Drag, reorder, and download your merged file instantly and privately.",
      keywords: [
        "merge pdf",
        "combine pdf",
        "join pdf files",
        "pdf merger",
        "merge documents",
      ],
      ogTitle: "Merge multiple PDFs in seconds | PDFLince",
      ogDescription:
        "Arrange your documents in the perfect order, adjust settings, and download a unified PDF file without ever uploading your data to the cloud.",
      ogImageAlt: "Combining multiple PDFs inside PDFLince",
    },
    hero: {
      title: "Merge PDFs online — fast and secure",
      description:
        "Build one polished file with contracts, class notes, or policy documents ready to send, sign, or archive.",
      bulletPoints: [
        "Drag and drop to control the final order",
        "No hidden limits — merge long documents for free",
        "Keep bookmarks and metadata when you need them",
      ],
      imageAlt: "Merging PDF documents",
    },
    benefitsTitle: "Benefits of merging with PDFLince",
    benefits: [
      {
        title: "Consistent delivery",
        description:
          "Deliver material in a single file with continuous page numbers and unified formatting.",
      },
      {
        title: "Save time",
        description:
          "Skip heavy desktop editors. Drag the files, arrange them, and download a ready-to-share document.",
      },
      {
        title: "Private and anonymous",
        description:
          "We do not store copies or request personal data, which is perfect for confidential information.",
      },
    ],
    howTo: {
      title: "How to merge PDFs with PDFLince",
      steps: [
        "Click “Upload your files” and select at least two PDFs.",
        "Use the arrows or drag each file to define the final sequence.",
        "Pick your bookmark preferences and hit “Process” to download the merged PDF.",
      ],
      note:
        "Need to add more files later? Drop them in at any point without restarting.",
    },
    useCasesTitle: "When to merge PDFs",
    useCases: [
      "Prepare one dossier with appendices, quotes, and commercial conditions.",
      "Send several monthly invoices in a single file to finance departments.",
      "Bundle scanned notes and presentations into one PDF for students.",
      "Create complete legal packages ready for electronic signatures.",
    ],
  },
  split: {
    key: "split",
    slug: "split",
    mode: "split",
    meta: {
      title: "Split PDF by Pages or Chapters | Free Tool | PDFLince",
      description:
        "Separate your PDF into multiple files by page ranges or specific chapters. Enjoy full control over your document structure with zero server uploads.",
      keywords: [
        "split pdf",
        "separate pdf",
        "split pdf by pages",
        "pdf splitter",
        "slice pdf",
      ],
      ogTitle: "Split your PDFs with precision | PDFLince",
      ogDescription:
        "Choose exactly how to split your document, generate as many individual files as you need, and download them instantly to your device.",
      ogImageAlt: "Splitting a PDF inside PDFLince",
    },
    hero: {
      title: "Split PDFs by pages or segments",
      description:
        "Extract chapters, appendices, or specific sections into standalone files ready to share.",
      bulletPoints: [
        "Configure splits by page count or file size",
        "Produce several PDFs in a single processing step",
        "Work without page limits or watermarks",
      ],
      imageAlt: "PDF splitting workflow",
    },
    benefitsTitle: "What splitting with PDFLince gives you",
    benefits: [
      {
        title: "Control over shared information",
        description:
          "Deliver only the relevant portion of a document without exposing sensitive sections.",
      },
      {
        title: "Scalable delivery",
        description:
          "Generate multiple files at once and download them automatically for archiving or handoff.",
      },
      {
        title: "Advanced adjustments",
        description:
          "Create batches, insert separators, or define output formats that match your workflow.",
      },
    ],
    howTo: {
      title: "How to split a PDF with PDFLince",
      steps: [
        "Upload the PDF you want to segment from your device.",
        "Pick whether you’ll split by a fixed number of pages or by file size.",
        "Press “Process” and download the newly generated documents automatically.",
      ],
      note:
        "PDFLince downloads the first file immediately and saves the rest to your device without extra steps.",
    },
    useCasesTitle: "Typical scenarios for splitting PDFs",
    useCases: [
      "Publish each chapter of a digital book in an online course.",
      "Separate annexes that must be sent through different channels.",
      "Extract quarterly summaries from extensive financial reports.",
      "Prepare compact bundles for clients without exposing internal documentation.",
    ],
  },
  extract: {
    key: "extract",
    slug: "extract",
    mode: "extract",
    meta: {
      title: "Extract PDF Pages | Save Selected Pages | PDFLince",
      description:
        "Select specific pages from any PDF and create a new, tailored document instantly. Experience private, unlimited processing directly in your web browser.",
      keywords: [
        "extract pdf pages",
        "save pdf pages",
        "select pdf pages",
        "pdf page extractor",
        "create new pdf",
      ],
      ogTitle: "Extract only the pages you need | PDFLince",
      ogDescription:
        "Mark the relevant pages you want to keep, generate a new PDF file in seconds, and ensure your data stays secure on your own device.",
      ogImageAlt: "Selecting PDF pages in PDFLince",
    },
    hero: {
      title: "Extract specific PDF pages",
      description:
        "Assemble tailored documents by keeping only the pages you need to share or archive.",
      bulletPoints: [
        "Preview thumbnails and mark individual pages",
        "Keep original page numbers or create new sections",
        "Download the resulting PDF instantly without waiting",
      ],
      imageAlt: "Extracting pages from a PDF",
    },
    benefitsTitle: "Benefits of extracting pages with PDFLince",
    benefits: [
      {
        title: "More relevant documents",
        description:
          "Share only useful information with your team or clients and avoid redundant data.",
      },
      {
        title: "Full control in the browser",
        description:
          "Select, preview, and verify every page without heavy software or stable connections.",
      },
      {
        title: "Clean results",
        description:
          "The new PDF keeps quality and metadata based on the options you define.",
      },
    ],
    howTo: {
      title: "How to extract pages with PDFLince",
      steps: [
        "Upload the PDF and choose the file you want to work with.",
        "Select the pages you need from the thumbnail grid.",
        "Click “Process” to download a PDF with the selected pages.",
      ],
      note:
        "You can combine extraction with other operations like merging or compressing in separate sessions.",
    },
    useCasesTitle: "Ideas for extracting pages",
    useCases: [
      "Share the assigned chapter of a manual with your team.",
      "Send specific mortgage or contract pages for legal review.",
      "Assemble personalised dossiers with only relevant information for each client.",
      "Save copies of form pages or receipts you need to archive.",
    ],
  },
  crop: {
    key: "crop",
    slug: "crop",
    mode: "crop",
    meta: {
      title: "Crop PDF Pages Online | Trim PDF Margins | PDFLince",
      description:
        "Crop PDF pages and trim excess margins directly in your browser. Select the pages, define the crop area, and download the result privately.",
      keywords: [
        "crop pdf",
        "trim pdf margins",
        "cut pdf pages",
        "pdf crop tool",
        "remove white space pdf",
      ],
      ogTitle: "Crop PDF pages locally in your browser | PDFLince",
      ogDescription:
        "Trim white margins and focus each page on the content you need, all with private on-device processing and no server uploads.",
      ogImageAlt: "Cropping PDF pages in PDFLince",
    },
    hero: {
      title: "Crop PDF pages and trim margins",
      description:
        "Remove extra white space or tighten the visible area of selected pages without sending the document anywhere.",
      bulletPoints: [
        "Select only the pages you want to crop",
        "Trim top, right, bottom, and left margins with precise point values",
        "Keep the workflow fully local with zero-server processing",
      ],
      imageAlt: "PDF crop workflow",
    },
    benefitsTitle: "Why crop PDFs with PDFLince",
    benefits: [
      {
        title: "Cleaner pages",
        description:
          "Reduce distracting white borders and focus each page on the content that matters.",
      },
      {
        title: "Selective editing",
        description:
          "Crop only the pages that need adjustment instead of rebuilding the whole document.",
      },
      {
        title: "Private by default",
        description:
          "Every crop runs in your browser, which is safer for invoices, scans, and internal reports.",
      },
    ],
    howTo: {
      title: "How to crop PDF pages with PDFLince",
      steps: [
        "Upload the PDF and choose the file whose pages you want to crop.",
        "Select the pages to edit and set the top, right, bottom, and left crop margins.",
        "Click Process to download a new PDF with the updated page bounds.",
      ],
      note:
        "If different groups of pages need different trims, run the crop step more than once.",
    },
    useCasesTitle: "When cropping a PDF helps",
    useCases: [
      "Trim scanner borders from forms, receipts, or signed documents.",
      "Remove extra white margins before printing or combining files.",
      "Standardise pages exported from different tools with inconsistent borders.",
      "Prepare tighter page frames before sharing manuals, reports, or study material.",
    ],
  },
  rotate: {
    key: "rotate",
    slug: "rotate",
    mode: "rotate",
    meta: {
      title: "Rotate PDF Pages Online | Turn Selected Pages | PDFLince",
      description:
        "Rotate selected PDF pages by 90 or 180 degrees directly in your browser. Private, free, and fully local.",
      keywords: [
        "rotate pdf",
        "rotate pdf pages",
        "turn pdf pages",
        "fix sideways pdf",
        "pdf page rotation",
      ],
      ogTitle: "Rotate PDF pages in seconds | PDFLince",
      ogDescription:
        "Select the pages that need a new orientation, choose 90 or 180 degrees, and download the corrected PDF without uploading anything.",
      ogImageAlt: "Rotating PDF pages in PDFLince",
    },
    hero: {
      title: "Rotate PDF pages without losing quality",
      description:
        "Fix sideways scans, upside-down exports, or mixed page orientations in a few clicks.",
      bulletPoints: [
        "Rotate only the pages you select instead of changing the entire document",
        "Choose 90 degrees right, 180 degrees, or 90 degrees left",
        "Keep everything in your browser with no uploads or waiting rooms",
      ],
      imageAlt: "PDF page rotation workflow",
    },
    benefitsTitle: "Why rotate pages with PDFLince",
    benefits: [
      {
        title: "Precise corrections",
        description:
          "Adjust only the pages that need help, which is perfect for mixed scan batches or long reports.",
      },
      {
        title: "Fast cleanup",
        description:
          "Correct page orientation in seconds without reopening the file in a heavy desktop editor.",
      },
      {
        title: "Private by default",
        description:
          "Sensitive documents stay on your device because every rotation runs locally in the browser.",
      },
    ],
    howTo: {
      title: "How to rotate PDF pages",
      steps: [
        "Upload the PDF and choose the file whose pages you want to correct.",
        "Select the pages to rotate and pick 90 degrees right, 180 degrees, or 90 degrees left.",
        "Click Process to download a new PDF with the updated page orientation.",
      ],
      note:
        "Need more cleanup afterwards? You can still reorder, extract, or compress the corrected PDF in another step.",
    },
    useCasesTitle: "When page rotation helps",
    useCases: [
      "Fix scanned contracts or forms that were captured sideways.",
      "Turn upside-down pages inside reports assembled from different sources.",
      "Correct lecture notes or manuals before sharing them with students or clients.",
      "Clean up archival PDFs so every page is comfortable to read on screen.",
    ],
  },
  reorder: {
    key: "reorder",
    slug: "reorder",
    mode: "reorder",
    meta: {
      title: "Reorder PDF Pages | Change Page Order Fast | PDFLince",
      description:
        "Easily reorganize your PDF pages with a simple drag and drop interface. Fix document order and save the result instantly, all happening locally.",
      keywords: [
        "reorder pdf",
        "change pdf page order",
        "organise pdf",
        "rearrange pdf",
        "sort pdf pages",
      ],
      ogTitle: "Organise PDF pages without reinstalling software | PDFLince",
      ogDescription:
        "Move pages to their correct position, fix sorting errors, and download your perfectly organized PDF document in just a few moments.",
      ogImageAlt: "Reordering PDF pages",
    },
    hero: {
      title: "Reorder PDF pages with drag and drop",
      description:
        "Fix the sequence of scanned invoices, presentations, or long reports in seconds.",
      bulletPoints: [
        "Large thumbnails help you avoid mistakes",
        "Drag pages and confirm the new order instantly",
        "Export the reorganised PDF without losing bookmarks or internal links",
      ],
      imageAlt: "Page ordering interface",
    },
    benefitsTitle: "Why reorder with PDFLince",
    benefits: [
      {
        title: "Faster workflows",
        description:
          "Correct messy scans without redigitising or installing complex editors.",
      },
      {
        title: "Visual precision",
        description:
          "Thumbnails let you validate every page before exporting the new sequence.",
      },
      {
        title: "No trace left behind",
        description:
          "Everything happens on your device, which is ideal for sensitive or confidential documents.",
      },
    ],
    howTo: {
      title: "How to reorder pages with PDFLince",
      steps: [
        "Upload the PDF and choose the file you want to edit.",
        "Drag each thumbnail until the order is correct.",
        "Hit “Process” to download the document with its new sequence.",
      ],
      note:
        "Keep adjusting the order even after an export without re-uploading the file.",
    },
    useCasesTitle: "When to reorder a PDF",
    useCases: [
      "Align quotes, appendices, and signatures before sending.",
      "Prepare printed presentations with the right sequence.",
      "Fix duplicated or inverted pages after a large scanning batch.",
      "Refresh manuals or catalogues by reusing existing content without redesigning from scratch.",
    ],
  },
  pdfToImages: {
    key: "pdfToImages",
    slug: "pdf-to-images",
    mode: "pdfToImages",
    meta: {
      title: "Convert PDF pages to images | PNG or JPEG export | PDFLince",
      description:
        "Convert every page of your PDF into high-quality PNG or JPEG images. Choose your resolution and download as a ZIP file — 100% private and secure.",
      keywords: [
        "pdf to images",
        "export pdf pages",
        "pdf to png",
        "pdf to jpeg",
        "download pdf as images",
      ],
      ogTitle: "Export PDF pages as clean images | PDFLince",
      ogDescription:
        "Render each page as a crisp image directly in your browser. Adjust quality, set filenames, and get a tidy ZIP archive instantly.",
      ogImageAlt: "PDFLince exporting PDF pages to images",
    },
    hero: {
      title: "Convert PDF pages to PNG or JPEG",
      description:
        "Produce crisp images of every page for slide decks, reviews, or design handoffs without opening heavy desktop tools.",
      bulletPoints: [
        "Select PNG or JPEG and control the export DPI",
        "Bundle everything in a single ZIP or download page by page",
        "Local rendering only — no uploads, no trace",
      ],
      imageAlt: "PDF to images workflow",
    },
    benefitsTitle: "Why export PDFs with PDFLince",
    benefits: [
      {
        title: "Presentation-ready quality",
        description:
          "Choose the resolution that matches your slides, CMS, or design workflow without guessing if pages will look sharp enough.",
      },
      {
        title: "Flexible downloads",
        description:
          "Keep a tidy ZIP for long documents or trigger individual image downloads when you only need a handful of pages.",
      },
      {
        title: "Private by design",
        description:
          "Rendering happens directly in your browser, so confidential documents never reach third-party servers.",
      },
    ],
    howTo: {
      title: "How to convert a PDF to images",
      steps: [
        "Upload the PDF you want to convert. We render one file at a time for accuracy.",
        "Pick PNG or JPEG, adjust the DPI, and decide whether to bundle results inside a ZIP.",
        "Click “Export images” to download the archive or individual files instantly.",
      ],
      note:
        "Need only a few pages? Split or extract first, then export to images to keep downloads focused.",
    },
    useCasesTitle: "When a PDF-to-image conversion helps",
    useCases: [
      "Share static previews of design approvals without exposing the original PDF.",
      "Embed single PDF pages into CMS platforms or slide decks that expect image uploads.",
      "Create image handouts for tablets or e-readers that struggle with large PDFs.",
      "Document review workflows that require screenshots of each page.",
    ],
  },

};

export const operationsEn: Record<OperationKey, OperationContent> = {
  merge: operationsEnContent.merge,
  compress: operationsEnContent.compress,
  split: operationsEnContent.split,
  extract: operationsEnContent.extract,
  crop: operationsEnContent.crop,
  rotate: operationsEnContent.rotate,
  reorder: operationsEnContent.reorder,
  pdfToImages: operationsEnContent.pdfToImages,
  imagesToPdf: operationsEnContent.imagesToPdf,
};
