import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="footer-inner">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <h3>
                            <span>ViralScope</span>News
                        </h3>
                        <p>
                            Your intelligent source for AI-enhanced news coverage. We leverage
                            artificial intelligence to deliver insightful analysis across technology,
                            cryptocurrency, and global business trends.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-link" aria-label="Twitter">𝕏</a>
                            <a href="#" className="social-link" aria-label="LinkedIn">in</a>
                            <a href="#" className="social-link" aria-label="RSS">⊞</a>
                        </div>
                    </div>

                    <div>
                        <h4 className="footer-heading">Categories</h4>
                        <ul className="footer-links">
                            <li><Link href="/ai">Artificial Intelligence</Link></li>
                            <li><Link href="/tech">Technology</Link></li>
                            <li><Link href="/crypto">Cryptocurrency</Link></li>
                            <li><Link href="/middle-east">Middle East Business</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="footer-heading">Company</h4>
                        <ul className="footer-links">
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/editorial-policy">Editorial Policy</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                            <li><Link href="/author/viralscopenews">Our Team</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="footer-heading">Legal</h4>
                        <ul className="footer-links">
                            <li><Link href="/privacy">Privacy Policy</Link></li>
                            <li><Link href="/terms">Terms & Conditions</Link></li>
                            <li><Link href="/editorial-policy">Editorial Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© {currentYear} ViralScopeNews. All rights reserved.</p>
                    <p>AI-Enhanced News Coverage</p>
                </div>
            </div>
        </footer>
    );
}
