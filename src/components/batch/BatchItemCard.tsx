import type { BatchItem } from '../../types';

interface BatchItemCardProps {
    item: BatchItem;
    onPreview: (url: string) => void;
}

export function BatchItemCard({ item, onPreview }: BatchItemCardProps) {
    return (
        <div className="card p-4 relative">
            {/* Status Badge */}
            <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium z-10 ${item.status === 'pending' ? 'bg-slate-700 text-slate-300' :
                item.status === 'processing' ? 'bg-cyan-500/20 text-cyan-400' :
                    item.status === 'complete' ? 'bg-green-500/20 text-green-400' :
                        'bg-red-500/20 text-red-400'
                }`}>
                {item.status === 'pending' ? '⏳ Pending' :
                    item.status === 'processing' ? '⚙️ Processing' :
                        item.status === 'complete' ? '✓ Complete' :
                            '⚠️ Error'}
            </div>

            {/* Image Preview */}
            <div className="aspect-video bg-slate-800 rounded-lg overflow-hidden mb-3 relative group">
                {item.dataUrl ? (
                    <>
                        <img
                            src={item.dataUrl}
                            alt={item.file.name}
                            className="w-full h-full object-cover"
                        />
                        {/* Preview Overlay Button */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                                onClick={() => onPreview(item.dataUrl!)}
                                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors border border-white/30"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                Preview
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        {item.status === 'processing' ? (
                            <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        )}
                    </div>
                )}
            </div>

            {/* Filename */}
            <p className="text-sm text-slate-300 truncate font-medium mb-1">{item.file.name}</p>
            <p className="text-xs text-slate-500 mb-3">{(item.file.size / 1024).toFixed(1)} KB</p>

            {/* Detailed Breakdown */}
            {item.status === 'complete' && (
                <div className="bg-slate-800/50 rounded-lg p-2 mb-3">
                    <p className="text-xs text-slate-400 mb-2 font-medium">Redactions Found:</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                        {item.detectedBreakdown.emails > 0 && (
                            <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                                <span>📧</span> {item.detectedBreakdown.emails} Emails
                            </span>
                        )}
                        {item.detectedBreakdown.ips > 0 && (
                            <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 font-medium">
                                <span>🌐</span> {item.detectedBreakdown.ips} IPs
                            </span>
                        )}
                        {item.detectedBreakdown.creditCards > 0 && (
                            <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-medium">
                                <span>💳</span> {item.detectedBreakdown.creditCards} Cards
                            </span>
                        )}
                        {item.detectedBreakdown.secrets > 0 && (
                            <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-red-500/10 text-red-400 border border-red-500/30 font-medium">
                                <span>🔑</span> {item.detectedBreakdown.secrets} Secrets
                            </span>
                        )}
                        {item.detectedBreakdown.pii > 0 && (
                            <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                                <span>🪪</span> {item.detectedBreakdown.pii} PII
                            </span>
                        )}
                        {item.detectedCount === 0 && (
                            <span className="text-slate-500 italic">No sensitive data found</span>
                        )}
                    </div>
                </div>
            )}

            {/* Individual Download */}
            {item.status === 'complete' && item.dataUrl && (
                <a
                    href={item.dataUrl}
                    download={`redacted-${item.file.name}`}
                    className="block w-full text-center text-sm py-2 px-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-lg transition-colors"
                >
                    Download
                </a>
            )}
        </div>
    );
}
