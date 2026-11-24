"use client";

import { Briefcase, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";

const experiences = [
    {
        title: "MERN Stack + Next.js Developer",
        company: "TryCatch Sol",
        period: "Oct 2024 – Present",
        responsibilities: [
            "Architected and built full-stack applications using the complete MERN stack (MongoDB, Express.js, React, Node.js)",
            "Developed production-grade Next.js applications with SSR, API routes, and optimized performance",
            "Designed and implemented RESTful APIs with Express.js and MongoDB for efficient data management",
            "Built secure authentication and authorization systems using JWT tokens and bcrypt hashing",
            "Created scalable frontend architectures with React hooks, context API, and TypeScript for type safety",
            "Integrated real-time features using WebSockets and Socket.io for interactive applications",
            "Collaborated in agile teams following Git workflows and conducted thorough code reviews",
        ],
    },
];

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export default function Experience() {
    return (
        <section id="experience" className="py-24">
            <div className="container mx-auto px-4">
                <SectionHeading title="Professional Experience" />

                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="max-w-4xl mx-auto"
                >
                    {experiences.map((exp, index) => (
                        <motion.div key={index} variants={item}>
                            <Card>
                                <CardHeader>
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div>
                                            <CardTitle className="text-2xl mb-2">{exp.title}</CardTitle>
                                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1.5">
                                                    <Briefcase size={14} />
                                                    {exp.company}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar size={14} />
                                                    {exp.period}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {exp.responsibilities.map((resp, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                                                <span className="text-[#ff007f] shrink-0">▹</span>
                                                <span>{resp}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}