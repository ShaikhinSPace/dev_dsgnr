'use client';

import ProjectCard from '@/components/ProjectCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"; // Import Carousel components

interface Project {
  name: string;
  icon: string;
  hint: string; // Added hint for placeholder images
}

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  return (
    <section id="projects" className="scroll-mt-20 py-16 md:py-24 border-b-2 border-foreground"> {/* Stark border */}
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-primary"> {/* Primary color title */}
        Showcase of Work
      </h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto" // Adjust max-width as needed
      >
        <CarouselContent>
          {projects.map((project, index) => (
            <CarouselItem key={project.name} className="md:basis-1/2 lg:basis-1/3 p-4"> {/* Adjust basis for responsiveness */}
                <ProjectCard name={project.name} iconUrl={project.icon} hint={project.hint} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="border-foreground text-foreground hover:bg-muted" />
        <CarouselNext className="border-foreground text-foreground hover:bg-muted" />
      </Carousel>
       {/* Removed style jsx block */}
    </section>
  );
};

export default ProjectsSection;
