import React from 'react';

interface DropZoneProps {
    onDrop: (e: React.DragEvent) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
    onClick: () => void;
    isDragging: boolean;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    onFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function DropZone({
    onDrop,
    onDragOver,
    onDragLeave,
    onClick,
    isDragging,
    fileInputRef,
    onFileInputChange,
}: DropZoneProps) {
    return (
        <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onClick={onClick}
            className={`border-2 border-dashed rounded-2xl p-12 text-center max-w-2xl mx-auto transition-all duration-300 mb-8 cursor-pointer ${isDragging
                ? 'border-cyan-500 bg-cyan-500/10'
                : 'border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800/50 bg-slate-800/20'
                }`}
        >
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf"
                multiple
                onChange={onFileInputChange}
                className="hidden"
            />
            <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center">
                    <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <div>
                    <p className="text-lg text-white font-medium mb-1">
                        Drop images or PDFs here
                    </p>
                    <p className="text-sm text-slate-400">
                        PNG, JPG, WebP, PDF • Batch processing enabled
                    </p>
                </div>
            </div>
        </div>
    );
}
