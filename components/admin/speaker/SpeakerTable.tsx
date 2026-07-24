"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "../common/StatusBadge";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import type { Speaker } from "@/lib/types/speaker";
import { getSpeakerTypeName } from "@/lib/data/speaker-types";
import { PaginatedTable } from "@/components/paginated-table";

interface SpeakerTableProps {
  speakers: Speaker[];
  onEdit: (speaker: Speaker) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Speaker["status"]) => void;
  onResendInvite: (id: string) => void;
}

export function SpeakerTable({
  speakers,
  onEdit,
  onDelete,
  onStatusChange,
  onResendInvite,
}: SpeakerTableProps) {
  const columns = [
    {
      key: "name",
      header: "Name",
      cell: (speaker: Speaker) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={speaker.profilePhoto} className="object-cover" />
            <AvatarFallback>
              {/* {speaker.firstName[0]}
              {speaker.lastName[0]} */}
              <img src="/images/users/user7.jpg" alt="" />
            </AvatarFallback>
          </Avatar>
          <div>
            <span className="font-medium text-foreground text-base">
              {speaker.prefix} {speaker.firstName} {speaker.lastName}
            </span>
            <p className="text-sm text-muted-foreground">{speaker.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "registration",
      header: "Registration",
      cell: (speaker: Speaker) => (
        <span className="text-muted-foreground text-base">
          {speaker.registrationId || "REG001"}
        </span>
      ),
    },
    {
      key: "mobile",
      header: "Mobile",
      cell: (speaker: Speaker) => (
        <span className="text-muted-foreground text-base">
          {speaker.mobile || "-"}
        </span>
      ),
    },
    {
      key: "designation",
      header: "Designation",
      cell: (speaker: Speaker) => (
        <span className="text-muted-foreground text-base">
          {speaker.designation || "-"}
        </span>
      ),
    },
    {
      key: "company",
      header: "Company",
      cell: (speaker: Speaker) => (
        <span className="text-muted-foreground text-base">
          {speaker.company || "-"}
        </span>
      ),
    },
    {
      key: "type",
      header: "Type",
      cell: (speaker: Speaker) => (
        <span className="text-muted-foreground text-base">
          {getSpeakerTypeName(speaker.speakerTypeId)}
        </span>
      ),
    },
    {
      key: "invitation",
      header: "Invitation",
      cell: (speaker: Speaker) => (
        <span
          className={`text-base ${speaker.speakerAcceptance ? "text-green-600" : "text-yellow-600"}`}
        >
          {speaker.speakerAcceptance ? "Accepted" : "Pending"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (speaker: Speaker) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(speaker),
            },
            {
              label: "Resend Invitation",
              icon: ActionIcons.resendInvite,
              onClick: () => onResendInvite(speaker.id),
            },
            {
              label: speaker.status === "registered" ? "Suspend" : "Activate",
              icon:
                speaker.status === "registered"
                  ? ActionIcons.suspend
                  : ActionIcons.activate,
              onClick: () =>
                onStatusChange(
                  speaker.id,
                  speaker.status === "registered" ? "pending" : "registered",
                ),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={speakers}
      columns={columns}
      searchFields={[
        "firstName",
        "lastName",
        "email",
        "designation",
        "company",
      ]}
      searchPlaceholder="Search speakers..."
      emptyMessage="No speakers found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Speakers ({speakers.length})
          </h3>
        </div>
      )}
    />
  );
}
