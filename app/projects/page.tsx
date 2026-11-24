import getPortfolio from "@/lib/getPortfolio";
import Link from "next/link";
import Image from "next/image";
import { slugify } from "@/lib/slugify";

export default function ProjectsPage() {
    const projects = getPortfolio();

    return (
        <main className="pt-24 pb-16">
            <div className="container mx-auto px-4">

                <h1 className="text-4xl font-bold mb-12">All Projects</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project) => {
                        const slug = slugify(project.title);

                        return (
                            <Link key={project.id} href={`/projects/${slug}`}>
                                <div className="border rounded-xl overflow-hidden hover:shadow-lg transition">

                                    <div className="relative aspect-video">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="p-5">
                                        <h3 className="font-semibold text-lg">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {project.tagline}
                                        </p>
                                    </div>

                                </div>
                            </Link>
                        );
                    })}
                </div>

            </div>
        </main>
    );
}