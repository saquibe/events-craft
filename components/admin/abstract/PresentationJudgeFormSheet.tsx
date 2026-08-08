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
import { Category } from "@/lib/types/abstract";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Judge name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().optional(),
  abstractType: z.enum(["Paper", "Poster"]).default("Paper"),
  categoryId: z.string().min(1, "Category is required"),
  optionName: z.string().min(1, "Option name is required"),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

interface PresentationJudgeFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  judge?: any;
  categories: Category[];
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

export function PresentationJudgeFormSheet({
  open,
  onOpenChange,
  judge,
  categories,
  onSubmit,
  isSubmitting = false,
}: PresentationJudgeFormSheetProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      abstractType: "Paper",
      categoryId: "",
      optionName: "",
      status: "Active",
    },
  });

  const selectedCategory = categories.find(
    (c) => c.id === form.watch("categoryId"),
  );

  useEffect(() => {
    if (judge) {
      form.reset({
        name: judge.name,
        email: judge.email,
        mobile: judge.mobile || "",
        abstractType: judge.abstractType,
        categoryId: judge.categoryId,
        optionName: judge.optionName,
        status: judge.status,
      });
    } else {
      form.reset({
        name: "",
        email: "",
        mobile: "",
        abstractType: "Paper",
        categoryId: "",
        optionName: "",
        status: "Active",
      });
    }
  }, [judge, form]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await onSubmit(values);
    if (!isSubmitting) {
      onOpenChange(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {judge ? "Edit Judge" : "Add Presentation Judge"}
          </SheetTitle>
          <SheetDescription>
            {judge
              ? "Update the presentation judge information"
              : "Add a new presentation judge"}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Judge Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter judge name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">
                      Judge Email *
                    </FormLabel>
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

              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">Judge Mobile</FormLabel>
                    <FormControl>
                      <Input placeholder="Mobile number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="abstractType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">
                    Abstract Type *
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select abstract type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Paper">Paper</SelectItem>
                        <SelectItem value="Poster">Poster</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">
                    Category Name *
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        form.setValue("optionName", "");
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
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
              name="optionName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Option Name *</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!form.watch("categoryId")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCategory?.options.map((option) => (
                          <SelectItem key={option} value={option}>
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
                    {judge ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{judge ? "Update Judge" : "Add Judge"}</>
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
