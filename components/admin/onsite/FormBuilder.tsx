"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
} from "lucide-react";

interface FormField {
  id: string;
  type: "input" | "textarea" | "dropdown" | "checkbox" | "radio" | "date";
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  value?: any;
}

interface FormBuilderProps {
  onSave: (formData: any) => void;
  initialFields?: FormField[];
}

export function FormBuilder({ onSave, initialFields = [] }: FormBuilderProps) {
  const [fields, setFields] = useState<FormField[]>(initialFields);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState("Untitled Form");

  const fieldTypes = [
    { id: "input", label: "Input", icon: Type },
    { id: "textarea", label: "Textarea", icon: FileText },
    { id: "dropdown", label: "Dropdown", icon: ChevronDown },
    { id: "checkbox", label: "Checkbox", icon: CheckSquare },
    { id: "radio", label: "Radio", icon: Circle },
    { id: "date", label: "Date Picker", icon: Calendar },
  ];

  const addField = (type: FormField["type"]) => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type,
      label: `New Field ${fields.length + 1}`,
      placeholder: type === "input" ? "Enter text..." : "",
      required: false,
      options:
        type === "dropdown" || type === "radio" ? ["Option 1"] : undefined,
    };
    setFields([...fields, newField]);
    setSelectedFieldId(newField.id);
  };

  const removeField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id));
    if (selectedFieldId === id) {
      setSelectedFieldId(null);
    }
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  const selectedField = fields.find((f) => f.id === selectedFieldId);

  const handleSave = () => {
    onSave({
      title: formTitle,
      fields,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Input
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          className="text-2xl font-bold border-0 px-0 focus-visible:ring-0 w-auto"
          placeholder="Untitled Form"
        />
        <Button onClick={handleSave}>Save Form</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Field Types */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Add Fields</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {fieldTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <Button
                    key={type.id}
                    variant="outline"
                    className="h-auto py-3 flex flex-col gap-1"
                    onClick={() => addField(type.id as FormField["type"])}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-xs">{type.label}</span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Form Preview */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Form Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-[500px] overflow-y-auto">
            {fields.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Plus className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Add fields to build your form</p>
              </div>
            ) : (
              fields.map((field) => (
                <div
                  key={field.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedFieldId === field.id
                      ? "border-primary bg-primary/5"
                      : "hover:border-border"
                  }`}
                  onClick={() => setSelectedFieldId(field.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                        <p className="text-sm font-medium">
                          {field.label}
                          {field.required && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {field.type.charAt(0).toUpperCase() +
                          field.type.slice(1)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeField(field.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Field Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Field Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedField ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Label</Label>
                  <Input
                    value={selectedField.label}
                    onChange={(e) =>
                      updateField(selectedField.id, { label: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Field</Label>
                  <Input
                    value={selectedField.placeholder || ""}
                    onChange={(e) =>
                      updateField(selectedField.id, {
                        placeholder: e.target.value,
                      })
                    }
                    placeholder="Field placeholder"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Field description" className="h-20" />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Required</Label>
                  <Switch
                    checked={selectedField.required}
                    onCheckedChange={(checked) =>
                      updateField(selectedField.id, { required: checked })
                    }
                  />
                </div>

                {(selectedField.type === "dropdown" ||
                  selectedField.type === "radio") && (
                  <div className="space-y-2">
                    <Label>Options</Label>
                    {selectedField.options?.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
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
                        />
                        <Button
                          variant="ghost"
                          size="sm"
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
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newOptions = [
                          ...(selectedField.options || []),
                          `Option ${(selectedField.options?.length || 0) + 1}`,
                        ];
                        updateField(selectedField.id, { options: newOptions });
                      }}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Option
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">Select a field to edit</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
