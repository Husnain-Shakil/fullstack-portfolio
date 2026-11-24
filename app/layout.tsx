import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import ScrollToTop from "@/components/ui/ScrollToTop";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/sections/Contact";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Husnain Shakil | MERN Stack Developer",
  description:
    "Professional portfolio of Husnain Shakil - MERN Stack Developer with 1+ years of experience building scalable full-stack applications",
  keywords: ["MERN Stack", "React", "Node.js", "TypeScript", "Web Development"],
  authors: [{ name: "Husnain Shakil" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "Husnain Shakil | MERN Stack Developer",
    description: "Professional MERN Stack Developer Portfolio",
    siteName: "Husnain Shakil Portfolio",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <html lang="en" suppressHydrationWarning className={`${inter.variable} font-inter scroll-smooth`}>
        <body className="antialiased">
          <Header />
          {children}
          <Contact />
          <Footer />
          <ScrollToTop />
          <Toaster
            position="bottom-left"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'hsl(220 15% 96%)', // Your background color
                color: 'hsl(222.2 84% 4.9%)', // Dark text for contrast
                borderRadius: '12px',
                padding: '14px 18px',
                fontSize: '14px',
                fontWeight: '500',
                border: '1px solid hsl(220 13% 88%)',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
              },
              success: {
                duration: 3500,
                iconTheme: {
                  primary: '#ff007f', // Your pink accent color
                  secondary: '#fff',
                },
                style: {
                  background: 'hsl(220 15% 96%)',
                  borderLeft: '4px solid #ff007f',
                },
              },
              error: {
                duration: 4500,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
                style: {
                  background: 'hsl(220 15% 96%)',
                  borderLeft: '4px solid #ef4444',
                },
              },
              loading: {
                style: {
                  background: 'hsl(220 15% 96%)',
                  borderLeft: '4px solid #ff3399',
                },
              },
            }}
          />
        </body>
      </html>
    </ThemeProvider>
  );
}