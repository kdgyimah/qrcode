"use client";

import { useState } from "react";
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

const FilterDropdown = () => {
  const [filters, setFilters] = useState({
    active: false,
    inactive: false,
    static: false,
    dynamic: false,
  });

  const toggle = (key: keyof typeof filters) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm"
        >
          <Filter size={16} className="shrink-0" />
          <span>Filter</span>
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
          checked={filters.active}
          onCheckedChange={() => toggle("active")}
        >
          Active
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className="py-2 text-sm"
          checked={filters.inactive}
          onCheckedChange={() => toggle("inactive")}
        >
          Inactive
        </DropdownMenuCheckboxItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-gray-700 text-xs">
          Type
        </DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          className="py-2 text-sm"
          checked={filters.static}
          onCheckedChange={() => toggle("static")}
        >
          Static
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className="py-2 text-sm"
          checked={filters.dynamic}
          onCheckedChange={() => toggle("dynamic")}
        >
          Dynamic
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
