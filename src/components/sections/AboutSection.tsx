'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Settings, Users, Cpu, Palette, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

// Placeholder Icons defined before usage
const DatabaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
  </svg>
);
const ServerIcon = (props: React.SVGProps<SVGSVGElement>) => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
   <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
   <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
   <line x1="6" y1="6" x2="6.01" y2="6"></line>
   <line x1="6" y1="18" x2="6.01" y2="18"></line>
 </svg>
);
const PlugZapIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
    <path d="M18 8h2a2 2 0 012 2v4a2 2 0 01-2 2h-2"></path>
  </svg>
);
const GitBranchIcon = (props: React.SVGProps<SVGSVGElement>) => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
   <line x1="6" y1="3" x2="6" y2="15"></line>
   <circle cx="18" cy="6" r="3"></circle>
   <circle cx="6" cy="18" r="3"></circle>
   <path d="M18 9a9 9 0 01-9 9"></path>
 </svg>
);
const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);


const skills = [
  { name: "React Native", Icon: Rocket },
  { name: "Flutter", Icon: Rocket },
  { name: "Swift (iOS)", Icon: Cpu },
  { name: "Kotlin (Android)", Icon: Cpu },
  { name: "Firebase", Icon: DatabaseIcon }, // Now defined above
  { name: "Node.js", Icon: ServerIcon }, // Now defined above
  { name: "UI/UX Design", Icon: Palette },
  { name: "API Integration", Icon: PlugZapIcon }, // Now defined above
  { name: "State Management", Icon: GitBranchIcon }, // Now defined above
  { name: "Testing", Icon: CheckCircleIcon }, // Now defined above
];

const AboutSection = () => {
  return (
    <section id="about" className="scroll-mt-20 py-16 md:py-24 border-b-2 border-foreground"> {/* Stark border */}
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-primary"> {/* Primary color title */}
        About Me
      </h2>
      <div className="grid lg:grid-cols-5 gap-8 items-start">
        {/* Left Card - Background */}
        <Card className="lg:col-span-3 border-2 border-foreground rounded-none shadow-none p-4"> {/* Stark border, no shadow/rounding */}
          <CardHeader className="p-0 mb-4">
            <CardTitle className="flex items-center gap-3 text-primary text-2xl">
              <Lightbulb className="h-7 w-7 text-accent" /> {/* Simple icon */}
              My Journey & Philosophy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90 text-base md:text-lg leading-normal p-0"> {/* Standard leading, no padding */}
            <p>
              Greetings! I'm a Mobile App Developer focused on creating high-quality, user-centric digital experiences for iOS and Android. My work involves bridging innovative ideas with functional mobile realities.
            </p>
            <p>
              With experience in the mobile landscape, I handle complexity and transform challenges into efficient solutions. My process covers the entire lifecycle – from idea and design to development, deployment, and refinement.
            </p>
            <p>
              I prioritize clean, scalable code, intuitive interfaces, and continuous learning to stay current with mobile technology. Building apps is my primary professional focus.
            </p>
          </CardContent>
        </Card>

        {/* Right Card - Skills */}
        <Card className="lg:col-span-2 border-2 border-foreground rounded-none shadow-none p-4"> {/* Stark border, no shadow/rounding */}
          <CardHeader className="p-0 mb-4">
             <CardTitle className="flex items-center gap-3 text-primary text-2xl">
               <Settings className="h-7 w-7 text-accent" /> {/* Simple icon */}
               Skills & Expertise
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0"> {/* No padding */}
            <div className="flex flex-wrap gap-2 mb-6"> {/* Standard gap */}
              {skills.map(({ name, Icon }) => (
                <Badge key={name} variant="outline" className="text-sm border-foreground hover:bg-muted flex items-center gap-1.5 px-3 py-1 rounded-none"> {/* Starker badge */}
                  <Icon className="h-4 w-4" />
                  {name}
                </Badge>
              ))}
            </div>
             <div className="space-y-3 text-foreground/90 text-base"> {/* Standard spacing */}
                <p className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Collaborative and experienced in Agile environments.</p>
                <p className="flex items-center gap-2"><Cpu className="h-5 w-5 text-primary" /> Proficient in cross-platform & native development.</p>
                <p className="flex items-center gap-2"><Lightbulb className="h-5 w-5 text-primary" /> Strong problem-solving and debugging skills.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AboutSection;
