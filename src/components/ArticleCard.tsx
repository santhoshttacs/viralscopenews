import Link from 'next/link';
import { Article } from '@/lib/supabase';
import { getCategoryColor, getCategoryName, formatRelativeDate, truncateText, estimateReadTime, getPlaceholderImage } from '@/lib/utils';

interface ArticleCardProps {
    article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
    return (
        <Link href={`/${article.category}/${article.slug}`} className="article-card">
            <div className="card-image-wrapper">
                <img
                    src={article.featured_image || getPlaceholderImage(article.category)}
                    alt={article.title}
                    className="card-image"
                    loading="lazy"
                />
                <span
                    className="card-category"
                    style={{ background: getCategoryColor(article.category) }}
                >
                    {getCategoryName(article.category)}
                </span>
            </div>
            <div className="card-body">
                <h3 className="card-title">{article.title}</h3>
                <p className="card-summary">{truncateText(article.ai_summary, 120)}</p>
                <div className="card-meta">
                    <div className="card-meta-left">
                        <span>{formatRelativeDate(article.published_at || article.created_at)}</span>
                        <span>·</span>
                        <span>{estimateReadTime(article.word_count)}</span>
                    </div>
                    <span>{article.views} views</span>
                </div>
            </div>
        </Link>
    );
}
