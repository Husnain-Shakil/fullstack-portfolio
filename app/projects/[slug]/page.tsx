import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import getPortfolio from "@/lib/getPortfolio";
import { slugify } from "@/lib/slugify";
import BackButton from "@/components/ui/BackButton";

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const project = getPortfolio().find(
        (p) => slugify(p.title) === slug
    );

    if (!project) notFound();

    return (
        <main className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-5xl">

                {/* BACK */}
                <BackButton />

                {/* HERO */}
                <header className="space-y-6 mb-14">

                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <h1 className="text-4xl md:text-5xl font-bold">
                            {project.title}
                        </h1>
                    </div>

                    <p className="text-xl text-muted-foreground max-w-3xl">
                        {project.tagline}
                    </p>

                    <div className="relative aspect-video rounded-2xl overflow-hidden">
                        <Image
                            src={project.cover || project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </header>

                {/* CONTENT */}
                <div className="space-y-16">

                    {/* CONTEXT */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-3">
                            Context
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {project.context}
                        </p>
                    </section>

                    {/* PROBLEM */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">
                            Problem
                        </h2>
                        <ul className="space-y-3">
                            {project.problem.map((p, i) => (
                                <li key={i} className="text-muted-foreground">
                                    • {p}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* SOLUTION */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-3">
                            Solution
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {project.solution}
                        </p>
                    </section>

                    {/* ROLE */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">
                            What I Built
                        </h2>
                        <ul className="space-y-3">
                            {project.role.map((r, i) => (
                                <li key={i} className="text-muted-foreground">
                                    • {r}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* HIGHLIGHTS */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">
                            Key Highlights
                        </h2>

                        <div className="grid sm:grid-cols-2 gap-3">
                            {project.highlights.map((h, i) => (
                                <div
                                    key={i}
                                    className="p-4 rounded-lg bg-muted/50"
                                >
                                    ✓ {h}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CHALLENGES */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">
                            Engineering Challenges
                        </h2>

                        <div className="space-y-4">
                            {project.challenges.map((c, i) => (
                                <div
                                    key={i}
                                    className="p-4 border rounded-xl"
                                >
                                    <p className="font-medium">
                                        {c.title}
                                    </p>
                                    <p className="text-muted-foreground text-sm">
                                        {c.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* TECH STACK */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">
                            Tech Stack
                        </h2>

                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((t, i) => (
                                <Badge key={i} variant="secondary">
                                    {t}
                                </Badge>
                            ))}
                        </div>
                    </section>

                    {/* GALLERY */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">
                            Screenshots
                        </h2>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {project.gallery.map((img, i) => (
                                <div
                                    key={i}
                                    className="relative aspect-video rounded-xl overflow-hidden border"
                                >
                                    <Image
                                        src={img}
                                        alt={`${project.title} ${i}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}