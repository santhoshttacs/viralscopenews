import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Editorial Policy',
    description: 'ViralScopeNews Editorial Policy. Learn about our journalistic standards, AI-enhanced content process, and commitment to accuracy.',
};

export default function EditorialPolicyPage() {
    return (
        <div className="legal-page">
            <h1>Editorial Policy</h1>
            <p className="updated-date">Our Commitment to Quality Journalism</p>

            <p>
                At ViralScopeNews, we are committed to maintaining the highest standards of digital
                journalism. This editorial policy outlines our principles, processes, and commitment
                to delivering accurate, fair, and insightful news coverage.
            </p>

            <h2>Our Editorial Standards</h2>
            <p>
                Every piece of content published on ViralScopeNews adheres to the following principles:
            </p>
            <ul>
                <li><strong>Accuracy:</strong> We strive to present factual, verified information in every article</li>
                <li><strong>Transparency:</strong> We clearly identify AI-enhanced content and cite original sources</li>
                <li><strong>Fairness:</strong> We present multiple perspectives on complex issues</li>
                <li><strong>Independence:</strong> Our editorial decisions are not influenced by advertisers or sponsors</li>
                <li><strong>Timeliness:</strong> We prioritize delivering the most current and relevant news</li>
            </ul>

            <h2>AI-Enhanced Content Process</h2>
            <p>
                ViralScopeNews utilizes artificial intelligence as a tool to enhance our news coverage.
                Here is how our AI-enhanced editorial process works:
            </p>
            <ul>
                <li>
                    <strong>Source Discovery:</strong> Our systems continuously monitor trusted news sources,
                    wire services, and industry-specific feeds to identify breaking stories and significant developments.
                </li>
                <li>
                    <strong>Content Synthesis:</strong> AI technology processes source material and generates
                    original articles that include structured summaries, significance analysis, and key takeaways.
                </li>
                <li>
                    <strong>Quality Assurance:</strong> Articles undergo review before publication to verify
                    accuracy, tone, and adherence to our editorial standards.
                </li>
                <li>
                    <strong>Source Attribution:</strong> Every article includes a link to the original source
                    material, ensuring full transparency and proper attribution.
                </li>
            </ul>

            <h2>Corrections Policy</h2>
            <p>
                We take accuracy seriously. If an error is identified in any published article:
            </p>
            <ul>
                <li>We will promptly correct the error</li>
                <li>Significant corrections will be noted at the bottom of the article</li>
                <li>The &quot;Last Updated&quot; timestamp will reflect the correction date</li>
                <li>For material errors, we will publish a formal correction notice</li>
            </ul>

            <h2>Advertising and Editorial Independence</h2>
            <p>
                Our editorial content is independent from our advertising operations. Advertisers
                have no influence over our news coverage, article selection, or editorial decisions.
                Sponsored content, if any, will be clearly labeled as such.
            </p>

            <h2>Reader Feedback</h2>
            <p>
                We welcome feedback from our readers. If you believe any article contains an error,
                exhibits bias, or does not meet our editorial standards, please contact us through
                our <a href="/contact" style={{ color: 'var(--accent-purple)' }}>Contact Page</a>.
                We review all feedback and take appropriate action.
            </p>
        </div>
    );
}
