"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/shared/lib/css";
import { Button } from "@/shared/ui";
import { Calendar } from "@/shared/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

export function DatePicker() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[158px] h-[36px] text-left font-normal flex justify-between p-1.5 text-base transition-colors",
            !date && "text-muted-foreground",
          )}
          style={{
            backgroundColor: "transparent", // начальный цвет фона (можно изменить)
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--dark-500)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent"; // или ваш цвет по умолчанию
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--accent-700)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "transparent"; // или ваш цвет по умолчанию
          }}
        >
          {date ? format(date, "dd/MM/yyyy") : format(new Date(), "dd/MM/yyyy")}
          <CalendarIcon style={{ height: 24, width: 24 }} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
