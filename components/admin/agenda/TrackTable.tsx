"use client";

import { Track } from "@/lib/types/agenda";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { Badge } from "@/components/ui/badge";
import { PaginatedTable } from "@/components/paginated-table";

interface TrackTableProps {
  tracks: Track[];
  onEdit: (track: Track) => void;
  onDelete: (id: string) => void;
}

export function TrackTable({ tracks, onEdit, onDelete }: TrackTableProps) {
  const columns = [
    {
      key: "name",
      header: "Track Name",
      cell: (track: Track) => (
        <span className="font-medium text-foreground text-base">
          {track.name}
        </span>
      ),
    },
    {
      key: "description",
      header: "Description",
      cell: (track: Track) => (
        <span className="text-muted-foreground text-base">
          {track.description || "-"}
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
      cell: (track: Track) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(track),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(track.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={tracks}
      columns={columns}
      searchFields={["name"]}
      searchPlaceholder="Search tracks..."
      emptyMessage="No tracks found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">Tracks ({tracks.length})</h3>
        </div>
      )}
    />
  );
}
