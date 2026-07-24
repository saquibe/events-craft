"use client";

import { Badge } from "@/components/ui/badge";
import { PaginatedTable } from "@/components/paginated-table";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { CheckCircle, Mail, Star } from "lucide-react";

interface Sender {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  isDefault: boolean;
}

interface SenderEmailTableProps {
  senders: Sender[];
  onEdit: (sender: Sender) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}

export function SenderEmailTable({
  senders,
  onEdit,
  onDelete,
  onSetDefault,
}: SenderEmailTableProps) {
  const columns = [
    {
      key: "name",
      header: "Sender Name",
      cell: (sender: Sender) => (
        <span className="font-medium text-base">{sender.name}</span>
      ),
    },
    {
      key: "email",
      header: "Email Address",
      cell: (sender: Sender) => (
        <span className="text-base text-muted-foreground">{sender.email}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (sender: Sender) =>
        sender.verified ? (
          <Badge color="success" className="gap-1">
            <CheckCircle className="h-3 w-3" />
            Verified
          </Badge>
        ) : (
          <Badge color="warning" className="gap-1">
            <Mail className="h-3 w-3" />
            Pending
          </Badge>
        ),
    },
    {
      key: "default",
      header: "Default",
      cell: (sender: Sender) =>
        sender.isDefault ? (
          <Badge color="outline" className="gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            Default
          </Badge>
        ) : (
          "-"
        ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (sender: Sender) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(sender),
            },
            ...(!sender.isDefault
              ? [
                  {
                    label: "Set as Default",
                    icon: ActionIcons.activate,
                    onClick: () => onSetDefault(sender.id),
                  },
                  {
                    label: "Delete",
                    icon: ActionIcons.delete,
                    onClick: () => onDelete(sender.id),
                  },
                ]
              : []),
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={senders}
      columns={columns}
      searchFields={["name", "email"]}
      searchPlaceholder="Search sender emails..."
      emptyMessage="No sender emails found"
      renderHeader={() => (
        <h3 className="text-lg font-semibold">
          Sender Emails ({senders.length})
        </h3>
      )}
    />
  );
}
