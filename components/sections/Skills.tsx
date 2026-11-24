"use client";

import { motion } from "framer-motion";
import {
    SiJavascript,
    SiTypescript,
    SiReact,
    SiNextdotjs,
    SiRedux,
    SiNodedotjs,
    SiExpress,
    SiMongodb,
    SiMysql,
    SiTailwindcss,
    SiGit,
    SiDocker,
} from "react-icons/si";
import { SectionHeading } from "../ui/SectionHeading";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";

const skillCategories = [
    {
        name: "MERN Stack",
        skills: [
            { name: "MongoDB", icon: SiMongodb, link: "https://www.mongodb.com/docs/" },
            { name: "Express.js", icon: SiExpress, link: "https://expressjs.com/" },
            { name: "React.js", icon: SiReact, link: "https://react.dev/" },
            { name: "Node.js", icon: SiNodedotjs, link: "https://nodejs.org/docs/" },
        ],
    },
    {
        name: "Next.js & Frontend",
        skills: [
            { name: "Next.js", icon: SiNextdotjs, link: "https://nextjs.org/docs" },
            { name: "Redux", icon: SiRedux, link: "https://redux.js.org/" },
            { name: "Tailwind CSS", icon: SiTailwindcss, link: "https://tailwindcss.com/docs" },
        ],
    },
    {
        name: "Languages",
        skills: [
            { name: "JavaScript (ES6+)", icon: SiJavascript, link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
            { name: "TypeScript", icon: SiTypescript, link: "https://www.typescriptlang.org/docs/" },
        ],
    },
    {
        name: "Database",
        skills: [
            { name: "MySQL", icon: SiMysql, link: "https://dev.mysql.com/doc/" },
        ],
    },
    {
        name: "Tools & DevOps",
        skills: [
            { name: "Git", icon: SiGit, link: "https://git-scm.com/doc" },
            { name: "Docker", icon: SiDocker, link: "https://docs.docker.com/" },
        ],
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
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 },
};

export default function Skills() {
    return (
        <section id="skills" className="py-24 bg-muted/30">
            <div className="container mx-auto px-4">
                <SectionHeading
                    title="Technical Skills"
                    subtitle="Technologies and tools I work with to build modern web applications"
                />

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {skillCategories.map((category, idx) => (
                        <motion.div key={idx} variants={item}>
                            <Card className="h-full">
                                <CardHeader>
                                    <CardTitle className="text-lg text-gradient">{category.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {category.skills.map((skill, skillIdx) => (
                                            <a
                                                key={skillIdx}
                                                href={skill.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg text-sm font-medium hover:bg-accent transition-colors cursor-pointer"
                                            >
                                                <skill.icon className="w-4 h-4" />
                                                <span>{skill.name}</span>
                                            </a>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}