import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-me';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Check if admin exists in DB
        const { data: admin } = await supabaseAdmin
            .from('admin_users')
            .select('*')
            .eq('email', email)
            .single();

        if (admin) {
            // Verify against DB password
            const valid = await bcrypt.compare(password, admin.password_hash);
            if (!valid) {
                return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
            }
        } else {
            // Fall back to env credentials (for initial setup)
            const envEmail = process.env.ADMIN_EMAIL;
            const envPassword = process.env.ADMIN_PASSWORD;

            if (email !== envEmail || password !== envPassword) {
                return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
            }

            // Auto-create admin in DB for next time
            const hash = await bcrypt.hash(password, 12);
            await supabaseAdmin.from('admin_users').insert({
                email,
                password_hash: hash,
            });
        }

        // Generate JWT
        const token = jwt.sign(
            { email, role: 'admin' },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        const response = NextResponse.json({ success: true, token });

        // Set HTTP-only cookie
        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 86400, // 24 hours
            path: '/',
        });

        return response;
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}

// Verify token endpoint
export async function GET(request: NextRequest) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return NextResponse.json({ authenticated: true, user: decoded });
    } catch {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
}
