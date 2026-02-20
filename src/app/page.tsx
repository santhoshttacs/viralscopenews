import { supabaseAdmin, Article } from '@/lib/supabase';
import Sidebar from '@/components/Sidebar';
import FeaturedArticle from '@/components/FeaturedArticle';
import ArticleCard from '@/components/ArticleCard';
import TrendingSection from '@/components/TrendingSection';
import AdPlaceholder from '@/components/AdPlaceholder';

async function getHomepageData() {
    // Featured article (most views)
    const { data: featured } = await supabaseAdmin
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('views', { ascending: false })
        .limit(1);

    // Latest articles
    const { data: latest } = await supabaseAdmin
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(6);

    // Trending by category
    const trending: Record<string, Article[]> = {};
    for (const cat of ['ai', 'tech', 'crypto', 'middle-east']) {
        const { data } = await supabaseAdmin
            .from('articles')
            .select('*')
            .eq('status', 'published')
            .eq('category', cat)
            .order('views', { ascending: false })
            .limit(5);
        trending[cat] = (data as Article[]) || [];
    }

    // Popular posts for sidebar
    const { data: popular } = await supabaseAdmin
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('views', { ascending: false })
        .limit(5);

    // Category counts
    const counts: Record<string, number> = {};
    for (const cat of ['ai', 'tech', 'crypto', 'middle-east']) {
        const { count } = await supabaseAdmin
            .from('articles')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'published')
            .eq('category', cat);
        counts[cat] = count || 0;
    }

    return {
        featured: (featured as Article[])?.[0] || null,
        latest: (latest as Article[]) || [],
        trending,
        popular: (popular as Article[]) || [],
        counts,
    };
}

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function HomePage() {
    const { featured, latest, trending, popular, counts } = await getHomepageData();

    return (
        <>
            {/* Header Ad */}
            <div className="ad-header">
                <AdPlaceholder slot="header-leaderboard" />
            </div>

            <div className="page-container">
                <div className="content-layout">
                    <div className="main-content">
                        {/* Featured Article */}
                        {featured && (
                            <section>
                                <div className="section-header">
                                    <h2 className="section-title">Featured Story</h2>
                                </div>
                                <FeaturedArticle article={featured} />
                            </section>
                        )}

                        {/* Latest Articles */}
                        <section>
                            <div className="section-header">
                                <h2 className="section-title">Latest News</h2>
                            </div>
                            {latest.length > 0 ? (
                                <div className="articles-grid">
                                    {latest.map((article) => (
                                        <ArticleCard key={article.id} article={article} />
                                    ))}
                                </div>
                            ) : (
                                <div style={{
                                    padding: '60px 20px',
                                    textAlign: 'center',
                                    background: 'var(--bg-card)',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border-subtle)',
                                }}>
                                    <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Welcome to ViralScopeNews</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                                        Articles will appear here once the content pipeline is active.
                                        <br />
                                        Configure your API keys and trigger the first fetch to get started.
                                    </p>
                                </div>
                            )}
                        </section>

                        {/* Trending Section */}
                        <TrendingSection articles={trending} />
                    </div>

                    {/* Sidebar */}
                    <Sidebar popularPosts={popular} categoryArticleCounts={counts} />
                </div>
            </div>
        </>
    );
}
