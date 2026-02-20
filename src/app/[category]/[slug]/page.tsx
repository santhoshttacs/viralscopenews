import { supabaseAdmin, Article } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import SchemaMarkup from '@/components/SchemaMarkup';
import AdPlaceholder from '@/components/AdPlaceholder';
import ArticleCard from '@/components/ArticleCard';
import { getCategoryColor, getCategoryName, formatDate, estimateReadTime, getPlaceholderImage } from '@/lib/utils';

interface ArticlePageProps {
    params: { category: string; slug: string };
}

async function getArticle(category: string, slug: string) {
    const { data } = await supabaseAdmin
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('category', category)
        .eq('status', 'published')
        .single();

    return data as Article | null;
}

async function getRelatedArticles(category: string, currentId: string) {
    const { data } = await supabaseAdmin
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .eq('category', category)
        .neq('id', currentId)
        .order('published_at', { ascending: false })
        .limit(3);

    return (data as Article[]) || [];
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
    const article = await getArticle(params.category, params.slug);
    if (!article) return {};

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://viralscopenews.com';

    return {
        title: article.title,
        description: article.ai_summary,
        openGraph: {
            title: article.title,
            description: article.ai_summary,
            type: 'article',
            publishedTime: article.published_at || article.created_at,
            modifiedTime: article.updated_at,
            authors: [article.author_name],
            section: getCategoryName(article.category),
            images: [article.featured_image || getPlaceholderImage(article.category)],
            url: `${siteUrl}/${article.category}/${article.slug}`,
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.ai_summary,
            images: [article.featured_image || getPlaceholderImage(article.category)],
        },
    };
}

export const revalidate = 60;

export default async function ArticlePage({ params }: ArticlePageProps) {
    const article = await getArticle(params.category, params.slug);

    if (!article) {
        notFound();
    }

    // Increment views (fire-and-forget)
    supabaseAdmin
        .from('articles')
        .update({ views: article.views + 1 })
        .eq('id', article.id)
        .then();

    const related = await getRelatedArticles(article.category, article.id);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://viralscopenews.com';

    return (
        <>
            <SchemaMarkup article={article} siteUrl={siteUrl} />

            {/* Header Ad */}
            <div className="ad-header">
                <AdPlaceholder slot="article-header" />
            </div>

            <div className="page-container">
                <div className="article-detail">
                    {/* Breadcrumb */}
                    <nav className="article-breadcrumb">
                        <Link href="/">Home</Link>
                        <span>/</span>
                        <Link href={`/${article.category}`}>{getCategoryName(article.category)}</Link>
                        <span>/</span>
                        <span style={{ color: 'var(--text-secondary)' }}>Article</span>
                    </nav>

                    {/* Category Badge */}
                    <span
                        className="article-detail-category"
                        style={{ background: getCategoryColor(article.category) }}
                    >
                        {getCategoryName(article.category)}
                    </span>

                    {/* Title */}
                    <h1 className="article-detail-title">{article.title}</h1>

                    {/* Meta */}
                    <div className="article-detail-meta">
                        <span>✍ {article.author_name}</span>
                        <span>📅 {formatDate(article.published_at || article.created_at)}</span>
                        <span>📖 {estimateReadTime(article.word_count)}</span>
                        <span>👁 {article.views} views</span>
                    </div>

                    {/* Hero Image */}
                    <img
                        src={article.featured_image || getPlaceholderImage(article.category)}
                        alt={article.title}
                        className="article-hero-image"
                    />

                    {/* AI Summary Box */}
                    <div className="ai-summary-box">
                        <div className="ai-summary-label">
                            <span>🤖</span>
                            <span>AI Summary</span>
                        </div>
                        <p className="ai-summary-text">{article.ai_summary}</p>
                    </div>

                    {/* Why It Matters */}
                    <div className="why-it-matters">
                        <h3>💡 Why This Matters</h3>
                        <p>{article.why_it_matters}</p>
                    </div>

                    {/* Key Takeaways */}
                    <div className="key-takeaways">
                        <h3>🎯 Key Takeaways</h3>
                        <ul className="takeaway-list">
                            {article.key_takeaways.map((takeaway, index) => (
                                <li key={index}>{takeaway}</li>
                            ))}
                        </ul>
                    </div>

                    {/* In-Article Ad */}
                    <div className="ad-in-article">
                        <AdPlaceholder slot="in-article" />
                    </div>

                    {/* Article Body */}
                    <div className="article-body">
                        {article.full_content.split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>

                    {/* Source Reference */}
                    {article.source_url && (
                        <div className="article-source">
                            <span>📰 Source:</span>
                            <a
                                href={article.source_url}
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                            >
                                {article.source_name || 'Original Article'}
                            </a>
                        </div>
                    )}

                    {/* Last Updated */}
                    <p style={{
                        fontSize: '12px',
                        color: 'var(--text-muted)',
                        marginBottom: '32px',
                    }}>
                        Last updated: {formatDate(article.updated_at)}
                    </p>

                    {/* Related Articles */}
                    {related.length > 0 && (
                        <div className="related-articles">
                            <div className="section-header">
                                <h2 className="section-title">Related Articles</h2>
                                <Link href={`/${article.category}`} className="section-link">
                                    View All →
                                </Link>
                            </div>
                            <div className="articles-grid">
                                {related.map((relatedArticle) => (
                                    <ArticleCard key={relatedArticle.id} article={relatedArticle} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
