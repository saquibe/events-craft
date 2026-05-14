"use client";

import React from "react";
import { useConfig } from "@/hooks/use-config";
import { cn } from "@/lib/utils";

const HeaderContent = ({ children }: { children: React.ReactNode }) => {
  const [config] = useConfig();

  return (
    <header
      className={cn(
        "bg-card sticky top-0 z-50 py-4 px-6 shadow-sm",
        config.skin === "bordered" && "border-b",
      )}
    >
      <div className="flex justify-between items-center">{children}</div>
    </header>
  );
};

export default HeaderContent;
