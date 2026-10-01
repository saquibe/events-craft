"use client";

import { Plus, Trash2 } from "lucide-react";
import { DatePicker } from "@/components/admin/common/DatePicker";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type SlabAdditionalFieldType = "textbox" | "file" | "radio" | "checkbox" | "date";
export type SlabAdditionalField = {
  id: string;
  label: string;
  type: SlabAdditionalFieldType;
  options: string[];
  value?: string | boolean;
};

const types: { value: SlabAdditionalFieldType; label: string }[] = [
  { value: "textbox", label: "Text box" },
  { value: "file", label: "Upload file" },
  { value: "radio", label: "Radio button" },
  { value: "checkbox", label: "Checkbox" },
  { value: "date", label: "Date picker" },
];

export function SlabAdditionalFieldsBuilder({
  fields,
  onChange,
}: {
  fields: SlabAdditionalField[];
  onChange: (fields: SlabAdditionalField[]) => void;
}) {
  const addField = (type: SlabAdditionalFieldType) => {
    const defaults = type === "radio" || type === "checkbox" ? ["Option 1", "Option 2"] : [];
    onChange([...fields, { id: `slab-field-${Date.now()}-${fields.length}`, label: "", type, options: defaults }]);
  };

  const updateField = (id: string, patch: Partial<SlabAdditionalField>) => {
    onChange(fields.map((field) => field.id === id ? { ...field, ...patch } : field));
  };

  return <div className="space-y-4 rounded-lg border p-4">
    <div>
      <h3 className="text-sm font-semibold">Add custom fields</h3>
      <p className="text-xs text-muted-foreground">Choose a field type. Its input and settings will appear below.</p>
    </div>
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {types.map((type) => <Button key={type.value} type="button" variant="outline" size="sm" className="justify-start gap-2" onClick={() => addField(type.value)}><Plus className="h-3.5 w-3.5"/>{type.label}</Button>)}
    </div>
    {fields.length === 0 && <p className="rounded-md bg-muted/40 p-3 text-sm text-muted-foreground">No additional fields added.</p>}
    <div className="space-y-3">
      {fields.map((field) => <div key={field.id} className="space-y-3 rounded-lg border bg-muted/20 p-3">
        <div className="flex items-end gap-2">
          <div className="flex-1 space-y-2"><Label className="text-default">Field label</Label><Input value={field.label} onChange={(event) => updateField(field.id, { label: event.target.value })} placeholder="Enter field label"/></div>
          <Button type="button" variant="ghost" size="icon" aria-label={`Remove ${field.label || "custom field"}`} onClick={() => onChange(fields.filter((item) => item.id !== field.id))}><Trash2 className="h-4 w-4 text-destructive"/></Button>
        </div>
        {field.type === "textbox" && <div className="space-y-2"><Label className="text-xs text-muted-foreground">Text box preview</Label><Input placeholder={field.label || "Registrant response"} onChange={(event) => updateField(field.id, { value: event.target.value })}/></div>}
        {field.type === "file" && <div className="space-y-2"><Label className="text-xs text-muted-foreground">File upload preview</Label><Input type="file" onChange={(event) => updateField(field.id, { value: event.target.files?.[0]?.name ?? "" })}/>{typeof field.value === "string" && field.value && <p className="text-xs text-muted-foreground">Selected: {field.value}</p>}</div>}
        {field.type === "date" && <div className="space-y-2"><Label className="text-xs text-muted-foreground">Date picker preview</Label><DatePicker value={typeof field.value === "string" ? field.value : ""} onChange={(value) => updateField(field.id, { value })}/></div>}
        {(field.type === "radio" || field.type === "checkbox") && <div className="space-y-2"><Label className="text-default">Options (one per line)</Label><Textarea rows={3} value={field.options.join("\n")} onChange={(event) => updateField(field.id, { options: event.target.value.split("\n") })} placeholder="Option 1\nOption 2"/><div className="space-y-2 rounded-md border bg-background p-3"><Label className="text-xs text-muted-foreground">{field.type === "radio" ? "Radio button preview" : "Checkbox preview"}</Label>{field.options.filter(Boolean).map((option) => <label key={option} className="flex items-center gap-2 text-sm">{field.type === "radio" ? <input type="radio" name={field.id} value={option} onChange={() => updateField(field.id, { value: option })}/> : <Checkbox checked={typeof field.value === "string" && field.value.split(",").includes(option)} onCheckedChange={(checked) => { const selected = typeof field.value === "string" ? field.value.split(",").filter(Boolean) : []; const next = checked ? [...selected, option] : selected.filter((value) => value !== option); updateField(field.id, { value: next.join(",") }); }}/>}{option}</label>)}</div></div>}
      </div>)}
    </div>
  </div>;
}


