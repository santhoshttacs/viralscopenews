import { MetadataRoute } from 'next';
import { supabaseAdmin } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://viralscopenews.com';

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        { url: siteUrl, lastModified: new Date(), changeFrequency: 'hourly', priority: 1.0 },
        { url: `${siteUrl}/ai`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
        { url: `${siteUrl}/tech`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
        { url: `${siteUrl}/crypto`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
        { url: `${siteUrl}/middle-east`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
        { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        { url: `${siteUrl}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
        { url: `${siteUrl}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
        { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${siteUrl}/editorial-policy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ];

    // Dynamic article pages
    const { data: articles } = await supabaseAdmin
        .from('articles')
        .select('slug, category, updated_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

    const articlePages: MetadataRoute.Sitemap = (articles || []).map((article) => ({
        url: `${siteUrl}/${article.category}/${article.slug}`,
        lastModified: new Date(article.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [...staticPages, ...articlePages];
}
