"use client";

import { Mail, Heart } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { motion } from "framer-motion";

const socialLinks = [
    {
        name: "GitHub",
        icon: FaGithub,
        href: "https://github.com/Husnain-Shakil",
    },
    {
        name: "LinkedIn",
        icon: FaLinkedin,
        href: "https://www.linkedin.com/in/muhammad-husnain-shakil",
    },
    {
        name: "Email",
        icon: Mail,
        href: "mailto:husnainshakil123@gmail.com",
    },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border bg-card">
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col items-center gap-8">
                    {/* Social Links */}
                    <div className="flex gap-4">
                        {socialLinks.map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-secondary hover:bg-accent transition-colors"
                                aria-label={link.name}
                            >
                                <link.icon size={18} />
                            </motion.a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <div className="flex flex-col items-center gap-2 text-center">
                        <p className="text-sm text-muted-foreground">
                            © {currentYear} Husnain Shakil. All rights reserved.
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            Built with Next.js, TypeScript & Tailwind CSS
                            <Heart size={12} className="text-red-500 fill-red-500" />
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}