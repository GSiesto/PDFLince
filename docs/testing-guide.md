# Testing Guide for PDF-lib Integration

This guide provides comprehensive testing instructions to verify all PDF operations work correctly with the new PDF-lib implementation.

## Quick Verification

After starting the development server (`npm run dev`), test each operation:

### 1. Compress PDF

**Test Case**: Compress a multi-page PDF
- Upload a PDF file (recommended: 5-10 pages, 1-5 MB)
- Select "Comprimir PDF" mode
- Click "Procesar"
- Verify:
  - ✅ File downloads successfully
  - ✅ File size is reduced
  - ✅ PDF opens correctly in viewer
  - ✅ All pages are present
  - ✅ Content is intact

**Expected Results**:
- Reduction typically 10-40% for already-compressed PDFs
- Reduction typically 40-70% for uncompressed PDFs
- Processing time: 50-500ms depending on size

### 2. Merge PDFs

**Test Case**: Merge 3 PDF files
- Upload 3 different PDF files
- Select "Unir PDFs" mode
- Optionally reorder by dragging
- Click "Procesar"
- Verify:
  - ✅ Single merged PDF downloads
  - ✅ All pages from all files are present
  - ✅ Pages are in the correct order
  - ✅ Content from each PDF is intact

**Expected Results**:
- All pages combined in specified order
- Metadata preserved from first PDF
- Processing time: 100-1000ms depending on total size

### 3. Split PDF

**Test Case**: Split a multi-page PDF
- Upload a PDF with 5+ pages
- Select "Dividir PDF" mode
- Set "Páginas por archivo" (e.g., 2)
- Click "Procesar"
- Verify:
  - ✅ Multiple files download
  - ✅ Each file has correct number of pages
  - ✅ All content is preserved
  - ✅ No pages are missing or duplicated

**Expected Results**:
- File split into chunks as specified
- First file downloads immediately
- Additional files download after 800ms delay
- Each chunk is a valid PDF

### 4. Extract Pages

**Test Case**: Extract specific pages
- Upload a PDF with 5+ pages
- Select "Extraer Páginas" mode
- Select specific pages (e.g., pages 1, 3, and 5)
- Click "Extraer [N] páginas"
- Verify:
  - ✅ New PDF downloads with only selected pages
  - ✅ Pages are in selection order
  - ✅ Content is intact
  - ✅ Metadata is preserved (if option enabled)

**Expected Results**:
- Only selected pages in new PDF
- Original page numbers don't matter
- Pages maintain original quality

### 5. Reorder Pages

**Test Case**: Reorder pages in a PDF
- Upload a PDF with 3+ pages
- Select "Reordenar Páginas" mode
- Drag and drop pages to new order
- Click "Guardar nueva ordenación"
- Verify:
  - ✅ New PDF downloads with pages in new order
  - ✅ All pages present
  - ✅ Content intact
  - ✅ Metadata preserved

**Expected Results**:
- Pages appear in the dragged order
- No pages lost or duplicated
- Processing time: 50-300ms

## Edge Cases to Test

### Large Files
- **Test**: 50+ page PDF, 20+ MB
- **Expected**: Should process without errors
- **Note**: May take longer (1-5 seconds)

### Small Files
- **Test**: Single page PDF, <100 KB
- **Expected**: Process quickly (<100ms)
- **Note**: Compression may show minimal improvement

### Encrypted PDFs
- **Test**: Password-protected PDF
- **Expected**: Should handle gracefully with error message
- **Note**: PDF-lib can read some encrypted PDFs if opened with `ignoreEncryption: true`

### Corrupted PDFs
- **Test**: Damaged or invalid PDF file
- **Expected**: Clear error message to user
- **Note**: Should not crash the application

### Complex PDFs
- **Test**: PDF with forms, annotations, embedded fonts
- **Expected**: All content preserved in output
- **Note**: Some complex features may be lost in compression

## Browser Compatibility Testing

Test in multiple browsers:

### Chrome/Edge (Chromium)
- ✅ All features should work
- ✅ Best performance

### Firefox
- ✅ All features should work
- ✅ Good performance

### Safari
- ✅ All features should work
- ⚠️ May be slightly slower on large files

### Mobile Browsers
- ✅ iOS Safari: Should work
- ✅ Chrome Mobile: Should work
- ⚠️ Memory limits may affect very large files (50+ MB)

## Performance Benchmarks

Expected processing times on modern hardware:

| Operation | Small (<1MB) | Medium (1-5MB) | Large (5-20MB) | Very Large (20+ MB) |
|-----------|--------------|----------------|----------------|---------------------|
| Compress  | 50-100ms     | 100-300ms      | 300-1000ms     | 1-3s                |
| Merge (2) | 50-150ms     | 150-400ms      | 400-1200ms     | 1-4s                |
| Split     | 50-100ms     | 100-300ms      | 300-1000ms     | 1-3s                |
| Extract   | 30-80ms      | 80-200ms       | 200-600ms      | 0.5-2s              |
| Reorder   | 30-80ms      | 80-200ms       | 200-600ms      | 0.5-2s              |

## Memory Usage

Monitor browser memory during testing:

### Normal Usage
- **Small PDFs**: 10-50 MB heap
- **Medium PDFs**: 50-200 MB heap
- **Large PDFs**: 200-500 MB heap

### Warning Signs
- Browser becomes unresponsive
- Page crashes on large files
- Memory warnings in console

## Common Issues and Solutions

### Issue: "Failed to load PDF"
**Cause**: Corrupted or invalid PDF file
**Solution**: Verify file is a valid PDF, try different file

### Issue: "Failed to compress PDF"
**Cause**: PDF may be encrypted or corrupted
**Solution**: Remove encryption, try different compression level

### Issue: Slow processing
**Cause**: Large file size or complex PDF
**Solution**: Normal for large files, consider splitting first

### Issue: Output PDF won't open
**Cause**: Rare PDF-lib bug or memory issue
**Solution**: Try with smaller file, report if consistent

## Automated Testing (Future)

For comprehensive testing, consider adding:

1. **Unit Tests**
   ```typescript
   describe('PDF Operations', () => {
     it('should compress PDF', async () => {
       const file = new File([pdfBuffer], 'test.pdf');
       const result = await compressPDF(file);
       expect(result.processedSize).toBeLessThan(result.originalSize);
     });
   });
   ```

2. **Integration Tests**
   - Test full user flow
   - Verify downloads work
   - Check error handling

3. **E2E Tests**
   - Playwright/Cypress tests
   - Test in real browsers
   - Verify UI interactions



## Reporting Issues

If you find issues during testing:

1. **Check console**: Look for error messages
2. **Note the operation**: Which mode failed?
3. **File details**: Size, page count, complexity
4. **Browser**: Which browser and version?
5. **Steps to reproduce**: Exact steps taken

Create an issue with:
```
Title: [Operation] Brief description

Environment:
- Browser: Chrome 120
- OS: Windows 11
- File size: 5 MB
- Page count: 25

Steps to reproduce:
1. Upload file
2. Select [operation]
3. Click process

Expected: [what should happen]
Actual: [what happened]

Console errors: [paste errors]
```

## Success Criteria

The integration is successful if:

- ✅ All 5 operations work without errors
- ✅ Output PDFs are valid and openable
- ✅ No mock/fallback warnings appear
- ✅ Processing is fast (<3s for typical files)
- ✅ No console errors
- ✅ Works in all major browsers
- ✅ Bundle size is <1 MB
- ✅ Build completes without Go
- ✅ CodeQL security scan passes

## Next Steps

After testing is complete:

1. Document any issues found
2. Fix critical bugs
3. Optimize performance if needed
4. Add user documentation
5. Deploy to production

For questions or issues, refer to:
- [PDF-lib Documentation](https://pdf-lib.js.org/)
- [Integration Guide](./pdf-lib-integration.md)
- [Source Code](../src/lib/pdf-operations.ts)
