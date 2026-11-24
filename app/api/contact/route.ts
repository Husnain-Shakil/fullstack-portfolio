import { NextRequest, NextResponse } from 'next/server';
import { createElement } from 'react';
import { Resend } from 'resend';
import { ContactFormEmail } from '@/app/emails/ContactFormEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email validation regex
const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// HTML escape for XSS prevention
const escapeHtml = (text: string): string => {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
};

export async function POST(request: NextRequest) {
    try {
        const { name, email, message } = await request.json();

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        if (!isValidEmail(email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        if (name.length < 2) {
            return NextResponse.json(
                { error: 'Name must be at least 2 characters' },
                { status: 400 }
            );
        }

        if (message.length < 10) {
            return NextResponse.json(
                { error: 'Message must be at least 10 characters' },
                { status: 400 }
            );
        }

        // Check if Resend is configured
        if (!process.env.RESEND_API_KEY) {
            console.error('RESEND_API_KEY not configured');
            // In development, log the submission instead of failing
            if (process.env.NODE_ENV === 'development') {
                console.log('DEV MODE - Contact submission:', { name, email, message });
                return NextResponse.json({
                    success: true,
                    message: 'Message received (dev mode - email not sent)',
                });
            }
            return NextResponse.json(
                { error: 'Email service is not configured' },
                { status: 500 }
            );
        }

        // Escape HTML to prevent XSS
        const escapedName = escapeHtml(name);
        const escapedEmail = escapeHtml(email);
        const escapedMessage = escapeHtml(message);

        // Send email using Resend
        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>', // Use your verified domain in production
            to: process.env.CONTACT_EMAIL || 'husnainshakil123@gmail.com',
            replyTo: email,
            subject: `New Contact Form Message from ${escapedName}`,
            react: createElement(ContactFormEmail, {
                name: escapedName,
                email: escapedEmail,
                message: escapedMessage,
            }),
        });

        if (error) {
            console.error('Resend API error:', error);
            return NextResponse.json(
                { error: 'Failed to send message' },
                { status: 500 }
            );
        }

        console.log('Email sent successfully:', data?.id);

        return NextResponse.json({
            success: true,
            message: 'Message sent successfully!',
        });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}