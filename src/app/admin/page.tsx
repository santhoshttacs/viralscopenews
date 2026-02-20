'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Article {
    id: string;
    title: string;
    slug: string;
    category: string;
    status: string;
    views: number;
    word_count: number;
    created_at: string;
    published_at: string | null;
}

interface Stats {
    total: number;
    published: number;
    drafts: number;
    totalViews: number;
}

export default function AdminDashboard() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [stats, setStats] = useState<Stats>({ total: 0, published: 0, drafts: 0, totalViews: 0 });
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [editingArticle, setEditingArticle] = useState<Article | null>(null);
    const [editData, setEditData] = useState({ ai_summary: '', why_it_matters: '', full_content: '' });
    const router = useRouter();

    useEffect(() => {
        checkAuth();
        fetchArticles();
    }, [filter, statusFilter]);

    const checkAuth = async () => {
        const res = await fetch('/api/admin/auth');
        if (!res.ok) {
            router.push('/admin/login');
        }
    };

    const fetchArticles = async () => {
        setLoading(true);
        let url = '/api/articles?limit=50';
        if (filter) url += `&category=${filter}`;
        if (statusFilter) url += `&status=${statusFilter}`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.articles) {
            setArticles(data.articles);

            const published = data.articles.filter((a: Article) => a.status === 'published').length;
            const drafts = data.articles.filter((a: Article) => a.status === 'draft').length;
            const totalViews = data.articles.reduce((sum: number, a: Article) => sum + (a.views || 0), 0);

            setStats({
                total: data.total || data.articles.length,
                published,
                drafts,
                totalViews,
            });
        }
        setLoading(false);
    };

    const updateArticleStatus = async (id: string, status: string) => {
        await fetch(`/api/articles/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });
        fetchArticles();
    };

    const deleteArticle = async (id: string) => {
        if (!confirm('Are you sure you want to delete this article?')) return;
        await fetch(`/api/articles/${id}`, { method: 'DELETE' });
        fetchArticles();
    };

    const openEditModal = async (article: Article) => {
        const res = await fetch(`/api/articles/${article.id}`);
        const data = await res.json();
        if (data.article) {
            setEditingArticle(data.article);
            setEditData({
                ai_summary: data.article.ai_summary,
                why_it_matters: data.article.why_it_matters,
                full_content: data.article.full_content,
            });
        }
    };

    const saveEdit = async () => {
        if (!editingArticle) return;
        await fetch(`/api/articles/${editingArticle.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editData),
        });
        setEditingArticle(null);
        fetchArticles();
    };

    const triggerFetch = async () => {
        const cronSecret = prompt('Enter your CRON_SECRET:');
        if (!cronSecret) return;

        const res = await fetch('/api/fetch-news', {
            method: 'POST',
            headers: { Authorization: `Bearer ${cronSecret}` },
        });
        const data = await res.json();
        alert(`Fetched ${data.processed || 0} articles. Skipped ${data.skipped || 0}.${data.errors ? '\nErrors: ' + data.errors.join(', ') : ''}`);
        fetchArticles();
    };

    const handleLogout = () => {
        document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
        localStorage.removeItem('admin_token');
        router.push('/admin/login');
    };

    const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
    });

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <nav className="admin-sidebar">
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div style={{
                        width: '32px', height: '32px', background: 'var(--gradient-primary)',
                        borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '14px', fontWeight: 900, color: 'white',
                    }}>V</div>
                    <span style={{ fontWeight: 700, fontSize: '15px' }}>ViralScopeNews</span>
                </Link>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Admin Panel
                </p>

                <ul className="admin-nav-list">
                    <li className="admin-nav-item">
                        <a href="/admin" className="active">📊 Dashboard</a>
                    </li>
                    <li className="admin-nav-item">
                        <a href="/" target="_blank">🌐 View Site</a>
                    </li>
                    <li className="admin-nav-item">
                        <a href="#" onClick={(e) => { e.preventDefault(); triggerFetch(); }}>🔄 Fetch News</a>
                    </li>
                    <li className="admin-nav-item">
                        <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>🚪 Logout</a>
                    </li>
                </ul>
            </nav>

            {/* Main Content */}
            <div className="admin-main">
                <div className="admin-header">
                    <h1>Dashboard</h1>
                    <button className="submit-btn" onClick={triggerFetch}>
                        🔄 Fetch New Articles
                    </button>
                </div>

                {/* Stats */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>Total Articles</h3>
                        <div className="stat-value">{stats.total}</div>
                    </div>
                    <div className="stat-card">
                        <h3>Published</h3>
                        <div className="stat-value">{stats.published}</div>
                        <div className="stat-change positive">Live articles</div>
                    </div>
                    <div className="stat-card">
                        <h3>Pending Review</h3>
                        <div className="stat-value">{stats.drafts}</div>
                        <div className="stat-change" style={{ color: 'var(--accent-amber)' }}>Drafts</div>
                    </div>
                    <div className="stat-card">
                        <h3>Total Views</h3>
                        <div className="stat-value">{stats.totalViews.toLocaleString()}</div>
                    </div>
                </div>

                {/* Filters */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        style={{
                            padding: '8px 12px', borderRadius: '6px', background: 'var(--bg-card)',
                            border: '1px solid var(--border-subtle)', color: 'var(--text-primary)',
                            fontSize: '13px', fontFamily: 'var(--font-sans)',
                        }}
                    >
                        <option value="">All Categories</option>
                        <option value="ai">AI</option>
                        <option value="tech">Tech</option>
                        <option value="crypto">Crypto</option>
                        <option value="middle-east">Middle East</option>
                    </select>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={{
                            padding: '8px 12px', borderRadius: '6px', background: 'var(--bg-card)',
                            border: '1px solid var(--border-subtle)', color: 'var(--text-primary)',
                            fontSize: '13px', fontFamily: 'var(--font-sans)',
                        }}
                    >
                        <option value="">All Status</option>
                        <option value="draft">Drafts</option>
                        <option value="published">Published</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                {/* Articles Table */}
                <div className="admin-table-wrapper">
                    <div className="admin-table-header">
                        <h2>Articles ({articles.length})</h2>
                    </div>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Views</th>
                                <th>Words</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={7} style={{ textAlign: 'center', padding: '40px' }}>
                                        Loading...
                                    </td>
                                </tr>
                            ) : articles.length === 0 ? (
                                <tr>
                                    <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                                        No articles found. Click &quot;Fetch New Articles&quot; to get started.
                                    </td>
                                </tr>
                            ) : (
                                articles.map((article) => (
                                    <tr key={article.id}>
                                        <td style={{ maxWidth: '300px' }}>
                                            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                                                {article.title.substring(0, 60)}{article.title.length > 60 ? '...' : ''}
                                            </span>
                                        </td>
                                        <td>
                                            <span style={{
                                                textTransform: 'uppercase', fontSize: '11px',
                                                fontWeight: 600, letterSpacing: '0.5px',
                                            }}>
                                                {article.category}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${article.status}`}>
                                                {article.status}
                                            </span>
                                        </td>
                                        <td>{article.views}</td>
                                        <td>{article.word_count}</td>
                                        <td>{formatDate(article.created_at)}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                                {article.status !== 'published' && (
                                                    <button
                                                        className="action-btn approve"
                                                        onClick={() => updateArticleStatus(article.id, 'published')}
                                                    >
                                                        ✓ Publish
                                                    </button>
                                                )}
                                                {article.status !== 'rejected' && (
                                                    <button
                                                        className="action-btn reject"
                                                        onClick={() => updateArticleStatus(article.id, 'rejected')}
                                                    >
                                                        ✗ Reject
                                                    </button>
                                                )}
                                                <button
                                                    className="action-btn edit"
                                                    onClick={() => openEditModal(article)}
                                                >
                                                    ✎ Edit
                                                </button>
                                                <button
                                                    className="action-btn reject"
                                                    onClick={() => deleteArticle(article.id)}
                                                >
                                                    🗑
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            {editingArticle && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.7)', zIndex: 9999,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '20px',
                }}>
                    <div style={{
                        background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border-subtle)', padding: '32px',
                        maxWidth: '700px', width: '100%', maxHeight: '90vh', overflowY: 'auto',
                    }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>
                            Edit Article
                        </h2>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                            {editingArticle.title}
                        </p>

                        <div className="form-group" style={{ marginBottom: '16px' }}>
                            <label>AI Summary</label>
                            <textarea
                                className="form-textarea"
                                value={editData.ai_summary}
                                onChange={(e) => setEditData({ ...editData, ai_summary: e.target.value })}
                                style={{ minHeight: '80px' }}
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: '16px' }}>
                            <label>Why It Matters</label>
                            <textarea
                                className="form-textarea"
                                value={editData.why_it_matters}
                                onChange={(e) => setEditData({ ...editData, why_it_matters: e.target.value })}
                                style={{ minHeight: '80px' }}
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label>Full Content</label>
                            <textarea
                                className="form-textarea"
                                value={editData.full_content}
                                onChange={(e) => setEditData({ ...editData, full_content: e.target.value })}
                                style={{ minHeight: '200px' }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <button
                                className="action-btn"
                                style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', padding: '10px 20px' }}
                                onClick={() => setEditingArticle(null)}
                            >
                                Cancel
                            </button>
                            <button className="submit-btn" onClick={saveEdit}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
