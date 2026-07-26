"use client";

import { OnsiteKey } from "@/lib/types/onsite";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";

interface OnsiteKeyTableProps {
  keys: OnsiteKey[];
  onEdit: (key: OnsiteKey) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: OnsiteKey["status"]) => void;
}

export function OnsiteKeyTable({
  keys,
  onEdit,
  onDelete,
  onStatusChange,
}: OnsiteKeyTableProps) {
  const columns = [
    {
      key: "userName",
      header: "User / Team Name",
      cell: (key: OnsiteKey) => (
        <span className="font-medium text-foreground text-base">
          {key.userName}
        </span>
      ),
    },
    {
      key: "loginKey",
      header: "Login Key",
      cell: (key: OnsiteKey) => (
        <span className="text-muted-foreground text-base font-mono">
          {key.loginKey}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (key: OnsiteKey) => <StatusBadge status={key.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (key: OnsiteKey) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(key),
            },
            {
              label: key.status === "Active" ? "Suspend" : "Activate",
              icon:
                key.status === "Active"
                  ? ActionIcons.suspend
                  : ActionIcons.activate,
              onClick: () =>
                onStatusChange(
                  key.id,
                  key.status === "Active" ? "Inactive" : "Active",
                ),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(key.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={keys}
      columns={columns}
      searchFields={["userName", "loginKey"]}
      searchPlaceholder="Search keys..."
      emptyMessage="No onsite keys found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">Onsite Keys ({keys.length})</h3>
        </div>
      )}
    />
  );
}
