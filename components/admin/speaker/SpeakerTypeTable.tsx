"use client";

import { Button } from "@/components/ui/button";
import type { SpeakerType } from "@/lib/types/speaker";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { Badge } from "@/components/ui/badge";
import { PaginatedTable } from "@/components/paginated-table";

interface SpeakerTypeTableProps {
  types: SpeakerType[];
  onEdit: (type: SpeakerType) => void;
  onDelete: (id: string) => void;
}

export function SpeakerTypeTable({
  types,
  onEdit,
  onDelete,
}: SpeakerTypeTableProps) {
  const columns = [
    {
      key: "name",
      header: "Type Name",
      cell: (type: SpeakerType) => (
        <span className="font-medium text-foreground text-base">
          {type.name}
        </span>
      ),
    },
    {
      key: "description",
      header: "Description",
      cell: (type: SpeakerType) => (
        <span className="text-muted-foreground text-base">
          {type.description || "-"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: () => <Badge variant="default">Active</Badge>,
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (type: SpeakerType) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(type),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(type.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={types}
      columns={columns}
      searchFields={["name", "description"]}
      searchPlaceholder="Search speaker types..."
      emptyMessage="No speaker types found"
      renderHeader={() => (
        <div className="flex items-center justify-between w-full">
          <div>
            <h3 className="text-lg font-semibold">
              Speaker Types ({types.length})
            </h3>
            <p className="text-sm text-muted-foreground">
              Manage speaker categories
            </p>
          </div>
          <Button size="sm">Add New Type</Button>
        </div>
      )}
    />
  );
}
