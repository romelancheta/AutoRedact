import JSZip from 'jszip';
import { jsPDF } from 'jspdf';
import type { BatchItem } from '../types';

// Download all processed images as ZIP
export const downloadBatchAsZip = async (batchItems: BatchItem[]) => {
    const completedItems = batchItems.filter(item => item.status === 'complete' && item.dataUrl);
    if (completedItems.length === 0) return;

    const zip = new JSZip();

    for (const item of completedItems) {
        // Convert data URL to blob
        const response = await fetch(item.dataUrl!);
        const blob = await response.blob();

        // Add to zip with original filename + redacted prefix
        const filename = `redacted-${item.file.name.replace(/\.[^/.]+$/, '')}.png`;
        zip.file(filename, blob);
    }

    // Generate and download zip
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(zipBlob);
    link.download = `localredact-batch-${Date.now()}.zip`;
    link.click();
    URL.revokeObjectURL(link.href);
};

// Download all processed images as a single PDF (compressed)
export const downloadBatchAsPdf = async (batchItems: BatchItem[]) => {
    const completedItems = batchItems.filter(item => item.status === 'complete' && item.dataUrl);
    if (completedItems.length === 0) return;

    // Create PDF with first image to determine orientation
    const firstImg = new Image();
    firstImg.src = completedItems[0].dataUrl!;
    await new Promise<void>(resolve => { firstImg.onload = () => resolve(); });

    // Scale down for PDF (since we upscaled for OCR)
    const scaleFactor = 0.5;
    const w = firstImg.width * scaleFactor;
    const h = firstImg.height * scaleFactor;

    const isLandscape = w > h;
    const pdf = new jsPDF({
        orientation: isLandscape ? 'landscape' : 'portrait',
        unit: 'px',
        format: [w, h],
        compress: true,
    });

    for (let i = 0; i < completedItems.length; i++) {
        const item = completedItems[i];

        // Load image
        const img = new Image();
        img.src = item.dataUrl!;
        await new Promise<void>(resolve => { img.onload = () => resolve(); });

        const imgW = img.width * scaleFactor;
        const imgH = img.height * scaleFactor;

        if (i > 0) {
            // Add new page for subsequent images
            const imgIsLandscape = imgW > imgH;
            pdf.addPage([imgW, imgH], imgIsLandscape ? 'landscape' : 'portrait');
        }

        // Add image as JPEG with compression (quality 0.7)
        pdf.addImage(item.dataUrl!, 'JPEG', 0, 0, imgW, imgH, undefined, 'FAST');
    }

    // Download PDF
    pdf.save(`localredact-batch-${Date.now()}.pdf`);
};
