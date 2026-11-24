"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, hover = false, children, ...props }, ref) => {
        const Component = hover ? motion.div : "div";
        const hoverProps = hover
            ? {
                whileHover: { y: -4 },
                transition: { duration: 0.2 },
            }
            : {};

        return (
            <Component
                ref={ref}
                className={cn(
                    "rounded-lg border border-border bg-card text-card-foreground shadow-sm transition-shadow",
                    hover && "hover:shadow-lg cursor-pointer",
                    className
                )}
                {...hoverProps}
                {...props}
            >
                {children}
            </Component>
        );
    }
);

Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
    )
);
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h3
            ref={ref}
            className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
            {...props}
        />
    )
);
CardTitle.displayName = "CardTitle";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
    )
);
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardContent };