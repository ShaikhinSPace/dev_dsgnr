import Link from 'next/link';
import { Code } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground border-b-2 border-foreground sticky top-0 z-50"> {/* Solid background, stark border */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold group transition-colors duration-200"> {/* Simple link */}
          <Code className="h-7 w-7 text-accent transition-transform duration-200" /> {/* Simple icon */}
          <span>AppDev Portfolio</span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="#about" className="hover:text-accent transition-colors duration-200 pb-1 border-b-2 border-transparent hover:border-accent">About</Link></li> {/* Simple hover effect */}
            <li><Link href="#projects" className="hover:text-accent transition-colors duration-200 pb-1 border-b-2 border-transparent hover:border-accent">Projects</Link></li> {/* Simple hover effect */}
            <li><Link href="#contact" className="hover:text-accent transition-colors duration-200 pb-1 border-b-2 border-transparent hover:border-accent">Contact</Link></li> {/* Simple hover effect */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
