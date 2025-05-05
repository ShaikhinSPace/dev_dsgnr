'use client';

import { buttonVariants } from "@/components/ui/button"; // Import buttonVariants
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils"; // Import cn

const socialLinks = [
  { name: "GitHub", url: "https://github.com/yourusername", Icon: Github }, // Replace with actual URL
  { name: "LinkedIn", url: "https://linkedin.com/in/yourusername", Icon: Linkedin }, // Replace with actual URL
  { name: "Twitter", url: "https://twitter.com/yourusername", Icon: Twitter }, // Replace with actual URL
  { name: "Email", url: "mailto:your.email@example.com", Icon: Mail }, // Added Email link
];

const SocialLinks = () => {
  return (
    <section id="social" className="text-center py-16 md:py-20 bg-secondary border-y-2 border-foreground rounded-none"> {/* Stark borders, no rounding */}
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">Connect With Me</h2> {/* Primary color title */}
      <div className="flex justify-center gap-4 md:gap-6"> {/* Adjusted gap */}
        {socialLinks.map(({ name, url, Icon }) => (
           // Apply button styles directly to Link
          <Link
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Link to ${name}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "border-2 border-foreground text-foreground hover:bg-muted hover:text-foreground transition-colors duration-150 w-12 h-12 rounded-sm shadow-none hover:shadow-none transform-none hover:scale-100" // Starker border, slight rounding, no shadow/scale
            )}
          >
            <Icon className="h-6 w-6" /> {/* Slightly smaller icon */}
          </Link>
        ))}
      </div>
       {/* No <style jsx> here */}
    </section>
  );
};

export default SocialLinks;
