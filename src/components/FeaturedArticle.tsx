import Link from 'next/link';
import { Article } from '@/lib/supabase';
import { getCategoryColor, getCategoryName, formatRelativeDate, estimateReadTime, getPlaceholderImage } from '@/lib/utils';

interface FeaturedArticleProps {
    article: Article;
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
    return (
        <Link href={`/${article.category}/${article.slug}`} className="featured-article">
            <img
                src={article.featured_image || getPlaceholderImage(article.category)}
                alt={article.title}
                className="featured-image"
            />
            <div className="featured-overlay">
                <span
                    className="featured-category"
                    style={{ background: getCategoryColor(article.category) }}
                >
                    {getCategoryName(article.category)}
                </span>
                <h2 className="featured-title">{article.title}</h2>
                <div className="featured-meta">
                    <span>✍ {article.author_name}</span>
                    <span>🕐 {formatRelativeDate(article.published_at || article.created_at)}</span>
                    <span>📖 {estimateReadTime(article.word_count)}</span>
                </div>
            </div>
        </Link>
    );
}
