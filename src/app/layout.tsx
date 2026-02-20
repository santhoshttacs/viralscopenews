import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: {
        default: 'ViralScopeNews - AI-Powered Tech, Crypto & Business News',
        template: '%s | ViralScopeNews',
    },
    description: 'Your intelligent source for AI, Technology, Cryptocurrency, and Middle East Business news. AI-enhanced insights, summaries, and analysis.',
    keywords: ['AI news', 'technology news', 'cryptocurrency', 'blockchain', 'middle east business', 'artificial intelligence', 'tech trends'],
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://viralscopenews.com'),
    openGraph: {
        type: 'website',
        locale: 'en_US',
        siteName: 'ViralScopeNews',
        title: 'ViralScopeNews - AI-Powered Tech, Crypto & Business News',
        description: 'Your intelligent source for AI, Technology, Cryptocurrency, and Middle East Business news.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ViralScopeNews',
        description: 'AI-Powered Tech, Crypto & Business News',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                {process.env.NEXT_PUBLIC_ADSENSE_ID && (
                    <script
                        async
                        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
                        crossOrigin="anonymous"
                    />
                )}
            </head>
            <body>
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
