export function FeaturesGrid() {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Batch */}
            <div className="card border-slate-700 hover:border-cyan-500/50 transition-colors">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">📦</span>
                </div>
                <h4 className="text-white font-semibold mb-2">Batch Processing</h4>
                <p className="text-sm text-slate-400">Process unlimited images/PDFs at once.</p>
            </div>

            {/* PDF */}
            <div className="card border-slate-700 hover:border-cyan-500/50 transition-colors">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">📄</span>
                </div>
                <h4 className="text-white font-semibold mb-2">PDF Support</h4>
                <p className="text-sm text-slate-400">Full multi-page PDF redaction included.</p>
            </div>

            {/* No Watermark */}
            <div className="card border-slate-700 hover:border-cyan-500/50 transition-colors">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">✨</span>
                </div>
                <h4 className="text-white font-semibold mb-2">No Watermarks</h4>
                <p className="text-sm text-slate-400">Clean, professional exports.</p>
            </div>

            {/* ZIP */}
            <div className="card border-slate-700 hover:border-cyan-500/50 transition-colors">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">⚡</span>
                </div>
                <h4 className="text-white font-semibold mb-2">ZIP Download</h4>
                <p className="text-sm text-slate-400">Download all files in one click.</p>
            </div>
        </div>
    );
}
