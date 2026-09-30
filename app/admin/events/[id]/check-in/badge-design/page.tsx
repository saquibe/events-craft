// app/admin/events/[id]/check-in/badge-design/page.tsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  BadgeDesignProvider,
  useBadgeDesign,
  type BadgeType,
} from "@/components/admin/onsite/BadgeDesignContext";
import { BadgeTemplateList } from "@/components/admin/onsite/BadgeTemplateList";
import { BadgeDesigner } from "@/components/admin/onsite/BadgeDesigner";
import { BadgeSizeModal } from "@/components/admin/onsite/BadgeSizeModal";
import { CreateButton } from "@/components/admin/common/CreateButton";

function BadgeDesignContent() {
  const { addTemplate, duplicateTemplate, deleteTemplate } = useBadgeDesign();

  const [showEditor, setShowEditor] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null,
  );
  const [showSizeModal, setShowSizeModal] = useState(false);

  const handleCreateBadge = () => setShowSizeModal(true);

  const handleEditBadge = (id: string) => {
    setSelectedTemplateId(id);
    setShowEditor(true);
  };

  const handleSizeConfirm = (config: {
    width: number;
    height: number;
    orientation: "portrait" | "landscape";
    unit: "mm" | "in";
    category: BadgeType;
    name: string;
  }) => {
    setShowSizeModal(false);

    const newTemplate = addTemplate({
      name: config.name,
      type: config.category,
      size: { width: config.width, height: config.height, unit: config.unit },
      orientation: config.orientation,
      isDefault: false,
      frontSide: [],
      backSide: [],
      background: { type: "none", value: "#ffffff" },
    });

    setSelectedTemplateId(newTemplate.id);
    setShowEditor(true);
  };

  const handleSaveEditor = () => {
    setShowEditor(false);
    setSelectedTemplateId(null);
  };

  const handleCancelEditor = () => {
    setShowEditor(false);
    setSelectedTemplateId(null);
  };

  const handleDuplicate = (id: string) => duplicateTemplate(id);
  const handleDelete = (id: string) => deleteTemplate(id);

  if (showEditor) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Badge Design</h2>
            <p className="text-muted-foreground">
              {selectedTemplateId
                ? "Editing badge template"
                : "Creating new badge"}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleCancelEditor}
            className="text-base"
          >
            Back to Templates
          </Button>
        </div>
        <BadgeDesigner
          templateId={selectedTemplateId}
          onSave={handleSaveEditor}
          onCancel={handleCancelEditor}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Badge Design</h2>
          <p className="text-muted-foreground">
            Design and manage event badges for attendees
          </p>
        </div>
        <CreateButton label="Create Badge" onClick={handleCreateBadge} />
      </div>

      <BadgeTemplateList
        onSelectTemplate={handleEditBadge}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
      />

      <BadgeSizeModal
        open={showSizeModal}
        onOpenChange={setShowSizeModal}
        onConfirm={handleSizeConfirm}
        onCancel={() => setShowSizeModal(false)}
      />
    </div>
  );
}

export default function BadgeDesignPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";

  return (
    <BadgeDesignProvider eventId={eventId}>
      <BadgeDesignContent />
    </BadgeDesignProvider>
  );
}
