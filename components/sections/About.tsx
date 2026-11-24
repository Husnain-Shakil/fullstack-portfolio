"use client";

import { Award, Code2, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

const stats = [
    { icon: Award, label: "Experience", value: "1+ Year", color: "text-[#ff007f]" },
    { icon: Code2, label: "Real World Projects", value: "8+", color: "text-[#ff3399]" },
    { icon: Rocket, label: "Technologies", value: "10+", color: "text-[#ff66b2]" },
];

const highlights = [
    "Effective communication and teamwork, including remote collaboration",
    "Experience with SaaS, dashboards, and real-time systems",
    "Problem-solving mindset with focus on optimizing workflows",
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

export default function About() {
    return (
        <section id="about" className="py-24 bg-muted/30">
            <div className="container mx-auto px-4">
                <SectionHeading
                    title="About Me"
                    subtitle="MERN Stack + Next.js Specialist focused on full-stack excellence"
                />

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid lg:grid-cols-2 gap-12"
                >
                    {/* Left Column */}
                    <motion.div variants={item} className="space-y-6">
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <p className="text-muted-foreground leading-relaxed">
                                I’m a full-stack developer specializing in building scalable SaaS applications,
                                real-time systems, and API-driven platforms using MERN and Next.js.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                Currently working at TryCatch Sol, I've delivered real-world projects including
                                Progressive Web Apps, real-time gaming platforms, and AI-powered business automation systems.
                                I focus on writing clean, maintainable code and implementing production-ready features
                                in collaborative agile environments, with a strong foundation in modern full-stack development.
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid sm:grid-cols-3 grid-cols-2 gap-4 pt-4">
                            {stats.map((stat, idx) => (
                                <Card key={idx} className="text-center">
                                    <CardContent className="pt-6">
                                        <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                                        <p className="text-2xl font-bold mb-1">{stat.value}</p>
                                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column */}
                    <motion.div variants={item} className="space-y-6">
                        {/* Education */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Education</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <h4 className="font-semibold">Bachelor's in Computer Science (BSCS)</h4>
                                <p className="text-sm text-muted-foreground">
                                    Islamia University of Bahawalpur • 2022–2026
                                </p>
                                <div className="inline-block px-3 py-1 bg-[#ff007f]/10 text-[#ff007f] dark:bg-[#ff3399]/10 dark:text-[#ff3399] rounded-full text-sm font-medium">
                                    CGPA: 3.34
                                </div>
                            </CardContent>
                        </Card>

                        {/* Highlights */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">What I Bring</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {highlights.map((highlight, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <span className="text-[#ff007f] shrink-0">✓</span>
                                            <span>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}