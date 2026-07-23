"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const SimpleTabs = TabsPrimitive.Root;

const SimpleTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <div className="w-full overflow-x-auto scrollbar-thin pb-1 md:pb-0">
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "flex w-max md:w-full items-center gap-2 md:gap-6 bg-transparent",
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
      "inline-flex items-center justify-center shrink-0 whitespace-nowrap",
      "px-3 md:px-4 py-2",
      "text-sm md:text-base font-semibold",
      "cursor-pointer",
      "text-muted-foreground",
      "border-b-2 md:border-b-[3px] border-transparent",
      "transition-colors duration-200",
      "hover:text-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:text-foreground",
      "data-[state=active]:border-primary",
      className,
    )}
    {...props}
  />
));
SimpleTabsTrigger.displayName = "SimpleTabsTrigger";

const SimpleTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 md:mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
SimpleTabsContent.displayName = "SimpleTabsContent";

export { SimpleTabs, SimpleTabsList, SimpleTabsTrigger, SimpleTabsContent };
