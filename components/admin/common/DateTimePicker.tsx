"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateTimePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function DateTimePicker({ value, onChange }: DateTimePickerProps) {
  const currentDate = value ? new Date(value) : new Date();

  const updateDateTime = (date: Date, hour: number, minute: number) => {
    const updated = new Date(date);

    updated.setHours(hour);
    updated.setMinutes(minute);
    updated.setSeconds(0);

    const year = updated.getFullYear();
    const month = String(updated.getMonth() + 1).padStart(2, "0");
    const day = String(updated.getDate()).padStart(2, "0");
    const hrs = String(updated.getHours()).padStart(2, "0");
    const mins = String(updated.getMinutes()).padStart(2, "0");

    onChange(`${year}-${month}-${day}T${hrs}:${mins}`);
  };

  const hour24 = currentDate.getHours();

  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;

  const ampm = hour24 >= 12 ? "PM" : "AM";

  return (
    <div className="grid grid-cols-10 gap-2 items-end">
      {/* Date */}
      <div className="col-span-4">
        {/* <label className="mb-1 block text-xs text-muted-foreground">Date</label> */}

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />

              {value ? format(currentDate, "dd MMM yyyy") : "Select Date"}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={value ? currentDate : undefined}
              onSelect={(date) => {
                if (!date) return;

                updateDateTime(
                  date,
                  currentDate.getHours(),
                  currentDate.getMinutes(),
                );
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Hour */}
      <div className="col-span-2">
        <label className="mb-1 block text-xs text-muted-foreground">Hour</label>

        <Select
          value={String(hour12)}
          onValueChange={(hour) => {
            const h = Number(hour);

            const newHour =
              ampm === "PM" ? (h === 12 ? 12 : h + 12) : h === 12 ? 0 : h;

            updateDateTime(currentDate, newHour, currentDate.getMinutes());
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {Array.from({ length: 12 }, (_, i) => (
              <SelectItem key={i + 1} value={String(i + 1)}>
                {String(i + 1).padStart(2, "0")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Minute */}
      <div className="col-span-2">
        <label className="mb-1 block text-xs text-muted-foreground">
          Minute
        </label>

        <Select
          value={String(currentDate.getMinutes())}
          onValueChange={(minute) =>
            updateDateTime(currentDate, currentDate.getHours(), Number(minute))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>

          <SelectContent className="max-h-72">
            {Array.from({ length: 60 }, (_, i) => (
              <SelectItem key={i} value={String(i)}>
                {String(i).padStart(2, "0")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* AM / PM */}
      <div className="col-span-2">
        <label className="mb-1 block text-xs text-muted-foreground">
          AM / PM
        </label>

        <Select
          value={ampm}
          onValueChange={(value) => {
            let hours = currentDate.getHours();

            if (value === "PM" && hours < 12) {
              hours += 12;
            }

            if (value === "AM" && hours >= 12) {
              hours -= 12;
            }

            updateDateTime(currentDate, hours, currentDate.getMinutes());
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
