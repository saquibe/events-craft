// app/admin/events/[id]/check-in/badge-design/page.tsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  BadgeDesignProvider,
  useBadgeDesign,
} from "@/components/admin/onsite/BadgeDesignContext";
import { BadgeTemplateList } from "@/components/admin/onsite/BadgeTemplateList";
import { BadgeDesignEditor } from "@/components/admin/onsite/BadgeDesignEditor";
import { BadgeSizeModal } from "@/components/admin/onsite/BadgeSizeModal";
import { CreateButton } from "@/components/admin/common/CreateButton";

function BadgeDesignContent() {
  const { addTemplate, setTemplateSize, getTemplateById } = useBadgeDesign();
  const [showEditor, setShowEditor] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null,
  );
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<"create" | "edit" | null>(
    null,
  );

  const handleCreateBadge = () => {
    setPendingAction("create");
    setShowSizeModal(true);
  };

  const handleEditBadge = (id: string) => {
    // For editing, directly open the editor without size modal
    setSelectedTemplateId(id);
    setShowEditor(true);
  };

  const handleSizeConfirm = (size: {
    width: number;
    height: number;
    orientation: "portrait" | "landscape";
  }) => {
    setShowSizeModal(false);

    if (pendingAction === "create") {
      // Create a new template with the selected size
      const newTemplate = addTemplate({
        name: "New Badge",
        type: "common",
        size: { width: size.width, height: size.height, unit: "mm" },
        orientation: size.orientation,
        isDefault: false,
        frontSide: [],
        backSide: [],
        background: { type: "none", value: "#ffffff" },
      }) as any;

      if (newTemplate && newTemplate.id) {
        setSelectedTemplateId(newTemplate.id);
      } else {
        // fallback: open editor without a selected template id
        setSelectedTemplateId(null);
      }
      setShowEditor(true);
    }
  };

  const handleSaveEditor = () => {
    setShowEditor(false);
    setSelectedTemplateId(null);
  };

  const handleCancelEditor = () => {
    setShowEditor(false);
    setSelectedTemplateId(null);
  };

  // If editor is open, show the editor
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
        <BadgeDesignEditor
          templateId={selectedTemplateId}
          onSave={handleSaveEditor}
          onCancel={handleCancelEditor}
        />
      </div>
    );
  }

  // Show templates list
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
        onSelectTemplate={(id) => {
          handleEditBadge(id);
        }}
        onDuplicate={(id) => {
          // Handle duplicate
        }}
        onDelete={(id) => {
          // Handle delete
        }}
      />

      {/* Badge Size Modal - Only for creating new badges */}
      <BadgeSizeModal
        open={showSizeModal}
        onOpenChange={setShowSizeModal}
        onConfirm={handleSizeConfirm}
        onCancel={() => {
          setShowSizeModal(false);
          setPendingAction(null);
        }}
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
