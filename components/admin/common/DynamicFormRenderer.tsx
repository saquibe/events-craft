"use client";

import { useState } from "react";
import { FormField, FormConfig } from "./FormBuilder";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DateTimePicker } from "./DateTimePicker";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DynamicFormRendererProps {
  config: FormConfig;
  values?: Record<string, any>;
  onChange?: (values: Record<string, any>) => void;
  className?: string;
  readOnly?: boolean;
  onFileUpload?: (fieldId: string, file: File) => Promise<string>;
}

export function DynamicFormRenderer({
  config,
  values = {},
  onChange,
  className,
  readOnly = false,
  onFileUpload,
}: DynamicFormRendererProps) {
  const [formValues, setFormValues] = useState<Record<string, any>>(values);
  const [fileUploads, setFileUploads] = useState<Record<string, File>>({});

  const handleFieldChange = (fieldId: string, value: any) => {
    const newValues = { ...formValues, [fieldId]: value };
    setFormValues(newValues);
    if (onChange) {
      onChange(newValues);
    }
  };

  const handleFileChange = async (fieldId: string, file: File) => {
    if (onFileUpload) {
      try {
        const fileUrl = await onFileUpload(fieldId, file);
        handleFieldChange(fieldId, fileUrl);
        setFileUploads({ ...fileUploads, [fieldId]: file });
      } catch (error) {
        console.error("File upload failed:", error);
      }
    } else {
      handleFieldChange(fieldId, file);
      setFileUploads({ ...fileUploads, [fieldId]: file });
    }
  };

  const renderField = (field: FormField) => {
    const value = formValues[field.id] ?? "";

    switch (field.type) {
      case "input":
        return (
          <Input
            type={field.inputType || "text"}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            disabled={readOnly}
            className="w-full"
          />
        );

      case "textarea":
        return (
          <Textarea
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            disabled={readOnly}
            className="w-full min-h-[100px]"
          />
        );

      case "number":
        return (
          <Input
            type="number"
            placeholder={field.placeholder}
            value={value}
            onChange={(e) =>
              handleFieldChange(field.id, parseFloat(e.target.value) || 0)
            }
            disabled={readOnly}
            min={field.min}
            max={field.max}
            step={field.step || 1}
            className="w-full"
          />
        );

      case "date":
        return (
          <DateTimePicker
            value={value}
            onChange={(val) => handleFieldChange(field.id, val)}
          />
        );

      case "dropdown":
        return (
          <Select
            value={value}
            onValueChange={(val) => handleFieldChange(field.id, val)}
            disabled={readOnly}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={`Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "checkbox":
        return (
          <div className="flex flex-col gap-2">
            {field.options && field.options.length > 0 ? (
              field.options.map((option) => {
                const checked = Array.isArray(value)
                  ? value.includes(option)
                  : value === option;
                return (
                  <div key={option} className="flex items-center gap-2">
                    <Checkbox
                      id={`${field.id}-${option}`}
                      checked={checked}
                      onCheckedChange={(checked) => {
                        let newValue;
                        if (Array.isArray(value)) {
                          newValue = checked
                            ? [...value, option]
                            : value.filter((v: string) => v !== option);
                        } else {
                          newValue = checked ? [option] : [];
                        }
                        handleFieldChange(field.id, newValue);
                      }}
                      disabled={readOnly}
                    />
                    <Label
                      htmlFor={`${field.id}-${option}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {option}
                    </Label>
                  </div>
                );
              })
            ) : (
              <div className="flex items-center gap-2">
                <Checkbox
                  id={`${field.id}-checkbox`}
                  checked={value || false}
                  onCheckedChange={(checked) =>
                    handleFieldChange(field.id, checked)
                  }
                  disabled={readOnly}
                />
                <Label
                  htmlFor={`${field.id}-checkbox`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {field.label}
                </Label>
              </div>
            )}
          </div>
        );

      case "radio":
        return (
          <RadioGroup
            value={value}
            onValueChange={(val) => handleFieldChange(field.id, val)}
            disabled={readOnly}
            className="flex flex-col gap-2"
          >
            {field.options?.map((option) => (
              <div key={option} className="flex items-center gap-2">
                <RadioGroupItem value={option} id={`${field.id}-${option}`} />
                <Label
                  htmlFor={`${field.id}-${option}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "file":
        const file = fileUploads[field.id];
        const fileUrl = value;

        return (
          <div className="space-y-2">
            {fileUrl && !file ? (
              <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-md">
                <span className="text-sm text-muted-foreground">
                  File uploaded
                </span>
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm"
                >
                  View file
                </a>
                {!readOnly && (
                  <button
                    type="button"
                    onClick={() => handleFieldChange(field.id, "")}
                    className="ml-auto text-muted-foreground hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ) : file ? (
              <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-md">
                <span className="text-sm text-muted-foreground">
                  {file.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({(file.size / 1024).toFixed(1)} KB)
                </span>
                {!readOnly && (
                  <button
                    type="button"
                    onClick={() => {
                      setFileUploads({
                        ...fileUploads,
                        [field.id]: undefined as any,
                      });
                      handleFieldChange(field.id, "");
                    }}
                    className="ml-auto text-muted-foreground hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ) : (
              !readOnly && (
                <div
                  className={cn(
                    "border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors",
                    "cursor-pointer",
                  )}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const droppedFile = e.dataTransfer.files[0];
                    if (droppedFile) {
                      handleFileChange(field.id, droppedFile);
                    }
                  }}
                  onClick={() =>
                    document.getElementById(`${field.id}-file-input`)?.click()
                  }
                >
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Drop files here or click to upload
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {field.accept
                      ? `Accepted: ${field.accept}`
                      : "All files accepted"}{" "}
                    • Max {field.maxSize || 5}MB
                  </p>
                  <input
                    id={`${field.id}-file-input`}
                    type="file"
                    accept={field.accept}
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFileChange(field.id, file);
                      }
                    }}
                    disabled={readOnly}
                  />
                </div>
              )
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {config.fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <Label className="flex items-center gap-1 text-sm font-medium">
            {field.label}
            {field.required && <span className="text-red-500 text-lg">*</span>}
          </Label>
          {field.description && (
            <p className="text-xs text-muted-foreground">{field.description}</p>
          )}
          {renderField(field)}
        </div>
      ))}
    </div>
  );
}
