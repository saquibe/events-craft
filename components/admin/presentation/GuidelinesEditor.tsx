"use client";

import { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { RichTextEditor } from "@/components/rich-text-editor";

import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from "@/components/ui/simple-tabs";

const formSchema = z.object({
  content: z.string().min(1, "Guidelines are required"),
});

interface GuidelinesEditorProps {
  type: "Talk" | "Paper" | "ePoster";
  content: string;
  onSave: (content: string) => void;
  isSubmitting?: boolean;
}

export function GuidelinesEditor({
  type,
  content,
  onSave,
  isSubmitting = false,
}: GuidelinesEditorProps) {
  const [activeTab, setActiveTab] = useState("editor");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content,
    },
  });

  useEffect(() => {
    form.reset({
      content,
    });
  }, [content, form]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSave(values.content);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold">{type} Guidelines</h3>

          <p className="text-sm text-muted-foreground">
            Create or update the {type.toLowerCase()} submission guidelines.
          </p>
        </div>

        <SimpleTabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="border-b border-border">
            <SimpleTabsList>
              <SimpleTabsTrigger value="editor">Editor</SimpleTabsTrigger>

              <SimpleTabsTrigger value="preview">Preview</SimpleTabsTrigger>
            </SimpleTabsList>
          </div>

          <SimpleTabsContent value="editor" className="pt-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">
                    {type} Guidelines
                  </FormLabel>

                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={`Write ${type} guidelines here...`}
                      minHeight="600px"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </SimpleTabsContent>

          <SimpleTabsContent value="preview" className="pt-6">
            <div className="rounded-lg border bg-card p-6">
              <div
                className="prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html:
                    form.watch("content") ||
                    `<p class="text-muted-foreground">Nothing to preview.</p>`,
                }}
              />
            </div>
          </SimpleTabsContent>
        </SimpleTabs>
        <div className="sticky bottom-0 z-10 bg-background border-t pt-4 pb-2 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer text-base"
            onClick={() => form.reset({ content })}
          >
            Reset
          </Button>

          <Button
            type="submit"
            color="primary"
            className="cursor-pointer text-base"
            disabled={isSubmitting}
          >
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Guidelines"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
