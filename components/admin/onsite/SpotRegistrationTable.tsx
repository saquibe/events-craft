"use client";

import { Badge } from "@/components/ui/badge";
import { PaginatedTable } from "@/components/paginated-table";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { SpotRegistration } from "@/lib/types/onsite";

interface SpotRegistrationTableProps {
  registrations: SpotRegistration[];
  onEdit: (registration: SpotRegistration) => void;
  onDelete: (id: string) => void;
  onSendQR: (id: string) => void;
}

export default function SpotRegistrationTable({
  registrations,
  onEdit,
  onDelete,
  onSendQR,
}: SpotRegistrationTableProps) {
  const columns = [
    {
      key: "regNo",
      header: "Reg No.",
      cell: (registration: SpotRegistration) => (
        <span className="font-medium text-foreground text-base">
          {registration.regNo}
        </span>
      ),
    },
    {
      key: "name",
      header: "Name",
      cell: (registration: SpotRegistration) => (
        <div>
          <p className="font-medium text-foreground text-base">
            {registration.prefix} {registration.firstName}{" "}
            {registration.lastName}
          </p>
          <p className="text-sm text-muted-foreground">{registration.email}</p>
        </div>
      ),
    },
    {
      key: "mobile",
      header: "Mobile",
      cell: (registration: SpotRegistration) => (
        <span className="text-muted-foreground text-base">
          {registration.mobile || "-"}
        </span>
      ),
    },
    {
      key: "profile",
      header: "Profile",
      cell: (registration: SpotRegistration) => (
        <Badge color="secondary" className="text-xs">
          {registration.attendeeProfile?.name || "-"}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (registration: SpotRegistration) => (
        <Badge
          color={registration.status === "Active" ? "success" : "secondary"}
          className="text-xs"
        >
          {registration.status}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (registration: SpotRegistration) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(registration),
            },
            {
              label: "Send QR",
              icon: ActionIcons.resendInvite,
              onClick: () => onSendQR(registration.id),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(registration.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={registrations}
      columns={columns}
      searchFields={["firstName", "lastName", "email", "regNo"]}
      searchPlaceholder="Search registrations..."
      emptyMessage="No spot registrations found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Spot Registrations ({registrations.length})
          </h3>
        </div>
      )}
    />
  );
}
