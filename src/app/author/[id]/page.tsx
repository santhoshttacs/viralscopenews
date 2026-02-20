import { supabaseAdmin, Article } from '@/lib/supabase';
import { Metadata } from 'next';
import ArticleCard from '@/components/ArticleCard';

export const metadata: Metadata = {
    title: 'ViralScope AI Desk - Author Profile',
    description: 'Meet the ViralScopeNews AI-enhanced editorial desk delivering quality news coverage across AI, Tech, Crypto, and Middle East Business.',
};

export default async function AuthorPage() {
    const { data: articles, count } = await supabaseAdmin
        .from('articles')
        .select('*', { count: 'exact' })
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(12);

    const { data: viewsData } = await supabaseAdmin
        .from('articles')
        .select('views')
        .eq('status', 'published');

    const totalViews = viewsData?.reduce((sum, a) => sum + (a.views || 0), 0) || 0;

    return (
        <div className="page-container">
            <div className="author-header">
                <div className="author-avatar">V</div>
                <div className="author-info">
                    <h1>ViralScope AI Desk</h1>
                    <p>
                        Our AI-enhanced editorial desk delivers comprehensive news coverage across Artificial
                        Intelligence, Technology, Cryptocurrency, and Middle East Business. Every article
                        combines AI-powered synthesis with editorial oversight to provide original insights,
                        structured analysis, and actionable takeaways.
                    </p>
                    <div className="author-stats">
                        <span className="author-stat">
                            <strong>{count || 0}</strong> articles published
                        </span>
                        <span className="author-stat">
                            <strong>{totalViews.toLocaleString()}</strong> total views
                        </span>
                    </div>
                </div>
            </div>

            <div className="section-header">
                <h2 className="section-title">Published Articles</h2>
            </div>

            {(articles as Article[])?.length > 0 ? (
                <div className="articles-grid">
                    {(articles as Article[]).map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                    No articles published yet.
                </p>
            )}
        </div>
    );
}
