"use client";

import { useEffect } from "react";
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
import { OnsiteKey } from "@/lib/types/onsite";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  userName: z.string().min(1, "User name is required"),
  loginKey: z.string().min(1, "Login key is required"),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

interface OnsiteKeyFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedKey?: OnsiteKey | null;
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

export function OnsiteKeyFormSheet({
  open,
  onOpenChange,
  selectedKey,
  onSubmit,
  isSubmitting = false,
}: OnsiteKeyFormSheetProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      loginKey: "",
      status: "Active",
    },
  });

  useEffect(() => {
    if (selectedKey) {
      form.reset({
        userName: selectedKey.userName,
        loginKey: selectedKey.loginKey,
        status: selectedKey.status,
      });
    } else {
      form.reset({
        userName: "",
        loginKey: "",
        status: "Active",
      });
    }
  }, [selectedKey, form]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await onSubmit(values);
    if (!isSubmitting) {
      onOpenChange(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>
            {selectedKey ? "Edit Onsite Key" : "Add Onsite Key"}
          </SheetTitle>
          <SheetDescription>
            {selectedKey
              ? "Update the onsite key information"
              : "Add a new onsite login key"}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 py-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">
                      User Name / Team Name *
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter user/team name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="loginKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">Login Key *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter login key" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Status *</FormLabel>
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
                    {selectedKey ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{selectedKey ? "Update Key" : "Add Key"}</>
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
      </SheetContent>
    </Sheet>
  );
}
