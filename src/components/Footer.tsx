export function Footer() {
    return (
        <footer className="border-t border-slate-800 mt-auto py-6">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                <div className="text-center md:text-left">
                    <p className="font-medium text-slate-400">AutoRedact</p>
                    <p className="text-xs text-slate-500">No manual work needed. Built with 🛡️.</p>
                </div>
                <div className="text-center md:text-right max-w-md">
                    <p className="text-[10px] text-slate-600 leading-tight">
                        <strong>Disclaimer:</strong> Automated detection may be imperfect—verify results. Provided "as-is" without warranty or liability. 100% Local Processing.
                    </p>
                </div>
            </div>
        </footer>
    );
}
