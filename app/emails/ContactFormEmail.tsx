import * as React from 'react';
import {
    Html,
    Body,
    Container,
    Section,
    Column,
    Row,
    Head,
    Heading,
    Text,
    Hr,
    Preview,
} from '@react-email/components';

interface ContactFormEmailProps {
    name: string;
    email: string;
    message: string;
}

export const ContactFormEmail: React.FC<ContactFormEmailProps> = ({
    name,
    email,
    message,
}) => {
    const previewText = `New contact form submission from ${name}`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>New Contact Form Submission</Heading>

                    <Section style={section}>
                        <Row>
                            <Column style={labelColumn}>Name:</Column>
                            <Column style={valueColumn}>{name}</Column>
                        </Row>
                        <Row>
                            <Column style={labelColumn}>Email:</Column>
                            <Column style={valueColumn}>{email}</Column>
                        </Row>
                    </Section>

                    <Hr style={hr} />

                    <Section>
                        <Heading style={h2}>Message:</Heading>
                        <Text style={messageText}>{message}</Text>
                    </Section>

                    <Hr style={hr} />

                    <Text style={footer}>
                        Sent from your portfolio contact form
                    </Text>
                </Container>
            </Body>
        </Html>
    );
};

// Styles
const main = {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '40px 0',
};

const container = {
    backgroundColor: '#ffffff',
    border: '1px solid #e6e6e6',
    borderRadius: '8px',
    margin: '0 auto',
    padding: '40px 20px',
    maxWidth: '600px',
};

const h1 = {
    color: '#333',
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '30px',
    textAlign: 'center' as const,
};

const h2 = {
    color: '#333',
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '10px',
};

const section = {
    marginBottom: '20px',
};

const labelColumn = {
    width: '80px',
    fontWeight: '600',
    color: '#555',
    padding: '8px 0',
};

const valueColumn = {
    padding: '8px 0',
    color: '#333',
};

const hr = {
    borderColor: '#e6e6e6',
    margin: '20px 0',
};

const messageText = {
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
    color: '#333',
    fontSize: '14px',
    lineHeight: '1.6',
    padding: '16px',
    whiteSpace: 'pre-wrap' as const,
};

const footer = {
    color: '#8898aa',
    fontSize: '12px',
    marginTop: '30px',
    textAlign: 'center' as const,
};

export default ContactFormEmail;