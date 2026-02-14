import { PDFProcessingMode, PDFProcessingOptions } from './pdf-operations';

export type WorkerMessage = {
    id: string;
    mode: string;
    files: File[];
    options: unknown;
};

export type WorkerResponse = {
    id: string;
    success: boolean;
    result?: unknown;
    error?: string;
};

class PDFWorkerClient {
    private worker: Worker | null = null;
    private pendingRequests: Map<string, { resolve: (val: unknown) => void; reject: (err: unknown) => void }> = new Map();

    private getWorker(): Worker {
        if (!this.worker) {
            // Next.js specific way to initialize workers
            this.worker = new Worker(new URL('../workers/pdf.worker.ts', import.meta.url));
            this.worker.onmessage = (e: MessageEvent<WorkerResponse>) => {
                const { id, success, result, error } = e.data;
                const pending = this.pendingRequests.get(id);
                if (pending) {
                    if (success) {
                        pending.resolve(result);
                    } else {
                        pending.reject(new Error(error));
                    }
                    this.pendingRequests.delete(id);
                }
            };
            this.worker.onerror = (e) => {
                console.error('PDF Worker error:', e);
            };
        }
        return this.worker;
    }

    public run(mode: PDFProcessingMode, files: File[], options: PDFProcessingOptions = {}): Promise<unknown> {
        const worker = this.getWorker();

        return new Promise((resolve, reject) => {
            const id = crypto.randomUUID();
            this.pendingRequests.set(id, { resolve, reject });
            worker.postMessage({ id, mode, files, options });
        });
    }

    terminate() {
        if (this.worker) {
            this.worker.terminate();
            this.worker = null;
        }
    }
}

export const pdfWorkerClient = new PDFWorkerClient();
