'use client';

import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-start justify-center pt-20 md:pt-32 bg-background">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        {/* Editorial-style intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 relative"
        >
          {/* Floating accent elements - hidden on mobile */}
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 2, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="hidden md:block absolute -top-4 -left-4 w-24 h-24 bg-primary/5 rounded-full blur-xl"
          />
          <motion.div
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, -3, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="hidden md:block absolute top-20 -right-8 w-32 h-32 bg-primary/3 rounded-full blur-2xl"
          />
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-primary text-sm font-medium tracking-wider uppercase mb-6 relative"
          >
            <span className="relative z-10">Digital Craftsman</span>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute bottom-0 left-0 h-0.5 bg-primary/30"
            />
          </motion.div>
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground mb-8 leading-[0.9] font-light relative">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="block"
            >
              Building software that moves{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-primary relative inline-block"
            >
              millions
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute -inset-2 bg-primary/10 rounded-lg -z-10"
              />
            </motion.span>
          </h1>
        </motion.div>

        {/* Content-focused description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20"
        >
          <motion.div 
            className="content-block group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3 
              className="text-xl text-foreground mb-4 relative"
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
            >
              The Work
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary origin-left"
              />
            </motion.h3>
            <p className="editorial-text">
              Six mobile applications serving over one million active users across government, healthcare, and education. 
              Each project represents months of thoughtful problem-solving, user research, and technical iteration.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full"
            />
          </motion.div>
          
          <motion.div 
            className="content-block group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3 
              className="text-xl text-foreground mb-4 relative"
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
            >
              The Impact
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary origin-left"
              />
            </motion.h3>
            <p className="editorial-text">
              From streamlining government services to digitizing healthcare workflows, these applications have fundamentally 
              changed how people interact with essential services in their daily lives.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full"
            />
          </motion.div>
        </motion.div>

        {/* Creative navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col space-y-1 text-muted-foreground relative"
        >
          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60px" }}
            transition={{ duration: 1, delay: 1.5 }}
            className="h-px bg-primary/30 mb-6 md:mb-4"
          />
          
          {[
            { href: "#projects", text: "View selected work", delay: 0.1 },
            { href: "#about", text: "Read about the process", delay: 0.2 },
            { href: "#contact", text: "Start a conversation", delay: 0.3 }
          ].map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + link.delay }}
            >
              <Link
                href={link.href}
                className="group text-base md:text-lg hover:text-primary transition-all duration-300 py-2 block relative overflow-hidden"
              >
                <motion.span
                  className="relative z-10"
                  whileHover={{ x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  → {link.text}
                </motion.span>
                <motion.div
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  className="absolute inset-0 bg-primary/5 -z-10"
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
