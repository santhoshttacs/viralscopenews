import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'ViralScopeNews Privacy Policy. Learn how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
    return (
        <div className="legal-page">
            <h1>Privacy Policy</h1>
            <p className="updated-date">Last updated: February 20, 2026</p>

            <p>
                ViralScopeNews (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                when you visit our website viralscopenews.com (the &quot;Site&quot;).
            </p>

            <h2>1. Information We Collect</h2>

            <h3>Information You Provide</h3>
            <p>We may collect information you voluntarily provide, including:</p>
            <ul>
                <li>Name and email address when you subscribe to our newsletter</li>
                <li>Contact information submitted through our contact form</li>
                <li>Any other information you choose to provide</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>When you visit our Site, we may automatically collect:</p>
            <ul>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>IP address (anonymized)</li>
                <li>Pages visited and time spent</li>
                <li>Referring website</li>
                <li>Device information</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul>
                <li>Deliver and maintain our news content</li>
                <li>Send newsletter updates (with your consent)</li>
                <li>Respond to your inquiries</li>
                <li>Analyze website usage to improve our service</li>
                <li>Display relevant advertisements through Google AdSense</li>
                <li>Comply with legal obligations</li>
            </ul>

            <h2>3. Advertising</h2>
            <p>
                We use Google AdSense to display advertisements on our Site. Google AdSense may use
                cookies and web beacons to collect information about your visits to this and other
                websites to provide relevant advertisements. You can opt out of personalized advertising
                by visiting{' '}
                <a href="https://www.google.com/settings/ads" style={{ color: 'var(--accent-purple)' }} target="_blank" rel="noopener noreferrer">
                    Google&apos;s Ad Settings
                </a>.
            </p>
            <p>
                For more information about how Google uses data, please visit{' '}
                <a href="https://policies.google.com/privacy" style={{ color: 'var(--accent-purple)' }} target="_blank" rel="noopener noreferrer">
                    Google&apos;s Privacy Policy
                </a>.
            </p>

            <h2>4. Cookies</h2>
            <p>
                We use cookies and similar tracking technologies to enhance your experience. These include:
            </p>
            <ul>
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our Site</li>
                <li><strong>Advertising Cookies:</strong> Used by Google AdSense to serve relevant ads</li>
            </ul>
            <p>
                You can control cookies through your browser settings. Disabling cookies may affect
                your experience on our Site.
            </p>

            <h2>5. Third-Party Services</h2>
            <p>We may share information with third-party services including:</p>
            <ul>
                <li>Google AdSense (advertising)</li>
                <li>Google Analytics (website analytics)</li>
                <li>Supabase (data hosting)</li>
            </ul>
            <p>
                These services have their own privacy policies governing the use of your information.
            </p>

            <h2>6. Data Security</h2>
            <p>
                We implement appropriate technical and organizational security measures to protect your
                personal information. However, no electronic transmission or storage method is 100%
                secure, and we cannot guarantee absolute security.
            </p>

            <h2>7. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Delete your data</li>
                <li>Object to data processing</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
            </ul>
            <p>
                To exercise any of these rights, please contact us through our{' '}
                <a href="/contact" style={{ color: 'var(--accent-purple)' }}>Contact Page</a>.
            </p>

            <h2>8. Children&apos;s Privacy</h2>
            <p>
                Our Site is not intended for children under 13 years of age. We do not knowingly collect
                personal information from children under 13.
            </p>

            <h2>9. Changes to This Policy</h2>
            <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes
                by posting the new policy on this page and updating the &quot;Last updated&quot; date.
            </p>

            <h2>10. Contact Us</h2>
            <p>
                If you have questions about this Privacy Policy, please contact us at{' '}
                <a href="/contact" style={{ color: 'var(--accent-purple)' }}>our Contact Page</a>.
            </p>
        </div>
    );
}
