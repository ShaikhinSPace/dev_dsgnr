'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
      id="about" 
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
            Process & Philosophy
          </div>
          <h2 className="text-4xl md:text-5xl text-foreground mb-8 font-light leading-tight">
            Building software that{" "}
            <span className="text-primary">scales</span>{" "}
            and endures
          </h2>
        </motion.div>

        {/* Content blocks */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div
            variants={titleVariants}
            className="content-block"
          >
            <h3 className="text-xl text-foreground mb-4">Technical Approach</h3>
            <p className="editorial-text">
              Every application begins with understanding the problem space deeply. I work with stakeholders to 
              identify core user journeys, then architect solutions that can evolve with changing requirements. 
              Whether it's React Native for cross-platform efficiency or native Swift/Kotlin for performance-critical 
              features, the technology serves the user experience.
            </p>
          </motion.div>
          
          <motion.div
            variants={titleVariants}
            className="content-block"
          >
            <h3 className="text-xl text-foreground mb-4">Collaboration & Delivery</h3>
            <p className="editorial-text">
              Working across government, healthcare, and education sectors has taught me the importance of clear 
              communication and iterative development. I believe in shipping early, gathering feedback, and 
              refining based on real user behavior rather than assumptions.
            </p>
          </motion.div>
        </div>

        {/* Technology focus */}
        <motion.div
          variants={titleVariants}
          className="border-t border-border pt-16"
        >
          <h3 className="text-2xl text-foreground mb-8">Core Technologies</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-muted-foreground">
            <div>
              <div className="text-foreground font-medium mb-2">Frontend</div>
              <div className="space-y-1 text-sm">
                <div>React Native</div>
                <div>Flutter</div>
                <div>Swift (iOS)</div>
                <div>Kotlin (Android)</div>
              </div>
            </div>
            <div>
              <div className="text-foreground font-medium mb-2">Backend</div>
              <div className="space-y-1 text-sm">
                <div>Node.js</div>
                <div>Firebase</div>
                <div>RESTful APIs</div>
                <div>Database Design</div>
              </div>
            </div>
            <div>
              <div className="text-foreground font-medium mb-2">Process</div>
              <div className="space-y-1 text-sm">
                <div>CI/CD Pipelines</div>
                <div>Automated Testing</div>
                <div>Performance Monitoring</div>
                <div>Code Review</div>
              </div>
            </div>
            <div>
              <div className="text-foreground font-medium mb-2">Design</div>
              <div className="space-y-1 text-sm">
                <div>User Research</div>
                <div>Prototyping</div>
                <div>Accessibility</div>
                <div>Design Systems</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
