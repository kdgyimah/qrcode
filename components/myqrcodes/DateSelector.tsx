"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

export interface DateRange {
  start: string; // ISO string format
  end: string;   // ISO string format
}

interface DateSelectorProps {
  dateRange: DateRange | null;
  onDateRangeChange: (range: DateRange | null) => void;
}

export default function DateSelector({ dateRange, onDateRangeChange }: DateSelectorProps) {
  const fromDate = dateRange?.start ? new Date(dateRange.start) : undefined;
  const toDate = dateRange?.end ? new Date(dateRange.end) : undefined;

  const handleDateSelect = (range: { from?: Date; to?: Date } | undefined) => {
    if (!range?.from && !range?.to) {
      onDateRangeChange(null);
      return;
    }

    if (range.from && range.to) {
      onDateRangeChange({
        start: range.from.toISOString(),
        end: range.to.toISOString()
      });
    }
  };

  const handleClear = () => {
    onDateRangeChange(null);
  };

  const displayText = () => {
    if (!fromDate && !toDate) {
      return "Select Date Range";
    }
    if (fromDate && toDate) {
      return `${format(fromDate, "MMM d")} - ${format(toDate, "MMM d, yyyy")}`;
    }
    if (fromDate) {
      return `From ${format(fromDate, "MMM d, yyyy")}`;
    }
    if (toDate) {
      return `Until ${format(toDate, "MMM d, yyyy")}`;
    }
  };

  const hasSelection = fromDate || toDate;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-full sm:w-auto flex items-center justify-between 
                     text-sm border px-3 py-2 ${
                       hasSelection 
                         ? "border-blue-500 bg-blue-50 text-blue-700" 
                         : "border-gray-300 text-gray-700"
                     }`}
        >
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
          <span className="truncate flex-1 text-left">
            {displayText()}
          </span>
          {hasSelection && (
            <span 
              className="ml-2 text-xs bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
            >
              ×
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full sm:w-auto p-0"
        align="start"
        sideOffset={8}
      >
        <div className="flex flex-col">
          <Calendar
            mode="range"
            selected={{
              from: fromDate,
              to: toDate
            }}
            onSelect={handleDateSelect}
            initialFocus
            numberOfMonths={1}
          />
          {hasSelection && (
            <div className="p-3 border-t">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs"
                onClick={handleClear}
              >
                Clear Dates
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}