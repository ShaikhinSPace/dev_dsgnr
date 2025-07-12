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
        <button className="text-left w-auto inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-200 font-medium text-sm">
          View technical details →
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-background border border-border rounded-xl">
        <DialogHeader className="border-b border-border pb-6">
          <DialogTitle className="text-2xl font-medium text-foreground">{name}</DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            Technical implementation and impact metrics
          </DialogDescription>
        </DialogHeader>
        <div className="py-6 space-y-6">
          {isLoading && (
            <div className="space-y-4">
              <Skeleton className="h-4 w-1/3 bg-muted" />
              <Skeleton className="h-3 w-full bg-muted" />
              <Skeleton className="h-3 w-5/6 bg-muted" />
              <Skeleton className="h-4 w-1/3 mt-6 bg-muted" />
              <Skeleton className="h-3 w-full bg-muted" />
              <Skeleton className="h-3 w-4/6 bg-muted" />
              <div className="flex gap-3 pt-6">
                <Skeleton className="h-9 flex-1 bg-muted" />
                <Skeleton className="h-9 flex-1 bg-muted" />
              </div>
            </div>
          )}
          {error && (
            <div className="flex flex-col items-center justify-center p-8 bg-destructive/5 border border-destructive/20 text-destructive rounded-lg">
              <Layers className="h-8 w-8 mb-2" />
              <p className="text-center text-sm">{error}</p>
            </div>
          )}
          {appDetails && !isLoading && (
            <div className="space-y-6">
              <div className="content-block">
                <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  User Impact
                </h4>
                <p className="editorial-text">
                  {appDetails.userBase.toLocaleString()} estimated downloads/active users across app stores.
                </p>
              </div>
              
              <div className="content-block">
                <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Technical Contribution
                </h4>
                <p className="editorial-text">
                  {appDetails.contributionDetails}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1 bg-background border-border text-foreground hover:bg-primary hover:text-primary-foreground"
                >
                  <Download className="mr-2 h-4 w-4" /> 
                  Google Play
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1 bg-background border-border text-foreground hover:bg-primary hover:text-primary-foreground"
                >
                  <Download className="mr-2 h-4 w-4" /> 
                  App Store
                </Button>
              </div>
            </div>
          )}
        </div>
        <DialogFooter className="border-t border-border pt-6">
          <DialogClose asChild>
            <Button 
              type="button" 
              variant="ghost" 
              className="text-muted-foreground hover:text-foreground"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectCard;
