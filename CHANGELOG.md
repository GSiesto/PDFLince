# Changelog

All notable changes to PDFLince will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1](https://github.com/GSiesto/PDFLince/compare/v1.0.0...v1.0.1) (2026-07-20)


### Bug Fixes

* regenerate bun.lock to match updated package.json ([2f1142b](https://github.com/GSiesto/PDFLince/commit/2f1142bff30705a55af3e8c6eb4261a447b982d7))

## 1.0.0 (2026-06-16)


### Features

* add crop PDF function ([599c1a7](https://github.com/GSiesto/PDFLince/commit/599c1a7c5ee25cc1e712c35d198f6ae94b7e823c))
* add crop PDF function ([b9aba99](https://github.com/GSiesto/PDFLince/commit/b9aba99233c16b75e61e0c774dd91dacb475edca))
* add Crop PDF function ([35a2a64](https://github.com/GSiesto/PDFLince/commit/35a2a6437d90490289705d318267a78849b312cb))
* add custom 404 page with navigation to PDF tools ([96dc115](https://github.com/GSiesto/PDFLince/commit/96dc1150ad938cd545ec9c254c95d1779654b159))
* **crop:** finalize intuitive UI, i18n translations, and keywords ([baa5b93](https://github.com/GSiesto/PDFLince/commit/baa5b938ce9ea4d8c13ef23f5cf7a4d41c331278))
* enhance 404 page with multi-language tool links for SEO ([5b08497](https://github.com/GSiesto/PDFLince/commit/5b08497e72106cce44a73577120da23bbbd66f6a))
* enhance merged PDF filename generation by preserving spaces, accents, ampersands, and parentheses, and removing the `_pdflince` suffix. ([68e613c](https://github.com/GSiesto/PDFLince/commit/68e613cd9d2153f641fe95b177341c00f0d06d9e))
* fix Italian localization and new page selector and cropping components to PDF processor ([94b3804](https://github.com/GSiesto/PDFLince/commit/94b380469aae5bbee06aecf281efd23d4d69482e))
* function crop PDF automatically and manually ([d8fd610](https://github.com/GSiesto/PDFLince/commit/d8fd6100d3560e65ee1ab0e7fbb8af8bf34f566c))
* implement full French localization and add internationalized layout support for English, German, Italian, and Portuguese locales ([8584324](https://github.com/GSiesto/PDFLince/commit/8584324f690c86c24eb05a4920d952b39e3e094e))
* implement multilingual url sharing prompt ([7225609](https://github.com/GSiesto/PDFLince/commit/7225609f6c464774e106271e9a4f4b42e3254c31))
* Initial open source release v0.1.0 ([4973364](https://github.com/GSiesto/PDFLince/commit/4973364104edd4cce35ea676f51a819dda3ebf2c))


### Bug Fixes

* add trailingSlash to resolve S3 AccessDenied on locale paths ([fe62d10](https://github.com/GSiesto/PDFLince/commit/fe62d10cb19bcdf3806c81c9957d8f4c527ec89e))
* **merge:** allow spaces in merged document metadata title ([69ec942](https://github.com/GSiesto/PDFLince/commit/69ec942764c94af09b5cb29bb0089af488a0d559))
* proper 404 handling for unknown routes across all locales ([ad110e5](https://github.com/GSiesto/PDFLince/commit/ad110e56effc67415aae3f9c37073c6827e89abb))
* provide project documentation and feature overview for AI crawle… ([89e4bbb](https://github.com/GSiesto/PDFLince/commit/89e4bbb4c302ffc272e7c4781cf220c2f13a3f98))
* provide project documentation and feature overview for AI crawlers on llms.txt ([0321395](https://github.com/GSiesto/PDFLince/commit/0321395ba3737d901e4ccefc686c1467e6c0f78b))
* remove duplicate imports and functions from merge conflict resolution ([acbf11c](https://github.com/GSiesto/PDFLince/commit/acbf11ce325f01684b43b99737955f601365480b))
* remove duplicate routes, and expand metadata ([ecc1d85](https://github.com/GSiesto/PDFLince/commit/ecc1d8590554a8233288b9db4f4a94375eeba87a))
* remove duplicate routes, and expand metadata ([38cf430](https://github.com/GSiesto/PDFLince/commit/38cf430763169093c0f2e6e3a778ccd3b379750a))
* **seo:** add missing twitter metadata and OG url trailing slashes to ro, ru, hu ([a2139ef](https://github.com/GSiesto/PDFLince/commit/a2139efcac8869a1e48c32f6bcc66871b53427e3))
* **seo:** enforce trailing slashes ([6cf9118](https://github.com/GSiesto/PDFLince/commit/6cf9118792b34ff047d53ff26a44b7557830ee9e))
* **seo:** enforce trailing slashes ([4a961e4](https://github.com/GSiesto/PDFLince/commit/4a961e48b4fe02684dc838fa910d3a23c16e8b06))
* **seo:** implement full site IndexNow ping and fix robots.txt host ([d640dec](https://github.com/GSiesto/PDFLince/commit/d640dec9e32c957cc46bb756f252a858147e27ac))
* **seo:** implement full site IndexNow ping and fix robots.txt host ([2163d10](https://github.com/GSiesto/PDFLince/commit/2163d101b4ebde0e3eff53c62f06d7527a1431bd))

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
