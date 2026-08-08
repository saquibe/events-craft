"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Save } from "lucide-react";
import { FormBuilder, FormConfig } from "@/components/admin/common/FormBuilder";
import { CreateButton } from "@/components/admin/common/CreateButton";

const mockCategories = [
  { id: "1", name: "Medical Research", options: ["ePoster", "Paper", "Talk"] },
  { id: "2", name: "Technology", options: ["Poster", "Paper"] },
];

export default function AbstractSubmissionFormPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [coAuthors, setCoAuthors] = useState<string[]>([]);
  const [newCoAuthor, setNewCoAuthor] = useState("");
  const [formConfig, setFormConfig] = useState<FormConfig>({
    id: "abstract-submission",
    title: "Abstract Submission Form",
    fields: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const handleAddCoAuthor = () => {
    if (newCoAuthor.trim()) {
      setCoAuthors([...coAuthors, newCoAuthor.trim()]);
      setNewCoAuthor("");
    }
  };

  const handleRemoveCoAuthor = (author: string) => {
    setCoAuthors(coAuthors.filter((a) => a !== author));
  };

  const handleFormSave = (config: FormConfig) => {
    setFormConfig(config);
    alert("Form saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Abstract Submission Form
        </h2>
        <p className="text-muted-foreground">
          Configure the abstract submission form for Event #{eventId}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fixed Fields</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-default">Submitted By *</Label>
            <Input placeholder="Enter submitter's email" />
          </div>

          <div className="space-y-2">
            <Label className="text-default">Presenter Name *</Label>
            <Input placeholder="Enter presenter name" />
          </div>

          <div className="space-y-2">
            <Label className="text-default">Co Author</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter co-author email"
                value={newCoAuthor}
                onChange={(e) => setNewCoAuthor(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddCoAuthor()}
              />
              <Button
                className="p-4"
                size="sm"
                type="button"
                variant="outline"
                onClick={handleAddCoAuthor}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {coAuthors.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {coAuthors.map((author) => (
                  <Badge
                    key={author}
                    color="secondary"
                    className="flex items-center gap-1"
                  >
                    {author}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500"
                      onClick={() => handleRemoveCoAuthor(author)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-default">Abstract Title *</Label>
            <Input placeholder="Enter abstract title" />
          </div>

          <div className="space-y-2">
            <Label className="text-default">Details with Word Count *</Label>
            <Textarea
              placeholder="Enter abstract details..."
              className="min-h-[150px]"
            />
            <p className="text-xs text-muted-foreground">Word count: 0 words</p>
          </div>

          <div className="space-y-2">
            <Label className="text-default">Abstract Category *</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {mockCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-default">Option Name *</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                {mockCategories[0]?.options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Additional Fields</CardTitle>
          <CreateButton
            label="Add Custom Fields"
            onClick={() =>
              document
                .getElementById("form-builder")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          />
        </CardHeader>
        <CardContent>
          <div id="form-builder">
            <FormBuilder
              initialConfig={formConfig}
              onSave={handleFormSave}
              title="Abstract Submission Form"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline" className="cursor-pointer text-base">
          Cancel
        </Button>
        <Button className="cursor-pointer text-base" color="primary">
          <Save className="h-4 w-4 mr-2" />
          Save Form
        </Button>
      </div>
    </div>
  );
}
