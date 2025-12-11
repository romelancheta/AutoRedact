import { useRef } from 'react';
import type { ProcessingState, DetectedItem } from '../../types';
import { CanvasDisplay } from './CanvasDisplay';
import { DetectionStats } from './DetectionStats';

interface ResultsViewProps {
    processingState: ProcessingState;
    stats: {
        emails: number;
        ips: number;
        creditCards: number;
        secrets: number;
        pii: number;
    };
    image: HTMLImageElement | null;
    items: DetectedItem[];
    originalFileName?: string;
    onReset: () => void;
}

export function ResultsView({
    processingState,
    stats,
    image,
    items,
    originalFileName,
    onReset,
}: ResultsViewProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleDownload = () => {
        if (!canvasRef.current) return;
        const link = document.createElement('a');
        link.download = `redacted-${originalFileName || 'image'}.png`;
        link.href = canvasRef.current.toDataURL('image/png');
        link.click();
    };

    return (
        <div className="space-y-6">
            {/* Progress Bar */}
            {processingState.status !== 'complete' && processingState.status !== 'error' && (
                <div className="card max-w-2xl mx-auto">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <div className="flex-1">
                            <p className="text-white font-medium">{processingState.message}</p>
                            <p className="text-sm text-slate-400">Processing locally in your browser</p>
                        </div>
                    </div>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${processingState.progress}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {/* Error State */}
            {processingState.status === 'error' && (
                <div className="card max-w-2xl mx-auto border-red-500/50 bg-red-950/20">
                    <div className="flex items-center gap-4">
                        <span className="text-3xl">⚠️</span>
                        <div>
                            <p className="text-red-400 font-medium">{processingState.message}</p>
                            <button
                                onClick={onReset}
                                className="text-sm text-slate-400 hover:text-white mt-2"
                            >
                                Try again
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Results */}
            {processingState.status === 'complete' && (
                <>
                    <DetectionStats stats={stats} />
                    <CanvasDisplay
                        img={image}
                        items={items}
                        forwardedRef={canvasRef}
                    />

                    {/* Actions */}
                    <div className="flex flex-wrap justify-center gap-4">
                        <button onClick={handleDownload} className="btn-primary flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download Redacted Image
                        </button>
                        <button onClick={onReset} className="btn-secondary">
                            Process Another Image
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
