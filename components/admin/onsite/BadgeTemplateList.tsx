// components/admin/onsite/badge-design/BadgeTemplateList.tsx
"use client";

import { useState } from "react";
import { useBadgeDesign } from "./BadgeDesignContext";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { BadgeTemplateCard } from "./BadgeTemplateCard";

interface BadgeTemplateListProps {
  onSelectTemplate: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

export function BadgeTemplateList({
  onSelectTemplate,
  onDuplicate,
  onDelete,
}: BadgeTemplateListProps) {
  const { templates } = useBadgeDesign();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || template.type === filterType;
    return matchesSearch && matchesType;
  });

  const badgeTypes = [
    { value: "all", label: "All Types" },
    { value: "common", label: "Attendee" },
    { value: "delegate", label: "Delegate" },
    { value: "speaker", label: "Speaker" },
    { value: "exhibitor", label: "Exhibitor" },
    { value: "staff", label: "Staff" },
    { value: "sponsor", label: "Sponsor" },
    { value: "organizer", label: "Organizer" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            {badgeTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <BadgeTemplateCard
            key={template.id}
            template={template}
            onSelect={() => onSelectTemplate(template.id)}
            onDuplicate={() => onDuplicate(template.id)}
            onDelete={() => onDelete(template.id)}
          />
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No badge templates found</p>
        </div>
      )}
    </div>
  );
}
