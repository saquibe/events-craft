"use client";

import { Topic } from "@/lib/types/agenda";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { Badge } from "@/components/ui/badge";
import { PaginatedTable } from "@/components/paginated-table";

interface TopicTableProps {
  topics: Topic[];
  onEdit: (topic: Topic) => void;
  onDelete: (id: string) => void;
}

export function TopicTable({ topics, onEdit, onDelete }: TopicTableProps) {
  const columns = [
    {
      key: "topic",
      header: "Topic",
      cell: (topic: Topic) => (
        <span className="font-medium text-foreground text-base">
          {topic.topic}
        </span>
      ),
    },
    {
      key: "topicType",
      header: "Topic Type",
      cell: (topic: Topic) => (
        <Badge variant="secondary">{topic.topicType}</Badge>
      ),
    },
    {
      key: "session",
      header: "Session Name",
      cell: (topic: Topic) => (
        <span className="text-muted-foreground text-base">
          {topic.session?.name || "-"}
        </span>
      ),
    },
    {
      key: "speakers",
      header: "Speaker",
      cell: (topic: Topic) => (
        <span className="text-muted-foreground text-base">
          {topic.speakers.length > 0
            ? `${topic.speakers.length} speaker(s)`
            : "-"}
        </span>
      ),
    },
    {
      key: "startTime",
      header: "Start Time",
      cell: (topic: Topic) => (
        <span className="text-muted-foreground text-base">
          {topic.startTime}
        </span>
      ),
    },
    {
      key: "endTime",
      header: "End Time",
      cell: (topic: Topic) => (
        <span className="text-muted-foreground text-base">{topic.endTime}</span>
      ),
    },
    {
      key: "aboutTopic",
      header: "About Topic",
      cell: (topic: Topic) => (
        <span className="text-muted-foreground text-base truncate max-w-[150px] block">
          {topic.aboutTopic || "-"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (topic: Topic) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(topic),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(topic.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={topics}
      columns={columns}
      searchFields={["topic", "topicType"]}
      searchPlaceholder="Search topics..."
      emptyMessage="No topics found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">Topics ({topics.length})</h3>
        </div>
      )}
    />
  );
}
