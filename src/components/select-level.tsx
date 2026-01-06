import { levelsRecipes } from "@/data/constants";
import { NativeSelect, NativeSelectOption } from "./ui/native-select";
import { SelectLevelProps } from "@/types/share.type";

export const SelectLevel = ({ value, onChange }: SelectLevelProps) => {
  return (
    <NativeSelect
      value={value}
      name="level"
      onChange={onChange}
      className="w-full min-w-40"
    >
      <NativeSelectOption value="">เลือกความยาก</NativeSelectOption>
      {levelsRecipes.map((unit, index) => (
        <NativeSelectOption key={index} value={unit.value}>
          {unit.label}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  );
};
