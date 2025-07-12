'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ProjectCard from '@/components/ProjectCard';

interface Project {
  name: string;
  icon: string;
  hint: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <section 
      ref={ref}
      id="projects" 
      className="relative py-32 bg-background"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto px-8"
      >
        {/* Editorial header */}
        <motion.div variants={titleVariants} className="mb-20 relative">
          {/* Background pattern */}
          <div className="absolute -top-20 -left-20 w-40 h-40 opacity-5">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-full h-full border border-primary/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 border border-primary/10 rounded-full"
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-primary text-sm font-medium tracking-wider uppercase mb-6 relative"
          >
            Selected Work
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="absolute -bottom-1 left-0 h-px bg-primary/40"
            />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl text-foreground mb-8 font-light leading-tight">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="block"
            >
              Applications that serve{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-primary relative inline-block"
            >
              real people
              <motion.div
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1.2 }}
                className="absolute -bottom-2 left-0 w-full"
              >
                <svg viewBox="0 0 100 8" className="w-full h-2">
                  <motion.path
                    d="M 0 4 Q 50 0 100 4"
                    stroke="hsl(var(--primary))"
                    strokeWidth="1"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1.2 }}
                  />
                </svg>
              </motion.div>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="block"
            >
              solving real problems
            </motion.span>
          </h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="editorial-text max-w-3xl relative"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="absolute -left-4 top-2 w-2 h-2 bg-primary/60 rounded-full"
            />
            Each project represents a unique collaboration between design, technology, and human needs. 
            From government services that process thousands of daily transactions to healthcare platforms 
            that protect patient privacy, these applications have been built to last and scale.
          </motion.div>
        </motion.div>

        {/* Content-focused project list */}
        <motion.div
          variants={gridVariants}
          className="space-y-12"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }
                }
              }}
              className="border-b border-border pb-12 last:border-b-0 group cursor-pointer relative"
            >
              {/* Hover effect line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className="absolute top-0 left-0 h-px bg-primary/20 origin-left"
                style={{ width: '100%' }}
              />
              
              <motion.div 
                className="grid md:grid-cols-3 gap-8 items-start"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    className="absolute -left-6 top-1 w-1 h-1 bg-primary rounded-full group-hover:scale-150 transition-transform duration-300"
                  />
                  <motion.h3 
                    className="text-2xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    {project.name}
                  </motion.h3>
                  <motion.div 
                    className="text-primary text-sm font-medium relative"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    {index === 0 && "Government Services"}
                    {index === 1 && "Healthcare Platform"}
                    {index === 2 && "Education Technology"}
                    {index === 3 && "Municipal Services"}
                    {index === 4 && "Enterprise Solution"}
                    {index === 5 && "Public Service"}
                    <motion.div
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      className="absolute bottom-0 left-0 h-px bg-primary/40"
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </div>
                
                <div className="md:col-span-2">
                  <p className="editorial-text mb-6">
                    {index === 0 && "A comprehensive platform serving over 500,000 citizens with streamlined access to government services, reducing processing time from weeks to hours."}
                    {index === 1 && "Healthcare workflow management system protecting sensitive patient data while enabling efficient care coordination across multiple facilities."}
                    {index === 2 && "Educational platform connecting students, teachers, and administrators with real-time progress tracking and resource management."}
                    {index === 3 && "Municipal service application handling everything from permit applications to utility management for mid-sized cities."}
                    {index === 4 && "Enterprise mobility solution enabling remote workforce collaboration with enterprise-grade security and compliance."}
                    {index === 5 && "Public transportation system with real-time tracking, route optimization, and accessibility features for urban commuters."}
                  </p>
                  
                  <ProjectCard 
                    name={project.name} 
                    iconUrl={project.icon} 
                    hint={project.hint} 
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
