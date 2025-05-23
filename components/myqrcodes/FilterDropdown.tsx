// components/myqrcodes/FilterDropdown.tsx
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
        <Button variant="outline" className="flex items-center gap-2">
          <Filter size={16} />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          checked={filters.active}
          onCheckedChange={() => toggle("active")}
        >
          Active
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={filters.inactive}
          onCheckedChange={() => toggle("inactive")}
        >
          Inactive
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Type</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          checked={filters.static}
          onCheckedChange={() => toggle("static")}
        >
          Static
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
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
