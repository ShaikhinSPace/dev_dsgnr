'use client';

import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background border-t border-border py-16">
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
        >
          <div>
            <div className="text-primary text-xs font-medium tracking-wider uppercase mb-2">
              Digital Craftsman
            </div>
            <div className="text-muted-foreground text-sm">
              Building mobile applications that serve real people
            </div>
          </div>

          <div className="text-right">
            <div className="text-muted-foreground text-sm mb-1">
              &copy; {currentYear} — All work speaks for itself
            </div>
            <div className="text-xs text-muted-foreground/70">
              Made with Next.js + Royal Blue
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
