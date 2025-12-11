import type { DetectedItem } from '../types';

// ============================================================================
// CANVAS DRAWING FUNCTIONS
// ============================================================================
export const drawImageToCanvas = (
    canvas: HTMLCanvasElement,
    img: HTMLImageElement,
    items: DetectedItem[]
) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // Layer 1: Draw original image
    ctx.drawImage(img, 0, 0);

    // Layer 2: Draw redaction boxes
    ctx.fillStyle = '#000000';
    items.forEach(item => {
        const { x0, y0, x1, y1 } = item.bbox;
        const padding = 2;
        ctx.fillRect(
            x0 - padding,
            y0 - padding,
            (x1 - x0) + padding * 2,
            (y1 - y0) + padding * 2
        );
    });
};

// Helper: Preprocess image for better OCR (Grayscale + Binarization)
export const preprocessImage = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    // Contrast enhancement factor
    // > 1 increases contrast, < 1 decreases it. 
    // 1.5 pushes darks darker and lights lighter without destroying midtones completely.
    const contrast = 1.5;
    const intercept = 128 * (1 - contrast);

    for (let i = 0; i < data.length; i += 4) {
        // Handle transparency: If alpha is low, make it white
        if (data[i + 3] < 10) {
            data[i] = 255;     // R
            data[i + 1] = 255; // G
            data[i + 2] = 255; // B
            data[i + 3] = 255; // A (make opaque white)
            continue;
        }

        // Convert to grayscale: L = 0.299R + 0.587G + 0.114B
        const avg = (0.299 * data[i]) + (0.587 * data[i + 1]) + (0.114 * data[i + 2]);

        // Apply contrast
        // Formula: factor * (color - 128) + 128
        // Simplified: color * factor + (128 - 128 * factor)
        let value = (avg * contrast) + intercept;

        // Clamp to 0-255
        value = Math.max(0, Math.min(255, value));

        data[i] = value;     // R
        data[i + 1] = value; // G
        data[i + 2] = value; // B
        // Alpha remains unchanged
    }

    ctx.putImageData(imageData, 0, 0);
};
