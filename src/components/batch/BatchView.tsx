import type { BatchItem, BatchProgress } from '../../types';
import { BatchGrid } from './BatchGrid';
import { BatchProgressBar } from './BatchProgressBar';

interface BatchViewProps {
    items: BatchItem[];
    progress: BatchProgress;
    onProcess: () => void;
    onDownloadZip: () => void;
    onDownloadPdf: () => void;
    onReset: () => void;
    onPreview: (url: string) => void;
}

export function BatchView({
    items,
    progress,
    onProcess,
    onDownloadZip,
    onDownloadPdf,
    onReset,
    onPreview,
}: BatchViewProps) {
    return (
        <div className="space-y-6">
            {/* Batch Progress */}
            <div className="card max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-xl font-semibold text-white">
                            Batch Processing {progress.isProcessing ? '...' : ''}
                        </h3>
                        <p className="text-sm text-slate-400">
                            {progress.current} of {progress.total} images processed
                        </p>
                    </div>
                    <div className="flex gap-3">
                        {!progress.isProcessing && items.every(item => item.status === 'pending') && (
                            <button onClick={onProcess} className="btn-primary">
                                Start Processing
                            </button>
                        )}
                        {!progress.isProcessing && items.some(item => item.status === 'complete') && (
                            <>
                                <button onClick={onDownloadZip} className="btn-primary">
                                    📦 Download ZIP
                                </button>
                                <button onClick={onDownloadPdf} className="btn-secondary">
                                    📄 Download PDF
                                </button>
                            </>
                        )}
                        <button onClick={onReset} className="btn-secondary">
                            Reset
                        </button>
                    </div>
                </div>

                {/* Progress Bar */}
                {progress.isProcessing && (
                    <BatchProgressBar current={progress.current} total={progress.total} />
                )}
            </div>

            {/* Batch Items Grid */}
            <BatchGrid items={items} onPreview={onPreview} />
        </div>
    );
}
