'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const socialLinks = [
  { 
    name: "GitHub", 
    url: "https://github.com/ShaikhinSPace", 
    description: "Open source contributions"
  },
  { 
    name: "LinkedIn", 
    url: "https://linkedin.com/in/yourprofile", 
    description: "Professional connections"
  },
  { 
    name: "Email", 
    url: "mailto:sameer@example.com", 
    description: "Direct communication"
  }
];

const SocialLinks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section 
      ref={ref}
      id="social" 
      className="relative py-20 bg-background"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto px-8"
      >
        <motion.div variants={titleVariants} className="mb-16">
          <div className="text-primary text-sm font-medium tracking-wider uppercase mb-6">
            Connect
          </div>
          <h2 className="text-3xl md:text-4xl text-foreground font-light leading-tight">
            Find me across the{" "}
            <span className="text-primary">digital landscape</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="space-y-6"
        >
          {socialLinks.map((social, index) => (
            <motion.div
              key={social.name}
              variants={titleVariants}
              className="border-b border-border pb-6 last:border-b-0"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl text-foreground mb-2">{social.name}</h3>
                  <p className="text-muted-foreground">{social.description}</p>
                </div>
                <Link
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors duration-200 text-sm font-medium"
                >
                  Visit →
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SocialLinks;
