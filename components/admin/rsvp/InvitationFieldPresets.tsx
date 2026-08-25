// components/admin/invitation/InvitationFieldPresets.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image as ImageIcon, Square } from "lucide-react";
import { InvitationField } from "@/lib/types/rsvp";

interface InvitationFieldPresetsProps {
  onAddField: (fieldData: Partial<InvitationField>) => void;
}

const FIELD_PRESETS = {
  "User Info": [
    {
      id: "name",
      label: "Name",
      content: "John Doe",
      fontSize: 24,
      height: 28,
    },
    {
      id: "email",
      label: "Email",
      content: "john@example.com",
      fontSize: 16,
      height: 22,
    },
    {
      id: "mobile",
      label: "Mobile",
      content: "+1 234 567 8900",
      fontSize: 16,
      height: 22,
    },
    {
      id: "address",
      label: "Address",
      content: "123 Main St, City",
      fontSize: 14,
      height: 20,
    },
  ],
  "Event Info": [
    {
      id: "title",
      label: "Title",
      content: "You're Invited!",
      fontSize: 32,
      height: 35,
    },
    {
      id: "subtitle",
      label: "Subtitle",
      content: "Please join us for",
      fontSize: 20,
      height: 25,
    },
    {
      id: "event-details",
      label: "Event Details",
      content: "Date: Dec 15, 2026\nTime: 7:00 PM",
      fontSize: 14,
      height: 50,
    },
    {
      id: "venue",
      label: "Venue",
      content: "Grand Hall",
      fontSize: 16,
      height: 22,
    },
    {
      id: "date",
      label: "Date",
      content: "December 15, 2026",
      fontSize: 16,
      height: 22,
    },
  ],
  // Action: [
  //   {
  //     id: "rsvp-button",
  //     label: "RSVP Button",
  //     content: "RSVP Now",
  //     fontSize: 18,
  //     height: 30,
  //     backgroundColor: "#e8752a",
  //     color: "#ffffff",
  //   },
  //   {
  //     id: "register-button",
  //     label: "Register Button",
  //     content: "Register Now",
  //     fontSize: 18,
  //     height: 30,
  //     backgroundColor: "#4F46E5",
  //     color: "#ffffff",
  //   },
  // ],
};

export function InvitationFieldPresets({
  onAddField,
}: InvitationFieldPresetsProps) {
  return (
    <Card>
      <CardHeader className="py-3">
        <CardTitle className="text-sm font-medium">Add Fields</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(FIELD_PRESETS).map(([category, fields]) => (
          <div key={category} className="space-y-1">
            <Label className="text-xs font-medium text-muted-foreground">
              {category}
            </Label>
            <div className="flex flex-wrap gap-1">
              {fields.map((field) => (
                <Button
                  key={field.id}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 px-2"
                  onClick={() => onAddField(field)}
                >
                  {field.label}
                </Button>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-2 border-t">
          <Label className="text-xs font-medium text-muted-foreground">
            Graphics
          </Label>
          <div className="flex flex-wrap gap-1 mt-1">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7 px-2"
              onClick={() =>
                onAddField({
                  label: "Image",
                  type: "image",
                  width: 80,
                  height: 60,
                })
              }
            >
              <ImageIcon className="h-3 w-3 mr-1" />
              Image
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7 px-2"
              onClick={() =>
                onAddField({
                  label: "Shape",
                  type: "shape",
                  width: 50,
                  height: 40,
                })
              }
            >
              <Square className="h-3 w-3 mr-1" />
              Shape
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
