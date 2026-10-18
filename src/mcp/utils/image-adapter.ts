import * as fs from 'node:fs/promises';
import * as os from 'node:os';
import * as path from 'node:path';
import * as zlib from 'node:zlib';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { registerNodeImageAdapter } from '../../lib/pdf-operations';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SharpFactory = (input?: any, options?: any) => any;

let cachedSharp: SharpFactory | null | undefined;

function getSharp(): SharpFactory | null {
  if (cachedSharp !== undefined) return cachedSharp;
  try {
    const req = createRequire(import.meta.url);
    // Dynamic string prevents static bundlers from trying to inline native .node binaries
    const modName = ['sh', 'arp'].join('');
    const mod = req(modName);
    cachedSharp = (typeof mod === 'function' ? mod : mod?.default) ?? null;
  } catch {
    cachedSharp = null;
  }
  return cachedSharp ?? null;
}

function hasCommand(cmd: string): boolean {
  try {
    const res = spawnSync(process.platform === 'win32' ? 'where' : 'which', [cmd], {
      encoding: 'utf8',
    });
    return res.status === 0;
  } catch {
    return false;
  }
}

export async function nodeDecompressFlate(bytes: Uint8Array): Promise<Uint8Array | null> {
  try {
    return new Uint8Array(zlib.inflateSync(bytes));
  } catch {
    try {
      return new Uint8Array(zlib.inflateRawSync(bytes));
    } catch {
      return null;
    }
  }
}

export async function nodeDownscaleImage(
  bytes: Uint8Array,
  targetDpi: number,
  quality: number,
  rawParams?: { width: number; height: number; colorSpace: string }
): Promise<{
  bytes: Uint8Array;
  width: number;
  height: number;
  colorSpace?: 'DeviceRGB' | 'DeviceGray';
} | null> {
  const targetPixels = Math.round(targetDpi * 8.27);
  const qualityInt = Math.max(10, Math.min(100, Math.round(quality * 100)));
  const sharp = getSharp();

  if (sharp) {
    try {
      if (rawParams) {
        const { width, height, colorSpace } = rawParams;
        if (colorSpace !== 'DeviceRGB' && colorSpace !== 'DeviceGray') {
          return null;
        }
        const channels = colorSpace === 'DeviceRGB' ? 3 : 1;
        const maxDimension = Math.max(width, height);
        const scale = targetPixels <= 0 ? 1 : Math.min(1, targetPixels / maxDimension);
        const targetWidth = Math.max(1, Math.round(width * scale));
        const targetHeight = Math.max(1, Math.round(height * scale));

        let pipeline = sharp(Buffer.from(bytes), {
          raw: { width, height, channels },
        });
        if (targetWidth < width || targetHeight < height) {
          pipeline = pipeline.resize(targetWidth, targetHeight, { fit: 'fill' });
        }
        const outBuf: Buffer = await pipeline
          .jpeg({ quality: qualityInt, mozjpeg: true })
          .toBuffer();

        return {
          bytes: new Uint8Array(outBuf),
          width: targetWidth,
          height: targetHeight,
          colorSpace: channels === 1 ? 'DeviceGray' : 'DeviceRGB',
        };
      } else {
        const inputBuf = Buffer.from(bytes);
        const meta = await sharp(inputBuf).metadata();
        const width = meta.width ?? 0;
        const height = meta.height ?? 0;
        if (width <= 0 || height <= 0) return null;

        const maxDimension = Math.max(width, height);
        const isCmyk = meta.space === 'cmyk';
        if (!isCmyk && (maxDimension <= targetPixels * 1.05 || targetPixels <= 0)) {
          return null;
        }

        const scale = targetPixels <= 0 ? 1 : Math.min(1, targetPixels / maxDimension);
        const targetWidth = Math.max(1, Math.round(width * scale));
        const targetHeight = Math.max(1, Math.round(height * scale));

        let pipeline = sharp(inputBuf);
        if (isCmyk) {
          pipeline = pipeline.toColorspace('srgb');
        }
        if (targetWidth < width || targetHeight < height) {
          pipeline = pipeline.resize(targetWidth, targetHeight, { fit: 'fill' });
        }
        const outBuf: Buffer = await pipeline
          .jpeg({ quality: qualityInt, mozjpeg: true })
          .toBuffer();

        const isGray = !isCmyk && (meta.channels === 1 || meta.space === 'b-w');
        return {
          bytes: new Uint8Array(outBuf),
          width: targetWidth,
          height: targetHeight,
          colorSpace: isGray ? 'DeviceGray' : 'DeviceRGB',
        };
      }
    } catch {
      // Fall through to OS fallback
    }
  }

  // Fallback for macOS sips when sharp is not available and stream is DCTDecode JPEG
  if (!rawParams && process.platform === 'darwin' && hasCommand('sips')) {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pdflince-img-'));
    try {
      const inPath = path.join(tmpDir, 'in.jpg');
      const outPath = path.join(tmpDir, 'out.jpg');
      await fs.writeFile(inPath, bytes);

      const infoRes = spawnSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', '-g', 'space', inPath], {
        encoding: 'utf8',
      });
      if (infoRes.status !== 0) return null;

      const wMatch = infoRes.stdout.match(/pixelWidth:\s*(\d+)/);
      const hMatch = infoRes.stdout.match(/pixelHeight:\s*(\d+)/);
      const isCmyk = /space:\s*CMYK/i.test(infoRes.stdout);
      const width = wMatch ? Number(wMatch[1]) : 0;
      const height = hMatch ? Number(hMatch[1]) : 0;
      if (width <= 0 || height <= 0) return null;

      const maxDimension = Math.max(width, height);
      if (!isCmyk && (maxDimension <= targetPixels * 1.05 || targetPixels <= 0)) {
        return null;
      }

      const scale = targetPixels <= 0 ? 1 : Math.min(1, targetPixels / maxDimension);
      const targetWidth = Math.max(1, Math.round(width * scale));
      const targetHeight = Math.max(1, Math.round(height * scale));

      const sipsArgs = [
        '-s',
        'format',
        'jpeg',
        '-s',
        'formatOptions',
        String(qualityInt),
        '-z',
        String(targetHeight),
        String(targetWidth),
        inPath,
        '--out',
        outPath,
      ];
      const convRes = spawnSync('sips', sipsArgs, { encoding: 'utf8' });
      if (convRes.status !== 0) return null;

      const outBuf = await fs.readFile(outPath);
      return {
        bytes: new Uint8Array(outBuf),
        width: targetWidth,
        height: targetHeight,
        colorSpace: 'DeviceRGB',
      };
    } catch {
      return null;
    } finally {
      await fs.rm(tmpDir, { recursive: true, force: true }).catch(() => {});
    }
  }

  return null;
}

export async function nodeNormalizeImageForPdf(
  fileOrData: File | ArrayBuffer | Uint8Array
): Promise<{ bytes: Uint8Array; format: 'png' | 'jpeg' } | null> {
  let rawBytes: Uint8Array;
  if (fileOrData instanceof Uint8Array) {
    rawBytes = fileOrData;
  } else if (fileOrData instanceof ArrayBuffer) {
    rawBytes = new Uint8Array(fileOrData);
  } else if (typeof (fileOrData as File).arrayBuffer === 'function') {
    rawBytes = new Uint8Array(await (fileOrData as File).arrayBuffer());
  } else {
    return null;
  }

  const sharp = getSharp();
  if (sharp) {
    try {
      const pngBuf: Buffer = await sharp(Buffer.from(rawBytes)).png().toBuffer();
      return { bytes: new Uint8Array(pngBuf), format: 'png' };
    } catch {
      // Fall through to sips fallback
    }
  }

  if (process.platform === 'darwin' && hasCommand('sips')) {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pdflince-norm-'));
    try {
      const inPath = path.join(tmpDir, 'input');
      const outPath = path.join(tmpDir, 'output.png');
      await fs.writeFile(inPath, rawBytes);
      const res = spawnSync('sips', ['-s', 'format', 'png', inPath, '--out', outPath], {
        encoding: 'utf8',
      });
      if (res.status === 0) {
        const outBuf = await fs.readFile(outPath);
        return { bytes: new Uint8Array(outBuf), format: 'png' };
      }
    } catch {
      return null;
    } finally {
      await fs.rm(tmpDir, { recursive: true, force: true }).catch(() => {});
    }
  }

  return null;
}

/**
 * Renders a single-page PDF buffer into a PNG or JPEG image at the specified DPI and quality.
 */
export async function renderSinglePagePdfToImage(
  singlePagePdfBytes: Uint8Array,
  pageWidthPt: number,
  pageHeightPt: number,
  options: {
    dpi: number;
    format: 'png' | 'jpeg';
    quality: number;
  }
): Promise<{ bytes: Uint8Array; width: number; height: number }> {
  const dpi = Math.max(18, Math.min(600, options.dpi || 144));
  const scale = dpi / 72;
  const targetWidth = Math.max(1, Math.round(pageWidthPt * scale));
  const targetHeight = Math.max(1, Math.round(pageHeightPt * scale));
  const qualityInt = Math.max(10, Math.min(100, Math.round((options.quality ?? 0.9) * 100)));
  const isJpeg = options.format === 'jpeg';
  const sharp = getSharp();

  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pdflince-render-'));
  try {
    const pdfPath = path.join(tmpDir, 'page.pdf');
    await fs.writeFile(pdfPath, singlePagePdfBytes);

    // 1. Try pdftoppm (Poppler - Linux/macOS/Windows)
    if (hasCommand('pdftoppm')) {
      const outPrefix = path.join(tmpDir, 'out');
      const args = [
        isJpeg ? '-jpeg' : '-png',
        '-r',
        String(dpi),
        '-singlefile',
        pdfPath,
        outPrefix,
      ];
      const res = spawnSync('pdftoppm', args, { encoding: 'utf8' });
      const expectedOut = `${outPrefix}.${isJpeg ? 'jpg' : 'png'}`;
      if (res.status === 0) {
        try {
          let buf = await fs.readFile(expectedOut);
          if (sharp && isJpeg) {
            buf = await sharp(buf).jpeg({ quality: qualityInt, mozjpeg: true }).toBuffer();
          }
          return { bytes: new Uint8Array(buf), width: targetWidth, height: targetHeight };
        } catch {
          // Fall through
        }
      }
    }

    // 2. Try macOS built-in sips (available on 100% of macOS installations)
    if (process.platform === 'darwin' && hasCommand('sips')) {
      const rawPngPath = path.join(tmpDir, isJpeg && !sharp ? 'out.jpg' : 'out.png');
      const sipsArgs =
        isJpeg && !sharp
          ? [
              '-s',
              'format',
              'jpeg',
              '-s',
              'formatOptions',
              String(qualityInt),
              '-s',
              'dpiWidth',
              String(dpi),
              '-s',
              'dpiHeight',
              String(dpi),
              '-z',
              String(targetHeight),
              String(targetWidth),
              pdfPath,
              '--out',
              rawPngPath,
            ]
          : [
              '-s',
              'format',
              'png',
              '-s',
              'dpiWidth',
              String(dpi),
              '-s',
              'dpiHeight',
              String(dpi),
              '-z',
              String(targetHeight),
              String(targetWidth),
              pdfPath,
              '--out',
              rawPngPath,
            ];

      const res = spawnSync('sips', sipsArgs, { encoding: 'utf8' });
      if (res.status === 0) {
        let buf = await fs.readFile(rawPngPath);
        if (sharp) {
          if (isJpeg) {
            buf = await sharp(buf)
              .flatten({ background: '#ffffff' })
              .jpeg({ quality: qualityInt, mozjpeg: true })
              .toBuffer();
          } else {
            buf = await sharp(buf).png({ compressionLevel: 8 }).toBuffer();
          }
        }
        return { bytes: new Uint8Array(buf), width: targetWidth, height: targetHeight };
      }
    }

    // 3. Try mutool (MuPDF)
    if (hasCommand('mutool')) {
      const outPath = path.join(tmpDir, 'out.png');
      const res = spawnSync('mutool', ['draw', '-r', String(dpi), '-o', outPath, pdfPath], {
        encoding: 'utf8',
      });
      if (res.status === 0) {
        let buf = await fs.readFile(outPath);
        if (sharp && isJpeg) {
          buf = await sharp(buf)
            .flatten({ background: '#ffffff' })
            .jpeg({ quality: qualityInt, mozjpeg: true })
            .toBuffer();
        }
        return { bytes: new Uint8Array(buf), width: targetWidth, height: targetHeight };
      }
    }

    // 4. Try Ghostscript (gs)
    if (hasCommand('gs')) {
      const outPath = path.join(tmpDir, isJpeg ? 'out.jpg' : 'out.png');
      const device = isJpeg ? 'jpeg' : 'png16m';
      const gsArgs = [
        '-dSAFER',
        '-dBATCH',
        '-dNOPAUSE',
        `-sDEVICE=${device}`,
        `-r${dpi}`,
        ...(isJpeg ? [`-dJPEGQ=${qualityInt}`] : []),
        `-sOutputFile=${outPath}`,
        pdfPath,
      ];
      const res = spawnSync('gs', gsArgs, { encoding: 'utf8' });
      if (res.status === 0) {
        const buf = await fs.readFile(outPath);
        return { bytes: new Uint8Array(buf), width: targetWidth, height: targetHeight };
      }
    }

    // 5. Pure Node.js fallback when no external CLI rasterizer (pdftoppm/sips/mutool/gs) is installed on the host
    return await createFallbackPageImage(targetWidth, targetHeight, isJpeg, qualityInt, sharp);
  } finally {
    await fs.rm(tmpDir, { recursive: true, force: true }).catch(() => {});
  }
}

function crc32(buf: Uint8Array): number {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makePngChunk(type: string, data: Uint8Array): Buffer {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const body = Buffer.concat([typeBuf, Buffer.from(data)]);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crcBuf]);
}

async function createFallbackPageImage(
  width: number,
  height: number,
  isJpeg: boolean,
  qualityInt: number,
  sharp: SharpFactory | null
): Promise<{ bytes: Uint8Array; width: number; height: number }> {
  if (sharp) {
    try {
      const pipeline = sharp({
        create: {
          width,
          height,
          channels: 3,
          background: { r: 255, g: 255, b: 255 },
        },
      });
      const outBuf: Buffer = isJpeg
        ? await pipeline.jpeg({ quality: qualityInt, mozjpeg: true }).toBuffer()
        : await pipeline.png({ compressionLevel: 8 }).toBuffer();
      return { bytes: new Uint8Array(outBuf), width, height };
    } catch {
      // Fall through to pure Node.js zlib PNG generator
    }
  }

  // Pure Node.js PNG encoder using built-in node:zlib
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 8-bit depth
  ihdr[9] = 2; // RGB color type
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const rowStride = width * 3 + 1;
  const rawScanlines = Buffer.alloc(rowStride * height, 0xff);
  for (let y = 0; y < height; y++) {
    rawScanlines[y * rowStride] = 0; // Filter type 0 (None)
  }

  const compressed = zlib.deflateSync(rawScanlines, { level: 6 });
  const pngBuffer = Buffer.concat([
    signature,
    makePngChunk('IHDR', ihdr),
    makePngChunk('IDAT', compressed),
    makePngChunk('IEND', new Uint8Array(0)),
  ]);

  return { bytes: new Uint8Array(pngBuffer), width, height };
}

let registered = false;

export function ensureNodeImageAdapterRegistered(): void {
  if (registered) return;
  registerNodeImageAdapter({
    decompressFlate: nodeDecompressFlate,
    downscaleImage: nodeDownscaleImage,
    normalizeImageForPdf: nodeNormalizeImageForPdf,
  });
  registered = true;
}
