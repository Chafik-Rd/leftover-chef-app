'use cilent'
import { useMemo, useState } from "react";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { InputIngredientProps } from "@/types/share.type";

export const InputIngredient = ({
  value,
  onChangeValue,
  dbIngredients,
  placeholder = "ชื่อวัตถุดิบ",
}: InputIngredientProps) => {
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    if (!value) return dbIngredients;
    return dbIngredients.filter((i) =>
      i.name.toLowerCase().includes(value.toLowerCase()),
    );
  }, [value, dbIngredients]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full">
          <Input
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              onChangeValue(e.target.value);
              if (!open) setOpen(true);
            }}
          />
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="p-0"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Command>
          <CommandList>
            <CommandEmpty>
              <div className="flex flex-col items-center justify-center text-sm">
                <p className="text-muted-foreground">ไม่พบวัตถุดิบ {value}</p>
                <Button
                  variant="link"
                  size="sm"
                  className="mt-1 text-[#A67B5B]"
                  onClick={() => setOpen(false)}
                >
                  + ใช้ชื่อนี้เป็นวัตถุดิบใหม่
                </Button>
              </div>
            </CommandEmpty>
            <CommandGroup>
              {filtered.map((ingredient) => (
                <CommandItem
                  key={ingredient.id}
                  value={ingredient.name}
                  onSelect={(currentValue) => {
                    onChangeValue(currentValue);
                    setOpen(false);
                  }}
                >
                  {ingredient.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
