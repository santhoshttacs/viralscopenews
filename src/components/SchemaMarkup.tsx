import { Article } from '@/lib/supabase';

interface SchemaMarkupProps {
    article: Article;
    siteUrl: string;
}

export default function SchemaMarkup({ article, siteUrl }: SchemaMarkupProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: article.title,
        description: article.ai_summary,
        image: article.featured_image || `${siteUrl}/images/default-og.jpg`,
        datePublished: article.published_at || article.created_at,
        dateModified: article.updated_at,
        author: {
            '@type': 'Person',
            name: article.author_name,
            url: `${siteUrl}/author/viralscopenews`,
        },
        publisher: {
            '@type': 'Organization',
            name: 'ViralScopeNews',
            logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/images/logo.png`,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${siteUrl}/${article.category}/${article.slug}`,
        },
        articleSection: article.category,
        wordCount: article.word_count,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
