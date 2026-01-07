import { InputLable } from "@/components/input-label";
import { RecipeSection } from "@/components/recipe-section";
import { SelectLevel } from "@/components/select-level";
import { Textarea } from "@/components/ui/textarea";
import { CreateRecipeType } from "@/types/recipe.type";

export const RecipeBasicInfo = ({
  data,
  onChange,
}: {
  data: CreateRecipeType;
  onChange: (
    key: keyof CreateRecipeType,
    value: CreateRecipeType[keyof CreateRecipeType],
  ) => void;
}) => {
  // Handle change for input, textarea and select
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const keyName = e.target.name as keyof CreateRecipeType;
    const value = e.target.value;
    onChange(keyName, value);
  };
  return (
    <RecipeSection title="ข้อมูลพื้นฐาน">
      <section className="flex flex-col gap-2">
        <InputLable
          label="ชื่อเมนู"
          value={data.name}
          name="name"
          onChange={handleChange}
          placeholder="ใส่ชื่อเมนูอาหาร"
        />
        <div className="flex gap-2">
          <InputLable
            label="จำนวนเสิร์ฟ"
            type="number"
            min={0}
            value={data.servings}
            name="servings"
            onChange={handleChange}
            placeholder="2"
          />
          <InputLable
            label="พลังงาน (kcal)"
            type="number"
            min={0}
            value={data.calorie}
            name="calorie"
            onChange={handleChange}
            placeholder="350"
          />
          <InputLable
            label="เวลาที่ใช้ (นาที)"
            type="number"
            min={0}
            value={data.cookTime}
            name="cookTime"
            onChange={handleChange}
            placeholder="5"
          />
          <label>
            <p>ระดับความยาก</p>
            <SelectLevel value={data.level} onChange={handleChange} />
          </label>
        </div>
        <label>
          <p>คำอธิบาย</p>
          <Textarea
            value={data.description}
            name="description"
            onChange={handleChange}
            placeholder="อธิบายเกี่ยวกับเมนูอาหารนี้..."
          />
        </label>
      </section>
    </RecipeSection>
  );
};
