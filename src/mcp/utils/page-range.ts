/**
 * Parses a page range string (e.g. "1-3, 5, 8-10") or an array of numbers into a sorted list of 1-indexed page numbers.
 * Validates against the total pages in the document.
 */
export function parseAndValidatePageNumbers(
  input: string | number[] | undefined,
  totalPages: number
): number[] {
  if (totalPages <= 0) {
    throw new Error('Total page count must be greater than zero');
  }

  // If undefined or "all", select all pages
  if (input === undefined || (typeof input === 'string' && input.trim().toLowerCase() === 'all')) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  let rawNumbers: number[] = [];

  if (Array.isArray(input)) {
    rawNumbers = input;
  } else if (typeof input === 'string') {
    const parts = input.split(',').map((p) => p.trim()).filter(Boolean);
    for (const part of parts) {
      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-').map((s) => s.trim());
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);

        if (isNaN(start) || isNaN(end) || start <= 0 || end <= 0) {
          throw new Error(`Invalid page range token: "${part}"`);
        }

        const step = start <= end ? 1 : -1;
        for (let current = start; step > 0 ? current <= end : current >= end; current += step) {
          rawNumbers.push(current);
        }
      } else {
        const pageNum = parseInt(part, 10);
        if (isNaN(pageNum) || pageNum <= 0) {
          throw new Error(`Invalid page number token: "${part}"`);
        }
        rawNumbers.push(pageNum);
      }
    }
  }

  if (rawNumbers.length === 0) {
    throw new Error('No valid pages specified');
  }

  // Validate range bounds against document total
  for (const page of rawNumbers) {
    if (page < 1 || page > totalPages) {
      throw new Error(`Page ${page} is out of bounds (document has ${totalPages} pages)`);
    }
  }

  return rawNumbers;
}
