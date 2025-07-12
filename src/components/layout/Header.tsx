'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: "#about", label: "Process" },
    { href: "#projects", label: "Work" },
    { href: "#contact", label: "Connect" }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          
          {/* Minimal mark */}
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200">
            Work & Process
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.href} className="relative">
                  <Link 
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium relative group py-2 block"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <div className="absolute inset-0 bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-300 rounded" />
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors duration-200"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-border">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-muted-foreground hover:text-foreground transition-colors duration-200 py-2 font-medium"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
