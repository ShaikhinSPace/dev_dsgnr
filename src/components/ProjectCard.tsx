'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Loader2, Users, Info, Download, Layers } from 'lucide-react';
import Image from 'next/image';
import { getAppDetails, type AppDetails } from '@/services/app-store';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from "@/lib/utils"; // Import cn

interface ProjectCardProps {
  name: string;
  iconUrl: string; // Keep this prop if you decide to use actual icons later
  hint: string;
}

const ProjectCard = ({ name, iconUrl, hint }: ProjectCardProps) => {
  const [appDetails, setAppDetails] = React.useState<AppDetails | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const fetchDetails = React.useCallback(async () => {
    if (appDetails || isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      // Simulate fetching real image URL based on hint if needed in future
      // For now, we still use picsum based on name/hint
      const imageUrl = `https://picsum.photos/seed/${name.replace(/\s+/g, '')}/64/64`; // Consistent image size
      const details = await getAppDetails(name);
      setAppDetails(details);
    } catch (err) {
      console.error("Failed to fetch app details:", err);
      setError("Could not load project details. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [name, appDetails, isLoading]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && !appDetails && !isLoading) {
      fetchDetails();
    }
  }

  // Generate a consistent seed for picsum based on the project name
  const imageSeed = name.replace(/\s+/g, '');

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {/* Brutalist Card Styling */}
        <Card className="border-2 border-foreground rounded-none shadow-none cursor-pointer group h-full flex flex-col bg-card"> {/* Stark border, no shadow/rounding, full height */}
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 border-b-2 border-foreground"> {/* Added bottom border */}
            <CardTitle className="text-lg font-semibold text-primary">{name}</CardTitle>
            <div className="relative h-16 w-16 flex-shrink-0 border border-foreground"> {/* Fixed size, border */}
              <Image
                  src={`https://picsum.photos/seed/${imageSeed}/64/64`} // Use seed
                  alt={`${name} icon placeholder`}
                  layout="fill"
                  objectFit="cover"
                  className="bg-muted" // Placeholder background
                  data-ai-hint={hint}
                  unoptimized // Disable optimization for picsum
              />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2 flex-grow flex flex-col justify-between"> {/* Flex grow for content */}
            <p className="text-sm text-muted-foreground mb-4 flex-grow">Click to explore my role and app insights.</p>
            <Button variant="outline" size="sm" className={cn("w-full btn-brutalist mt-auto")}> {/* Brutalist button, margin top auto */}
              View Details <Info className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-card border-2 border-foreground rounded-none shadow-none"> {/* Brutalist dialog */}
        <DialogHeader className="border-b-2 border-foreground pb-4">
          <DialogTitle className="text-2xl text-primary font-bold">{name}</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Insights into the application and my contributions.
          </DialogDescription>
        </DialogHeader>
        <div className="py-6 space-y-6">
          {isLoading && (
            <div className="space-y-4 p-4">
              <Skeleton className="h-6 w-1/3 bg-muted/50 rounded-none" />
              <Skeleton className="h-4 w-full bg-muted/50 rounded-none" />
              <Skeleton className="h-4 w-5/6 bg-muted/50 rounded-none" />
               <Skeleton className="h-6 w-1/3 mt-4 bg-muted/50 rounded-none" />
              <Skeleton className="h-4 w-full bg-muted/50 rounded-none" />
              <Skeleton className="h-4 w-full bg-muted/50 rounded-none" />
              <Skeleton className="h-4 w-4/6 bg-muted/50 rounded-none" />
               <div className="flex gap-4 pt-6">
                 <Skeleton className="h-10 flex-1 bg-muted/50 rounded-none" />
                 <Skeleton className="h-10 flex-1 bg-muted/50 rounded-none" />
              </div>
            </div>
          )}
          {error && (
            <div className="flex flex-col items-center justify-center p-8 bg-destructive/10 border-2 border-destructive text-destructive rounded-none">
              <Layers className="h-10 w-10 mb-2" />
              <p className="text-center font-medium">{error}</p>
            </div>
          )}
          {appDetails && !isLoading && (
            <div className="space-y-5">
              <div>
                <h4 className="font-semibold text-primary mb-1.5 flex items-center gap-2 text-lg"><Users className="h-5 w-5 text-accent"/> User Impact</h4>
                <p className="text-foreground/90 pl-7 text-base">{appDetails.userBase.toLocaleString()} estimated downloads/active users.</p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-1.5 flex items-center gap-2 text-lg"><Info className="h-5 w-5 text-accent"/> My Contribution</h4>
                <p className="text-foreground/90 pl-7 text-base leading-normal">{appDetails.contributionDetails}</p> {/* Standard leading */}
              </div>
              {/* Placeholder download links - Brutalist style */}
              <div className="flex flex-col sm:flex-row gap-4 pt-5">
                 <Button variant="outline" className={cn("flex-1 btn-brutalist")}>
                    <Download className="mr-2 h-4 w-4" /> Google Play (Example)
                </Button>
                 <Button variant="outline" className={cn("flex-1 btn-brutalist")}>
                    <Download className="mr-2 h-4 w-4" /> App Store (Example)
                 </Button>
              </div>
            </div>
          )}
        </div>
        <DialogFooter className="border-t-2 border-foreground pt-4">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="rounded-none hover:bg-muted">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectCard;
