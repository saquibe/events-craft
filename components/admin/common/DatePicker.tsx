"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false);

  const selectedDate = value ? new Date(value) : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          data-empty={!value}
          className={cn(
            "h-9 w-full justify-between border border-input bg-background text-left font-normal shadow-none transition-colors data-[empty=true]:text-muted-foreground",
            "hover:border-input focus-visible:border-primary focus-visible:ring-0",
            open && "border-primary",
          )}
        >
          {selectedDate ? (
            format(selectedDate, "dd MMM yyyy")
          ) : (
            <span>Select Date</span>
          )}

          <CalendarIcon className="h-4 w-4 opacity-60" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-auto rounded-lg border border-primary/20 p-0 shadow-lg"
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          defaultMonth={selectedDate}
          onSelect={(date) => {
            if (!date) return;

            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");

            onChange(`${year}-${month}-${day}`);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
