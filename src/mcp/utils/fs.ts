import * as fs from 'node:fs/promises';
import * as path from 'node:path';

/**
 * Resolves a file path relative to current working directory if relative.
 */
export function resolvePath(filePath: string): string {
  return path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
}

/**
 * Validates that a file exists and is accessible.
 */
export async function assertFileExists(filePath: string): Promise<string> {
  const resolved = resolvePath(filePath);
  try {
    const stats = await fs.stat(resolved);
    if (!stats.isFile()) {
      throw new Error(`Path is a directory, expected a file: ${filePath}`);
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      throw new Error(`File not found: ${filePath}`);
    }
    throw error;
  }
  return resolved;
}

/**
 * Reads a PDF file from disk into a Uint8Array.
 */
export async function readPdfFile(filePath: string): Promise<{ data: Uint8Array; resolvedPath: string; size: number }> {
  const resolved = await assertFileExists(filePath);
  const buffer = await fs.readFile(resolved);
  return {
    data: new Uint8Array(buffer),
    resolvedPath: resolved,
    size: buffer.byteLength,
  };
}

/**
 * Writes processed bytes to disk, creating parent directories if needed.
 */
export async function writePdfFile(outputPath: string, data: Uint8Array): Promise<{ resolvedPath: string; size: number }> {
  const resolved = resolvePath(outputPath);
  const dir = path.dirname(resolved);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(resolved, Buffer.from(data));
  return {
    resolvedPath: resolved,
    size: data.byteLength,
  };
}

/**
 * Formats bytes to human-readable string.
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}
