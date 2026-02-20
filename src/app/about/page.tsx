import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us',
    description: 'Learn about ViralScopeNews, our mission, and our AI-enhanced approach to delivering quality news coverage.',
};

export default function AboutPage() {
    return (
        <div className="legal-page">
            <h1>About ViralScopeNews</h1>
            <p className="updated-date">A Modern Digital Newsroom</p>

            <p>
                ViralScopeNews is a next-generation digital news publication that leverages the power of
                artificial intelligence to deliver high-quality, insightful news coverage across the most
                dynamic sectors of our time: Artificial Intelligence, Technology, Cryptocurrency, and
                Middle East Business.
            </p>

            <h2>Our Mission</h2>
            <p>
                In an era of information overload, we believe readers deserve more than just headlines.
                Our mission is to cut through the noise and deliver what truly matters — with context,
                analysis, and actionable insights that help you stay ahead of the curve.
            </p>
            <p>
                Every article published on ViralScopeNews is enhanced with AI-powered summaries,
                significance analysis, and key takeaways, ensuring you can quickly grasp the implications
                of breaking developments without sacrificing depth.
            </p>

            <h2>How We Work</h2>
            <p>
                Our editorial process combines the speed and scale of AI technology with human editorial
                oversight:
            </p>
            <ul>
                <li>
                    <strong>Intelligent Sourcing:</strong> We monitor hundreds of trusted news sources,
                    RSS feeds, and wire services to identify the most relevant stories across our coverage areas.
                </li>
                <li>
                    <strong>AI-Enhanced Writing:</strong> Our proprietary AI engine processes raw news data
                    and produces original, well-structured articles complete with summaries, analysis, and
                    key takeaways.
                </li>
                <li>
                    <strong>Editorial Review:</strong> Every piece goes through our editorial review process
                    before publication to ensure accuracy, quality, and journalistic standards.
                </li>
                <li>
                    <strong>Continuous Updates:</strong> Our pipeline runs continuously, ensuring you always
                    have access to the latest developments as they unfold.
                </li>
            </ul>

            <h2>Our Coverage Areas</h2>
            <p>
                We focus on four rapidly evolving sectors that are shaping the future of business and
                technology:
            </p>
            <ul>
                <li>
                    <strong>Artificial Intelligence:</strong> Breakthroughs in machine learning, neural
                    networks, generative AI, robotics, and enterprise AI adoption.
                </li>
                <li>
                    <strong>Technology:</strong> Innovation across software, hardware, cloud computing,
                    cybersecurity, and the broader tech industry.
                </li>
                <li>
                    <strong>Cryptocurrency & Blockchain:</strong> Market movements, DeFi innovations,
                    regulatory developments, Web3, and digital asset trends.
                </li>
                <li>
                    <strong>Middle East Business:</strong> Economic diversification, investment flows,
                    infrastructure development, and the region&apos;s growing role in global tech and finance.
                </li>
            </ul>

            <h2>Our Commitment</h2>
            <p>
                We are committed to delivering accurate, unbiased, and insightful news coverage. We
                clearly attribute all source material, maintain transparency about our AI-enhanced
                editorial process, and adhere to the highest standards of digital journalism.
            </p>
            <p>
                ViralScopeNews is independently operated and committed to providing value to our readers
                above all else. We believe that quality journalism — enhanced by technology — is essential
                for informed decision-making in today&apos;s fast-paced world.
            </p>

            <h2>Contact Us</h2>
            <p>
                We value your feedback and inquiries. Whether you have a news tip, partnership proposal,
                or general question, please don&apos;t hesitate to reach out through our{' '}
                <a href="/contact" style={{ color: 'var(--accent-purple)' }}>Contact Page</a>.
            </p>
        </div>
    );
}
