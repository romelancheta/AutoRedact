interface DetectionStatsProps {
    stats: {
        emails: number;
        ips: number;
        creditCards: number;
        secrets: number;
        pii: number;
    };
}

export function DetectionStats({ stats }: DetectionStatsProps) {
    const total = Object.values(stats).reduce((a, b) => a + b, 0);

    return (
        <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="card py-3 px-5">
                <span className="text-2xl font-bold text-cyan-400">
                    {total}
                </span>
                <span className="text-slate-400 ml-2">Items Redacted</span>
            </div>
            {stats.emails > 0 && (
                <div className="card py-3 px-5">
                    <span className="text-lg font-medium text-white">{stats.emails}</span>
                    <span className="text-slate-400 ml-2">Emails</span>
                </div>
            )}
            {stats.ips > 0 && (
                <div className="card py-3 px-5">
                    <span className="text-lg font-medium text-white">{stats.ips}</span>
                    <span className="text-slate-400 ml-2">IP Addresses</span>
                </div>
            )}
            {stats.creditCards > 0 && (
                <div className="card py-3 px-5">
                    <span className="text-lg font-medium text-white">{stats.creditCards}</span>
                    <span className="text-slate-400 ml-2">Credit Cards</span>
                </div>
            )}
            {stats.secrets > 0 && (
                <div className="card py-3 px-5">
                    <span className="text-lg font-medium text-white">{stats.secrets}</span>
                    <span className="text-slate-400 ml-2">Secrets</span>
                </div>
            )}
            {stats.pii > 0 && (
                <div className="card py-3 px-5">
                    <span className="text-lg font-medium text-white">{stats.pii}</span>
                    <span className="text-slate-400 ml-2">PII & ID</span>
                </div>
            )}
        </div>
    );
}
