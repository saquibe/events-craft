// components/admin/onsite/BadgeDesigner.tsx
"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { Rnd } from "react-rnd";
import { useBadgeDesign, type BadgeField } from "./BadgeDesignContext";
import { resolveBadgeTemplate, formatBadgeDate } from "./templateResolver";
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
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  Trash2,
  Image as ImageIcon,
  Square,
  Upload,
  QrCode,
  Type,
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

// Handle styling — same as certificate
const RESIZE_HANDLE_CLASS =
  "bg-blue-500 border-2 border-white shadow-md rounded-full transition-transform hover:scale-125";
const CORNER_HANDLE_CLASS = `${RESIZE_HANDLE_CLASS} w-3 h-3`;
const EDGE_H_HANDLE_CLASS = `${RESIZE_HANDLE_CLASS} w-3 h-2`;
const EDGE_V_HANDLE_CLASS = `${RESIZE_HANDLE_CLASS} w-2 h-3`;

interface BadgeDesignerProps {
  templateId: string | null;
  onSave: () => void;
  onCancel: () => void;
}

export function BadgeDesigner({
  templateId,
  onSave,
  onCancel,
}: BadgeDesignerProps) {
  const { getTemplateById, updateTemplate } = useBadgeDesign();
  const existingTemplate = templateId ? getTemplateById(templateId) : null;

  // Local editable state
  const [template, setTemplate] = useState(() =>
    existingTemplate
      ? { ...existingTemplate }
      : {
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

  // Re-sync when template changes
  useEffect(() => {
    if (existingTemplate) setTemplate({ ...existingTemplate });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateId]);

  // ✅ SimpleTabs now has front/back/preview
  const [activeTab, setActiveTab] = useState<"front" | "back" | "preview">(
    "front",
  );
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [showPunchingArea, setShowPunchingArea] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isBackgroundDialogOpen, setIsBackgroundDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fieldToDelete, setFieldToDelete] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageFileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Preview context (mock)
  const [previewAttendeeName, setPreviewAttendeeName] =
    useState("Alexander Fleming");
  const [previewCompany, setPreviewCompany] = useState("Zylker Corporation");
  const [previewEventName, setPreviewEventName] =
    useState("Zylker Summit 2024");
  const [previewBadgeType, setPreviewBadgeType] = useState("VIP PASS");
  const [previewEventDate, setPreviewEventDate] = useState("2024-10-15");

  const previewContext = useMemo(
    () => ({
      attendeeName: previewAttendeeName,
      company: previewCompany,
      eventName: previewEventName,
      badgeType: previewBadgeType,
      eventDate: formatBadgeDate(previewEventDate),
    }),
    [
      previewAttendeeName,
      previewCompany,
      previewEventName,
      previewBadgeType,
      previewEventDate,
    ],
  );

  const resolveFieldDisplay = (field: BadgeField): string => {
    return resolveBadgeTemplate(field.content, previewContext);
  };

  // Seed defaults for new templates
  useEffect(() => {
    if (
      template.frontSide.length === 0 &&
      template.backSide.length === 0 &&
      existingTemplate === null
    ) {
      // Compute font size as ~70% of box pixel height
      const pxPerMm = 500 / template.size.width;
      const fontForHeight = (hMm: number) => Math.round(hMm * pxPerMm * 0.7);

      const defaultFields: BadgeField[] = [
        {
          id: "event-name",
          type: "text",
          label: "Event Name",
          content: "{{eventName}}",
          x: 15,
          y: 20,
          width: 75,
          height: 12,
          fontSize: fontForHeight(12), // ✅ ~28
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
          content: "{{fullName}}",
          x: 15,
          y: 50,
          width: 75,
          height: 20,
          fontSize: fontForHeight(20), // ✅ ~48
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
          content: "{{company}}",
          x: 15,
          y: 82,
          width: 75,
          height: 12,
          fontSize: fontForHeight(12), // ✅ ~28
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
          content: "{{badgeType}}",
          x: 15,
          y: 115,
          width: 75,
          height: 14,
          fontSize: fontForHeight(14), // ✅ ~34
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Field preset categories (same idea as certificate)
  const fieldCategories = {
    "User Info": [
      { id: "fullName", label: "Full Name", content: "{{fullName}}" },
      {
        id: "registrationNumber",
        label: "Registration #",
        content: "{{registrationNumber}}",
      },
      {
        id: "attendeeProfile",
        label: "Profile",
        content: "{{attendeeProfile}}",
      },
      { id: "company", label: "Company", content: "{{company}}" },
      { id: "city", label: "City", content: "{{city}}" },
      { id: "country", label: "Country", content: "{{country}}" },
    ],
    Event: [
      { id: "eventName", label: "Event Name", content: "{{eventName}}" },
      { id: "eventDate", label: "Event Date", content: "{{eventDate}}" },
      { id: "organizer", label: "Organizer", content: "{{organizer}}" },
      { id: "badgeType", label: "Badge Type", content: "{{badgeType}}" },
    ],
  };

  // Background upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      setTemplate((prev) => ({
        ...prev,
        background: {
          ...prev.background,
          type: "image",
          imageUrl,
          value: "#ffffff",
        },
        updatedAt: new Date().toISOString(),
      }));
      setIsBackgroundDialogOpen(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFieldImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldId: string,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      handleFieldUpdate(fieldId, { imageUrl });
    };
    reader.readAsDataURL(file);
  };

  // Field content renderer
  const getFieldContent = (field: BadgeField, forPreview = false) => {
    if (field.type === "text") {
      return forPreview
        ? resolveFieldDisplay(field)
        : field.content || "Text Field";
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
          <ImageIcon className="w-5 h-5 mb-1" />
          <span>Upload Image</span>
        </div>
      );
    }
    if (field.type === "qr") {
      return (
        <div className="w-full h-full bg-white border border-gray-200 grid grid-cols-5 grid-rows-5 gap-[1px] p-1">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className={(i * 7 + 3) % 3 === 0 ? "bg-black" : "bg-white"}
            />
          ))}
        </div>
      );
    }
    if (field.type === "rectangle") return null;
    return null;
  };

  // Add fields
  const handleAddField = (category: string, fieldData: any) => {
    // Compute a good font size based on default box height (12mm)
    const pxPerMm = 500 / template.size.width;
    const boxHeightMm = 12;
    const goodFontSize = Math.round(boxHeightMm * pxPerMm * 0.7);

    const newField: BadgeField = {
      id: `field-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type: "text",
      label: fieldData.label,
      content: fieldData.content,
      x: 15,
      y: 20 + Math.random() * 40,
      width: 60,
      height: boxHeightMm,
      fontSize: goodFontSize, // ✅ scaled to box
      fontFamily: "Arial",
      fontWeight: "normal",
      color: "#1a1a2e",
      alignment: "center",
      isVisible: true,
      isEditable: true,
    };
    addFieldToActiveSide(newField);
  };

  const handleAddImageField = () => {
    addFieldToActiveSide({
      id: `field-${Date.now()}`,
      type: "image",
      label: "Image",
      content: "",
      x: 20,
      y: 20,
      width: 40,
      height: 40,
      isVisible: true,
      isEditable: true,
    });
  };

  const handleAddQRField = () => {
    addFieldToActiveSide({
      id: `field-${Date.now()}`,
      type: "qr",
      label: "QR Code",
      content: "https://zylker.com/attendee/12345",
      x: 30,
      y: 40,
      width: 45,
      height: 45,
      isVisible: true,
      isEditable: true,
    });
  };

  const handleAddShapeField = () => {
    addFieldToActiveSide({
      id: `field-${Date.now()}`,
      type: "rectangle",
      label: "Rectangle",
      content: "",
      x: 20,
      y: 20,
      width: 60,
      height: 20,
      color: "#e5e7eb",
      backgroundColor: "#e5e7eb",
      isVisible: true,
      isEditable: true,
    });
  };

  const addFieldToActiveSide = (field: BadgeField) => {
    const side = activeTab === "back" ? "back" : "front";
    setTemplate((prev) => ({
      ...prev,
      [side === "front" ? "frontSide" : "backSide"]: [
        ...prev[side === "front" ? "frontSide" : "backSide"],
        field,
      ],
      updatedAt: new Date().toISOString(),
    }));
    setSelectedFieldId(field.id);
  };

  // Cross-side update
  const handleFieldUpdate = (fieldId: string, updates: Partial<BadgeField>) => {
    setTemplate((prev) => {
      const inFront = prev.frontSide.some((f) => f.id === fieldId);
      const inBack = prev.backSide.some((f) => f.id === fieldId);
      if (!inFront && !inBack) return prev;

      const updateList = (list: BadgeField[]) =>
        list.map((f) => (f.id === fieldId ? { ...f, ...updates } : f));

      return {
        ...prev,
        frontSide: inFront ? updateList(prev.frontSide) : prev.frontSide,
        backSide: inBack ? updateList(prev.backSide) : prev.backSide,
        updatedAt: new Date().toISOString(),
      };
    });
  };

  const handleFieldDelete = (fieldId: string) => {
    setTemplate((prev) => ({
      ...prev,
      frontSide: prev.frontSide.filter((f) => f.id !== fieldId),
      backSide: prev.backSide.filter((f) => f.id !== fieldId),
      updatedAt: new Date().toISOString(),
    }));
    if (selectedFieldId === fieldId) setSelectedFieldId(null);
    setDeleteDialogOpen(false);
    setFieldToDelete(null);
  };

  const handleFieldSelect = (fieldId: string) => setSelectedFieldId(fieldId);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setSelectedFieldId(null);
  };

  // Drag/resize
  const handleDragStop = (
    fieldId: string,
    e: any,
    data: { x: number; y: number },
  ) => {
    const cw = containerRef.current?.offsetWidth || 500;
    const ch = containerRef.current?.offsetHeight || 700;
    const dw = template.size.width;
    const dh = template.size.height;

    handleFieldUpdate(fieldId, {
      x: Math.round(Math.max(0, Math.min(dw - 5, (data.x / cw) * dw))),
      y: Math.round(Math.max(0, Math.min(dh - 5, (data.y / ch) * dh))),
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
    const cw = containerRef.current?.offsetWidth || 500;
    const ch = containerRef.current?.offsetHeight || 700;
    const dw = template.size.width;
    const dh = template.size.height;

    const newWidth = parseInt(ref.style.width);
    const newHeight = parseInt(ref.style.height);
    const widthPercent = (newWidth / cw) * dw;
    const heightPercent = (newHeight / ch) * dh;

    const field = [...template.frontSide, ...template.backSide].find(
      (f) => f.id === fieldId,
    );

    let newFontSize: number | undefined;
    if (field && field.type === "text") {
      const currentFontSize = field.fontSize || 14;

      // ✅ CERTIFICATE FORMULA — use raw pixel area
      const oldWidthPx = ((field.width || 1) / dw) * cw;
      const oldHeightPx = ((field.height || 1) / dh) * ch;
      const oldPixelArea = oldWidthPx * oldHeightPx;
      const newPixelArea = newWidth * newHeight;

      const areaScale = Math.sqrt(newPixelArea / oldPixelArea);
      newFontSize = Math.max(
        8,
        Math.min(80, Math.round(currentFontSize * areaScale)),
      );
    }

    handleFieldUpdate(fieldId, {
      width: Math.round(Math.max(10, widthPercent)),
      height: Math.round(Math.max(8, heightPercent)),
      x: Math.round(Math.max(0, Math.min(dw - 5, (position.x / cw) * dw))),
      y: Math.round(Math.max(0, Math.min(dh - 5, (position.y / ch) * dh))),
      ...(newFontSize !== undefined ? { fontSize: newFontSize } : {}),
    });
  };

  const handleSave = () => {
    if (existingTemplate) updateTemplate(existingTemplate.id, template);
    onSave();
  };

  const activeFields =
    activeTab === "front"
      ? template.frontSide
      : activeTab === "back"
        ? template.backSide
        : [];

  const selectedField = selectedFieldId
    ? ([...template.frontSide, ...template.backSide].find(
        (f) => f.id === selectedFieldId,
      ) ?? null)
    : null;

  const canvasWidth = 500;
  const canvasHeight =
    (template.size.height / template.size.width) * canvasWidth;

  const renderFieldStyle = (field: BadgeField): React.CSSProperties => {
    const base: React.CSSProperties = {
      display: field.isVisible ? "flex" : "none",
      alignItems: "center",
      justifyContent:
        field.alignment === "center"
          ? "center"
          : field.alignment === "right"
            ? "flex-end"
            : "flex-start",
      padding: "4px 6px", // ← default for all (same as cert)
      overflow: "hidden",
      wordBreak: "break-word",
      userSelect: "none",
      width: "100%",
      height: "100%",
      boxSizing: "border-box",
      fontSize: `${field.fontSize || 14}px`,
      fontFamily: field.fontFamily || "Arial, sans-serif",
      fontWeight: field.fontWeight || "normal",
      color: field.color || "#1a1a2e",
      lineHeight: "1.2",
      backgroundColor:
        field.type === "rectangle"
          ? field.backgroundColor || field.color || "#e5e7eb"
          : field.type === "qr"
            ? "#fff"
            : "transparent",
      border:
        field.type === "rectangle"
          ? `1px solid ${field.color || "#6b7280"}`
          : field.type === "qr"
            ? "1px solid #e5e7eb"
            : undefined,
    };

    // Same overrides as certificate
    if (field.type === "rectangle") {
      base.padding = "0";
    }
    if (field.type === "image") {
      base.padding = "2px";
    }

    return base;
  };

  if (existingTemplate === null && template.id === "") {
    // Unreachable — page always creates template before opening designer
  }

  return (
    <div className="space-y-4">
      {/* Header — same pattern as certificate */}
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
              {template.size.unit} • {template.orientation} • {template.type}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Label className="text-xs whitespace-nowrap">Orientation</Label>
            <Select
              value={template.orientation}
              onValueChange={(value: any) => {
                const { width, height } = template.size;
                setTemplate((prev) => ({
                  ...prev,
                  orientation: value,
                  size: {
                    ...prev.size,
                    width:
                      value === "portrait"
                        ? Math.min(width, height)
                        : Math.max(width, height),
                    height:
                      value === "portrait"
                        ? Math.max(width, height)
                        : Math.min(width, height),
                  },
                  updatedAt: new Date().toISOString(),
                }));
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
            onClick={() => setShowPunchingArea(!showPunchingArea)}
          >
            {showPunchingArea ? (
              <EyeOff className="h-3 w-3 mr-1" />
            ) : (
              <Eye className="h-3 w-3 mr-1" />
            )}
            {showPunchingArea ? "Hide" : "Show"} Punch
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-8"
            onClick={() => setIsBackgroundDialogOpen(true)}
          >
            <Upload className="h-3 w-3 mr-1" />
            Background
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

      {/* Tabs: Front / Back / Preview — same as Design/Preview */}
      <SimpleTabs
        className="w-full"
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as "front" | "back" | "preview")}
      >
        <SimpleTabsList>
          <SimpleTabsTrigger value="front">Front</SimpleTabsTrigger>
          <SimpleTabsTrigger value="back">Back</SimpleTabsTrigger>
          <SimpleTabsTrigger value="preview">Preview</SimpleTabsTrigger>
        </SimpleTabsList>

        {/* ================= FRONT / BACK ================= */}
        {(["front", "back"] as const).map((side) => (
          <SimpleTabsContent key={side} value={side} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* Left — Presets */}
              <div className="lg:col-span-1 space-y-4">
                <div className="p-3 bg-muted/20 rounded-lg border">
                  <h4 className="font-medium text-sm mb-3">Add Fields</h4>
                  <div className="space-y-3">
                    {Object.entries(fieldCategories).map(
                      ([category, fields]) => (
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
                      ),
                    )}

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
                          onClick={handleAddQRField}
                        >
                          <QrCode className="h-3 w-3 mr-1" />
                          QR
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

              {/* Center — Canvas */}
              <div className="lg:col-span-2">
                <div
                  ref={containerRef}
                  className="relative bg-white rounded-lg shadow-lg overflow-visible border mx-auto"
                  style={{
                    width: canvasWidth,
                    height: canvasHeight,
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: "top center",
                    transition: "transform 0.2s",
                  }}
                  onClick={handleCanvasClick}
                >
                  {/* Background */}
                  {template.background.type !== "none" && (
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          template.background.type === "gradient"
                            ? template.background.value
                            : template.background.type === "color"
                              ? template.background.value
                              : undefined,
                        backgroundImage:
                          template.background.type === "image" &&
                          template.background.imageUrl
                            ? `url(${template.background.imageUrl})`
                            : undefined,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  )}

                  {/* Punching area */}
                  {showPunchingArea && (
                    <div
                      className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center justify-center border-2 border-dashed border-red-300/70 rounded-full pointer-events-none z-30"
                      style={{ width: 40, height: 14 }}
                    >
                      <span className="text-[8px] text-red-400">punch</span>
                    </div>
                  )}

                  {/* Fields */}
                  {(side === "front"
                    ? template.frontSide
                    : template.backSide
                  ).map((field) => {
                    const isSelected = selectedFieldId === field.id;

                    const pixelX =
                      (field.x / template.size.width) * canvasWidth;
                    const pixelY =
                      (field.y / template.size.height) * canvasHeight;
                    const pixelWidth =
                      (field.width / template.size.width) * canvasWidth;
                    const pixelHeight =
                      (field.height / template.size.height) * canvasHeight;

                    return (
                      <Rnd
                        key={field.id}
                        size={{ width: pixelWidth, height: pixelHeight }}
                        position={{ x: pixelX, y: pixelY }}
                        onDragStop={(e, data) =>
                          handleDragStop(field.id, e, data)
                        }
                        onResizeStop={(e, dir, ref, delta, pos) =>
                          handleResizeStop(field.id, e, dir, ref, delta, pos)
                        }
                        enableResizing={isSelected}
                        disableDragging={!isSelected}
                        bounds="parent"
                        dragGrid={[1, 1]}
                        resizeGrid={[1, 1]}
                        scale={zoomLevel}
                        className={cn(
                          "transition-shadow duration-200",
                          isSelected
                            ? "z-20 ring-2 ring-primary ring-offset-2"
                            : "z-10 hover:ring-1 hover:ring-primary/30",
                          !field.isVisible && "opacity-40",
                        )}
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
                        {/* ✅ Notice: NO box class, NO w-full h-full conflict */}
                        <div
                          style={{
                            ...renderFieldStyle(field),
                            boxSizing: "border-box",
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          {getFieldContent(field)}
                        </div>
                      </Rnd>
                    );
                  })}

                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 whitespace-nowrap capitalize">
                    {side} side • {template.size.width} × {template.size.height}{" "}
                    {template.size.unit} • {template.orientation}
                  </div>
                </div>

                <div className="text-center text-xs text-muted-foreground mt-8">
                  {selectedFieldId ? (
                    <span>
                      Selected field: Drag to move • Drag handles to resize
                    </span>
                  ) : (
                    <span>Click any field to select & edit</span>
                  )}
                </div>
              </div>

              {/* Right — Properties (SAME AS CERTIFICATE) */}
              <div className="lg:col-span-1 space-y-4">
                <div className="p-4 bg-muted/20 rounded-lg border">
                  <h4 className="font-medium mb-3">Properties</h4>
                  {selectedFieldId ? (
                    <div className="space-y-3">
                      {(() => {
                        const field = [
                          ...template.frontSide,
                          ...template.backSide,
                        ].find((f) => f.id === selectedFieldId);
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

                            {(field.type === "text" || field.type === "qr") && (
                              <div>
                                <Label className="text-xs">
                                  {field.type === "qr"
                                    ? "QR Content"
                                    : "Content"}
                                </Label>
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
                                      Click to upload
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
                                        fontSize:
                                          parseInt(e.target.value) || 14,
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
                                      <SelectItem value="right">
                                        Right
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </>
                            )}

                            {field.type === "rectangle" && (
                              <div>
                                <Label className="text-xs">Fill Color</Label>
                                <div className="flex gap-2">
                                  <Input
                                    type="color"
                                    value={
                                      field.backgroundColor ||
                                      field.color ||
                                      "#e5e7eb"
                                    }
                                    onChange={(e) =>
                                      handleFieldUpdate(field.id, {
                                        backgroundColor: e.target.value,
                                        color: e.target.value,
                                      })
                                    }
                                    className="w-12 h-8 p-0"
                                  />
                                  <Input
                                    type="text"
                                    value={
                                      field.backgroundColor ||
                                      field.color ||
                                      "#e5e7eb"
                                    }
                                    onChange={(e) =>
                                      handleFieldUpdate(field.id, {
                                        backgroundColor: e.target.value,
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
                              {(["x", "y", "width", "height"] as const).map(
                                (k) => (
                                  <div key={k}>
                                    <Label className="text-xs capitalize">
                                      {k}
                                    </Label>
                                    <Input
                                      type="number"
                                      value={Math.round(field[k])}
                                      onChange={(e) =>
                                        handleFieldUpdate(field.id, {
                                          [k]: parseFloat(e.target.value) || 0,
                                        })
                                      }
                                      className="h-8 text-xs"
                                    />
                                  </div>
                                ),
                              )}
                            </div>

                            <Button
                              color="destructive"
                              size="sm"
                              className="w-full text-xs"
                              onClick={() => {
                                setFieldToDelete(field.id);
                                setDeleteDialogOpen(true);
                              }}
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
        ))}

        {/* ================= PREVIEW ================= */}
        <SimpleTabsContent value="preview">
          <div className="space-y-4">
            {/* Preview Controls */}
            <div className="flex flex-wrap items-center gap-3 p-4 bg-muted/20 rounded-lg border">
              <div className="flex items-center gap-2">
                <Label className="text-xs whitespace-nowrap">Name</Label>
                <Input
                  value={previewAttendeeName}
                  onChange={(e) => setPreviewAttendeeName(e.target.value)}
                  className="h-8 w-[180px] text-xs"
                />
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-xs whitespace-nowrap">Company</Label>
                <Input
                  value={previewCompany}
                  onChange={(e) => setPreviewCompany(e.target.value)}
                  className="h-8 w-[180px] text-xs"
                />
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-xs whitespace-nowrap">Event</Label>
                <Input
                  value={previewEventName}
                  onChange={(e) => setPreviewEventName(e.target.value)}
                  className="h-8 w-[180px] text-xs"
                />
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-xs whitespace-nowrap">Badge Type</Label>
                <Input
                  value={previewBadgeType}
                  onChange={(e) => setPreviewBadgeType(e.target.value)}
                  className="h-8 w-[120px] text-xs"
                />
              </div>
            </div>

            {/* Real merged preview — front only (or side by side) */}
            <div className="flex items-center justify-center gap-6 p-8 bg-muted/20 rounded-lg min-h-[500px] flex-wrap">
              {(["front", "back"] as const).map((side) => {
                const sideFields =
                  side === "front" ? template.frontSide : template.backSide;
                return (
                  <div key={side} className="flex flex-col items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground capitalize">
                      {side} Side
                    </span>
                    <div
                      className="relative bg-white shadow-lg overflow-hidden border"
                      style={{
                        width: `${canvasWidth}px`,
                        height: `${canvasHeight}px`,
                        transform: "scale(0.6)",
                        transformOrigin: "top center",
                      }}
                    >
                      {template.background.type !== "none" && (
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              template.background.type === "gradient"
                                ? template.background.value
                                : template.background.type === "color"
                                  ? template.background.value
                                  : undefined,
                            backgroundImage:
                              template.background.type === "image" &&
                              template.background.imageUrl
                                ? `url(${template.background.imageUrl})`
                                : undefined,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                      )}

                      {sideFields
                        .filter((f) => f.isVisible)
                        .map((field) => {
                          const pixelX =
                            (field.x / template.size.width) * canvasWidth;
                          const pixelY =
                            (field.y / template.size.height) * canvasHeight;
                          const pixelWidth =
                            (field.width / template.size.width) * canvasWidth;
                          const pixelHeight =
                            (field.height / template.size.height) *
                            canvasHeight;

                          return (
                            <div
                              key={field.id}
                              style={{
                                ...renderFieldStyle(field), // 👈 SAME function
                                position: "absolute",
                                left: pixelX,
                                top: pixelY,
                                width: pixelWidth,
                                height: pixelHeight,
                              }}
                            >
                              {getFieldContent(field, true)}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </SimpleTabsContent>
      </SimpleTabs>

      {/* Background Dialog */}
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
            {template.background.imageUrl && (
              <div className="relative">
                <div className="w-full h-32 rounded border overflow-hidden bg-gray-50">
                  <img
                    src={template.background.imageUrl}
                    alt="Background"
                    className="w-full h-full object-contain"
                  />
                </div>
                <Button
                  color="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() =>
                    setTemplate((prev) => ({
                      ...prev,
                      background: {
                        ...prev.background,
                        type: "none",
                        imageUrl: undefined,
                      },
                      updatedAt: new Date().toISOString(),
                    }))
                  }
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

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Field</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this field? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (fieldToDelete) handleFieldDelete(fieldToDelete);
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
