"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";

export type StatusFilter = "all" | "active" | "inactive";
export type TypeFilter = "all" | "static" | "dynamic";

interface FilterDropdownProps {
  selectedStatus: StatusFilter;
  selectedTypes: TypeFilter[];
  onStatusChange: (status: StatusFilter) => void;
  onTypesChange: (types: TypeFilter[]) => void;
}

const FilterDropdown = ({
  selectedStatus,
  selectedTypes,
  onStatusChange,
  onTypesChange,
}: FilterDropdownProps) => {
  const handleStatusToggle = (status: "active" | "inactive") => {
    if (selectedStatus === status) {
      onStatusChange("all");
    } else {
      onStatusChange(status);
    }
  };

  const handleTypeToggle = (type: "static" | "dynamic") => {
    if (selectedTypes.includes(type)) {
      onTypesChange(selectedTypes.filter(t => t !== type));
    } else {
      onTypesChange([...selectedTypes, type]);
    }
  };

  const isStatusChecked = (status: "active" | "inactive") => {
    return selectedStatus === status;
  };

  const isTypeChecked = (type: "static" | "dynamic") => {
    return selectedTypes.includes(type);
  };

  const getFilterCount = () => {
    let count = 0;
    if (selectedStatus !== "all") count++;
    if (selectedTypes.length > 0) count++;
    return count;
  };

  const hasActiveFilters = getFilterCount() > 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm"
        >
          <Filter size={16} className="shrink-0" />
          <span>Filter</span>
          {hasActiveFilters && (
            <span className="flex items-center justify-center w-5 h-5 text-xs bg-blue-500 text-white rounded-full">
              {getFilterCount()}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[90vw] sm:w-56 max-w-sm"
        align="start"
        sideOffset={6}
      >
        <DropdownMenuLabel className="text-gray-700 text-xs">
          Status
        </DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          className="py-2 text-sm"
          checked={selectedStatus === "all"}
          onCheckedChange={() => onStatusChange("all")}
        >
          All Status
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className="py-2 text-sm"
          checked={isStatusChecked("active")}
          onCheckedChange={() => handleStatusToggle("active")}
        >
          Active
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className="py-2 text-sm"
          checked={isStatusChecked("inactive")}
          onCheckedChange={() => handleStatusToggle("inactive")}
        >
          Inactive
        </DropdownMenuCheckboxItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-gray-700 text-xs">
          Type
        </DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          className="py-2 text-sm"
          checked={selectedTypes.length === 0}
          onCheckedChange={() => onTypesChange([])}
        >
          All Types
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className="py-2 text-sm"
          checked={isTypeChecked("static")}
          onCheckedChange={() => handleTypeToggle("static")}
        >
          Static
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className="py-2 text-sm"
          checked={isTypeChecked("dynamic")}
          onCheckedChange={() => handleTypeToggle("dynamic")}
        >
          Dynamic
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;