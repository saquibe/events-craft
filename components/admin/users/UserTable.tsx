"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "../common/StatusBadge";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { User } from "@/lib/types/user";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onStatusChange: (id: string, status: User["status"]) => void;
  onSendPassword: (id: string) => void;
}

export function UserTable({
  users,
  onEdit,
  onStatusChange,
  onSendPassword,
}: UserTableProps) {
  const columns = [
    {
      key: "name",
      header: "Name",
      cell: (user: User) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.profilePhoto} className="object-cover" />
            <AvatarFallback>
              {/* {user.firstName[0]}
              {user.lastName[0]} */}
              <img src="/images/users/user7.jpg" alt="" />
            </AvatarFallback>
          </Avatar>
          <div>
            <span className="font-medium text-foreground text-base">
              {user.prefix} {user.firstName} {user.lastName}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
      cell: (user: User) => (
        <span className="text-muted-foreground text-base">{user.email}</span>
      ),
    },
    {
      key: "category",
      header: "Category",
      cell: (user: User) => (
        <span
          className={`font-medium text-base ${
            user.category === "Attendee" ? "text-blue-600" : "text-purple-600"
          }`}
        >
          {user.category}
        </span>
      ),
    },
    {
      key: "createdBy",
      header: "Created By",
      cell: (user: User) => (
        <span className="text-muted-foreground text-base">
          {user.createdBy}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Date & Time",
      cell: (user: User) => (
        <span className="text-muted-foreground text-base">
          {format(new Date(user.createdAt), "MMM dd, yyyy HH:mm")}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: () => <Badge color="success">Active</Badge>,
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (user: User) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(user),
            },
            {
              label: user.status === "Active" ? "Suspend" : "Activate",
              icon:
                user.status === "Active"
                  ? ActionIcons.suspend
                  : ActionIcons.activate,
              onClick: () =>
                onStatusChange(
                  user.id,
                  user.status === "Active" ? "Suspended" : "Active",
                ),
            },
            {
              label: "Send Password",
              icon: ActionIcons.resendInvite,
              onClick: () => onSendPassword(user.id),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={users}
      columns={columns}
      searchFields={["firstName", "lastName", "email"]}
      searchPlaceholder="Search users..."
      emptyMessage="No users found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Admin Login Users ({users.length})
          </h3>
          <p className="text-sm text-muted-foreground">
            Manage event users and their access
          </p>
        </div>
      )}
    />
  );
}
