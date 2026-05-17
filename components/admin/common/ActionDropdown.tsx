"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  Archive,
  Mail,
  Reply,
} from "lucide-react";

interface ActionItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "destructive";
}

interface ActionDropdownProps {
  actions: ActionItem[];
}

export function ActionDropdown({ actions }: ActionDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="cursor-pointer">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover border-border">
        {actions.map((action, index) => (
          <DropdownMenuItem
            key={index}
            onClick={action.onClick}
            className={
              action.variant === "destructive"
                ? "text-destructive cursor-pointer"
                : "cursor-pointer"
            }
          >
            {action.icon}
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Pre-defined action icons for convenience
export const ActionIcons = {
  edit: <Edit className="h-4 w-4 mr-2" />,
  delete: <Trash2 className="h-4 w-4 mr-2" />,
  publish: <CheckCircle className="h-4 w-4 mr-2" />,
  draft: <Clock className="h-4 w-4 mr-2" />,
  suspend: <Archive className="h-4 w-4 mr-2" />,
  activate: <CheckCircle className="h-4 w-4 mr-2" />,
  resendInvite: <Mail className="h-4 w-4 mr-2" />,
  reply: <Reply className="h-4 w-4 mr-2" />,
};
