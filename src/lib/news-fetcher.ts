import Parser from 'rss-parser';
import { supabaseAdmin } from './supabase';

const parser = new Parser();

interface RawArticle {
    title: string;
    content: string;
    sourceUrl: string;
    sourceName: string;
    category: string;
    imageUrl?: string;
}

const RSS_FEEDS: Record<string, string[]> = {
    ai: [
        'https://news.google.com/rss/search?q=artificial+intelligence&hl=en-US&gl=US&ceid=US:en',
        'https://feeds.feedburner.com/venturebeat/SZYF',
    ],
    tech: [
        'https://news.google.com/rss/search?q=technology+news&hl=en-US&gl=US&ceid=US:en',
        'https://feeds.arstechnica.com/arstechnica/index',
    ],
    crypto: [
        'https://news.google.com/rss/search?q=cryptocurrency+blockchain&hl=en-US&gl=US&ceid=US:en',
        'https://cointelegraph.com/rss',
    ],
    'middle-east': [
        'https://news.google.com/rss/search?q=middle+east+business&hl=en-US&gl=US&ceid=US:en',
    ],
};

export async function fetchFromNewsAPI(category: string): Promise<RawArticle[]> {
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) return [];

    const queries: Record<string, string> = {
        ai: 'artificial intelligence OR machine learning OR AI',
        tech: 'technology OR software OR startup',
        crypto: 'cryptocurrency OR blockchain OR bitcoin OR ethereum',
        'middle-east': 'Middle East business OR Gulf economy OR Saudi Arabia OR UAE',
    };

    const query = queries[category] || category;

    try {
        const res = await fetch(
            `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=5&apiKey=${apiKey}`,
            { next: { revalidate: 0 } }
        );
        const data = await res.json();

        if (!data.articles) return [];

        return data.articles
            .filter((a: any) => a.title && a.description && a.title !== '[Removed]')
            .map((a: any) => ({
                title: a.title,
                content: `${a.description || ''} ${a.content || ''}`.substring(0, 2000),
                sourceUrl: a.url,
                sourceName: a.source?.name || 'Unknown',
                category,
                imageUrl: a.urlToImage || undefined,
            }));
    } catch (error) {
        console.error(`NewsAPI fetch error for ${category}:`, error);
        return [];
    }
}

export async function fetchFromRSS(category: string): Promise<RawArticle[]> {
    const feeds = RSS_FEEDS[category] || [];
    const articles: RawArticle[] = [];

    for (const feedUrl of feeds) {
        try {
            const feed = await parser.parseURL(feedUrl);
            const items = feed.items.slice(0, 3);

            for (const item of items) {
                if (item.title && (item.contentSnippet || item.content)) {
                    articles.push({
                        title: item.title,
                        content: (item.contentSnippet || item.content || '').substring(0, 2000),
                        sourceUrl: item.link || '',
                        sourceName: feed.title || 'RSS Feed',
                        category,
                        imageUrl: item.enclosure?.url || undefined,
                    });
                }
            }
        } catch (error) {
            console.error(`RSS fetch error for ${feedUrl}:`, error);
        }
    }

    return articles;
}

export async function isDuplicate(sourceUrl: string, title: string): Promise<boolean> {
    // Check by source URL
    const { data: urlMatch } = await supabaseAdmin
        .from('articles')
        .select('id')
        .eq('source_url', sourceUrl)
        .limit(1);

    if (urlMatch && urlMatch.length > 0) return true;

    // Check by similar title (basic approach)
    const simplifiedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 50);
    const { data: allArticles } = await supabaseAdmin
        .from('articles')
        .select('title')
        .order('created_at', { ascending: false })
        .limit(100);

    if (allArticles) {
        for (const article of allArticles) {
            const existingSimplified = article.title.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 50);
            if (similarity(simplifiedTitle, existingSimplified) > 0.7) return true;
        }
    }

    return false;
}

function similarity(a: string, b: string): number {
    if (a === b) return 1;
    if (a.length === 0 || b.length === 0) return 0;

    const pairs1 = getPairs(a);
    const pairs2 = getPairs(b);
    const union = pairs1.length + pairs2.length;
    let intersection = 0;

    for (const p1 of pairs1) {
        const idx = pairs2.indexOf(p1);
        if (idx >= 0) {
            intersection++;
            pairs2.splice(idx, 1);
        }
    }

    return (2 * intersection) / union;
}

function getPairs(str: string): string[] {
    const pairs: string[] = [];
    for (let i = 0; i < str.length - 1; i++) {
        pairs.push(str.substring(i, i + 2));
    }
    return pairs;
}

export async function fetchAllCategories(): Promise<RawArticle[]> {
    const categories = ['ai', 'tech', 'crypto', 'middle-east'];
    const allArticles: RawArticle[] = [];

    for (const cat of categories) {
        const newsApiArticles = await fetchFromNewsAPI(cat);
        const rssArticles = await fetchFromRSS(cat);
        allArticles.push(...newsApiArticles, ...rssArticles);
    }

    return allArticles;
}
