import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import HeroSection from '@/components/sections/HeroSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SocialLinks from '@/components/sections/SocialLinks';

// List of projects as requested
const projects = [
  { name: "Nagarik App", icon: "/icons/nagrik.svg", hint: "government mobile" },
  { name: "Ambition Guru", icon: "/icons/ambition.svg", hint: "education online learning" },
  { name: "National Path Labs", icon: "/icons/npl.svg", hint: "healthcare laboratory" },
  { name: "CPN UML App", icon: "/icons/cpnuml.svg", hint: "politics party" },
  { name: "Budhanilkantha Municipality", icon: "/icons/buda.svg", hint: "government local" },
  { name: "Kathmandu Metropolitan City", icon: "/icons/ktm.svg", hint: "government city" },
];

export default function Home() {
  return (
    <div className="space-y-16 md:space-y-24">
      <HeroSection />
      <AboutSection />
      <ProjectsSection projects={projects} />
      <SocialLinks />
      <ContactSection />
    </div>
  );
}
