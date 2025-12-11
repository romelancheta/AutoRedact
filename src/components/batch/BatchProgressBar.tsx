interface BatchProgressBarProps {
    current: number;
    total: number;
}

export function BatchProgressBar({ current, total }: BatchProgressBarProps) {
    return (
        <div className="progress-bar">
            <div
                className="progress-fill"
                style={{ width: `${(current / total) * 100}%` }}
            ></div>
        </div>
    );
}
