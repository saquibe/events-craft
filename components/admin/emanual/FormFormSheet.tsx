"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Menu } from "@/lib/types/emanual";
import { Loader2, Settings2, FormInput } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormBuilder, FormConfig } from "../common/FormBuilder";
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from "@/components/ui/simple-tabs";
import { DateTimePicker } from "../common/DateTimePicker";
import { DatePicker } from "../common/DatePicker";

const formSchema = z.object({
  menuId: z.string().min(1, "Menu name is required"),
  lastDateOfSubmission: z
    .string()
    .min(1, "Last date of submission is required"),
  payment: z.boolean().default(false),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

interface FormFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form?: any;
  menus: Menu[];
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

export function FormFormSheet({
  open,
  onOpenChange,
  form: formData,
  menus,
  onSubmit,
  isSubmitting = false,
}: FormFormSheetProps) {
  const [activeTab, setActiveTab] = useState("form");
  const [formConfig, setFormConfig] = useState<FormConfig>({
    id: "emanual-form",
    title: "Additional Fields",
    fields: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      menuId: "",
      lastDateOfSubmission: "",
      payment: false,
      status: "Active",
    },
  });

  useEffect(() => {
    if (formData) {
      form.reset({
        menuId: formData.menuId,
        lastDateOfSubmission: formData.lastDateOfSubmission,
        payment: formData.payment,
        status: formData.status,
      });
      if (formData.formConfig) {
        setFormConfig(formData.formConfig);
      }
    } else {
      form.reset({
        menuId: "",
        lastDateOfSubmission: "",
        payment: false,
        status: "Active",
      });
    }
  }, [formData, form]);

  const handleFormBuilderSave = (config: FormConfig) => {
    setFormConfig(config);
    alert("Form fields saved successfully!");
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await onSubmit({
      ...values,
      formConfig,
    });
    if (!isSubmitting) {
      onOpenChange(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-3xl max-w-[95vw] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{formData ? "Edit Form" : "Add Form"}</SheetTitle>
          <SheetDescription>
            {formData
              ? "Update the form information"
              : "Add a new form to the eManual"}
          </SheetDescription>
        </SheetHeader>

        <SimpleTabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="mt-6"
        >
          <SimpleTabsList className="grid w-full grid-cols-2">
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
            </SimpleTabsTrigger>
          </SimpleTabsList>

          <SimpleTabsContent value="form" className="mt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6 py-4"
              >
                <FormField
                  control={form.control}
                  name="menuId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-default">
                        Menu Name *
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select menu" />
                          </SelectTrigger>
                          <SelectContent>
                            {menus.map((menu) => (
                              <SelectItem key={menu.id} value={menu.id}>
                                {menu.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastDateOfSubmission"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-default">
                        Last Date of Submission *
                      </FormLabel>
                      <FormControl>
                        <DatePicker
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel className="text-default">Payment</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Require payment for form submission
                    </p>
                  </div>
                  <FormField
                    control={form.control}
                    name="payment"
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-default">Status</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer text-base"
                    color="primary"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {formData ? "Updating..." : "Adding..."}
                      </>
                    ) : (
                      <>{formData ? "Update Form" : "Add Form"}</>
                    )}
                  </Button>
                  <Button
                    className="cursor-pointer text-base"
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </SimpleTabsContent>

          <SimpleTabsContent value="builder" className="mt-6">
            <FormBuilder
              initialConfig={formConfig}
              onSave={handleFormBuilderSave}
              title="Additional Form Fields"
            />
          </SimpleTabsContent>
        </SimpleTabs>
      </SheetContent>
    </Sheet>
  );
}
