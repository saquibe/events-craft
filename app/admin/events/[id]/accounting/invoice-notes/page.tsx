"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, FileText, Save, X, Plus } from "lucide-react";
import { RichTextEditor } from "@/components/rich-text-editor";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { CreateButton } from "@/components/admin";

interface InvoiceNote {
  id: string;
  termsAndConditions: string;
  createdAt: string;
  updatedAt: string;
}

const formSchema = z.object({
  termsAndConditions: z.string().min(1, "Terms and conditions are required"),
});

const mockNote: InvoiceNote | null = null;

export default function InvoiceNotesPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const { toast } = useToast();
  const [note, setNote] = useState<InvoiceNote | null>(mockNote);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      termsAndConditions: "",
    },
  });

  const handleCreate = () => {
    setIsCreating(true);
    setIsEditing(true);
    form.reset({
      termsAndConditions: "",
    });
  };

  const handleEdit = () => {
    if (note) {
      setIsEditing(true);
      form.reset({
        termsAndConditions: note.termsAndConditions,
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsCreating(false);
    form.reset();
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (isCreating) {
        // Create new note
        const newNote: InvoiceNote = {
          id: "1",
          ...values,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setNote(newNote);
        toast({
          title: "Terms & Conditions created",
          description:
            "Invoice terms and conditions have been created successfully.",
        });
      } else if (note) {
        // Update existing note
        const updatedNote: InvoiceNote = {
          ...note,
          ...values,
          updatedAt: new Date().toISOString(),
        };
        setNote(updatedNote);
        toast({
          title: "Terms & Conditions updated",
          description:
            "Invoice terms and conditions have been updated successfully.",
        });
      }

      setIsEditing(false);
      setIsCreating(false);
      form.reset();
    } catch (error) {
      console.error("Error saving terms:", error);
      toast({
        title: "Error",
        description: "Failed to save terms and conditions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = () => {
    if (
      note &&
      confirm("Are you sure you want to delete these terms and conditions?")
    ) {
      setNote(null);
      toast({
        title: "Terms & Conditions deleted",
        description:
          "Invoice terms and conditions have been deleted successfully.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Terms & Conditions
          </h2>
          <p className="text-muted-foreground">
            Manage invoice terms and conditions for Event #{eventId}
          </p>
        </div>
        {!note && !isCreating && (
          <CreateButton label="Add Terms & Conditions" onClick={handleCreate} />
        )}
      </div>

      {/* Form (Create/Edit) */}
      {(isEditing || isCreating) && (
        <Card>
          <CardHeader>
            <CardTitle>
              {isCreating
                ? "Create Terms & Conditions"
                : "Edit Terms & Conditions"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="termsAndConditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-default">
                        Terms and Conditions *
                      </FormLabel>
                      <FormControl>
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Enter terms and conditions..."
                          minHeight="300px"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer text-base"
                    color="primary"
                  >
                    {isSubmitting ? (
                      <>{isCreating ? "Creating..." : "Updating..."}</>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        {isCreating ? "Create" : "Update"}
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="cursor-pointer text-base"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {/* Display Terms & Conditions */}
      {note && !isEditing && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Terms & Conditions
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button color="destructive" size="sm" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none bg-muted/10 p-6 rounded-lg border min-h-[200px]">
              <div
                dangerouslySetInnerHTML={{
                  __html: note.termsAndConditions,
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground border-t pt-4 mt-4">
              <span>Created: {new Date(note.createdAt).toLocaleString()}</span>
              <span>Updated: {new Date(note.updatedAt).toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!note && !isCreating && !isEditing && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-muted-foreground">
              No terms and conditions found
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Click &quot;Add Terms & Conditions&quot; to create one
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
