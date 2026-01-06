import { RecipeSection } from "@/components/recipe-section";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AddInstructionsProps } from "@/types/recipe.type";
import { handleAddItem, handleDeleteItem } from "@/utils/recipeSection";
import { X } from "lucide-react";

export const AddInstruction = ({
  instructions,
  onSetInstructions,
}: AddInstructionsProps) => {
  // Update data in instruction section
  const updateInstruction = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    onSetInstructions(newInstructions);
  };

  return (
    <RecipeSection
      title="วิธีทำ"
      showAddButton={true}
      onAddClick={() => handleAddItem(instructions, onSetInstructions, "")}
    >
      <section className="flex flex-col gap-4">
        {instructions.map((instr, index) => (
          <div
            key={index}
            className="bg-background flex items-center gap-4 rounded-md p-3"
          >
            <div className="bg-secondary-surface flex items-center justify-center rounded-full text-xl font-medium">
              <p className="h-8 w-8 text-center">{index + 1}</p>
            </div>
            <Textarea
              value={instructions[index]}
              onChange={(e) => updateInstruction(index, e.target.value)}
              placeholder={`ขั้นตอนที่ ${index + 1}...`}
              className="w-full bg-white"
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={() =>
                handleDeleteItem(instructions, onSetInstructions, index)
              }
            >
              <X />
            </Button>
          </div>
        ))}
      </section>
    </RecipeSection>
  );
};
