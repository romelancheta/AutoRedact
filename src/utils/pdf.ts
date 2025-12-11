import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import type { BatchItem } from '../types';
import { PDF_MAX_SIZE_MB, PDF_MAX_PAGES } from '../constants/config';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// Process PDF file and return BatchItems for each page
export const processPdfFile = async (file: File): Promise<{ items: BatchItem[]; error?: string }> => {
    // Validate file size
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > PDF_MAX_SIZE_MB) {
        return { items: [], error: `PDF too large (${sizeMB.toFixed(1)}MB). Maximum: ${PDF_MAX_SIZE_MB}MB` };
    }

    try {
        // Load PDF
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        // Validate page count
        if (pdf.numPages > PDF_MAX_PAGES) {
            return { items: [], error: `Too many pages (${pdf.numPages}). Maximum: ${PDF_MAX_PAGES} pages` };
        }

        const items: BatchItem[] = [];
        const baseName = file.name.replace(/\.pdf$/i, '');

        // Process each page
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);

            // Render at 2x scale for better OCR quality
            const scale = 2;
            const viewport = page.getViewport({ scale });

            const canvas = document.createElement('canvas');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const ctx = canvas.getContext('2d');

            if (ctx) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                await page.render({ canvasContext: ctx, viewport, canvas } as any).promise;

                // Convert canvas to blob/file for OCR processing
                const dataUrl = canvas.toDataURL('image/png');
                const blob = await (await fetch(dataUrl)).blob();
                const pageFile = new File([blob], `${baseName}_page${pageNum}.png`, { type: 'image/png' });

                items.push({
                    id: `pdf-${Date.now()}-${pageNum}`,
                    file: pageFile,
                    status: 'pending',
                    detectedCount: 0,
                    detectedBreakdown: { emails: 0, ips: 0, creditCards: 0, secrets: 0, pii: 0 },
                    dataUrl: null,
                });
            }
        }

        return { items };
    } catch (error) {
        console.error('PDF processing error:', error);
        return { items: [], error: 'Failed to process PDF. Make sure the file is valid.' };
    }
};
