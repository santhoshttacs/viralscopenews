'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/ai', label: 'AI' },
    { href: '/tech', label: 'Tech' },
    { href: '/crypto', label: 'Crypto' },
    { href: '/middle-east', label: 'Middle East' },
];

export default function Header() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <header className="site-header">
                <div className="header-inner">
                    <Link href="/" className="site-logo">
                        <div className="logo-icon">V</div>
                        <div className="logo-text">
                            <span>ViralScope</span>News
                        </div>
                    </Link>

                    <nav className="main-nav">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="header-actions">
                        <button className="search-btn" aria-label="Search">
                            🔍
                        </button>
                        <button
                            className="mobile-menu-btn"
                            aria-label="Menu"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            ☰
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <div
                className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
            />
            <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
                <button
                    className="mobile-menu-close"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    ✕
                </button>
                <ul className="mobile-nav-links">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}
