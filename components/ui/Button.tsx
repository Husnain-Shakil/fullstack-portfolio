"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { forwardRef } from "react";

interface ButtonProps extends Omit<React.ComponentProps<typeof motion.button>, "ref"> {
    variant?: "default" | "outline" | "ghost" | "gradient";
    size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "md", children, ...props }, ref) => {
        const baseStyles =
            "cursor-pointer inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

        const variants = {
            default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
            outline: "border-2 border-border bg-transparent hover:bg-accent",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            gradient:
                "bg-gradient-to-r from-[#ff007f] to-[#ff3399] text-white shadow-lg shadow-[#ff007f]/30 hover:shadow-[#ff007f]/40 hover:scale-[1.02]",
        };

        const sizes = {
            sm: "h-9 px-4 text-sm",
            md: "h-11 px-6 text-base",
            lg: "h-12 px-8 text-lg",
        };

        return (
            <motion.button
                ref={ref}
                whileTap={{ scale: 0.98 }}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);

Button.displayName = "Button";

export { Button };