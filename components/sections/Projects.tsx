"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { slugify } from "@/lib/slugify";
import getPortfolio, { PortfolioType } from "@/lib/getPortfolio";
import { Button } from "../ui/Button";

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

function ProjectPreview({ project }: { project: PortfolioType }) {
    const slug = slugify(project.title);

    return (
        <motion.div variants={item} className="grid lg:grid-cols-2 gap-10 items-center">

            {/* LEFT: CONTENT */}
            <div className="space-y-5">
                <h3 className="text-3xl font-bold">
                    {project.title}
                </h3>

                <p className="text-muted-foreground">
                    {project.tagline}
                </p>

                {/* Key Outcomes (IMPORTANT) */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {project.highlights.map((f, i) => (
                        <span key={i}>✔ {f}</span>
                    ))}
                </div>

                {/* CTA */}
                <Link href={`/projects/${slug}`}>
                    <Button
                        variant="gradient"
                        size="lg"
                        className="mt-2"
                    >
                        View Case Study
                        <ArrowRight size={16} />
                    </Button>
                </Link>
            </div>

            {/* RIGHT: IMAGE */}
            <div className="relative aspect-video rounded-xl overflow-hidden border shadow-xl">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                />
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const projects = getPortfolio().slice(1, 3);

    return (
        <section id="projects" className="py-24">
            <div className="container mx-auto px-4">
                <SectionHeading
                    title="Selected Work"
                    subtitle="A few projects where I focused on performance, scalability, and real-world impact"
                />

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-24"
                >
                    {projects.map((project) => (
                        <ProjectPreview key={project.id} project={project} />
                    ))}
                </motion.div>

                {/* Optional: View all */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={item}
                    className="mt-16 text-center"
                >
                    <Link href="/projects">
                        <Button variant="outline">
                            View All Projects
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}