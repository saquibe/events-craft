"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function TimePicker({ value, onChange }: TimePickerProps) {
  let hour = "10";
  let minute = "00";
  let period = "AM";

  if (value) {
    const [h, m] = value.split(":");
    const h24 = Number(h);

    period = h24 >= 12 ? "PM" : "AM";

    const h12 = h24 % 12 === 0 ? 12 : h24 % 12;

    hour = String(h12);
    minute = m;
  }

  const updateTime = (
    newHour: string,
    newMinute: string,
    newPeriod: string,
  ) => {
    let h = Number(newHour);

    if (newPeriod === "PM") {
      if (h !== 12) h += 12;
    } else {
      if (h === 12) h = 0;
    }

    onChange(`${String(h).padStart(2, "0")}:${newMinute}`);
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {/* Hour */}
      <Select
        value={hour}
        onValueChange={(val) => updateTime(val, minute, period)}
      >
        <SelectTrigger className="cursor-pointer">
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

      {/* Minute */}
      <Select
        value={minute}
        onValueChange={(val) => updateTime(hour, val, period)}
      >
        <SelectTrigger className="cursor-pointer">
          <SelectValue />
        </SelectTrigger>

        <SelectContent className="max-h-72">
          {Array.from({ length: 60 }, (_, i) => (
            <SelectItem key={i} value={String(i).padStart(2, "0")}>
              {String(i).padStart(2, "0")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* AM PM */}
      <Select
        value={period}
        onValueChange={(val) => updateTime(hour, minute, val)}
      >
        <SelectTrigger className="cursor-pointer">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="AM">AM</SelectItem>
          <SelectItem value="PM">PM</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
