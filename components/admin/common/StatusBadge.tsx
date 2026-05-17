"use client";

import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

const statusColorMap: Record<string, string> = {
  // Event statuses
  Draft: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  Published:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Completed: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Draft Deleted":
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  // Team statuses
  active:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  inactive: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  // Venue statuses
  Active:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Inactive: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  // Ticket statuses
  Open: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  "In Progress":
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Closed:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge className={statusColorMap[status] || "bg-gray-100 text-gray-700"}>
      {status}
    </Badge>
  );
}
