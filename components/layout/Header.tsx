"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navLinksHome = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
];

const navLinksOther = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "#contact" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const pathname = usePathname();

    const isHomePage = pathname === "/";
    const isProjectsPage = pathname === "/projects";
    const isProjectDetailPage = pathname.startsWith("/projects/") && pathname !== "/projects";

    const navLinks = isHomePage ? navLinksHome : navLinksOther;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);

            // Handle active section based on page type
            if (isHomePage) {
                // Home page: Clear active section when at the very top
                if (window.scrollY < 50) {
                    setActiveSection("");
                    return;
                }

                const sections = navLinksHome.map((link) => link.href.substring(1));
                for (const section of sections) {
                    const element = document.getElementById(section);
                    if (element) {
                        const rect = element.getBoundingClientRect();
                        if (rect.top <= 100 && rect.bottom >= 100) {
                            setActiveSection(section);
                            break;
                        }
                    }
                }
            } else if (isProjectsPage) {
                // Projects page: Show Projects as active at top, Contact when scrolled
                if (window.scrollY < 50) {
                    setActiveSection("projects");
                } else {
                    const contactElement = document.getElementById("contact");
                    if (contactElement) {
                        const rect = contactElement.getBoundingClientRect();
                        if (rect.top <= 100 && rect.bottom >= 100) {
                            setActiveSection("contact");
                        } else {
                            setActiveSection("projects");
                        }
                    }
                }
            } else if (isProjectDetailPage) {
                // Project detail page: No active section initially, Contact when scrolled
                const contactElement = document.getElementById("contact");
                if (contactElement) {
                    const rect = contactElement.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection("contact");
                    } else {
                        setActiveSection("");
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isHomePage, isProjectsPage, isProjectDetailPage]);

    const handleNavigation = (href: string) => {
        setIsOpen(false);

        // Handle navigation based on href type
        if (href.startsWith("/")) {
            // Page navigation
            router.push(href);
        } else if (href.startsWith("#")) {
            // Section navigation - scroll to element
            // Add a small delay to ensure mobile menu closes first
            setTimeout(() => {
                const element = document.querySelector(href);
                if (!element) return;

                const yOffset = -40;
                const y =
                    element.getBoundingClientRect().top +
                    window.pageYOffset +
                    yOffset;

                window.scrollTo({
                    top: y,
                    behavior: "smooth",
                });
            }, 100);
        }
    };

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={cn(
                "fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b transition-all duration-300",
                isScrolled
                    ? "border-border shadow-sm"
                    : "border-transparent"
            )}
        >
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <motion.button
                        onClick={() => isHomePage ? handleNavigation("#home") : handleNavigation("/")}
                        className="text-2xl font-bold cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Image src="/images/h-logo.png" alt="Logo" width={50} height={50} />
                    </motion.button>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => handleNavigation(link.href)}
                                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                            >
                                {link.name}
                                {((isHomePage && activeSection === link.href.substring(1)) ||
                                    (!isHomePage && (
                                        (isProjectsPage && activeSection === "projects" && link.name === "Projects") ||
                                        (activeSection === "contact" && link.name === "Contact")
                                    ))) && (
                                        <motion.div
                                            layoutId="activeSection"
                                            className="absolute -bottom-2 left-0 right-0 h-0.5 bg-linear-to-r from-[#ff007f] to-[#ff3399]"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                            </button>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open("/resume.pdf", "_blank")}
                            className="hidden sm:flex"
                        >
                            <Download size={16} />
                            Resume
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleTheme}
                            className="w-9 h-9 p-0"
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                        </Button>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden w-9 h-9 p-0"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden border-t border-border overflow-hidden"
                        >
                            <div className="py-4 space-y-1">
                                {navLinks.map((link) => (
                                    <button
                                        key={link.name}
                                        onClick={() => handleNavigation(link.href)}
                                        className="cursor-pointer block w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                                    >
                                        {link.name}
                                    </button>
                                ))}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open("/resume.pdf", "_blank")}
                                    className="w-full mt-2"
                                >
                                    <Download size={16} />
                                    Download Resume
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </motion.header>
    );
}