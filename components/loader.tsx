"use client";
import React from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useMounted } from "@/hooks/use-mounted";

const Loader = () => {
  const mounted = useMounted();

  return mounted ? null : (
    <div className="h-screen flex items-center justify-center flex-col space-y-2 bg-background">
      {/* Logo */}
      <div className="flex gap-2 items-center">
        <div className="relative w-20 h-20">
          <Image
            src="/images/logo/logo-w-1.png"
            alt="EventsCraft Logo"
            width={80}
            height={80}
            className="w-full h-full object-contain"
            priority
          />
        </div>
        {/* <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
          EventsCraft
        </h1> */}
      </div>

      {/* Loading Spinner */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
        <span className="text-sm font-medium">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
