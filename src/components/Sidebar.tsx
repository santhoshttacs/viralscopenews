import Link from 'next/link';
import { Article } from '@/lib/supabase';
import { getCategoryColor, getCategoryName, formatRelativeDate, truncateText } from '@/lib/utils';
import AdPlaceholder from './AdPlaceholder';

interface SidebarProps {
    popularPosts?: Article[];
    categoryArticleCounts?: Record<string, number>;
}

export default function Sidebar({ popularPosts = [], categoryArticleCounts = {} }: SidebarProps) {
    const categories = [
        { slug: 'ai', name: 'Artificial Intelligence' },
        { slug: 'tech', name: 'Technology' },
        { slug: 'crypto', name: 'Cryptocurrency' },
        { slug: 'middle-east', name: 'Middle East Business' },
    ];

    return (
        <aside className="sidebar">
            {/* Ad Placeholder */}
            <div className="ad-sidebar">
                <AdPlaceholder slot="sidebar-top" />
            </div>

            {/* Popular Posts */}
            <div className="sidebar-widget">
                <h3 className="widget-title">Popular Posts</h3>
                {popularPosts.length > 0 ? (
                    popularPosts.slice(0, 5).map((post) => (
                        <Link
                            key={post.id}
                            href={`/${post.category}/${post.slug}`}
                            className="popular-post"
                        >
                            <img
                                src={post.featured_image || `https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&q=60`}
                                alt={post.title}
                                className="popular-post-image"
                                loading="lazy"
                            />
                            <div className="popular-post-info">
                                <h4>{truncateText(post.title, 60)}</h4>
                                <p>{formatRelativeDate(post.created_at)}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                        No popular posts yet. Check back soon!
                    </p>
                )}
            </div>

            {/* Newsletter Signup */}
            <div className="sidebar-widget newsletter-widget">
                <h3 className="widget-title">📬 Stay Updated</h3>
                <p className="newsletter-desc">
                    Get the latest AI-enhanced news insights delivered to your inbox.
                </p>
                <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="email"
                        placeholder="your@email.com"
                        className="newsletter-input"
                        required
                    />
                    <button type="submit" className="newsletter-btn">
                        Subscribe
                    </button>
                </form>
            </div>

            {/* Categories */}
            <div className="sidebar-widget">
                <h3 className="widget-title">Categories</h3>
                <div className="category-list">
                    {categories.map((cat) => (
                        <Link
                            key={cat.slug}
                            href={`/${cat.slug}`}
                            className="category-item"
                        >
                            <div className="category-item-left">
                                <span
                                    className="category-dot"
                                    style={{ background: getCategoryColor(cat.slug) }}
                                />
                                <span className="category-item-name">{cat.name}</span>
                            </div>
                            <span className="category-item-count">
                                {categoryArticleCounts[cat.slug] || 0}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    );
}
