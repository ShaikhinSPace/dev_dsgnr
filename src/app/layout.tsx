import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster
import Header from '@/components/layout/Header'; // Import Header
import Footer from '@/components/layout/Footer'; // Import Footer
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: 'Sameer Alam Shaikh | Developer | Designer', // Enhanced title
  description: 'Portfolio of a passionate Mobile App Developer crafting unique and engaging digital experiences.', // Enhanced description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      {/* Removed whitespace between <html> and <body> */}
      <body className={cn(
        "min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 font-sans antialiased flex flex-col", // Subtle gradient background
        GeistSans.variable
      )}>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12 md:py-16"> {/* Adjusted padding */}
          {children}
        </main>
        <Footer />
        <Toaster /> {/* Add Toaster component */}
      </body>
    </html>
  );
}
