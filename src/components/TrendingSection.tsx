'use client';

import Link from 'next/link';
import { Article } from '@/lib/supabase';
import { getCategoryColor, getCategoryName, formatRelativeDate } from '@/lib/utils';
import { useState } from 'react';

interface TrendingSectionProps {
    articles: Record<string, Article[]>;
}

export default function TrendingSection({ articles }: TrendingSectionProps) {
    const categories = ['ai', 'tech', 'crypto', 'middle-east'];
    const [activeTab, setActiveTab] = useState('ai');

    const currentArticles = articles[activeTab] || [];

    return (
        <section>
            <div className="section-header">
                <h2 className="section-title">Trending Now</h2>
            </div>

            <div className="trending-tabs">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`trending-tab ${activeTab === cat ? 'active' : ''}`}
                        onClick={() => setActiveTab(cat)}
                    >
                        {getCategoryName(cat)}
                    </button>
                ))}
            </div>

            <div className="trending-list">
                {currentArticles.length > 0 ? (
                    currentArticles.slice(0, 5).map((article, index) => (
                        <Link
                            key={article.id}
                            href={`/${article.category}/${article.slug}`}
                            className="trending-item"
                        >
                            <span className="trending-number">{String(index + 1).padStart(2, '0')}</span>
                            <div className="trending-info">
                                <h4>{article.title}</h4>
                                <p>
                                    <span
                                        style={{
                                            color: getCategoryColor(article.category),
                                            fontWeight: 600,
                                        }}
                                    >
                                        {getCategoryName(article.category)}
                                    </span>
                                    {' · '}
                                    {formatRelativeDate(article.published_at || article.created_at)}
                                </p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p style={{ padding: '20px', color: 'var(--text-muted)', fontSize: '14px' }}>
                        No trending articles yet. Content will appear once articles are published.
                    </p>
                )}
            </div>
        </section>
    );
}
