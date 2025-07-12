'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const emailAddress = "sameer@example.com";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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
      id="contact" 
      className="relative py-32 bg-background"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto px-8"
      >
        {/* Editorial header */}
        <motion.div variants={titleVariants} className="mb-20">
          <div className="text-primary text-sm font-medium tracking-wider uppercase mb-6">
            Get In Touch
          </div>
          <h2 className="text-4xl md:text-5xl text-foreground mb-8 font-light leading-tight">
            Let's build something{" "}
            <span className="text-primary">meaningful</span>{" "}
            together
          </h2>
          <div className="editorial-text max-w-3xl">
            Whether you're looking to build a new mobile application, improve an existing one, 
            or need consultation on mobile strategy, I'm interested in projects that make a 
            real difference in people's lives.
          </div>
        </motion.div>

        {/* Content blocks */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div
            variants={titleVariants}
            className="content-block group cursor-pointer"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3 
              className="text-xl text-foreground mb-4 relative"
              whileHover={{ x: 10 }}
            >
              What I'm Looking For
              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                className="absolute -bottom-1 left-0 h-0.5 bg-primary origin-left"
                transition={{ duration: 0.3 }}
              />
            </motion.h3>
            <div className="editorial-text space-y-3">
              {[
                "Mobile applications with social impact",
                "Complex technical challenges", 
                "Long-term partnerships",
                "Teams that value quality over speed"
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center group-hover:text-primary transition-colors duration-300"
                >
                  <motion.div
                    className="w-1 h-1 bg-primary rounded-full mr-3"
                    whileInView={{ scale: [0, 1.2, 1] }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  />
                  • {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            variants={titleVariants}
            className="content-block group cursor-pointer"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3 
              className="text-xl text-foreground mb-4 relative"
              whileHover={{ x: 10 }}
            >
              How I Work
              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                className="absolute -bottom-1 left-0 h-0.5 bg-primary origin-left"
                transition={{ duration: 0.3 }}
              />
            </motion.h3>
            <div className="editorial-text space-y-3">
              {[
                "Discovery and requirements gathering",
                "Iterative development with regular check-ins",
                "Transparent communication throughout", 
                "Post-launch support and optimization"
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center group-hover:text-primary transition-colors duration-300"
                >
                  <motion.div
                    className="w-1 h-1 bg-primary rounded-full mr-3"
                    whileInView={{ scale: [0, 1.2, 1] }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  />
                  • {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Contact methods */}
        <motion.div
          variants={titleVariants}
          className="border-t border-border pt-16"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-foreground font-medium mb-2">Email</div>
              <Link 
                href={`mailto:${emailAddress}`}
                className="text-primary hover:text-primary/80 transition-colors duration-200"
              >
                {emailAddress}
              </Link>
            </div>
            
            <div>
              <div className="text-foreground font-medium mb-2">LinkedIn</div>
              <Link 
                href="https://linkedin.com/in/yourprofile"
                className="text-primary hover:text-primary/80 transition-colors duration-200"
              >
                Professional network
              </Link>
            </div>
            
            <div>
              <div className="text-foreground font-medium mb-2">Response Time</div>
              <div className="text-muted-foreground">24-48 hours</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
