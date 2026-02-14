# PDFLince: Production-Ready PDF Processing

## Overview

PDFLince is a modern, client-side PDF processing application built with Next.js 15 and PDF-lib. All PDF operations happen in the browser - no files are ever uploaded to a server.

## Key Features

### ✅ Core Operations
1. **Compress** - Reduce PDF file size with optimization
2. **Merge** - Combine multiple PDFs into one document
3. **Split** - Divide PDF into separate files
4. **Extract** - Create new PDF from specific pages
5. **Reorder** - Change page order within a PDF

### ✅ Technical Highlights
- **Pure JavaScript**: No WebAssembly, no external dependencies
- **Lightweight**: 500KB library vs 3MB+ WASM solutions
- **Fast**: Client-side processing, no network delays
- **Private**: Files never leave the user's browser
- **Modern**: Built with Next.js 15, TypeScript, Tailwind CSS
- **Secure**: CodeQL scanned, no vulnerabilities

## Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **PDF-lib** - Client-side PDF manipulation

### Key Dependencies
```json
{
  "pdf-lib": "^1.17.1",    // PDF processing
  "next": "^15.0.1",        // React framework
  "react": "^18.3.1",       // UI library
  "typescript": "^5.5.3"    // Type safety
}
```

## Architecture

```
pdflincemini/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── page.tsx                  # Home page
│   │   ├── layout.tsx                # Root layout
│   │   └── preguntas-frecuentes/     # FAQ page
│   ├── components/
│   │   ├── pdf-processor/            # Main PDF UI
│   │   │   ├── index.tsx            # Main component
│   │   │   ├── FileUploader.tsx     # File upload
│   │   │   ├── FileList.tsx         # File management
│   │   │   ├── PageSelector.tsx     # Page selection
│   │   │   ├── PageOrderer.tsx      # Page reordering
│   │   │   └── ProcessingOptions.tsx # Options UI
│   │   ├── ui/                       # Shared UI components
│   │   └── ...                       # Other components
│   ├── lib/
│   │   ├── pdf-operations.ts        # Core PDF logic ⭐
│   │   └── pdf-processor.ts         # High-level API
│   └── styles/                       # Global styles
├── docs/
│   ├── pdf-lib-integration.md       # Technical decision doc
│   ├── testing-guide.md             # Testing instructions
│   ├── pdf-lib-integration.md       # Technical decision doc
│   └── testing-guide.md             # Testing instructions
├── public/                           # Static assets
│   └── images/                       # App images
└── [config files]                    # Next.js, TypeScript, etc.
```

## Core Implementation

### PDF Operations Layer (`src/lib/pdf-operations.ts`)

Clean, well-documented functions for all PDF operations:

```typescript
// Compress PDF with optimization
export async function compressPDF(
  file: File, 
  options: PDFProcessingOptions
): Promise<ProcessingResult>

// Merge multiple PDFs
export async function mergePDFs(
  files: File[], 
  options: PDFProcessingOptions
): Promise<Uint8Array>

// Split PDF into chunks
export async function splitPDF(
  file: File, 
  options: PDFProcessingOptions
): Promise<Uint8Array[]>

// Extract specific pages
export async function extractPages(
  file: File, 
  pageNumbers: number[], 
  options: PDFProcessingOptions
): Promise<Uint8Array>

// Reorder pages
export async function reorderPages(
  file: File, 
  newOrder: number[], 
  options: PDFProcessingOptions
): Promise<Uint8Array>
```

### Processing Options

```typescript
type PDFProcessingOptions = {
  // Compression
  compressionLevel?: 'low' | 'medium' | 'high';
  preserveMetadata?: boolean;
  optimizeImages?: boolean;

  // Merge
  bookmarkHandling?: 'merge' | 'first' | 'none';
  addPageDividers?: boolean;

  // Split
  splitMode?: 'pageCount' | 'bookmarks' | 'pageNumbers';
  pagesPerFile?: number;

  // General
  metadata?: Record<string, string>;
  password?: string;
};
```

## Development Guide

### Setup

1. **Clone and install**:
   ```bash
   git clone https://github.com/GSiesto/pdflincemini.git
   cd pdflincemini
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open browser**:
   ```
   http://localhost:3000
   ```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production (generates out/)
npm run preview  # Serve the exported build locally
npm run start    # Serve previously exported build (out/)
npm run lint     # Run ESLint
npm run lint:fix # Fix ESLint issues
npm run deploy:gcs # Deploy static build to Cloud Storage + Cloud CDN
```

### Project Structure Guidelines

- **Components**: Place in `src/components/`
- **PDF Logic**: Place in `src/lib/pdf-operations.ts`
- **High-level API**: Place in `src/lib/pdf-processor.ts`
- **Documentation**: Place in `docs/`
- **Tests** (future): Place in `__tests__/`

## Deployment

### Build for Production

```bash
npm run build
```

Esto genera automáticamente la carpeta `out/` lista para distribuirse en cualquier CDN gracias a `output: "export"`.

### Deployment Options

1. **Vercel** (Recommended)
   - Automatic deployments from GitHub
   - Zero configuration needed
   - Built-in CDN and SSL

2. **AWS S3 + CloudFront** (Current)
   - Static hosting in S3 bucket (`pdflince`)
   - CloudFront for global CDN and HTTPS
   - Security via OAC/OAI (S3 bucket is private, only CloudFront can access)
   - Deploy script: `npm run deploy:aws` (handled by GitHub Actions) (Script name conceptual as it's in CI)

3. **Other Platforms**
   - Vercel, Netlify, Cloudflare Pages, etc.
   - Export as static site: `npm run build`

### Environment Variables

No environment variables required for basic operation. All processing is client-side.

## Performance

### Bundle Analysis

```bash
npm run build
npm run preview
```

### Domain Configuration

After deploying, point your domain in Porkbun/Cloud DNS to the CloudFront distribution:

1. Create a CNAME `www` pointing to the CloudFront domain (`dxxxx.cloudfront.net`)
2. Configure a CNAME/ALIAS `@` pointing to the same endpoint
## Security

### Client-Side Processing
- ✅ Files never leave the browser
- ✅ No server uploads required
- ✅ GDPR compliant by design
- ✅ No data collection

### Security Scanning
- ✅ CodeQL JavaScript analysis: 0 alerts
- ✅ npm audit: No vulnerabilities
- ✅ Dependency scanning: Clean
- ✅ GitHub Advisory Database: No issues

### Best Practices
- TypeScript for type safety
- Strict ESLint configuration
- Regular dependency updates
- Input validation

## Browser Compatibility

### Supported Browsers
- ✅ Chrome/Edge 90+
- ✅ Firefox 90+
- ✅ Safari 14+
- ✅ iOS Safari 14+
- ✅ Chrome Mobile 90+

### Requirements
- Modern JavaScript (ES2020+)
- File API support
- Blob/ArrayBuffer support
- No WebAssembly required

## Internationalization

Currently Spanish only. Future plans:
- English translation
- Portuguese translation
- Catalan translation

## Contributing

### Code Style
- TypeScript for all new code
- Functional components with hooks
- Tailwind CSS for styling
- ESLint + Prettier for formatting

### Pull Request Process
1. Fork repository
2. Create feature branch
3. Make changes
4. Add tests (when available)
5. Update documentation
6. Submit PR

## Troubleshooting

### Common Issues

**Build fails**:
- Check Node.js version (18+)
- Clear `node_modules` and reinstall
- Clear `.next` cache

**PDF processing fails**:
- Check file is valid PDF
- Try different compression level
- Check browser console for errors

**Slow processing**:
- Expected for large files (20+ MB)
- Consider splitting large PDFs first
- Check system memory

## Roadmap

### Planned Features
- [ ] PDF form field manipulation
- [ ] Digital signatures
- [ ] PDF/A conversion
- [ ] Advanced compression (image optimization)
- [ ] Batch processing improvements
- [ ] PWA support
- [ ] Multi-language support

### Under Consideration
- PDF.js integration for thumbnails
- Image to PDF conversion
- Watermark/stamp support
- Page rotation
- OCR support

## Resources

### Documentation
- [PDF-lib Integration Guide](./docs/pdf-lib-integration.md)
- [Testing Guide](./docs/testing-guide.md)
- [PDF-lib Integration Guide](./docs/pdf-lib-integration.md)
- [Testing Guide](./docs/testing-guide.md)

### External Links
- [PDF-lib Documentation](https://pdf-lib.js.org/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## License

MIT License - see LICENSE file for details

## Support

- 📧 Email: [contact via GitHub]
- 🐛 Issues: [GitHub Issues](https://github.com/GSiesto/pdflincemini/issues)
- 📖 Docs: [./docs/](./docs/)

## Acknowledgments

- **PDF-lib** - Excellent PDF manipulation library
- **Next.js** - Amazing React framework
- **Tailwind CSS** - Utility-first CSS framework
- **pdfcpu** - Original inspiration (now deprecated)

---

**Built with ❤️ for privacy-conscious PDF processing**
