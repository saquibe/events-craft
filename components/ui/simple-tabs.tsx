"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const SimpleTabs = TabsPrimitive.Root;

const SimpleTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <div className="flex justify-center">
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-6 bg-transparent",
        className,
      )}
      {...props}
    />
  </div>
));
SimpleTabsList.displayName = "SimpleTabsList";

const SimpleTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap px-0 py-2 text-base font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none bg-transparent shadow-none",
      className,
    )}
    {...props}
  />
));
SimpleTabsTrigger.displayName = "SimpleTabsTrigger";

const SimpleTabsContent = TabsPrimitive.Content;

export { SimpleTabs, SimpleTabsList, SimpleTabsTrigger, SimpleTabsContent };
