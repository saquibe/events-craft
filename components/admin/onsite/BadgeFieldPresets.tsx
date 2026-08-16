// components/admin/onsite/badge-design/BadgeFieldPresets.tsx
"use client";

import { BadgeField } from "./BadgeDesignContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  ChevronDown,
  ChevronRight,
  User,
  Calendar,
  Image as ImageIcon,
  Square,
} from "lucide-react";
import { useState } from "react";

interface BadgeFieldPresetsProps {
  onAddField: (fieldType: string, fieldData?: Partial<BadgeField>) => void;
}

const USER_INFO_FIELDS = [
  {
    id: "full-name",
    label: "Full Name",
    content: "John Doe",
    field: "fullName",
  },
  { id: "email", label: "Email", content: "john@example.com", field: "email" },
  {
    id: "mobile",
    label: "Mobile",
    content: "+1 234 567 8900",
    field: "mobile",
  },
  {
    id: "card-profile",
    label: "Card Profile",
    content: "VIP",
    field: "cardProfile",
  },
  {
    id: "company-name",
    label: "Company Name",
    content: "Company Inc.",
    field: "companyName",
  },
  {
    id: "designation",
    label: "Designation",
    content: "CEO",
    field: "designation",
  },
  {
    id: "user-city",
    label: "User City",
    content: "New York",
    field: "userCity",
  },
  { id: "user-state", label: "User State", content: "NY", field: "userState" },
  {
    id: "user-country",
    label: "User Country",
    content: "USA",
    field: "userCountry",
  },
  {
    id: "registration-number",
    label: "Registration Number",
    content: "REG-001",
    field: "registrationNumber",
  },
  {
    id: "custom-field-1",
    label: "Custom Field 1",
    content: "Custom Value 1",
    field: "custom1",
  },
  {
    id: "custom-field-2",
    label: "Custom Field 2",
    content: "Custom Value 2",
    field: "custom2",
  },
  {
    id: "custom-field-3",
    label: "Custom Field 3",
    content: "Custom Value 3",
    field: "custom3",
  },
  {
    id: "custom-field-4",
    label: "Custom Field 4",
    content: "Custom Value 4",
    field: "custom4",
  },
];

const EVENT_INFO_FIELDS = [
  {
    id: "event-name",
    label: "Event Name",
    content: "Zylker Summit 2024",
    field: "eventName",
  },
  { id: "venue", label: "Venue", content: "Convention Center", field: "venue" },
  {
    id: "start-date",
    label: "Start Date",
    content: "Oct 01, 2024",
    field: "startDate",
  },
  {
    id: "end-date",
    label: "End Date",
    content: "Oct 03, 2024",
    field: "endDate",
  },
  { id: "zip-code", label: "Zip Code", content: "10001", field: "zipCode" },
  {
    id: "event-city",
    label: "Event City",
    content: "New York",
    field: "eventCity",
  },
  {
    id: "event-state",
    label: "Event State",
    content: "NY",
    field: "eventState",
  },
  {
    id: "event-country",
    label: "Event Country",
    content: "USA",
    field: "eventCountry",
  },
  {
    id: "event-logo",
    label: "Event Logo",
    content: "Logo",
    field: "eventLogo",
  },
];

const GRAPHIC_FIELDS = [
  { id: "background-image", label: "Background Image", type: "image" },
  { id: "logo", label: "Logo", type: "image" },
];

type StaticFieldPreset = {
  id: string;
  label: string;
  type: string;
  content?: string;
  width?: number;
  height?: number;
  fontSize?: number;
  fontWeight?: string;
};

const STATIC_FIELDS: StaticFieldPreset[] = [
  { id: "text", label: "Text", type: "text" },
  { id: "image", label: "Image", type: "image" },
  { id: "rectangle", label: "Rectangle", type: "rectangle" },
];

export function BadgeFieldPresets({ onAddField }: BadgeFieldPresetsProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "user-info",
    "event-info",
    "graphic",
    "static-fields",
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section],
    );
  };

  const SectionHeader = ({
    id,
    icon,
    title,
    count,
  }: {
    id: string;
    icon: React.ReactNode;
    title: string;
    count?: number;
  }) => {
    const isExpanded = expandedSections.includes(id);
    return (
      <button
        className="flex items-center justify-between w-full py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
        onClick={() => toggleSection(id)}
      >
        <span className="flex items-center gap-2">
          {icon}
          {title}
          {count !== undefined && (
            <span className="text-xs text-muted-foreground">({count})</span>
          )}
        </span>
        {isExpanded ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>
    );
  };

  const renderFieldButtons = (
    fields: any[],
    type: string,
    getFieldData?: (field: any) => Partial<BadgeField>,
  ) => {
    return (
      <div className="flex flex-wrap gap-1 mt-1">
        {fields.map((field) => (
          <Button
            key={field.id}
            variant="outline"
            size="sm"
            className="text-xs h-7 px-2"
            onClick={() => {
              const fieldData = getFieldData ? getFieldData(field) : {};
              onAddField(type, {
                label: field.label,
                content: field.content || "",
                ...fieldData,
              });
            }}
          >
            {field.label}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div className="p-3 bg-muted/20 rounded-lg border">
      <h4 className="font-medium text-sm mb-3">Add Fields</h4>
      <div className="space-y-3">
        {/* User Info */}
        <div className="space-y-1">
          <SectionHeader
            id="user-info"
            icon={<User className="h-4 w-4" />}
            title="User Info"
            count={USER_INFO_FIELDS.length}
          />
          {expandedSections.includes("user-info") && (
            <div className="pl-6">
              {renderFieldButtons(USER_INFO_FIELDS, "text", (field) => ({
                fontSize: 12,
                alignment: "left" as const,
              }))}
            </div>
          )}
        </div>

        {/* Event Info */}
        <div className="space-y-1">
          <SectionHeader
            id="event-info"
            icon={<Calendar className="h-4 w-4" />}
            title="Event Info"
            count={EVENT_INFO_FIELDS.length}
          />
          {expandedSections.includes("event-info") && (
            <div className="pl-6">
              {renderFieldButtons(EVENT_INFO_FIELDS, "text", (field) => ({
                fontSize: 12,
                alignment: "center" as const,
              }))}
            </div>
          )}
        </div>

        {/* Graphic */}
        <div className="space-y-1">
          <SectionHeader
            id="graphic"
            icon={<ImageIcon className="h-4 w-4" />}
            title="Graphic"
            count={GRAPHIC_FIELDS.length}
          />
          {expandedSections.includes("graphic") && (
            <div className="pl-6">
              {GRAPHIC_FIELDS.map((field) => (
                <Button
                  key={field.id}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 px-2 mr-1 mb-1"
                  onClick={() => {
                    onAddField(field.type, {
                      label: field.label,
                      content: "",
                      width: 65,
                      height: 30,
                    });
                  }}
                >
                  {field.label}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Static Fields */}
        <div className="space-y-1">
          <SectionHeader
            id="static-fields"
            icon={<Square className="h-4 w-4" />}
            title="Static Fields"
            count={STATIC_FIELDS.length}
          />
          {expandedSections.includes("static-fields") && (
            <div className="pl-6">
              {STATIC_FIELDS.map((field) => (
                <Button
                  key={field.id}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 px-2 mr-1 mb-1"
                  onClick={() => {
                    const fieldData: Partial<BadgeField> = {
                      label: field.label,
                      content:
                        field.content ||
                        (field.type === "text" ? "Double click to edit" : ""),
                      width: field.width || 60,
                      height: field.height || 24,
                    };
                    if (field.type === "rectangle") {
                      fieldData.backgroundColor = "#e5e7eb";
                      fieldData.color = "#6b7280";
                    }
                    if (field.type === "text") {
                      fieldData.fontSize = field.fontSize || 16;
                      fieldData.fontWeight = field.fontWeight || "400";
                      fieldData.alignment = "center";
                    }
                    onAddField(field.type, fieldData);
                  }}
                >
                  {field.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
