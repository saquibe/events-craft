"use client";

import { AttendeeProfile } from "@/lib/types/onsite";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";

interface AttendeeProfileTableProps {
  profiles: AttendeeProfile[];
  onEdit: (profile: AttendeeProfile) => void;
}

export function AttendeeProfileTable({
  profiles,
  onEdit,
}: AttendeeProfileTableProps) {
  const columns = [
    {
      key: "name",
      header: "Profile Name",
      cell: (profile: AttendeeProfile) => (
        <div>
          <span className="font-medium text-foreground text-base">
            {profile.name}
          </span>
          {/* {profile.isDefault && (
            <span className="ml-2 text-xs bg-primary/10 text-default px-2 py-0.5 rounded-full">
              Default
            </span>
          )} */}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (profile: AttendeeProfile) => (
        <StatusBadge status={profile.status} />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (profile: AttendeeProfile) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(profile),
            },
            ...(!profile.canDelete && !profile.isDefault
              ? [
                  {
                    label: "Delete",
                    icon: ActionIcons.delete,
                    onClick: () => {},
                    variant: "destructive" as const,
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
      data={profiles}
      columns={columns}
      searchFields={["name"]}
      searchPlaceholder="Search profiles..."
      emptyMessage="No profiles found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Attendee Profiles ({profiles.length})
          </h3>
          <p className="text-sm text-muted-foreground">
            Default profiles cannot be deleted
          </p>
        </div>
      )}
    />
  );
}
