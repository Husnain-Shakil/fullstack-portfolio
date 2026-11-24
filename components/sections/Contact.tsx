"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import toast from "react-hot-toast";

const contactInfo = [
    {
        icon: Mail,
        label: "Email",
        value: "husnainshakil123@gmail.com",
        href: "mailto:husnainshakil123@gmail.com",
    },
    {
        icon: FaGithub,
        label: "GitHub",
        value: "/Husnain-Shakil",
        href: "https://github.com/Husnain-Shakil",
    },
    {
        icon: FaLinkedin,
        label: "LinkedIn",
        value: "/in/muhammad-husnain-shakil",
        href: "https://www.linkedin.com/in/muhammad-husnain-shakil",
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(
                    "Message sent successfully! I'll get back to you soon."
                );
                setFormData({ name: "", email: "", message: "" });
            } else {
                debugger;
                throw new Error(data.error || 'Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error(
                error instanceof Error ? error.message : "Failed to send message. Please try again.",
            );
        }
    };

    return (
        <section id="contact" className="py-24 bg-muted/30">
            <div className="container mx-auto px-4">
                <SectionHeading
                    title="Get In Touch"
                    subtitle="Have a project in mind? I'd love to hear about it. Let's work together!"
                />

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
                >
                    {/* Contact Info */}
                    <motion.div variants={item} className="space-y-6">
                        <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                        <div className="space-y-4">
                            {contactInfo.map((info, idx) => (
                                <motion.a
                                    key={idx}
                                    href={info.href}
                                    target={info.href.startsWith("http") ? "_blank" : "_self"}
                                    rel="noopener noreferrer"
                                    whileHover={{ x: 4 }}
                                    className="block"
                                >
                                    <Card hover>
                                        <CardContent className="flex items-center gap-4 p-6">
                                            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-linear-to-br from-[#ff007f]/20 to-[#ff3399]/20">
                                                <info.icon className="w-6 h-6 text-[#ff007f]" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">{info.label}</p>
                                                <p className="font-medium">{info.value}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div variants={item}>
                        <Card>
                            <CardContent className="p-6">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[#ff007f]/20 transition-shadow"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[#ff007f]/20 transition-shadow"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[#ff007f]/20 transition-shadow resize-none"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        variant="gradient"
                                        size="lg"
                                        disabled={status === "sending"}
                                        className="w-full"
                                    >
                                        {status === "sending" ? (
                                            "Sending..."
                                        ) : status === "success" ? (
                                            <>
                                                <CheckCircle2 size={18} />
                                                Message Sent!
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <Send size={18} />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}