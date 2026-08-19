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
import { Plus, X, Save, Settings2, FormInput } from "lucide-react";
import {
  FormBuilder,
  FormConfig,
  DynamicFormRenderer,
} from "@/components/admin/common";
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from "@/components/ui/simple-tabs";

const mockCategories = [
  { id: "1", name: "Medical Research", options: ["ePoster", "Paper", "Talk"] },
  { id: "2", name: "Technology", options: ["Poster", "Paper"] },
];

export default function AbstractSubmissionFormPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [activeTab, setActiveTab] = useState("form");
  const [coAuthors, setCoAuthors] = useState<string[]>([]);
  const [newCoAuthor, setNewCoAuthor] = useState("");
  const [formConfig, setFormConfig] = useState<FormConfig>({
    id: "abstract-submission",
    title: "Abstract Submission Form",
    fields: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const [dynamicValues, setDynamicValues] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddCoAuthor = () => {
    if (newCoAuthor.trim()) {
      setCoAuthors([...coAuthors, newCoAuthor.trim()]);
      setNewCoAuthor("");
    }
  };

  const handleRemoveCoAuthor = (author: string) => {
    setCoAuthors(coAuthors.filter((a) => a !== author));
  };

  const handleFormBuilderSave = (config: FormConfig) => {
    setFormConfig(config);
    alert("Form fields saved successfully!");
  };

  const handleDynamicChange = (values: Record<string, any>) => {
    setDynamicValues(values);
  };

  const handleSaveForm = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Abstract submission form saved successfully!");
    }, 1000);
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

      <SimpleTabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <SimpleTabsList className="grid w-full max-w-md grid-cols-2">
          <SimpleTabsTrigger value="form" className="flex items-center gap-2">
            <FormInput className="h-4 w-4" />
            Form Settings
          </SimpleTabsTrigger>

          <SimpleTabsTrigger
            value="builder"
            className="flex items-center gap-2"
          >
            <Settings2 className="h-4 w-4" />
            Form Builder
            {formConfig.fields.length > 0 && (
              <Badge color="secondary" className="ml-2">
                {formConfig.fields.length}
              </Badge>
            )}
          </SimpleTabsTrigger>
        </SimpleTabsList>

        <SimpleTabsContent value="form" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Abstract Submission Form Fields</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Fixed Fields */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-muted-foreground">
                  Fixed Fields
                </h4>

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
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleAddCoAuthor()
                      }
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
                  <Label className="text-default">
                    Details with Word Count *
                  </Label>
                  <Textarea
                    placeholder="Enter abstract details..."
                    className="min-h-[150px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    Word count: 0 words
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setActiveTab("builder")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add More Fields
                </Button>
              </div>

              {/* Dynamic Fields - Rendered by DynamicFormRenderer */}
              {formConfig.fields.length > 0 && (
                <div className="space-y-4 pt-4 border-t">
                  <h4 className="text-sm font-semibold text-muted-foreground">
                    Additional Fields ({formConfig.fields.length})
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    These fields will appear in the abstract submission form
                  </p>

                  <DynamicFormRenderer
                    config={formConfig}
                    values={dynamicValues}
                    onChange={handleDynamicChange}
                    onFileUpload={async (fieldId, file) => {
                      // Handle file upload - return the file URL
                      // In real app, upload to S3 or server
                      console.log(`Uploading file for ${fieldId}:`, file.name);
                      return URL.createObjectURL(file);
                    }}
                  />
                </div>
              )}

              <div className="flex justify-end pt-4 border-t">
                <Button
                  onClick={handleSaveForm}
                  disabled={isSubmitting}
                  className="text-base"
                  color="primary"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Saving..." : "Save Form"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        <SimpleTabsContent value="builder" className="mt-6">
          <FormBuilder
            initialConfig={formConfig}
            onSave={handleFormBuilderSave}
            title="Abstract Submission Form"
          />
        </SimpleTabsContent>
      </SimpleTabs>
    </div>
  );
}
