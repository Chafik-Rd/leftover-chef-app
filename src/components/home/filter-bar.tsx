"use client";

import { Grid3x3, Rows3, Search } from "lucide-react";
import { Input } from "../ui/input";
import { SelectLevel } from "../select-level";
import { RecipeLevel } from "@/types/recipe.type";
import { useState } from "react";

export const FilterBar = ({
  layout,
  onSetLayout,
}: {
  layout: boolean;
  onSetLayout: (layout: boolean) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterLevel, setFilterLevel] = useState<RecipeLevel | "">("");

  return (
    <section className="flex items-center justify-center gap-5">
      <label className="relative w-full max-w-140">
        <Search
          size={16}
          strokeWidth={2}
          className="text-muted-foreground absolute top-1/2 left-2 -translate-y-1/2"
        />

        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="ค้นหาสูตรอาหาร..."
          className="my-4 w-full pl-8"
        />
      </label>

      <SelectLevel
        value={filterLevel}
        onChange={(e) => setFilterLevel(e.target.value as RecipeLevel)}
      />
      {/* Menu set layout card */}
      <div className="flex">
        <div className="flex h-9 w-16">
          <button
            onClick={() => onSetLayout(false)}
            className={`border-border flex h-full w-full cursor-pointer items-center justify-center rounded-l-md ${
              layout ? "text-primary border" : "bg-primary border-y text-white"
            }`}
          >
            <Grid3x3 strokeWidth={1.5} size={16} />
          </button>
          <button
            onClick={() => onSetLayout(true)}
            className={`border-border flex h-full w-full cursor-pointer items-center justify-center rounded-r-md ${
              layout ? "bg-primary border-y text-white" : "text-primary border"
            }`}
          >
            <Rows3 strokeWidth={1.5} size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};
