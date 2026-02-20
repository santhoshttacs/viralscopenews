import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms & Conditions',
    description: 'ViralScopeNews Terms and Conditions of Use.',
};

export default function TermsPage() {
    return (
        <div className="legal-page">
            <h1>Terms &amp; Conditions</h1>
            <p className="updated-date">Last updated: February 20, 2026</p>

            <p>
                Welcome to ViralScopeNews. By accessing and using our website viralscopenews.com
                (the &quot;Site&quot;), you agree to comply with and be bound by the following Terms &amp;
                Conditions. Please read them carefully before using our Site.
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
                By accessing or using the Site, you acknowledge that you have read, understood, and
                agree to be bound by these Terms. If you do not agree, please do not use the Site.
            </p>

            <h2>2. Description of Service</h2>
            <p>
                ViralScopeNews is a digital news publication that provides AI-enhanced news articles,
                summaries, analysis, and insights covering Artificial Intelligence, Technology,
                Cryptocurrency, and Middle East Business. Our content is generated through a combination
                of automated systems and editorial oversight.
            </p>

            <h2>3. Content and Intellectual Property</h2>
            <p>
                All content on this Site, including text, graphics, logos, images, and software, is the
                property of ViralScopeNews or its content suppliers and is protected by intellectual
                property laws. You may not reproduce, distribute, modify, or create derivative works
                from our content without explicit written permission.
            </p>

            <h2>4. AI-Generated Content Disclaimer</h2>
            <p>
                Our articles are created with the assistance of artificial intelligence technology and
                are reviewed by our editorial team. While we strive for accuracy, AI-enhanced content
                may occasionally contain errors or inaccuracies. We encourage readers to verify critical
                information through original source links provided in each article.
            </p>

            <h2>5. User Conduct</h2>
            <p>When using our Site, you agree not to:</p>
            <ul>
                <li>Use the Site for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Site&apos;s operations</li>
                <li>Scrape, crawl, or harvest content without permission</li>
                <li>Transmit viruses or malicious code</li>
                <li>Impersonate any person or entity</li>
            </ul>

            <h2>6. Third-Party Links</h2>
            <p>
                Our Site may contain links to third-party websites. These links are provided for
                convenience and reference only. We have no control over and assume no responsibility
                for the content, privacy policies, or practices of third-party sites.
            </p>

            <h2>7. Advertising</h2>
            <p>
                The Site displays advertisements served by Google AdSense and potentially other
                advertising partners. We are not responsible for the content or accuracy of any
                advertisements displayed. Interacting with advertisers is at your own risk.
            </p>

            <h2>8. Newsletter and Communications</h2>
            <p>
                By subscribing to our newsletter, you consent to receive periodic emails from us.
                You may unsubscribe at any time by using the unsubscribe link in any email or
                contacting us directly.
            </p>

            <h2>9. Disclaimer of Warranties</h2>
            <p>
                The Site and its content are provided &quot;as is&quot; and &quot;as available&quot; without warranties
                of any kind, either express or implied. We do not warrant that the Site will be
                uninterrupted, error-free, or free from viruses or other harmful components.
            </p>

            <h2>10. Limitation of Liability</h2>
            <p>
                To the fullest extent permitted by law, ViralScopeNews shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages arising from your
                use of the Site, including but not limited to financial decisions made based on our
                content.
            </p>

            <h2>11. Indemnification</h2>
            <p>
                You agree to indemnify and hold harmless ViralScopeNews from any claims, damages,
                losses, or expenses arising from your violation of these Terms or your use of the Site.
            </p>

            <h2>12. Changes to Terms</h2>
            <p>
                We reserve the right to update these Terms at any time. Changes will be effective
                immediately upon posting. Your continued use of the Site after any changes indicates
                acceptance of the new Terms.
            </p>

            <h2>13. Governing Law</h2>
            <p>
                These Terms shall be governed by and construed in accordance with applicable laws.
                Any disputes arising from these Terms shall be resolved through appropriate legal channels.
            </p>

            <h2>14. Contact</h2>
            <p>
                For questions about these Terms, please visit our{' '}
                <a href="/contact" style={{ color: 'var(--accent-purple)' }}>Contact Page</a>.
            </p>
        </div>
    );
}
