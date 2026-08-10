"use client";

import { Form as FormType } from "@/lib/types/emanual";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormInput } from "lucide-react";
import { format } from "date-fns";

interface FormTableProps {
  forms: FormType[];
  onEdit: (form: FormType) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: FormType["status"]) => void;
  onEditFormBuilder: (form: FormType) => void;
}

export function FormTable({
  forms,
  onEdit,
  onDelete,
  onStatusChange,
  onEditFormBuilder,
}: FormTableProps) {
  const columns = [
    {
      key: "menu",
      header: "Menu Name",
      cell: (form: FormType) => (
        <span className="font-medium text-foreground text-base">
          {form.menu?.name || "-"}
        </span>
      ),
    },
    {
      key: "lastDateOfSubmission",
      header: "Last Date of Submission",
      cell: (form: FormType) => (
        <span className="text-muted-foreground text-base">
          {format(new Date(form.lastDateOfSubmission), "MMM dd, yyyy HH:mm")}
        </span>
      ),
    },
    {
      key: "payment",
      header: "Payment",
      cell: (form: FormType) => (
        <Badge color={form.payment ? "success" : "secondary"}>
          {form.payment ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      key: "fields",
      header: "Fields",
      cell: (form: FormType) => (
        <span className="text-muted-foreground text-base">
          {form.formConfig?.fields?.length || 0} fields
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (form: FormType) => <StatusBadge status={form.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (form: FormType) => (
        <div className="flex items-center justify-end">
          <ActionDropdown
            actions={[
              {
                label: "Edit Form Builder",
                icon: <FormInput className="h-4 w-4 mr-2" />,
                onClick: () => onEditFormBuilder(form),
              },
              // {
              //   label: "Edit",
              //   icon: ActionIcons.edit,
              //   onClick: () => onEdit(form),
              // },
              {
                label: form.status === "Active" ? "Suspend" : "Activate",
                icon:
                  form.status === "Active"
                    ? ActionIcons.suspend
                    : ActionIcons.activate,
                onClick: () =>
                  onStatusChange(
                    form.id,
                    form.status === "Active" ? "Inactive" : "Active",
                  ),
              },
              {
                label: "Delete",
                icon: ActionIcons.delete,
                onClick: () => onDelete(form.id),
                variant: "destructive",
              },
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <PaginatedTable
      data={forms}
      columns={columns}
      // searchFields={["menu.name"]}
      searchPlaceholder="Search forms..."
      emptyMessage="No forms found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">Forms ({forms.length})</h3>
        </div>
      )}
    />
  );
}
