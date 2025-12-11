interface ImagePreviewModalProps {
    image: string | null;
    onClose: () => void;
}

export function ImagePreviewModal({ image, onClose }: ImagePreviewModalProps) {
    if (!image) return null;

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="max-w-6xl w-full max-h-[90vh] relative flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 text-slate-400 hover:text-white flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full backdrop-blur-sm transition-colors"
                >
                    <span>Close Preview</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <img
                    src={image}
                    alt="Preview"
                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-slate-800"
                />
            </div>
        </div>
    );
}
