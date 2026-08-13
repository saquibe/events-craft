// components/admin/onsite/badge-design/BadgeDesignEditor.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useBadgeDesign, BadgeField } from "./BadgeDesignContext";
import { Button } from "@/components/ui/button";
import {
  SimpleTabs,
  SimpleTabsList,
  SimpleTabsTrigger,
  SimpleTabsContent,
} from "@/components/ui/simple-tabs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Save,
  X,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  Trash2,
} from "lucide-react";
import { BadgeToolbar } from "./BadgeToolbar";
import { BadgeCanvas } from "./BadgeCanvas";
import { BadgeProperties } from "./BadgeProperties";
import { BadgeLayers } from "./BadgeLayers";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface BadgeDesignEditorProps {
  templateId: string | null;
  onSave: () => void;
  onCancel: () => void;
}

export function BadgeDesignEditor({
  templateId,
  onSave,
  onCancel,
}: BadgeDesignEditorProps) {
  const { getTemplateById, updateTemplate, addTemplate } = useBadgeDesign();
  const existingTemplate = templateId ? getTemplateById(templateId) : null;

  const [template, setTemplate] = useState(
    existingTemplate || {
      id: "",
      name: "New Badge",
      type: "common" as const,
      size: { width: 105, height: 148, unit: "mm" as const },
      orientation: "portrait" as const,
      isDefault: false,
      frontSide: [],
      backSide: [],
      background: { type: "none" as const, value: "#ffffff" },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  );

  const [activeSide, setActiveSide] = useState<"front" | "back">("front");
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
  const [showPunchingArea, setShowPunchingArea] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fieldToDelete, setFieldToDelete] = useState<string | null>(null);

  // Add default fields if empty
  useEffect(() => {
    if (template.frontSide.length === 0) {
      const defaultFields: BadgeField[] = [
        {
          id: "event-name",
          type: "text",
          label: "Event Name",
          content: "Zylker Summit 2024",
          x: 20,
          y: 25,
          width: 65,
          height: 22,
          fontSize: 18,
          fontFamily: "Arial",
          fontWeight: "bold",
          color: "#1a1a2e",
          alignment: "center",
          isVisible: true,
          isEditable: true,
        },
        {
          id: "attendee-name",
          type: "text",
          label: "Full Name",
          content: "Alexander Fleming",
          x: 20,
          y: 55,
          width: 65,
          height: 35,
          fontSize: 24,
          fontFamily: "Arial",
          fontWeight: "bold",
          color: "#1a1a2e",
          alignment: "center",
          isVisible: true,
          isEditable: true,
        },
        {
          id: "organization",
          type: "text",
          label: "Company Name",
          content: "Zylker Corporation",
          x: 20,
          y: 95,
          width: 65,
          height: 22,
          fontSize: 16,
          fontFamily: "Arial",
          fontWeight: "normal",
          color: "#666",
          alignment: "center",
          isVisible: true,
          isEditable: true,
        },
        {
          id: "badge-type",
          type: "text",
          label: "Badge Type",
          content: "VIP PASS",
          x: 20,
          y: 122,
          width: 65,
          height: 22,
          fontSize: 18,
          fontFamily: "Arial",
          fontWeight: "bold",
          color: "#e74c3c",
          alignment: "center",
          isVisible: true,
          isEditable: true,
        },
      ];
      setTemplate((prev) => ({ ...prev, frontSide: defaultFields }));
    }
  }, []);

  const handleFieldSelect = (fieldId: string) => {
    setSelectedFieldId(fieldId);
    setIsPropertiesOpen(true);
  };

  const handleFieldUpdate = (fieldId: string, updates: Partial<BadgeField>) => {
    const side = activeSide;
    const fields =
      side === "front" ? [...template.frontSide] : [...template.backSide];
    const index = fields.findIndex((f) => f.id === fieldId);
    if (index !== -1) {
      fields[index] = { ...fields[index], ...updates };
      setTemplate((prev) => ({
        ...prev,
        [side === "front" ? "frontSide" : "backSide"]: fields,
        updatedAt: new Date().toISOString(),
      }));
    }
  };

  const handleFieldDelete = (fieldId: string) => {
    const side = activeSide;
    const fields =
      side === "front" ? [...template.frontSide] : [...template.backSide];
    setTemplate((prev) => ({
      ...prev,
      [side === "front" ? "frontSide" : "backSide"]: fields.filter(
        (f) => f.id !== fieldId,
      ),
      updatedAt: new Date().toISOString(),
    }));
    if (selectedFieldId === fieldId) {
      setSelectedFieldId(null);
      setIsPropertiesOpen(false);
    }
    setDeleteDialogOpen(false);
    setFieldToDelete(null);
  };

  const handleDeleteWithConfirmation = (fieldId: string) => {
    setFieldToDelete(fieldId);
    setDeleteDialogOpen(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "Delete" || e.key === "Backspace") && selectedFieldId) {
        const target = e.target as HTMLElement;
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
          return;
        }
        e.preventDefault();
        handleDeleteWithConfirmation(selectedFieldId);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedFieldId]);

  const handleAddField = (
    fieldType: string,
    fieldData?: Partial<BadgeField>,
  ) => {
    const newField: BadgeField = {
      id: `field-${Date.now()}`,
      type: fieldType as any,
      label: fieldType.charAt(0).toUpperCase() + fieldType.slice(1),
      content:
        fieldType === "qr"
          ? "https://zylker.com"
          : fieldType === "text"
            ? "New Field"
            : "",
      x: 20,
      y: 20,
      width: fieldType === "qr" ? 45 : 65,
      height: fieldType === "qr" ? 45 : 20,
      fontSize: 14,
      fontFamily: "Arial",
      fontWeight: "normal",
      color: "#1a1a2e",
      alignment: "center",
      isVisible: true,
      isEditable: true,
      ...fieldData,
    };

    const side = activeSide;
    setTemplate((prev) => ({
      ...prev,
      [side === "front" ? "frontSide" : "backSide"]: [
        ...prev[side === "front" ? "frontSide" : "backSide"],
        newField,
      ],
      updatedAt: new Date().toISOString(),
    }));
    setSelectedFieldId(newField.id);
    setIsPropertiesOpen(true);
  };

  const handleBackgroundChange = (background: any) => {
    setTemplate((prev) => ({
      ...prev,
      background,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleSave = () => {
    if (existingTemplate) {
      updateTemplate(existingTemplate.id, template);
    } else {
      addTemplate(template as any);
    }
    onSave();
  };

  const selectedField = selectedFieldId
    ? ([...template.frontSide, ...template.backSide].find(
        (f) => f.id === selectedFieldId,
      ) ?? null)
    : null;

  const handleZoomIn = () => setZoomLevel(Math.min(zoomLevel + 0.1, 2));
  const handleZoomOut = () => setZoomLevel(Math.max(zoomLevel - 0.1, 0.5));

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-4 bg-muted/20 rounded-lg border">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <h3 className="font-semibold">
              {existingTemplate
                ? `Editing: ${template.name}`
                : "Create New Badge"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {template.size.width} × {template.size.height}{" "}
              {template.size.unit} • {template.orientation}
            </p>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={handleZoomOut}
            >
              <Minimize2 className="h-3 w-3" />
            </Button>
            <span className="text-xs w-12 text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={handleZoomIn}
            >
              <Maximize2 className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {selectedFieldId && (
            <Button
              color="destructive"
              size="sm"
              className="gap-2 text-xs h-8"
              onClick={() => handleDeleteWithConfirmation(selectedFieldId)}
            >
              <Trash2 className="h-3 w-3" />
              Delete Selected
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs h-8"
            onClick={() => setShowPunchingArea(!showPunchingArea)}
          >
            {showPunchingArea ? (
              <EyeOff className="h-3 w-3" />
            ) : (
              <Eye className="h-3 w-3" />
            )}
            {showPunchingArea ? "Hide" : "Show"} Punching Area
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-8"
            onClick={onCancel}
          >
            <X className="h-3 w-3 mr-1" />
            Cancel
          </Button>
          <Button
            size="sm"
            className="text-xs h-8"
            color="primary"
            onClick={handleSave}
          >
            <Save className="h-3 w-3 mr-1" />
            Save Badge
          </Button>
        </div>
      </div>

      {/* Main Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Side - Canvas */}
        <div className="lg:col-span-2 space-y-4">
          <BadgeToolbar onAddField={handleAddField} />

          <SimpleTabs
            value={activeSide}
            onValueChange={(v) => setActiveSide(v as "front" | "back")}
          >
            <SimpleTabsList>
              <SimpleTabsTrigger value="front">Front Side</SimpleTabsTrigger>
              <SimpleTabsTrigger value="back">Back Side</SimpleTabsTrigger>
            </SimpleTabsList>
            <SimpleTabsContent value="front">
              <BadgeCanvas
                template={template}
                side="front"
                selectedFieldId={selectedFieldId}
                onFieldSelect={handleFieldSelect}
                onFieldUpdate={handleFieldUpdate}
                showPunchingArea={showPunchingArea}
                zoomLevel={zoomLevel}
              />
            </SimpleTabsContent>
            <SimpleTabsContent value="back">
              <BadgeCanvas
                template={template}
                side="back"
                selectedFieldId={selectedFieldId}
                onFieldSelect={handleFieldSelect}
                onFieldUpdate={handleFieldUpdate}
                showPunchingArea={showPunchingArea}
                zoomLevel={zoomLevel}
              />
            </SimpleTabsContent>
          </SimpleTabs>
        </div>

        {/* Right Side - Properties & Layers */}
        <div className="lg:col-span-2 space-y-4">
          <BadgeProperties
            template={template}
            selectedField={selectedField}
            onFieldUpdate={handleFieldUpdate}
            onFieldDelete={handleDeleteWithConfirmation}
            onBackgroundChange={handleBackgroundChange}
          />
          <BadgeLayers
            fields={
              activeSide === "front" ? template.frontSide : template.backSide
            }
            selectedFieldId={selectedFieldId}
            onFieldSelect={handleFieldSelect}
            onFieldDelete={handleDeleteWithConfirmation}
          />
        </div>
      </div>

      {/* Properties Sheet (Mobile) */}
      <Sheet open={isPropertiesOpen} onOpenChange={setIsPropertiesOpen}>
        <SheetContent className="w-full sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>Field Properties</SheetTitle>
            <SheetDescription>
              Customize the selected field properties
            </SheetDescription>
          </SheetHeader>
          {selectedField && (
            <div className="py-4">
              <BadgeProperties
                template={template}
                selectedField={selectedField}
                onFieldUpdate={handleFieldUpdate}
                onFieldDelete={handleDeleteWithConfirmation}
                onBackgroundChange={handleBackgroundChange}
                isMobile
              />
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Field</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this field? This action cannot be
              undone.
              {selectedField && (
                <div className="mt-2 p-2 bg-muted rounded text-sm">
                  <span className="font-medium">
                    {selectedField.label || selectedField.type}
                  </span>
                  {selectedField.type === "text" && selectedField.content && (
                    <span className="text-muted-foreground ml-2">
                      "{selectedField.content}"
                    </span>
                  )}
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (fieldToDelete) {
                  handleFieldDelete(fieldToDelete);
                } else if (selectedFieldId) {
                  handleFieldDelete(selectedFieldId);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
