"use client";

import { Presentation } from "@/lib/types/presentation";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Download, Link2, Mail, Clock } from "lucide-react";
import { format } from "date-fns";
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from "@/components/ui/simple-tabs";

interface PresentationTableProps {
  presentations: Presentation[];
  type: "Talk" | "Paper" | "ePoster";
  onSendReminder: (id: string) => void;
  onDownload: (id: string) => void;
  onCopyLink: (id: string) => void;
}

export function PresentationTable({
  presentations,
  type,
  onSendReminder,
  onDownload,
  onCopyLink,
}: PresentationTableProps) {
  // Filter by type
  const filtered = presentations.filter((p) => p.type === type);
  const submitted = filtered.filter((p) => p.status === "Submitted");
  const pending = filtered.filter((p) => p.status === "Pending");

  const columns = [
    {
      key: "presenter",
      header: "Presenter Name",
      cell: (presentation: Presentation) => (
        <div>
          <p className="font-medium text-foreground text-base">
            {presentation.presenterName}
          </p>
          <p className="text-sm text-muted-foreground">
            {presentation.presenterEmail}
          </p>
        </div>
      ),
    },
    {
      key: "abstract",
      header: "Abstract #",
      cell: (presentation: Presentation) => (
        <span className="text-muted-foreground text-base">
          {presentation.abstractId}
        </span>
      ),
    },
    {
      key: "topic",
      header: "Topic",
      cell: (presentation: Presentation) => (
        <span className="text-muted-foreground text-base max-w-[150px] truncate block">
          {presentation.topic}
        </span>
      ),
    },
    {
      key: "dateTime",
      header: "Date & Time",
      cell: (presentation: Presentation) => (
        <div>
          <p className="text-muted-foreground text-base">
            {format(new Date(presentation.dateTime), "dd MMM yyyy h:mm a")}
          </p>
          <p className="text-sm text-muted-foreground">
            {presentation.location}
          </p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (presentation: Presentation) => {
        const statusMap = {
          Submitted: "Published",
          Pending: "Draft",
          Accepted: "Published",
          Rejected: "Suspended",
        };
        return (
          <StatusBadge
            status={(statusMap[presentation.status] as any) || "Draft"}
          />
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (presentation: Presentation) => (
        <div className="flex items-center justify-end gap-2">
          {presentation.status === "Submitted" ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDownload(presentation.id)}
                className="text-blue-600 hover:text-blue-700"
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCopyLink(presentation.id)}
                className="text-green-600 hover:text-green-700"
              >
                <Link2 className="h-4 w-4 mr-1" />
                Copy Link
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSendReminder(presentation.id)}
              className="text-yellow-600 hover:text-yellow-700"
            >
              <Mail className="h-4 w-4 mr-1" />
              Send Reminder
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <SimpleTabs defaultValue="submitted" className="w-full">
      <SimpleTabsList>
        <SimpleTabsTrigger value="submitted">
          Submitted ({submitted.length})
        </SimpleTabsTrigger>

        <SimpleTabsTrigger value="pending">
          Pending ({pending.length})
        </SimpleTabsTrigger>
      </SimpleTabsList>

      <SimpleTabsContent value="submitted">
        <PaginatedTable
          data={submitted}
          columns={columns}
          searchFields={[
            "presenterName",
            "presenterEmail",
            "abstractId",
            "topic",
          ]}
          searchPlaceholder={`Search Submitted ${type}s...`}
          emptyMessage={`No Submitted ${type}s found`}
          renderHeader={() => (
            <div>
              <h3 className="text-lg font-semibold">Submitted {type}s</h3>
            </div>
          )}
        />
      </SimpleTabsContent>

      <SimpleTabsContent value="pending">
        <PaginatedTable
          data={pending}
          columns={columns}
          searchFields={[
            "presenterName",
            "presenterEmail",
            "abstractId",
            "topic",
          ]}
          searchPlaceholder={`Search Pending ${type}s...`}
          emptyMessage={`No Pending ${type}s found`}
          renderHeader={() => (
            <div>
              <h3 className="text-lg font-semibold">Pending {type}s</h3>
            </div>
          )}
        />
      </SimpleTabsContent>
    </SimpleTabs>
  );
}
