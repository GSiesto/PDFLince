# Changelog

All notable changes to PDFLince will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-02-18

### Added

- **Compress PDF** — reduce file size with low/medium/high presets and advanced options (metadata, annotations, image downscaling)
- **Merge PDFs** — combine multiple PDFs with optional page dividers and custom metadata
- **Split PDF** — divide PDFs into chunks by page count
- **Extract Pages** — select specific pages with visual page selector
- **Reorder Pages** — drag-and-drop page reordering with live thumbnails
- **PDF to Images** — export pages as PNG or JPEG at 72/144/300 DPI with ZIP bundling
- **Images to PDF** — create PDFs from images with layout, fit, orientation, and margin controls
- Web Worker architecture for non-blocking PDF processing
- Full i18n support: Spanish (es), English (en), Portuguese (pt), German (de)
- Privacy-first: 100% client-side processing, zero file uploads
- SEO: localized metadata, structured data, sitemaps, hreflang
- Playwright E2E test suite covering all operations
- Automated CI/CD pipeline via GitHub Actions
