import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

async function copyWorker() {
  const projectRoot = process.cwd();
  const source = path.join(projectRoot, 'node_modules', 'pdfjs-dist', 'legacy', 'build', 'pdf.worker.min.mjs');
  const destinationDir = path.join(projectRoot, 'public');
  const destination = path.join(destinationDir, 'pdf.worker.min.mjs');

  try {
    await fs.access(source);
  } catch {
    console.warn('[setup-pdf-worker] pdf.worker.min.mjs not found, skipping copy. Did you install dependencies?');
    return;
  }

  await fs.mkdir(destinationDir, { recursive: true });
  await fs.copyFile(source, destination);
  console.log(`[setup-pdf-worker] Copied PDF.js worker to ${path.relative(projectRoot, destination)}`);

  // Copy CMaps
  const cmapsSource = path.join(projectRoot, 'node_modules', 'pdfjs-dist', 'cmaps');
  const cmapsDest = path.join(projectRoot, 'public', 'cmaps');

  try {
    await fs.access(cmapsSource);
    await fs.mkdir(cmapsDest, { recursive: true });
    // Use fs.cp for recursive copy (Node 16.7+)
    if (fs.cp) {
      await fs.cp(cmapsSource, cmapsDest, { recursive: true });
    } else {
      // Fallback for older node checks or if fs.cp is experimental
      // But Next.js 15 requires Node 18+, so fs.cp should be there.
      // We can just use the recursive copy function if we write one, but let's assume fs.cp works.
      // Actually, let's keep it simple:
      await fs.cp(cmapsSource, cmapsDest, { recursive: true });
    }
    console.log(`[setup-pdf-worker] Copied CMaps to ${path.relative(projectRoot, cmapsDest)}`);
  } catch (err) {
    console.warn(`[setup-pdf-worker] Failed to copy CMaps: ${err.message}`);
  }

  // Copy Standard Fonts
  const fontsSource = path.join(projectRoot, 'node_modules', 'pdfjs-dist', 'standard_fonts');
  const fontsDest = path.join(projectRoot, 'public', 'standard_fonts');

  try {
    await fs.access(fontsSource);
    await fs.mkdir(fontsDest, { recursive: true });
    if (fs.cp) {
      await fs.cp(fontsSource, fontsDest, { recursive: true });
    } else {
      await fs.cp(fontsSource, fontsDest, { recursive: true });
    }
    console.log(`[setup-pdf-worker] Copied Standard Fonts to ${path.relative(projectRoot, fontsDest)}`);
  } catch (err) {
    console.warn(`[setup-pdf-worker] Failed to copy Standard Fonts: ${err.message}`);
  }
}

copyWorker().catch((error) => {
  console.error('[setup-pdf-worker] Failed to copy PDF.js worker:', error);
  process.exitCode = 1;
});
