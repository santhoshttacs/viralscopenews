import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET - Get single article by ID
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const { data, error } = await supabaseAdmin
        .from('articles')
        .select('*')
        .eq('id', params.id)
        .single();

    if (error || !data) {
        return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({ article: data });
}

// PATCH - Update article (approve, reject, edit)
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const updates: any = { ...body, updated_at: new Date().toISOString() };

        // If publishing, set published_at
        if (body.status === 'published') {
            updates.published_at = new Date().toISOString();
        }

        // Recalculate word count if full_content changed
        if (body.full_content) {
            updates.word_count = body.full_content.split(/\s+/).length;
        }

        const { data, error } = await supabaseAdmin
            .from('articles')
            .update(updates)
            .eq('id', params.id)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ article: data });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}

// DELETE - Remove article
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const { error } = await supabaseAdmin
        .from('articles')
        .delete()
        .eq('id', params.id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
