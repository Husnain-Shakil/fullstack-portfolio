"use client";

import { Mail, ArrowDown, Download } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "../ui/Button";
// import dynamic from "next/dynamic";

// const HeroBackground = dynamic(() => import("../three/HeroBackground"), {
//     ssr: false,
//     loading: () => (
//         <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#ff007f]/10 via-[#ff3399]/10 to-[#ff66b2]/10" />
//     ),
// });

const socialLinks = [
  {
    icon: FaGithub,
    href: "https://github.com/Husnain-Shakil",
    label: "GitHub",
  },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/muhammad-husnain-shakil",
    label: "LinkedIn",
  },
  { icon: Mail, href: "mailto:husnainshakil123@gmail.com", label: "Email" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* <HeroBackground /> */}

      <div className="container mx-auto px-4 py-20 pt-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Content */}
          <motion.div variants={item} className="space-y-8">
            <div className="space-y-5">
              {/* Identity */}
              <motion.p
                variants={item}
                className="text-xs md:text-sm tracking-[0.2em] text-muted-foreground uppercase"
              >
                Full-Stack Developer
              </motion.p>

              {/* Headline */}
              <motion.h1
                variants={item}
                className="text-5xl font-bold tracking-tight leading-[1.05]"
              >
                Building fast, scalable <br />
                <span className="text-gradient">SaaS & real-time systems</span>
              </motion.h1>

              {/* Value + Proof */}
              <motion.p
                variants={item}
                className="text-muted-foreground text-lg max-w-xl leading-relaxed"
              >
                I design and develop production-ready web applications using
                MERN and Next.js — with a focus on performance, clean
                architecture, and real-world scalability. Develop products that
                are designed to run in production including dashboards, PWAs,
                and real-time platforms.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-4">
              <Button
                variant="gradient"
                size="lg"
                onClick={() => scrollToSection("contact")}
              >
                Start a Project
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("projects")}
              >
                See My Work
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open("/resume.pdf", "_blank")}
              >
                <Download size={18} />
                Resume
              </Button>
            </motion.div>

            {/* Trust Strip */}
            <motion.div
              variants={item}
              className="flex flex-wrap items-center gap-6 pt-2 text-sm text-muted-foreground"
            >
              <span>✔ SaaS platforms & dashboards</span>
              <span>✔ Real-time apps (WebRTC, Socket.io)</span>
              <span>✔ Full-stack architecture & APIs</span>
            </motion.div>

            {/* Social */}
            <motion.div variants={item} className="flex gap-3 pt-2">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 flex items-center justify-center rounded-lg bg-secondary hover:bg-accent transition-colors"
                  aria-label={link.label}
                >
                  <link.icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            variants={item}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-linear-to-br from-[#ff007f]/20 to-[#ff3399]/20 rounded-full blur-2xl" />
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-border shadow-2xl">
                <Image
                  src="/images/profile-image.png"
                  alt="Husnain Shakil"
                  fill
                  className="object-cover object-top hover:grayscale-0 transition-all duration-500"
                  // grayscale
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute max-lg:bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={() => scrollToSection("about")}
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Scroll to about section"
          >
            <ArrowDown size={24} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
