import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET - List articles with pagination and filters
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const offset = (page - 1) * limit;

    let query = supabaseAdmin
        .from('articles')
        .select('*', { count: 'exact' });

    if (category) query = query.eq('category', category);
    if (status) query = query.eq('status', status);
    if (search) query = query.ilike('title', `%${search}%`);

    const { data, count, error } = await query
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
        articles: data,
        total: count,
        page,
        totalPages: Math.ceil((count || 0) / limit),
    });
}

// POST - Create a new article manually
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, slug, category, featured_image, ai_summary, why_it_matters, key_takeaways, full_content, source_url, source_name, status } = body;

        if (!title || !slug || !category || !ai_summary || !why_it_matters || !full_content) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const wordCount = full_content.split(/\s+/).length;

        const { data, error } = await supabaseAdmin
            .from('articles')
            .insert({
                title,
                slug,
                category,
                featured_image: featured_image || null,
                ai_summary,
                why_it_matters,
                key_takeaways: key_takeaways || [],
                full_content,
                source_url: source_url || null,
                source_name: source_name || null,
                word_count: wordCount,
                status: status || 'draft',
                author_name: 'ViralScope AI Desk',
                published_at: status === 'published' ? new Date().toISOString() : null,
            })
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ article: data }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
