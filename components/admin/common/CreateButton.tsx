"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CreateButtonProps {
  onClick: () => void;
  label: string;
}

export function CreateButton({ onClick, label }: CreateButtonProps) {
  return (
    <Button
      onClick={onClick}
      color="primary"
      className="cursor-pointer text-base"
    >
      <Plus className="h-4 w-4 mr-2" />
      {label}
    </Button>
  );
}
