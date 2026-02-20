import { format, formatDistanceToNow } from 'date-fns';

export function formatDate(dateString: string): string {
    return format(new Date(dateString), 'MMMM d, yyyy');
}

export function formatRelativeDate(dateString: string): string {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
}

export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

export function getCategoryName(slug: string): string {
    const names: Record<string, string> = {
        ai: 'Artificial Intelligence',
        tech: 'Technology',
        crypto: 'Cryptocurrency',
        'middle-east': 'Middle East Business',
    };
    return names[slug] || slug;
}

export function getCategoryColor(slug: string): string {
    const colors: Record<string, string> = {
        ai: '#8B5CF6',
        tech: '#3B82F6',
        crypto: '#F59E0B',
        'middle-east': '#10B981',
    };
    return colors[slug] || '#6B7280';
}

export function estimateReadTime(wordCount: number): string {
    const minutes = Math.ceil(wordCount / 200);
    return `${minutes} min read`;
}

export function getPlaceholderImage(category: string): string {
    const images: Record<string, string> = {
        ai: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
        tech: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
        crypto: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
        'middle-east': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    };
    return images[category] || images.tech;
}
