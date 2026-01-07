import { unitsIngredients } from "@/data/constants";
import { NativeSelect, NativeSelectOption } from "./ui/native-select";
import { cn } from "@/lib/utils";
import { SelectUnitProps } from "@/types/share.type";

export const SelectUnit = ({ className, ...props }: SelectUnitProps) => {
  return (
    <NativeSelect className={cn("w-full min-w-30", className)} {...props}>
      <NativeSelectOption value="">เลือกหน่วย</NativeSelectOption>
      {unitsIngredients.map((unit, index) => (
        <NativeSelectOption key={index} value={unit.value}>
          {unit.label}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  );
};
