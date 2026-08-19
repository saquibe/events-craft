"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Type,
  FileText,
  ChevronDown,
  CheckSquare,
  Circle,
  Calendar,
  Plus,
  Trash2,
  GripVertical,
  Save,
  Eye,
  X,
  Copy,
  Settings2,
  ArrowUp,
  ArrowDown,
  Hash,
  Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Import DnD Kit
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export interface FormField {
  id: string;
  type:
    | "input"
    | "textarea"
    | "dropdown"
    | "checkbox"
    | "radio"
    | "date"
    | "select"
    | "number"
    | "file";
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  description?: string;
  value?: any;
  inputType?: string;
  accept?: string;
  maxSize?: number;
  min?: number;
  max?: number;
  step?: number;
}

export interface FormConfig {
  id: string;
  title: string;
  fields: FormField[];
  createdAt: string;
  updatedAt: string;
}

interface FormBuilderProps {
  onSave: (formData: FormConfig) => void;
  onCancel?: () => void;
  initialConfig?: FormConfig;
  title?: string;
  isSubmitting?: boolean;
}

const fieldTypes = [
  { id: "input", label: "Text Input", icon: Type },
  { id: "textarea", label: "Text Area", icon: FileText },
  { id: "number", label: "Number", icon: Hash },
  { id: "dropdown", label: "Dropdown", icon: ChevronDown },
  { id: "checkbox", label: "Checkbox", icon: CheckSquare },
  { id: "radio", label: "Radio", icon: Circle },
  { id: "date", label: "Date Picker", icon: Calendar },
  { id: "file", label: "File Upload", icon: Upload },
];

const fieldTypeColors: Record<string, string> = {
  input: "bg-blue-50 border-blue-200 text-blue-700",
  textarea: "bg-green-50 border-green-200 text-green-700",
  number: "bg-indigo-50 border-indigo-200 text-indigo-700",
  dropdown: "bg-purple-50 border-purple-200 text-purple-700",
  select: "bg-purple-50 border-purple-200 text-purple-700",
  checkbox: "bg-orange-50 border-orange-200 text-orange-700",
  radio: "bg-pink-50 border-pink-200 text-pink-700",
  date: "bg-cyan-50 border-cyan-200 text-cyan-700",
  file: "bg-amber-50 border-amber-200 text-amber-700",
};

const fieldTypeIcons: Record<string, any> = {
  input: Type,
  textarea: FileText,
  number: Hash,
  dropdown: ChevronDown,
  select: ChevronDown,
  checkbox: CheckSquare,
  radio: Circle,
  date: Calendar,
  file: Upload,
};

// Sortable Field Item Component
interface SortableFieldItemProps {
  field: FormField;
  index: number;
  isSelected: boolean;
  totalFields: number;
  onSelect: (id: string) => void;
  onMove: (id: string, direction: "up" | "down") => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  getFieldTypeLabel: (type: FormField["type"]) => string;
  getFieldIcon: (type: FormField["type"]) => React.ReactNode;
}

function SortableFieldItem({
  field,
  index,
  isSelected,
  totalFields,
  onSelect,
  onMove,
  onDuplicate,
  onDelete,
  getFieldTypeLabel,
  getFieldIcon,
}: SortableFieldItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 1,
  };

  const colorClass =
    fieldTypeColors[field.type] || "bg-gray-50 border-gray-200 text-gray-700";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group flex items-center justify-between p-3 rounded-lg border-2 transition-all cursor-pointer",
        isSelected
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border hover:border-primary/40 hover:bg-muted/30",
        isDragging && "shadow-lg ring-2 ring-primary ring-offset-2",
      )}
      onClick={() => onSelect(field.id)}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-muted-foreground/30 hover:text-muted-foreground transition-colors p-1 -ml-1 hover:bg-muted/50 rounded"
          onClick={(e) => e.stopPropagation()}
          title="Drag to reorder"
        >
          <GripVertical className="h-4 w-4" />
        </div>

        <div
          className={cn("p-1.5 rounded-md border flex-shrink-0", colorClass)}
        >
          {getFieldIcon(field.type)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium truncate">{field.label}</span>
            {field.required && (
              <Badge color="destructive" className="h-4 px-1 text-[9px]">
                required
              </Badge>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            {getFieldTypeLabel(field.type)}
            {field.options && field.options.length > 0 && (
              <> • {field.options.length} options</>
            )}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={(e) => {
                  e.stopPropagation();
                  onMove(field.id, "up");
                }}
                disabled={index === 0}
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move up</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={(e) => {
                  e.stopPropagation();
                  onMove(field.id, "down");
                }}
                disabled={index === totalFields - 1}
              >
                <ArrowDown className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move down</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={(e) => {
                  e.stopPropagation();
                  onDuplicate(field.id);
                }}
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Duplicate</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(field.id);
                }}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export function FormBuilder({
  onSave,
  onCancel,
  initialConfig,
  title = "Custom Fields",
  isSubmitting = false,
}: FormBuilderProps) {
  const [fields, setFields] = useState<FormField[]>(
    initialConfig?.fields || [],
  );
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(
    fields.length > 0 ? fields[0].id : null,
  );
  const [formTitle, setFormTitle] = useState(initialConfig?.title || title);
  const [previewMode, setPreviewMode] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const addField = (type: FormField["type"]) => {
    const typeLabel = fieldTypes.find((f) => f.id === type)?.label || "Field";
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type,
      label: `New ${typeLabel} ${fields.length + 1}`,
      placeholder: type === "input" ? "Enter text..." : "",
      required: false,
      options:
        type === "dropdown" || type === "select" || type === "radio"
          ? ["Option 1"]
          : type === "checkbox"
            ? ["Checkbox 1"]
            : undefined,
      description: "",
      ...(type === "number" ? { min: 0, max: 100, step: 1 } : {}),
      ...(type === "file" ? { accept: "image/*", maxSize: 5 } : {}),
    };
    setFields([...fields, newField]);
    setSelectedFieldId(newField.id);
  };

  const removeField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id));
    if (selectedFieldId === id) {
      setSelectedFieldId(fields.length > 1 ? fields[0].id : null);
    }
  };

  const duplicateField = (id: string) => {
    const fieldToDuplicate = fields.find((f) => f.id === id);
    if (fieldToDuplicate) {
      const newField: FormField = {
        ...fieldToDuplicate,
        id: `field-${Date.now()}`,
        label: `${fieldToDuplicate.label} (Copy)`,
      };
      setFields([...fields, newField]);
      setSelectedFieldId(newField.id);
    }
  };

  const moveField = (id: string, direction: "up" | "down") => {
    const index = fields.findIndex((f) => f.id === id);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === fields.length - 1)
    )
      return;
    const newFields = [...fields];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newFields[index], newFields[targetIndex]] = [
      newFields[targetIndex],
      newFields[index],
    ];
    setFields(newFields);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setFields((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  const selectedField = fields.find((f) => f.id === selectedFieldId);

  const handleSave = () => {
    const formConfig: FormConfig = {
      id: initialConfig?.id || `form-${Date.now()}`,
      title: formTitle,
      fields,
      createdAt: initialConfig?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onSave(formConfig);
  };

  const getFieldTypeLabel = (type: FormField["type"]) => {
    return fieldTypes.find((f) => f.id === type)?.label || type;
  };

  const getFieldIcon = (type: FormField["type"]) => {
    const Icon = fieldTypeIcons[type];
    return Icon ? <Icon className="h-3.5 w-3.5" /> : null;
  };

  const renderFieldPreview = (field: FormField) => {
    switch (field.type) {
      case "input":
        return (
          <Input
            placeholder={field.placeholder}
            disabled
            className="w-full bg-muted/30"
          />
        );
      case "textarea":
        return (
          <Textarea
            placeholder={field.placeholder}
            disabled
            className="w-full min-h-[80px] bg-muted/30"
          />
        );
      case "number":
        return (
          <Input
            type="number"
            placeholder={field.placeholder}
            disabled
            className="w-full bg-muted/30"
          />
        );
      case "dropdown":
        return (
          <div className="w-full p-2 border rounded-md bg-muted/30 text-muted-foreground">
            {field.options?.[0] || "Select option"}
          </div>
        );
      case "select":
        return (
          <div className="w-full p-2 border rounded-md bg-muted/30 text-muted-foreground">
            {field.options?.[0] || "Select option"}
          </div>
        );
      case "checkbox":
        return (
          <div className="flex items-center gap-2">
            <input type="checkbox" disabled className="h-4 w-4" />
            <Label className="text-sm font-normal text-muted-foreground">
              {field.options?.[0] || "Checkbox"}
            </Label>
          </div>
        );
      case "radio":
        return (
          <div className="space-y-1">
            {field.options?.map((option, i) => (
              <div key={i} className="flex items-center gap-2">
                <input type="radio" name={`radio-${field.id}`} disabled />
                <Label className="text-sm font-normal text-muted-foreground">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );
      case "date":
        return <Input type="date" disabled className="w-full bg-muted/30" />;
      case "file":
        return (
          <div className="w-full p-3 border-2 border-dashed rounded-md bg-muted/30 text-center text-muted-foreground">
            <Upload className="h-6 w-6 mx-auto mb-1" />
            <span className="text-sm">Drop files here or click to upload</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap p-4 bg-muted/30 rounded-lg border">
        <div className="flex-1 min-w-[200px]">
          <Label className="text-xs text-muted-foreground mb-1 block">
            Section Title
          </Label>
          <Input
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="text-lg font-semibold border-0 px-0 focus-visible:ring-0 h-auto py-0 bg-transparent"
            placeholder="Custom Fields"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="h-4 w-4 mr-1" />
            {previewMode ? "Edit" : "Preview"}
          </Button>
          {onCancel && (
            <Button
              variant="outline"
              size="sm"
              onClick={onCancel}
              className="cursor-pointer font-bold"
            >
              Cancel
            </Button>
          )}
          <Button
            onClick={handleSave}
            disabled={isSubmitting}
            size="sm"
            className="font-bold cursor-pointer"
            color="primary"
          >
            <Save className="h-4 w-4 mr-1" />
            {isSubmitting ? "Saving..." : "Save Fields"}
          </Button>
        </div>
      </div>

      {previewMode ? (
        <Card>
          <CardContent className="p-6 space-y-6">
            <h3 className="text-lg font-semibold">{formTitle}</h3>
            {fields.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No custom fields added yet</p>
              </div>
            ) : (
              fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label className="flex items-center gap-1 text-default font-medium">
                    {field.label}
                    {field.required && (
                      <span className="text-red-500 text-lg">*</span>
                    )}
                  </Label>
                  {field.description && (
                    <p className="text-xs text-muted-foreground">
                      {field.description}
                    </p>
                  )}
                  {renderFieldPreview(field)}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-4">
            {/* Add Field Buttons */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm font-medium">
                    Add Custom Fields
                  </Label>
                  <Badge color="outline">{fields.length} fields</Badge>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
                  {fieldTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <TooltipProvider key={type.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-auto py-3 flex flex-col gap-1 hover:border-primary hover:bg-primary/5 transition-all"
                              onClick={() =>
                                addField(type.id as FormField["type"])
                              }
                            >
                              <Icon className="h-4 w-4" />
                              <span className="text-[10px] leading-tight">
                                {type.label}
                              </span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            Add {type.label} field
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Field List */}
            <Card className="w-full overflow-hidden">
              <CardContent className="p-4 overflow-hidden">
                <div className="flex items-center justify-between mb-3 gap-2">
                  <Label className="text-sm font-medium">
                    Custom Fields List
                  </Label>
                  {fields.length > 0 && (
                    <span className="text-xs text-muted-foreground shrink-0">
                      {fields.length} fields • Drag to reorder
                    </span>
                  )}
                </div>

                {fields.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed rounded-lg border-muted-foreground/20">
                    <Plus className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground">
                      No custom fields added
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      Click any field type above to add
                    </p>
                  </div>
                ) : (
                  <ScrollArea className="h-[400px] w-full overflow-x-hidden pr-3">
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext
                        items={fields.map((f) => f.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        <div className="space-y-2 pb-2 w-full">
                          {fields.map((field, index) => (
                            <SortableFieldItem
                              key={field.id}
                              field={field}
                              index={index}
                              isSelected={selectedFieldId === field.id}
                              totalFields={fields.length}
                              onSelect={setSelectedFieldId}
                              onMove={moveField}
                              onDuplicate={duplicateField}
                              onDelete={removeField}
                              getFieldTypeLabel={getFieldTypeLabel}
                              getFieldIcon={getFieldIcon}
                            />
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Settings */}
          <div className="lg:col-span-5">
            <Card className="sticky top-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sm">Field Settings</h3>
                  {selectedField && (
                    <Badge color="outline" className="text-xs">
                      {getFieldTypeLabel(selectedField.type)}
                    </Badge>
                  )}
                </div>

                {selectedField ? (
                  <ScrollArea className="h-[500px] pr-3">
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-muted-foreground">
                          Label
                        </Label>
                        <Input
                          value={selectedField.label}
                          onChange={(e) =>
                            updateField(selectedField.id, {
                              label: e.target.value,
                            })
                          }
                          className="h-9"
                          placeholder="Enter field label"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-muted-foreground">
                          Placeholder
                        </Label>
                        <Input
                          value={selectedField.placeholder || ""}
                          onChange={(e) =>
                            updateField(selectedField.id, {
                              placeholder: e.target.value,
                            })
                          }
                          className="h-9"
                          placeholder="Enter placeholder text..."
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-muted-foreground">
                          Description
                        </Label>
                        <Textarea
                          placeholder="Add a description for this field"
                          className="h-16 resize-none"
                          value={selectedField.description || ""}
                          onChange={(e) =>
                            updateField(selectedField.id, {
                              description: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between py-1">
                        <Label className="text-xs font-medium text-muted-foreground">
                          Required field
                        </Label>
                        <Switch
                          checked={selectedField.required}
                          onCheckedChange={(checked) =>
                            updateField(selectedField.id, { required: checked })
                          }
                        />
                      </div>

                      {/* Number specific settings */}
                      {selectedField.type === "number" && (
                        <>
                          <Separator />
                          <div className="space-y-2">
                            <Label className="text-xs font-medium text-muted-foreground">
                              Number Settings
                            </Label>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-1">
                                <Label className="text-xs">Min</Label>
                                <Input
                                  type="number"
                                  value={selectedField.min ?? ""}
                                  onChange={(e) =>
                                    updateField(selectedField.id, {
                                      min: parseFloat(e.target.value) || 0,
                                    })
                                  }
                                  className="h-8"
                                  placeholder="0"
                                />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs">Max</Label>
                                <Input
                                  type="number"
                                  value={selectedField.max ?? ""}
                                  onChange={(e) =>
                                    updateField(selectedField.id, {
                                      max: parseFloat(e.target.value) || 100,
                                    })
                                  }
                                  className="h-8"
                                  placeholder="100"
                                />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Step</Label>
                              <Input
                                type="number"
                                value={selectedField.step ?? 1}
                                onChange={(e) =>
                                  updateField(selectedField.id, {
                                    step: parseFloat(e.target.value) || 1,
                                  })
                                }
                                className="h-8"
                                placeholder="1"
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {/* File specific settings */}
                      {selectedField.type === "file" && (
                        <>
                          <Separator />
                          <div className="space-y-2">
                            <Label className="text-xs font-medium text-muted-foreground">
                              File Settings
                            </Label>
                            <div className="space-y-1">
                              <Label className="text-xs">
                                Accepted File Types
                              </Label>
                              <Input
                                value={selectedField.accept || ""}
                                onChange={(e) =>
                                  updateField(selectedField.id, {
                                    accept: e.target.value,
                                  })
                                }
                                className="h-8"
                                placeholder="image/*, .pdf, .doc"
                              />
                              <p className="text-[10px] text-muted-foreground">
                                Comma separated: image/*, .pdf, .docx
                              </p>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">
                                Max File Size (MB)
                              </Label>
                              <Input
                                type="number"
                                value={selectedField.maxSize ?? 5}
                                onChange={(e) =>
                                  updateField(selectedField.id, {
                                    maxSize: parseFloat(e.target.value) || 5,
                                  })
                                }
                                className="h-8"
                                placeholder="5"
                              />
                            </div>
                          </div>
                        </>
                      )}

                      <Separator />

                      {(selectedField.type === "dropdown" ||
                        selectedField.type === "select" ||
                        selectedField.type === "checkbox" ||
                        selectedField.type === "radio") && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs font-medium text-muted-foreground">
                              Options
                            </Label>
                            <span className="text-xs text-muted-foreground">
                              {selectedField.options?.length || 0} items
                            </span>
                          </div>

                          <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                            {selectedField.options?.map((option, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 group"
                              >
                                <div className="flex-1">
                                  <Input
                                    value={option}
                                    onChange={(e) => {
                                      const newOptions = [
                                        ...(selectedField.options || []),
                                      ];
                                      newOptions[index] = e.target.value;
                                      updateField(selectedField.id, {
                                        options: newOptions,
                                      });
                                    }}
                                    className="h-8 text-sm"
                                    placeholder={`Option ${index + 1}`}
                                  />
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
                                  onClick={() => {
                                    const newOptions =
                                      selectedField.options?.filter(
                                        (_, i) => i !== index,
                                      ) || [];
                                    updateField(selectedField.id, {
                                      options: newOptions,
                                    });
                                  }}
                                >
                                  <X className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            ))}
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full h-8 text-xs"
                            onClick={() => {
                              const newOptions = [
                                ...(selectedField.options || []),
                                `Option ${
                                  (selectedField.options?.length || 0) + 1
                                }`,
                              ];
                              updateField(selectedField.id, {
                                options: newOptions,
                              });
                            }}
                          >
                            <Plus className="h-3.5 w-3.5 mr-1" />
                            Add Option
                          </Button>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <div className="bg-muted/30 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                      <Settings2 className="h-6 w-6 text-muted-foreground/50" />
                    </div>
                    <p className="text-sm font-medium">No field selected</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      Click a field from the list to edit its settings
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
