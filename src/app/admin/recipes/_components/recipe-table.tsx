import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { levelsRecipes } from "@/data/constants";
import { RcipeTableProps } from "@/types/recipe.type";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const RecipeTable = ({
  recipes,
  filterLevel,
  searchRecipe,
  onDeleteRecipe,
}: RcipeTableProps) => {
  return (
    <Card className="border-secondary-surface w-full max-w-300 overflow-hidden border p-0">
      <Table className="w-full table-fixed border-collapse text-left">
        <TableHeader className="text-primary bg-background/50 text-sm font-semibold uppercase">
          <TableRow>
            <TableHead className="w-2/5 px-6 py-4">เมนู</TableHead>
            <TableHead className="w-1/5 px-6 py-4">ความยาก/เวลา</TableHead>
            <TableHead className="w-1/5 px-6 py-4">สถานะ</TableHead>
            <TableHead className="w-1/5 px-6 py-4 text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recipes
            .filter(
              (recipe) =>
                recipe.name.includes(searchRecipe || "") &&
                (filterLevel ? recipe.level === filterLevel : true),
            )
            .map((recipe) => (
              <TableRow key={recipe.id}>
                <TableCell className="px-6 py-4">
                  <div className="flex w-full items-center gap-4">
                    <div className="border-secondary-surface relative hidden h-14 w-14 overflow-hidden rounded-lg border sm:block">
                      <Image
                        src={recipe.imageUrl || ""}
                        alt="image recipe"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-foreground font-bold">{recipe.name}</p>
                      <p className="text-primary/80 text-xs">
                        หมวดหมู่: ของทอด
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="w-1/5 px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-foreground text-sm font-medium">
                      {levelsRecipes.find(
                        (level) => level.value === recipe.level,
                      )?.label || recipe.level}
                    </span>
                    <span className="text-primary/80 text-xs">
                      ⏱️ {recipe.cookTime} นาที
                    </span>
                  </div>
                </TableCell>
                <TableCell className="w-1/5 px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    Published
                  </span>
                </TableCell>
                <TableCell className="w-1/5 px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/recipes/update/${recipe.id}`}>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-primary hover:bg-secondary-surface rounded-lg p-2 transition-colors"
                      >
                        <Edit size={18} />
                      </Button>
                    </Link>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-lg p-2 text-red-400 transition-colors hover:bg-red-50"
                      onClick={() => onDeleteRecipe(recipe.id)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Card>
  );
};
