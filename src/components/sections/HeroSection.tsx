'use client';

import { buttonVariants } from "@/components/ui/button"; // Import buttonVariants
import { ArrowDown, Smartphone } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils"; // Import cn for conditional classes

const HeroSection = () => {
  return (
    <section id="hero" className="text-center py-20 md:py-32 min-h-[60vh] flex flex-col justify-center items-center bg-background border-b-2 border-foreground rounded-none overflow-hidden relative"> {/* Stark border, no rounding/gradient */}
      {/* Optional: Add simple geometric shapes if needed, but keep minimal */}
      {/* <div className="absolute inset-0 -z-10 overflow-hidden opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary rounded-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-accent rounded-none transform rotate-12"></div>
      </div> */}

      <Smartphone className="mx-auto h-16 w-16 text-primary mb-6" /> {/* Simple icon */}
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-5 text-primary tracking-tighter"> {/* Bolder, tighter tracking */}
        Creative Mobile Developer
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-normal"> {/* Standard leading */}
        Building functional and engaging mobile applications for iOS & Android.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {/* Apply button styles directly to Link */}
        <Link
          href="#projects"
          className={cn(
            buttonVariants({ size: "lg" }),
            "btn-brutalist-primary group" // Add brutalist styles
          )}
        >
           <span className="flex items-center justify-center">
             Explore Work <ArrowDown className="ml-2 h-5 w-5" />
           </span>
        </Link>
         {/* Apply button styles directly to Link */}
        <Link
          href="#contact"
          className={cn(
             buttonVariants({ variant: "outline", size: "lg" }),
             "btn-brutalist" // Add brutalist styles
          )}
        >
           Contact Me
        </Link>
      </div>
       {/* Scroll down indicator removed for simplicity */}
    </section>
  );
};

export default HeroSection;
