import { useEffect, useState } from "react";
import { RecipeService } from "@/services/recipe.service";
import { CardRecipe } from "./card-recipe";
import {
  FavoriteRecipe,
  LowIngreRecipe,
  TrendingRecipe,
} from "@/types/recipe.type";
import Link from "next/link";

export const SectionRecommend = () => {
  const [dbRecommend, setDbRecommend] = useState<FavoriteRecipe[]>([]);
  const [dbLowIngre, setDbLowIngre] = useState<LowIngreRecipe[]>([]);
  const [dbTrending, setDbTrending] = useState<TrendingRecipe[]>([]);
  const [loading, setLoading] = useState(false);

  const skeletonArray = Array(4).fill(null);
  useEffect(() => {
    const fectData = async () => {
      setLoading(true);
      try {
        const resRecom = await RecipeService.fetchRecommendRecipes();
        setDbRecommend(resRecom.data);
        const resLowIngre = await RecipeService.fetchLowIngredientRecipes();
        setDbLowIngre(resLowIngre.data);
        const resTrend = await RecipeService.fetchTrendingRecipes();
        setDbTrending(resTrend.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fectData();
  }, []);
  return (
    <div className="flex flex-col gap-10">
      {/* Recommendation section */}
      <section>
        <h2 className="mb-5 text-2xl font-semibold text-slate-800">
          🔥 เมนูยอดฮิตที่ใครๆ ก็ทำ
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading
            ? skeletonArray.map((_, i) => <CardRecipe key={i} recipe={null} />)
            : dbRecommend.map((recipe) => (
                <Link href={`/recipe/${recipe.id}`} key={recipe.id}>
                  <CardRecipe recipe={recipe} />
                </Link>
              ))}
        </div>
      </section>

      {/* Low ingredient section */}
      <section>
        <h2 className="mb-5 text-2xl font-semibold text-slate-800">
          🔥 วัตถุดิบน้อย อร่อยง่าย
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading
            ? skeletonArray.map((_, i) => <CardRecipe key={i} recipe={null} />)
            : dbLowIngre.map((recipe) => (
                <Link href={`/recipe/${recipe.id}`} key={recipe.id}>
                  <CardRecipe recipe={recipe} />
                </Link>
              ))}
        </div>
      </section>

      {/* Trending section */}
      <section>
        <h2 className="mb-5 text-2xl font-semibold text-slate-800">
          🔥 เมนูใหม่มาแรง
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading
            ? skeletonArray.map((_, i) => <CardRecipe key={i} recipe={null} />)
            : dbTrending.map((recipe) => (
                <Link href={`/recipe/${recipe.id}`} key={recipe.id}>
                  <CardRecipe recipe={recipe} />
                </Link>
              ))}
        </div>
      </section>
    </div>
  );
};
