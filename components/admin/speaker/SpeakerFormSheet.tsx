"use client";

import { useState, useEffect } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { speakerTypes } from "@/lib/data/speaker-types";
import type { Speaker, SpeakerFormData } from "@/lib/types/speaker";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  prefix: z.string().min(1, "Prefix is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  mobile: z.string().optional(),
  designation: z.string().optional(),
  company: z.string().optional(),
  profilePhoto: z.string().optional(),
  speakerTypeId: z.string().min(1, "Speaker type is required"),
  speakerAcceptance: z.boolean(),
  speakerEmail: z.boolean(),
});

interface SpeakerFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  speaker?: Speaker | null;
  onSubmit: (data: SpeakerFormData) => Promise<void>;
  isSubmitting?: boolean;
}

export function SpeakerFormSheet({
  open,
  onOpenChange,
  speaker,
  onSubmit,
  isSubmitting = false,
}: SpeakerFormSheetProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      prefix: "",
      firstName: "",
      lastName: "",
      mobile: "",
      designation: "",
      company: "",
      profilePhoto: "",
      speakerTypeId: "",
      speakerAcceptance: true,
      speakerEmail: true,
    },
  });

  useEffect(() => {
    if (speaker) {
      form.reset({
        email: speaker.email,
        prefix: speaker.prefix,
        firstName: speaker.firstName,
        lastName: speaker.lastName,
        mobile: speaker.mobile || "",
        designation: speaker.designation || "",
        company: speaker.company || "",
        profilePhoto: speaker.profilePhoto || "",
        speakerTypeId: speaker.speakerTypeId,
        speakerAcceptance: speaker.speakerAcceptance,
        speakerEmail: speaker.speakerEmail,
      });
      setPreviewImage(speaker.profilePhoto || null);
    } else {
      form.reset({
        email: "",
        prefix: "",
        firstName: "",
        lastName: "",
        mobile: "",
        designation: "",
        company: "",
        profilePhoto: "",
        speakerTypeId: "",
        speakerAcceptance: true,
        speakerEmail: true,
      });
      setPreviewImage(null);
    }
  }, [speaker, form]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await onSubmit(values);
    if (!isSubmitting) {
      onOpenChange(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        form.setValue("profilePhoto", result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{speaker ? "Edit Speaker" : "Add Speaker"}</SheetTitle>
          <SheetDescription>
            {speaker
              ? "Update the speaker's information"
              : "Add a new speaker to the event"}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 py-4"
          >
            {/* Profile Photo */}
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={previewImage || "/images/users/user7.jpg"} />
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
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG or GIF. Max 2MB
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="prefix"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">Prefix *</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select prefix" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Dr.">Dr.</SelectItem>
                          <SelectItem value="Prof.">Prof.</SelectItem>
                          <SelectItem value="Mr.">Mr.</SelectItem>
                          <SelectItem value="Ms.">Ms.</SelectItem>
                          <SelectItem value="Mrs.">Mrs.</SelectItem>
                        </SelectContent>
                      </Select>
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
                    <FormLabel className="text-default">First Name *</FormLabel>
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
                    <FormLabel className="text-default">Last Name *</FormLabel>
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
                  <FormLabel className="text-default">
                    Mobile (optional)
                  </FormLabel>
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
                    <FormLabel className="text-default">Designation</FormLabel>
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
              name="speakerTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Speaker Type *</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select speaker type" />
                      </SelectTrigger>
                      <SelectContent>
                        {speakerTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="speakerAcceptance"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-default">
                      Speaker Acceptance
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) =>
                          field.onChange(value === "yes")
                        }
                        defaultValue={field.value ? "yes" : "no"}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="accept-yes" />
                          <label htmlFor="accept-yes">Yes</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="accept-no" />
                          <label htmlFor="accept-no">No</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="speakerEmail"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-default">
                      Speaker Invitation Email
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) =>
                          field.onChange(value === "yes")
                        }
                        defaultValue={field.value ? "yes" : "no"}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="email-yes" />
                          <label htmlFor="email-yes">Yes</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="email-no" />
                          <label htmlFor="email-no">No</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                color="primary"
                className="cursor-pointer text-base"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {speaker ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{speaker ? "Update Speaker" : "Add Speaker"}</>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="text-base"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
