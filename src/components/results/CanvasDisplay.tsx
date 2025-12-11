import { useEffect, useRef } from 'react';
import type { DetectedItem } from '../../types';
import { drawImageToCanvas } from '../../utils/canvas';

interface CanvasDisplayProps {
    img: HTMLImageElement | null;
    items: DetectedItem[];
    forwardedRef?: React.Ref<HTMLCanvasElement>;
}

export function CanvasDisplay({ img, items, forwardedRef }: CanvasDisplayProps) {
    const localRef = useRef<HTMLCanvasElement>(null);
    const ref = (forwardedRef as React.RefObject<HTMLCanvasElement>) || localRef;

    useEffect(() => {
        if (img && ref.current) {
            drawImageToCanvas(ref.current, img, items);
        }
    }, [img, items, ref]);

    return (
        <div className="card p-4 relative overflow-hidden">
            <canvas
                ref={ref}
                className="max-w-full h-auto mx-auto rounded-lg shadow-2xl"
            />
        </div>
    );
}
