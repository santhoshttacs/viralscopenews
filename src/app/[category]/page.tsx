import { supabaseAdmin, Article, CATEGORIES } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import { getCategoryName, getCategoryColor } from '@/lib/utils';

const validCategories = ['ai', 'tech', 'crypto', 'middle-east'];

interface CategoryPageProps {
    params: { category: string };
    searchParams: { page?: string };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const cat = CATEGORIES.find((c) => c.slug === params.category);
    if (!cat) return {};

    return {
        title: `${cat.name} News`,
        description: cat.description,
        openGraph: {
            title: `${cat.name} News | ViralScopeNews`,
            description: cat.description,
        },
    };
}

export function generateStaticParams() {
    return validCategories.map((category) => ({ category }));
}

const ARTICLES_PER_PAGE = 12;

export const revalidate = 60;

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    if (!validCategories.includes(params.category)) {
        notFound();
    }

    const page = parseInt(searchParams.page || '1', 10);
    const offset = (page - 1) * ARTICLES_PER_PAGE;

    const { data: articles, count } = await supabaseAdmin
        .from('articles')
        .select('*', { count: 'exact' })
        .eq('status', 'published')
        .eq('category', params.category)
        .order('published_at', { ascending: false })
        .range(offset, offset + ARTICLES_PER_PAGE - 1);

    const totalPages = Math.ceil((count || 0) / ARTICLES_PER_PAGE);

    // Popular posts for sidebar
    const { data: popular } = await supabaseAdmin
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('views', { ascending: false })
        .limit(5);

    const categoryInfo = CATEGORIES.find((c) => c.slug === params.category);

    return (
        <div className="page-container">
            <div className="content-layout">
                <div className="main-content">
                    <div className="category-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <span
                                style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    background: getCategoryColor(params.category),
                                    display: 'inline-block',
                                }}
                            />
                            <h1>{categoryInfo?.name || getCategoryName(params.category)}</h1>
                        </div>
                        <p>{categoryInfo?.description}</p>
                    </div>

                    {(articles as Article[])?.length > 0 ? (
                        <>
                            <div className="articles-grid">
                                {(articles as Article[]).map((article) => (
                                    <ArticleCard key={article.id} article={article} />
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div className="pagination">
                                    {page > 1 && (
                                        <a
                                            href={`/${params.category}?page=${page - 1}`}
                                            className="page-btn"
                                        >
                                            ← Previous
                                        </a>
                                    )}
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                        <a
                                            key={p}
                                            href={`/${params.category}?page=${p}`}
                                            className={`page-btn ${p === page ? 'active' : ''}`}
                                        >
                                            {p}
                                        </a>
                                    ))}
                                    {page < totalPages && (
                                        <a
                                            href={`/${params.category}?page=${page + 1}`}
                                            className="page-btn"
                                        >
                                            Next →
                                        </a>
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        <div style={{
                            padding: '60px 20px',
                            textAlign: 'center',
                            background: 'var(--bg-card)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-subtle)',
                        }}>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                                No articles published in this category yet.
                            </p>
                        </div>
                    )}
                </div>

                <Sidebar popularPosts={(popular as Article[]) || []} />
            </div>
        </div>
    );
}
