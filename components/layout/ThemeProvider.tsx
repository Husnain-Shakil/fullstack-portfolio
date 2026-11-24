"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
    theme: Theme;
    setTheme: (theme: Theme) => void;
}>({
    theme: "light",
    setTheme: () => { },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("theme") as Theme | null;
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            return saved || (prefersDark ? "dark" : "light");
        }
        return "dark";
    });

    useEffect(() => {
        const root = document.documentElement;
        
        root.style.transition = 'background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out';
        
        root.classList.toggle("dark", theme === "dark");
        
        const timeoutId = setTimeout(() => {
            root.style.transition = '';
        }, 300);
        
        return () => clearTimeout(timeoutId);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);