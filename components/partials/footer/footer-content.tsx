"use client";

import React from "react";
import { useConfig } from "@/hooks/use-config";
import { cn } from "@/lib/utils";

const FooterContent = ({ children }: { children: React.ReactNode }) => {
  const [config] = useConfig();

  return (
    <footer
      className={cn(
        "bg-card border-t border-gray-100 py-4 px-6 mt-auto",
        config.skin === "bordered" && "border-t",
      )}
    >
      {children}
    </footer>
  );
};

export default FooterContent;
