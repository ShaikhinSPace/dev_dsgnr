'use client';

import { buttonVariants } from "@/components/ui/button"; // Import buttonVariants
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Send } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils"; // Import cn

const ContactSection = () => {
  // Replace with your actual email address
  const emailAddress = "your.email@example.com";

  return (
    <section id="contact" className="scroll-mt-20 py-16 md:py-24"> {/* Standard padding */}
      <Card className="max-w-2xl mx-auto border-2 border-foreground rounded-none shadow-none p-6 md:p-8 bg-card"> {/* Stark border, no shadow/rounding/gradient */}
          <CardHeader className="text-center p-0 mb-6">
            <Mail className="mx-auto h-12 w-12 text-accent mb-4" /> {/* Simple icon */}
            <CardTitle className="text-3xl md:text-4xl font-bold text-primary">Let's Build Something</CardTitle> {/* Primary color title */}
            <CardDescription className="text-lg text-muted-foreground pt-3">
              Have a project or want to connect?
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center p-0">
            <p className="mb-8 text-foreground/90 text-base md:text-lg leading-normal"> {/* Standard leading */}
              I focus on bringing mobile ideas to life. If you have a question, proposal, or want to discuss tech, feel free to reach out.
            </p>
            {/* Apply button styles directly to Link */}
            <Link
              href={`mailto:${emailAddress}`}
              className={cn(
                buttonVariants({ size: "lg" }),
                "btn-brutalist-primary px-8 py-3 text-base group" // Add brutalist styles
              )}
            >
              <span className="flex items-center justify-center">
                 Send Email <Send className="ml-2 h-5 w-5" /> {/* Simple icon */}
              </span>
            </Link>
             <p className="text-sm text-muted-foreground mt-6">
              Or find me via the social links provided.
            </p>
          </CardContent>
      </Card>
    </section>
  );
};

export default ContactSection;
