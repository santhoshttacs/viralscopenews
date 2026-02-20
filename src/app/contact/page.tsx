'use client';

import { useState } from 'react';
import { Metadata } from 'next';

export default function ContactPage() {
    return (
        <div className="legal-page" style={{ maxWidth: '1000px' }}>
            <h1>Contact Us</h1>
            <p className="updated-date">We&apos;d love to hear from you</p>

            <div className="contact-grid">
                <ContactForm />

                <div className="contact-info-card">
                    <div className="contact-info-item">
                        <div className="contact-icon">📧</div>
                        <div>
                            <h4>Email</h4>
                            <p>contact@viralscopenews.com</p>
                        </div>
                    </div>

                    <div className="contact-info-item">
                        <div className="contact-icon">🌐</div>
                        <div>
                            <h4>Website</h4>
                            <p>viralscopenews.com</p>
                        </div>
                    </div>

                    <div className="contact-info-item">
                        <div className="contact-icon">📰</div>
                        <div>
                            <h4>Press Inquiries</h4>
                            <p>press@viralscopenews.com</p>
                        </div>
                    </div>

                    <div className="contact-info-item">
                        <div className="contact-icon">💼</div>
                        <div>
                            <h4>Partnerships</h4>
                            <p>partners@viralscopenews.com</p>
                        </div>
                    </div>

                    <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--border-subtle)' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Response Time</h4>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                            We typically respond to inquiries within 24-48 business hours.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            {status === 'success' && (
                <div className="message success">
                    Thank you! Your message has been sent successfully.
                </div>
            )}
            {status === 'error' && (
                <div className="message error">
                    Something went wrong. Please try again later.
                </div>
            )}

            <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                    id="name"
                    type="text"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    type="email"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                    id="subject"
                    type="text"
                    className="form-input"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                    id="message"
                    className="form-textarea"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                />
            </div>

            <button
                type="submit"
                className="submit-btn"
                disabled={status === 'sending'}
            >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    );
}
