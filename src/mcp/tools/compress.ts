import { z } from 'zod';
import { compressPDF } from '../../lib/pdf-operations';
import { readPdfFile, writePdfFile, formatBytes } from '../utils/fs';
import { ensureNodeImageAdapterRegistered } from '../utils/image-adapter';

const COMPRESSION_PRESETS: Record<
  'low' | 'medium' | 'high',
  {
    preserveMetadata: boolean;
    stripAnnotations: boolean;
    downscaleImages: boolean;
    downscaleImagesDpi: number;
  }
> = {
  low: {
    preserveMetadata: true,
    stripAnnotations: false,
    downscaleImages: false,
    downscaleImagesDpi: 150,
  },
  medium: {
    preserveMetadata: true,
    stripAnnotations: false,
    downscaleImages: true,
    downscaleImagesDpi: 150,
  },
  high: {
    preserveMetadata: false,
    stripAnnotations: true,
    downscaleImages: true,
    downscaleImagesDpi: 72,
  },
};

export const compressSchema = {
  filePath: z.string().describe('Path to the source PDF file to compress'),
  outputPath: z.string().describe('Destination path where the compressed PDF will be saved'),
  compressionLevel: z
    .enum(['low', 'medium', 'high'])
    .default('medium')
    .describe(
      'Compression preset matching the PDFLince UI: low (lossless stream optimization, preserves metadata), medium (balanced, downscales images to 150 DPI), high (maximum reduction, downscales images to 72 DPI, strips annotations and metadata)'
    ),
  preserveMetadata: z
    .boolean()
    .optional()
    .describe('Whether to retain document metadata (author, title, etc). Defaults to true for low/medium and false for high'),
  stripAnnotations: z
    .boolean()
    .optional()
    .describe('Whether to remove annotations and comments. Defaults to false for low/medium and true for high'),
  downscaleImages: z
    .boolean()
    .optional()
    .describe('Whether to downscale and optimize embedded images. Defaults to false for low and true for medium/high'),
  downscaleImagesDpi: z
    .number()
    .int()
    .positive()
    .optional()
    .describe('Target DPI for embedded image downscaling (e.g. 150 or 72). Defaults to 150 for medium and 72 for high'),
  imageQuality: z
    .number()
    .min(0.1)
    .max(1.0)
    .optional()
    .describe('JPEG compression quality (0.1 to 1.0) when optimizing embedded images (default: 0.82)'),
};

export async function handleCompress(args: {
  filePath: string;
  outputPath: string;
  compressionLevel?: 'low' | 'medium' | 'high';
  preserveMetadata?: boolean;
  stripAnnotations?: boolean;
  downscaleImages?: boolean;
  downscaleImagesDpi?: number;
  imageQuality?: number;
}) {
  ensureNodeImageAdapterRegistered();

  const { data, resolvedPath } = await readPdfFile(args.filePath);
  const level = args.compressionLevel ?? 'medium';
  const preset = COMPRESSION_PRESETS[level];

  const preserveMetadata = args.preserveMetadata ?? preset.preserveMetadata;
  const stripAnnotations = args.stripAnnotations ?? preset.stripAnnotations;
  const downscaleImages = args.downscaleImages ?? preset.downscaleImages;
  const downscaleImagesDpi = args.downscaleImagesDpi ?? preset.downscaleImagesDpi;
  const imageQuality = args.imageQuality ?? 0.82;

  const compressionResult = await compressPDF(data, {
    compressionLevel: level,
    preserveMetadata,
    stripAnnotations,
    downscaleImages,
    downscaleImagesDpi,
    imageQuality,
  });

  const { resolvedPath: savedPath } = await writePdfFile(args.outputPath, compressionResult.data);

  const savingsBytes = compressionResult.originalSize - compressionResult.processedSize;
  const savingsPercent =
    compressionResult.originalSize > 0
      ? ((savingsBytes / compressionResult.originalSize) * 100).toFixed(1)
      : '0';

  const result = {
    success: true,
    message: `Compressed PDF from ${formatBytes(compressionResult.originalSize)} to ${formatBytes(compressionResult.processedSize)} (${savingsPercent}% reduction)`,
    sourceFile: resolvedPath,
    outputPath: savedPath,
    originalSize: formatBytes(compressionResult.originalSize),
    originalSizeBytes: compressionResult.originalSize,
    compressedSize: formatBytes(compressionResult.processedSize),
    compressedSizeBytes: compressionResult.processedSize,
    savingsBytes: formatBytes(Math.max(0, savingsBytes)),
    savingsPercentage: `${savingsPercent}%`,
    appliedOptions: {
      compressionLevel: level,
      preserveMetadata,
      stripAnnotations,
      downscaleImages,
      downscaleImagesDpi,
      imageQuality,
    },
    processingTimeMs: Math.round(compressionResult.processingTimeMs),
  };

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
}
