import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { fetchFromNewsAPI, fetchFromRSS, isDuplicate } from '@/lib/news-fetcher';
import { rewriteArticle, generateSlug } from '@/lib/openai';

export const maxDuration = 300; // 5 minute timeout for Vercel

export async function POST(request: NextRequest) {
    try {
        // Verify cron secret
        const authHeader = request.headers.get('authorization');
        const cronSecret = process.env.CRON_SECRET;

        if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const categories = ['ai', 'tech', 'crypto', 'middle-east'];
        let totalProcessed = 0;
        let totalSkipped = 0;
        const errors: string[] = [];

        for (const category of categories) {
            try {
                // Fetch from both sources
                const newsApiArticles = await fetchFromNewsAPI(category);
                const rssArticles = await fetchFromRSS(category);
                const allRaw = [...newsApiArticles, ...rssArticles];

                for (const raw of allRaw.slice(0, 3)) {
                    try {
                        // Check for duplicates
                        const duplicate = await isDuplicate(raw.sourceUrl, raw.title);
                        if (duplicate) {
                            totalSkipped++;
                            continue;
                        }

                        // Rewrite with AI
                        const rewritten = await rewriteArticle(raw.title, raw.content, category);

                        // Skip if under minimum word count
                        if (rewritten.wordCount < 250) {
                            totalSkipped++;
                            continue;
                        }

                        // Generate unique slug
                        let slug = generateSlug(rewritten.title);
                        const { data: existing } = await supabaseAdmin
                            .from('articles')
                            .select('slug')
                            .eq('slug', slug)
                            .limit(1);

                        if (existing && existing.length > 0) {
                            slug = `${slug}-${Date.now().toString(36)}`;
                        }

                        // Insert article
                        const { error } = await supabaseAdmin.from('articles').insert({
                            title: rewritten.title,
                            slug,
                            category,
                            featured_image: raw.imageUrl || null,
                            ai_summary: rewritten.aiSummary,
                            why_it_matters: rewritten.whyItMatters,
                            key_takeaways: rewritten.keyTakeaways,
                            full_content: rewritten.fullContent,
                            source_url: raw.sourceUrl,
                            source_name: raw.sourceName,
                            word_count: rewritten.wordCount,
                            status: 'draft', // Requires admin approval
                            author_name: 'ViralScope AI Desk',
                        });

                        if (error) {
                            errors.push(`DB insert error for "${raw.title}": ${error.message}`);
                        } else {
                            totalProcessed++;
                        }
                    } catch (articleError: any) {
                        errors.push(`Article error: ${articleError.message}`);
                    }
                }
            } catch (catError: any) {
                errors.push(`Category ${category} error: ${catError.message}`);
            }
        }

        return NextResponse.json({
            success: true,
            processed: totalProcessed,
            skipped: totalSkipped,
            errors: errors.length > 0 ? errors : undefined,
            timestamp: new Date().toISOString(),
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}

// GET endpoint for easy browser testing
export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json(
            { message: 'Fetch news endpoint. Use POST with Bearer token to trigger.' },
            { status: 200 }
        );
    }

    // If authenticated, redirect to POST logic
    const url = new URL(request.url);
    const postRequest = new NextRequest(url, {
        method: 'POST',
        headers: request.headers,
    });

    return POST(postRequest);
}
