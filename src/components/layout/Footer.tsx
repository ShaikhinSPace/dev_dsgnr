'use client'; // Needed for new Date()

import { useState, useEffect } from 'react';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-secondary text-secondary-foreground py-6 mt-16 md:mt-24 border-t-2 border-foreground"> {/* Solid background, stark border */}
      <div className="container mx-auto px-4 text-center text-sm">
        {currentYear !== null ? (
          <p>&copy; {currentYear} AppDev Portfolio. Built Functionally.</p> /* Updated text */
        ) : (
          <p>Loading year...</p>
        )}
      </div>
    </footer>
  );
};

export default Footer;
