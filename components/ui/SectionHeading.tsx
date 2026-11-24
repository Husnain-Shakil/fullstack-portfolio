"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    alignment?: "left" | "center";
    className?: string;
}

export function SectionHeading({
    title,
    subtitle,
    alignment = "center",
    className,
}: SectionHeadingProps) {
    const alignmentClasses = alignment === "center" ? "text-center items-center" : "text-left items-start";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={cn("flex flex-col gap-4 mb-12", alignmentClasses, className)}
        >
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                    {title}
                </h2>
                <div
                    className={cn(
                        "h-1 w-16 bg-linear-to-r from-[#ff007f] to-[#ff3399] rounded-full",
                        alignment === "center" && "mx-auto"
                    )}
                />
            </div>
            {subtitle && (
                <p className="text-muted-foreground text-lg max-w-2xl">
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
}