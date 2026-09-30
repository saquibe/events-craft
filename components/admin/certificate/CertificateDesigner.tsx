// components/admin/certificate/CertificateDesigner.tsx
"use client";

import { useState, useRef, useMemo } from "react";
import { Rnd } from "react-rnd";
import { useCertificate } from "./CertificateContext";
import { resolveTemplate, formatDate } from "./templateResolver";
import { CertificateAssignDialog } from "./CertificateAssignDialog";
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
  X,
  Maximize2,
  Minimize2,
  Trash2,
  Image as ImageIcon,
  Square,
  Upload,
  UserPlus,
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

interface CertificateField {
  id: string;
  type: "text" | "image" | "shape";
  label: string;
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  color?: string;
  alignment?: "left" | "center" | "right";
  isVisible: boolean;
  isEditable: boolean;
  imageUrl?: string;
}

// ✅ Fix 3: handle styles as classes only
const RESIZE_HANDLE_CLASS =
  "bg-blue-500 border-2 border-white shadow-md rounded-full transition-transform hover:scale-125";
const CORNER_HANDLE_CLASS = `${RESIZE_HANDLE_CLASS} w-3 h-3`;
const EDGE_H_HANDLE_CLASS = `${RESIZE_HANDLE_CLASS} w-3 h-2`;
const EDGE_V_HANDLE_CLASS = `${RESIZE_HANDLE_CLASS} w-2 h-3`;

export function CertificateDesigner() {
  const {
    designs,
    selectedDesign,
    addDesign,
    updateDesign,
    selectDesign,
    attendees,
    getAttendanceByAttendee,
  } = useCertificate();

  const [activeTab, setActiveTab] = useState<"design" | "preview">("design");
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [isBackgroundDialogOpen, setIsBackgroundDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageFileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ✅ Fix 1: preview context state
  const [previewAttendeeId, setPreviewAttendeeId] = useState<string>(
    attendees[0]?.id ?? "",
  );
  const [previewEventName, setPreviewEventName] = useState(
    "Global Tech Summit 2024",
  );
  const [previewEventDate, setPreviewEventDate] = useState("2024-10-15");
  const [previewOrganizer, setPreviewOrganizer] =
    useState("Zylker Corporation");

  // ✅ Fix 1: build template context
  const previewContext = useMemo(() => {
    const attendee = attendees.find((a) => a.id === previewAttendeeId);
    const attendance = attendee
      ? getAttendanceByAttendee(attendee.id)
      : undefined;
    return {
      attendee,
      attendance,
      eventName: previewEventName,
      eventDate: formatDate(previewEventDate),
      organizer: previewOrganizer,
    };
  }, [
    attendees,
    previewAttendeeId,
    getAttendanceByAttendee,
    previewEventName,
    previewEventDate,
    previewOrganizer,
  ]);

  // ✅ Fix 1: resolve a field's display content
  const resolveFieldDisplay = (field: CertificateField): string => {
    return resolveTemplate(field.content, previewContext);
  };

  // Field presets
  const fieldCategories = {
    "User Info": [
      { id: "fullName", label: "Full Name", content: "{{fullName}}" },
      {
        id: "registrationNumber",
        label: "Registration Number",
        content: "{{registrationNumber}}",
      },
      {
        id: "attendeeProfile",
        label: "Attendee Profile",
        content: "{{attendeeProfile}}",
      },
      { id: "city", label: "City", content: "{{city}}" },
      { id: "country", label: "Country", content: "{{country}}" },
      {
        id: "customField1",
        label: "Custom Field 1",
        content: "{{customField1}}",
      },
      {
        id: "customField2",
        label: "Custom Field 2",
        content: "{{customField2}}",
      },
      {
        id: "customField3",
        label: "Custom Field 3",
        content: "{{customField3}}",
      },
      {
        id: "customField4",
        label: "Custom Field 4",
        content: "{{customField4}}",
      },
      {
        id: "customField5",
        label: "Custom Field 5",
        content: "{{customField5}}",
      },
    ],
    Abstract: [
      {
        id: "abstractTitle",
        label: "Abstract Title",
        content: "{{abstractTitle}}",
      },
      {
        id: "abstractCategory",
        label: "Abstract Category",
        content: "{{abstractCategory}}",
      },
      {
        id: "abstractSubCategory",
        label: "Abstract Sub-category",
        content: "{{abstractSubCategory}}",
      },
    ],
    Workshop: [
      {
        id: "workshopTitle",
        label: "Workshop Title",
        content: "{{workshopTitle}}",
      },
      {
        id: "workshopCategory",
        label: "Workshop Category",
        content: "{{workshopCategory}}",
      },
      {
        id: "workshopSubCategory",
        label: "Workshop Sub-category",
        content: "{{workshopSubCategory}}",
      },
    ],
    Poster: [
      { id: "posterTitle", label: "Poster Title", content: "{{posterTitle}}" },
      {
        id: "posterCategory",
        label: "Poster Category",
        content: "{{posterCategory}}",
      },
      {
        id: "posterSubCategory",
        label: "Poster Sub-category",
        content: "{{posterSubCategory}}",
      },
    ],
    Paper: [
      { id: "paperTitle", label: "Paper Title", content: "{{paperTitle}}" },
      {
        id: "paperCategory",
        label: "Paper Category",
        content: "{{paperCategory}}",
      },
      {
        id: "paperSubCategory",
        label: "Paper Sub-category",
        content: "{{paperSubCategory}}",
      },
    ],
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        if (selectedDesign) {
          updateDesign(selectedDesign.id, {
            background: {
              ...selectedDesign.background,
              type: "image",
              imageUrl: imageUrl,
              value: "#ffffff",
            },
          });
        }
        setIsBackgroundDialogOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFieldImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldId: string,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        handleFieldUpdate(fieldId, { imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Fix 1: getFieldContent now supports preview mode
  const getFieldContent = (field: CertificateField, forPreview = false) => {
    if (field.type === "text") {
      const text = forPreview
        ? resolveFieldDisplay(field)
        : field.content || "Text Field";
      return text;
    }
    if (field.type === "image") {
      if (field.imageUrl) {
        return (
          <img
            src={field.imageUrl}
            alt={field.label}
            className="w-full h-full object-contain"
          />
        );
      }
      return (
        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 text-xs">
          <ImageIcon className="w-6 h-6 mb-1" />
          <span>Upload Image</span>
        </div>
      );
    }
    return null;
  };

  const handleAddField = (category: string, fieldData: any) => {
    if (!selectedDesign) return;

    const newField: CertificateField = {
      id: `field-${Date.now()}`,
      type: "text",
      label: fieldData.label,
      content: fieldData.content,
      x: 20 + Math.random() * 20,
      y: 30 + Math.random() * 30,
      width: 80,
      height: 12,
      fontSize: 16,
      fontFamily: "Georgia, serif",
      color: "#1a1a2e",
      alignment: "center",
      isVisible: true,
      isEditable: true,
    };

    updateDesign(selectedDesign.id, {
      fields: [...selectedDesign.fields, newField],
    });
    setSelectedFieldId(newField.id);
  };

  const handleAddImageField = () => {
    if (!selectedDesign) return;

    const newField: CertificateField = {
      id: `field-${Date.now()}`,
      type: "image",
      label: "Image",
      content: "",
      x: 20 + Math.random() * 20,
      y: 30 + Math.random() * 30,
      width: 80,
      height: 60,
      isVisible: true,
      isEditable: true,
    };

    updateDesign(selectedDesign.id, {
      fields: [...selectedDesign.fields, newField],
    });
    setSelectedFieldId(newField.id);
  };

  const handleAddShapeField = () => {
    if (!selectedDesign) return;

    const newField: CertificateField = {
      id: `field-${Date.now()}`,
      type: "shape",
      label: "Shape",
      content: "",
      x: 20 + Math.random() * 20,
      y: 30 + Math.random() * 30,
      width: 50,
      height: 40,
      color: "#e5e7eb",
      isVisible: true,
      isEditable: true,
    };

    updateDesign(selectedDesign.id, {
      fields: [...selectedDesign.fields, newField],
    });
    setSelectedFieldId(newField.id);
  };

  const handleFieldUpdate = (
    fieldId: string,
    updates: Partial<CertificateField>,
  ) => {
    if (!selectedDesign) return;
    const fields = selectedDesign.fields.map((f) =>
      f.id === fieldId ? { ...f, ...updates } : f,
    );
    updateDesign(selectedDesign.id, { fields });
  };

  const handleFieldDelete = (fieldId: string) => {
    if (!selectedDesign) return;
    const fields = selectedDesign.fields.filter((f) => f.id !== fieldId);
    updateDesign(selectedDesign.id, { fields });
    if (selectedFieldId === fieldId) {
      setSelectedFieldId(null);
    }
  };

  const handleFieldSelect = (fieldId: string) => {
    setSelectedFieldId(fieldId);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedFieldId(null);
    }
  };

  // ✅ Fix 2: with scale prop, `data.x/y` are in unscaled parent pixels.
  // We divide by canvas width/height * design size. Because scale is applied
  // via react-rnd itself, the returned `data.x/y` is already corrected for us.
  const handleDragStop = (
    fieldId: string,
    e: any,
    data: { x: number; y: number },
  ) => {
    const canvasWidth = containerRef.current?.offsetWidth || 500;
    const canvasHeight = containerRef.current?.offsetHeight || 700;
    const designWidth = selectedDesign!.size.width;
    const designHeight = selectedDesign!.size.height;

    const xPercent = (data.x / canvasWidth) * designWidth;
    const yPercent = (data.y / canvasHeight) * designHeight;

    handleFieldUpdate(fieldId, {
      x: Math.round(Math.max(0, Math.min(designWidth - 10, xPercent))),
      y: Math.round(Math.max(0, Math.min(designHeight - 10, yPercent))),
    });
  };

  const handleResizeStop = (
    fieldId: string,
    e: any,
    direction: any,
    ref: HTMLElement,
    delta: any,
    position: { x: number; y: number },
  ) => {
    const canvasWidth = containerRef.current?.offsetWidth || 500;
    const canvasHeight = containerRef.current?.offsetHeight || 700;
    const designWidth = selectedDesign!.size.width;
    const designHeight = selectedDesign!.size.height;

    const newWidth = parseInt(ref.style.width);
    const newHeight = parseInt(ref.style.height);
    const widthPercent = (newWidth / canvasWidth) * designWidth;
    const heightPercent = (newHeight / canvasHeight) * designHeight;
    const xPercent = (position.x / canvasWidth) * designWidth;
    const yPercent = (position.y / canvasHeight) * designHeight;

    // Auto-adjust font size based on new dimensions
    const field = selectedDesign?.fields.find((f) => f.id === fieldId);
    const currentFontSize = field?.fontSize || 14;
    const fieldWidth = field?.width ?? 60;
    const fieldHeight = field?.height ?? 25;
    const areaScale = Math.sqrt(
      (newWidth * newHeight) / (fieldWidth * fieldHeight),
    );
    const newFontSize = Math.max(
      8,
      Math.min(48, Math.round(currentFontSize * areaScale)),
    );

    handleFieldUpdate(fieldId, {
      width: Math.round(Math.max(20, widthPercent)),
      height: Math.round(Math.max(15, heightPercent)),
      x: Math.round(Math.max(0, Math.min(designWidth - 10, xPercent))),
      y: Math.round(Math.max(0, Math.min(designHeight - 10, yPercent))),
      fontSize: newFontSize,
    });
  };

  if (!selectedDesign) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] text-center">
        <p className="text-muted-foreground">No design selected</p>
        <Button
          className="mt-4"
          onClick={() => {
            addDesign({
              name: "New Certificate",
              size: { width: 210, height: 297, unit: "mm" },
              orientation: "portrait",
              background: { type: "none", value: "#ffffff" },
              fields: [],
              settings: { borderRadius: 0, padding: 20 },
            });
          }}
        >
          Create New Design
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
          <div>
            <h3 className="font-semibold">Certificate Design</h3>
            <p className="text-sm text-muted-foreground">
              {selectedDesign.name} • {selectedDesign.size.width} ×{" "}
              {selectedDesign.size.height} mm • {selectedDesign.orientation}
            </p>
          </div>

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
          {/* ✅ Fix 6: Assign button */}
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-8"
            onClick={() => setIsAssignDialogOpen(true)}
          >
            <UserPlus className="h-3 w-3 mr-1" />
            Assign
          </Button>
          <Button variant="outline" size="sm" className="text-xs h-8">
            <X className="h-3 w-3 mr-1" />
            Cancel
          </Button>
          <Button size="sm" className="text-xs h-8" color="primary">
            <Save className="h-3 w-3 mr-1" />
            Save Design
          </Button>
        </div>
      </div>

      <SimpleTabs
        className="w-full"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "design" | "preview")}
      >
        <SimpleTabsList>
          <SimpleTabsTrigger value="design">Design</SimpleTabsTrigger>
          <SimpleTabsTrigger value="preview">Preview</SimpleTabsTrigger>
        </SimpleTabsList>

        <SimpleTabsContent value="design" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Left Sidebar - Field Presets */}
            <div className="lg:col-span-1 space-y-4">
              <div className="p-3 bg-muted/20 rounded-lg border">
                <h4 className="font-medium text-sm mb-3">Add Fields</h4>
                <div className="space-y-3">
                  {Object.entries(fieldCategories).map(([category, fields]) => (
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
                            onClick={() => handleAddField(category, field)}
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
                        onClick={handleAddImageField}
                      >
                        <ImageIcon className="h-3 w-3 mr-1" />
                        Image
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-7 px-2"
                        onClick={handleAddShapeField}
                      >
                        <Square className="h-3 w-3 mr-1" />
                        Shape
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center - Canvas with Rnd */}
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
                onClick={handleCanvasClick}
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

                {/* Fields with Rnd */}
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
                    fontSize: `${field.fontSize || 14}px`,
                    fontFamily: field.fontFamily || "Georgia, serif",
                    fontWeight: field.fontWeight || "normal",
                    color: field.color || "#1a1a2e",
                    lineHeight: "1.3",
                    backgroundColor: "transparent",
                  };

                  if (field.type === "shape") {
                    fieldStyle.backgroundColor = field.color || "#e5e7eb";
                    fieldStyle.border = `2px solid ${field.color || "#6b7280"}`;
                    fieldStyle.padding = "0";
                  }

                  if (field.type === "image") {
                    fieldStyle.backgroundColor = "transparent";
                    fieldStyle.justifyContent = "center";
                    fieldStyle.alignItems = "center";
                    fieldStyle.padding = "2px";
                  }

                  return (
                    <Rnd
                      key={field.id}
                      size={{ width: pixelWidth, height: pixelHeight }}
                      position={{ x: pixelX, y: pixelY }}
                      onDragStop={(e, data) =>
                        handleDragStop(field.id, e, data)
                      }
                      onResizeStop={(e, direction, ref, delta, position) =>
                        handleResizeStop(
                          field.id,
                          e,
                          direction,
                          ref,
                          delta,
                          position,
                        )
                      }
                      enableResizing={isSelected}
                      disableDragging={!isSelected}
                      bounds="parent"
                      dragGrid={[1, 1]}
                      resizeGrid={[1, 1]}
                      scale={zoomLevel} /* ✅ Fix 2 */
                      className={cn(
                        "transition-shadow duration-200",
                        isSelected
                          ? "z-20 ring-2 ring-primary ring-offset-2"
                          : "z-10 hover:ring-1 hover:ring-primary/30",
                        !field.isVisible && "opacity-40",
                      )}
                      /* ✅ Fix 3: classes only, no styles */
                      resizeHandleClasses={{
                        bottomRight: CORNER_HANDLE_CLASS,
                        bottomLeft: CORNER_HANDLE_CLASS,
                        topRight: CORNER_HANDLE_CLASS,
                        topLeft: CORNER_HANDLE_CLASS,
                        bottom: EDGE_V_HANDLE_CLASS,
                        top: EDGE_V_HANDLE_CLASS,
                        left: EDGE_H_HANDLE_CLASS,
                        right: EDGE_H_HANDLE_CLASS,
                      }}
                      onClick={() => handleFieldSelect(field.id)}
                    >
                      <div style={fieldStyle} className="w-full h-full">
                        {getFieldContent(field)}
                      </div>
                    </Rnd>
                  );
                })}

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
            <div className="lg:col-span-1 space-y-4">
              <div className="p-4 bg-muted/20 rounded-lg border">
                <h4 className="font-medium mb-3">Properties</h4>
                {selectedFieldId ? (
                  <div className="space-y-3">
                    {(() => {
                      const field = selectedDesign.fields.find(
                        (f) => f.id === selectedFieldId,
                      );
                      if (!field)
                        return (
                          <p className="text-sm text-muted-foreground">
                            Field not found
                          </p>
                        );
                      return (
                        <>
                          <div>
                            <Label className="text-xs">Label</Label>
                            <Input
                              value={field.label}
                              onChange={(e) =>
                                handleFieldUpdate(field.id, {
                                  label: e.target.value,
                                })
                              }
                              className="h-8 text-xs"
                            />
                          </div>
                          {field.type === "text" && (
                            <div>
                              <Label className="text-xs">Content</Label>
                              <Input
                                value={field.content}
                                onChange={(e) =>
                                  handleFieldUpdate(field.id, {
                                    content: e.target.value,
                                  })
                                }
                                className="h-8 text-xs"
                              />
                            </div>
                          )}
                          {field.type === "image" && (
                            <div>
                              <Label className="text-xs">Image</Label>
                              <input
                                ref={imageFileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleFieldImageUpload(e, field.id)
                                }
                              />
                              {field.imageUrl ? (
                                <div className="relative">
                                  <div className="w-full h-20 rounded border overflow-hidden bg-gray-50">
                                    <img
                                      src={field.imageUrl}
                                      alt={field.label}
                                      className="w-full h-full object-contain"
                                    />
                                  </div>
                                  <div className="flex gap-2 mt-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-xs flex-1"
                                      onClick={() =>
                                        imageFileInputRef.current?.click()
                                      }
                                    >
                                      <Upload className="h-3 w-3 mr-1" />
                                      Replace
                                    </Button>
                                    <Button
                                      color="destructive"
                                      size="sm"
                                      className="text-xs"
                                      onClick={() =>
                                        handleFieldUpdate(field.id, {
                                          imageUrl: undefined,
                                        })
                                      }
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className="w-full h-20 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                                  onClick={() =>
                                    imageFileInputRef.current?.click()
                                  }
                                >
                                  <Upload className="h-6 w-6 text-muted-foreground" />
                                  <span className="text-xs text-muted-foreground mt-1">
                                    Click to upload image
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                          {field.type === "text" && (
                            <>
                              <div>
                                <Label className="text-xs">Font Size</Label>
                                <Input
                                  type="number"
                                  value={field.fontSize || 14}
                                  onChange={(e) =>
                                    handleFieldUpdate(field.id, {
                                      fontSize: parseInt(e.target.value) || 14,
                                    })
                                  }
                                  className="h-8 text-xs"
                                />
                              </div>
                              <div>
                                <Label className="text-xs">Color</Label>
                                <div className="flex gap-2">
                                  <Input
                                    type="color"
                                    value={field.color || "#1a1a2e"}
                                    onChange={(e) =>
                                      handleFieldUpdate(field.id, {
                                        color: e.target.value,
                                      })
                                    }
                                    className="w-12 h-8 p-0"
                                  />
                                  <Input
                                    type="text"
                                    value={field.color || "#1a1a2e"}
                                    onChange={(e) =>
                                      handleFieldUpdate(field.id, {
                                        color: e.target.value,
                                      })
                                    }
                                    className="flex-1 h-8 text-xs"
                                  />
                                </div>
                              </div>
                              <div>
                                <Label className="text-xs">Alignment</Label>
                                <Select
                                  value={field.alignment || "center"}
                                  onValueChange={(value: any) =>
                                    handleFieldUpdate(field.id, {
                                      alignment: value,
                                    })
                                  }
                                >
                                  <SelectTrigger className="h-8 text-xs">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="left">Left</SelectItem>
                                    <SelectItem value="center">
                                      Center
                                    </SelectItem>
                                    <SelectItem value="right">Right</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </>
                          )}
                          {field.type === "shape" && (
                            <div>
                              <Label className="text-xs">Color</Label>
                              <div className="flex gap-2">
                                <Input
                                  type="color"
                                  value={field.color || "#e5e7eb"}
                                  onChange={(e) =>
                                    handleFieldUpdate(field.id, {
                                      color: e.target.value,
                                    })
                                  }
                                  className="w-12 h-8 p-0"
                                />
                                <Input
                                  type="text"
                                  value={field.color || "#e5e7eb"}
                                  onChange={(e) =>
                                    handleFieldUpdate(field.id, {
                                      color: e.target.value,
                                    })
                                  }
                                  className="flex-1 h-8 text-xs"
                                />
                              </div>
                            </div>
                          )}
                          <div className="flex items-center justify-between">
                            <Label className="text-xs">Visible</Label>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">
                                {field.isVisible ? "Yes" : "No"}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 px-2 text-xs"
                                onClick={() =>
                                  handleFieldUpdate(field.id, {
                                    isVisible: !field.isVisible,
                                  })
                                }
                              >
                                Toggle
                              </Button>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label className="text-xs">X</Label>
                              <Input
                                type="number"
                                value={Math.round(field.x)}
                                onChange={(e) =>
                                  handleFieldUpdate(field.id, {
                                    x: parseFloat(e.target.value) || 0,
                                  })
                                }
                                className="h-8 text-xs"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Y</Label>
                              <Input
                                type="number"
                                value={Math.round(field.y)}
                                onChange={(e) =>
                                  handleFieldUpdate(field.id, {
                                    y: parseFloat(e.target.value) || 0,
                                  })
                                }
                                className="h-8 text-xs"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Width</Label>
                              <Input
                                type="number"
                                value={Math.round(field.width)}
                                onChange={(e) =>
                                  handleFieldUpdate(field.id, {
                                    width: parseFloat(e.target.value) || 0,
                                  })
                                }
                                className="h-8 text-xs"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Height</Label>
                              <Input
                                type="number"
                                value={Math.round(field.height)}
                                onChange={(e) =>
                                  handleFieldUpdate(field.id, {
                                    height: parseFloat(e.target.value) || 0,
                                  })
                                }
                                className="h-8 text-xs"
                              />
                            </div>
                          </div>
                          <Button
                            color="destructive"
                            size="sm"
                            className="w-full text-xs"
                            onClick={() => handleFieldDelete(field.id)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete Field
                          </Button>
                        </>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    Select a field to edit its properties
                  </div>
                )}
              </div>
            </div>
          </div>
        </SimpleTabsContent>

        {/* ✅ Fix 1: Real merged Preview */}
        <SimpleTabsContent value="preview">
          <div className="space-y-4">
            {/* Preview Controls */}
            <div className="flex flex-wrap items-center gap-3 p-4 bg-muted/20 rounded-lg border">
              <div className="flex items-center gap-2">
                <Label className="text-xs whitespace-nowrap">Preview as</Label>
                <Select
                  value={previewAttendeeId}
                  onValueChange={setPreviewAttendeeId}
                >
                  <SelectTrigger className="h-8 w-[220px] text-xs">
                    <SelectValue placeholder="Select attendee" />
                  </SelectTrigger>
                  <SelectContent>
                    {attendees.map((a) => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.name} ({a.registrationNumber})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Label className="text-xs whitespace-nowrap">Event</Label>
                <Input
                  value={previewEventName}
                  onChange={(e) => setPreviewEventName(e.target.value)}
                  className="h-8 w-[200px] text-xs"
                />
              </div>

              <div className="flex items-center gap-2">
                <Label className="text-xs whitespace-nowrap">Organizer</Label>
                <Input
                  value={previewOrganizer}
                  onChange={(e) => setPreviewOrganizer(e.target.value)}
                  className="h-8 w-[180px] text-xs"
                />
              </div>
            </div>

            {/* Real Merged Preview */}
            <div className="flex items-center justify-center p-8 bg-muted/20 rounded-lg min-h-[500px]">
              <div
                className="relative bg-white shadow-lg overflow-hidden"
                style={{
                  width: `${canvasWidth}px`,
                  height: `${canvasHeight}px`,
                  borderRadius: `${selectedDesign.settings.borderRadius}px`,
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

                {/* Fields rendered with resolved data */}
                {selectedDesign.fields
                  .filter((f) => f.isVisible)
                  .map((field) => {
                    const pixelX =
                      (field.x / selectedDesign.size.width) * canvasWidth;
                    const pixelY =
                      (field.y / selectedDesign.size.height) * canvasHeight;
                    const pixelWidth =
                      (field.width / selectedDesign.size.width) * canvasWidth;
                    const pixelHeight =
                      (field.height / selectedDesign.size.height) *
                      canvasHeight;

                    const fieldStyle: React.CSSProperties = {
                      position: "absolute",
                      left: pixelX,
                      top: pixelY,
                      width: pixelWidth,
                      height: pixelHeight,
                      display: "flex",
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
                      fontSize: `${field.fontSize || 14}px`,
                      fontFamily: field.fontFamily || "Georgia, serif",
                      fontWeight: field.fontWeight || "normal",
                      color: field.color || "#1a1a2e",
                      lineHeight: "1.3",
                      backgroundColor:
                        field.type === "shape"
                          ? field.color || "#e5e7eb"
                          : "transparent",
                      border:
                        field.type === "shape"
                          ? `2px solid ${field.color || "#6b7280"}`
                          : undefined,
                    };

                    return (
                      <div key={field.id} style={fieldStyle}>
                        {getFieldContent(field, true)}
                      </div>
                    );
                  })}
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
                onChange={handleImageUpload}
              />
              <Button
                className="mt-4"
                color="primary"
                onClick={() => fileInputRef.current?.click()}
                size="sm"
                variant="outline"
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
                        type: "none",
                        imageUrl: undefined,
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

      {/* ✅ Fix 6: Assign / Send Dialog */}
      <CertificateAssignDialog
        open={isAssignDialogOpen}
        onOpenChange={setIsAssignDialogOpen}
        designId={selectedDesign.id}
      />
    </div>
  );
}
