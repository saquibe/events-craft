// components/admin/invitation/InvitationDesigner.tsx
"use client";

import { useState, useRef } from "react";
import { Rnd } from "react-rnd";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Save,
  Maximize2,
  Minimize2,
  Trash2,
  Image as ImageIcon,
  Upload,
  Plus,
  ChevronDown,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from "@/components/ui/simple-tabs";
import { InvitationDesignCard } from "./InvitationDesignCard";
import { InvitationProperties } from "./InvitationProperties";
import { InvitationFieldPresets } from "./InvitationFieldPresets";
import { InvitationDesign, InvitationField } from "@/lib/types/rsvp";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreateButton } from "../common/CreateButton";

interface InvitationDesignerProps {
  eventId: string;
}

export function InvitationDesigner({ eventId }: InvitationDesignerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [designs, setDesigns] = useState<InvitationDesign[]>([
    {
      id: "1",
      name: "Modern Invitation",
      size: { width: 210, height: 297, unit: "mm", preset: "A4" },
      orientation: "portrait",
      background: { type: "color", value: "#ffffff" },
      fields: [
        {
          id: "title",
          type: "text",
          label: "Title",
          content: "You're Invited!",
          x: 20,
          y: 30,
          width: 80,
          height: 35,
          fontSize: 32,
          fontFamily: "Georgia, serif",
          fontWeight: "bold",
          color: "#e8752a",
          alignment: "center",
          isVisible: true,
          isEditable: true,
        },
        {
          id: "name",
          type: "text",
          label: "Name",
          content: "John Doe",
          x: 20,
          y: 75,
          width: 80,
          height: 28,
          fontSize: 24,
          fontFamily: "Georgia, serif",
          fontWeight: "bold",
          color: "#1a1a2e",
          alignment: "center",
          isVisible: true,
          isEditable: true,
        },
        {
          id: "email",
          type: "text",
          label: "Email",
          content: "john@example.com",
          x: 20,
          y: 110,
          width: 80,
          height: 22,
          fontSize: 16,
          fontFamily: "Georgia, serif",
          fontWeight: "normal",
          color: "#4a4a5a",
          alignment: "center",
          isVisible: true,
          isEditable: true,
        },
        {
          id: "mobile",
          type: "text",
          label: "Mobile",
          content: "+1 234 567 8900",
          x: 20,
          y: 138,
          width: 80,
          height: 22,
          fontSize: 16,
          fontFamily: "Georgia, serif",
          fontWeight: "normal",
          color: "#4a4a5a",
          alignment: "center",
          isVisible: true,
          isEditable: true,
        },
        {
          id: "event-details",
          type: "text",
          label: "Event Details",
          content: "Date: December 15, 2026\nTime: 7:00 PM\nVenue: Grand Hall",
          x: 20,
          y: 170,
          width: 80,
          height: 60,
          fontSize: 14,
          fontFamily: "Georgia, serif",
          fontWeight: "normal",
          color: "#4a4a5a",
          alignment: "center",
          isVisible: true,
          isEditable: true,
        },
        {
          id: "rsvp-button",
          type: "text",
          label: "RSVP Button",
          content: "RSVP Now",
          x: 30,
          y: 240,
          width: 40,
          height: 30,
          fontSize: 18,
          fontFamily: "Georgia, serif",
          fontWeight: "bold",
          color: "#ffffff",
          alignment: "center",
          backgroundColor: "#e8752a",
          isVisible: true,
          isEditable: true,
        },
      ],
      settings: {
        borderRadius: 0,
        padding: 20,
      },
      primaryColor: "#e8752a",
      secondaryColor: "#f5a623",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Elegant Wedding Invitation",
      size: { width: 210, height: 297, unit: "mm", preset: "A4" },
      orientation: "portrait",
      background: { type: "color", value: "#fdf6f0" },
      fields: [
        {
          id: "title",
          type: "text",
          label: "Title",
          content: "Save the Date",
          x: 20,
          y: 40,
          width: 80,
          height: 30,
          fontSize: 28,
          fontFamily: "Georgia, serif",
          fontWeight: "bold",
          color: "#8b5cf6",
          alignment: "center",
          isVisible: true,
          isEditable: true,
        },
        {
          id: "name",
          type: "text",
          label: "Name",
          content: "Sarah & Michael",
          x: 20,
          y: 80,
          width: 80,
          height: 30,
          fontSize: 26,
          fontFamily: "Georgia, serif",
          fontWeight: "bold",
          color: "#1a1a2e",
          alignment: "center",
          isVisible: true,
          isEditable: true,
        },
        {
          id: "event-details",
          type: "text",
          label: "Event Details",
          content: "June 15, 2026\nat 5:00 PM\nThe Grand Estate",
          x: 20,
          y: 125,
          width: 80,
          height: 55,
          fontSize: 14,
          fontFamily: "Georgia, serif",
          fontWeight: "normal",
          color: "#4a4a5a",
          alignment: "center",
          isVisible: true,
          isEditable: true,
        },
        {
          id: "rsvp-button",
          type: "text",
          label: "RSVP Button",
          content: "RSVP Now",
          x: 30,
          y: 200,
          width: 40,
          height: 30,
          fontSize: 16,
          fontFamily: "Georgia, serif",
          fontWeight: "bold",
          color: "#ffffff",
          alignment: "center",
          backgroundColor: "#8b5cf6",
          isVisible: true,
          isEditable: true,
        },
      ],
      settings: {
        borderRadius: 8,
        padding: 20,
      },
      primaryColor: "#8b5cf6",
      secondaryColor: "#c4b5fd",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);

  const [selectedDesign, setSelectedDesign] = useState<InvitationDesign | null>(
    designs[0] || null,
  );
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "editor">("grid");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [isBackgroundDialogOpen, setIsBackgroundDialogOpen] = useState(false);
  const [isNewDesignDialogOpen, setIsNewDesignDialogOpen] = useState(false);
  const [newDesignName, setNewDesignName] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [designToDelete, setDesignToDelete] = useState<string | null>(null);

  // CRUD Operations
  const createDesign = () => {
    if (!newDesignName.trim()) return;
    const newDesign: InvitationDesign = {
      id: `design-${Date.now()}`,
      name: newDesignName.trim(),
      size: { width: 210, height: 297, unit: "mm", preset: "A4" },
      orientation: "portrait",
      background: { type: "color", value: "#ffffff" },
      fields: [],
      settings: { borderRadius: 0, padding: 20 },
      primaryColor: "#e8752a",
      secondaryColor: "#f5a623",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setDesigns([...designs, newDesign]);
    setSelectedDesign(newDesign);
    setViewMode("editor");
    setNewDesignName("");
    setIsNewDesignDialogOpen(false);
  };

  const updateDesign = (id: string, updates: Partial<InvitationDesign>) => {
    const updatedDesigns = designs.map((d) =>
      d.id === id
        ? { ...d, ...updates, updatedAt: new Date().toISOString() }
        : d,
    );
    setDesigns(updatedDesigns);
    if (selectedDesign?.id === id) {
      setSelectedDesign({
        ...selectedDesign,
        ...updates,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const deleteDesign = (id: string) => {
    if (designs.length <= 1) return;
    const updatedDesigns = designs.filter((d) => d.id !== id);
    setDesigns(updatedDesigns);
    if (selectedDesign?.id === id) {
      setSelectedDesign(updatedDesigns[0] || null);
      setViewMode("grid");
    }
    setDesignToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const duplicateDesign = (id: string) => {
    const design = designs.find((d) => d.id === id);
    if (!design) return;
    const newDesign = {
      ...design,
      id: `design-${Date.now()}`,
      name: `${design.name} (Copy)`,
      fields: design.fields.map((f) => ({
        ...f,
        id: `field-${Date.now()}-${Math.random()}`,
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setDesigns([...designs, newDesign]);
  };

  // Field Operations
  const addField = (fieldData: any) => {
    if (!selectedDesign) return;

    const newField: InvitationField = {
      id: `field-${Date.now()}`,
      type: "text",
      label: fieldData.label,
      content: fieldData.content || "",
      x: 20 + Math.random() * 20,
      y: 30 + Math.random() * 30,
      width: fieldData.width || 60,
      height: fieldData.height || 25,
      fontSize: fieldData.fontSize || 16,
      fontFamily: fieldData.fontFamily || "Georgia, serif",
      color: fieldData.color || "#1a1a2e",
      alignment: fieldData.alignment || "center",
      isVisible: true,
      isEditable: true,
      backgroundColor: fieldData.backgroundColor,
    };

    const updatedFields = [...selectedDesign.fields, newField];
    updateDesign(selectedDesign.id, { fields: updatedFields });
    setSelectedFieldId(newField.id);
  };

  const updateField = (fieldId: string, updates: Partial<InvitationField>) => {
    if (!selectedDesign) return;
    const fields = selectedDesign.fields.map((f) =>
      f.id === fieldId ? { ...f, ...updates } : f,
    );
    updateDesign(selectedDesign.id, { fields });
  };

  const deleteField = (fieldId: string) => {
    if (!selectedDesign) return;
    const fields = selectedDesign.fields.filter((f) => f.id !== fieldId);
    updateDesign(selectedDesign.id, { fields });
    if (selectedFieldId === fieldId) {
      setSelectedFieldId(null);
    }
  };

  // Background Operations
  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedDesign) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        updateDesign(selectedDesign.id, {
          background: {
            ...selectedDesign.background,
            type: "image",
            imageUrl: imageUrl,
            value: "#ffffff",
          },
        });
        setIsBackgroundDialogOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Canvas Drag/Resize Handlers
  const handleDragStop = (
    fieldId: string,
    _e: any,
    data: { x: number; y: number },
  ) => {
    if (!selectedDesign) return;
    const canvasWidth = containerRef.current?.offsetWidth || 500;
    const canvasHeight = containerRef.current?.offsetHeight || 700;
    const designWidth = selectedDesign.size.width;
    const designHeight = selectedDesign.size.height;

    const xPercent = (data.x / canvasWidth) * designWidth;
    const yPercent = (data.y / canvasHeight) * designHeight;

    updateField(fieldId, {
      x: Math.round(Math.max(0, Math.min(designWidth - 10, xPercent))),
      y: Math.round(Math.max(0, Math.min(designHeight - 10, yPercent))),
    });
  };

  const handleResizeStop = (
    fieldId: string,
    _e: any,
    _direction: any,
    ref: HTMLElement,
    _delta: any,
    position: { x: number; y: number },
  ) => {
    if (!selectedDesign) return;
    const canvasWidth = containerRef.current?.offsetWidth || 500;
    const canvasHeight = containerRef.current?.offsetHeight || 700;
    const designWidth = selectedDesign.size.width;
    const designHeight = selectedDesign.size.height;

    const newWidth = parseInt(ref.style.width);
    const newHeight = parseInt(ref.style.height);
    const widthPercent = (newWidth / canvasWidth) * designWidth;
    const heightPercent = (newHeight / canvasHeight) * designHeight;
    const xPercent = (position.x / canvasWidth) * designWidth;
    const yPercent = (position.y / canvasHeight) * designHeight;

    const field = selectedDesign.fields.find((f) => f.id === fieldId);
    const currentFontSize = field?.fontSize || 16;
    const fieldWidth = field?.width ?? 60;
    const fieldHeight = field?.height ?? 25;
    const areaScale = Math.sqrt(
      (newWidth * newHeight) / (fieldWidth * fieldHeight),
    );
    const newFontSize = Math.max(
      8,
      Math.min(72, Math.round(currentFontSize * areaScale)),
    );

    updateField(fieldId, {
      width: Math.round(Math.max(20, widthPercent)),
      height: Math.round(Math.max(15, heightPercent)),
      x: Math.round(Math.max(0, Math.min(designWidth - 10, xPercent))),
      y: Math.round(Math.max(0, Math.min(designHeight - 10, yPercent))),
      fontSize: newFontSize,
    });
  };

  // Grid View
  if (viewMode === "grid") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Invitation Designs
            </h2>
            <p className="text-muted-foreground">
              {designs.length} invitation design
              {designs.length !== 1 ? "s" : ""} available
            </p>
          </div>
          <div className="flex gap-2">
            <CreateButton
              label="Create New"
              onClick={() => setIsNewDesignDialogOpen(true)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {designs.map((design) => (
            <InvitationDesignCard
              key={design.id}
              design={design}
              onEdit={() => {
                setSelectedDesign(design);
                setViewMode("editor");
                setSelectedFieldId(null);
              }}
              onDuplicate={() => duplicateDesign(design.id)}
              onDelete={() => {
                setDesignToDelete(design.id);
                setIsDeleteDialogOpen(true);
              }}
            />
          ))}
        </div>

        {/* New Design Dialog */}
        <Dialog
          open={isNewDesignDialogOpen}
          onOpenChange={setIsNewDesignDialogOpen}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Invitation Design</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="designName">Design Name</Label>
                <Input
                  id="designName"
                  placeholder="Enter design name..."
                  value={newDesignName}
                  onChange={(e) => setNewDesignName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      createDesign();
                    }
                  }}
                  autoFocus
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsNewDesignDialogOpen(false)}
                className="text-base"
              >
                Cancel
              </Button>
              <Button
                onClick={createDesign}
                disabled={!newDesignName.trim()}
                className="text-base"
                color="primary"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Design
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete Design</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                Are you sure you want to delete this design? This action cannot
                be undone.
              </p>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                color="destructive"
                onClick={() => designToDelete && deleteDesign(designToDelete)}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Editor View
  if (!selectedDesign) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] text-center">
        <p className="text-muted-foreground">No design selected</p>
        <Button className="mt-4" onClick={() => setViewMode("grid")}>
          Back to Designs
        </Button>
      </div>
    );
  }

  const canvasWidth = 500;
  const canvasHeight =
    (selectedDesign.size.height / selectedDesign.size.width) * canvasWidth;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-4 bg-muted/20 rounded-lg border">
        <div className="flex flex-wrap items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 h-8"
            onClick={() => setViewMode("grid")}
          >
            <ChevronDown className="h-4 w-4 rotate-90" />
            Back
          </Button>
          <div>
            <h3 className="font-semibold">Editing: {selectedDesign.name}</h3>
            <p className="text-sm text-muted-foreground">
              {selectedDesign.size.width} × {selectedDesign.size.height} mm •{" "}
              {selectedDesign.orientation}
            </p>
          </div>

          {/* Design Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 h-8 text-xs">
                <span className="max-w-[100px] truncate">Switch Design</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {designs.map((design) => (
                <DropdownMenuItem
                  key={design.id}
                  className="flex items-center justify-between"
                  onClick={() => {
                    setSelectedDesign(design);
                    setSelectedFieldId(null);
                  }}
                >
                  <span className="truncate">{design.name}</span>
                  {design.id === selectedDesign.id && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-2">
            <Label className="text-xs whitespace-nowrap">Size</Label>
            <Select
              value={selectedDesign.size.preset || "A4"}
              onValueChange={(value) => {
                const sizes: Record<string, { width: number; height: number }> =
                  {
                    A4: { width: 210, height: 297 },
                    A5: { width: 148, height: 210 },
                    A6: { width: 105, height: 148 },
                  };
                const size = sizes[value];
                if (size) {
                  updateDesign(selectedDesign.id, {
                    size: {
                      ...selectedDesign.size,
                      ...size,
                      preset: value as any,
                    },
                  });
                }
              }}
            >
              <SelectTrigger className="h-8 w-[200px] text-xs">
                <SelectValue placeholder="A4" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A4">A4 (210 × 297 mm)</SelectItem>
                <SelectItem value="A5">A5 (148 × 210 mm)</SelectItem>
                <SelectItem value="A6">A6 (105 × 148 mm)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Label className="text-xs whitespace-nowrap">Orientation</Label>
            <Select
              value={selectedDesign.orientation}
              onValueChange={(value: any) => {
                const { width, height } = selectedDesign.size;
                updateDesign(selectedDesign.id, {
                  orientation: value,
                  size: {
                    ...selectedDesign.size,
                    width:
                      value === "portrait"
                        ? Math.min(width, height)
                        : Math.max(width, height),
                    height:
                      value === "portrait"
                        ? Math.max(width, height)
                        : Math.min(width, height),
                  },
                });
              }}
            >
              <SelectTrigger className="h-8 w-[110px] text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="portrait">Portrait</SelectItem>
                <SelectItem value="landscape">Landscape</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}
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
              onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.1))}
            >
              <Maximize2 className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-8"
            onClick={() => setIsBackgroundDialogOpen(true)}
          >
            <Upload className="h-3 w-3 mr-1" />
            Upload Background
          </Button>
          <Button size="sm" className="text-xs h-8" color="primary">
            <Save className="h-3 w-3 mr-1" />
            Save
          </Button>
        </div>
      </div>

      <SimpleTabs defaultValue="design" className="space-y-4">
        <SimpleTabsList>
          <SimpleTabsTrigger value="design">Design</SimpleTabsTrigger>
          <SimpleTabsTrigger value="preview">Preview</SimpleTabsTrigger>
        </SimpleTabsList>

        <SimpleTabsContent value="design" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Left Sidebar - Field Presets */}
            <div className="lg:col-span-1 space-y-4">
              <InvitationFieldPresets onAddField={addField} />
            </div>

            {/* Center - Canvas */}
            <div className="lg:col-span-2">
              <div
                ref={containerRef}
                className="relative bg-white rounded-lg shadow-lg overflow-visible border mx-auto"
                style={{
                  width: canvasWidth,
                  height: canvasHeight,
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: "center",
                  transition: "transform 0.2s",
                }}
              >
                {/* Background */}
                {selectedDesign.background.type !== "none" && (
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        selectedDesign.background.type === "gradient"
                          ? selectedDesign.background.value
                          : selectedDesign.background.type === "color"
                            ? selectedDesign.background.value
                            : undefined,
                      backgroundImage:
                        selectedDesign.background.type === "image" &&
                        selectedDesign.background.imageUrl
                          ? `url(${selectedDesign.background.imageUrl})`
                          : undefined,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                )}

                {/* Grid */}
                {showGrid && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, #e5e7eb 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                      opacity: 0.5,
                    }}
                  />
                )}

                {/* Fields */}
                {selectedDesign.fields.map((field) => {
                  const isSelected = selectedFieldId === field.id;

                  const pixelX =
                    (field.x / selectedDesign.size.width) * canvasWidth;
                  const pixelY =
                    (field.y / selectedDesign.size.height) * canvasHeight;
                  const pixelWidth =
                    (field.width / selectedDesign.size.width) * canvasWidth;
                  const pixelHeight =
                    (field.height / selectedDesign.size.height) * canvasHeight;

                  const fieldStyle: React.CSSProperties = {
                    display: field.isVisible ? "flex" : "none",
                    alignItems: "center",
                    justifyContent:
                      field.alignment === "center"
                        ? "center"
                        : field.alignment === "right"
                          ? "flex-end"
                          : "flex-start",
                    padding: "4px 6px",
                    overflow: "hidden",
                    wordBreak: "break-word",
                    userSelect: "none",
                    width: "100%",
                    height: "100%",
                    fontSize: `${field.fontSize || 16}px`,
                    fontFamily: field.fontFamily || "Georgia, serif",
                    fontWeight: field.fontWeight || "normal",
                    color: field.color || "#1a1a2e",
                    lineHeight: "1.3",
                    backgroundColor: field.backgroundColor || "transparent",
                    borderRadius: field.backgroundColor ? "4px" : "0",
                  };

                  return (
                    <Rnd
                      key={field.id}
                      size={{ width: pixelWidth, height: pixelHeight }}
                      position={{ x: pixelX, y: pixelY }}
                      onDragStop={(_e, data) =>
                        handleDragStop(field.id, _e, data)
                      }
                      onResizeStop={(_e, _direction, ref, _delta, position) =>
                        handleResizeStop(
                          field.id,
                          _e,
                          _direction,
                          ref,
                          _delta,
                          position,
                        )
                      }
                      enableResizing={isSelected}
                      disableDragging={!isSelected}
                      bounds="parent"
                      dragGrid={[1, 1]}
                      resizeGrid={[1, 1]}
                      scale={1}
                      className={cn(
                        "transition-shadow duration-200",
                        isSelected
                          ? "z-20 ring-2 ring-primary ring-offset-2"
                          : "z-10 hover:ring-1 hover:ring-primary/30",
                        !field.isVisible && "opacity-40",
                      )}
                      resizeHandleStyles={{
                        bottomRight: {
                          backgroundColor: "#3b82f6",
                          borderRadius: "50%",
                          width: "12px",
                          height: "12px",
                        },
                        bottomLeft: {
                          backgroundColor: "#3b82f6",
                          borderRadius: "50%",
                          width: "12px",
                          height: "12px",
                        },
                        topRight: {
                          backgroundColor: "#3b82f6",
                          borderRadius: "50%",
                          width: "12px",
                          height: "12px",
                        },
                        topLeft: {
                          backgroundColor: "#3b82f6",
                          borderRadius: "50%",
                          width: "12px",
                          height: "12px",
                        },
                        bottom: {
                          backgroundColor: "#3b82f6",
                          borderRadius: "50%",
                          width: "8px",
                          height: "12px",
                        },
                        top: {
                          backgroundColor: "#3b82f6",
                          borderRadius: "50%",
                          width: "8px",
                          height: "12px",
                        },
                        left: {
                          backgroundColor: "#3b82f6",
                          borderRadius: "50%",
                          width: "12px",
                          height: "8px",
                        },
                        right: {
                          backgroundColor: "#3b82f6",
                          borderRadius: "50%",
                          width: "12px",
                          height: "8px",
                        },
                      }}
                      resizeHandleClasses={{
                        bottomRight:
                          "border-2 border-white shadow-md hover:scale-125 transition-transform",
                        bottomLeft:
                          "border-2 border-white shadow-md hover:scale-125 transition-transform",
                        topRight:
                          "border-2 border-white shadow-md hover:scale-125 transition-transform",
                        topLeft:
                          "border-2 border-white shadow-md hover:scale-125 transition-transform",
                        bottom:
                          "border-2 border-white shadow-md hover:scale-125 transition-transform",
                        top: "border-2 border-white shadow-md hover:scale-125 transition-transform",
                        left: "border-2 border-white shadow-md hover:scale-125 transition-transform",
                        right:
                          "border-2 border-white shadow-md hover:scale-125 transition-transform",
                      }}
                      onClick={() => setSelectedFieldId(field.id)}
                    >
                      <div style={fieldStyle} className="w-full h-full">
                        {field.type === "text" &&
                          (field.content || "Text Field")}
                        {field.type === "image" &&
                          (field.imageUrl ? (
                            <img
                              src={field.imageUrl}
                              alt={field.label}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 text-xs">
                              <ImageIcon className="w-6 h-6 mb-1" />
                              <span>Upload Image</span>
                            </div>
                          ))}
                      </div>
                    </Rnd>
                  );
                })}

                {/* Size label */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 whitespace-nowrap">
                  {selectedDesign.size.width} × {selectedDesign.size.height} mm
                  • {selectedDesign.orientation}
                </div>
              </div>

              <div className="text-center text-xs text-muted-foreground mt-2">
                {selectedFieldId ? (
                  <span>
                    Selected field: Drag to move • Drag handles to resize
                  </span>
                ) : (
                  <span>Click on any field to select and resize it</span>
                )}
              </div>
            </div>

            {/* Right Sidebar - Properties */}
            <div className="lg:col-span-2 space-y-4">
              <InvitationProperties
                design={selectedDesign}
                selectedFieldId={selectedFieldId}
                onFieldUpdate={updateField}
                onFieldDelete={deleteField}
                onDesignUpdate={updateDesign}
                onBackgroundChange={(background) =>
                  updateDesign(selectedDesign.id, { background })
                }
              />
            </div>
          </div>
        </SimpleTabsContent>

        <SimpleTabsContent value="preview">
          <div className="flex items-center justify-center p-8 bg-muted/20 rounded-lg min-h-[500px]">
            <div
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              style={{
                width: "400px",
                aspectRatio:
                  selectedDesign.orientation === "portrait"
                    ? `${selectedDesign.size.width}/${selectedDesign.size.height}`
                    : `${selectedDesign.size.height}/${selectedDesign.size.width}`,
              }}
            >
              <div
                className="w-full h-full p-8 flex flex-col items-center justify-center text-center"
                style={{
                  background:
                    selectedDesign.background.type === "color"
                      ? selectedDesign.background.value
                      : undefined,
                  backgroundImage:
                    selectedDesign.background.type === "image" &&
                    selectedDesign.background.imageUrl
                      ? `url(${selectedDesign.background.imageUrl})`
                      : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {selectedDesign.fields.map((field) => (
                  <div
                    key={field.id}
                    className="w-full"
                    style={{
                      fontSize: `${field.fontSize || 16}px`,
                      fontFamily: field.fontFamily || "Georgia, serif",
                      fontWeight: field.fontWeight || "normal",
                      color: field.color || "#1a1a2e",
                      textAlign: field.alignment || "center",
                      backgroundColor: field.backgroundColor || "transparent",
                      padding: field.backgroundColor ? "8px 16px" : "4px",
                      borderRadius: field.backgroundColor ? "4px" : "0",
                      marginBottom: "8px",
                    }}
                  >
                    {field.content}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SimpleTabsContent>
      </SimpleTabs>

      {/* Background Upload Dialog */}
      <Dialog
        open={isBackgroundDialogOpen}
        onOpenChange={setIsBackgroundDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload Background Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg">
              <Upload className="h-12 w-12 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mt-2">
                Click to upload a background image
              </p>
              <p className="text-xs text-muted-foreground">
                Recommended size: {selectedDesign.size.width} ×{" "}
                {selectedDesign.size.height} mm
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleBackgroundUpload}
              />
              <Button
                className="mt-4"
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                size="sm"
                color="primary"
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose Image
              </Button>
            </div>
            {selectedDesign.background.imageUrl && (
              <div className="relative">
                <div className="w-full h-32 rounded border overflow-hidden bg-gray-50">
                  <img
                    src={selectedDesign.background.imageUrl}
                    alt="Background"
                    className="w-full h-full object-contain"
                  />
                </div>
                <Button
                  color="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    updateDesign(selectedDesign.id, {
                      background: {
                        ...selectedDesign.background,
                        type: "color",
                        imageUrl: undefined,
                        value: "#ffffff",
                      },
                    });
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsBackgroundDialogOpen(false)}
              className="text-base"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setIsBackgroundDialogOpen(false)}
              className="text-base"
              color="primary"
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
