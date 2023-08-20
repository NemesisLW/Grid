"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const queries = [
  {
    value:
      "Hey, I like the outfit overall, but I kinda do not like the black t-shirt, can you show me something else",
    label: "Do not like the Shirt?",
  },
  {
    value:
      "Hey, I like the outfit overall, but I kinda do not like the black Shoes, can you show me something else",
    label: "Do not like the Shoes?",
  },
  {
    value:
      "Hey, I like the outfit overall, but I kinda do not like the Jeans, can you show me something else",
    label: "Do not like the Jeans?",
  },
];

export default function Combobox({ selectedQuery, onQuerySelect }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? queries.find((query) => query.value === value)?.label
            : "Suggested Queries"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search query..." />
          <CommandEmpty>No query found.</CommandEmpty>
          <CommandGroup>
            {queries.map((query) => (
              <CommandItem
                key={query.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  onQuerySelect(query.value);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === query.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {query.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
