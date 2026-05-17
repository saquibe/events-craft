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
      "inline-flex items-center justify-center whitespace-nowrap px-3 py-2 text-base font-medium transition-all cursor-pointer",
      "hover:bg-gray-100 dark:hover:bg-gray-800",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:text-black dark:data-[state=active]:text-white",
      "data-[state=active]:font-bold",
      "data-[state=active]:border-b-4 data-[state=active]:border-primary",
      "data-[state=active]:bg-transparent",
      "data-[state=active]:hover:bg-transparent",
      "bg-transparent shadow-none rounded-none", // Added rounded-none to remove curve
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
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
SimpleTabsContent.displayName = "SimpleTabsContent";

export { SimpleTabs, SimpleTabsList, SimpleTabsTrigger, SimpleTabsContent };
