"use client";

import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface QuotaItem {
  id: string;
  exhibitorId: string;
  exhibitorName: string;
  quota: number;
  startDateTime: string;
  endDateTime: string;
  status: "Active" | "Inactive";
  sendEmail: boolean;
}

interface QuotaTableProps {
  data: QuotaItem[];
  type: "badge" | "attendee" | "visitor";
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: "Active" | "Inactive") => void;
}

export function QuotaTable({
  data,
  type,
  onEdit,
  onDelete,
  onStatusChange,
}: QuotaTableProps) {
  const getTitle = () => {
    switch (type) {
      case "badge":
        return "Exhibitor Badge Quota";
      case "attendee":
        return "Attendee Registration Quota";
      case "visitor":
        return "Visitor Registration Quota";
    }
  };

  const columns = [
    {
      key: "exhibitor",
      header: "Exhibitor Name",
      cell: (item: QuotaItem) => (
        <span className="font-medium text-foreground text-base">
          {item.exhibitorName}
        </span>
      ),
    },
    {
      key: "quota",
      header: "Quota",
      cell: (item: QuotaItem) => (
        <span className="text-muted-foreground text-base">{item.quota}</span>
      ),
    },
    {
      key: "startDateTime",
      header: "Start Date & Time",
      cell: (item: QuotaItem) => (
        <span className="text-muted-foreground text-base">
          {format(new Date(item.startDateTime), "MMM dd, yyyy HH:mm")}
        </span>
      ),
    },
    {
      key: "endDateTime",
      header: "End Date & Time",
      cell: (item: QuotaItem) => (
        <span className="text-muted-foreground text-base">
          {format(new Date(item.endDateTime), "MMM dd, yyyy HH:mm")}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (item: QuotaItem) => <StatusBadge status={item.status} />,
    },
    {
      key: "sendEmail",
      header: "Send Email",
      cell: (item: QuotaItem) => (
        <Badge color={item.sendEmail ? "default" : "secondary"}>
          {item.sendEmail ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (item: QuotaItem) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(item),
            },
            {
              label: item.status === "Active" ? "Deactivate" : "Activate",
              icon:
                item.status === "Active"
                  ? ActionIcons.suspend
                  : ActionIcons.activate,
              onClick: () =>
                onStatusChange(
                  item.id,
                  item.status === "Active" ? "Inactive" : "Active",
                ),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(item.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={data}
      columns={columns}
      searchFields={["exhibitorName"]}
      searchPlaceholder="Search..."
      emptyMessage={`No ${getTitle().toLowerCase()} found`}
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            {getTitle()} ({data.length})
          </h3>
        </div>
      )}
    />
  );
}
