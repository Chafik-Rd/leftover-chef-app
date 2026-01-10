"use client";
import { useState } from "react";
import { Sidebar } from "../sidebar";
import { FilterBar } from "./filter-bar";
import { SectionRecipe } from "./section-recipe";
import { AddUserIngredient } from "./add-ingredient";
import { SectionRecommend } from "./section-recommend";
import { useUserIngreStore } from "@/store/user-ingredient.store";

export const Home = () => {
  const { userIngredients } = useUserIngreStore();

  const [layout, setLayout] = useState(false);
  const [isUserIngre, setIsUserIngre] = useState(false);

  return (
    <div className="border-secondary-surface flex flex-1 border-t px-6 py-4">
      <Sidebar onSetIsUserIngre={setIsUserIngre} />
      <main className="ml-64 flex flex-1 flex-col gap-6 transition-all">
        <h1 className="text-center text-4xl font-bold">
          เปลี่ยนของเหลือให้เป็นมื้ออร่อย !
        </h1>

        {userIngredients.length > 0 ? (
          <>
            {/* Filter bar */}
            <FilterBar layout={layout} onSetLayout={setLayout} />
            {/* Section show recipe card match */}
            <SectionRecipe layout={layout} />
          </>
        ) : (
          // Section show recipe card recommend
          <SectionRecommend />
        )}
      </main>

      {/* Add user ingredient */}
      {isUserIngre && <AddUserIngredient onSetIsUserIngre={setIsUserIngre} />}
    </div>
  );
};
