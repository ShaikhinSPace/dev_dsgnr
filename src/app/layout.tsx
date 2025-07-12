import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SmoothScrollProvider } from '@/lib/smooth-scroll';
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: 'Mobile Developer | Building Software That Moves Millions',
  description: 'Mobile applications serving over 1 million users across government, healthcare, and education sectors. Technical expertise in React Native, Flutter, and native development.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn(
        "min-h-screen bg-background text-foreground font-sans antialiased flex flex-col overflow-x-hidden dark",
        GeistSans.variable
      )}>
        <SmoothScrollProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
