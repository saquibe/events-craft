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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AttendeeProfile } from "@/lib/types/onsite";
import { Loader2, Settings2, FormInput, Plus, X } from "lucide-react";
import {
  FormBuilder,
  FormConfig,
  FormField as DynamicFormField,
} from "../common/FormBuilder";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from "@/components/ui/simple-tabs";
import Image from "next/image";
import ReactCrop, { Crop } from "react-image-crop";

// Base schema with default fields
const baseFormSchema = z.object({
  prefix: z.string().min(1, "Prefix is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().optional(),
  designation: z.string().optional(),
  company: z.string().optional(),
  profilePhoto: z.string().optional(),
  attendeeProfileId: z.string().min(1, "Attendee profile is required"),
});

// Dynamic schema builder
const buildDynamicSchema = (fields: DynamicFormField[]) => {
  const schema: Record<string, any> = {};
  fields.forEach((field) => {
    if (field.required) {
      if (field.type === "checkbox") {
        schema[field.id] = z.boolean().refine((val) => val === true, {
          message: `${field.label} is required`,
        });
      } else {
        schema[field.id] = z.string().min(1, `${field.label} is required`);
      }
    } else {
      schema[field.id] = z.any().optional();
    }
  });
  return z.object(schema);
};

interface SpotRegistrationFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  registration?: any;
  profiles: AttendeeProfile[];
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
  formConfig?: FormConfig;
  onFormSave?: (config: FormConfig) => void;
}

export function SpotRegistrationFormSheet({
  open,
  onOpenChange,
  registration,
  profiles,
  onSubmit,
  isSubmitting = false,
  formConfig,
  onFormSave,
}: SpotRegistrationFormSheetProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 80,
    height: 80,
    x: 10,
    y: 10,
  });
  const [activeTab, setActiveTab] = useState("form");
  const [dynamicFields, setDynamicFields] = useState<Record<string, any>>({});
  const [showBuilder, setShowBuilder] = useState(false);

  // Build dynamic schema
  const dynamicSchema = buildDynamicSchema(formConfig?.fields || []);
  const fullSchema = baseFormSchema.extend(dynamicSchema.shape);

  const form = useForm<z.infer<typeof fullSchema>>({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      prefix: "",
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      designation: "",
      company: "",
      profilePhoto: "",
      attendeeProfileId: "",
    },
  });

  useEffect(() => {
    if (registration) {
      const defaultValues: any = {
        prefix: registration.prefix,
        firstName: registration.firstName,
        lastName: registration.lastName,
        email: registration.email,
        mobile: registration.mobile || "",
        designation: registration.designation || "",
        company: registration.company || "",
        profilePhoto: registration.profilePhoto || "",
        attendeeProfileId: registration.attendeeProfileId,
      };
      // Merge dynamic fields
      if (registration.dynamicFields) {
        Object.keys(registration.dynamicFields).forEach((key) => {
          defaultValues[key] = registration.dynamicFields[key];
        });
      }
      form.reset(defaultValues);
      setPreviewImage(registration.profilePhoto || null);
      setDynamicFields(registration.dynamicFields || {});
    } else {
      form.reset({
        prefix: "",
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        designation: "",
        company: "",
        profilePhoto: "",
        attendeeProfileId: "",
      });
      setPreviewImage(null);
      setDynamicFields({});
    }
  }, [registration, form]);

  // Reset dynamic fields when form config changes
  useEffect(() => {
    if (formConfig?.fields) {
      const newDynamicFields: Record<string, any> = {};
      formConfig.fields.forEach((field) => {
        if (dynamicFields[field.id] !== undefined) {
          newDynamicFields[field.id] = dynamicFields[field.id];
        }
      });
      setDynamicFields(newDynamicFields);
    }
  }, [formConfig]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      // clear preview until user saves crop
      setPreviewImage(null);
    }
  };

  const handleCropSave = () => {
    if (!imageRef || !crop.width || !crop.height) return;

    const canvas = document.createElement("canvas");

    const scaleX = imageRef.naturalWidth / imageRef.width;
    const scaleY = imageRef.naturalHeight / imageRef.height;

    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.drawImage(
      imageRef,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    const base64 = canvas.toDataURL("image/jpeg");

    setPreviewImage(base64);
    form.setValue("profilePhoto", base64);
  };

  const handleDynamicFieldChange = (fieldId: string, value: any) => {
    setDynamicFields({ ...dynamicFields, [fieldId]: value });
    form.setValue(fieldId as any, value);
  };

  const handleSubmit = async (values: z.infer<typeof fullSchema>) => {
    // Extract dynamic fields from values
    const dynamicData: Record<string, any> = {};
    if (formConfig?.fields) {
      formConfig.fields.forEach((field) => {
        if (values[field.id as keyof typeof values] !== undefined) {
          dynamicData[field.id] = values[field.id as keyof typeof values];
        }
      });
    }

    // Prepare submission data
    const submissionData = {
      ...values,
      dynamicFields: dynamicData,
    };

    await onSubmit(submissionData);
    if (!isSubmitting) {
      onOpenChange(false);
    }
  };

  const renderDynamicField = (field: DynamicFormField) => {
    const value = dynamicFields[field.id] || "";

    switch (field.type) {
      case "input":
        return (
          <FormField
            key={field.id}
            control={form.control}
            name={field.id as any}
            render={({ field: formField }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={field.placeholder}
                    {...formField}
                    value={value}
                    onChange={(e) => {
                      formField.onChange(e);
                      handleDynamicFieldChange(field.id, e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case "textarea":
        return (
          <FormField
            key={field.id}
            control={form.control}
            name={field.id as any}
            render={({ field: formField }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder={field.placeholder}
                    {...formField}
                    value={value}
                    onChange={(e) => {
                      formField.onChange(e);
                      handleDynamicFieldChange(field.id, e.target.value);
                    }}
                    className="min-h-[80px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case "dropdown":
        return (
          <FormField
            key={field.id}
            control={form.control}
            name={field.id as any}
            render={({ field: formField }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(val) => {
                      formField.onChange(val);
                      handleDynamicFieldChange(field.id, val);
                    }}
                    value={value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option, i) => (
                        <SelectItem key={i} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case "checkbox":
        return (
          <FormField
            key={field.id}
            control={form.control}
            name={field.id as any}
            render={({ field: formField }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={value || false}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        formField.onChange(checked);
                        handleDynamicFieldChange(field.id, checked);
                      }}
                      className="h-4 w-4"
                    />
                    <Label className="text-sm font-normal">
                      {field.options?.[0] || "Checkbox"}
                    </Label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case "radio":
        return (
          <FormField
            key={field.id}
            control={form.control}
            name={field.id as any}
            render={({ field: formField }) => (
              <FormItem>
                <FormControl>
                  <div className="space-y-1">
                    {field.options?.map((option, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`radio-${field.id}`}
                          value={option}
                          checked={value === option}
                          onChange={(e) => {
                            formField.onChange(e.target.value);
                            handleDynamicFieldChange(field.id, e.target.value);
                          }}
                        />
                        <Label className="text-sm font-normal">{option}</Label>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case "date":
        return (
          <FormField
            key={field.id}
            control={form.control}
            name={field.id as any}
            render={({ field: formField }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="date"
                    {...formField}
                    value={value}
                    onChange={(e) => {
                      formField.onChange(e);
                      handleDynamicFieldChange(field.id, e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-3xl max-w-[95vw] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {registration ? "Edit Spot Registration" : "Add Spot Registration"}
          </SheetTitle>
          <SheetDescription>
            {registration
              ? "Update the spot registration information"
              : "Register a new attendee on-site"}
          </SheetDescription>
        </SheetHeader>

        <SimpleTabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="mt-6"
        >
          <SimpleTabsList>
            <SimpleTabsTrigger value="form">
              <FormInput className="mr-2 h-4 w-4" />
              Registration Form
            </SimpleTabsTrigger>
            <SimpleTabsTrigger value="builder">
              <Settings2 className="mr-2 h-4 w-4" />
              Custom Fields
              {formConfig?.fields && formConfig.fields.length > 0 && (
                <Badge color="secondary" className="ml-2">
                  {formConfig.fields.length}
                </Badge>
              )}
            </SimpleTabsTrigger>
          </SimpleTabsList>

          <SimpleTabsContent value="form">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6 py-4"
              >
                {/* Profile Photo */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage
                        src={previewImage || "/images/users/user7.jpg"}
                      />
                      <AvatarFallback className="text-2xl">
                        {form.watch("firstName")?.[0] || "?"}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          document.getElementById("photo-upload")?.click()
                        }
                      >
                        Upload Photo
                      </Button>

                      <Input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />

                      <p className="mt-1 text-xs text-muted-foreground">
                        JPG, PNG or GIF. Max 2MB
                      </p>
                    </div>
                  </div>

                  {selectedImage && (
                    <div className="space-y-4">
                      <div className="overflow-hidden rounded-xl border border-border">
                        <ReactCrop
                          crop={crop}
                          onChange={(c) => setCrop(c)}
                          aspect={1}
                          circularCrop
                        >
                          <img
                            ref={setImageRef}
                            src={selectedImage}
                            alt="Profile"
                            className="max-h-[300px] w-full object-contain"
                          />
                        </ReactCrop>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          type="button"
                          color="primary"
                          className="cursor-pointer"
                          onClick={handleCropSave}
                        >
                          Save Crop
                        </Button>
                      </div>

                      <div className="flex justify-center">
                        <div className="relative h-24 w-24 overflow-hidden rounded-full border border-border bg-muted">
                          <Image
                            src={previewImage || selectedImage}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Default Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="prefix"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-default">Prefix *</FormLabel>
                        <FormControl>
                          <Input placeholder="Prefix" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-default">
                          First Name *
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="First name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-default">
                          Last Name *
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-default">Email *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Email address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-default">Mobile</FormLabel>
                      <FormControl>
                        <Input placeholder="Mobile number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="designation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-default">
                          Designation
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Designation" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-default">Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="attendeeProfileId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-default">
                        Attendee Profile *
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select attendee profile" />
                          </SelectTrigger>
                          <SelectContent>
                            {profiles.map((profile) => (
                              <SelectItem key={profile.id} value={profile.id}>
                                {profile.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Dynamic Fields Section */}
                {formConfig?.fields && formConfig.fields.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold">
                          {formConfig.title || "Additional Fields"}
                        </h4>
                        <Badge color="outline">
                          {formConfig.fields.length} fields
                        </Badge>
                      </div>

                      <ScrollArea className="max-h-[400px] pr-4">
                        <div className="space-y-4">
                          {formConfig.fields.map((field) => (
                            <div key={field.id} className="space-y-2">
                              <Label className="flex items-center gap-1 text-default">
                                {field.label}
                                {field.required && (
                                  <span className="text-red-500">*</span>
                                )}
                              </Label>
                              {field.description && (
                                <p className="text-xs text-muted-foreground">
                                  {field.description}
                                </p>
                              )}
                              {renderDynamicField(field)}
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </>
                )}

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-base cursor-pointer"
                    color="primary"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {registration ? "Updating..." : "Registering..."}
                      </>
                    ) : (
                      <>{registration ? "Update Registration" : "Register"}</>
                    )}
                  </Button>
                  <Button
                    className="text-base cursor-pointer"
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

          <SimpleTabsContent value="builder">
            <FormBuilder
              initialConfig={formConfig}
              onSave={(config) => {
                if (onFormSave) {
                  onFormSave(config);
                }
                // Stay on builder tab to show changes, user can switch back
                setActiveTab("form");
              }}
              title="Additional Registration Fields"
            />
          </SimpleTabsContent>
        </SimpleTabs>
      </SheetContent>
    </Sheet>
  );
}
