import type { BatchItem } from '../../types';
import { BatchItemCard } from './BatchItemCard';

interface BatchGridProps {
    items: BatchItem[];
    onPreview: (url: string) => void;
}

export function BatchGrid({ items, onPreview }: BatchGridProps) {
    return (
        <div className={`max-w-4xl mx-auto grid gap-4 ${items.length <= 4
            ? 'grid-cols-1 md:grid-cols-2'
            : 'grid-cols-2 md:grid-cols-3'
            }`}>
            {items.map((item) => (
                <BatchItemCard key={item.id} item={item} onPreview={onPreview} />
            ))}
        </div>
    );
}
